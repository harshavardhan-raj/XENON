import { get, set, del, keys, createStore } from 'idb-keyval';
import { Lesson, LessonCheckpoint, QuickTranslateLog } from '../types';

// Custom IDB stores for clear separation
const lessonStore = createStore('sih_classroom_db', 'cached_lessons');
const audioStore = createStore('sih_classroom_db', 'cached_audio_blobs');
const syncQueueStore = createStore('sih_classroom_db', 'offline_sync_queue');

/**
 * Cache an entire lesson including its checkpoints and pre-generated audio for 100% offline classroom playback
 */
export async function cacheLessonOffline(lesson: Lesson, checkpoints: LessonCheckpoint[]): Promise<void> {
  const lessonWithCheckpoints: Lesson = {
    ...lesson,
    isCachedOffline: true,
    checkpoints: checkpoints.map(cp => ({ ...cp }))
  };
  
  await set(lesson.id, lessonWithCheckpoints, lessonStore);
}

/**
 * Get a cached lesson by id from IndexedDB
 */
export async function getCachedLesson(lessonId: string): Promise<Lesson | undefined> {
  return await get<Lesson>(lessonId, lessonStore);
}

/**
 * List all lessons saved for offline use
 */
export async function getAllCachedLessons(): Promise<Lesson[]> {
  const allKeys = await keys(lessonStore);
  const lessons: Lesson[] = [];
  
  for (const key of allKeys) {
    const lesson = await get<Lesson>(key, lessonStore);
    if (lesson) {
      lessons.push(lesson);
    }
  }
  return lessons;
}

/**
 * Remove a cached lesson
 */
export async function removeCachedLesson(lessonId: string): Promise<void> {
  await del(lessonId, lessonStore);
}

/**
 * Cache audio blob / base64 for a checkpoint
 */
export async function cacheCheckpointAudio(checkpointId: string, audioDataUrl: string): Promise<void> {
  await set(checkpointId, audioDataUrl, audioStore);
}

/**
 * Retrieve cached audio for a checkpoint
 */
export async function getCachedCheckpointAudio(checkpointId: string): Promise<string | undefined> {
  return await get<string>(checkpointId, audioStore);
}

/**
 * Queue a Quick Translate entry created when offline for later sync to Supabase
 */
export async function queueOfflineQuickTranslate(entry: QuickTranslateLog): Promise<void> {
  await set(entry.id, entry, syncQueueStore);
}

/**
 * Get all queued offline quick translates
 */
export async function getOfflineSyncQueue(): Promise<QuickTranslateLog[]> {
  const allKeys = await keys(syncQueueStore);
  const queue: QuickTranslateLog[] = [];
  for (const key of allKeys) {
    const item = await get<QuickTranslateLog>(key, syncQueueStore);
    if (item) queue.push(item);
  }
  return queue;
}

/**
 * Remove synced item from queue
 */
export async function removeQueuedItem(id: string): Promise<void> {
  await del(id, syncQueueStore);
}
