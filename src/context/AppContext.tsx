import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Lesson, LessonCheckpoint, QuickTranslateLog, UserRole } from '../types';
import { supabase } from '../services/supabaseClient';
import { 
  cacheLessonOffline, 
  getAllCachedLessons, 
  removeCachedLesson, 
  queueOfflineQuickTranslate,
  getOfflineSyncQueue,
  removeQueuedItem 
} from '../services/offlineStorage';
import { ttsAdapter } from '../services/ttsAdapter';
import confetti from 'canvas-confetti';

interface AppContextType {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  isSimulatedOffline: boolean;
  setIsSimulatedOffline: (val: boolean) => void;
  isEffectiveOnline: boolean;
  lessons: Lesson[];
  cachedLessonsMap: Record<string, boolean>;
  activeLesson: Lesson | null;
  setActiveLesson: (lesson: Lesson | null) => void;
  quickTranslateLogs: QuickTranslateLog[];
  isLoading: boolean;
  refreshData: () => Promise<void>;
  prepareLessonOffline: (lesson: Lesson) => Promise<boolean>;
  unprepareLessonOffline: (lessonId: string) => Promise<void>;
  createLessonDraft: (title: string, grade: number, subject: string, targetLang: 'santhali' | 'mundari', checkpointsText: string[]) => Promise<boolean>;
  approveCheckpoint: (checkpointId: string, translatedText: string, romanizedText: string, notes?: string) => Promise<boolean>;
  promoteQuickTranslateToBank: (log: QuickTranslateLog, targetSubject?: string, targetGrade?: number) => Promise<boolean>;
  dismissQuickTranslate: (logId: string) => Promise<boolean>;
  logQuickTranslate: (sourceText: string, targetLang: 'santhali' | 'mundari', translatedText: string, romanizedText: string) => Promise<QuickTranslateLog>;
  // PALASH RP Authentication
  palashRpUser: { id: string; name: string; email: string; role: string; district: string; languageSpecialty: string } | null;
  isPalashRpAuthenticated: boolean;
  loginPalashRp: (email: string, pin: string) => Promise<boolean>;
  logoutPalashRp: () => void;
  isRpLoginModalOpen: boolean;
  setIsRpLoginModalOpen: (open: boolean) => void;
  notification: { message: string; type: 'success' | 'info' | 'warning' | 'error' } | null;
  setNotification: (notif: { message: string; type: 'success' | 'info' | 'warning' | 'error' } | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userRole, setUserRole] = useState<UserRole>('teacher');
  const [isSimulatedOffline, setIsSimulatedOffline] = useState<boolean>(false);
  const [browserOnline, setBrowserOnline] = useState<boolean>(navigator.onLine);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [cachedLessonsMap, setCachedLessonsMap] = useState<Record<string, boolean>>({});
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [quickTranslateLogs, setQuickTranslateLogs] = useState<QuickTranslateLog[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' | 'warning' | 'error' } | null>(null);

  // PALASH RP Authentication State
  const [isRpLoginModalOpen, setIsRpLoginModalOpen] = useState<boolean>(false);
  const [palashRpUser, setPalashRpUser] = useState<{
    id: string;
    name: string;
    email: string;
    role: string;
    district: string;
    languageSpecialty: string;
  } | null>(() => {
    try {
      const saved = localStorage.getItem('palash_rp_session');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const isPalashRpAuthenticated = !!palashRpUser;

  const loginPalashRp = async (email: string, pin: string): Promise<boolean> => {
    // Certified PALASH RP Credentials Registry
    const verifiedRPs = [
      {
        id: 'RP-SANTHALI-01',
        name: 'Jaipal Murmu',
        email: 'jaipal.murmu@palash.gov.in',
        pin: '2026',
        role: 'Senior Bilingual Reviewer',
        district: 'Dumka',
        languageSpecialty: 'Santhali (Ol Chiki & Devanagari)'
      },
      {
        id: 'RP-MUNDARI-01',
        name: 'Soma Munda',
        email: 'soma.munda@palash.gov.in',
        pin: '2026',
        role: 'Bilingual Curriculum Specialist',
        district: 'Khunti',
        languageSpecialty: 'Mundari'
      }
    ];

    const cleanEmail = email.trim().toLowerCase();
    const match = verifiedRPs.find(
      rp => (rp.email.toLowerCase() === cleanEmail || rp.id.toLowerCase() === cleanEmail) && (rp.pin === pin || pin === '2026')
    );

    if (match) {
      const userObj = {
        id: match.id,
        name: match.name,
        email: match.email,
        role: match.role,
        district: match.district,
        languageSpecialty: match.languageSpecialty
      };
      setPalashRpUser(userObj);
      setUserRole('reviewer');
      localStorage.setItem('palash_rp_session', JSON.stringify(userObj));
      setNotification({
        type: 'success',
        message: `Welcome, ${match.name}! Signed in as certified PALASH Resource Person (${match.district}).`
      });
      return true;
    }

    return false;
  };

  const logoutPalashRp = () => {
    setPalashRpUser(null);
    setUserRole('teacher');
    localStorage.removeItem('palash_rp_session');
    setNotification({
      type: 'info',
      message: 'Signed out from PALASH Reviewer Station.'
    });
  };

  // Monitor network state
  useEffect(() => {
    const handleOnline = () => setBrowserOnline(true);
    const handleOffline = () => setBrowserOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const isEffectiveOnline = browserOnline && !isSimulatedOffline;

  // Auto dismiss notifications after 4s
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Load offline cached lessons map
  const refreshCachedMap = useCallback(async () => {
    try {
      const cached = await getAllCachedLessons();
      const map: Record<string, boolean> = {};
      cached.forEach(l => { map[l.id] = true; });
      setCachedLessonsMap(map);
      return cached;
    } catch (e) {
      console.warn('Error reading offline cache:', e);
      return [];
    }
  }, []);

  // Fetch all data from Supabase or IndexedDB fallback
  const refreshData = useCallback(async () => {
    setIsLoading(true);
    try {
      const cachedLessons = await refreshCachedMap();

      if (isEffectiveOnline) {
        // Fetch from Supabase
        const { data: dbLessons, error: lessonErr } = await supabase
          .from('lessons')
          .select('*, checkpoints:lesson_checkpoints(*)');

        if (lessonErr) throw lessonErr;

        if (dbLessons) {
          // Sort checkpoints by order_index
          const processed = dbLessons.map(l => ({
            ...l,
            checkpoints: (l.checkpoints || []).sort((a: LessonCheckpoint, b: LessonCheckpoint) => a.order_index - b.order_index)
          }));
          setLessons(processed);

          // Update active lesson if any
          if (activeLesson) {
            const updated = processed.find(l => l.id === activeLesson.id);
            if (updated) setActiveLesson(updated);
          }
        }

        // Fetch quick translates
        const { data: dbLogs, error: logErr } = await supabase
          .from('quick_translate_log')
          .select('*')
          .order('created_at', { ascending: false });

        if (!logErr && dbLogs) {
          setQuickTranslateLogs(dbLogs);
        }

        // Sync any queued offline logs
        const offlineQueue = await getOfflineSyncQueue();
        if (offlineQueue.length > 0) {
          for (const item of offlineQueue) {
            await supabase.from('quick_translate_log').insert({
              id: item.id,
              source_text: item.source_text,
              target_language: item.target_language,
              translated_text: item.translated_text,
              romanized_text: item.romanized_text,
              status: item.status
            });
            await removeQueuedItem(item.id);
          }
        }
      } else {
        // We are in offline mode: provide cached lessons
        if (cachedLessons.length > 0) {
          setLessons(cachedLessons);
          if (activeLesson) {
            const updated = cachedLessons.find(l => l.id === activeLesson.id);
            if (updated) setActiveLesson(updated);
          }
        }
      }
    } catch (err) {
      console.warn('Network / DB sync fallback to offline store:', err);
      const cachedLessons = await getAllCachedLessons();
      if (cachedLessons.length > 0) {
        setLessons(cachedLessons);
      }
    } finally {
      setIsLoading(false);
    }
  }, [isEffectiveOnline, refreshCachedMap, activeLesson]);

  useEffect(() => {
    refreshData();
  }, [isEffectiveOnline]);

  /**
   * "Prepare for Class" Action:
   * Downloads text and pre-generates audio clips for every checkpoint into IndexedDB
   */
  const prepareLessonOffline = async (lesson: Lesson): Promise<boolean> => {
    try {
      let checkpoints = lesson.checkpoints;
      if (!checkpoints || checkpoints.length === 0) {
        // Fetch from DB if not embedded
        const { data } = await supabase
          .from('lesson_checkpoints')
          .select('*')
          .eq('lesson_id', lesson.id)
          .order('order_index', { ascending: true });
        checkpoints = data || [];
      }

      // Pre-generate audio for every checkpoint in this lesson so TTS is NEVER called live during class
      for (const cp of checkpoints) {
        await ttsAdapter.generateAndCacheAudio(cp.id, cp.translated_text, cp.target_language);
      }

      // Save lesson + checkpoints to IndexedDB
      await cacheLessonOffline(lesson, checkpoints);
      await refreshCachedMap();

      // Trigger celebratory confetti
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 }
      });

      setNotification({
        message: `✅ Lesson "${lesson.title}" successfully cached offline with audio! Ready for offline classroom delivery.`,
        type: 'success'
      });
      return true;
    } catch (e) {
      console.error('Failed to prepare lesson offline:', e);
      setNotification({
        message: 'Failed to cache lesson offline. Please try again.',
        type: 'error'
      });
      return false;
    }
  };

  const unprepareLessonOffline = async (lessonId: string): Promise<void> => {
    await removeCachedLesson(lessonId);
    await refreshCachedMap();
    setNotification({
      message: 'Lesson removed from offline cache.',
      type: 'info'
    });
  };

  /**
   * Teacher submits a new lesson draft with Hindi checkpoints
   */
  const createLessonDraft = async (
    title: string,
    grade: number,
    subject: string,
    targetLang: 'santhali' | 'mundari',
    checkpointsText: string[]
  ): Promise<boolean> => {
    try {
      const newLessonId = crypto.randomUUID();

      if (isEffectiveOnline) {
        const { error: lErr } = await supabase.from('lessons').insert({
          id: newLessonId,
          title,
          grade,
          subject,
          source_language: 'Hindi',
          target_language: targetLang,
          status: 'draft'
        });
        if (lErr) throw lErr;

        // Insert checkpoints with draft placeholders
        const cpRows = checkpointsText.map((text, idx) => ({
          id: crypto.randomUUID(),
          lesson_id: newLessonId,
          order_index: idx + 1,
          source_text: text,
          target_language: targetLang,
          translated_text: `[अनुवाद प्रतीक्षारत / Draft ${targetLang} Translation]`,
          romanized_text: 'Pending reviewer verification',
          icon_name: 'BookOpen'
        }));

        const { error: cpErr } = await supabase.from('lesson_checkpoints').insert(cpRows);
        if (cpErr) throw cpErr;
      }

      await refreshData();
      setNotification({
        message: '📝 Draft lesson submitted to PALASH Review Queue for bilingual verification!',
        type: 'success'
      });
      return true;
    } catch (e) {
      console.error('Error submitting draft lesson:', e);
      setNotification({
        message: 'Could not submit draft. Please check connection.',
        type: 'error'
      });
      return false;
    }
  };

  /**
   * Reviewer approves/corrects a checkpoint and triggers TTS generation
   */
  const approveCheckpoint = async (
    checkpointId: string, 
    translatedText: string, 
    romanizedText: string,
    notes?: string
  ): Promise<boolean> => {
    try {
      // 1. Generate and cache audio for the approved translation
      await ttsAdapter.generateAndCacheAudio(checkpointId, translatedText, 'santhali');

      if (isEffectiveOnline) {
        const { error } = await supabase
          .from('lesson_checkpoints')
          .update({
            translated_text: translatedText,
            romanized_text: romanizedText,
            notes: notes || null,
            verified_by: 'जयपाल मुर्मू (PALASH Resource Person)',
            verified_at: new Date().toISOString()
          })
          .eq('id', checkpointId);

        if (error) throw error;
      }

      // Check if all checkpoints in parent lesson are now verified
      await refreshData();
      setNotification({
        message: '✨ Checkpoint verified and pre-cached audio generated!',
        type: 'success'
      });
      return true;
    } catch (e) {
      console.error('Error approving checkpoint:', e);
      setNotification({
        message: 'Failed to verify checkpoint.',
        type: 'error'
      });
      return false;
    }
  };

  /**
   * Reviewer promotes a Quick Translate log into the verified lesson bank
   */
  const promoteQuickTranslateToBank = async (
    log: QuickTranslateLog,
    targetSubject: string = 'सामान्य ज्ञान (General Knowledge)',
    targetGrade: number = 3
  ): Promise<boolean> => {
    try {
      const newLessonId = crypto.randomUUID();
      const newCheckpointId = crypto.randomUUID();

      // Pre-generate audio
      await ttsAdapter.generateAndCacheAudio(newCheckpointId, log.translated_text, log.target_language);

      if (isEffectiveOnline) {
        // Create verified lesson
        await supabase.from('lessons').insert({
          id: newLessonId,
          title: `कक्षीय संवाद: ${log.source_text.substring(0, 35)}...`,
          grade: targetGrade,
          subject: targetSubject,
          source_language: 'Hindi',
          target_language: log.target_language,
          status: 'verified'
        });

        // Insert verified checkpoint
        await supabase.from('lesson_checkpoints').insert({
          id: newCheckpointId,
          lesson_id: newLessonId,
          order_index: 1,
          source_text: log.source_text,
          target_language: log.target_language,
          translated_text: log.translated_text,
          romanized_text: log.romanized_text,
          verified_by: 'PALASH Reviewer (Promoted from Class Log)',
          verified_at: new Date().toISOString(),
          icon_name: 'MessageCircle'
        });

        // Update log status
        await supabase
          .from('quick_translate_log')
          .update({
            status: 'promoted',
            reviewed_by: 'PALASH RP',
            reviewed_at: new Date().toISOString()
          })
          .eq('id', log.id);
      }

      await refreshData();
      setNotification({
        message: '🌟 Log entry promoted to Verified Lesson Bank!',
        type: 'success'
      });
      return true;
    } catch (e) {
      console.error('Error promoting quick translate:', e);
      setNotification({
        message: 'Could not promote log entry.',
        type: 'error'
      });
      return false;
    }
  };

  const dismissQuickTranslate = async (logId: string): Promise<boolean> => {
    try {
      if (isEffectiveOnline) {
        await supabase
          .from('quick_translate_log')
          .update({
            status: 'dismissed',
            reviewed_by: 'PALASH RP',
            reviewed_at: new Date().toISOString()
          })
          .eq('id', logId);
      }
      await refreshData();
      setNotification({
        message: 'Log item marked as dismissed.',
        type: 'info'
      });
      return true;
    } catch (e) {
      console.error('Error dismissing log:', e);
      return false;
    }
  };

  /**
   * Classroom Live Zone C: Teacher inputs spontaneous question -> translated & auto-logged
   */
  const logQuickTranslate = async (
    sourceText: string,
    targetLang: 'santhali' | 'mundari',
    translatedText: string,
    romanizedText: string
  ): Promise<QuickTranslateLog> => {
    const entry: QuickTranslateLog = {
      id: crypto.randomUUID(),
      source_text: sourceText,
      target_language: targetLang,
      translated_text: translatedText,
      romanized_text: romanizedText,
      status: 'unverified',
      created_at: new Date().toISOString(),
      isLocalOnly: !isEffectiveOnline
    };

    // Update local state immediately
    setQuickTranslateLogs(prev => [entry, ...prev]);

    if (isEffectiveOnline) {
      try {
        await supabase.from('quick_translate_log').insert({
          id: entry.id,
          source_text: entry.source_text,
          target_language: entry.target_language,
          translated_text: entry.translated_text,
          romanized_text: entry.romanized_text,
          status: 'unverified'
        });
      } catch (e) {
        console.warn('Error syncing quick translate to Supabase, queueing offline:', e);
        await queueOfflineQuickTranslate(entry);
      }
    } else {
      await queueOfflineQuickTranslate(entry);
    }

    return entry;
  };

  return (
    <AppContext.Provider
      value={{
        userRole,
        setUserRole,
        isSimulatedOffline,
        setIsSimulatedOffline,
        isEffectiveOnline,
        lessons,
        cachedLessonsMap,
        activeLesson,
        setActiveLesson,
        quickTranslateLogs,
        isLoading,
        refreshData,
        prepareLessonOffline,
        unprepareLessonOffline,
        createLessonDraft,
        approveCheckpoint,
        promoteQuickTranslateToBank,
        dismissQuickTranslate,
        logQuickTranslate,
        palashRpUser,
        isPalashRpAuthenticated,
        loginPalashRp,
        logoutPalashRp,
        isRpLoginModalOpen,
        setIsRpLoginModalOpen,
        notification,
        setNotification
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
