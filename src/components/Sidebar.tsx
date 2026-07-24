import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  CheckSquare, 
  MessageSquare, 
  DollarSign, 
  UserCheck, 
  BookOpen, 
  Settings, 
  ChevronDown, 
  ChevronRight, 
  Sparkles,
  PieChart,
  UserPlus,
  Flame,
  Globe,
  Kanban,
  Receipt,
  FileText,
  X,
  FolderKanban,
  Video,
  CreditCard,
  Sliders,
  Zap
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  leadCount: number;
  scheduledCount: number;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  isCollapsed?: boolean;
  setIsCollapsed?: (collapsed: boolean | ((prev: boolean) => boolean)) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  leadCount,
  scheduledCount,
  mobileOpen,
  setMobileOpen,
  isCollapsed = false,
  setIsCollapsed
}) => {
  // Expanded sections state
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    dashboard: true,
    leads: true,
    projects: true,
    communication: true,
    finance: true,
    system: true
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleSelectTab = (tabId: string) => {
    setActiveTab(tabId);
    setMobileOpen(false); // Close mobile drawer on selection
  };

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 bg-slate-900 border-r border-slate-800 text-slate-300 flex flex-col transition-all duration-300 ease-in-out ${
          mobileOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0'
        } ${isCollapsed ? 'lg:w-20' : 'lg:w-64'}`}
      >
        {/* Sidebar Header */}
        <div className={`p-3.5 border-b border-slate-800 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/20 shrink-0 relative overflow-hidden">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            {!isCollapsed && (
              <div>
                <div className="font-bold text-white text-sm tracking-tight flex items-center gap-1">
                  <span>Work.net</span>
                  <span className="text-blue-400 font-mono text-xs">DEVS</span>
                </div>
                <div className="flex items-center gap-1 text-[10px] font-mono font-medium text-slate-300 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span className="text-slate-300 ml-0.5 font-bold">Google AI Suite</span>
                </div>
              </div>
            )}
          </div>
          {!isCollapsed && (
            <button 
              onClick={() => setMobileOpen(false)}
              className="lg:hidden p-1 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation Categories */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-800">
          
          {/* SECTION 1: DASHBOARD */}
          <div>
            {!isCollapsed && (
              <button
                onClick={() => toggleSection('dashboard')}
                className="w-full flex items-center justify-between px-2 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider hover:text-slate-200 cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <LayoutDashboard className="w-3.5 h-3.5 text-blue-400" />
                  <span>Executive Dashboards</span>
                </span>
                {openSections.dashboard ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
              </button>
            )}

            {(openSections.dashboard || isCollapsed) && (
              <div className="mt-1 space-y-0.5 font-sans text-xs">
                <button
                  onClick={() => handleSelectTab('exec-dashboard')}
                  title="Executive Dashboard"
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl font-medium transition-all cursor-pointer ${
                    activeTab === 'exec-dashboard' ? 'bg-blue-600 text-white font-semibold shadow-sm shadow-blue-500/20' : 'hover:bg-slate-800/80 text-slate-300'
                  } ${isCollapsed ? 'justify-center px-0' : ''}`}
                >
                  <PieChart className="w-4 h-4 shrink-0 text-blue-300" />
                  {!isCollapsed && <span>Executive Overview</span>}
                </button>

                <button
                  onClick={() => handleSelectTab('lead-dashboard')}
                  title="Lead Pipeline Analytics"
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl font-medium transition-all cursor-pointer ${
                    activeTab === 'lead-dashboard' ? 'bg-blue-600 text-white font-semibold shadow-sm shadow-blue-500/20' : 'hover:bg-slate-800/80 text-slate-300'
                  } ${isCollapsed ? 'justify-center px-0' : ''}`}
                >
                  <Users className="w-4 h-4 shrink-0 text-slate-400" />
                  {!isCollapsed && <span>Lead Analytics</span>}
                </button>

                <button
                  onClick={() => handleSelectTab('fin-dashboard')}
                  title="Financial Metrics"
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl font-medium transition-all cursor-pointer ${
                    activeTab === 'fin-dashboard' ? 'bg-blue-600 text-white font-semibold shadow-sm shadow-blue-500/20' : 'hover:bg-slate-800/80 text-slate-300'
                  } ${isCollapsed ? 'justify-center px-0' : ''}`}
                >
                  <DollarSign className="w-4 h-4 shrink-0 text-emerald-400" />
                  {!isCollapsed && <span>Financial Metrics</span>}
                </button>
              </div>
            )}
          </div>

          {/* SECTION 2: OUTBOUND & LEADS */}
          <div>
            {!isCollapsed && (
              <button
                onClick={() => toggleSection('leads')}
                className="w-full flex items-center justify-between px-2 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider hover:text-slate-200 cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  <span>Outbound & Leads CRM</span>
                </span>
                {openSections.leads ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
              </button>
            )}

            {(openSections.leads || isCollapsed) && (
              <div className="mt-1 space-y-0.5 font-sans text-xs">
                <button
                  onClick={() => handleSelectTab('all-leads')}
                  title="Master CRM Leads"
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-medium transition-all cursor-pointer ${
                    activeTab === 'all-leads' ? 'bg-blue-600 text-white font-semibold shadow-sm shadow-blue-500/20' : 'hover:bg-slate-800/80 text-slate-300'
                  } ${isCollapsed ? 'justify-center px-0' : ''}`}
                >
                  <span className="flex items-center gap-2.5">
                    <UserPlus className="w-4 h-4 shrink-0 text-blue-300" />
                    {!isCollapsed && <span>Master CRM</span>}
                  </span>
                  {!isCollapsed && (
                    <span className="bg-slate-800 text-blue-300 font-mono text-[10px] px-2 py-0.5 rounded-full border border-slate-700">
                      {leadCount}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => handleSelectTab('lead-discovery')}
                  title="European Scraper & Discovery"
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl font-medium transition-all cursor-pointer ${
                    activeTab === 'lead-discovery' ? 'bg-blue-600 text-white font-semibold shadow-sm shadow-blue-500/20' : 'hover:bg-slate-800/80 text-slate-300'
                  } ${isCollapsed ? 'justify-center px-0' : ''}`}
                >
                  <Globe className="w-4 h-4 shrink-0 text-emerald-400" />
                  {!isCollapsed && <span>European Scraper</span>}
                </button>

                <button
                  onClick={() => handleSelectTab('lead-pipeline')}
                  title="10-Phase Automation Engine"
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl font-medium transition-all cursor-pointer ${
                    activeTab === 'lead-pipeline' ? 'bg-blue-600 text-white font-semibold shadow-sm shadow-blue-500/20' : 'hover:bg-slate-800/80 text-slate-300'
                  } ${isCollapsed ? 'justify-center px-0' : ''}`}
                >
                  <Zap className="w-4 h-4 shrink-0 text-amber-400" />
                  {!isCollapsed && <span>10-Phase Pipeline</span>}
                </button>

                <button
                  onClick={() => handleSelectTab('ai-content-studio')}
                  title="AI Copywriting Studio"
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl font-medium transition-all cursor-pointer ${
                    activeTab === 'ai-content-studio' ? 'bg-blue-600 text-white font-semibold shadow-sm shadow-blue-500/20' : 'hover:bg-slate-800/80 text-slate-300'
                  } ${isCollapsed ? 'justify-center px-0' : ''}`}
                >
                  <Sparkles className="w-4 h-4 shrink-0 text-purple-300" />
                  {!isCollapsed && <span>AI Content Studio</span>}
                </button>
              </div>
            )}
          </div>

          {/* SECTION 3: PROJECTS & WORKSPACE */}
          <div>
            {!isCollapsed && (
              <button
                onClick={() => toggleSection('projects')}
                className="w-full flex items-center justify-between px-2 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider hover:text-slate-200 cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <FolderKanban className="w-3.5 h-3.5 text-blue-400" />
                  <span>Projects & Tasks</span>
                </span>
                {openSections.projects ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
              </button>
            )}

            {(openSections.projects || isCollapsed) && (
              <div className="mt-1 space-y-0.5 font-sans text-xs">
                <button
                  onClick={() => handleSelectTab('kanban-board')}
                  title="Interactive Kanban & Funnel Board"
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl font-medium transition-all cursor-pointer ${
                    activeTab === 'kanban-board' || activeTab === 'all-projects' ? 'bg-blue-600 text-white font-semibold shadow-sm shadow-blue-500/20' : 'hover:bg-slate-800/80 text-slate-300'
                  } ${isCollapsed ? 'justify-center px-0' : ''}`}
                >
                  <Kanban className="w-4 h-4 shrink-0 text-emerald-400" />
                  {!isCollapsed && <span>Interactive Kanban & Funnel</span>}
                </button>

                <button
                  onClick={() => handleSelectTab('task-manager')}
                  title="Task Management"
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl font-medium transition-all cursor-pointer ${
                    activeTab === 'task-manager' ? 'bg-blue-600 text-white font-semibold shadow-sm shadow-blue-500/20' : 'hover:bg-slate-800/80 text-slate-300'
                  } ${isCollapsed ? 'justify-center px-0' : ''}`}
                >
                  <CheckSquare className="w-4 h-4 shrink-0 text-blue-300" />
                  {!isCollapsed && <span>Task Management</span>}
                </button>
              </div>
            )}
          </div>

          {/* SECTION 4: COMMUNICATION */}
          <div>
            {!isCollapsed && (
              <button
                onClick={() => toggleSection('communication')}
                className="w-full flex items-center justify-between px-2 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider hover:text-slate-200 cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <MessageSquare className="w-3.5 h-3.5 text-purple-400" />
                  <span>Communication Hub</span>
                </span>
                {openSections.communication ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
              </button>
            )}

            {(openSections.communication || isCollapsed) && (
              <div className="mt-1 space-y-0.5 font-sans text-xs">
                <button
                  onClick={() => handleSelectTab('team-chat')}
                  title="Team Live Chat"
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl font-medium transition-all cursor-pointer ${
                    activeTab === 'team-chat' ? 'bg-blue-600 text-white font-semibold shadow-sm shadow-blue-500/20' : 'hover:bg-slate-800/80 text-slate-300'
                  } ${isCollapsed ? 'justify-center px-0' : ''}`}
                >
                  <MessageSquare className="w-4 h-4 shrink-0 text-purple-300" />
                  {!isCollapsed && <span>Team Live Chat</span>}
                </button>

                <button
                  onClick={() => handleSelectTab('meetings')}
                  title="Google Meet Sync"
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl font-medium transition-all cursor-pointer ${
                    activeTab === 'meetings' ? 'bg-blue-600 text-white font-semibold shadow-sm shadow-blue-500/20' : 'hover:bg-slate-800/80 text-slate-300'
                  } ${isCollapsed ? 'justify-center px-0' : ''}`}
                >
                  <Video className="w-4 h-4 shrink-0 text-blue-300" />
                  {!isCollapsed && <span>Google Meet Sync</span>}
                </button>

                <button
                  onClick={() => handleSelectTab('outbound-scheduler')}
                  title="Email Scheduler"
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-medium transition-all cursor-pointer ${
                    activeTab === 'outbound-scheduler' ? 'bg-blue-600 text-white font-semibold shadow-sm shadow-blue-500/20' : 'hover:bg-slate-800/80 text-slate-300'
                  } ${isCollapsed ? 'justify-center px-0' : ''}`}
                >
                  <span className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4 shrink-0 text-pink-300" />
                    {!isCollapsed && <span>Email Scheduler</span>}
                  </span>
                  {!isCollapsed && scheduledCount > 0 && (
                    <span className="bg-amber-500 text-slate-950 font-mono text-[10px] font-bold px-1.5 py-0.2 rounded">
                      {scheduledCount}
                    </span>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* SECTION 5: FINANCE & HR */}
          <div>
            {!isCollapsed && (
              <button
                onClick={() => toggleSection('finance')}
                className="w-full flex items-center justify-between px-2 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider hover:text-slate-200 cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Finance & Operations</span>
                </span>
                {openSections.finance ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
              </button>
            )}

            {(openSections.finance || isCollapsed) && (
              <div className="mt-1 space-y-0.5 font-sans text-xs">
                <button
                  onClick={() => handleSelectTab('finance-overview')}
                  title="Invoices & Expenses"
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl font-medium transition-all cursor-pointer ${
                    activeTab === 'finance-overview' ? 'bg-blue-600 text-white font-semibold shadow-sm shadow-blue-500/20' : 'hover:bg-slate-800/80 text-slate-300'
                  } ${isCollapsed ? 'justify-center px-0' : ''}`}
                >
                  <Receipt className="w-4 h-4 shrink-0 text-emerald-300" />
                  {!isCollapsed && <span>Invoices & Expenses</span>}
                </button>

                <button
                  onClick={() => handleSelectTab('salaries')}
                  title="Salaries & Payroll"
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl font-medium transition-all cursor-pointer ${
                    activeTab === 'salaries' ? 'bg-blue-600 text-white font-semibold shadow-sm shadow-blue-500/20' : 'hover:bg-slate-800/80 text-slate-300'
                  } ${isCollapsed ? 'justify-center px-0' : ''}`}
                >
                  <DollarSign className="w-4 h-4 shrink-0 text-amber-300" />
                  {!isCollapsed && <span>Salaries & Payroll</span>}
                </button>

                <button
                  onClick={() => handleSelectTab('hr-staff')}
                  title="Staff & Hierarchy"
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl font-medium transition-all cursor-pointer ${
                    activeTab === 'hr-staff' ? 'bg-blue-600 text-white font-semibold shadow-sm shadow-blue-500/20' : 'hover:bg-slate-800/80 text-slate-300'
                  } ${isCollapsed ? 'justify-center px-0' : ''}`}
                >
                  <UserCheck className="w-4 h-4 shrink-0 text-rose-300" />
                  {!isCollapsed && <span>Staff & Hierarchy</span>}
                </button>
              </div>
            )}
          </div>

          {/* SECTION 6: KNOWLEDGE BASE & SYSTEM SETTINGS */}
          <div>
            {!isCollapsed && (
              <button
                onClick={() => toggleSection('system')}
                className="w-full flex items-center justify-between px-2 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider hover:text-slate-200 cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Sliders className="w-3.5 h-3.5 text-slate-400" />
                  <span>Knowledge & Settings</span>
                </span>
                {openSections.system ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
              </button>
            )}

            {(openSections.system || isCollapsed) && (
              <div className="mt-1 space-y-0.5 font-sans text-xs">
                <button
                  onClick={() => handleSelectTab('knowledge-base')}
                  title="SOPs & Knowledge Base"
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl font-medium transition-all cursor-pointer ${
                    activeTab === 'knowledge-base' ? 'bg-blue-600 text-white font-semibold shadow-sm shadow-blue-500/20' : 'hover:bg-slate-800/80 text-slate-300'
                  } ${isCollapsed ? 'justify-center px-0' : ''}`}
                >
                  <BookOpen className="w-4 h-4 shrink-0 text-cyan-300" />
                  {!isCollapsed && <span>SOPs & Documents</span>}
                </button>

                <button
                  onClick={() => handleSelectTab('token-metering')}
                  title="Token & API Usage Metering"
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl font-medium transition-all cursor-pointer ${
                    activeTab === 'token-metering' ? 'bg-blue-600 text-white font-semibold shadow-sm shadow-blue-500/20' : 'hover:bg-slate-800/80 text-slate-300'
                  } ${isCollapsed ? 'justify-center px-0' : ''}`}
                >
                  <Zap className="w-4 h-4 shrink-0 text-amber-400" />
                  {!isCollapsed && <span>Token & API Metering</span>}
                </button>

                <button
                  onClick={() => handleSelectTab('dynamic-settings')}
                  title="System Configuration"
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl font-medium transition-all cursor-pointer ${
                    activeTab === 'dynamic-settings' ? 'bg-blue-600 text-white font-semibold shadow-sm shadow-blue-500/20' : 'hover:bg-slate-800/80 text-slate-300'
                  } ${isCollapsed ? 'justify-center px-0' : ''}`}
                >
                  <Settings className="w-4 h-4 shrink-0 text-slate-400" />
                  {!isCollapsed && <span>System Configuration</span>}
                </button>
              </div>
            )}
          </div>

        </div>

        {/* Sidebar Footer User Info */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/60 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7.5 h-7.5 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white text-[11px] shadow-sm shadow-blue-500/30">
              AR
            </div>
            {!isCollapsed && (
              <div className="truncate max-w-[120px]">
                <div className="font-semibold text-white truncate text-[11px]">Alex Rivera</div>
                <div className="text-[10px] text-slate-400 truncate">Managing Director</div>
              </div>
            )}
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Google AI Connected" />
        </div>
      </aside>
    </>
  );
};
