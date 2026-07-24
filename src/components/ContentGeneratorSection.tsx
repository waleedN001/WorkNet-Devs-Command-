import React, { useState } from 'react';
import { Lead } from '../types';
import { 
  FileText, 
  Sparkles, 
  Copy, 
  Check, 
  Download, 
  Loader2, 
  Layers, 
  ExternalLink,
  BookOpen,
  Send,
  Award,
  Crown,
  Briefcase
} from 'lucide-react';

interface ContentGeneratorSectionProps {
  leads: Lead[];
  onLog: (msg: string, level?: 'info' | 'success' | 'warn' | 'error') => void;
}

const DELIVERABLE_TYPES = [
  { key: 'website_audit', title: 'Website UX & Conversion Audit', desc: 'Complete website diagnostic with leakage fixes & recommendations' },
  { key: 'social_media_strategy', title: '30-Day Social Media Strategy', desc: '30-day content calendar, engagement tactics & repost plan' },
  { key: 'google_sheet_dashboard', title: 'Real-Time KPI Dashboard', desc: 'Google Sheets revenue & pipeline tracker' },
  { key: 'automation_workflow', title: 'N8N Automation Blueprint', desc: 'Step-by-step lead capture & multi-channel routing blueprint' },
  { key: 'seo_analysis', title: 'SEO Keyword & Competitor Audit', desc: 'Complete SEO audit with high-intent keywords' },
  { key: 'growth_roadmap', title: '6-Month Scaling Roadmap', desc: 'Strategic 6-month growth roadmap for market leadership' },
];

const COPYWRITER_PRESETS = [
  { key: 'hod_executive', title: '20+ Yrs HOD Executive VP', icon: Crown, desc: 'Authoritative C-level persuasion, high emotional resonance & ROI calculus' },
  { key: 'viral_hooks', title: 'Irresistible Cold Hooks', icon: Sparkles, desc: 'Pattern-interrupt opening lines, curiosity loops & sharp call-to-actions' },
  { key: 'analytical_audit', title: 'Data-Dense Technical SOP', icon: Briefcase, desc: 'Problem diagnostic, numerical leakage estimates & step-by-step fix' },
];

export const ContentGeneratorSection: React.FC<ContentGeneratorSectionProps> = ({ leads, onLog }) => {
  const [selectedLeadId, setSelectedLeadId] = useState<string>(leads[0]?.id || '');
  const [phase, setPhase] = useState<number>(2);
  const [deliverableType, setDeliverableType] = useState<string>('website_audit');
  const [copyPreset, setCopyPreset] = useState<string>('hod_executive');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedOutput, setGeneratedOutput] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const activeLead = leads.find((l) => l.id === selectedLeadId) || leads[0];

  const handleGenerateContent = async () => {
    if (!activeLead) {
      onLog('Please select a business lead first.', 'warn');
      return;
    }

    setIsGenerating(true);
    onLog(`Generating AI Phase ${phase} materials for "${activeLead.business_name}" via Google Gemini AI (20+ Yrs HOD Copywriter)...`, 'info');

    try {
      const response = await fetch('/api/ai/generate-phase-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phase,
          lead: activeLead,
          copywriter_preset: copyPreset,
          custom_deliverable_type: DELIVERABLE_TYPES.find(d => d.key === deliverableType)?.title
        })
      });

      const data = await response.json();
      if (data.content) {
        setGeneratedOutput(data.content);
        onLog(`Generated Phase ${phase} HOD-level copy for ${activeLead.business_name} successfully!`, 'success');
      }
    } catch (err) {
      onLog(`Failed generating content: ${err}`, 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    onLog('Copied content to clipboard.', 'info');
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedOutput], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = `${activeLead?.business_name.replace(/[^a-z0-0]/gi, '_')}_Phase${phase}_HOD_Copy.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    onLog('Downloaded markdown report.', 'success');
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl text-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-400 mb-1">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span>Phases 2-10 Google AI Copywriting Studio</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2">
            <span>20+ Yrs Executive HOD AI Content Engine</span>
            <span className="bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-mono px-2.5 py-1 rounded-full">
              Gemini 3.6 Flash
            </span>
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
            Generates high-converting cold email hooks, C-level proposals, technical documentation, pitch scripts, and strategic follow-ups crafted as if written by a 20+ Years Senior Vice President of Outbound Growth.
          </p>
        </div>
      </div>

      {/* Generator Controls Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings Panel */}
        <div className="lg:col-span-1 bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-sm text-slate-800">
          <h2 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-blue-600" />
            <span>Generation Parameters</span>
          </h2>

          <div className="space-y-3">
            {/* Copywriter Preset Selector */}
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Copywriting Style Preset</label>
              <div className="space-y-1.5">
                {COPYWRITER_PRESETS.map((p) => {
                  const Icon = p.icon;
                  return (
                    <button
                      key={p.key}
                      onClick={() => setCopyPreset(p.key)}
                      className={`w-full text-left p-2.5 rounded-xl border text-xs transition-all cursor-pointer flex items-center gap-2.5 ${
                        copyPreset === p.key
                          ? 'bg-blue-50 border-blue-500 text-blue-900 font-semibold shadow-2xs'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <Icon className="w-4 h-4 text-blue-600 shrink-0" />
                      <div>
                        <div className="font-bold">{p.title}</div>
                        <div className="text-[10px] text-slate-500 leading-tight">{p.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Lead Selector */}
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Target Business Lead</label>
              <select
                value={selectedLeadId}
                onChange={(e) => setSelectedLeadId(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xs"
              >
                {leads.map((lead) => (
                  <option key={lead.id} value={lead.id}>
                    {lead.business_name} ({lead.target_area})
                  </option>
                ))}
              </select>
            </div>

            {/* Target Phase */}
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Outreach Phase</label>
              <select
                value={phase}
                onChange={(e) => setPhase(Number(e.target.value))}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xs font-mono"
              >
                <option value={2}>Phase 2: Initial Value Email & Assessment</option>
                <option value={3}>Phase 3: Custom Deliverable + Social Post</option>
                <option value={4}>Phase 4: Complete 5-Section Growth Blueprint</option>
                <option value={5}>Phase 5: Golden Proposal & Demo Script</option>
                <option value={6}>Phase 6: Monthly Scaling Insights</option>
                <option value={7}>Phase 7: Multi-Channel Follow-up (InMail / IG / FB)</option>
                <option value={8}>Phase 8: New Value Creation Announcement</option>
                <option value={9}>Phase 9: Competitor Intelligence Analysis</option>
                <option value={10}>Phase 10: Industry Breaking News Alert</option>
              </select>
            </div>

            {/* Deliverable Type */}
            {phase === 3 && (
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Custom Deliverable Asset</label>
                <select
                  value={deliverableType}
                  onChange={(e) => setDeliverableType(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xs"
                >
                  {DELIVERABLE_TYPES.map((dt) => (
                    <option key={dt.key} value={dt.key}>
                      {dt.title}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Selected Lead Quick Preview */}
            {activeLead && (
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-[11px] space-y-1 text-slate-700 font-mono">
                <div className="text-blue-700 font-bold">{activeLead.business_name}</div>
                <div>Decision Maker: {activeLead.personnel.responsible_person}</div>
                <div>Email: {activeLead.contact.email}</div>
                <div>Revenue: {activeLead.intelligence.annual_revenue}</div>
                <div className="text-amber-700 font-semibold mt-1">
                  Remark: {activeLead.metrics.system_remark}
                </div>
              </div>
            )}

            <button
              id="btn-generate-ai-content"
              onClick={handleGenerateContent}
              disabled={isGenerating}
              className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm shadow-blue-200 cursor-pointer disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Google AI Writing HOD Copy...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Executive AI Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Generated Content Studio Output */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-sm flex flex-col justify-between text-slate-800">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" />
                <h2 className="font-bold text-slate-900 text-sm">Generated Materials & Deliverable Preview</h2>
              </div>
              {generatedOutput && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs px-2.5 py-1 rounded-lg flex items-center gap-1 transition-colors border border-slate-200 cursor-pointer font-medium"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                  <button
                    onClick={handleDownload}
                    className="bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs px-2.5 py-1 rounded-lg flex items-center gap-1 transition-colors cursor-pointer font-medium"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download MD</span>
                  </button>
                </div>
              )}
            </div>

            {!generatedOutput ? (
              <div className="py-20 text-center text-slate-400 space-y-3">
                <Sparkles className="w-10 h-10 mx-auto text-blue-400 stroke-1" />
                <p className="text-xs max-w-sm mx-auto leading-relaxed">
                  Select a target lead and click "Generate Executive AI Copy" to let Google AI write ultra-persuasive HOD-level outreach documents.
                </p>
              </div>
            ) : (
              <div className="mt-4 bg-slate-50 border border-slate-200 rounded-xl p-5 max-h-[480px] overflow-y-auto text-xs text-slate-800 font-mono whitespace-pre-wrap leading-relaxed shadow-inner">
                {generatedOutput}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

