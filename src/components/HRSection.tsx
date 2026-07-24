import React, { useState } from 'react';
import { 
  UserCheck, 
  Users, 
  FileText, 
  Award, 
  BarChart3, 
  Plus, 
  BookOpen, 
  CheckCircle2, 
  GitBranch, 
  ExternalLink,
  Building2,
  Trash2,
  Star
} from 'lucide-react';
import { EmployeeProfile, EmployeeKPI, PerformanceReview, SOPDoc } from '../types';

interface HRSectionProps {
  employees: EmployeeProfile[];
  onAddEmployee: (emp: EmployeeProfile) => void;
  sops: SOPDoc[];
}

export const HRSection: React.FC<HRSectionProps> = ({
  employees,
  onAddEmployee,
  sops
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'directory' | 'hierarchy' | 'contracts' | 'sops' | 'evaluations'>('directory');

  // New Employee Modal State
  const [showAddEmpModal, setShowAddEmpModal] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [designation, setDesignation] = useState('');
  const [department, setDepartment] = useState<'Engineering' | 'Sales & Growth' | 'Operations' | 'Finance' | 'HR & Admin'>('Engineering');
  const [baseSalary, setBaseSalary] = useState(5000);

  // Contract Preview Modal State
  const [contractPreviewDoc, setContractPreviewDoc] = useState<{ title: string; content: string } | null>(null);

  const handleCreateEmployeeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !email) return;

    const newEmp: EmployeeProfile = {
      id: `EMP-${(employees.length + 101).toString().padStart(3, '0')}`,
      firstName,
      lastName,
      email,
      phone: phone || '+49 170 1234567',
      designation: designation || 'Operations Specialist',
      department,
      reportingManager: 'Alex Rivera',
      joiningDate: new Date().toISOString().split('T')[0],
      status: 'Active',
      baseSalary,
      kpis: [
        { id: 'kpi-1', category: 'Productivity', name: 'Task Completion Rate', target: 95, actual: 92, unit: '%', achieved: true }
      ]
    };

    onAddEmployee(newEmp);
    setFirstName('');
    setLastName('');
    setEmail('');
    setShowAddEmpModal(false);
  };

  const handleGenerateContract = (emp: EmployeeProfile, type: 'Employment' | 'NDA' | 'NonCompete') => {
    const docContent = `
OFFICIAL LEGAL DOCUMENT: ${type.toUpperCase()} AGREEMENT
---------------------------------------------------------
Date: ${new Date().toLocaleDateString()}
Employee: ${emp.firstName} ${emp.lastName}
Position: ${emp.designation}
Department: ${emp.department}
Base Monthly Salary: €${emp.baseSalary.toLocaleString()}

1. TERMS & CONDITIONS:
   This document establishes the binding ${type} agreement between Work.net Devs and ${emp.firstName} ${emp.lastName}.
   
2. OBLIGATIONS & CONFIDENTIALITY:
   All proprietary scraping protocols, client database pipelines, and source code are strict trade secrets.
    `;

    setContractPreviewDoc({
      title: `${emp.firstName} ${emp.lastName} - ${type} Contract.docx`,
      content: docContent
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 text-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-100 pb-4 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-indigo-600" />
              <h2 className="font-bold text-slate-900 text-base">HR Operations, Staff Directory & Org Hierarchy</h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Staff contracts generator, organization reporting tree, SOP process library, and KPI performance scorecards
            </p>
          </div>

          <button
            onClick={() => setShowAddEmpModal(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs px-3.5 py-2 rounded-xl flex items-center gap-2 transition-all shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Staff Member</span>
          </button>
        </div>

        {/* HR Sub-navigation */}
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2 text-xs font-mono">
          <button
            onClick={() => setActiveSubTab('directory')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              activeSubTab === 'directory' ? 'bg-indigo-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Staff Directory ({employees.length})
          </button>

          <button
            onClick={() => setActiveSubTab('hierarchy')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              activeSubTab === 'hierarchy' ? 'bg-indigo-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Org Hierarchy & Chart
          </button>

          <button
            onClick={() => setActiveSubTab('contracts')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              activeSubTab === 'contracts' ? 'bg-indigo-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Staff Contracts Generator
          </button>

          <button
            onClick={() => setActiveSubTab('sops')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              activeSubTab === 'sops' ? 'bg-indigo-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            SOPs & Process Library ({sops.length})
          </button>

          <button
            onClick={() => setActiveSubTab('evaluations')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              activeSubTab === 'evaluations' ? 'bg-indigo-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            KPIs & Evaluations
          </button>
        </div>

        {/* SUB-TAB 1: STAFF DIRECTORY */}
        {activeSubTab === 'directory' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {employees.map((emp) => (
              <div key={emp.id} className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3 relative group hover:border-indigo-300 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-600 font-bold text-white flex items-center justify-center text-sm">
                    {emp.firstName[0]}{emp.lastName[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{emp.firstName} {emp.lastName}</h4>
                    <p className="text-[11px] text-slate-500 font-mono">{emp.designation}</p>
                  </div>
                </div>

                <div className="text-xs font-mono space-y-1 text-slate-600 border-t border-slate-200 pt-2">
                  <div><strong>Department:</strong> {emp.department}</div>
                  <div><strong>Email:</strong> {emp.email}</div>
                  <div><strong>Phone:</strong> {emp.phone}</div>
                  <div><strong>Joined:</strong> {emp.joiningDate}</div>
                  <div><strong>Base Salary:</strong> €{emp.baseSalary.toLocaleString()}/mo</div>
                </div>

                <div className="pt-2 border-t border-slate-200 flex justify-between items-center">
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-mono px-2 py-0.5 rounded font-bold">
                    {emp.status}
                  </span>
                  <button
                    onClick={() => handleGenerateContract(emp, 'Employment')}
                    className="text-[10px] font-mono font-bold text-indigo-600 hover:underline cursor-pointer"
                  >
                    View Contract
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* SUB-TAB 2: ORG HIERARCHY & CHART */}
        {activeSubTab === 'hierarchy' && (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 font-mono text-xs space-y-6">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-indigo-600" />
              <span>Company Organizational Tree & Reporting Hierarchy</span>
            </h3>

            {/* Tree Root */}
            <div className="flex flex-col items-center space-y-4">
              <div className="bg-indigo-900 text-white p-4 rounded-xl shadow-md text-center max-w-xs w-full">
                <div className="font-bold text-sm">Alex Rivera</div>
                <div className="text-[10px] text-indigo-300">Managing Director & BDM</div>
              </div>

              <div className="w-0.5 h-6 bg-slate-300" />

              {/* Department Heads */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
                <div className="bg-white border border-slate-200 p-3 rounded-xl shadow-xs text-center space-y-1">
                  <div className="font-bold text-slate-900">Sarah Chen</div>
                  <div className="text-[10px] text-indigo-600 font-bold">Lead Cloud Architect</div>
                  <div className="text-[10px] text-slate-500 border-t border-slate-100 pt-1 mt-1">
                    Reports: Marcus Vance
                  </div>
                </div>

                <div className="bg-white border border-slate-200 p-3 rounded-xl shadow-xs text-center space-y-1">
                  <div className="font-bold text-slate-900">Elena Rostova</div>
                  <div className="text-[10px] text-indigo-600 font-bold">HR & Quality Operations</div>
                  <div className="text-[10px] text-slate-500 border-t border-slate-100 pt-1 mt-1">
                    Reports: Admin Team
                  </div>
                </div>

                <div className="bg-white border border-slate-200 p-3 rounded-xl shadow-xs text-center space-y-1">
                  <div className="font-bold text-slate-900">Marcus Vance</div>
                  <div className="text-[10px] text-indigo-600 font-bold">Senior Full-Stack Developer</div>
                  <div className="text-[10px] text-slate-500 border-t border-slate-100 pt-1 mt-1">
                    Reports: Sarah Chen
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SUB-TAB 3: STAFF CONTRACTS GENERATOR */}
        {activeSubTab === 'contracts' && (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 font-mono text-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-sm">Automated Legal Document & Contract Generator</h3>

            <div className="overflow-x-auto border border-slate-200 rounded-xl bg-white">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200 text-slate-700">
                    <th className="p-3">Staff Member</th>
                    <th className="p-3">Department</th>
                    <th className="p-3">Generate Employment Contract</th>
                    <th className="p-3">Generate NDA</th>
                    <th className="p-3">Generate Non-Compete</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {employees.map((emp) => (
                    <tr key={emp.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 font-bold text-slate-900">{emp.firstName} {emp.lastName}</td>
                      <td className="p-3 text-slate-600">{emp.department}</td>
                      <td className="p-3">
                        <button
                          onClick={() => handleGenerateContract(emp, 'Employment')}
                          className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold px-2.5 py-1 rounded cursor-pointer"
                        >
                          Generate Contract
                        </button>
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => handleGenerateContract(emp, 'NDA')}
                          className="bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold px-2.5 py-1 rounded cursor-pointer"
                        >
                          Generate NDA
                        </button>
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => handleGenerateContract(emp, 'NonCompete')}
                          className="bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold px-2.5 py-1 rounded cursor-pointer"
                        >
                          Generate Non-Compete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SUB-TAB 4: SOPS & PROCESS LIBRARY */}
        {activeSubTab === 'sops' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {sops.map((sop) => (
                <div key={sop.id} className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2 text-xs font-mono">
                  <div className="font-bold text-indigo-700">{sop.id}: {sop.category}</div>
                  <h4 className="font-bold text-slate-900 text-sm font-sans">{sop.title}</h4>
                  <p className="text-slate-600 leading-relaxed font-sans text-xs">{sop.summary}</p>
                  <div className="pt-2 border-t border-slate-200 text-[10px] text-slate-400">
                    Updated: {sop.lastUpdated} by {sop.author}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SUB-TAB 5: KPIS & EVALUATIONS */}
        {activeSubTab === 'evaluations' && (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-4 font-mono text-xs">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Award className="w-4 h-4 text-indigo-600" />
              <span>Staff KPI Matrix & Performance Evaluation Scorecards</span>
            </h3>

            <div className="space-y-4">
              {employees.map((emp) => (
                <div key={emp.id} className="bg-white border border-slate-200 rounded-xl p-4 space-y-3 shadow-xs">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{emp.firstName} {emp.lastName}</div>
                      <div className="text-[11px] text-slate-500">{emp.designation} ({emp.department})</div>
                    </div>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                      Rating: 9.4 / 10 (Exceeds Expectations)
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="font-bold text-slate-700">KPI Performance Indicators:</div>
                    {emp.kpis.map((kpi) => (
                      <div key={kpi.id} className="flex items-center justify-between bg-slate-50 p-2 rounded-lg text-xs">
                        <span>{kpi.name} ({kpi.category})</span>
                        <span className="font-bold text-emerald-600">
                          Target: {kpi.target}{kpi.unit} | Actual: {kpi.actual}{kpi.unit} (Achieved)
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* MODAL: ADD STAFF */}
      {showAddEmpModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl border border-slate-200 text-slate-800">
            <h3 className="font-bold text-slate-900 text-base">Add Staff Member</h3>
            <form onSubmit={handleCreateEmployeeSubmit} className="space-y-3 text-xs font-sans">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">First Name *</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Last Name *</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Work Email *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 font-mono"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Designation</label>
                <input
                  type="text"
                  placeholder="e.g. Lead Operations Specialist"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Department</label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Sales & Growth">Sales & Growth</option>
                    <option value="Operations">Operations</option>
                    <option value="Finance">Finance</option>
                    <option value="HR & Admin">HR & Admin</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Base Salary (€)</label>
                  <input
                    type="number"
                    value={baseSalary}
                    onChange={(e) => setBaseSalary(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 font-mono"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddEmpModal(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold cursor-pointer"
                >
                  Save Staff Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONTRACT DOCUMENT PREVIEW MODAL */}
      {contractPreviewDoc && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full space-y-4 shadow-2xl border border-slate-200 text-slate-800">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base">{contractPreviewDoc.title}</h3>
              <button onClick={() => setContractPreviewDoc(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                ✕
              </button>
            </div>

            <pre className="bg-slate-900 text-emerald-400 p-4 rounded-xl font-mono text-xs leading-relaxed overflow-x-auto max-h-60 shadow-inner">
              {contractPreviewDoc.content}
            </pre>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setContractPreviewDoc(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl font-semibold text-xs cursor-pointer"
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
