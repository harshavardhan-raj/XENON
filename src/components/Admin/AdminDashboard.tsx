import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  CheckCircle2, 
  HardDriveDownload, 
  MessageSquare, 
  Languages, 
  Award, 
  TrendingUp, 
  School 
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { lessons, quickTranslateLogs, cachedLessonsMap } = useApp();

  const totalLessons = lessons.length;
  const verifiedLessons = lessons.filter(l => l.status === 'verified').length;
  const draftLessons = lessons.filter(l => l.status === 'draft').length;
  const offlineCachedCount = Object.keys(cachedLessonsMap).length;
  const totalQuickLogs = quickTranslateLogs.length;

  const santhaliLessons = lessons.filter(l => l.target_language === 'santhali').length;
  const mundariLessons = lessons.filter(l => l.target_language === 'mundari').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white/10 rounded-full text-xs font-semibold">
            <School className="w-3.5 h-3.5 text-emerald-400" />
            <span>Jharkhand Education Project Council • PALASH Analytics Telemetry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            State-Level Curriculum & Usage Dashboard
          </h1>
          <p className="text-slate-400 text-sm max-w-2xl">
            Real-time analytics on bilingual teaching adoption, offline lesson caching, and spontaneous classroom quick-translate queries across primary schools.
          </p>
        </div>

        <div className="px-4 py-2 bg-emerald-500/20 text-emerald-300 rounded-2xl border border-emerald-500/30 text-xs font-bold self-start md:self-auto">
          🟢 100% Operational & Trackable
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Card 1 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase">Total Lesson Bank</span>
            <CheckCircle2 className="w-5 h-5 text-forest-600" />
          </div>
          <div className="text-3xl font-black text-slate-900">{totalLessons}</div>
          <div className="text-xs font-semibold text-forest-700">
            {verifiedLessons} Verified • {draftLessons} In Review
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase">Offline Cached Lessons</span>
            <HardDriveDownload className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-emerald-700">{offlineCachedCount}</div>
          <div className="text-xs font-medium text-slate-500">
            Ready on classroom tablets with zero network
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase">Quick Translates Logged</span>
            <MessageSquare className="w-5 h-5 text-amber-600" />
          </div>
          <div className="text-3xl font-black text-amber-600">{totalQuickLogs}</div>
          <div className="text-xs font-medium text-slate-500">
            Spontaneous student queries recorded
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase">Target Vernaculars</span>
            <Languages className="w-5 h-5 text-purple-600" />
          </div>
          <div className="text-3xl font-black text-purple-700">2</div>
          <div className="text-xs font-medium text-slate-500">
            Santhali ({santhaliLessons}) • Mundari ({mundariLessons})
          </div>
        </div>

      </div>

      {/* Analytics Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: Lessons Breakdown Table */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-extrabold text-slate-900 flex items-center space-x-2">
            <Award className="w-5 h-5 text-forest-700" />
            <span>Lesson Catalogue Status</span>
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase border-b border-slate-200">
                <tr>
                  <th className="py-3 px-3">Lesson Title</th>
                  <th className="py-3 px-2">Grade</th>
                  <th className="py-3 px-2">Language</th>
                  <th className="py-3 px-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {lessons.map(l => (
                  <tr key={l.id} className="hover:bg-slate-50/80">
                    <td className="py-3 px-3 font-bold text-slate-800 line-clamp-1">{l.title}</td>
                    <td className="py-3 px-2 text-slate-600">Grade {l.grade}</td>
                    <td className="py-3 px-2 capitalize font-semibold text-slate-700">{l.target_language}</td>
                    <td className="py-3 px-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                        l.status === 'verified'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {l.status === 'verified' ? 'Verified' : 'Draft'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Quick Translate Log Activity */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-extrabold text-slate-900 flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-amber-600" />
            <span>Recent Off-Script Query Activity</span>
          </h3>

          <div className="space-y-3">
            {quickTranslateLogs.slice(0, 5).map(log => (
              <div key={log.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-slate-800">"{log.source_text}"</span>
                  <span className="capitalize text-slate-500 font-semibold">{log.target_language}</span>
                </div>
                <div className="text-xs font-semibold text-forest-700">
                  👉 {log.translated_text}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
