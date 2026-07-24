import React, { useState, useEffect } from 'react';
import { Lead, SystemLog, PipelinePhase } from '../types';
import { 
  GitMerge, 
  Play, 
  Pause,
  Terminal, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Send, 
  Share2, 
  FileText, 
  Award, 
  TrendingUp, 
  MessageSquare, 
  Layers, 
  Zap,
  RotateCcw,
  Radio,
  Bot,
  ZapOff
} from 'lucide-react';

interface PipelineSectionProps {
  leads: Lead[];
  logs: SystemLog[];
  onAdvanceLeadsToPhase: (phase: PipelinePhase, leadIds?: string[]) => void;
  onRunFullPipeline: () => void;
  onClearLogs: () => void;
}

const PHASES_CONFIG = [
  {
    phase: 1,
    title: 'Phase 1: Discovery & Smart Scraper',
    timeline: 'Day 1',
    icon: GitMerge,
    description: 'AI Keyword Generation + Binary Search Scraper across Google Business, LinkedIn & European Trade Registries.',
    color: 'text-blue-700 border-blue-200 bg-blue-50/50'
  },
  {
    phase: 2,
    title: 'Phase 2: Initial Value Email',
    timeline: 'Same Day / Day 2 (09:30 AM CET)',
    icon: Send,
    description: 'Immediate value engagement email identifying business growth leakages, competitive gaps & attached assessment report.',
    color: 'text-emerald-700 border-emerald-200 bg-emerald-50/50'
  },
  {
    phase: 3,
    title: 'Phase 3: Custom Deliverable + Social Amplification',
    timeline: 'Week 2 (11:00 AM CET)',
    icon: Share2,
    description: 'Custom value deliverable (Website Audit, N8N blueprint, SEO audit) + Social media posting & repost tracking.',
    color: 'text-purple-700 border-purple-200 bg-purple-50/50'
  },
  {
    phase: 4,
    title: 'Phase 4: Complete Documentation Blueprint',
    timeline: 'Week 3 (10:00 AM CET)',
    icon: FileText,
    description: 'Comprehensive 5-section growth blueprint covering Digital Audit, Competitive Matrix & ROI payback timelines.',
    color: 'text-amber-700 border-amber-200 bg-amber-50/50'
  },
  {
    phase: 5,
    title: 'Phase 5: Golden Proposal & 20-Min Demo',
    timeline: 'Week 4 (11:30 AM CET)',
    icon: Award,
    description: 'Working prototype demo + Golden Proposal breakdown with instant 20-minute calendar invite hook.',
    color: 'text-rose-700 border-rose-200 bg-rose-50/50'
  },
  {
    phase: 6,
    title: 'Phase 6: Monthly Scaling Nurture',
    timeline: 'Month 1 Follow-up (09:00 AM CET)',
    icon: TrendingUp,
    description: 'Competitor updates, scaling recommendations, quick wins, and multi-channel social engagement.',
    color: 'text-cyan-700 border-cyan-200 bg-cyan-50/50'
  },
  {
    phase: 7,
    title: 'Phase 7: Multi-Channel Outreach',
    timeline: 'Month 2 Follow-up (10:30 AM CET)',
    icon: MessageSquare,
    description: 'Synchronized multi-touch outreach across LinkedIn InMail, Instagram DMs, Facebook Messenger & Email.',
    color: 'text-indigo-700 border-indigo-200 bg-indigo-50/50'
  },
  {
    phase: 8,
    title: 'Phase 8: New Value Build & Cross-Platform Sharing',
    timeline: 'Month 2 - 3 (11:30 AM CET)',
    icon: Layers,
    description: 'Build brand new tool/dashboard, share across all platforms, and DM all executive decision makers.',
    color: 'text-fuchsia-700 border-fuchsia-200 bg-fuchsia-50/50'
  },
  {
    phase: 9,
    title: 'Phase 9: Competitor Intelligence Analysis',
    timeline: 'Month 3 (10:00 AM CET)',
    icon: Zap,
    description: 'In-depth regional competitor strategy analysis highlighting market positioning & solution advantage.',
    color: 'text-orange-700 border-orange-200 bg-orange-50/50'
  },
  {
    phase: 10,
    title: 'Phase 10: Industry Breaking News Alert',
    timeline: 'Month 3 - 4 (08:30 AM CET)',
    icon: Sparkles,
    description: 'Personalized industry breaking news alert with tailored business impact assessment & final proposition.',
    color: 'text-teal-700 border-teal-200 bg-teal-50/50'
  },
];

export const PipelineSection: React.FC<PipelineSectionProps> = ({
  leads,
  logs,
  onAdvanceLeadsToPhase,
  onRunFullPipeline,
  onClearLogs
}) => {
  const [selectedPhaseToRun, setSelectedPhaseToRun] = useState<number>(2);
  const [targetLeadScope, setTargetLeadScope] = useState<'all' | 'phase_matched'>('all');

  // AUTOPILOT ENGINE STATE
  const [isAutopilotActive, setIsAutopilotActive] = useState<boolean>(false);
  const [autopilotIntervalMs, setAutopilotIntervalMs] = useState<number>(4000); // 4 seconds per automated step
  const [currentAutopilotPhase, setCurrentAutopilotPhase] = useState<number>(1);
  const [autoActionsCount, setAutoActionsCount] = useState<number>(0);
  const autopilotPhaseRef = React.useRef<number>(1);

  // Autopilot Timer Hook
  useEffect(() => {
    let timer: any = null;

    if (isAutopilotActive) {
      timer = setInterval(() => {
        const nextP = (autopilotPhaseRef.current % 10) + 1;
        autopilotPhaseRef.current = nextP;
        setCurrentAutopilotPhase(nextP);
        setAutoActionsCount((prev) => prev + 1);
        
        onAdvanceLeadsToPhase(nextP as PipelinePhase);
      }, autopilotIntervalMs);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isAutopilotActive, autopilotIntervalMs, onAdvanceLeadsToPhase]);

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl text-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-400 mb-1">
            <GitMerge className="w-4 h-4" />
            <span>Phases 1-10 Campaign Execution Controller</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2">
            <span>Automated Multi-Channel Pipeline Engine</span>
            {isAutopilotActive && (
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-mono px-2.5 py-1 rounded-full flex items-center gap-1.5 animate-pulse">
                <Radio className="w-3.5 h-3.5 text-emerald-400" />
                <span>Autopilot Active</span>
              </span>
            )}
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
            Powered by Google AI (HOD 20+ Yrs Senior Vice President Copywriting Engine). Executes value-first engagement, document generation, and continuous background follow-ups on autopilot.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            id="btn-toggle-autopilot"
            onClick={() => setIsAutopilotActive((prev) => !prev)}
            className={`font-semibold text-xs px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-md transition-all cursor-pointer ${
              isAutopilotActive
                ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-amber-500/20'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
            }`}
          >
            {isAutopilotActive ? (
              <>
                <Pause className="w-4 h-4 fill-slate-950" />
                <span>Pause Autopilot Engine</span>
              </>
            ) : (
              <>
                <Bot className="w-4 h-4 text-white" />
                <span>Enable Autopilot Engine (Auto 10-Phase)</span>
              </>
            )}
          </button>

          <button
            id="btn-run-full-pipeline"
            onClick={onRunFullPipeline}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-sm shadow-blue-200 transition-all cursor-pointer"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Run All 10 Phases Once</span>
          </button>
        </div>
      </div>

      {/* AUTOPILOT ENGINE LIVE HUD DISPLAY */}
      {isAutopilotActive && (
        <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-emerald-950/80 border border-emerald-500/30 rounded-2xl p-4 text-white shadow-lg space-y-3 animate-in fade-in duration-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-emerald-500/20 pb-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 block" />
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-400 absolute top-0 left-0 animate-ping opacity-75" />
              </div>
              <div>
                <div className="font-mono text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  AUTOPILOT ENGINE RUNNING (No Manual Clicks Needed)
                </div>
                <div className="text-xs text-slate-300">
                  Automatically advancing leads through 10 phases and queuing 20+ Yrs HOD Copywriting deliverables.
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 font-mono text-xs">
              <span className="text-slate-400">Speed:</span>
              {[
                { label: '3s (Demo Fast)', val: 3000 },
                { label: '8s (Standard)', val: 8000 },
                { label: '15s (Realistic)', val: 15000 }
              ].map((s) => (
                <button
                  key={s.val}
                  onClick={() => setAutopilotIntervalMs(s.val)}
                  className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                    autopilotIntervalMs === s.val
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs pt-1">
            <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
              <span className="text-slate-400 text-[10px] block">CURRENT ACTIVE PHASE</span>
              <span className="font-bold text-emerald-400 text-sm">Phase {currentAutopilotPhase} / 10</span>
            </div>

            <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
              <span className="text-slate-400 text-[10px] block">AUTOMATED ACTIONS EXECUTED</span>
              <span className="font-bold text-amber-400 text-sm">{autoActionsCount} Outbound Steps</span>
            </div>

            <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
              <span className="text-slate-400 text-[10px] block">AI COPYWRITER LEVEL</span>
              <span className="font-bold text-blue-400 text-sm">20+ Yrs HOD Senior VP</span>
            </div>

            <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
              <span className="text-slate-400 text-[10px] block">TARGET LEADS IN FLIGHT</span>
              <span className="font-bold text-purple-400 text-sm">{leads.length} Leads Active</span>
            </div>
          </div>
        </div>
      )}

      {/* Manual Execution Control Panel */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-4 items-center text-slate-800">
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">Select Single Phase to Trigger</label>
          <select
            value={selectedPhaseToRun}
            onChange={(e) => setSelectedPhaseToRun(Number(e.target.value))}
            className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xs"
          >
            {PHASES_CONFIG.map((p) => (
              <option key={p.phase} value={p.phase}>
                {p.title} ({p.timeline})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">Target Lead Scope</label>
          <select
            value={targetLeadScope}
            onChange={(e) => setTargetLeadScope(e.target.value as 'all' | 'phase_matched')}
            className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xs"
          >
            <option value="all">All Discovered Leads ({leads.length})</option>
            <option value="phase_matched">
              Only Leads Currently in Phase {selectedPhaseToRun} ({leads.filter(l => l.current_phase === selectedPhaseToRun).length})
            </option>
          </select>
        </div>

        <div className="pt-5 flex items-center gap-2">
          <button
            id="btn-execute-single-phase"
            onClick={() => {
              const targetIds = targetLeadScope === 'phase_matched'
                ? leads.filter(l => l.current_phase === selectedPhaseToRun).map(l => l.id)
                : undefined;
              onAdvanceLeadsToPhase(selectedPhaseToRun as PipelinePhase, targetIds);
            }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm shadow-blue-200 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Execute Phase {selectedPhaseToRun} Now</span>
          </button>
        </div>
      </div>

      {/* 10-Phase Timeline Grid */}
      <div className="space-y-3">
        <h2 className="font-bold text-slate-900 text-sm flex items-center gap-2">
          <Clock className="w-4 h-4 text-blue-600" />
          <span>Full 10-Phase Automation Architecture & Schedule</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          {PHASES_CONFIG.map((p) => {
            const Icon = p.icon;
            const leadsInPhase = leads.filter((l) => l.current_phase === p.phase).length;
            return (
              <div
                key={p.phase}
                className={`p-4 rounded-2xl border ${p.color} flex flex-col justify-between space-y-3 shadow-2xs hover:shadow-sm transition-all`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wide opacity-80">
                      {p.timeline}
                    </span>
                    <span className="bg-white px-2 py-0.5 rounded text-[10px] font-mono text-slate-700 border border-slate-200 font-semibold">
                      {leadsInPhase} leads
                    </span>
                  </div>
                  <div className="flex items-center gap-2 font-bold text-xs text-slate-900">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{p.title}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                    {p.description}
                  </p>
                </div>

                <button
                  onClick={() => onAdvanceLeadsToPhase(p.phase as PipelinePhase)}
                  className="w-full mt-2 bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 text-[11px] font-medium py-1.5 rounded-xl flex items-center justify-center gap-1 transition-colors cursor-pointer shadow-2xs"
                >
                  <span>Trigger Phase {p.phase}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Live Terminal System Log Output */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <h3 className="font-bold text-slate-200 text-xs font-mono uppercase tracking-wider">
              Live System Execution Terminal
            </h3>
          </div>
          <button
            onClick={onClearLogs}
            className="text-[11px] text-slate-400 hover:text-slate-200 font-mono flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Clear Terminal Logs</span>
          </button>
        </div>

        <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-3 font-mono text-xs max-h-64 overflow-y-auto space-y-1 text-slate-300">
          {logs.length === 0 ? (
            <div className="text-slate-600 text-center py-6">Terminal idle. System ready for campaign execution.</div>
          ) : (
            logs.map((log) => {
              const levelColor =
                log.level === 'success'
                  ? 'text-emerald-400'
                  : log.level === 'warn'
                  ? 'text-amber-400'
                  : log.level === 'error'
                  ? 'text-rose-400'
                  : 'text-blue-400';

              return (
                <div key={log.id} className="flex items-start gap-2 text-[11px] leading-relaxed">
                  <span className="text-slate-500 shrink-0">[{log.timestamp}]</span>
                  <span className={`font-semibold shrink-0 uppercase ${levelColor}`}>[{log.level}]</span>
                  <span className="text-slate-400 shrink-0">({log.source}):</span>
                  <span className="text-slate-200">{log.message}</span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

