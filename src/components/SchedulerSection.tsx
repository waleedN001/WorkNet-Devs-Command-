import React, { useState } from 'react';
import { ScheduledEmail } from '../types';
import { 
  Clock, 
  Send, 
  AlertTriangle, 
  CheckCircle2, 
  Globe, 
  ShieldCheck, 
  Play, 
  RotateCcw,
  ListOrdered
} from 'lucide-react';

interface SchedulerSectionProps {
  scheduledEmails: ScheduledEmail[];
  onTriggerSend: (id: string) => void;
  onCancelScheduledEmail?: (id: string) => void;
  onDispatchBatch?: (count?: number) => void;
  onLog: (msg: string, level?: 'info' | 'success' | 'warn' | 'error') => void;
}

const REGION_SCHEDULE_WINDOWS: Record<string, string> = {
  Germany: '09:00 AM - 11:00 AM CET (Secondary: 02:00 PM - 04:00 PM CET)',
  Netherlands: '09:30 AM - 11:30 AM CET (Secondary: 01:30 PM - 03:30 PM CET)',
  Spain: '10:00 AM - 12:00 PM CET (Secondary: 04:00 PM - 06:00 PM CET)',
  Denmark: '09:00 AM - 11:00 AM CET (Secondary: 01:00 PM - 03:00 PM CET)',
  Sweden: '09:00 AM - 11:00 AM CET (Secondary: 01:00 PM - 03:00 PM CET)',
  Finland: '09:00 AM - 11:00 AM EET (Secondary: 01:00 PM - 03:00 PM EET)',
  Belgium: '09:00 AM - 11:00 AM CET (Secondary: 02:00 PM - 04:00 PM CET)',
  Austria: '09:00 AM - 11:00 AM CET (Secondary: 02:00 PM - 04:00 PM CET)',
  Estonia: '09:00 AM - 11:00 AM EET (Secondary: 02:00 PM - 04:00 PM EET)',
  'Pan-European': '09:00 AM - 11:00 AM CET',
};

export const SchedulerSection: React.FC<SchedulerSectionProps> = ({
  scheduledEmails,
  onTriggerSend,
  onCancelScheduledEmail,
  onDispatchBatch,
  onLog,
}) => {
  const sentCount = scheduledEmails.filter(e => e.status === 'Sent').length;
  const queuedCount = scheduledEmails.filter(e => e.status === 'Queued').length;
  const hourlyCount = Math.min(5, queuedCount);
  const dailyCount = Math.min(50, sentCount + queuedCount);
  const [selectedPreviewEmail, setSelectedPreviewEmail] = useState<ScheduledEmail | null>(null);

  // Pagination State for Outbound Queue (Max 15 items per page)
  const [currentPage, setCurrentPage] = useState<number>(1);
  const ITEMS_PER_PAGE = 15;

  const totalPages = Math.ceil(scheduledEmails.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedEmails = scheduledEmails.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="space-y-8 pb-12">
      {/* Policy Banner: Mandatory Scheduling Guarantee */}
      <div className="bg-indigo-900/90 border border-indigo-700/80 rounded-2xl p-4 text-white shadow-md flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <div className="text-xs space-y-1">
          <div className="font-bold text-sm text-indigo-100 flex items-center gap-2">
            <span>Mandatory Schedule Queue Policy (No Direct / Instant Sends)</span>
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[10px] px-2 py-0.5 rounded-full font-mono">
              Enforced 100%
            </span>
          </div>
          <p className="text-slate-300 leading-relaxed">
            All lead phases and emails are <strong>automatically generated & scheduled</strong>. Direct or instant sending is strictly disabled to prevent spam flags and respect European regional business hours. Every outbound campaign message is placed in this queue and dispatched during optimal local windows.
          </p>
        </div>
      </div>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl text-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-1">
            <Clock className="w-4 h-4" />
            <span>Timezone-Aware Outbound Dispatcher</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Email Scheduler Engine & Rate Limiter
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
            Optimizes regional send times across European timezones with strict hourly (5 max) and daily (50 max) rate limits to maximize open rates and avoid spam filters.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-900/90 border border-slate-700/60 rounded-xl p-3 text-xs font-mono space-y-1 text-slate-300 shadow-inner">
            <div className="text-emerald-400 font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Rate Limit Active</span>
            </div>
            <div>Hourly: {hourlyCount}/5 | Daily: {dailyCount}/50</div>
          </div>
        </div>
      </div>

      {/* Rate Limit Gauges & European Windows */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Gauge 1: Hourly Limit */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3 shadow-sm text-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-700 font-mono">
            <span>Hourly Dispatch Limit</span>
            <span className="text-indigo-600 font-bold">{hourlyCount} / 5</span>
          </div>
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${(hourlyCount / 5) * 100}%` }} />
          </div>
          <p className="text-[11px] text-slate-500">Strict max 5 emails per hour to protect sender domain reputation.</p>
        </div>

        {/* Gauge 2: Daily Limit */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3 shadow-sm text-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-700 font-mono">
            <span>Daily Dispatch Limit</span>
            <span className="text-emerald-600 font-bold">{dailyCount} / 50</span>
          </div>
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${(dailyCount / 50) * 100}%` }} />
          </div>
          <p className="text-[11px] text-slate-500">Free Gmail Workspace allowance: 48-50 emails/day maximum.</p>
        </div>

        {/* Region Timezone Quick Matrix */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-2 shadow-sm text-slate-800">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 border-b border-slate-100 pb-2">
            <Globe className="w-4 h-4 text-indigo-600" />
            <span>Regional Optimal Windows</span>
          </div>
          <div className="text-[11px] text-slate-700 space-y-1 max-h-24 overflow-y-auto font-mono">
            {Object.entries(REGION_SCHEDULE_WINDOWS).map(([country, windowStr]) => (
              <div key={country} className="flex justify-between border-b border-slate-100 pb-0.5">
                <span className="text-indigo-700 font-bold">{country}:</span>
                <span className="text-slate-500 truncate max-w-[180px]">{windowStr}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Queue Table */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4 text-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <ListOrdered className="w-5 h-5 text-indigo-600" />
            <h2 className="font-bold text-slate-900 text-sm">Scheduled Outbound Queue (Auto-Generated)</h2>
          </div>
          <div className="flex items-center gap-2">
            {onDispatchBatch && queuedCount > 0 && (
              <button
                onClick={() => onDispatchBatch(5)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Dispatch Next Batch (Max 5/hr)</span>
              </button>
            )}
            <span className="text-xs font-mono text-slate-700 bg-slate-100 px-3 py-1 rounded-full border border-slate-200 font-semibold">
              {scheduledEmails.length} Scheduled Items
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-500 font-mono text-[10px] font-bold uppercase border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Business Recipient</th>
                <th className="py-2.5 px-3">Phase & Subject</th>
                <th className="py-2.5 px-3">Attachment</th>
                <th className="py-2.5 px-3">Scheduled Time</th>
                <th className="py-2.5 px-3">Optimal Window</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {paginatedEmails.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-2.5 px-3">
                    <div className="font-bold text-slate-900">{item.business_name}</div>
                    <div className="text-[11px] text-indigo-700 font-mono font-medium">{item.recipient_email}</div>
                  </td>
                  <td className="py-2.5 px-3 max-w-[240px]">
                    <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 text-[10px] px-1.5 py-0.5 rounded font-mono font-bold">
                      Phase {item.phase}
                    </span>
                    <div className="text-[11px] text-slate-800 font-medium mt-1 truncate">{item.subject}</div>
                  </td>
                  <td className="py-2.5 px-3 text-[11px] text-slate-500 font-mono truncate max-w-[140px]">
                    {item.attachment_name}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-slate-700">
                    {new Date(item.scheduled_time).toLocaleString('en-GB')}
                  </td>
                  <td className="py-2.5 px-3 text-[10px] font-mono text-slate-500">
                    {item.regional_window}
                  </td>
                  <td className="py-2.5 px-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        item.status === 'Sent'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right flex items-center justify-end gap-2">
                    <button
                      onClick={() => setSelectedPreviewEmail(item)}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-[11px] px-2.5 py-1 rounded-lg border border-slate-300 transition-all cursor-pointer"
                    >
                      View Body
                    </button>
                    {item.status === 'Queued' && (
                      <>
                        <button
                          onClick={() => onTriggerSend(item.id)}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-[11px] px-3 py-1 rounded-lg flex items-center gap-1 transition-all shadow-sm shadow-indigo-200 cursor-pointer"
                          title="Release email now during active window"
                        >
                          <Send className="w-3 h-3 text-white" />
                          <span>Dispatch</span>
                        </button>

                        {onCancelScheduledEmail && (
                          <button
                            onClick={() => onCancelScheduledEmail(item.id)}
                            className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-medium text-[11px] px-2.5 py-1 rounded-lg transition-all cursor-pointer"
                            title="Cancel and remove from queue"
                          >
                            Cancel
                          </button>
                        )}
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer Controls */}
        <div className="bg-slate-50 border-t border-slate-200 px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
          <div className="text-slate-500">
            Showing <span className="font-bold text-slate-800">{scheduledEmails.length === 0 ? 0 : startIndex + 1}</span> to{' '}
            <span className="font-bold text-slate-800">{Math.min(startIndex + ITEMS_PER_PAGE, scheduledEmails.length)}</span> of{' '}
            <span className="font-bold text-slate-800">{scheduledEmails.length}</span> scheduled emails (15 max per page)
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed font-medium cursor-pointer"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded-lg border font-bold cursor-pointer ${
                  currentPage === page
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed font-medium cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Preview Email Body Modal */}
      {selectedPreviewEmail && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-4 text-slate-800">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 text-[10px] px-2 py-0.5 rounded font-mono font-bold uppercase">
                  Auto-Generated Phase {selectedPreviewEmail.phase} Email
                </span>
                <h3 className="font-bold text-lg text-slate-900 mt-1">{selectedPreviewEmail.subject}</h3>
                <div className="text-xs text-slate-500 font-mono">Recipient: {selectedPreviewEmail.business_name} ({selectedPreviewEmail.recipient_email})</div>
              </div>
              <button
                onClick={() => setSelectedPreviewEmail(null)}
                className="text-slate-400 hover:text-slate-600 text-xl font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs font-mono text-slate-800 whitespace-pre-wrap leading-relaxed max-h-80 overflow-y-auto">
              {selectedPreviewEmail.body}
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-3">
              <div>
                Scheduled Window: <span className="font-bold text-indigo-700">{selectedPreviewEmail.regional_window}</span>
              </div>
              <button
                onClick={() => setSelectedPreviewEmail(null)}
                className="bg-slate-900 hover:bg-slate-800 text-white font-medium px-4 py-1.5 rounded-lg text-xs cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
