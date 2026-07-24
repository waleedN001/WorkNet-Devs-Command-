import React, { useState } from 'react';
import { Globe, Plus, Trash2, Edit3, Check, Settings, Layers, ShieldCheck, Tag, Sliders } from 'lucide-react';
import { RegionSetting, StatusSetting } from '../types';

interface DynamicSettingsSectionProps {
  regions: RegionSetting[];
  onAddRegion: (region: RegionSetting) => void;
  onUpdateRegion: (region: RegionSetting) => void;
  onDeleteRegion: (id: string) => void;
  statuses: StatusSetting[];
  onAddStatus: (status: StatusSetting) => void;
  onDeleteStatus: (id: string) => void;
}

export const DynamicSettingsSection: React.FC<DynamicSettingsSectionProps> = ({
  regions,
  onAddRegion,
  onUpdateRegion,
  onDeleteRegion,
  statuses,
  onAddStatus,
  onDeleteStatus
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'regions' | 'statuses' | 'automations'>('regions');

  // Region Form State
  const [showRegionModal, setShowRegionModal] = useState(false);
  const [newRegName, setNewRegName] = useState('');
  const [newRegCountry, setNewRegCountry] = useState('Germany');
  const [newRegCity, setNewRegCity] = useState('');
  const [newRegTimezone, setNewRegTimezone] = useState('Europe/Berlin (CET)');
  const [newRegCurrency, setNewRegCurrency] = useState('EUR (€)');

  // Status Form State
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [newStatCategory, setNewStatCategory] = useState<'Lead' | 'Project' | 'Task'>('Lead');
  const [newStatName, setNewStatName] = useState('');
  const [newStatColor, setNewStatColor] = useState('bg-indigo-500');
  const [newStatWip, setNewStatWip] = useState(5);
  const [newStatAuto, setNewStatAuto] = useState('');

  const handleCreateRegion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRegName || !newRegCity) return;

    const newReg: RegionSetting = {
      id: `REG-${Date.now()}`,
      name: newRegName,
      country: newRegCountry,
      city: newRegCity,
      timezone: newRegTimezone,
      currency: newRegCurrency,
      status: 'Active',
      created_at: new Date().toISOString().split('T')[0]
    };

    onAddRegion(newReg);
    setNewRegName('');
    setNewRegCity('');
    setShowRegionModal(false);
  };

  const handleCreateStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStatName) return;

    const newStat: StatusSetting = {
      id: `ST-${Date.now()}`,
      category: newStatCategory,
      name: newStatName,
      color: newStatColor,
      order: statuses.filter((s) => s.category === newStatCategory).length + 1,
      isDefault: false,
      wipLimit: newStatWip,
      autoActions: newStatAuto
    };

    onAddStatus(newStat);
    setNewStatName('');
    setNewStatAuto('');
    setShowStatusModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Settings Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveSubTab('regions')}
          className={`px-3.5 py-2 rounded-lg font-medium text-xs flex items-center gap-2 transition-all cursor-pointer ${
            activeSubTab === 'regions'
              ? 'bg-indigo-600 text-white font-semibold shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Globe className="w-4 h-4" />
          <span>Region Management</span>
        </button>

        <button
          onClick={() => setActiveSubTab('statuses')}
          className={`px-3.5 py-2 rounded-lg font-medium text-xs flex items-center gap-2 transition-all cursor-pointer ${
            activeSubTab === 'statuses'
              ? 'bg-indigo-600 text-white font-semibold shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Tag className="w-4 h-4" />
          <span>Lead, Project & Task Statuses</span>
        </button>

        <button
          onClick={() => setActiveSubTab('automations')}
          className={`px-3.5 py-2 rounded-lg font-medium text-xs flex items-center gap-2 transition-all cursor-pointer ${
            activeSubTab === 'automations'
              ? 'bg-indigo-600 text-white font-semibold shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>Automation Rules</span>
        </button>
      </div>

      {/* SUB-TAB 1: REGION MANAGEMENT */}
      {activeSubTab === 'regions' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm text-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-3">
            <div>
              <h2 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <Globe className="w-5 h-5 text-indigo-600" />
                <span>Regional Target Markets & Settings</span>
              </h2>
              <p className="text-xs text-slate-500">
                Configure countries, cities, local timezones, and currencies for regional lead discovery and outreach
              </p>
            </div>

            <button
              onClick={() => setShowRegionModal(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs px-3.5 py-2 rounded-xl flex items-center gap-2 transition-all shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Region</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {regions.map((reg) => (
              <div key={reg.id} className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2 relative group hover:border-indigo-300 transition-all">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">{reg.name}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                    reg.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {reg.status}
                  </span>
                </div>

                <div className="text-xs font-mono text-slate-600 space-y-1">
                  <div><strong>Country:</strong> {reg.country}</div>
                  <div><strong>City:</strong> {reg.city}</div>
                  <div><strong>Timezone:</strong> {reg.timezone}</div>
                  <div><strong>Currency:</strong> {reg.currency}</div>
                </div>

                <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                  <button
                    onClick={() => onUpdateRegion({ ...reg, status: reg.status === 'Active' ? 'Inactive' : 'Active' })}
                    className="text-[11px] font-semibold text-indigo-600 hover:underline cursor-pointer"
                  >
                    Toggle Status
                  </button>
                  <button
                    onClick={() => onDeleteRegion(reg.id)}
                    className="text-slate-400 hover:text-red-600 p-1 transition-colors cursor-pointer"
                    title="Delete Region"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 2: STATUS & STAGE MANAGEMENT */}
      {activeSubTab === 'statuses' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm text-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-3">
            <div>
              <h2 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <Tag className="w-5 h-5 text-indigo-600" />
                <span>Custom Statuses & Stage Pipelines</span>
              </h2>
              <p className="text-xs text-slate-500">
                Define status stages, colors, WIP limits, and automated actions for Leads, Projects, and Tasks
              </p>
            </div>

            <button
              onClick={() => setShowStatusModal(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs px-3.5 py-2 rounded-xl flex items-center gap-2 transition-all shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Custom Status</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(['Lead', 'Project', 'Task'] as const).map((category) => (
              <div key={category} className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                <div className="font-bold text-slate-900 text-sm border-b border-slate-200 pb-2 flex items-center justify-between">
                  <span>{category} Pipeline Statuses</span>
                  <span className="text-xs font-mono text-slate-500">
                    {statuses.filter((s) => s.category === category).length} items
                  </span>
                </div>

                <div className="space-y-2">
                  {statuses
                    .filter((s) => s.category === category)
                    .map((stat) => (
                      <div key={stat.id} className="bg-white border border-slate-200 rounded-lg p-2.5 flex items-center justify-between text-xs font-mono shadow-xs">
                        <div className="flex items-center gap-2">
                          <span className={`w-2.5 h-2.5 rounded-full ${stat.color}`} />
                          <span className="font-semibold text-slate-900">{stat.name}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-500 text-[10px]">
                          {stat.wipLimit && <span className="bg-slate-100 px-1.5 py-0.5 rounded">WIP: {stat.wipLimit}</span>}
                          <button
                            onClick={() => onDeleteStatus(stat.id)}
                            className="text-slate-400 hover:text-red-600 cursor-pointer"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: AUTOMATION RULES */}
      {activeSubTab === 'automations' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm text-slate-800">
          <h2 className="font-bold text-slate-900 text-base flex items-center gap-2 border-b border-slate-100 pb-3">
            <Sliders className="w-5 h-5 text-indigo-600" />
            <span>Workflow Automation Rules Engine</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2">
              <div className="font-bold text-indigo-700">1. Lead Discovery Automation</div>
              <div className="text-slate-600">When new lead scraped → Auto-assign score and schedule Phase 2 initial email assessment.</div>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2">
              <div className="font-bold text-emerald-700">2. Kanban Board WIP Alerting</div>
              <div className="text-slate-600">When 'Development' column exceeds 5 cards → Dispatch Slack / Email warning to Sarah Chen.</div>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2">
              <div className="font-bold text-purple-700">3. Invoice Overdue Escrow</div>
              <div className="text-slate-600">When invoice past 14 days due date → Trigger auto-reminder and notify Managing Director.</div>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2">
              <div className="font-bold text-amber-700">4. Meeting Minutes Generation</div>
              <div className="text-slate-600">When Google Meet finishes → Auto-create minutes doc template in Google Drive and email attendees.</div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: CREATE REGION */}
      {showRegionModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900">Add New Regional Market</h3>
            <form onSubmit={handleCreateRegion} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Region Name</label>
                <input
                  type="text"
                  placeholder="e.g. Nordics Tech Corridor"
                  value={newRegName}
                  onChange={(e) => setNewRegName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Country</label>
                <input
                  type="text"
                  value={newRegCountry}
                  onChange={(e) => setNewRegCountry(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">City</label>
                <input
                  type="text"
                  placeholder="e.g. Stockholm"
                  value={newRegCity}
                  onChange={(e) => setNewRegCity(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Timezone</label>
                  <input
                    type="text"
                    value={newRegTimezone}
                    onChange={(e) => setNewRegTimezone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Currency</label>
                  <input
                    type="text"
                    value={newRegCurrency}
                    onChange={(e) => setNewRegCurrency(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowRegionModal(false)}
                  className="px-3.5 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold cursor-pointer"
                >
                  Save Region
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: CREATE STATUS */}
      {showStatusModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900">Add Custom Status</h3>
            <form onSubmit={handleCreateStatus} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Pipeline Category</label>
                <select
                  value={newStatCategory}
                  onChange={(e) => setNewStatCategory(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800"
                >
                  <option value="Lead">Lead Pipeline</option>
                  <option value="Project">Project Dev</option>
                  <option value="Task">Task Board</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Status Name</label>
                <input
                  type="text"
                  placeholder="e.g. Audit Complete"
                  value={newStatName}
                  onChange={(e) => setNewStatName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Color Tag</label>
                  <select
                    value={newStatColor}
                    onChange={(e) => setNewStatColor(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800"
                  >
                    <option value="bg-indigo-500">Indigo</option>
                    <option value="bg-blue-500">Blue</option>
                    <option value="bg-emerald-500">Emerald</option>
                    <option value="bg-amber-500">Amber</option>
                    <option value="bg-purple-500">Purple</option>
                    <option value="bg-rose-500">Rose</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">WIP Limit</label>
                  <input
                    type="number"
                    value={newStatWip}
                    onChange={(e) => setNewStatWip(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Automated Action (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Send auto-email alert"
                  value={newStatAuto}
                  onChange={(e) => setNewStatAuto(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowStatusModal(false)}
                  className="px-3.5 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold cursor-pointer"
                >
                  Save Status
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
