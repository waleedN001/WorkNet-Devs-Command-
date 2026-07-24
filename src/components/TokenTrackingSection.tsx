import React, { useState } from 'react';
import { 
  Zap, 
  CreditCard, 
  PieChart, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  Activity, 
  Sliders, 
  RefreshCw,
  Clock,
  Coins,
  ShieldAlert
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface TokenTrackingSectionProps {
  onLog?: (msg: string, level?: 'info' | 'success' | 'warn' | 'error') => void;
}

export const TokenTrackingSection: React.FC<TokenTrackingSectionProps> = ({ onLog }) => {
  const [alertThreshold, setAlertThreshold] = useState<number>(85);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mocked/Calculated API usage data
  const apiServices = [
    {
      id: 'gemini-ai',
      name: 'Google Gemini 1.5 Pro AI Engine',
      category: 'Copywriting & Lead Enrichment',
      used: 642100,
      quota: 1000000,
      unit: 'Tokens',
      unitCost: '€0.000002 / token',
      estCost: 12.84,
      color: 'bg-indigo-600',
      status: 'Normal'
    },
    {
      id: 'email-api',
      name: 'European Outbound SMTP Relay',
      category: 'Outbound Queue Dispatch',
      used: 3420,
      quota: 5000,
      unit: 'Emails',
      unitCost: '€0.002 / send',
      estCost: 6.84,
      color: 'bg-emerald-600',
      status: 'Normal'
    },
    {
      id: 'maps-scraper',
      name: 'European Google Maps Scraper API',
      category: 'Lead Discovery & Deep Ingestion',
      used: 12500,
      quota: 15000,
      unit: 'API Credits',
      unitCost: '€0.005 / lookup',
      estCost: 62.50,
      color: 'bg-amber-500',
      status: 'Warning (83%)'
    }
  ];

  const campaignCosts = [
    { campaign: 'Germany Salon Growth (DACH)', leads: 240, tokens: 280000, cost: '€34.20' },
    { campaign: 'Netherlands Hair Care (Benelux)', leads: 180, tokens: 210000, cost: '€25.10' },
    { campaign: 'Spain & Italy Wellness', leads: 120, tokens: 140000, cost: '€16.80' },
    { campaign: 'Nordics Aesthetic Clinics', leads: 95, tokens: 110000, cost: '€14.20' }
  ];

  const dailyUsageTrend = [
    { day: 'Mon', GeminiTokens: 82000, ScraperCredits: 1800, EmailSends: 450 },
    { day: 'Tue', GeminiTokens: 95000, ScraperCredits: 2200, EmailSends: 510 },
    { day: 'Wed', GeminiTokens: 110000, ScraperCredits: 2800, EmailSends: 620 },
    { day: 'Thu', GeminiTokens: 88000, ScraperCredits: 1900, EmailSends: 480 },
    { day: 'Fri', GeminiTokens: 125000, ScraperCredits: 3100, EmailSends: 710 },
    { day: 'Sat', GeminiTokens: 45000, ScraperCredits: 800, EmailSends: 200 },
    { day: 'Sun', GeminiTokens: 38000, ScraperCredits: 600, EmailSends: 150 }
  ];

  const handleRefreshUsage = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      onLog?.('API Token Usage & Quota meters refreshed from enterprise gateway', 'success');
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 text-white shadow-md space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-amber-500/20 text-amber-300 text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold border border-amber-500/30">
                TOKEN & API CONSUMPTION ENGINE
              </span>
              <span className="text-slate-400 font-mono text-xs">• Real-Time API Metering</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight mt-1 text-white">
              Enterprise AI & Infrastructure Usage Metering
            </h2>
            <p className="text-xs text-slate-300 mt-0.5 max-w-2xl">
              Monitor Google Gemini AI token consumption, Google Maps Scraper API calls, and SMTP outbound email quota in real-time.
            </p>
          </div>

          <button
            onClick={handleRefreshUsage}
            disabled={isRefreshing}
            className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-amber-400 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Sync Usage Meters</span>
          </button>
        </div>

        {/* 3 KPI Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs pt-2">
          <div className="bg-white/10 backdrop-blur-xs border border-white/15 rounded-xl p-4 space-y-1">
            <div className="text-slate-300 text-[10px] uppercase font-bold flex justify-between">
              <span>Total Gemini AI Tokens</span>
              <Coins className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-2xl font-bold text-white">642,100</div>
            <div className="text-[10px] text-indigo-300">64.2% of 1.0M Monthly Tier</div>
          </div>

          <div className="bg-white/10 backdrop-blur-xs border border-white/15 rounded-xl p-4 space-y-1">
            <div className="text-slate-300 text-[10px] uppercase font-bold flex justify-between">
              <span>Google Maps Scraper Credits</span>
              <Activity className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-bold text-amber-300">12,500 / 15,000</div>
            <div className="text-[10px] text-amber-200 font-bold">83.3% Consumed • Alert Active</div>
          </div>

          <div className="bg-white/10 backdrop-blur-xs border border-white/15 rounded-xl p-4 space-y-1">
            <div className="text-slate-300 text-[10px] uppercase font-bold flex justify-between">
              <span>Estimated Depletion Window</span>
              <Clock className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold text-emerald-400">18.4 Days</div>
            <div className="text-[10px] text-slate-300">Sufficient credit through Aug 2026</div>
          </div>
        </div>
      </div>

      {/* API Quota Meters */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5 text-slate-800">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-indigo-600" />
            <h3 className="font-bold text-slate-900 text-sm">Active API Service Quota Breakdown</h3>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="text-slate-500">Alert Threshold:</span>
            <select
              value={alertThreshold}
              onChange={(e) => setAlertThreshold(Number(e.target.value))}
              className="bg-slate-100 border border-slate-300 rounded-md px-2 py-1 font-bold text-slate-800"
            >
              <option value={75}>75% Usage</option>
              <option value={80}>80% Usage</option>
              <option value={85}>85% Usage</option>
              <option value={90}>90% Usage</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {apiServices.map((srv) => {
            const pct = Math.round((srv.used / srv.quota) * 100);
            const isWarn = pct >= alertThreshold;

            return (
              <div 
                key={srv.id} 
                className={`border rounded-xl p-4 space-y-3 font-sans transition-all ${
                  isWarn ? 'bg-amber-50/60 border-amber-300' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">{srv.category}</span>
                    <h4 className="font-bold text-slate-900 text-sm">{srv.name}</h4>
                  </div>
                  {isWarn && (
                    <span className="bg-amber-100 text-amber-800 text-[10px] font-mono px-2 py-0.5 rounded font-bold flex items-center gap-1 shrink-0">
                      <ShieldAlert className="w-3 h-3 text-amber-600" />
                      <span>{srv.status}</span>
                    </span>
                  )}
                </div>

                <div className="space-y-1 font-mono text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Usage Progress:</span>
                    <span className="font-bold text-slate-900">{srv.used.toLocaleString()} / {srv.quota.toLocaleString()} {srv.unit}</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all ${isWarn ? 'bg-amber-500' : 'bg-indigo-600'}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-500 pt-1">
                    <span>Rate: {srv.unitCost}</span>
                    <span className="font-bold text-slate-900">Est. €{srv.estCost.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chart & Campaign Cost Allocation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Token Consumption Chart */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 text-slate-800">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2 border-b border-slate-100 pb-3">
            <PieChart className="w-4 h-4 text-indigo-600" />
            <span>7-Day Token & API Credit Velocity</span>
          </h3>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyUsageTrend}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip />
                <Bar dataKey="GeminiTokens" fill="#6366f1" name="Gemini Tokens" radius={[4, 4, 0, 0]} />
                <Bar dataKey="ScraperCredits" fill="#f59e0b" name="Scraper Credits" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Campaign Cost Breakdown */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 text-slate-800">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2 border-b border-slate-100 pb-3">
            <CreditCard className="w-4 h-4 text-indigo-600" />
            <span>API Token Allocation by European Campaign</span>
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left font-sans">
              <thead className="bg-slate-100 font-mono text-slate-700 uppercase text-[10px]">
                <tr>
                  <th className="py-2.5 px-3">Campaign Target</th>
                  <th className="py-2.5 px-3">Leads</th>
                  <th className="py-2.5 px-3">Tokens Used</th>
                  <th className="py-2.5 px-3 text-right">Est. Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-slate-800">
                {campaignCosts.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-sans font-medium text-slate-900">{item.campaign}</td>
                    <td className="py-2.5 px-3">{item.leads}</td>
                    <td className="py-2.5 px-3">{item.tokens.toLocaleString()}</td>
                    <td className="py-2.5 px-3 text-right font-bold text-emerald-700">{item.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
