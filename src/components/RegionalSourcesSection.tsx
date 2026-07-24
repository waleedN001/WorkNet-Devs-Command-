import React from 'react';
import { RegionalSourceInfo } from '../types';
import { Globe, Database, CheckCircle2, ShieldAlert, Award, Search, Building2 } from 'lucide-react';

interface RegionalSourcesSectionProps {
  sources: Record<string, RegionalSourceInfo>;
}

export const RegionalSourcesSection: React.FC<RegionalSourcesSectionProps> = ({ sources }) => {
  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl text-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-1">
            <Globe className="w-4 h-4" />
            <span>Official European Registries & Verification Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            European Regional Data Sources Matrix
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
            Integrated data scrapers & enrichment connectors for primary government registries, commercial trade databases, and chamber directories across 10 European jurisdictions.
          </p>
        </div>
      </div>

      {/* Grid of 10 Regional Databases */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.values(sources).map((src: RegionalSourceInfo) => (
          <div
            key={src.country}
            className="bg-white border border-slate-200 rounded-xl p-5 space-y-4 shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between text-slate-800"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-indigo-600" />
                  <h2 className="font-bold text-slate-900 text-base">{src.country}</h2>
                </div>
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono text-[10px] px-2 py-0.5 rounded font-bold">
                  {src.verified_records}
                </span>
              </div>

              <div>
                <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">Priority Scraper DB:</div>
                <div className="font-semibold text-xs text-indigo-700 mt-0.5 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>{src.priority_db}</span>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-700">
                <div>
                  <span className="text-slate-500 font-mono text-[11px]">Primary Sources:</span>
                  <ul className="list-disc list-inside text-slate-800 space-y-0.5 mt-0.5 text-[11px]">
                    {src.primary.map((item, idx) => (
                      <li key={idx} className="truncate">{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <span className="text-slate-500 font-mono text-[11px]">Secondary Sources:</span>
                  <ul className="list-disc list-inside text-slate-600 space-y-0.5 mt-0.5 text-[11px]">
                    {src.secondary.map((item, idx) => (
                      <li key={idx} className="truncate">{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <span className="text-slate-500 font-mono text-[11px]">Commercial Directories:</span>
                  <div className="text-[11px] text-slate-600 mt-0.5 font-mono">
                    {src.commercial.join(' • ')}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-emerald-700 font-semibold">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>API Connector Ready</span>
              </span>
              <span className="text-slate-400">Live Sync</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
