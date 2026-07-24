import React, { useState } from 'react';
import { 
  Menu, Search, Bell, Sparkles, ChevronRight, PanelLeftClose, PanelLeftOpen,
  Activity, Mail, MessageSquare, Flame, CheckCircle2, X, ExternalLink, Clock
} from 'lucide-react';

interface HeaderBarProps {
  activeTab: string;
  setMobileOpen: (open: boolean) => void;
  leadCount: number;
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (collapsed: boolean | ((prev: boolean) => boolean)) => void;
  onSelectTab?: (tab: string) => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({ 
  activeTab, 
  setMobileOpen, 
  leadCount,
  isSidebarCollapsed,
  setIsSidebarCollapsed,
  onSelectTab
}) => {
  const [activePopover, setActivePopover] = useState<'system' | 'email' | 'chat' | 'lead' | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedNotifDetail, setSelectedNotifDetail] = useState<{ title: string; desc: string; time: string; type: string } | null>(null);

  // AI Automation Token State
  const [tokenStats] = useState({
    used: 157500,
    total: 1000000,
    remaining: 842500
  });

  // Notification lists state
  const [systemNotifs, setSystemNotifs] = useState([
    { id: 's1', title: 'System Health Optimal', desc: 'Google Cloud Run proxy response time < 45ms. OAuth tokens refreshed.', time: '10m ago', unread: true },
    { id: 's2', title: 'DKIM & SPF Records Verified', desc: 'Outbound email deliverability rating 99.4%. Domain reputation clean.', time: '1h ago', unread: true }
  ]);

  const [emailNotifs, setEmailNotifs] = useState([
    { id: 'e1', title: 'Phase 2 Follow-up Sent', desc: 'Initial value email delivered to BioSensus Health Tech (Germany)', time: '15m ago', unread: true },
    { id: 'e2', title: 'Outbound Queue Processed', desc: '14 scheduled emails sent via Gmail API proxy during 09:00 AM CET window', time: '2h ago', unread: true }
  ]);

  const [chatNotifs, setChatNotifs] = useState([
    { id: 'c1', title: 'Sarah Chen in #general', desc: 'Updated Loqate API key configuration for Munich search query', time: '5m ago', unread: true },
    { id: 'c2', title: 'Google Meet Sync Scheduled', desc: 'Client onboarding call with Solaria Energy at 15:00 UTC', time: '45m ago', unread: true }
  ]);

  const [leadNotifs, setLeadNotifs] = useState([
    { id: 'l1', title: '12 New DACH Leads Discovered', desc: 'Pass 2 Deep Scraper extracted complete 25+ schema with verified emails', time: 'Just now', unread: true },
    { id: 'l2', title: 'Lead Qualified for Phase 5', desc: 'Nordic Systemhaus 1 moved to Golden Proposal phase', time: '30m ago', unread: true }
  ]);

  const getTabLabel = (tab: string) => {
    switch (tab) {
      case 'exec-dashboard': return 'Executive Dashboard & Intelligence';
      case 'lead-dashboard': return 'Lead Pipeline Analytics';
      case 'fin-dashboard': return 'Financial Metrics & Cash Flow';
      case 'all-leads': return 'Master Leads CRM';
      case 'lead-discovery': return 'European Scraper & Regional Discovery';
      case 'lead-pipeline': return '10-Phase Outbound Follow-up Engine';
      case 'ai-content-studio': return 'AI Content & Deliverables Studio';
      case 'all-projects': return 'Project Management Hub';
      case 'kanban-board': return 'Interactive Kanban Board (Trello/ClickUp Level)';
      case 'task-manager': return 'Task Management & Hours Tracking';
      case 'team-chat': return 'Real-time Team Communication';
      case 'meetings': return 'Google Meet Sync & Calendar Scheduler';
      case 'outbound-scheduler': return 'Outbound Email Queue & Scheduler';
      case 'finance-overview': return 'Invoicing & Expense Management';
      case 'salaries': return 'Salaries, Compensation & Payroll';
      case 'hr-staff': return 'Staff Directory, Hierarchy & Contracts';
      case 'hr-performance': return 'KPIs & Staff Performance Evaluations';
      case 'knowledge-base': return 'Searchable Knowledge Base & SOPs';
      case 'dynamic-settings': return 'Region, Status & System Settings';
      default: return 'Enterprise Operations Suite';
    }
  };

  const togglePopover = (type: 'system' | 'email' | 'chat' | 'lead') => {
    if (activePopover === type) {
      setActivePopover(null);
    } else {
      setActivePopover(type);
    }
  };

  const markAllRead = (type: 'system' | 'email' | 'chat' | 'lead') => {
    if (type === 'system') setSystemNotifs(prev => prev.map(n => ({ ...n, unread: false })));
    if (type === 'email') setEmailNotifs(prev => prev.map(n => ({ ...n, unread: false })));
    if (type === 'chat') setChatNotifs(prev => prev.map(n => ({ ...n, unread: false })));
    if (type === 'lead') setLeadNotifs(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const unreadSystemCount = systemNotifs.filter(n => n.unread).length;
  const unreadEmailCount = emailNotifs.filter(n => n.unread).length;
  const unreadChatCount = chatNotifs.filter(n => n.unread).length;
  const unreadLeadCount = leadNotifs.filter(n => n.unread).length;

  const handleSelectSearchResult = (targetTab: string) => {
    onSelectTab?.(targetTab);
    setSearchQuery('');
    setIsSearchFocused(false);
  };

  return (
    <>
      {/* Signature Google 4-Color Accent Strip */}
      <div className="h-1 w-full bg-gradient-to-r from-blue-600 via-red-500 via-amber-400 to-emerald-500 sticky top-0 z-40" />

      <header className="sticky top-1 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-3 sm:px-6 py-2.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            title="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Desktop Sidebar Collapse / Expand Toggle Button */}
          <button
            onClick={() => setIsSidebarCollapsed(prev => !prev)}
            className="hidden lg:flex p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all cursor-pointer border border-transparent hover:border-blue-200"
            title={isSidebarCollapsed ? "Expand Sidebar Navigation" : "Compress Sidebar Navigation"}
          >
            {isSidebarCollapsed ? (
              <PanelLeftOpen className="w-5 h-5 text-blue-600" />
            ) : (
              <PanelLeftClose className="w-5 h-5 text-slate-600" />
            )}
          </button>

          <div>
            <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500">
              <span>Operations</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-blue-600 font-semibold">{getTabLabel(activeTab)}</span>
            </div>
            <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
              {getTabLabel(activeTab)}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Search Input with Dropdown Overlay */}
          <div className="relative hidden md:block w-48 lg:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              placeholder="Search leads, tasks, docs..."
              className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500 font-mono transition-all"
            />

            {/* Quick Search Dropdown Overlay */}
            {isSearchFocused && searchQuery.trim().length > 0 && (
              <div className="absolute left-0 right-0 top-10 bg-white border border-slate-200 rounded-xl shadow-xl z-50 p-2 text-xs space-y-1 animate-in fade-in duration-100">
                <div className="text-[10px] font-mono font-bold text-slate-400 px-2 py-1 uppercase">Search Results</div>
                
                <button
                  onClick={() => handleSelectSearchResult('all-leads')}
                  className="w-full text-left px-2 py-1.5 hover:bg-blue-50 rounded-lg flex items-center justify-between text-slate-800 cursor-pointer"
                >
                  <span className="truncate">Search "{searchQuery}" in Master CRM Leads</span>
                  <span className="text-[10px] font-mono text-blue-600 font-bold">Leads CRM</span>
                </button>

                <button
                  onClick={() => handleSelectSearchResult('lead-discovery')}
                  className="w-full text-left px-2 py-1.5 hover:bg-indigo-50 rounded-lg flex items-center justify-between text-slate-800 cursor-pointer"
                >
                  <span className="truncate">Scan "{searchQuery}" in Lead Discovery Scraper</span>
                  <span className="text-[10px] font-mono text-indigo-600 font-bold">Scraper</span>
                </button>

                <button
                  onClick={() => handleSelectSearchResult('knowledge-base')}
                  className="w-full text-left px-2 py-1.5 hover:bg-emerald-50 rounded-lg flex items-center justify-between text-slate-800 cursor-pointer"
                >
                  <span className="truncate">Find "{searchQuery}" in Client System Manual</span>
                  <span className="text-[10px] font-mono text-emerald-600 font-bold">Docs</span>
                </button>
              </div>
            )}
          </div>

          {/* AI Token & Automation Usage Badge */}
          <div className="hidden xl:flex items-center gap-1.5 bg-indigo-50/90 border border-indigo-200 px-2.5 py-1.5 rounded-lg text-indigo-900 text-xs font-mono font-bold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
            <span>Tokens: {(tokenStats.remaining / 1000).toFixed(1)}K / 1M</span>
          </div>

          {/* Live System Badge */}
          <div className="hidden xl:flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-2.5 py-1.5 rounded-lg text-emerald-800 text-xs font-mono font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Online • {leadCount} Leads</span>
          </div>

          {/* ---------------- 4 SEPARATE NOTIFICATION BELLS ---------------- */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
            {/* 1. SYSTEM BELL */}
            <div className="relative">
              <button
                onClick={() => togglePopover('system')}
                className={`p-1.5 sm:p-2 rounded-lg transition-all cursor-pointer relative ${
                  activePopover === 'system' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:bg-white hover:text-blue-600'
                }`}
                title="System Alerts & Server Status"
              >
                <Activity className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                {unreadSystemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[9px] font-mono font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                    {unreadSystemCount}
                  </span>
                )}
              </button>

              {/* System Dropdown Popover */}
              {activePopover === 'system' && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 p-3 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-blue-600" />
                      <span className="font-bold text-slate-900 text-xs">System Alerts</span>
                    </div>
                    <button onClick={() => markAllRead('system')} className="text-[10px] font-mono text-blue-600 hover:underline cursor-pointer">
                      Mark Read
                    </button>
                  </div>
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                    {systemNotifs.map(n => (
                      <div 
                        key={n.id} 
                        onClick={() => setSelectedNotifDetail({ title: n.title, desc: n.desc, time: n.time, type: 'System' })}
                        className={`p-2.5 rounded-xl text-xs space-y-1 transition-all cursor-pointer hover:border-blue-300 ${n.unread ? 'bg-blue-50/60 border border-blue-100' : 'bg-slate-50'}`}
                      >
                        <div className="flex justify-between font-bold text-slate-800 text-xs">
                          <span>{n.title}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{n.time}</span>
                        </div>
                        <p className="text-slate-600 text-[11px] leading-relaxed line-clamp-2">{n.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 2. EMAIL BELL */}
            <div className="relative">
              <button
                onClick={() => togglePopover('email')}
                className={`p-1.5 sm:p-2 rounded-lg transition-all cursor-pointer relative ${
                  activePopover === 'email' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-600 hover:bg-white hover:text-amber-600'
                }`}
                title="Outbound Emails & Sequence Queue"
              >
                <Mail className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                {unreadEmailCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-[9px] font-mono font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                    {unreadEmailCount}
                  </span>
                )}
              </button>

              {/* Email Dropdown Popover */}
              {activePopover === 'email' && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 p-3 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-amber-600" />
                      <span className="font-bold text-slate-900 text-xs">Outbound Email Alerts</span>
                    </div>
                    <button onClick={() => { markAllRead('email'); onSelectTab?.('outbound-scheduler'); setActivePopover(null); }} className="text-[10px] font-mono text-amber-600 hover:underline cursor-pointer">
                      View Queue
                    </button>
                  </div>
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                    {emailNotifs.map(n => (
                      <div 
                        key={n.id} 
                        onClick={() => {
                          setSelectedNotifDetail({ title: n.title, desc: n.desc, time: n.time, type: 'Outbound Email' });
                          onSelectTab?.('outbound-scheduler');
                          setActivePopover(null);
                        }}
                        className={`p-2.5 rounded-xl text-xs space-y-1 transition-all cursor-pointer hover:border-amber-300 ${n.unread ? 'bg-amber-50/60 border border-amber-100' : 'bg-slate-50'}`}
                      >
                        <div className="flex justify-between font-bold text-slate-800 text-xs">
                          <span>{n.title}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{n.time}</span>
                        </div>
                        <p className="text-slate-600 text-[11px] leading-relaxed line-clamp-2">{n.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 3. CHAT BELL */}
            <div className="relative">
              <button
                onClick={() => togglePopover('chat')}
                className={`p-1.5 sm:p-2 rounded-lg transition-all cursor-pointer relative ${
                  activePopover === 'chat' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:bg-white hover:text-emerald-600'
                }`}
                title="Team Chat & Google Meet Sync"
              >
                <MessageSquare className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                {unreadChatCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-[9px] font-mono font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                    {unreadChatCount}
                  </span>
                )}
              </button>

              {/* Chat Dropdown Popover */}
              {activePopover === 'chat' && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 p-3 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-emerald-600" />
                      <span className="font-bold text-slate-900 text-xs">Team Chat & Meetings</span>
                    </div>
                    <button onClick={() => { markAllRead('chat'); onSelectTab?.('team-chat'); setActivePopover(null); }} className="text-[10px] font-mono text-emerald-600 hover:underline cursor-pointer">
                      Open Chat
                    </button>
                  </div>
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                    {chatNotifs.map(n => (
                      <div 
                        key={n.id} 
                        onClick={() => {
                          setSelectedNotifDetail({ title: n.title, desc: n.desc, time: n.time, type: 'Team Chat' });
                          onSelectTab?.('team-chat');
                          setActivePopover(null);
                        }}
                        className={`p-2.5 rounded-xl text-xs space-y-1 transition-all cursor-pointer hover:border-emerald-300 ${n.unread ? 'bg-emerald-50/60 border border-emerald-100' : 'bg-slate-50'}`}
                      >
                        <div className="flex justify-between font-bold text-slate-800 text-xs">
                          <span>{n.title}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{n.time}</span>
                        </div>
                        <p className="text-slate-600 text-[11px] leading-relaxed line-clamp-2">{n.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 4. LEAD BELL */}
            <div className="relative">
              <button
                onClick={() => togglePopover('lead')}
                className={`p-1.5 sm:p-2 rounded-lg transition-all cursor-pointer relative ${
                  activePopover === 'lead' ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-600 hover:bg-white hover:text-purple-600'
                }`}
                title="New Leads & Phase Pipeline Milestones"
              >
                <Flame className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                {unreadLeadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-[9px] font-mono font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                    {unreadLeadCount}
                  </span>
                )}
              </button>

              {/* Lead Dropdown Popover */}
              {activePopover === 'lead' && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 p-3 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                    <div className="flex items-center gap-2">
                      <Flame className="w-4 h-4 text-purple-600" />
                      <span className="font-bold text-slate-900 text-xs">Lead Pipeline Alerts</span>
                    </div>
                    <button onClick={() => { markAllRead('lead'); onSelectTab?.('lead-pipeline'); setActivePopover(null); }} className="text-[10px] font-mono text-purple-600 hover:underline cursor-pointer">
                      10-Phase Pipeline
                    </button>
                  </div>
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                    {leadNotifs.map(n => (
                      <div 
                        key={n.id} 
                        onClick={() => {
                          setSelectedNotifDetail({ title: n.title, desc: n.desc, time: n.time, type: 'Lead Alert' });
                          onSelectTab?.('all-leads');
                          setActivePopover(null);
                        }}
                        className={`p-2.5 rounded-xl text-xs space-y-1 transition-all cursor-pointer hover:border-purple-300 ${n.unread ? 'bg-purple-50/60 border border-purple-100' : 'bg-slate-50'}`}
                      >
                        <div className="flex justify-between font-bold text-slate-800 text-xs">
                          <span>{n.title}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{n.time}</span>
                        </div>
                        <p className="text-slate-600 text-[11px] leading-relaxed line-clamp-2">{n.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* NOTIFICATION DETAIL MODAL */}
      {selectedNotifDetail && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 text-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div>
                <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase">
                  {selectedNotifDetail.type} Alert Detail
                </span>
                <h3 className="font-bold text-slate-900 text-base mt-1">{selectedNotifDetail.title}</h3>
                <span className="text-[11px] font-mono text-slate-400">{selectedNotifDetail.time}</span>
              </div>
              <button 
                onClick={() => setSelectedNotifDetail(null)} 
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-700 leading-relaxed font-sans">
              {selectedNotifDetail.desc}
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <button
                onClick={() => setSelectedNotifDetail(null)}
                className="bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs px-4 py-2 rounded-xl cursor-pointer"
              >
                Close Notification
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

