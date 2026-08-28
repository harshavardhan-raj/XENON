import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  JHARKHAND_STATE_CURRICULUM, 
  ClassCurriculum, 
  SubjectBook, 
  ChapterItem 
} from '../../services/curriculumData';
import { generateChapterPDF } from '../../services/pdfExportService';
import { 
  BookOpen, 
  Droplets, 
  Binary, 
  Sprout, 
  FileText, 
  Download, 
  ChevronDown, 
  ChevronUp, 
  Search, 
  Sparkles, 
  ArrowRight, 
  Tv, 
  Layers, 
  GraduationCap, 
  CheckCircle2
} from 'lucide-react';

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  BookOpen,
  Droplets,
  Binary,
  Sprout
};

interface CurriculumBreakdownViewProps {
  onStartLiveClassWithChapter?: (chapter: ChapterItem, subject: SubjectBook, grade: number) => void;
}

export const CurriculumBreakdownView: React.FC<CurriculumBreakdownViewProps> = ({ 
  onStartLiveClassWithChapter 
}) => {
  const { setNotification, setActiveLesson, lessons } = useApp();

  const [selectedGrade, setSelectedGrade] = useState<number>(1);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('c1_raindrops');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedChapterId, setExpandedChapterId] = useState<string | null>('c1_rd_01');

  // Resolve current active class curriculum
  const activeClassCurriculum: ClassCurriculum = 
    JHARKHAND_STATE_CURRICULUM.find(c => c.grade === selectedGrade) || JHARKHAND_STATE_CURRICULUM[0];

  // Resolve current subject
  const currentSubject: SubjectBook = 
    activeClassCurriculum.subjects.find(s => s.id === selectedSubjectId) || activeClassCurriculum.subjects[0];

  // Filter chapters by search query
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

  const handleSelectGrade = (grade: number) => {
    setSelectedGrade(grade);
    const newClass = JHARKHAND_STATE_CURRICULUM.find(c => c.grade === grade);
    if (newClass && newClass.subjects.length > 0) {
      setSelectedSubjectId(newClass.subjects[0].id);
      setExpandedChapterId(newClass.subjects[0].chapters[0]?.id || null);
    }
  };

  const handleDownloadPDF = (chapter: ChapterItem, tier: 'basic' | 'advance') => {
    generateChapterPDF(chapter, currentSubject, selectedGrade, tier);
    setNotification({
      type: 'success',
      message: `Generating ${tier === 'advance' ? 'Advance Bilingual Guide' : 'Basic Worksheet'} for Chapter ${chapter.chapterNumber}: ${chapter.title}`
    });
  };

  const handleLaunchInClassroom = (chapter: ChapterItem) => {
    // Check if there is an existing matching verified lesson in lesson bank
    const matchingLesson = lessons.find(l => l.grade === selectedGrade && l.title.toLowerCase().includes(chapter.title.toLowerCase())) || lessons[0];

    if (matchingLesson) {
      setActiveLesson(matchingLesson);
    }

    if (onStartLiveClassWithChapter) {
      onStartLiveClassWithChapter(chapter, currentSubject, selectedGrade);
    }

    setNotification({
      type: 'info',
      message: `Loaded Chapter ${chapter.chapterNumber} ("${chapter.title}") into Teacher Controller & Live View!`
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-200">
      
      {/* Header Banner with Jharkhand JCERT Branding */}
      <div className="bg-gradient-to-r from-forest-800 via-forest-900 to-slate-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="space-y-2 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white/10 rounded-full text-xs font-semibold backdrop-blur-md">
            <GraduationCap className="w-3.5 h-3.5 text-amber-300" />
            <span>JCERT State Board Curriculum • Jharkhand Primary Education</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
            Class-Wise & Subject-Wise Textbook Catalogue
          </h1>
          <p className="text-forest-200 text-sm leading-relaxed">
            Official Jharkhand state textbook breakdowns with embedded <strong>Santhali (Ol Chiki)</strong> and <strong>Mundari</strong> vernacular bridges, lesson worksheets, and 1-click printable PDF guides.
          </p>
        </div>

        {/* Quick Stats Pill */}
        <div className="flex items-center space-x-4 bg-white/10 p-3 rounded-2xl backdrop-blur-md self-start lg:self-auto border border-white/10">
          <div className="text-center px-3">
            <div className="text-2xl font-black text-amber-300">5</div>
            <div className="text-[10px] uppercase font-bold text-forest-200">Primary Grades</div>
          </div>
          <div className="h-8 w-px bg-white/20" />
          <div className="text-center px-3">
            <div className="text-2xl font-black text-white">
              {activeClassCurriculum.subjects.reduce((acc, s) => acc + s.chapters.length, 0)}
            </div>
            <div className="text-[10px] uppercase font-bold text-forest-200">Class {selectedGrade} Chapters</div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. CLASS SELECTION TABS (Class 1 to Class 5) */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl p-2.5 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between overflow-x-auto gap-2 p-1">
          {[1, 2, 3, 4, 5].map((grade) => (
            <button
              key={grade}
              onClick={() => handleSelectGrade(grade)}
              className={`flex-1 min-w-[130px] py-3.5 px-4 rounded-2xl font-extrabold text-sm transition-all flex items-center justify-center space-x-2 ${
                selectedGrade === grade
                  ? 'bg-forest-700 text-white shadow-md shadow-forest-700/25 scale-[1.02]'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              <BookOpen className={`w-4 h-4 ${selectedGrade === grade ? 'text-amber-300' : 'text-slate-400'}`} />
              <span>Class {grade}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. SUBJECT GRID FOR SELECTED CLASS */}
      {/* ========================================================================= */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Layers className="w-5 h-5 text-forest-700" />
            <h2 className="text-lg font-black text-slate-900">
              Textbooks for Class {selectedGrade} ({activeClassCurriculum.subjects.length} Subjects)
            </h2>
          </div>
          <span className="text-xs font-bold text-slate-400">Select a textbook to view chapter breakdown</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {activeClassCurriculum.subjects.map((subject) => {
            const isSelected = selectedSubjectId === subject.id;
            const IconComp = ICON_MAP[subject.iconName] || BookOpen;

            return (
              <div
                key={subject.id}
                onClick={() => {
                  setSelectedSubjectId(subject.id);
                  setExpandedChapterId(subject.chapters[0]?.id || null);
                }}
                className={`group p-6 rounded-3xl border-2 cursor-pointer transition-all duration-200 relative overflow-hidden flex flex-col justify-between space-y-4 ${
                  isSelected
                    ? 'bg-white border-forest-600 ring-4 ring-forest-500/20 shadow-xl'
                    : 'bg-white hover:bg-slate-50/80 border-slate-200 hover:border-slate-300 shadow-sm'
                }`}
              >
                {/* Top Badge & Code */}
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

                {/* Subject Title & Icon */}
                <div className="flex items-start space-x-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${subject.coverColor} text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform shrink-0`}>
                    <IconComp className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-900 group-hover:text-forest-700 transition-colors">
                      {subject.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1 font-medium">
                      {subject.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Active Status */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-400">Code: {subject.codeName}</span>
                  <span className={`font-black flex items-center space-x-1 ${
                    isSelected ? 'text-forest-700' : 'text-slate-500'
                  }`}>
                    <span>{isSelected ? 'Active Textbook' : 'Explore Chapters'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. CHAPTER VIEW & ACCORDION (With Basic & Advance PDF Buttons) */}
      {/* ========================================================================= */}
      {currentSubject && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          
          {/* Header of Chapter Section with Search Box */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 bg-forest-100 text-forest-800 text-xs font-black rounded-md">
                  Class {selectedGrade}
                </span>
                <span className="text-xs font-bold text-slate-500">{currentSubject.category}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
                {currentSubject.title} • Chapter Breakdown ({currentSubject.chapters.length} Total)
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

          {/* Chapter Accordion List */}
          <div className="space-y-3">
            {filteredChapters.length > 0 ? (
              filteredChapters.map((chapter) => {
                const isExpanded = expandedChapterId === chapter.id;

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
                      {/* Left: Number + Title + Vernacular Badge */}
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
                            <span className="px-2 py-0.5 bg-amber-50 text-amber-900 border border-amber-200 rounded text-[10px] font-bold">
                              {chapter.totalPages} Pages
                            </span>
                          </div>

                          <div className="text-xs text-forest-700 font-semibold mt-1 flex items-center space-x-2">
                            <span>Santhali / Mundari Bridge:</span>
                            <span className="font-bold text-slate-800">{chapter.vernacularConcepts.santhali}</span>
                            <span className="text-slate-300">•</span>
                            <span className="italic font-normal text-slate-600 font-mono text-[11px]">{chapter.vernacularConcepts.romanized}</span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Quick Actions (Basic PDF, Advance PDF, Download Icon) */}
                      <div className="flex items-center space-x-2 self-end md:self-auto shrink-0" onClick={(e) => e.stopPropagation()}>
                        
                        {/* BASIC PDF BUTTON */}
                        <button
                          type="button"
                          onClick={() => handleDownloadPDF(chapter, 'basic')}
                          className="inline-flex items-center space-x-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 font-bold rounded-xl text-xs transition-all border border-slate-300"
                          title="Generate printable basic worksheet"
                        >
                          <FileText className="w-3.5 h-3.5 text-slate-600" />
                          <span>Basic PDF</span>
                        </button>

                        {/* ADVANCE PDF BUTTON */}
                        <button
                          type="button"
                          onClick={() => handleDownloadPDF(chapter, 'advance')}
                          className="inline-flex items-center space-x-1.5 px-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-forest-800 font-bold rounded-xl text-xs transition-all border border-emerald-300"
                          title="Generate full bilingual teacher guide with audio checkpoints"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-forest-600" />
                          <span>Advance PDF</span>
                        </button>

                        {/* DOWNLOAD ICON BUTTON */}
                        <button
                          type="button"
                          onClick={() => handleDownloadPDF(chapter, 'advance')}
                          className="p-2 bg-forest-700 hover:bg-forest-800 text-white rounded-xl shadow-sm transition-all hover:scale-105 active:scale-95"
                          title="Instant Download Complete Lesson Package"
                        >
                          <Download className="w-4 h-4" />
                        </button>

                        {/* Toggle Chevron */}
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

                        {/* Bottom Actions inside Accordion */}
                        <div className="pt-3 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
                          <div className="flex items-center space-x-2 text-xs text-slate-500">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>JCERT Approved Primary Curriculum • Offline Audio Ready</span>
                          </div>

                          <div className="flex items-center space-x-2">
                            <button
                              type="button"
                              onClick={() => handleDownloadPDF(chapter, 'basic')}
                              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all"
                            >
                              Download Worksheet
                            </button>

                            <button
                              type="button"
                              onClick={() => handleLaunchInClassroom(chapter)}
                              className="inline-flex items-center space-x-1.5 px-4 py-2 bg-forest-700 hover:bg-forest-800 text-white font-bold rounded-xl text-xs shadow-md shadow-forest-700/20 transition-all hover:scale-105 active:scale-95"
                            >
                              <Tv className="w-3.5 h-3.5 text-amber-300" />
                              <span>Teach in Classroom</span>
                            </button>
                          </div>
                        </div>

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

    </div>
  );
};
