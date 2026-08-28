import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  BarChart3, 
  Wifi, 
  WifiOff, 
  BookOpen, 
  Tv, 
  HardDriveDownload,
  Languages,
  Layers,
  ExternalLink,
  Presentation,
  ShieldCheck,
  Lock,
  LogOut
} from 'lucide-react';
import { UserRole } from '../types';
import { PalashRpLoginModal } from './Auth/PalashRpLoginModal';

interface NavbarProps {
  currentTab: 'prep' | 'live' | 'student' | 'flashcards' | 'reviewer' | 'admin';
  setCurrentTab: (tab: 'prep' | 'live' | 'student' | 'flashcards' | 'reviewer' | 'admin') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, setCurrentTab }) => {
  const { 
    userRole, 
    setUserRole, 
    isSimulatedOffline, 
    setIsSimulatedOffline, 
    cachedLessonsMap, 
    activeLesson,
    palashRpUser,
    isPalashRpAuthenticated,
    logoutPalashRp,
    isRpLoginModalOpen,
    setIsRpLoginModalOpen
  } = useApp();

  const offlineCachedCount = Object.keys(cachedLessonsMap).length;

  const handleRoleChange = (role: UserRole) => {
    if (role === 'reviewer') {
      if (!isPalashRpAuthenticated) {
        setIsRpLoginModalOpen(true);
        return;
      }
      setUserRole('reviewer');
      setCurrentTab('reviewer');
      return;
    }

    setUserRole(role);
    if (role === 'student') {
      setCurrentTab('student');
    } else if (role === 'admin') {
      setCurrentTab('admin');
    } else {
      if (currentTab === 'reviewer' || currentTab === 'admin' || currentTab === 'student') {
        setCurrentTab('live');
      }
    }
  };

  const handleReviewQueueClick = () => {
    if (!isPalashRpAuthenticated) {
      setIsRpLoginModalOpen(true);
    } else {
      setUserRole('reviewer');
      setCurrentTab('reviewer');
    }
  };

  const handleOpenStudentPopout = () => {
    const url = `${window.location.origin}/?view=student`;
    window.open(url, '_blank', 'width=1280,height=800,menubar=no,toolbar=no');
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        {/* Top Banner with Clean Branding */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo & Identity: Clean JoharSetu */}
            <div className="flex items-center space-x-2.5 cursor-pointer" onClick={() => setCurrentTab('prep')}>
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-forest-700 to-forest-500 flex items-center justify-center text-white shadow-md shadow-forest-500/20">
                <Languages className="w-5 h-5" />
              </div>
              <span className="font-black text-xl tracking-tight text-slate-900">
                JoharSetu
              </span>
            </div>

            {/* Center: Main Navigation Tabs (Clean single names) */}
            <nav className="hidden lg:flex items-center space-x-1 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200">
              <button
                onClick={() => setCurrentTab('prep')}
                className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  currentTab === 'prep'
                    ? 'bg-white text-forest-800 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-forest-600" />
                <span>Curriculum</span>
              </button>

              <button
                onClick={() => {
                  setUserRole('teacher');
                  setCurrentTab('live');
                }}
                className={`relative flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  currentTab === 'live'
                    ? 'bg-forest-700 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                <Tv className="w-3.5 h-3.5" />
                <span>Teacher Controller</span>
                {activeLesson && (
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping absolute -top-0.5 -right-0.5" />
                )}
              </button>

              <button
                onClick={() => {
                  setUserRole('student');
                  setCurrentTab('student');
                }}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  currentTab === 'student'
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                <Presentation className="w-3.5 h-3.5 text-emerald-400" />
                <span>Student Display</span>
              </button>

              <button
                onClick={() => setCurrentTab('flashcards')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  currentTab === 'flashcards'
                    ? 'bg-emerald-700 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-amber-500" />
                <span>Flashcards</span>
              </button>

              {/* Review Queue (Protected: Requires PALASH RP Sign In) */}
              <button
                onClick={handleReviewQueueClick}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  currentTab === 'reviewer'
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
                title={isPalashRpAuthenticated ? `Signed in as ${palashRpUser?.name}` : 'Requires PALASH RP Sign In'}
              >
                {isPalashRpAuthenticated ? (
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
                ) : (
                  <Lock className="w-3.5 h-3.5 text-amber-600" />
                )}
                <span>Review Queue</span>
              </button>

              <button
                onClick={() => {
                  setUserRole('admin');
                  setCurrentTab('admin');
                }}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  currentTab === 'admin'
                    ? 'bg-slate-800 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Analytics</span>
              </button>
            </nav>

            {/* Right Controls: Projector Popout + Offline Simulator + Role Switcher */}
            <div className="flex items-center space-x-2">
              
              {/* Popout Projector Screen Button */}
              <button
                onClick={handleOpenStudentPopout}
                className="hidden sm:flex items-center space-x-1 px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-emerald-300 rounded-xl text-xs font-bold transition-all border border-slate-700"
                title="Pop out independent projector screen in new window"
              >
                <Presentation className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden md:inline">Projector View</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </button>

              {/* Offline Cache Indicator */}
              <div className="hidden xl:flex items-center space-x-1 px-2 py-1 bg-emerald-50 text-emerald-800 rounded-lg text-xs font-semibold border border-emerald-200" title="Offline ready lessons in IndexedDB">
                <HardDriveDownload className="w-3 h-3 text-emerald-600" />
                <span>{offlineCachedCount} Cached</span>
              </div>

              {/* Simulated Offline Mode Toggle Button */}
              <button
                onClick={() => setIsSimulatedOffline(!isSimulatedOffline)}
                className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                  isSimulatedOffline
                    ? 'bg-red-50 text-red-700 border-red-300 ring-2 ring-red-400/40 animate-pulse'
                    : 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100'
                }`}
                title="Click to simulate zero-network classroom conditions"
              >
                {isSimulatedOffline ? (
                  <>
                    <WifiOff className="w-3.5 h-3.5 text-red-600" />
                    <span>OFFLINE</span>
                  </>
                ) : (
                  <>
                    <Wifi className="w-3.5 h-3.5 text-emerald-600" />
                    <span>ONLINE</span>
                  </>
                )}
              </button>

              {/* Role Dropdown / Switcher */}
              <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
                <button
                  onClick={() => handleRoleChange('teacher')}
                  className={`px-2 py-1 rounded-lg text-xs font-bold transition-all ${
                    userRole === 'teacher'
                      ? 'bg-forest-700 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Teacher
                </button>

                <button
                  onClick={() => handleRoleChange('student')}
                  className={`px-2 py-1 rounded-lg text-xs font-bold transition-all ${
                    userRole === 'student'
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Student
                </button>

                {/* PALASH RP (Only role requiring Sign In) */}
                {isPalashRpAuthenticated ? (
                  <div className="flex items-center bg-amber-600 text-white rounded-lg px-2 py-1 space-x-1">
                    <ShieldCheck className="w-3 h-3 text-amber-200" />
                    <button
                      onClick={() => handleRoleChange('reviewer')}
                      className="text-xs font-bold text-white hover:underline"
                      title={`${palashRpUser?.name} (${palashRpUser?.district})`}
                    >
                      {palashRpUser?.name.split(' ')[0]} (RP)
                    </button>
                    <button
                      onClick={logoutPalashRp}
                      className="p-0.5 hover:bg-amber-700 rounded text-amber-200 hover:text-white"
                      title="Sign Out"
                    >
                      <LogOut className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleRoleChange('reviewer')}
                    className="px-2 py-1 rounded-lg text-xs font-bold transition-all flex items-center space-x-1 text-slate-600 hover:text-slate-900 hover:bg-amber-50"
                    title="Click to Sign In as PALASH RP"
                  >
                    <Lock className="w-3 h-3 text-amber-600" />
                    <span>PALASH RP</span>
                  </button>
                )}
              </div>

            </div>
          </div>
        </div>

        {/* Mobile Tab Bar */}
        <div className="lg:hidden flex items-center justify-around bg-slate-100 py-2 border-t border-slate-200 text-xs">
          <button
            onClick={() => setCurrentTab('prep')}
            className={`flex flex-col items-center py-1 px-2 rounded-lg ${
              currentTab === 'prep' ? 'font-bold text-forest-700' : 'text-slate-600'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Curriculum</span>
          </button>
          <button
            onClick={() => {
              setUserRole('teacher');
              setCurrentTab('live');
            }}
            className={`flex flex-col items-center py-1 px-2 rounded-lg ${
              currentTab === 'live' ? 'font-bold text-forest-700' : 'text-slate-600'
            }`}
          >
            <Tv className="w-4 h-4" />
            <span>Teacher</span>
          </button>
          <button
            onClick={() => {
              setUserRole('student');
              setCurrentTab('student');
            }}
            className={`flex flex-col items-center py-1 px-2 rounded-lg ${
              currentTab === 'student' ? 'font-bold text-slate-900' : 'text-slate-600'
            }`}
          >
            <Presentation className="w-4 h-4" />
            <span>Student</span>
          </button>
          <button
            onClick={() => setCurrentTab('flashcards')}
            className={`flex flex-col items-center py-1 px-2 rounded-lg ${
              currentTab === 'flashcards' ? 'font-bold text-emerald-700' : 'text-slate-600'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Cards</span>
          </button>
          <button
            onClick={handleReviewQueueClick}
            className={`flex flex-col items-center py-1 px-2 rounded-lg ${
              currentTab === 'reviewer' ? 'font-bold text-amber-600' : 'text-slate-600'
            }`}
          >
            {isPalashRpAuthenticated ? <ShieldCheck className="w-4 h-4 text-amber-600" /> : <Lock className="w-4 h-4" />}
            <span>Review</span>
          </button>
          <button
            onClick={() => {
              setUserRole('admin');
              setCurrentTab('admin');
            }}
            className={`flex flex-col items-center py-1 px-2 rounded-lg ${
              currentTab === 'admin' ? 'font-bold text-slate-800' : 'text-slate-600'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Analytics</span>
          </button>
        </div>
      </header>

      {/* PALASH RP Authentication Modal */}
      <PalashRpLoginModal
        isOpen={isRpLoginModalOpen}
        onClose={() => setIsRpLoginModalOpen(false)}
        onSuccess={() => {
          setUserRole('reviewer');
          setCurrentTab('reviewer');
        }}
      />
    </>
  );
};
