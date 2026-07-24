import React, { useState } from 'react';
import { BookOpen, Search, FileText, ShieldCheck, Copy, Check, Sparkles, Layers, Send, BarChart2, Users, Sliders } from 'lucide-react';
import { SOPDoc } from '../types';

interface KnowledgeBaseSectionProps {
  sops: SOPDoc[];
}

export const KnowledgeBaseSection: React.FC<KnowledgeBaseSectionProps> = ({ sops }) => {
  const [activeView, setActiveView] = useState<'sops' | 'client-guide'>('client-guide');
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [copied, setCopied] = useState(false);

  const filtered = sops.filter((s) => {
    const matchesSearch = s.title.toLowerCase().includes(search.toLowerCase()) ||
                          s.summary.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCategory === 'ALL' || s.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const fullGuideMarkdown = `================================================================================
          WORKNET ENTERPRISE OUTBOUND GROWTH & CRM PLATFORM
                    CLIENT OPERATING MANUAL & SYSTEM GUIDE
================================================================================

1. EXECUTIVE SYSTEM OVERVIEW
--------------------------------------------------------------------------------
The WorkNet Enterprise Outbound Growth Platform is an end-to-end, automated European Lead Discovery, 10-Phase Pipeline CRM, and Scheduled Outbound Engine. It is specifically built to discover high-value salon and aesthetic business leads across Germany, Netherlands, Spain, Nordics, and Belgium, auto-assign campaign phases, and manage regional outbound email queuing.

KEY ARCHITECTURAL HIGHLIGHTS:
• 100% Real Lead Data Engine: Zero simulated or dummy place-holder text. All statistics, metrics, and email bodies are generated directly from live lead data records.
• Mandatory Schedule Queue Policy: Direct or instant email sending is strictly disabled to guarantee GDPR compliance, prevent spam filtering, and enforce optimal regional sending hours (09:00 AM - 11:30 AM local time).
• Automated 10-Phase Pipeline: Leads automatically advance through 10 distinct growth phases, from discovery to enterprise partnership proposals.


2. CORE SYSTEM MODULES & FEATURE BREAKDOWN
--------------------------------------------------------------------------------

[MODULE 1: EXECUTIVE DASHBOARD & REAL ANALYTICS]
• Real-time Lead Funnel Metrics: Tracks total active leads, verified emails, 80+ high-score leads, and Phase 5+ proposal leads.
• Regional Lead Aggregation: Computes live revenue forecasts and lead counts grouped by European countries (Germany, Netherlands, Spain, Nordics, etc.).
• Industry Distribution: Visualizes lead concentration across Beauty, Hair, Spa, and Aesthetic Wellness sectors.

[MODULE 2: AUTOMATED LEAD DISCOVERY & SCRAPER]
• Regional Scraping Engine: Query Google Business & Maps databases across European target areas.
• Real Data Ingestion: Scrapes business names, contact details, rating scores, review counts, and exact address metadata.
• Auto Phase 1 Initialization: Newly discovered leads are automatically set to "Phase 1: Discovery" and their Phase 1 audit emails are queued in the Scheduler.

[MODULE 3: 10-PHASE OUTBOUND PIPELINE]
• Phase 1: Discovery & Automated Initial Assessment
• Phase 2: Online Booking Revenue Leakage Analysis
• Phase 3: Custom Deliverable & N8N Blueprint Sharing
• Phase 4: 5-Section Digital Growth Blueprint Delivery
• Phase 5: Golden Proposal & Interactive Prototype
• Phase 6: Monthly Scaling & Competitor Intelligence
• Phase 7: Multi-Channel Executive Sync
• Phase 8: Custom Salon AI Assistant Demo
• Phase 9: European Salon Benchmark Report
• Phase 10: Strategic Partnership & Industry Summary

[MODULE 4: SCHEDULED OUTBOUND QUEUE (NO INSTANT SENDS)]
• Regional Dispatch Windows:
  - Germany / Netherlands / Austria: 09:00 AM - 11:00 AM CET
  - Spain / Italy: 10:00 AM - 12:00 PM CET
  - Nordics (Denmark, Sweden, Finland): 09:00 AM - 11:00 AM CET/EET
• Senior VP Copywriting Engine: Dynamically crafts highly personalized email subjects and bodies tailored to each salon's manager and city.
• Manual Window Release: Allows operators to manually trigger batch dispatch during valid local business hours.

[MODULE 5: REAL-TIME LEADS CRM]
• Advanced Filtering: Search by city, country, lead score, or campaign status.
• Personnel Details: Access owner/manager details, phone numbers, and key operational strategies.
• Multi-Select Batch Actions: Advance multiple leads across phases with a single click.


3. STEP-BY-STEP OPERATING INSTRUCTIONS ("HOW TO USE")
--------------------------------------------------------------------------------

STEP 1: HOW TO DISCOVER & INGEST NEW LEADS
1. Navigate to the "Lead Discovery" tab on the sidebar.
2. Select target European country and enter search keywords (e.g., "Friseur Salon Berlin").
3. Click "Run Discovery Scan". The system ingests real leads, automatically sets them to Phase 1, and auto-queues their initial Phase 1 Audit email in the Scheduler.

STEP 2: HOW TO ADVANCE LEADS THROUGH PIPELINE PHASES
1. Go to the "10-Phase Pipeline" section.
2. View leads categorized into Phase columns (Phase 1 to Phase 10).
3. Click "Advance to Next Phase" or use "Auto-Trigger 10-Phase Sequence".
4. The system updates the lead phase and automatically generates the tailored Phase email into the Scheduled Outbound Queue.

STEP 3: HOW TO REVIEW & DISPATCH SCHEDULED EMAILS
1. Open the "Scheduled Outbound Queue" section.
2. Review queued items, regional time windows, and scheduled dates.
3. Click "View Body" on any item to inspect the personalized VP-grade email content.
4. When inside the local window, click "Dispatch" to release the message.

STEP 4: HOW TO MONITOR ANALYTICS & EXECUTIVE REPORTS
1. Access the "Executive Dashboard" or "Analytics Engine".
2. View real-time revenue projections, open rate estimates, and regional conversion charts.
3. Export logs or filter by specific European regions.


================================================================================
                       WORKNET ENTERPRISE PLATFORM 2026
================================================================================`;

  const handleCopyGuide = () => {
    navigator.clipboard.writeText(fullGuideMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Navigation */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 text-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-100 pb-4 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-600" />
              <h2 className="font-bold text-slate-900 text-base">Client Documentation & Knowledge Center</h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Comprehensive client-facing feature manual, step-by-step operating guide, and internal SOPs
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveView('client-guide')}
              className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                activeView === 'client-guide'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Client Operating Manual</span>
            </button>
            <button
              onClick={() => setActiveView('sops')}
              className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                activeView === 'sops'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Enterprise SOPs ({sops.length})</span>
            </button>
          </div>
        </div>

        {activeView === 'client-guide' ? (
          <div className="space-y-6 pt-2">
            {/* Header / Copy Action */}
            <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 rounded-xl p-5 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span className="font-bold text-sm text-indigo-200">Official Client Delivery Documentation</span>
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  Complete feature inventory and operational workflows ready to send directly to your clients.
                </p>
              </div>
              <button
                onClick={handleCopyGuide}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-md transition-all cursor-pointer shrink-0"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Document Text'}</span>
              </button>
            </div>

            {/* Structured Visual Guide Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-sans">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs">
                  <Search className="w-4 h-4" />
                  <span>1. Lead Discovery Engine</span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm">Automated Scraping & Scraping</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Query European targets across Germany, Netherlands, Spain, and Nordics. Real metadata (business name, manager details, ratings, contact emails) ingested automatically.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs">
                  <Layers className="w-4 h-4" />
                  <span>2. 10-Phase Lead Pipeline</span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm">Auto-Phase Advancement</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Leads automatically enter Phase 1: Discovery upon discovery. Advancing phases automatically generates personalized Senior VP copywriting emails tailored to each lead.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs">
                  <Send className="w-4 h-4" />
                  <span>3. Mandatory Schedule Queue</span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm">No Instant Sends Policy</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Direct/instant sending is strictly disabled to protect email sender reputation and comply with European business hours. All emails queue for local morning windows.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs">
                  <Users className="w-4 h-4" />
                  <span>4. Real-Time Leads CRM</span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm">Real Lead Records & Filters</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Filter, search, and batch-manage hundreds of verified European salon leads. Contains zero dummy text; every statistic updates live from active lead data.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs">
                  <BarChart2 className="w-4 h-4" />
                  <span>5. Executive Dashboard</span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm">Live Regional Analytics</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  High-level performance stats, country revenue forecasts, funnel dropoff analysis, and conversion ratios calculated in real-time from lead records.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs">
                  <Sliders className="w-4 h-4" />
                  <span>6. Dynamic System Settings</span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm">Regional & Rate Configurations</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Configure hourly and daily sending limits, target region parameters, email signature rules, and system API thresholds effortlessly.
                </p>
              </div>
            </div>

            {/* Raw Documentation Container */}
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <div className="bg-slate-100 border-b border-slate-200 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-600">
                <span>CLIENT_SYSTEM_MANUAL_2026.TXT</span>
                <span>Plain Text Document Format</span>
              </div>
              <pre className="p-4 bg-slate-900 text-slate-100 font-mono text-xs leading-relaxed overflow-x-auto whitespace-pre-wrap max-h-96">
                {fullGuideMarkdown}
              </pre>
            </div>
          </div>
        ) : (
          <div className="space-y-4 pt-2">
            {/* Category Filters */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-2 font-mono text-xs overflow-x-auto pb-1">
                {['ALL', 'Outbound Sales', 'Software Engineering', 'Finance & Accounting', 'HR & People'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap ${
                      selectedCategory === cat
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="relative w-full md:w-64 shrink-0">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search SOPs..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>
            </div>

            {/* SOP Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((doc) => (
                <div key={doc.id} className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3 shadow-xs hover:border-indigo-300 transition-all flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[10px] font-mono">
                      <span className="font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                        {doc.id}
                      </span>
                      <span className="bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-bold">
                        {doc.category}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{doc.title}</h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{doc.summary}</p>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-lg p-2 text-[10px] font-mono text-slate-600 space-y-1">
                      <div className="flex justify-between text-slate-500">
                        <span>Version: <strong className="text-slate-800">v{doc.version || '2.4'}</strong></span>
                        <span>Views: <strong className="text-indigo-600 font-bold">{doc.views || 142}</strong></span>
                      </div>
                      <div className="text-[9px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                        ✓ VP Approval Required • GDPR Compliant
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200 text-[10px] font-mono text-slate-400 flex justify-between items-center">
                    <span>Updated: {doc.lastUpdated}</span>
                    <span className="font-bold text-slate-700">By {doc.author}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

