import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Lesson, LessonCheckpoint, Flashcard, LivePushPayload } from '../../types';
import { syncEngine } from '../../services/syncEngine';
import { ttsAdapter } from '../../services/ttsAdapter';
import { CLASS1_MATH_CHAPTER1_PAGES } from '../../services/textbookLessonsData';
import { 
  Tv, 
  Volume2, 
  CheckCircle2, 
  Sparkles, 
  AlertTriangle, 
  Sprout, 
  Anchor, 
  Leaf, 
  Flower2, 
  Apple, 
  Droplets, 
  Waves, 
  CloudRain, 
  Sun, 
  Eye, 
  Ear, 
  Hand, 
  Binary, 
  PlusCircle, 
  BookOpen, 
  PenTool,
  RotateCw,
  X
} from 'lucide-react';

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Sprout,
  Anchor,
  Leaf,
  Flower2,
  Apple,
  Droplets,
  Waves,
  CloudRain,
  Sun,
  Eye,
  Ear,
  Hand,
  Binary,
  PlusCircle,
  BookOpen,
  PenTool
};

export const StudentDisplayView: React.FC = () => {
  const { lessons, activeLesson } = useApp();

  // Synchronized Display State
  const [currentLessonId, setCurrentLessonId] = useState<string>(activeLesson?.id || lessons[0]?.id || '');
  const [checkpointIndex, setCheckpointIndex] = useState<number>(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [livePush, setLivePush] = useState<LivePushPayload | null>(null);
  const [castFlashcard, setCastFlashcard] = useState<Flashcard | null>(null);
  const [flashcardFlipped, setFlashcardFlipped] = useState<boolean>(false);
  const [lastSyncTime, setLastSyncTime] = useState<number>(Date.now());

  // Resolve current lesson and checkpoint
  const displayedLesson: Lesson | undefined = lessons.find(l => l.id === currentLessonId) || activeLesson || lessons[0];
  const checkpoints: LessonCheckpoint[] = displayedLesson?.checkpoints || [];
  const currentCheckpoint: LessonCheckpoint | undefined = checkpoints[checkpointIndex];

  // Subscribe to real-time teacher synchronization events
  useEffect(() => {
    const unsubscribe = syncEngine.subscribe((msg) => {
      setLastSyncTime(Date.now());

      switch (msg.type) {
        case 'SET_LESSON':
          if (msg.payload?.lessonId) {
            setCurrentLessonId(msg.payload.lessonId);
            setCheckpointIndex(0);
            setCastFlashcard(null);
            setLivePush(null);
          }
          break;

        case 'SET_CHECKPOINT':
          if (typeof msg.payload?.checkpointIndex === 'number') {
            setCheckpointIndex(msg.payload.checkpointIndex);
            setIsPlayingAudio(false);
          }
          break;

        case 'PLAY_AUDIO':
          setIsPlayingAudio(true);
          if (currentCheckpoint) {
            ttsAdapter.playAudio(
              currentCheckpoint.id, 
              currentCheckpoint.translated_text, 
              msg.payload?.audioSpeed || 1.0, 
              () => {
                setIsPlayingAudio(false);
              }
            );
          }
          break;

        case 'STOP_AUDIO':
          setIsPlayingAudio(false);
          break;

        case 'CAST_LIVE_PUSH':
          if (msg.payload?.livePush) {
            setLivePush(msg.payload.livePush);
          }
          break;

        case 'CLEAR_LIVE_PUSH':
          setLivePush(null);
          break;

        case 'CAST_FLASHCARD':
          if (msg.payload?.flashcard) {
            setCastFlashcard(msg.payload.flashcard);
            setFlashcardFlipped(false);
          }
          break;

        case 'CLEAR_FLASHCARD':
          setCastFlashcard(null);
          break;
      }
    });

    return () => {
      unsubscribe();
    };
  }, [currentCheckpoint]);

  const FlashcardIcon = castFlashcard?.icon_name && ICON_MAP[castFlashcard.icon_name] 
    ? ICON_MAP[castFlashcard.icon_name] 
    : Sparkles;

  return (
    <div className="min-h-[calc(100vh-4.5rem)] bg-slate-950 text-white flex flex-col justify-between p-4 sm:p-8 select-none relative overflow-hidden font-sans">
      
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-forest-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header: Theater Screen Bar */}
      <div className="flex items-center justify-between bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl px-6 py-4 shadow-2xl relative z-10">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-forest-600 flex items-center justify-center text-white shadow-lg shadow-forest-600/30">
            <Tv className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-3 py-0.5 bg-forest-500/20 text-emerald-300 font-black text-xs rounded-full border border-forest-500/30">
                Grade {displayedLesson?.grade || 1}
              </span>
              <span className="text-xs font-bold text-slate-400">{displayedLesson?.subject}</span>
              <span className="text-slate-600">•</span>
              <span className="text-xs font-bold text-amber-400 uppercase">
                {displayedLesson?.target_language === 'santhali' ? 'Santhali (ᱥᱟᱱᱛᱟᱲᱤ)' : 'Mundari (मुण्डारी)'}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-0.5">
              {displayedLesson?.title}
            </h1>
          </div>
        </div>

        {/* Sync Status Badge */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 px-3.5 py-1.5 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/30 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Live Sync Active</span>
          </div>

          <div className="text-right">
            <div className="text-xs font-extrabold text-slate-400">
              Checkpoint <span className="text-amber-400 text-sm font-black">{checkpointIndex + 1}</span> / {checkpoints.length}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CENTER STAGE: DYNAMIC DISPLAY MODES */}
      {/* 1. Fullscreen Visual Flashcard (if cast by teacher) */}
      {/* 2. Synchronized Bilingual Checkpoint View (default) */}
      {/* ========================================================================= */}
      <div className="my-6 flex-1 flex items-center justify-center relative z-10">
        
        {castFlashcard ? (
          // MODE 1: FULLSCREEN 3D FLASHCARD CAST VIEW
          <div className="w-full max-w-4xl animate-in zoom-in-95 duration-300">
            <div className="text-center mb-4 flex items-center justify-between px-2">
              <span className="inline-flex items-center space-x-2 px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-xs font-black border border-amber-500/40">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Visual Flashcard Mode (Grade {castFlashcard.grade} • {castFlashcard.category})</span>
              </span>

              <button
                onClick={() => setCastFlashcard(null)}
                className="p-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-400 hover:text-white transition-all text-xs font-bold flex items-center space-x-1"
              >
                <X className="w-4 h-4" />
                <span>Dismiss Flashcard</span>
              </button>
            </div>

            <div 
              onClick={() => setFlashcardFlipped(!flashcardFlipped)}
              className={`rounded-3xl p-8 sm:p-12 border-2 cursor-pointer transition-all duration-500 shadow-2xl text-center flex flex-col items-center justify-center space-y-6 ${
                flashcardFlipped
                  ? 'bg-gradient-to-br from-forest-900 via-forest-950 to-slate-950 border-emerald-500 ring-4 ring-emerald-500/30'
                  : 'bg-gradient-to-br from-slate-900 via-slate-850 to-slate-950 border-slate-700 hover:border-slate-600'
              }`}
            >
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl bg-white/10 border border-white/20 flex items-center justify-center text-amber-300 shadow-inner">
                <FlashcardIcon className="w-16 h-16 sm:w-20 sm:h-20" />
              </div>

              {!flashcardFlipped ? (
                <div className="space-y-3">
                  <div className="text-3xl sm:text-5xl font-black text-white font-hindi">
                    {castFlashcard.hindi_word}
                  </div>
                  <div className="text-sm font-bold text-slate-400 flex items-center justify-center space-x-1">
                    <RotateCw className="w-4 h-4" />
                    <span>Click anywhere to reveal vernacular translation</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 animate-in fade-in zoom-in-90 duration-300">
                  <div className="text-4xl sm:text-6xl font-black text-amber-300 tracking-wide">
                    {castFlashcard.vernacular_word}
                  </div>
                  <div className="text-lg sm:text-2xl text-emerald-300 font-mono italic">
                    "{castFlashcard.romanized}"
                  </div>
                  {castFlashcard.example_sentence_vernacular && (
                    <div className="text-base sm:text-xl text-slate-200 bg-forest-950/80 p-4 rounded-2xl border border-forest-800 max-w-2xl mx-auto">
                      {castFlashcard.example_sentence_vernacular}
                    </div>
                  )}
                </div>
              )}

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  ttsAdapter.playAudio(castFlashcard.id, castFlashcard.vernacular_word);
                }}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95 text-sm"
              >
                <Volume2 className="w-5 h-5" />
                <span>Listen Pronunciation</span>
              </button>
            </div>
          </div>
        ) : (
          // MODE 2: SYNCHRONIZED BILINGUAL TEXTBOOK DUAL SCREEN (ZONE A + ZONE B)
          <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            
            {/* Zone A: Original English Textbook Page */}
            <div className="bg-slate-900/90 rounded-3xl p-7 sm:p-9 border-2 border-slate-700 shadow-2xl flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-blue-400" />
                    <span className="text-xs font-black uppercase tracking-wider text-slate-300">
                      Original English Textbook (Zone A)
                    </span>
                  </div>
                  <span className="text-xs font-bold text-slate-400 bg-slate-800 px-3 py-1 rounded-full">
                    Page {checkpointIndex + 1}
                  </span>
                </div>

                <div className="text-2xl sm:text-3xl font-black text-white leading-tight">
                  {CLASS1_MATH_CHAPTER1_PAGES[checkpointIndex]?.zoneA.title || 'Inside - Outside'}
                </div>

                {CLASS1_MATH_CHAPTER1_PAGES[checkpointIndex]?.zoneA.subtitle && (
                  <div className="text-sm font-bold text-blue-400 mt-1">
                    {CLASS1_MATH_CHAPTER1_PAGES[checkpointIndex]?.zoneA.subtitle}
                  </div>
                )}

                {CLASS1_MATH_CHAPTER1_PAGES[checkpointIndex]?.zoneA.storyParagraph && (
                  <div className="mt-3 p-3 bg-slate-800/80 rounded-2xl border border-slate-700 text-sm font-medium text-slate-200 leading-relaxed">
                    📖 {CLASS1_MATH_CHAPTER1_PAGES[checkpointIndex]?.zoneA.storyParagraph}
                  </div>
                )}

                {/* Dialogues */}
                {CLASS1_MATH_CHAPTER1_PAGES[checkpointIndex]?.zoneA.dialogues && (
                  <div className="mt-3 space-y-2 max-h-[220px] overflow-y-auto pr-1">
                    {CLASS1_MATH_CHAPTER1_PAGES[checkpointIndex]?.zoneA.dialogues?.map((d, i) => (
                      <div key={i} className="p-2 bg-slate-800 rounded-xl text-xs sm:text-sm font-bold text-slate-200 flex items-start space-x-2">
                        <span>{d.icon}</span>
                        <div>
                          <span className="text-blue-400 font-black mr-1">{d.speaker}:</span>
                          <span>"{d.text}"</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Exercises */}
                {CLASS1_MATH_CHAPTER1_PAGES[checkpointIndex]?.zoneA.exercises && (
                  <div className="mt-3 space-y-2 max-h-[220px] overflow-y-auto pr-1">
                    {CLASS1_MATH_CHAPTER1_PAGES[checkpointIndex]?.zoneA.exercises?.map((ex, i) => (
                      <div key={i} className="p-2.5 bg-slate-800 rounded-xl space-y-1.5">
                        <div className="text-xs font-black text-white">{ex.question}</div>
                        <div className="grid grid-cols-2 gap-2">
                          {ex.items.map((itm, itmIdx) => (
                            <div key={itmIdx} className="flex items-center space-x-2 p-1.5 bg-slate-900 rounded-lg text-xs font-bold text-slate-200">
                              <span className="text-base">{itm.icon}</span>
                              <span className="line-clamp-1">{itm.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-3 text-xs text-slate-400 pt-3 border-t border-slate-800">
                <span className="font-bold">Textbook Concept:</span>
                <span>{CLASS1_MATH_CHAPTER1_PAGES[checkpointIndex]?.zoneA.visualNote || 'Class 1 Math-Magic'}</span>
              </div>
            </div>

            {/* Zone B: Verified Mundari Vernacular Translation */}
            <div className="bg-gradient-to-br from-forest-950 via-slate-900 to-forest-900 rounded-3xl p-7 sm:p-9 border-2 border-forest-600 shadow-2xl flex flex-col justify-between space-y-4 relative overflow-hidden">
              <div>
                <div className="flex items-center justify-between border-b border-forest-800 pb-3 mb-3">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span className="text-xs font-black uppercase tracking-wider text-emerald-300">
                      Verified Vernacular (Zone B • Mundari / मुण्डारी)
                    </span>
                  </div>

                  <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-bold border border-emerald-500/30">
                    PALASH Verified
                  </span>
                </div>

                <div className="text-2xl sm:text-3xl font-black text-amber-300 leading-tight">
                  {CLASS1_MATH_CHAPTER1_PAGES[checkpointIndex]?.zoneB.title || 'भितर - बाहरे'}
                </div>

                {CLASS1_MATH_CHAPTER1_PAGES[checkpointIndex]?.zoneB.subtitle && (
                  <div className="text-sm font-bold text-emerald-300 mt-1">
                    {CLASS1_MATH_CHAPTER1_PAGES[checkpointIndex]?.zoneB.subtitle}
                  </div>
                )}

                {CLASS1_MATH_CHAPTER1_PAGES[checkpointIndex]?.zoneB.storyParagraph && (
                  <div className="mt-3 p-3 bg-forest-950/90 rounded-2xl border border-forest-800 text-sm font-semibold text-emerald-100 leading-relaxed">
                    📖 {CLASS1_MATH_CHAPTER1_PAGES[checkpointIndex]?.zoneB.storyParagraph}
                  </div>
                )}

                {/* Mundari Dialogues */}
                {CLASS1_MATH_CHAPTER1_PAGES[checkpointIndex]?.zoneB.dialogues && (
                  <div className="mt-3 space-y-2 max-h-[220px] overflow-y-auto pr-1">
                    {CLASS1_MATH_CHAPTER1_PAGES[checkpointIndex]?.zoneB.dialogues?.map((d, i) => (
                      <div key={i} className="p-2 bg-forest-950 rounded-xl text-xs sm:text-sm font-bold text-emerald-100 flex items-start space-x-2">
                        <span>{d.icon}</span>
                        <div>
                          <span className="text-emerald-400 font-black mr-1">{d.speaker}:</span>
                          <span>"{d.text}"</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Mundari Exercises */}
                {CLASS1_MATH_CHAPTER1_PAGES[checkpointIndex]?.zoneB.exercises && (
                  <div className="mt-3 space-y-2 max-h-[220px] overflow-y-auto pr-1">
                    {CLASS1_MATH_CHAPTER1_PAGES[checkpointIndex]?.zoneB.exercises?.map((ex, i) => (
                      <div key={i} className="p-2.5 bg-forest-950 rounded-xl space-y-1.5">
                        <div className="text-xs font-black text-amber-200">{ex.question}</div>
                        <div className="grid grid-cols-2 gap-2">
                          {ex.items.map((itm, itmIdx) => (
                            <div key={itmIdx} className="flex items-center space-x-2 p-1.5 bg-forest-900 rounded-lg text-xs font-bold text-emerald-100">
                              <span className="text-base">{itm.icon}</span>
                              <span className="line-clamp-1">{itm.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {CLASS1_MATH_CHAPTER1_PAGES[checkpointIndex]?.zoneB.romanizedPronunciation && (
                  <div className="text-xs sm:text-sm text-emerald-200 italic font-medium mt-3">
                    🗣️ "{CLASS1_MATH_CHAPTER1_PAGES[checkpointIndex]?.zoneB.romanizedPronunciation}"
                  </div>
                )}
              </div>

              {/* Synchronized Sound Wave Player Banner */}
              <div className="pt-4 border-t border-forest-800 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2.5 rounded-2xl ${isPlayingAudio ? 'bg-amber-400 text-slate-950 animate-pulse' : 'bg-forest-800 text-emerald-300'}`}>
                    <Volume2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-300">
                      {isPlayingAudio ? 'Teacher Audio Broadcast Active (Mundari)' : 'Mundari Audio Synced'}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Live pronunciation on classroom speakers
                    </div>
                  </div>
                </div>

                {/* Animated Audio Waveform */}
                {isPlayingAudio && (
                  <div className="flex items-end space-x-1.5 h-7">
                    <div className="w-2 bg-amber-400 rounded-full wave-bar-1" />
                    <div className="w-2 bg-amber-300 rounded-full wave-bar-2" />
                    <div className="w-2 bg-amber-400 rounded-full wave-bar-3" />
                    <div className="w-2 bg-amber-200 rounded-full wave-bar-4" />
                    <div className="w-2 bg-amber-400 rounded-full wave-bar-5" />
                  </div>
                )}
              </div>

            </div>

          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* TEACHER-PUSHED LIVE QUESTION BANNER (ZONE C CAST) */}
      {/* Displays when teacher explicitly clicks 'Cast to Student Display' */}
      {/* ========================================================================= */}
      {livePush && (
        <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-amber-950 border-2 border-amber-500 rounded-3xl p-5 sm:p-6 shadow-2xl relative z-20 animate-in slide-in-from-bottom-5 duration-300">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-800/80 pb-3 mb-2">
            <div className="flex items-center space-x-2">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
              <span className="text-xs font-black uppercase tracking-wider text-amber-300">
                📢 Live Classroom Question (Spontaneous Translation)
              </span>
            </div>

            <div className="inline-flex items-center space-x-1.5 px-3 py-0.5 bg-amber-500/20 text-amber-300 rounded-full text-xs font-bold border border-amber-500/40">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <span>Unverified — AI Generated</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div>
              <div className="text-xs font-bold text-slate-400">Teacher / Student Asked:</div>
              <div className="text-xl font-bold text-white font-hindi">"{livePush.sourceText}"</div>
            </div>

            <div className="bg-black/40 p-3.5 rounded-2xl border border-amber-500/40">
              <div className="text-xs font-bold text-amber-400 uppercase">Vernacular Output:</div>
              <div className="text-xl font-black text-amber-300">{livePush.translatedText}</div>
              {livePush.romanizedText && (
                <div className="text-xs text-slate-300 italic mt-0.5">Phonetic: {livePush.romanizedText}</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Persistent Bottom Bar */}
      <div className="pt-4 flex items-center justify-between text-xs text-slate-500 border-t border-slate-800">
        <div>PALASH Initiative • Primary Vernacular Classroom Theater Display</div>
        <div>Room: {syncEngine.getSessionId()} • Last Sync: {new Date(lastSyncTime).toLocaleTimeString()}</div>
      </div>

    </div>
  );
};
