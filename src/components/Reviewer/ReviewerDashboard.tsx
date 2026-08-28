import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LessonCheckpoint, QuickTranslateLog } from '../../types';
import { 
  CheckCircle2, 
  ArrowUpRight, 
  XCircle, 
  Volume2, 
  Edit3, 
  AlertTriangle,
  History,
  Check,
  RotateCcw,
  ShieldCheck,
  Lock,
  LogOut
} from 'lucide-react';
import { ttsAdapter } from '../../services/ttsAdapter';

export const ReviewerDashboard: React.FC = () => {
  const { 
    lessons, 
    quickTranslateLogs, 
    approveCheckpoint, 
    promoteQuickTranslateToBank, 
    dismissQuickTranslate,
    palashRpUser,
    isPalashRpAuthenticated,
    logoutPalashRp,
    setIsRpLoginModalOpen
  } = useApp();

  const [activeTab, setActiveTab] = useState<'checkpoints' | 'quickLogs'>('checkpoints');
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

  // Editable states for checkpoints
  const [editingCheckpointId, setEditingCheckpointId] = useState<string | null>(null);
  const [editTranslationText, setEditTranslationText] = useState<string>('');
  const [editRomanText, setEditRomanText] = useState<string>('');
  const [editNotes, setEditNotes] = useState<string>('');

  // Collect all unverified checkpoints across draft & mixed lessons
  const unverifiedCheckpoints: { checkpoint: LessonCheckpoint; lessonTitle: string; lessonGrade: number; lessonSubject: string }[] = [];
  lessons.forEach(lesson => {
    (lesson.checkpoints || []).forEach(cp => {
      if (!cp.verified_at) {
        unverifiedCheckpoints.push({
          checkpoint: cp,
          lessonTitle: lesson.title,
          lessonGrade: lesson.grade,
          lessonSubject: lesson.subject
        });
      }
    });
  });

  const unverifiedLogs = quickTranslateLogs.filter(q => q.status === 'unverified');

  const startEditCheckpoint = (cp: LessonCheckpoint) => {
    setEditingCheckpointId(cp.id);
    setEditTranslationText(cp.translated_text);
    setEditRomanText(cp.romanized_text || '');
    setEditNotes(cp.notes || '');
  };

  const handleApprove = async (cp: LessonCheckpoint) => {
    const textToSave = editingCheckpointId === cp.id ? editTranslationText : cp.translated_text;
    const romanToSave = editingCheckpointId === cp.id ? editRomanText : (cp.romanized_text || '');
    const notesToSave = editingCheckpointId === cp.id ? editNotes : cp.notes;

    await approveCheckpoint(cp.id, textToSave, romanToSave, notesToSave);
    setEditingCheckpointId(null);
  };

  const handlePlayAudio = async (id: string, text: string) => {
    setPlayingAudioId(id);
    await ttsAdapter.playAudio(id, text, 1.0, () => {
      setPlayingAudioId(null);
    });
  };

  const handlePromoteLog = async (log: QuickTranslateLog) => {
    await promoteQuickTranslateToBank(log);
  };

  const handleDismissLog = async (logId: string) => {
    await dismissQuickTranslate(logId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header Banner */}
      <div className="mb-8 bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white/10 rounded-full text-xs font-semibold backdrop-blur-md">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-200" />
              <span>PALASH Bilingual Review Console • Reviewer Station</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Quality Assurance & Verification
            </h1>
            <p className="text-amber-100 text-sm max-w-2xl">
              Review and correct Santhali (Ol Chiki/Devanagari) and Mundari translations before classroom delivery. Approving automatically synthesizes and caches high-quality audio into the official lesson bank.
            </p>
          </div>

          <div className="flex items-center space-x-3 bg-black/20 p-2 rounded-2xl backdrop-blur-md self-start md:self-auto">
            <div className="text-center px-3 py-1">
              <div className="text-2xl font-black text-white">{unverifiedCheckpoints.length}</div>
              <div className="text-[10px] uppercase font-bold text-amber-200">Pending Checkpoints</div>
            </div>
            <div className="h-8 w-px bg-white/20" />
            <div className="text-center px-3 py-1">
              <div className="text-2xl font-black text-amber-300">{unverifiedLogs.length}</div>
              <div className="text-[10px] uppercase font-bold text-amber-200">Live Query Logs</div>
            </div>
          </div>
        </div>

        {/* Authenticated RP Profile Badge */}
        {isPalashRpAuthenticated && palashRpUser && (
          <div className="mt-6 pt-4 border-t border-amber-600/60 flex flex-wrap items-center justify-between gap-3 text-xs bg-black/15 p-3 rounded-2xl">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 font-black flex items-center justify-center">
                {palashRpUser.name[0]}
              </div>
              <div>
                <div className="font-extrabold text-white flex items-center space-x-1.5">
                  <span>{palashRpUser.name}</span>
                  <span className="px-2 py-0.2 bg-emerald-500/20 text-emerald-300 rounded text-[10px] font-bold border border-emerald-500/30">
                    Certified Reviewer
                  </span>
                </div>
                <div className="text-amber-200 text-[11px]">
                  ID: {palashRpUser.id} • {palashRpUser.district} District • {palashRpUser.languageSpecialty}
                </div>
              </div>
            </div>

            <button
              onClick={logoutPalashRp}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-black/30 hover:bg-black/50 text-amber-200 hover:text-white rounded-xl text-xs font-bold transition-all border border-amber-500/30"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        )}
      </div>

      {/* If Not Authenticated: Sign In Gate */}
      {!isPalashRpAuthenticated ? (
        <div className="bg-white rounded-3xl p-10 sm:p-14 text-center border-2 border-dashed border-amber-300 shadow-sm space-y-5">
          <div className="w-16 h-16 rounded-3xl bg-amber-100 text-amber-800 mx-auto flex items-center justify-center shadow-inner">
            <Lock className="w-8 h-8 text-amber-700" />
          </div>
          <div className="space-y-2 max-w-md mx-auto">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              PALASH Resource Person Sign In Required
            </h2>
            <p className="text-sm text-slate-500">
              Only verified bilingual resource persons can approve curriculum lessons and manage the official translation bank.
            </p>
          </div>

          <button
            onClick={() => setIsRpLoginModalOpen(true)}
            className="inline-flex items-center space-x-2 px-8 py-3.5 bg-amber-600 hover:bg-amber-700 text-white font-black rounded-2xl text-sm shadow-xl shadow-amber-600/30 transition-all hover:scale-105 active:scale-95"
          >
            <ShieldCheck className="w-5 h-5" />
            <span>Sign In to Access Review Station</span>
          </button>
        </div>
      ) : (
        <>
          {/* Main Tabs */}
          <div className="flex items-center space-x-3 mb-6 border-b border-slate-200 pb-4">
        <button
          onClick={() => setActiveTab('checkpoints')}
          className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
            activeTab === 'checkpoints'
              ? 'bg-amber-600 text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Edit3 className="w-4 h-4" />
          <span>Checkpoint Review Queue ({unverifiedCheckpoints.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('quickLogs')}
          className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
            activeTab === 'quickLogs'
              ? 'bg-amber-600 text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <History className="w-4 h-4" />
          <span>Quick Translate Triage Queue ({unverifiedLogs.length})</span>
        </button>
      </div>

      {/* TAB 1: Checkpoints Review Queue */}
      {activeTab === 'checkpoints' && (
        <div className="space-y-6">
          {unverifiedCheckpoints.length > 0 ? (
            unverifiedCheckpoints.map(({ checkpoint: cp, lessonTitle, lessonGrade, lessonSubject }) => {
              const isEditing = editingCheckpointId === cp.id;

              return (
                <div 
                  key={cp.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4"
                >
                  {/* Card Header: Lesson Context */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                    <div className="flex items-center space-x-2">
                      <span className="px-2.5 py-1 bg-amber-100 text-amber-900 rounded-lg text-xs font-extrabold">
                        Grade {lessonGrade}
                      </span>
                      <span className="text-xs font-bold text-slate-500">{lessonSubject}</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-xs font-bold text-slate-800">{lessonTitle}</span>
                    </div>

                    <span className="px-3 py-1 bg-amber-50 text-amber-800 rounded-full text-xs font-bold border border-amber-200">
                      Target Language: {cp.target_language === 'santhali' ? 'Santhali (ᱥᱟᱱᱛᱟᱲᱤ)' : 'Mundari (मुण्डारी)'}
                    </span>
                  </div>

                  {/* Side-by-Side: Hindi Source & Vernacular Translation */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    
                    {/* Left: Hindi Source Text */}
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                        Hindi Textbook Source Text
                      </div>
                      <div className="text-base font-semibold text-slate-900 leading-relaxed font-hindi">
                        {cp.source_text}
                      </div>
                    </div>

                    {/* Right: Vernacular Suggestion / Editable Field */}
                    <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-200">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">
                          Vernacular Translation (Draft / Editable)
                        </div>
                        <button
                          onClick={() => handlePlayAudio(cp.id, isEditing ? editTranslationText : cp.translated_text)}
                          className="inline-flex items-center space-x-1 text-xs font-bold text-amber-800 hover:text-amber-900 bg-white px-2.5 py-1 rounded-lg border border-amber-200 shadow-sm"
                        >
                          <Volume2 className={`w-3.5 h-3.5 ${playingAudioId === cp.id ? 'animate-pulse text-amber-600' : ''}`} />
                          <span>Audio Preview</span>
                        </button>
                      </div>

                      {isEditing ? (
                        <div className="space-y-3">
                          <textarea
                            value={editTranslationText}
                            onChange={(e) => setEditTranslationText(e.target.value)}
                            rows={3}
                            placeholder="Enter verified Santhali or Mundari translation..."
                            className="w-full p-3 bg-white border border-amber-300 rounded-xl text-sm font-bold text-slate-900 focus:ring-2 focus:ring-amber-500 outline-none"
                          />
                          <input
                            type="text"
                            value={editRomanText}
                            onChange={(e) => setEditRomanText(e.target.value)}
                            placeholder="Romanized phonetic pronunciation guide..."
                            className="w-full px-3 py-2 bg-white border border-amber-200 rounded-xl text-xs text-slate-700 italic outline-none"
                          />
                        </div>
                      ) : (
                        <div>
                          <div className="text-base font-bold text-slate-950 leading-relaxed">
                            {cp.translated_text}
                          </div>
                          {cp.romanized_text && (
                            <div className="text-xs text-amber-800 italic mt-1 font-medium">
                              Phonetic: {cp.romanized_text}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                  </div>

                  {/* Review Actions Footer */}
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                    <div className="text-xs text-slate-500 italic">
                      💡 Approving triggers automated speech waveform synthesis and caches audio for offline playback.
                    </div>

                    <div className="flex items-center space-x-2">
                      {!isEditing ? (
                        <button
                          onClick={() => startEditCheckpoint(cp)}
                          className="inline-flex items-center space-x-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-all"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit Translation</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => setEditingCheckpointId(null)}
                          className="inline-flex items-center space-x-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl text-xs transition-all"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Cancel</span>
                        </button>
                      )}

                      <button
                        onClick={() => handleApprove(cp)}
                        className="inline-flex items-center space-x-1.5 px-5 py-2 bg-forest-700 hover:bg-forest-800 text-white font-bold rounded-xl text-xs shadow-md shadow-forest-700/20 transition-all hover:scale-105 active:scale-95"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Approve & Generate Audio</span>
                      </button>
                    </div>
                  </div>

                </div>
              );
            })
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">All Checkpoints Verified!</h3>
              <p className="text-sm text-slate-500 max-w-md mx-auto">
                The review queue is currently clear. When teachers submit draft lessons, they will appear here.
              </p>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: Quick Translate Triage Queue */}
      {activeTab === 'quickLogs' && (
        <div className="space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 flex items-start space-x-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
            <div>
              <strong>Quick Translate (Zone C) Triage:</strong> These entries are spontaneous questions asked by teachers during live classes. High-value questions can be promoted directly into the official verified lesson bank using <strong>"Promote to Lesson Bank"</strong>.
            </div>
          </div>

          {unverifiedLogs.length > 0 ? (
            unverifiedLogs.map((log) => (
              <div
                key={log.id}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-extrabold rounded-md uppercase">
                      {log.target_language}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      {new Date(log.created_at).toLocaleTimeString()} • {new Date(log.created_at).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="text-sm font-bold text-slate-900">
                    "{log.source_text}"
                  </div>

                  <div className="text-sm font-semibold text-forest-800 bg-forest-50/80 p-2.5 rounded-xl border border-forest-100">
                    👉 {log.translated_text}
                    {log.romanized_text && (
                      <div className="text-xs text-forest-600 italic font-normal mt-0.5">
                        Phonetic: {log.romanized_text}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2 self-end md:self-auto shrink-0">
                  <button
                    onClick={() => handleDismissLog(log.id)}
                    className="p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all"
                    title="Dismiss"
                  >
                    <XCircle className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() => handlePromoteLog(log)}
                    className="inline-flex items-center space-x-1.5 px-4 py-2.5 bg-ochre-600 hover:bg-ochre-700 text-white font-bold rounded-xl text-xs shadow-md transition-all hover:scale-105 active:scale-95"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                    <span>Promote to Lesson Bank</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">No Pending Quick Translate Logs</h3>
              <p className="text-sm text-slate-500 max-w-md mx-auto">
                Spontaneous questions entered by teachers during live classes (Zone C) will automatically appear here for triage.
              </p>
            </div>
          )}
        </div>
      )}
        </>
      )}

    </div>
  );
};
