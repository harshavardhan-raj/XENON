import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { TeacherPrepView } from './components/TeacherPrep/TeacherPrepView';
import { ClassroomLiveView } from './components/Classroom/ClassroomLiveView';
import { StudentDisplayView } from './components/Classroom/StudentDisplayView';
import { FlashcardDeck } from './components/Flashcards/FlashcardDeck';
import { ReviewerDashboard } from './components/Reviewer/ReviewerDashboard';
import { AdminDashboard } from './components/Admin/AdminDashboard';
import { Lesson } from './types';
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react';
import { registerServiceWorker } from './services/serviceWorkerRegistration';

const AppContent: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<'prep' | 'live' | 'student' | 'flashcards' | 'reviewer' | 'admin'>('prep');
  const { setActiveLesson, notification, setNotification } = useApp();

  // Check URL query parameters on load for dedicated projector popout window
  useEffect(() => {
    registerServiceWorker();

    const params = new URLSearchParams(window.location.search);
    if (params.get('view') === 'student') {
      setCurrentTab('student');
    }
  }, []);

  const handleStartLiveClass = (lesson: Lesson) => {
    setActiveLesson(lesson);
    setCurrentTab('live');
  };

  const isStudentOnlyMode = currentTab === 'student';

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      
      {/* Global Navbar (Hide in student mode for theater-grade projector presentation) */}
      {!isStudentOnlyMode && (
        <Navbar currentTab={currentTab} setCurrentTab={setCurrentTab} />
      )}

      {/* Floating Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md animate-in slide-in-from-bottom-5 duration-200">
          <div className={`p-4 rounded-2xl shadow-2xl flex items-start space-x-3 border ${
            notification.type === 'success'
              ? 'bg-emerald-900 text-white border-emerald-700'
              : notification.type === 'error'
              ? 'bg-red-900 text-white border-red-700'
              : 'bg-slate-900 text-white border-slate-700'
          }`}>
            {notification.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />}
            {notification.type === 'error' && <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />}
            {notification.type === 'info' && <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />}
            
            <div className="text-xs font-semibold flex-1 leading-relaxed">
              {notification.message}
            </div>

            <button
              onClick={() => setNotification(null)}
              className="text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Switcher if in Student Display Mode to exit */}
      {isStudentOnlyMode && (
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={() => setCurrentTab('live')}
            className="px-3 py-1.5 bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-bold backdrop-blur-md border border-slate-700 shadow-xl transition-all flex items-center space-x-1"
          >
            <span>Exit Student Mode</span>
          </button>
        </div>
      )}

      {/* Main Tab Screen Switcher */}
      <main className="flex-1">
        {currentTab === 'prep' && (
          <TeacherPrepView onStartLiveClass={handleStartLiveClass} />
        )}

        {currentTab === 'live' && (
          <ClassroomLiveView onBackToPrep={() => setCurrentTab('prep')} />
        )}

        {currentTab === 'student' && (
          <StudentDisplayView />
        )}

        {currentTab === 'flashcards' && (
          <FlashcardDeck />
        )}

        {currentTab === 'reviewer' && (
          <ReviewerDashboard />
        )}

        {currentTab === 'admin' && (
          <AdminDashboard />
        )}
      </main>

      {/* Persistent Footer (Hidden in student theater mode) */}
      {!isStudentOnlyMode && (
        <footer className="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-500 font-medium">
          Jharkhand Primary Education (PALASH Initiative) • Vernacular Classroom Companion • Santhali & Mundari
        </footer>
      )}
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
