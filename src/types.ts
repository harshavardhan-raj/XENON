export type LanguageCode = 'santhali' | 'mundari' | 'hindi';

export interface Language {
  id: string;
  name: string;
  native_name: string;
  code: LanguageCode;
  script_name: string;
}

export type LessonStatus = 'draft' | 'verified';

export interface Lesson {
  id: string;
  grade: number; // 1 to 5
  subject: string;
  title: string;
  source_language: string;
  target_language: LanguageCode;
  status: LessonStatus;
  created_by?: string;
  created_at: string;
  updated_at?: string;
  checkpoints?: LessonCheckpoint[];
  isCachedOffline?: boolean;
}

export interface LessonCheckpoint {
  id: string;
  lesson_id: string;
  order_index: number;
  source_text: string;
  target_language: LanguageCode;
  translated_text: string;
  romanized_text?: string;
  audio_url?: string;
  icon_name?: string;
  notes?: string;
  verified_by?: string;
  verified_at?: string;
  created_at?: string;
  cachedAudioBlobUrl?: string;
}

export type QuickTranslateStatus = 'unverified' | 'reviewed' | 'promoted' | 'dismissed';

export interface QuickTranslateLog {
  id: string;
  teacher_id?: string;
  source_text: string;
  target_language: LanguageCode;
  translated_text: string;
  romanized_text?: string;
  status: QuickTranslateStatus;
  reviewed_by?: string;
  reviewed_at?: string;
  created_at: string;
  isLocalOnly?: boolean;
}

export type UserRole = 'teacher' | 'student' | 'reviewer' | 'admin';

export interface VocabularyItem {
  id: string;
  hindi: string;
  santhali: string;
  santhali_olchiki?: string;
  santhali_phonetic: string;
  mundari: string;
  mundari_phonetic: string;
  category: 'nature' | 'plants' | 'water' | 'math' | 'body' | 'school' | 'daily' | 'family';
  icon: string;
}

// Auto-generated Visual Flashcard Model
export interface Flashcard {
  id: string;
  lesson_id?: string;
  checkpoint_id?: string;
  hindi_word: string;
  vernacular_word: string;
  vernacular_script: string;
  romanized: string;
  icon_name: string;
  category: 'plants' | 'water' | 'body' | 'math' | 'school' | 'nature' | 'animals' | 'daily';
  grade: number;
  target_language: LanguageCode;
  example_sentence_hindi?: string;
  example_sentence_vernacular?: string;
}

// Real-Time Dual-Screen Synchronization Types
export type SyncMessageType = 
  | 'SET_LESSON'
  | 'SET_CHECKPOINT'
  | 'PLAY_AUDIO'
  | 'STOP_AUDIO'
  | 'CAST_LIVE_PUSH'
  | 'CLEAR_LIVE_PUSH'
  | 'CAST_FLASHCARD'
  | 'CLEAR_FLASHCARD'
  | 'SYNC_PING';

export interface LivePushPayload {
  id: string;
  sourceText: string;
  translatedText: string;
  romanizedText: string;
  targetLanguage: LanguageCode;
  timestamp: string;
}

export interface SyncMessage {
  type: SyncMessageType;
  sessionId: string;
  sender: 'teacher' | 'student';
  timestamp: number;
  payload?: {
    lessonId?: string;
    checkpointIndex?: number;
    audioSpeed?: number;
    livePush?: LivePushPayload | null;
    flashcard?: Flashcard | null;
  };
}
