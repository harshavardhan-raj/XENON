import { SyncMessage, SyncMessageType, LivePushPayload, Flashcard } from '../types';

type SyncListener = (message: SyncMessage) => void;

class ClassroomSyncEngine {
  private channel: BroadcastChannel | null = null;
  private listeners: Set<SyncListener> = new Set();
  private sessionId: string = 'PALASH_CLASSROOM_DEFAULT';

  constructor() {
    this.initChannel();
  }

  private initChannel() {
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      try {
        this.channel = new BroadcastChannel('sih_classroom_sync_channel');
        this.channel.onmessage = (event: MessageEvent<SyncMessage>) => {
          this.notifyListeners(event.data);
        };
      } catch (e) {
        console.warn('BroadcastChannel initialization error:', e);
      }
    }

    // Fallback: window storage event for older browsers
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', (event) => {
        if (event.key === 'sih_classroom_sync_event' && event.newValue) {
          try {
            const message: SyncMessage = JSON.parse(event.newValue);
            this.notifyListeners(message);
          } catch (e) {
            console.warn('Storage sync parse error:', e);
          }
        }
      });
    }
  }

  public setSessionId(id: string) {
    this.sessionId = id;
  }

  public getSessionId(): string {
    return this.sessionId;
  }

  public subscribe(listener: SyncListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notifyListeners(message: SyncMessage) {
    this.listeners.forEach((listener) => {
      try {
        listener(message);
      } catch (e) {
        console.error('Error in sync listener:', e);
      }
    });
  }

  private dispatchMessage(type: SyncMessageType, sender: 'teacher' | 'student', payload?: SyncMessage['payload']) {
    const message: SyncMessage = {
      type,
      sessionId: this.sessionId,
      sender,
      timestamp: Date.now(),
      payload
    };

    // 1. Post to BroadcastChannel (zero-latency cross-window)
    if (this.channel) {
      try {
        this.channel.postMessage(message);
      } catch (e) {
        console.warn('Error posting sync message:', e);
      }
    }

    // 2. Post to localStorage for fallback
    try {
      localStorage.setItem('sih_classroom_sync_event', JSON.stringify(message));
    } catch (e) {
      // ignore
    }

    // Also notify local listeners in the current tab
    this.notifyListeners(message);
  }

  // Teacher Controller Actions
  public sendSetLesson(lessonId: string) {
    this.dispatchMessage('SET_LESSON', 'teacher', { lessonId });
  }

  public sendSetCheckpoint(checkpointIndex: number) {
    this.dispatchMessage('SET_CHECKPOINT', 'teacher', { checkpointIndex });
  }

  public sendPlayAudio(speed: number = 1.0) {
    this.dispatchMessage('PLAY_AUDIO', 'teacher', { audioSpeed: speed });
  }

  public sendStopAudio() {
    this.dispatchMessage('STOP_AUDIO', 'teacher');
  }

  public sendCastLivePush(livePush: LivePushPayload) {
    this.dispatchMessage('CAST_LIVE_PUSH', 'teacher', { livePush });
  }

  public sendClearLivePush() {
    this.dispatchMessage('CLEAR_LIVE_PUSH', 'teacher', { livePush: null });
  }

  public sendCastFlashcard(flashcard: Flashcard) {
    this.dispatchMessage('CAST_FLASHCARD', 'teacher', { flashcard });
  }

  public sendClearFlashcard() {
    this.dispatchMessage('CLEAR_FLASHCARD', 'teacher', { flashcard: null });
  }
}

export const syncEngine = new ClassroomSyncEngine();
