import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  Table, 
  GitMerge, 
  FileText, 
  Clock, 
  Globe, 
  BarChart3, 
  Server, 
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  FolderKanban
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  leadCount: number;
  scheduledCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  leadCount,
  scheduledCount,
}) => {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-GB', { timeZone: 'Europe/Berlin', hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { id: 'discovery', label: '1. Discovery & Scraper', icon: Compass },
    { id: 'leads', label: '2. Leads Master CRM', icon: Table, badge: leadCount },
    { id: 'pipeline', label: '3. Pipeline Engine', icon: GitMerge },
    { id: 'content', label: '4. AI Content Studio', icon: FileText },
    { id: 'scheduler', label: '5. Email Scheduler', icon: Clock, badge: scheduledCount },
    { id: 'regional', label: '6. Regional Sources', icon: Globe },
    { id: 'kpis', label: '7. KPIs & Analytics', icon: BarChart3 },
    { id: 'architecture', label: '8. $0/mo Infra Guide', icon: Server },
    { id: 'project-management', label: '9. Project Management', icon: FolderKanban },
  ];

  return (
    <header className="bg-white border-b border-slate-200 text-slate-900 sticky top-0 z-50 shadow-sm">
      {/* Top Banner Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs border-b border-slate-100 bg-slate-50/80">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-md border border-indigo-200 font-mono font-medium">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
            <span>Work.net Devs v2.0</span>
          </div>
          <span className="hidden sm:inline text-slate-300">|</span>
          <div className="flex items-center gap-1.5 text-emerald-700 font-medium bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>$0/mo GCP + Workspace Infra Active</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-slate-600">
          <div className="flex items-center gap-1.5 font-mono text-slate-600">
            <Globe className="w-3.5 h-3.5 text-indigo-600" />
            <span>CET Berlin Time: <strong className="text-slate-900 font-bold">{time || '14:32:15'}</strong></span>
          </div>
          <div className="hidden md:flex items-center gap-1.5 text-slate-600">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Rate Limit: 5/hr | 50/day</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 overflow-x-auto scrollbar-none py-1">
          <div className="flex space-x-1 sm:space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-tab-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-medium'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span
                      className={`ml-1 px-1.5 py-0.2 text-[10px] rounded-full font-mono ${
                        isActive
                          ? 'bg-indigo-700 text-indigo-100 font-bold'
                          : 'bg-slate-100 text-slate-700 border border-slate-200 font-semibold'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
};
