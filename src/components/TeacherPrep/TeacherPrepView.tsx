import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Lesson, LessonCheckpoint } from '../../types';
import { 
  JHARKHAND_STATE_CURRICULUM, 
  ClassCurriculum, 
  SubjectBook, 
  ChapterItem 
} from '../../services/curriculumData';
import { generateChapterPDF } from '../../services/pdfExportService';
import { 
  BookOpen, 
  Search, 
  HardDriveDownload, 
  Play, 
  Plus, 
  Trash2, 
  Sparkles, 
  Layers, 
  FileText, 
  ChevronDown, 
  ChevronUp, 
  GraduationCap, 
  Volume2, 
  X
} from 'lucide-react';
import { ttsAdapter } from '../../services/ttsAdapter';

interface TeacherPrepViewProps {
  onStartLiveClass: (lesson: Lesson) => void;
}

export const TeacherPrepView: React.FC<TeacherPrepViewProps> = ({ onStartLiveClass }) => {
  const { 
    lessons, 
    cachedLessonsMap, 
    prepareLessonOffline, 
    unprepareLessonOffline, 
    createLessonDraft,
    setActiveLesson,
    setNotification
  } = useApp();

  // Selected Class & Subject
  const [selectedGrade, setSelectedGrade] = useState<number | 'drafts'>(1);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('c1_raindrops');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedChapterId, setExpandedChapterId] = useState<string | null>('c1_rd_01');
  const [isPreparingId, setIsPreparingId] = useState<string | null>(null);
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

  // Modal State for "Draft New Lesson"
  const [isDraftModalOpen, setIsDraftModalOpen] = useState<boolean>(false);
  const [draftTitle, setDraftTitle] = useState<string>('');
  const [draftGrade, setDraftGrade] = useState<number>(1);
  const [draftSubject, setDraftSubject] = useState<string>('Raindrops (English Reader)');
  const [draftLang, setDraftLang] = useState<'santhali' | 'mundari'>('santhali');
  const [draftCheckpoints, setDraftCheckpoints] = useState<string[]>([
    'Clap your hands together and sing along with friends.',
    'Birds are flying high in the blue morning sky.'
  ]);

  // Selected Lesson Details Modal
  const [inspectedLesson, setInspectedLesson] = useState<Lesson | null>(null);

  // Resolve active state class
  const activeClassCurriculum: ClassCurriculum | undefined = 
    typeof selectedGrade === 'number'
      ? JHARKHAND_STATE_CURRICULUM.find(c => c.grade === selectedGrade) || JHARKHAND_STATE_CURRICULUM[0]
      : undefined;

  // Resolve active subject
  const currentSubject: SubjectBook | undefined = 
    activeClassCurriculum?.subjects.find(s => s.id === selectedSubjectId) || activeClassCurriculum?.subjects[0];

  // Filter chapters if in curriculum mode
  const filteredChapters = (currentSubject?.chapters || []).filter((ch) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      ch.title.toLowerCase().includes(q) ||
      (ch.hindiTitle && ch.hindiTitle.toLowerCase().includes(q)) ||
      ch.description.toLowerCase().includes(q) ||
      ch.vernacularConcepts.santhali.toLowerCase().includes(q) ||
      ch.vernacularConcepts.mundari.toLowerCase().includes(q) ||
      ch.vernacularConcepts.romanized.toLowerCase().includes(q)
    );
  });

  // Filter custom teacher lessons
  const filteredDraftLessons = lessons.filter(l => {
    if (selectedGrade === 'drafts') return true;
    if (selectedGrade !== l.grade) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return l.title.toLowerCase().includes(q) || l.subject.toLowerCase().includes(q);
    }
    return true;
  });

  const handleSelectGrade = (grade: number | 'drafts') => {
    setSelectedGrade(grade);
    if (typeof grade === 'number') {
      const newClass = JHARKHAND_STATE_CURRICULUM.find(c => c.grade === grade);
      if (newClass && newClass.subjects.length > 0) {
        setSelectedSubjectId(newClass.subjects[0].id);
        setExpandedChapterId(newClass.subjects[0].chapters[0]?.id || null);
      }
    }
  };

  const handlePrepareClick = async (e: React.MouseEvent, lesson: Lesson) => {
    e.stopPropagation();
    setIsPreparingId(lesson.id);
    await prepareLessonOffline(lesson);
    setIsPreparingId(null);
  };

  const handleUnprepareClick = async (e: React.MouseEvent, lessonId: string) => {
    e.stopPropagation();
    await unprepareLessonOffline(lessonId);
  };

  const handleDownloadPDF = (chapter: ChapterItem, tier: 'basic' | 'advance') => {
    if (!currentSubject) return;
    generateChapterPDF(chapter, currentSubject, typeof selectedGrade === 'number' ? selectedGrade : 1, tier);
    setNotification({
      type: 'success',
      message: `Generating ${tier === 'advance' ? 'Advance Bilingual Guide' : 'Basic Worksheet'} for Chapter ${chapter.chapterNumber}: ${chapter.title}`
    });
  };

  const handleLaunchChapterInClass = (chapter: ChapterItem) => {
    // Find matching lesson or build live lesson session
    const match = lessons.find(l => 
      l.grade === (typeof selectedGrade === 'number' ? selectedGrade : 1) && 
      l.title.toLowerCase().includes(chapter.title.toLowerCase())
    ) || lessons[0];

    if (match) {
      setActiveLesson(match);
      onStartLiveClass(match);
    }
  };

  const handleAddDraftCheckpoint = () => {
    setDraftCheckpoints(prev => [...prev, '']);
  };

  const handleRemoveDraftCheckpoint = (index: number) => {
    setDraftCheckpoints(prev => prev.filter((_, i) => i !== index));
  };

  const handleDraftSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!draftTitle.trim()) return;
    const validCheckpoints = draftCheckpoints.filter(cp => cp.trim().length > 0);
    if (validCheckpoints.length === 0) return;

    await createLessonDraft(draftTitle, draftGrade, draftSubject, draftLang, validCheckpoints);
    setIsDraftModalOpen(false);
    setDraftTitle('');
    setDraftCheckpoints(['']);
    setSelectedGrade('drafts');
  };

  const handlePlayCheckpointAudio = async (cp: LessonCheckpoint) => {
    setPlayingAudioId(cp.id);
    await ttsAdapter.playAudio(cp.id, cp.translated_text, 1.0, () => {
      setPlayingAudioId(null);
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-200">
      
      {/* Top Header: Clean and Compact */}
      <div className="bg-gradient-to-r from-forest-800 via-forest-900 to-slate-950 rounded-3xl p-6 text-white shadow-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-black tracking-tight flex items-center space-x-2">
            <GraduationCap className="w-6 h-6 text-amber-300" />
            <span>State Curriculum & Lessons</span>
          </h1>
          <p className="text-forest-200 text-xs font-medium">
            JCERT Primary Textbooks (Class 1–5) • Santhali & Mundari Audio • 1-Click PDF Worksheets
          </p>
        </div>

        {/* Action: "+ Draft New Lesson" Button */}
        <button
          onClick={() => setIsDraftModalOpen(true)}
          className="inline-flex items-center space-x-2 px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-xs shadow-md transition-all hover:scale-105 active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Draft New Lesson</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 1. CLASS & DRAFTS NAVIGATION BAR (Class 1 to 5 + Custom Drafts) */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl p-2.5 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between overflow-x-auto gap-2 p-1">
          {[1, 2, 3, 4, 5].map((grade) => (
            <button
              key={grade}
              onClick={() => handleSelectGrade(grade)}
              className={`flex-1 min-w-[120px] py-3.5 px-4 rounded-2xl font-extrabold text-xs sm:text-sm transition-all flex items-center justify-center space-x-2 ${
                selectedGrade === grade
                  ? 'bg-forest-700 text-white shadow-md shadow-forest-700/25 scale-[1.02]'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              <BookOpen className={`w-4 h-4 ${selectedGrade === grade ? 'text-amber-300' : 'text-slate-400'}`} />
              <span>Class {grade}</span>
            </button>
          ))}

          {/* Custom / Teacher Drafts Tab */}
          <button
            onClick={() => handleSelectGrade('drafts')}
            className={`flex-1 min-w-[140px] py-3.5 px-4 rounded-2xl font-extrabold text-xs sm:text-sm transition-all flex items-center justify-center space-x-2 ${
              selectedGrade === 'drafts'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-600/25 scale-[1.02]'
                : 'bg-amber-50/70 hover:bg-amber-100 text-amber-900 border border-amber-200'
            }`}
          >
            <Sparkles className={`w-4 h-4 ${selectedGrade === 'drafts' ? 'text-white' : 'text-amber-600'}`} />
            <span>Teacher Drafts ({lessons.filter(l => l.status === 'draft').length})</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. CURRICULUM SUBJECTS GRID (When a Grade 1-5 is selected) */}
      {/* ========================================================================= */}
      {typeof selectedGrade === 'number' && activeClassCurriculum && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Layers className="w-5 h-5 text-forest-700" />
              <h2 className="text-lg font-black text-slate-900">
                Textbooks for Class {selectedGrade} ({activeClassCurriculum.subjects.length} Subjects)
              </h2>
            </div>
            <span className="text-xs font-bold text-slate-400">Select a textbook to view chapters</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {activeClassCurriculum.subjects.map((subject) => {
              const isSelected = selectedSubjectId === subject.id;

              return (
                <div
                  key={subject.id}
                  onClick={() => {
                    setSelectedSubjectId(subject.id);
                    setExpandedChapterId(subject.chapters[0]?.id || null);
                  }}
                  className={`p-6 rounded-3xl border-2 cursor-pointer transition-all duration-200 relative overflow-hidden flex flex-col justify-between space-y-4 ${
                    isSelected
                      ? 'bg-white border-forest-600 ring-4 ring-forest-500/20 shadow-xl'
                      : 'bg-white hover:bg-slate-50/80 border-slate-200 hover:border-slate-300 shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-700 text-[10px] font-black rounded-lg uppercase tracking-wider">
                      {subject.category}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold ${
                      isSelected ? 'bg-forest-100 text-forest-800' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {subject.chapters.length} Chapters
                    </span>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${subject.coverColor} text-white flex items-center justify-center shadow-md shrink-0`}>
                      <BookOpen className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="text-base font-black text-slate-900">{subject.title}</h3>
                      <p className="text-xs text-slate-500 line-clamp-2 mt-1 font-medium">{subject.description}</p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-400">Code: {subject.codeName}</span>
                    <span className={`font-black ${isSelected ? 'text-forest-700' : 'text-slate-500'}`}>
                      {isSelected ? '● Active Textbook' : 'Select'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. CHAPTER BREAKDOWN & LESSON ACTION CARDS */}
      {/* ========================================================================= */}
      {typeof selectedGrade === 'number' && currentSubject && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 bg-forest-100 text-forest-800 text-xs font-black rounded-md">
                  Class {selectedGrade}
                </span>
                <span className="text-xs font-bold text-slate-500">{currentSubject.category}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
                {currentSubject.title} • Chapters & Lessons ({currentSubject.chapters.length})
              </h2>
            </div>

            {/* Search Input */}
            <div className="relative min-w-[260px]">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search chapter, Hindi, or vernacular..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-forest-500"
              />
            </div>
          </div>

          {/* Chapters Accordion List */}
          <div className="space-y-3">
            {filteredChapters.length > 0 ? (
              filteredChapters.map((chapter) => {
                const isExpanded = expandedChapterId === chapter.id;

                // Match with database lesson if available
                const matchingDbLesson = lessons.find(l => 
                  l.grade === selectedGrade && 
                  l.title.toLowerCase().includes(chapter.title.toLowerCase())
                );
                const isCached = matchingDbLesson ? !!cachedLessonsMap[matchingDbLesson.id] : false;

                return (
                  <div
                    key={chapter.id}
                    className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                      isExpanded
                        ? 'bg-slate-50/90 border-forest-300 ring-2 ring-forest-500/10 shadow-sm'
                        : 'bg-white hover:bg-slate-50/50 border-slate-200'
                    }`}
                  >
                    {/* Chapter Row Header */}
                    <div 
                      onClick={() => setExpandedChapterId(isExpanded ? null : chapter.id)}
                      className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer select-none"
                    >
                      <div className="flex items-start space-x-3.5">
                        <div className={`w-9 h-9 rounded-xl font-black text-xs flex items-center justify-center shrink-0 ${
                          isExpanded 
                            ? 'bg-forest-700 text-white shadow-sm' 
                            : 'bg-slate-100 text-slate-700'
                        }`}>
                          {chapter.chapterNumber}
                        </div>

                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-base font-extrabold text-slate-900">
                              {chapter.title}
                            </h3>
                            {chapter.hindiTitle && (
                              <span className="text-xs font-bold text-slate-500 font-hindi">
                                • {chapter.hindiTitle}
                              </span>
                            )}
                            {isCached && (
                              <span className="px-2 py-0.5 bg-emerald-600 text-white text-[10px] font-black rounded-md">
                                ⚡ Offline Ready
                              </span>
                            )}
                          </div>

                          <div className="text-xs text-forest-700 font-semibold mt-1 flex items-center space-x-2">
                            <span>Santhali / Mundari Bridge:</span>
                            <span className="font-bold text-slate-800">{chapter.vernacularConcepts.santhali}</span>
                            <span className="text-slate-300">•</span>
                            <span className="italic font-normal text-slate-600 font-mono text-[11px]">{chapter.vernacularConcepts.romanized}</span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Actions (Basic PDF, Advance PDF, Teach Live) */}
                      <div className="flex items-center space-x-2 self-end md:self-auto shrink-0" onClick={(e) => e.stopPropagation()}>
                        
                        <button
                          type="button"
                          onClick={() => handleDownloadPDF(chapter, 'basic')}
                          className="inline-flex items-center space-x-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-all border border-slate-300"
                          title="Download Printable Basic Worksheet"
                        >
                          <FileText className="w-3.5 h-3.5 text-slate-600" />
                          <span>Basic PDF</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDownloadPDF(chapter, 'advance')}
                          className="inline-flex items-center space-x-1.5 px-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-forest-800 font-bold rounded-xl text-xs transition-all border border-emerald-300"
                          title="Download Advance Bilingual Guide with audio flows"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-forest-600" />
                          <span>Advance PDF</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleLaunchChapterInClass(chapter)}
                          className="inline-flex items-center space-x-1.5 px-4 py-2 bg-forest-700 hover:bg-forest-800 text-white font-bold rounded-xl text-xs shadow-md shadow-forest-700/20 transition-all hover:scale-105 active:scale-95"
                          title="Start Live Class on Teacher Controller & Projector"
                        >
                          <Play className="w-3.5 h-3.5 text-amber-300" />
                          <span>Teach Live</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setExpandedChapterId(isExpanded ? null : chapter.id)}
                          className="p-1.5 text-slate-400 hover:text-slate-600 ml-1"
                        >
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Accordion Expanded Content */}
                    {isExpanded && (
                      <div className="px-5 pb-5 pt-2 border-t border-slate-200/80 bg-white/70 space-y-4 animate-in fade-in duration-150">
                        <p className="text-xs text-slate-600 leading-relaxed font-medium">
                          {chapter.description}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                            <span className="font-extrabold text-slate-700 block">Santhali Expression (Ol Chiki & Devanagari):</span>
                            <span className="font-bold text-forest-800 text-sm">{chapter.vernacularConcepts.santhali}</span>
                            <div className="text-[11px] text-slate-500 font-mono italic">Phonetics: "{chapter.vernacularConcepts.romanized}"</div>
                          </div>

                          <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200 space-y-1">
                            <span className="font-extrabold text-amber-900 block">Mundari Expression:</span>
                            <span className="font-bold text-amber-950 text-sm">{chapter.vernacularConcepts.mundari}</span>
                            <div className="text-[11px] text-amber-800 font-mono italic">Phonetics: "{chapter.vernacularConcepts.romanized}"</div>
                          </div>
                        </div>

                        {/* Offline Caching & Checkpoint Details if matching lesson exists */}
                        {matchingDbLesson && (
                          <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100">
                            <div className="text-xs text-slate-500">
                              Database Lesson ID: <span className="font-mono text-slate-700 font-bold">{matchingDbLesson.id.slice(0, 8)}...</span>
                            </div>

                            <div className="flex items-center space-x-2">
                              {isCached ? (
                                <button
                                  type="button"
                                  onClick={(e) => handleUnprepareClick(e, matchingDbLesson.id)}
                                  className="px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 rounded-xl font-bold border border-red-200"
                                >
                                  Remove from Offline Cache
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  disabled={isPreparingId === matchingDbLesson.id}
                                  onClick={(e) => handlePrepareClick(e, matchingDbLesson)}
                                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm"
                                >
                                  <HardDriveDownload className="w-3.5 h-3.5" />
                                  <span>{isPreparingId === matchingDbLesson.id ? 'Pre-caching Audio...' : 'Prepare Audio for Offline'}</span>
                                </button>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="py-12 text-center text-slate-400 space-y-2">
                <Search className="w-8 h-8 mx-auto text-slate-300" />
                <p className="text-sm font-semibold">No chapters match "{searchQuery}"</p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-xs font-bold text-forest-700 hover:underline"
                >
                  Clear search query
                </button>
              </div>
            )}
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. TEACHER CREATED / DRAFT LESSONS SECTION */}
      {/* ========================================================================= */}
      {selectedGrade === 'drafts' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-black text-slate-900">
                Custom & Draft Lessons Created by Teachers
              </h2>
              <p className="text-xs text-slate-500">
                Community-created lessons submitted for review or ready for classroom presentation.
              </p>
            </div>

            <button
              onClick={() => setIsDraftModalOpen(true)}
              className="inline-flex items-center space-x-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs shadow-md transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>+ Create New Lesson</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDraftLessons.map((lesson) => {
              const isVerified = lesson.status === 'verified';

              return (
                <div
                  key={lesson.id}
                  onClick={() => setInspectedLesson(lesson)}
                  className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 bg-slate-100 text-slate-700 font-extrabold text-xs rounded-full">
                        Grade {lesson.grade} • {lesson.subject}
                      </span>

                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold ${
                        isVerified ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {isVerified ? 'Verified' : 'In Review'}
                      </span>
                    </div>

                    <h3 className="text-base font-black text-slate-900 line-clamp-1">
                      {lesson.title}
                    </h3>

                    <div className="text-xs font-semibold text-slate-500">
                      Target Language: <span className="capitalize font-bold text-slate-800">{lesson.target_language}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <span className="text-xs text-slate-400 font-bold">
                      {lesson.checkpoints?.length || 0} Checkpoints
                    </span>

                    <div className="flex items-center space-x-2" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveLesson(lesson);
                          onStartLiveClass(lesson);
                        }}
                        className="inline-flex items-center space-x-1 px-3 py-1.5 bg-forest-700 hover:bg-forest-800 text-white font-bold rounded-xl text-xs"
                      >
                        <Play className="w-3.5 h-3.5" />
                        <span>Teach</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. MODAL: DRAFT NEW LESSON WITH AUTO-TRANSLATION */}
      {/* ========================================================================= */}
      {isDraftModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <h3 className="text-xl font-black text-slate-900">
                  Draft New Bilingual Classroom Lesson
                </h3>
              </div>
              <button
                onClick={() => setIsDraftModalOpen(false)}
                className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleDraftSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Lesson Title</label>
                <input
                  type="text"
                  required
                  value={draftTitle}
                  onChange={(e) => setDraftTitle(e.target.value)}
                  placeholder="e.g. Parts of a Plant / Chhotu's House"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-forest-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700">Grade / Class</label>
                  <select
                    value={draftGrade}
                    onChange={(e) => setDraftGrade(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-800"
                  >
                    {[1, 2, 3, 4, 5].map(g => (
                      <option key={g} value={g}>Class {g}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700">Subject</label>
                  <select
                    value={draftSubject}
                    onChange={(e) => setDraftSubject(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-800"
                  >
                    <option value="Raindrops (English Reader)">Raindrops (English Reader)</option>
                    <option value="Math-Magic (Mathematics)">Math-Magic (Mathematics)</option>
                    <option value="Marigold (English)">Marigold (English)</option>
                    <option value="Looking Around (EVS)">Looking Around (EVS)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700">Target Vernacular</label>
                  <select
                    value={draftLang}
                    onChange={(e) => setDraftLang(e.target.value as 'santhali' | 'mundari')}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-800"
                  >
                    <option value="santhali">Santhali (ᱥᱟᱱᱛᱟᱲᱤ)</option>
                    <option value="mundari">Mundari (मुण्डारी)</option>
                  </select>
                </div>
              </div>

              {/* Checkpoint sentences */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700">
                    Source Sentences (Checkpoints)
                  </label>
                  <button
                    type="button"
                    onClick={handleAddDraftCheckpoint}
                    className="text-xs font-bold text-forest-700 hover:underline"
                  >
                    + Add Checkpoint
                  </button>
                </div>

                {draftCheckpoints.map((cp, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <span className="w-6 text-xs font-bold text-slate-400">{idx + 1}.</span>
                    <input
                      type="text"
                      required
                      value={cp}
                      onChange={(e) => {
                        const val = e.target.value;
                        setDraftCheckpoints(prev => prev.map((item, i) => i === idx ? val : item));
                      }}
                      placeholder={`Enter sentence #${idx + 1}...`}
                      className="flex-1 px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:ring-2 focus:ring-forest-500 outline-none"
                    />
                    {draftCheckpoints.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveDraftCheckpoint(idx)}
                        className="p-2 text-slate-400 hover:text-red-600 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="pt-4 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsDraftModalOpen(false)}
                  className="px-4 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-forest-700 hover:bg-forest-800 text-white font-black rounded-xl text-xs shadow-md"
                >
                  Save & Submit for PALASH Review
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. INSPECT LESSON MODAL (With Audio Checkpoints Preview) */}
      {/* ========================================================================= */}
      {inspectedLesson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-0.5 bg-forest-100 text-forest-800 text-xs font-bold rounded-md">
                    Class {inspectedLesson.grade} • {inspectedLesson.subject}
                  </span>
                </div>
                <h3 className="text-xl font-black text-slate-900 mt-1">
                  {inspectedLesson.title}
                </h3>
              </div>

              <button
                onClick={() => setInspectedLesson(null)}
                className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Checkpoints List */}
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
                Bilingual Checkpoints ({inspectedLesson.checkpoints?.length || 0})
              </h4>

              {inspectedLesson.checkpoints?.map((cp, idx) => (
                <div key={cp.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-500">Checkpoint #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => handlePlayCheckpointAudio(cp)}
                      className="inline-flex items-center space-x-1 text-forest-700 hover:text-forest-800 font-bold bg-white px-2 py-1 rounded-lg border border-slate-200 shadow-sm"
                    >
                      <Volume2 className={`w-3.5 h-3.5 ${playingAudioId === cp.id ? 'animate-bounce text-amber-500' : ''}`} />
                      <span>Listen Audio</span>
                    </button>
                  </div>

                  <div className="text-sm font-bold text-slate-900 font-hindi">
                    {cp.source_text}
                  </div>

                  <div className="text-sm font-black text-amber-700 bg-amber-50/60 p-2.5 rounded-xl border border-amber-200">
                    👉 {cp.translated_text}
                    {cp.romanized_text && (
                      <div className="text-xs text-slate-500 italic font-mono font-normal mt-0.5">
                        Phonetics: "{cp.romanized_text}"
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setInspectedLesson(null)}
                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-bold text-xs"
              >
                Close
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveLesson(inspectedLesson);
                  onStartLiveClass(inspectedLesson);
                }}
                className="px-6 py-2 bg-forest-700 hover:bg-forest-800 text-white font-black rounded-xl text-xs shadow-md flex items-center space-x-1.5"
              >
                <Play className="w-4 h-4 text-amber-300" />
                <span>Start Live Class</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
