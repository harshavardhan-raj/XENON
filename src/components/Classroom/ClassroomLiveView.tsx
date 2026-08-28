import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { LivePushPayload } from '../../types';
import { 
  Volume2, 
  ChevronLeft, 
  ChevronRight, 
  Mic, 
  MicOff, 
  Send, 
  AlertTriangle, 
  Sparkles, 
  CheckCircle2, 
  ExternalLink, 
  Tv, 
  Layers, 
  Radio, 
  X 
} from 'lucide-react';
import { ttsAdapter } from '../../services/ttsAdapter';
import { translationService } from '../../services/translationAdapter';
import { syncEngine } from '../../services/syncEngine';
import { FlashcardDeck } from '../Flashcards/FlashcardDeck';
import { CLASS1_MATH_CHAPTER1_PAGES, TextbookPageData } from '../../services/textbookLessonsData';

interface ClassroomLiveViewProps {
  onBackToPrep: () => void;
}

export const ClassroomLiveView: React.FC<ClassroomLiveViewProps> = ({ onBackToPrep }) => {
  const { 
    activeLesson, 
    lessons, 
    logQuickTranslate, 
    cachedLessonsMap 
  } = useApp();

  // Current page index for Textbook Dual-Zone View
  const [currentPageIdx, setCurrentPageIdx] = useState<number>(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [audioSpeed, setAudioSpeed] = useState<number>(1.0);

  // Flashcard Drawer toggle
  const [isFlashcardDrawerOpen, setIsFlashcardDrawerOpen] = useState<boolean>(false);

  // Zone C (Quick Translate) Private Staging & Teacher-Controlled Push
  const [quickInput, setQuickInput] = useState<string>('');
  const [isTranslating, setIsTranslating] = useState<boolean>(false);
  const [stagedQuickResult, setStagedQuickResult] = useState<{
    id: string;
    source: string;
    translated: string;
    romanized: string;
    timestamp: Date;
    provider: string;
    targetLang: 'santhali' | 'mundari';
  } | null>(null);
  const [activeLivePush, setActiveLivePush] = useState<LivePushPayload | null>(null);

  // Speech Recognition state
  const [isListening, setIsListening] = useState<boolean>(false);
  const [speechSupported, setSpeechSupported] = useState<boolean>(false);

  // Active Textbook Page Resolution (Class 1 Math-Magic Chapter 1)
  const currentTextbookPage: TextbookPageData = CLASS1_MATH_CHAPTER1_PAGES[currentPageIdx] || CLASS1_MATH_CHAPTER1_PAGES[0];
  const lessonToDisplay = activeLesson || lessons.find(l => l.status === 'verified') || lessons[0];

  // Speech Recognition setup
  const recognitionRef = useRef<unknown>(null);

  // Emit lesson & page change to student display on mount or change
  useEffect(() => {
    syncEngine.sendSetLesson(currentTextbookPage.id);
    syncEngine.sendSetCheckpoint(currentPageIdx);
  }, [currentPageIdx]);

  useEffect(() => {
    const SpeechRecognition = (window as unknown as { SpeechRecognition?: unknown; webkitSpeechRecognition?: unknown }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: unknown }).webkitSpeechRecognition;

    if (SpeechRecognition) {
      setSpeechSupported(true);
      try {
        const recognition = new (SpeechRecognition as new () => {
          continuous: boolean;
          interimResults: boolean;
          lang: string;
          onresult: (event: { results: { [key: number]: { [key: number]: { transcript: string } } } }) => void;
          onerror: (err: unknown) => void;
          onend: () => void;
          start: () => void;
          stop: () => void;
        })();
        
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'hi-IN';

        recognition.onresult = (event) => {
          const text = event.results[0][0].transcript;
          setQuickInput(text);
          setIsListening(false);
          executeQuickTranslate(text);
        };

        recognition.onerror = () => setIsListening(false);
        recognition.onend = () => setIsListening(false);

        recognitionRef.current = recognition;
      } catch (e) {
        console.warn('SpeechRecognition initialization error:', e);
      }
    }
  }, []);

  // Play / Stop Active Page Audio
  const handlePlayActiveAudio = () => {
    if (isPlayingAudio) {
      ttsAdapter.stopAudio();
      setIsPlayingAudio(false);
      return;
    }

    setIsPlayingAudio(true);
    syncEngine.sendPlayAudio(audioSpeed);

    // Read aloud the rich speakable text of the current textbook page
    const textToSpeak = currentTextbookPage.zoneB.speakableText;
    const phoneticFallback = currentTextbookPage.zoneB.romanizedPronunciation || textToSpeak;

    ttsAdapter.playAudio(
      currentTextbookPage.id,
      textToSpeak,
      audioSpeed,
      () => {
        setIsPlayingAudio(false);
      },
      phoneticFallback
    );
  };

  const handleNextPage = () => {
    if (currentPageIdx < CLASS1_MATH_CHAPTER1_PAGES.length - 1) {
      const nextIdx = currentPageIdx + 1;
      setCurrentPageIdx(nextIdx);
      ttsAdapter.stopAudio();
      setIsPlayingAudio(false);
      syncEngine.sendSetCheckpoint(nextIdx);
    }
  };

  const handlePrevPage = () => {
    if (currentPageIdx > 0) {
      const prevIdx = currentPageIdx - 1;
      setCurrentPageIdx(prevIdx);
      ttsAdapter.stopAudio();
      setIsPlayingAudio(false);
      syncEngine.sendSetCheckpoint(prevIdx);
    }
  };

  const handleSelectPage = (idx: number) => {
    setCurrentPageIdx(idx);
    ttsAdapter.stopAudio();
    setIsPlayingAudio(false);
    syncEngine.sendSetCheckpoint(idx);
  };

  // Toggle speech recognition
  const toggleSpeechRecognition = () => {
    if (!speechSupported || !recognitionRef.current) return;
    const recognition = recognitionRef.current as { start: () => void; stop: () => void };

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      try {
        recognition.start();
        setIsListening(true);
      } catch (e) {
        console.warn('Speech recognition start failed:', e);
      }
    }
  };

  // Execute Zone C Quick Translate (Privately Staged on Teacher Controller)
  const executeQuickTranslate = async (textToTranslate?: string) => {
    const text = (textToTranslate || quickInput).trim();
    if (!text) return;

    setIsTranslating(true);
    try {
      const targetLang: 'santhali' | 'mundari' = lessonToDisplay?.target_language === 'mundari' ? 'mundari' : 'santhali';
      const result = await translationService.translate(text, targetLang);

      const staged = {
        id: crypto.randomUUID(),
        source: text,
        translated: result.translatedText,
        romanized: result.romanizedText,
        timestamp: new Date(),
        provider: result.provider === 'dictionary' ? 'Local Authentic Dictionary' : 'AI Multimodal MT Model',
        targetLang
      };

      setStagedQuickResult(staged);
      setQuickInput('');

      // Auto-log to Supabase in background
      await logQuickTranslate(text, targetLang, result.translatedText, result.romanizedText);
    } catch (e) {
      console.error('Quick translate error:', e);
    } finally {
      setIsTranslating(false);
    }
  };

  // Teacher-Controlled Live Push Action
  const handlePushToStudentScreen = () => {
    if (!stagedQuickResult) return;

    const payload: LivePushPayload = {
      id: stagedQuickResult.id,
      sourceText: stagedQuickResult.source,
      translatedText: stagedQuickResult.translated,
      romanizedText: stagedQuickResult.romanized,
      targetLanguage: stagedQuickResult.targetLang,
      timestamp: new Date().toISOString()
    };

    setActiveLivePush(payload);
    syncEngine.sendCastLivePush(payload);
  };

  const handleClearLivePush = () => {
    setActiveLivePush(null);
    syncEngine.sendClearLivePush();
  };

  // Open Student Display in New Window / Projector Screen
  const handleOpenStudentWindow = () => {
    const url = `${window.location.origin}/?view=student`;
    window.open(url, '_blank', 'width=1280,height=800,menubar=no,toolbar=no');
  };

  if (!lessonToDisplay) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center">
        <h2 className="text-xl font-bold text-slate-800">No lessons available</h2>
        <button
          onClick={onBackToPrep}
          className="mt-4 px-6 py-2.5 bg-forest-700 text-white rounded-xl font-bold"
        >
          Go to Lesson Prep
        </button>
      </div>
    );
  }

  const isCurrentLessonCached = cachedLessonsMap[lessonToDisplay.id];
  const IconComponent = Sparkles;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-slate-100 to-slate-200 flex flex-col justify-between p-3 sm:p-6 lg:p-8 space-y-6">
      
      {/* Top Header Bar: Controller Status + Projector Popout + Flashcards Toggle */}
      <div className="flex flex-wrap items-center justify-between bg-white/95 backdrop-blur-md rounded-2xl px-5 py-3.5 border border-slate-200 shadow-sm gap-3">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBackToPrep}
            className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all font-bold text-xs flex items-center space-x-1"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Change Lesson</span>
          </button>

          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 bg-forest-100 text-forest-800 font-extrabold text-xs rounded-full">
                Grade {lessonToDisplay.grade}
              </span>
              <span className="text-xs font-bold text-slate-500">{lessonToDisplay.subject}</span>
              {isCurrentLessonCached && (
                <span className="px-2 py-0.5 bg-emerald-600 text-white text-[10px] font-black rounded-md flex items-center space-x-1">
                  <span>⚡ 100% Offline Ready</span>
                </span>
              )}
            </div>
            <h1 className="text-base sm:text-lg font-black text-slate-900 line-clamp-1">
              {lessonToDisplay.title} (Teacher Controller)
            </h1>
          </div>
        </div>

        {/* Dual-Screen Controls */}
        <div className="flex items-center space-x-2">
          {/* Flashcard Drawer Toggle */}
          <button
            onClick={() => setIsFlashcardDrawerOpen(!isFlashcardDrawerOpen)}
            className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
              isFlashcardDrawerOpen
                ? 'bg-amber-100 text-amber-900 border-amber-300 ring-2 ring-amber-400/30'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
            }`}
          >
            <Layers className="w-4 h-4 text-amber-600" />
            <span>Visual Flashcards</span>
          </button>

          {/* Open Student Projector Popout */}
          <button
            onClick={handleOpenStudentWindow}
            className="flex items-center space-x-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs shadow-md transition-all hover:scale-105 active:scale-95"
            title="Open independent student projector screen in second window"
          >
            <Tv className="w-4 h-4 text-emerald-400" />
            <span>Open Student Screen</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>
      </div>

      {/* FLASHCARD DRAWER (When opened by teacher) */}
      {isFlashcardDrawerOpen && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <h3 className="text-base font-black text-slate-900">
                Visual Flashcard Deck (Click 'Cast to Screen' to display on Projector)
              </h3>
            </div>
            <button
              onClick={() => setIsFlashcardDrawerOpen(false)}
              className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <FlashcardDeck 
            standalone={false} 
            onCastCard={(_card) => {
              // Cast event emitted via syncEngine
            }}
          />
        </div>
      )}

      {/* ========================================================================= */}
      {/* ZONE A + B (TEACHER PACING & DUAL-ZONE TEXTBOOK CONTROLLER) */}
      {/* ========================================================================= */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 min-h-[450px]">
        
        {/* ZONE A: Left Column - Original English Textbook Page */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-slate-200 shadow-classroom flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-4">
            
            {/* Header Badge */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-xs font-black uppercase tracking-wider text-slate-700">
                  {currentTextbookPage.zoneA.language}
                </span>
              </div>
              <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                Page {currentPageIdx + 1} of {CLASS1_MATH_CHAPTER1_PAGES.length}
              </span>
            </div>

            {/* Page Title & Subtitle */}
            <div>
              <div className="text-xl sm:text-2xl font-black text-slate-950 leading-tight">
                {currentTextbookPage.zoneA.title}
              </div>
              {currentTextbookPage.zoneA.subtitle && (
                <div className="text-xs sm:text-sm font-bold text-blue-700 mt-0.5">
                  {currentTextbookPage.zoneA.subtitle}
                </div>
              )}
            </div>

            {/* Story Paragraph (if any) */}
            {currentTextbookPage.zoneA.storyParagraph && (
              <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-2xl text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed">
                📖 {currentTextbookPage.zoneA.storyParagraph}
              </div>
            )}

            {/* Dialogues (if story page) */}
            {currentTextbookPage.zoneA.dialogues && currentTextbookPage.zoneA.dialogues.length > 0 && (
              <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                {currentTextbookPage.zoneA.dialogues.map((dlg, dIdx) => (
                  <div 
                    key={dIdx} 
                    className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-[13px] font-bold text-slate-800 flex items-start space-x-2"
                  >
                    <span className="text-base select-none">{dlg.icon}</span>
                    <div>
                      <span className="text-slate-500 font-extrabold mr-1">{dlg.speaker}:</span>
                      <span>"{dlg.text}"</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Exercise Items (if exercise page) */}
            {currentTextbookPage.zoneA.exercises && currentTextbookPage.zoneA.exercises.length > 0 && (
              <div className="space-y-3 max-h-[240px] overflow-y-auto pr-1">
                {currentTextbookPage.zoneA.exercises.map((ex, exIdx) => (
                  <div key={exIdx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                    <div className="text-xs font-black text-slate-900">{ex.question}</div>
                    <div className="grid grid-cols-2 gap-2">
                      {ex.items.map((item, itmIdx) => (
                        <div key={itmIdx} className="flex items-center space-x-2 p-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-800">
                          <span className="text-lg">{item.icon}</span>
                          <span className="line-clamp-1">{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Visual Note Banner */}
            {currentTextbookPage.zoneA.visualNote && (
              <div className="text-xs font-bold text-slate-500 italic">
                🎨 {currentTextbookPage.zoneA.visualNote}
              </div>
            )}
          </div>

          {/* Page Stepper Selector */}
          <div className="pt-4 border-t border-slate-100 flex items-center space-x-2">
            <span className="text-xs font-bold text-slate-400">Pages:</span>
            {CLASS1_MATH_CHAPTER1_PAGES.map((page, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectPage(idx)}
                className={`w-8 h-8 rounded-xl text-xs font-black transition-all ${
                  idx === currentPageIdx
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
                title={page.topicBadge}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* ZONE B: Right Column - Verified Mundari Vernacular Translation & Synchronized Audio */}
        <div className="bg-forest-900 text-white rounded-3xl p-6 sm:p-7 border-2 border-forest-700 shadow-checkpoint flex flex-col justify-between relative overflow-hidden">
          
          <div className="space-y-4">
            
            {/* Header Badge */}
            <div className="flex items-center justify-between border-b border-forest-800 pb-3">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-black uppercase tracking-wider text-emerald-300">
                  {currentTextbookPage.zoneB.language}
                </span>
              </div>
              
              <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded-full text-[11px] font-bold border border-emerald-500/30">
                PALASH Verified
              </span>
            </div>

            {/* Mundari Page Title & Subtitle */}
            <div>
              <div className="text-xl sm:text-2xl font-black text-amber-200 leading-tight">
                {currentTextbookPage.zoneB.title}
              </div>
              {currentTextbookPage.zoneB.subtitle && (
                <div className="text-xs sm:text-sm font-bold text-emerald-300 mt-0.5">
                  {currentTextbookPage.zoneB.subtitle}
                </div>
              )}
            </div>

            {/* Mundari Story Paragraph */}
            {currentTextbookPage.zoneB.storyParagraph && (
              <div className="p-3 bg-forest-950/80 border border-forest-800 rounded-2xl text-xs sm:text-sm font-semibold text-emerald-100 leading-relaxed">
                📖 {currentTextbookPage.zoneB.storyParagraph}
              </div>
            )}

            {/* Mundari Dialogues */}
            {currentTextbookPage.zoneB.dialogues && currentTextbookPage.zoneB.dialogues.length > 0 && (
              <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                {currentTextbookPage.zoneB.dialogues.map((dlg, dIdx) => (
                  <div 
                    key={dIdx} 
                    className="p-2.5 bg-forest-950 border border-forest-800 rounded-xl text-xs sm:text-[13px] font-bold text-emerald-100 flex items-start space-x-2"
                  >
                    <span className="text-base select-none">{dlg.icon}</span>
                    <div>
                      <span className="text-emerald-400 font-extrabold mr-1">{dlg.speaker}:</span>
                      <span>"{dlg.text}"</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Mundari Exercise Items */}
            {currentTextbookPage.zoneB.exercises && currentTextbookPage.zoneB.exercises.length > 0 && (
              <div className="space-y-3 max-h-[240px] overflow-y-auto pr-1">
                {currentTextbookPage.zoneB.exercises.map((ex, exIdx) => (
                  <div key={exIdx} className="p-3 bg-forest-950 border border-forest-800 rounded-xl space-y-2">
                    <div className="text-xs font-black text-amber-200">{ex.question}</div>
                    <div className="grid grid-cols-2 gap-2">
                      {ex.items.map((item, itmIdx) => (
                        <div key={itmIdx} className="flex items-center space-x-2 p-2 bg-forest-900 border border-forest-800 rounded-lg text-xs font-bold text-emerald-100">
                          <span className="text-lg">{item.icon}</span>
                          <span className="line-clamp-1">{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Roman Phonetic Pronunciation Guide */}
            {currentTextbookPage.zoneB.romanizedPronunciation && (
              <div className="text-xs sm:text-sm text-forest-200 italic font-medium">
                🗣️ Pronunciation: "{currentTextbookPage.zoneB.romanizedPronunciation}"
              </div>
            )}
          </div>

          {/* Bottom Controls: Audio Play Button + Speed Controller + Icon Badge */}
          <div className="pt-5 border-t border-forest-800 flex flex-wrap items-center justify-between gap-4">
            
            {/* Big Audio Play Button */}
            <div className="flex items-center space-x-3">
              <button
                onClick={handlePlayActiveAudio}
                className={`classroom-tap-target flex items-center space-x-3 px-6 py-3 rounded-2xl font-black text-base shadow-xl transition-all hover:scale-105 active:scale-95 ${
                  isPlayingAudio
                    ? 'bg-amber-400 text-slate-950 ring-4 ring-amber-300/40 animate-pulse'
                    : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
                }`}
                title="Play cached Mundari translation audio on Controller & Projector"
              >
                <Volume2 className={`w-6 h-6 ${isPlayingAudio ? 'animate-bounce' : ''}`} />
                <span>{isPlayingAudio ? 'Broadcasting Mundari Audio...' : 'Play Mundari Audio Sync'}</span>
              </button>

              {isPlayingAudio && (
                <div className="flex items-end space-x-1 h-7">
                  <div className="w-1.5 bg-amber-400 rounded-full wave-bar-1" />
                  <div className="w-1.5 bg-amber-300 rounded-full wave-bar-2" />
                  <div className="w-1.5 bg-amber-400 rounded-full wave-bar-3" />
                  <div className="w-1.5 bg-amber-200 rounded-full wave-bar-4" />
                  <div className="w-1.5 bg-amber-400 rounded-full wave-bar-5" />
                </div>
              )}
            </div>

            {/* Speed Controller & Vocabulary Icon */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center bg-forest-950 p-1 rounded-xl border border-forest-800 text-xs font-bold">
                <button
                  onClick={() => setAudioSpeed(0.8)}
                  className={`px-2 py-1 rounded-lg ${audioSpeed === 0.8 ? 'bg-forest-700 text-white' : 'text-forest-400'}`}
                >
                  0.8x
                </button>
                <button
                  onClick={() => setAudioSpeed(1.0)}
                  className={`px-2 py-1 rounded-lg ${audioSpeed === 1.0 ? 'bg-forest-700 text-white' : 'text-forest-400'}`}
                >
                  1.0x
                </button>
                <button
                  onClick={() => setAudioSpeed(1.2)}
                  className={`px-2 py-1 rounded-lg ${audioSpeed === 1.2 ? 'bg-forest-700 text-white' : 'text-forest-400'}`}
                >
                  1.2x
                </button>
              </div>

              <div className="w-11 h-11 rounded-2xl bg-forest-800 border border-forest-700 flex items-center justify-center text-amber-300 shadow-inner">
                <IconComponent className="w-5 h-5" />
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Large Navigation Controls */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPageIdx === 0}
          className={`classroom-tap-target flex-1 flex items-center justify-center space-x-2 py-3 px-6 rounded-2xl font-extrabold text-sm sm:text-base border transition-all ${
            currentPageIdx === 0
              ? 'bg-slate-200 text-slate-400 border-slate-300 cursor-not-allowed opacity-50'
              : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-300 shadow-sm active:scale-95'
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Previous Textbook Page</span>
        </button>

        <button
          onClick={handleNextPage}
          disabled={currentPageIdx === CLASS1_MATH_CHAPTER1_PAGES.length - 1}
          className={`classroom-tap-target flex-1 flex items-center justify-center space-x-2 py-3 px-6 rounded-2xl font-extrabold text-sm sm:text-base transition-all ${
            currentPageIdx === CLASS1_MATH_CHAPTER1_PAGES.length - 1
              ? 'bg-slate-200 text-slate-400 border-slate-300 cursor-not-allowed opacity-50'
              : 'bg-forest-700 hover:bg-forest-800 text-white shadow-lg shadow-forest-700/25 active:scale-95'
          }`}
        >
          <span>Next Textbook Page</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* ========================================================================= */}
      {/* ZONE C (TEACHER-CONTROLLED LIVE PUSH: QUICK TRANSLATE STAGING TRAY) */}
      {/* ========================================================================= */}
      <div className="bg-slate-900 text-slate-100 rounded-3xl p-5 sm:p-6 border-2 border-amber-500/80 shadow-quicktrans relative space-y-4">
        
        {/* Zone C Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
            <span className="text-xs font-black uppercase tracking-wider text-amber-300">
              Zone C • Quick Translate (Teacher Controlled Staging)
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {activeLivePush && (
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-xs font-black border border-red-500/40">
                <Radio className="w-3.5 h-3.5 text-red-400 animate-pulse" />
                <span>Currently Cast on Student Screen</span>
              </span>
            )}

            <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-xs font-black border border-amber-500/40">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Unverified — AI Generated</span>
            </div>
          </div>
        </div>

        {/* Input Bar: Speech-to-Text Mic + Quick Text Box + Send */}
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            executeQuickTranslate();
          }}
          className="flex items-center space-x-2"
        >
          {speechSupported && (
            <button
              type="button"
              onClick={toggleSpeechRecognition}
              className={`classroom-tap-target p-3.5 rounded-2xl font-bold transition-all shrink-0 flex items-center justify-center ${
                isListening
                  ? 'bg-red-500 text-white ring-4 ring-red-400/40 animate-pulse'
                  : 'bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700'
              }`}
              title="Speak Hindi sentence via microphone"
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>
          )}

          <input
            type="text"
            value={quickInput}
            onChange={(e) => setQuickInput(e.target.value)}
            placeholder="Type or speak spontaneous student question (e.g. Who are you? / हु आर यू?)..."
            className="flex-1 px-4 py-3 bg-slate-800/90 border border-slate-700 rounded-2xl text-sm font-medium text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all"
          />

          <button
            type="submit"
            disabled={isTranslating || !quickInput.trim()}
            className={`classroom-tap-target px-5 py-3 rounded-2xl font-black text-sm shrink-0 flex items-center space-x-1.5 transition-all ${
              isTranslating || !quickInput.trim()
                ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20 active:scale-95'
            }`}
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">{isTranslating ? 'Translating...' : 'Translate'}</span>
          </button>
        </form>

        {/* Private Staging Card with Teacher-Controlled Live Push Buttons */}
        {stagedQuickResult && (
          <div className="bg-slate-950/90 rounded-2xl p-5 border border-amber-500/50 space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="flex flex-wrap items-center justify-between text-[11px] font-bold gap-2">
              <span className="text-slate-400">Staged Question: "{stagedQuickResult.source}"</span>
              <span className="text-amber-400">Provider: {stagedQuickResult.provider} • Auto-Logged for Review</span>
            </div>

            <div className="text-xl sm:text-2xl font-black text-amber-300 tracking-wide">
              {stagedQuickResult.translated}
            </div>

            {stagedQuickResult.romanized && (
              <div className="text-xs text-slate-300 italic font-mono">
                Phonetic: {stagedQuickResult.romanized}
              </div>
            )}

            {/* Teacher Control Actions: Cast to Screen / Clear / Discard */}
            <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2">
              <div className="text-xs text-slate-400">
                👉 Review translation above. Click <strong>"Cast to Student Display"</strong> to push it live to the classroom screen.
              </div>

              <div className="flex items-center space-x-2">
                {activeLivePush ? (
                  <button
                    type="button"
                    onClick={handleClearLivePush}
                    className="inline-flex items-center space-x-1.5 px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl text-xs shadow-md transition-all"
                  >
                    <X className="w-4 h-4" />
                    <span>Clear from Student Screen</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handlePushToStudentScreen}
                    className="inline-flex items-center space-x-1.5 px-5 py-2.5 bg-ochre-500 hover:bg-ochre-400 text-slate-950 font-black rounded-xl text-xs shadow-lg shadow-ochre-500/30 transition-all hover:scale-105 active:scale-95"
                  >
                    <Tv className="w-4 h-4" />
                    <span>📢 Cast to Student Display</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Quick Example Query Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="text-slate-400 font-bold">Quick Examples:</span>
          {['हु आर यू', 'बारिश क्यों होती है?', 'पेड़ हमें क्या देते हैं?', 'शाबाश बहुत अच्छा', 'किताब खोलो'].map((phrase) => (
            <button
              key={phrase}
              type="button"
              onClick={() => {
                setQuickInput(phrase);
                executeQuickTranslate(phrase);
              }}
              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg border border-slate-700 transition-all font-medium"
            >
              {phrase}
            </button>
          ))}
        </div>

      </div>

    </div>
  );
};
