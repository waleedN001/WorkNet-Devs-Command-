import React, { useState } from 'react';
import { Lead } from '../types';
import { exportLeadGDPRData, isDuplicateLead } from '../utils/businessLogic';
import { 
  Search, 
  Filter, 
  Download, 
  Trash2, 
  Eye, 
  Globe, 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  UserCheck, 
  CheckCircle2, 
  XCircle, 
  ExternalLink, 
  Sparkles,
  Layers,
  Star,
  DollarSign,
  AlertCircle,
  X,
  ShieldCheck,
  Ban
} from 'lucide-react';

interface LeadsCRMSectionProps {
  leads: Lead[];
  onUpdateLead: (updatedLead: Lead) => void;
  onDeleteLeads: (leadIds: string[]) => void;
  onBatchAdvance: (leadIds: string[]) => void;
  onLog: (msg: string, level?: 'info' | 'success' | 'warn' | 'error') => void;
}

export const LeadsCRMSection: React.FC<LeadsCRMSectionProps> = ({
  leads,
  onUpdateLead,
  onDeleteLeads,
  onBatchAdvance,
  onLog
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [countryFilter, setCountryFilter] = useState<string>('All');
  const [phaseFilter, setPhaseFilter] = useState<string>('All');
  const [selectedLeadIds, setSelectedLeadIds] = useState<string[]>([]);
  const [activeModalLead, setActiveModalLead] = useState<Lead | null>(null);
  const [rescrapingId, setRescrapingId] = useState<string | null>(null);
  const [showJsonSchema, setShowJsonSchema] = useState(false);

  // Pagination state (Max 20 leads per page as requested)
  const [currentPage, setCurrentPage] = useState<number>(1);
  const ITEMS_PER_PAGE = 20;

  // Single Lead Targeted Deep Rescrape
  const handleRescrapeLead = async (lead: Lead) => {
    setRescrapingId(lead.id);
    onLog(`[Targeted Pass 2 Deep Rescrape] Re-crawling domain "${lead.website_link}" for "${lead.business_name}"...`, 'info');

    try {
      const response = await fetch('/api/scraper/deep-rescrape-single', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          business_name: lead.business_name,
          website_link: lead.website_link,
          target_area: lead.target_area,
          country: lead.country
        })
      });

      const data = await response.json();
      if (data.success && data.lead) {
        const updated = {
          ...data.lead,
          id: lead.id, // preserve ID
          current_phase: lead.current_phase, // preserve current phase
          status: lead.status
        };
        onUpdateLead(updated);
        if (activeModalLead && activeModalLead.id === lead.id) {
          setActiveModalLead(updated);
        }
        onLog(`Pass 2 Deep Rescrape successful for "${lead.business_name}"! Refreshed 25+ business_data_schema fields.`, 'success');
      }
    } catch (err) {
      onLog(`Failed deep rescraping for ${lead.business_name}: ${err}`, 'error');
    } finally {
      setRescrapingId(null);
    }
  };

  const [presetFilter, setPresetFilter] = useState<'All' | 'HighScore' | 'Proposals' | 'Germany' | 'DNC'>('All');

  // Filtered Leads with multi-field partial search and preset filters
  const filteredLeads = leads.filter((lead) => {
    const s = searchTerm.toLowerCase().trim();
    const matchesSearch = !s ||
      (lead.business_name || '').toLowerCase().includes(s) ||
      (lead.business_industry || '').toLowerCase().includes(s) ||
      (lead.contact?.email || '').toLowerCase().includes(s) ||
      (lead.contact?.contact_number || '').includes(s) ||
      (lead.contact?.physical_address || '').toLowerCase().includes(s) ||
      (lead.website_link || '').toLowerCase().includes(s) ||
      (lead.target_area || '').toLowerCase().includes(s) ||
      (lead.country || '').toLowerCase().includes(s) ||
      (lead.personnel?.responsible_person || '').toLowerCase().includes(s) ||
      (lead.personnel?.owner_details || '').toLowerCase().includes(s) ||
      (lead.status || '').toLowerCase().includes(s);

    const matchesCountry = countryFilter === 'All' || lead.country === countryFilter;
    const matchesPhase = phaseFilter === 'All' || lead.current_phase.toString() === phaseFilter;

    let matchesPreset = true;
    if (presetFilter === 'HighScore') matchesPreset = (lead.score || 0) >= 70;
    else if (presetFilter === 'Proposals') matchesPreset = lead.current_phase >= 5;
    else if (presetFilter === 'Germany') matchesPreset = lead.country === 'Germany';
    else if (presetFilter === 'DNC') matchesPreset = lead.status === 'Opted Out' || lead.status === 'Do Not Contact';

    return matchesSearch && matchesCountry && matchesPhase && matchesPreset;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredLeads.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedLeads = filteredLeads.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Select all handler for current page
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedLeadIds(paginatedLeads.map((l) => l.id));
    } else {
      setSelectedLeadIds([]);
    }
  };

  const toggleSelect = (id: string) => {
    if (selectedLeadIds.includes(id)) {
      setSelectedLeadIds(selectedLeadIds.filter((i) => i !== id));
    } else {
      setSelectedLeadIds([...selectedLeadIds, id]);
    }
  };

  // Export to Excel / CSV
  const handleExportCSV = () => {
    const leadsToExport = selectedLeadIds.length > 0
      ? leads.filter((l) => selectedLeadIds.includes(l.id))
      : filteredLeads;

    if (leadsToExport.length === 0) {
      onLog('No leads available to export.', 'warn');
      return;
    }

    const headers = [
      'ID', 'Business Name', 'Website', 'Industry', 'Target Area', 'Country',
      'Email', 'Phone', 'Address', 'VAT Number', 'Owner', 'Manager', 'Decision Maker',
      'Revenue', 'Scale', 'System Rating', 'System Remark', 'Current Phase', 'Status', 'Score', 'Regional Source'
    ];

    const rows = leadsToExport.map((l) => [
      l.id,
      `"${l.business_name}"`,
      l.website_link,
      `"${l.business_industry}"`,
      `"${l.target_area}"`,
      l.country,
      l.contact.email,
      `"${l.contact.contact_number}"`,
      `"${l.contact.physical_address}"`,
      l.contact.vat_number,
      `"${l.personnel.owner_details}"`,
      `"${l.personnel.manager_details}"`,
      `"${l.personnel.responsible_person}"`,
      `"${l.intelligence.annual_revenue}"`,
      l.intelligence.business_scale,
      `"${l.metrics.business_system_rating}"`,
      `"${l.metrics.system_remark}"`,
      l.current_phase,
      `"${l.status}"`,
      l.score,
      `"${l.regional_data_source}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `WorkNet_Devs_Leads_Master_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    onLog(`Exported ${leadsToExport.length} leads to CSV Excel file successfully.`, 'success');
  };

  const countries = Array.from(new Set(leads.map((l) => l.country)));

  return (
    <div className="space-y-6 pb-12">
      {/* Header Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-1">
            <Layers className="w-4 h-4" />
            <span>Phase 1 Scraped Data & CRM Engine</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Leads Master CRM Database</h1>
          <p className="text-slate-500 text-xs mt-0.5">
            Full 25+ schema European business leads with automated pipeline phase tracking, contact intelligence & leakage remarks.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {selectedLeadIds.length > 0 && (
            <>
              <button
                id="btn-advance-selected"
                onClick={() => onBatchAdvance(selectedLeadIds)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs px-3.5 py-2 rounded-lg flex items-center gap-1.5 shadow-sm shadow-indigo-200 transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Advance Phase ({selectedLeadIds.length})</span>
              </button>
              <button
                id="btn-delete-selected"
                onClick={() => {
                  onDeleteLeads(selectedLeadIds);
                  setSelectedLeadIds([]);
                }}
                className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-medium text-xs px-3.5 py-2 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete ({selectedLeadIds.length})</span>
              </button>
            </>
          )}

          <button
            id="btn-export-csv"
            onClick={handleExportCSV}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs px-3.5 py-2 rounded-lg flex items-center gap-1.5 shadow-sm shadow-emerald-200 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Excel / CSV</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3 text-xs shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {/* Search */}
          <div className="md:col-span-2 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search business name, email, phone, city, owner, status..."
              className="w-full bg-white border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm placeholder-slate-400"
            />
          </div>

          {/* Country Filter */}
          <div>
            <select
              value={countryFilter}
              onChange={(e) => setCountryFilter(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
            >
              <option value="All">All Countries ({leads.length})</option>
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Phase Filter */}
          <div>
            <select
              value={phaseFilter}
              onChange={(e) => setPhaseFilter(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
            >
              <option value="All">All Phases (1 - 10)</option>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((p) => (
                <option key={p} value={p}>
                  Phase {p}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Preset Quick Filters */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100 text-[11px] font-medium text-slate-600">
          <span className="text-slate-400 font-bold uppercase text-[10px] mr-1">Filter Presets:</span>
          
          <button
            onClick={() => setPresetFilter('All')}
            className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
              presetFilter === 'All' ? 'bg-slate-900 text-white font-bold' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            All ({leads.length})
          </button>

          <button
            onClick={() => setPresetFilter('HighScore')}
            className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
              presetFilter === 'HighScore' ? 'bg-amber-600 text-white font-bold' : 'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100'
            }`}
          >
            High Quality Score (70+)
          </button>

          <button
            onClick={() => setPresetFilter('Proposals')}
            className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
              presetFilter === 'Proposals' ? 'bg-indigo-600 text-white font-bold' : 'bg-indigo-50 text-indigo-800 border border-indigo-200 hover:bg-indigo-100'
            }`}
          >
            Proposals & Demos (Phase 5+)
          </button>

          <button
            onClick={() => setPresetFilter('Germany')}
            className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
              presetFilter === 'Germany' ? 'bg-blue-600 text-white font-bold' : 'bg-blue-50 text-blue-800 border border-blue-200 hover:bg-blue-100'
            }`}
          >
            Germany Region
          </button>

          <button
            onClick={() => setPresetFilter('DNC')}
            className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
              presetFilter === 'DNC' ? 'bg-rose-600 text-white font-bold' : 'bg-rose-50 text-rose-800 border border-rose-200 hover:bg-rose-100'
            }`}
          >
            Do Not Contact / Opt Out
          </button>
        </div>
      </div>

      {/* Main Data Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-500 font-mono text-[10px] font-bold uppercase border-b border-slate-200">
              <tr>
                <th className="py-3 px-3 w-8">
                  <input
                    type="checkbox"
                    checked={selectedLeadIds.length === paginatedLeads.length && paginatedLeads.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />
                </th>
                <th className="py-3 px-3">Business Identity</th>
                <th className="py-3 px-3">Contact & Email</th>
                <th className="py-3 px-3">Decision Maker</th>
                <th className="py-3 px-3">Revenue & Scale</th>
                <th className="py-3 px-3">System Rating & Remark</th>
                <th className="py-3 px-3">Current Phase</th>
                <th className="py-3 px-3">Score</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedLeads.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-400 font-mono">
                    No leads found matching current filter criteria.
                  </td>
                </tr>
              ) : (
                paginatedLeads.map((lead) => {
                  const isSelected = selectedLeadIds.includes(lead.id);
                  return (
                    <tr
                      key={lead.id}
                      className={`hover:bg-slate-50/80 transition-colors ${
                        isSelected ? 'bg-indigo-50/60' : ''
                      }`}
                    >
                      <td className="py-3 px-3">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelect(lead.id)}
                          className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                        />
                      </td>

                      {/* Business Identity */}
                      <td className="py-3 px-3">
                        <div className="font-bold text-slate-900 flex items-center gap-1.5">
                          <span>{lead.business_name}</span>
                          <a
                            href={lead.website_link}
                            target="_blank"
                            rel="noreferrer"
                            className="text-slate-400 hover:text-indigo-600"
                          >
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                        <div className="text-[11px] text-slate-500">{lead.business_industry}</div>
                        <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                          {lead.target_area} ({lead.regional_data_source})
                        </div>
                      </td>

                      {/* Contact & Email */}
                      <td className="py-3 px-3 font-mono">
                        <div className="text-indigo-700 font-semibold">{lead.contact.email}</div>
                        <div className="text-[11px] text-slate-600">{lead.contact.contact_number}</div>
                        <div className="text-[10px] text-slate-400">VAT: {lead.contact.vat_number}</div>
                      </td>

                      {/* Decision Maker */}
                      <td className="py-3 px-3">
                        <div className="text-slate-900 font-medium">{lead.personnel.responsible_person}</div>
                        <div className="text-[11px] text-slate-500">{lead.personnel.owner_details}</div>
                      </td>

                      {/* Revenue & Scale */}
                      <td className="py-3 px-3">
                        <span className="bg-slate-100 text-slate-800 font-mono text-[11px] px-2 py-0.5 rounded border border-slate-200">
                          {lead.intelligence.annual_revenue}
                        </span>
                        <div className="text-[10px] text-slate-500 mt-1 font-mono">
                          Scale: {lead.intelligence.business_scale} | Est: {lead.intelligence.establishment_year}
                        </div>
                      </td>

                      {/* System Rating */}
                      <td className="py-3 px-3 max-w-[200px]">
                        <div className="text-amber-700 font-mono font-bold text-[11px]">
                          {lead.metrics.business_system_rating}
                        </div>
                        <div className="text-[10px] text-slate-500 line-clamp-2 mt-0.5">
                          {lead.metrics.system_remark}
                        </div>
                      </td>

                      {/* Phase */}
                      <td className="py-3 px-3">
                        <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 font-mono text-[10px] px-2 py-1 rounded-md font-bold inline-block">
                          Phase {lead.current_phase}
                        </span>
                        <div className="text-[10px] text-slate-500 mt-1 truncate max-w-[120px]">
                          {lead.status}
                        </div>
                      </td>

                      {/* Score */}
                      <td className="py-3 px-3 font-mono font-bold text-emerald-600">
                        {lead.score}/100
                      </td>

                      {/* Action */}
                      <td className="py-3 px-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => exportLeadGDPRData(lead)}
                            className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 p-1.5 rounded-lg transition-colors border border-emerald-200 cursor-pointer"
                            title="Export Lead Data for GDPR Portability (JSON)"
                          >
                            <ShieldCheck className="w-4 h-4 text-emerald-600" />
                          </button>
                          <button
                            onClick={() => {
                              const newStatus = lead.status === 'Do Not Contact' ? 'Discovered' : 'Do Not Contact';
                              onUpdateLead({ ...lead, status: newStatus });
                              onLog(`Updated "${lead.business_name}" status to "${newStatus}"`, 'warn');
                            }}
                            className={`p-1.5 rounded-lg transition-colors border cursor-pointer ${
                              lead.status === 'Do Not Contact' || lead.status === 'Opted Out'
                                ? 'bg-rose-600 text-white border-rose-700'
                                : 'bg-rose-50 hover:bg-rose-100 text-rose-700 border-rose-200'
                            }`}
                            title={lead.status === 'Do Not Contact' ? 'Re-activate Lead' : 'Flag as Do Not Contact / Opt Out'}
                          >
                            <Ban className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleRescrapeLead(lead)}
                            disabled={rescrapingId === lead.id}
                            className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 p-1.5 rounded-lg transition-colors border border-indigo-200 cursor-pointer disabled:opacity-50"
                            title="Run Targeted Pass 2 Deep Rescrape"
                          >
                            <Sparkles className={`w-4 h-4 ${rescrapingId === lead.id ? 'animate-spin' : ''}`} />
                          </button>
                          <button
                            onClick={() => setActiveModalLead(lead)}
                            className="bg-slate-100 hover:bg-slate-200 text-slate-700 p-1.5 rounded-lg transition-colors border border-slate-200 cursor-pointer"
                            title="View Full 25+ Fields Lead Drawer"
                          >
                            <Eye className="w-4 h-4 text-indigo-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer Controls (Max 20 per page) */}
        <div className="bg-slate-50 border-t border-slate-200 px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
          <div className="text-slate-500">
            Showing <span className="font-bold text-slate-800">{filteredLeads.length === 0 ? 0 : startIndex + 1}</span> to{' '}
            <span className="font-bold text-slate-800">{Math.min(startIndex + ITEMS_PER_PAGE, filteredLeads.length)}</span> of{' '}
            <span className="font-bold text-slate-800">{filteredLeads.length}</span> leads (20 max per page)
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

      {/* Full 25+ Fields Lead Detail Drawer / Modal */}
      {activeModalLead && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 text-slate-800 space-y-6">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-indigo-600 text-white font-mono text-xs px-2 py-0.5 rounded font-bold">
                    Phase {activeModalLead.current_phase}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">
                    Data Source: {activeModalLead.regional_data_source}
                  </span>
                  <button
                    onClick={() => setShowJsonSchema(!showJsonSchema)}
                    className="text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-mono font-semibold border border-slate-200 cursor-pointer"
                  >
                    {showJsonSchema ? 'Show Structured UI' : 'View business_data_schema JSON'}
                  </button>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mt-1">{activeModalLead.business_name}</h2>
                <a
                  href={activeModalLead.website_link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-indigo-600 hover:underline flex items-center gap-1 mt-0.5 font-medium"
                >
                  <span>{activeModalLead.website_link}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleRescrapeLead(activeModalLead)}
                  disabled={rescrapingId === activeModalLead.id}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm shadow-indigo-200 cursor-pointer disabled:opacity-50"
                  title="Run Targeted Pass 2 Deep Crawl"
                >
                  <Sparkles className={`w-3.5 h-3.5 ${rescrapingId === activeModalLead.id ? 'animate-spin' : ''}`} />
                  <span>{rescrapingId === activeModalLead.id ? 'Crawling Domain...' : 'Pass 2 Deep Rescrape'}</span>
                </button>
                <button
                  onClick={() => setActiveModalLead(null)}
                  className="text-slate-400 hover:text-slate-700 p-2 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {showJsonSchema ? (
              <div className="bg-slate-950 rounded-xl p-4 text-xs font-mono text-emerald-400 overflow-x-auto space-y-2 border border-slate-800 shadow-inner">
                <div className="text-slate-400 text-[10px] uppercase font-bold border-b border-slate-800 pb-2 flex items-center justify-between">
                  <span>business_data_schema Representation</span>
                  <span className="text-indigo-400">25+ Attributes</span>
                </div>
                <pre className="text-[11px] leading-relaxed">
                  {JSON.stringify({
                    business_name: activeModalLead.business_name,
                    website_link: activeModalLead.website_link,
                    business_industry: activeModalLead.business_industry,
                    facebook: activeModalLead.presence.facebook,
                    linkedin: activeModalLead.presence.linkedin,
                    instagram: activeModalLead.presence.instagram,
                    yelp: activeModalLead.presence.yelp,
                    google_business: activeModalLead.presence.google_business,
                    trustpilot: activeModalLead.presence.trustpilot,
                    physical_address: activeModalLead.contact.physical_address,
                    contact_number: activeModalLead.contact.contact_number,
                    email: activeModalLead.contact.email,
                    vat_number: activeModalLead.contact.vat_number,
                    owner_details: activeModalLead.personnel.owner_details,
                    manager_details: activeModalLead.personnel.manager_details,
                    responsible_person: activeModalLead.personnel.responsible_person,
                    key_context: activeModalLead.intelligence.key_context,
                    key_strategy: activeModalLead.intelligence.key_strategy,
                    annual_revenue: activeModalLead.intelligence.annual_revenue,
                    business_scale: activeModalLead.intelligence.business_scale,
                    establishment_year: activeModalLead.intelligence.establishment_year,
                    major_revision_year: activeModalLead.intelligence.major_revision_year,
                    vision_mission: activeModalLead.intelligence.vision_mission,
                    customer_reviews: activeModalLead.metrics.customer_reviews,
                    business_system_rating: activeModalLead.metrics.business_system_rating,
                    system_remark: activeModalLead.metrics.system_remark
                  }, null, 2)}
                </pre>
              </div>
            ) : (
              /* Modal Grid of 25+ Schema Fields */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              {/* Category 1: Contact Information */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                <h3 className="font-bold text-indigo-700 border-b border-slate-200 pb-2 flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4" />
                  <span>Contact & Location Schema</span>
                </h3>
                <div className="space-y-1.5">
                  <div>
                    <span className="text-slate-500">Email:</span>{' '}
                    <strong className="text-indigo-700 font-mono">{activeModalLead.contact.email}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500">Phone:</span>{' '}
                    <strong className="text-slate-800 font-mono">{activeModalLead.contact.contact_number}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500">Address:</span>{' '}
                    <span className="text-slate-700">{activeModalLead.contact.physical_address}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">VAT / Tax ID:</span>{' '}
                    <strong className="text-slate-800 font-mono">{activeModalLead.contact.vat_number}</strong>
                  </div>
                </div>
              </div>

              {/* Category 2: Key Personnel */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                <h3 className="font-bold text-indigo-700 border-b border-slate-200 pb-2 flex items-center gap-2 text-sm">
                  <UserCheck className="w-4 h-4" />
                  <span>Key Personnel & Decision Makers</span>
                </h3>
                <div className="space-y-1.5">
                  <div>
                    <span className="text-slate-500">Decision Maker:</span>{' '}
                    <strong className="text-slate-900">{activeModalLead.personnel.responsible_person}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500">Owner Details:</span>{' '}
                    <span className="text-slate-700">{activeModalLead.personnel.owner_details}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Manager Details:</span>{' '}
                    <span className="text-slate-700">{activeModalLead.personnel.manager_details}</span>
                  </div>
                </div>
              </div>

              {/* Category 3: Online Presence (Boolean Flags) */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                <h3 className="font-bold text-indigo-700 border-b border-slate-200 pb-2 flex items-center gap-2 text-sm">
                  <Globe className="w-4 h-4" />
                  <span>Online Presence Verification</span>
                </h3>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  {Object.entries(activeModalLead.presence).map(([key, item]) => {
                    const presenceItem = item as { exists: boolean; url: string };
                    return (
                      <div key={key} className="flex items-center gap-1.5 bg-white p-2 rounded border border-slate-200 shadow-2xs">
                        {presenceItem.exists ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        )}
                        <span className="capitalize font-mono text-slate-700">{key}:</span>
                        {presenceItem.exists ? (
                          <a href={presenceItem.url} target="_blank" rel="noreferrer" className="text-indigo-600 truncate hover:underline font-medium">
                            Link
                          </a>
                        ) : (
                          <span className="text-slate-400">None</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Category 4: Business Intelligence */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                <h3 className="font-bold text-indigo-700 border-b border-slate-200 pb-2 flex items-center gap-2 text-sm">
                  <DollarSign className="w-4 h-4" />
                  <span>Business Intelligence & Financials</span>
                </h3>
                <div className="space-y-1.5 font-mono">
                  <div>
                    <span className="text-slate-500">Annual Revenue:</span>{' '}
                    <strong className="text-emerald-700">{activeModalLead.intelligence.annual_revenue}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500">Business Scale:</span>{' '}
                    <span className="text-slate-800">{activeModalLead.intelligence.business_scale}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Founded Year:</span>{' '}
                    <span className="text-slate-700">{activeModalLead.intelligence.establishment_year}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Major Revision:</span>{' '}
                    <span className="text-slate-700">{activeModalLead.intelligence.major_revision_year}</span>
                  </div>
                </div>
              </div>

              {/* Category 5: System Rating & Leakages */}
              <div className="md:col-span-2 bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                <h3 className="font-bold text-amber-700 border-b border-slate-200 pb-2 flex items-center gap-2 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>Performance Metrics & Leakage Diagnosis</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-slate-500 font-mono">System Efficiency Rating:</span>
                    <div className="text-amber-700 font-bold font-mono text-sm mt-0.5">
                      {activeModalLead.metrics.business_system_rating}
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-500 font-mono">Reviews Score:</span>
                    <div className="text-emerald-700 font-bold font-mono text-sm mt-0.5">
                      {activeModalLead.metrics.customer_reviews}
                    </div>
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-200">
                  <span className="text-slate-600 font-medium">System Remark / Growth Leakage:</span>
                  <p className="text-slate-800 mt-1 bg-white p-3 rounded border border-slate-200 text-xs shadow-2xs">
                    {activeModalLead.metrics.system_remark}
                  </p>
                </div>
              </div>
            </div>
            )}

            <div className="flex justify-end pt-2 border-t border-slate-200">
              <button
                onClick={() => setActiveModalLead(null)}
                className="bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs px-5 py-2.5 rounded-lg cursor-pointer"
              >
                Close Drawer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
