import React, { useState } from 'react';
import { 
  DollarSign, 
  Receipt, 
  TrendingUp, 
  Plus, 
  Calendar, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Building2, 
  UserCheck, 
  ArrowUpRight, 
  ArrowDownRight,
  Download,
  CreditCard
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { ExpenseItem, SalaryItem, InvoiceItem, LeadItem } from '../types';
import { calculateWeightedPipeline, calculateFinancialRatios } from '../utils/businessLogic';

interface FinanceSectionProps {
  expenses: ExpenseItem[];
  onAddExpense: (expense: ExpenseItem) => void;
  salaries: SalaryItem[];
  invoices: InvoiceItem[];
  onAddInvoice: (inv: InvoiceItem) => void;
  leads?: LeadItem[];
}

export const FinanceSection: React.FC<FinanceSectionProps> = ({
  expenses,
  onAddExpense,
  salaries,
  invoices,
  onAddInvoice,
  leads = []
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'daily-expenses' | 'recurring' | 'salaries' | 'invoices'>('overview');

  // New Expense Form State
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [expCategory, setExpCategory] = useState<'Office Supplies' | 'Travel' | 'Meals' | 'Rent' | 'Utilities' | 'Salaries' | 'Software Subscriptions' | 'Marketing' | 'Equipment' | 'Maintenance'>('Travel');
  const [expType, setExpType] = useState<'Daily' | 'Monthly Recurring' | 'One-time' | 'Staff Reimbursement'>('Daily');
  const [expDesc, setExpDesc] = useState('');
  const [expAmount, setExpAmount] = useState(150);

  // New Invoice Form State
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [invClientName, setInvClientName] = useState('');
  const [invProjectName, setInvProjectName] = useState('');
  const [invAmount, setInvAmount] = useState(5000);

  // Invoice Preview Modal State
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceItem | null>(null);

  // Payslip Modal State
  const [selectedPayslip, setSelectedPayslip] = useState<SalaryItem | null>(null);

  // Totals calculations
  const totalRevenue = invoices.reduce((sum, i) => sum + i.total, 0);
  const totalExpensesAmount = expenses.reduce((sum, e) => sum + e.amount, 0);
  const totalPayroll = salaries.reduce((sum, s) => sum + s.netSalary, 0);
  const netProfit = totalRevenue - totalExpensesAmount - totalPayroll;

  // Real Weighted Pipeline & Unit Economics
  const pipelineMetrics = calculateWeightedPipeline(leads);
  const ratios = calculateFinancialRatios(invoices, expenses, leads);

  // Chart Data
  const financialChartData = [
    { month: 'Apr', Revenue: 18000, Expenses: 8200, Profit: 9800 },
    { month: 'May', Revenue: 22500, Expenses: 8900, Profit: 13600 },
    { month: 'Jun', Revenue: 26000, Expenses: 9400, Profit: 16600 },
    { month: 'Jul', Revenue: totalRevenue || 34650, Expenses: totalExpensesAmount + totalPayroll, Profit: netProfit }
  ];

  const handleCreateExpenseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expDesc || expAmount <= 0) return;

    const newExp: ExpenseItem = {
      id: `EXP-${Date.now().toString().slice(-4)}`,
      type: expType,
      category: expCategory,
      description: expDesc,
      amount: expAmount,
      currency: 'EUR (€)',
      date: new Date().toISOString().split('T')[0],
      paymentMethod: 'Corporate Card',
      status: 'Paid',
      approvedBy: 'Alex Rivera'
    };

    onAddExpense(newExp);
    setExpDesc('');
    setShowExpenseModal(false);
  };

  const handleCreateInvoiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!invClientName || !invProjectName) return;

    const tax = invAmount * 0.10;
    const newInv: InvoiceItem = {
      id: `INV-2026-${(invoices.length + 101).toString().padStart(3, '0')}`,
      clientName: invClientName,
      clientEmail: `billing@${invClientName.toLowerCase().replace(/[^a-z]/g, '')}.eu`,
      projectName: invProjectName,
      amount: invAmount,
      tax,
      total: invAmount + tax,
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'Sent'
    };

    onAddInvoice(newInv);
    setInvClientName('');
    setInvProjectName('');
    setShowInvoiceModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Stats */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 text-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-100 pb-4 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Receipt className="w-5 h-5 text-emerald-600" />
              <h2 className="font-bold text-slate-900 text-base">Complete Finance, Accounting & Payroll Engine</h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Daily expenses, monthly recurring bills (rent, utilities, software), employee payroll, and client invoicing
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowExpenseModal(true)}
              className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Log Expense</span>
            </button>

            <button
              onClick={() => setShowInvoiceModal(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create Invoice</span>
            </button>
          </div>
        </div>

        {/* 4 Financial Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-mono text-xs">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-1">
            <div className="text-slate-500 text-[10px] uppercase font-bold flex items-center justify-between">
              <span>Total Revenue (YTD)</span>
              <ArrowUpRight className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-bold text-slate-900">€{totalRevenue.toLocaleString()}</div>
            <div className="text-[10px] text-emerald-600 font-bold">+18.5% growth vs last month</div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-1">
            <div className="text-slate-500 text-[10px] uppercase font-bold flex items-center justify-between">
              <span>Monthly Expenses (Rent/Bills)</span>
              <ArrowDownRight className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-bold text-slate-900">€{totalExpensesAmount.toLocaleString()}</div>
            <div className="text-[10px] text-slate-500">Includes office rent, utilities & software</div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-1">
            <div className="text-slate-500 text-[10px] uppercase font-bold flex items-center justify-between">
              <span>Monthly Staff Payroll</span>
              <UserCheck className="w-4 h-4 text-indigo-500" />
            </div>
            <div className="text-2xl font-bold text-slate-900">€{totalPayroll.toLocaleString()}</div>
            <div className="text-[10px] text-slate-500">4 Active Full-time Employees</div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-1 border-l-4 border-l-emerald-500">
            <div className="text-slate-500 text-[10px] uppercase font-bold flex items-center justify-between">
              <span>Net Operating Profit</span>
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-bold text-emerald-600">€{netProfit.toLocaleString()}</div>
            <div className="text-[10px] text-emerald-700 font-bold">58.2% Profit Margin</div>
          </div>
        </div>

        {/* Finance Sub-tabs */}
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2 text-xs font-mono pt-2">
          <button
            onClick={() => setActiveSubTab('overview')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              activeSubTab === 'overview' ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Cash Flow Chart
          </button>
          <button
            onClick={() => setActiveSubTab('daily-expenses')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              activeSubTab === 'daily-expenses' ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Daily Expenses & Travel ({expenses.filter((e) => e.type === 'Daily').length})
          </button>
          <button
            onClick={() => setActiveSubTab('recurring')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              activeSubTab === 'recurring' ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Monthly Recurring (Rent/Bills)
          </button>
          <button
            onClick={() => setActiveSubTab('salaries')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              activeSubTab === 'salaries' ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Salaries & Payslips ({salaries.length})
          </button>
          <button
            onClick={() => setActiveSubTab('invoices')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              activeSubTab === 'invoices' ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Invoices ({invoices.length})
          </button>
        </div>

        {/* SUB-TAB 1: OVERVIEW CASH FLOW CHART & UNIT ECONOMICS */}
        {activeSubTab === 'overview' && (
          <div className="space-y-4">
            {/* Unit Economics & Stage-Weighted Pipeline Card Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono text-xs">
              <div className="bg-indigo-50/60 border border-indigo-200 rounded-xl p-3.5 space-y-1">
                <div className="text-indigo-600 font-bold text-[10px] uppercase flex justify-between">
                  <span>Stage-Weighted Revenue</span>
                  <span>Probability Match</span>
                </div>
                <div className="text-xl font-bold text-indigo-950">€{pipelineMetrics.weightedValue.toLocaleString()}</div>
                <div className="text-[10px] text-slate-600 font-sans">
                  Raw Total: <span className="font-bold text-slate-800">€{pipelineMetrics.totalRawValue.toLocaleString()}</span> across {pipelineMetrics.activeCount} active leads
                </div>
              </div>

              <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-3.5 space-y-1">
                <div className="text-emerald-700 font-bold text-[10px] uppercase flex justify-between">
                  <span>Predicted MRR</span>
                  <span>Recurring</span>
                </div>
                <div className="text-xl font-bold text-emerald-950">€{ratios.mrr.toLocaleString()} / mo</div>
                <div className="text-[10px] text-slate-600 font-sans">
                  Avg Deal Value: <span className="font-bold text-slate-800">€{pipelineMetrics.avgDealSize.toLocaleString()}</span>
                </div>
              </div>

              <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-3.5 space-y-1">
                <div className="text-amber-700 font-bold text-[10px] uppercase flex justify-between">
                  <span>Customer LTV</span>
                  <span>Lifetime Value</span>
                </div>
                <div className="text-xl font-bold text-amber-950">€{ratios.ltv.toLocaleString()}</div>
                <div className="text-[10px] text-slate-600 font-sans">
                  Estimated 24-month contract lifetime
                </div>
              </div>

              <div className="bg-slate-100 border border-slate-200 rounded-xl p-3.5 space-y-1">
                <div className="text-slate-600 font-bold text-[10px] uppercase flex justify-between">
                  <span>CAC & LTV/CAC Ratio</span>
                  <span className="text-emerald-700 font-bold">{ratios.ltvCacRatio}x Ratio</span>
                </div>
                <div className="text-xl font-bold text-slate-900">€{ratios.cac.toLocaleString()} CAC</div>
                <div className="text-[10px] text-slate-600 font-sans">
                  Acquisition cost per converted client
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
              <h3 className="font-bold text-slate-900 text-xs">4-Month Revenue vs Operating Expense Trend</h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={financialChartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} />
                    <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Revenue" fill="#10b981" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Expenses" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Profit" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* SUB-TAB 2: DAILY EXPENSES */}
        {activeSubTab === 'daily-expenses' && (
          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200 text-slate-700">
                  <th className="p-3">ID</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Description</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Payment Method</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {expenses
                  .filter((e) => e.type === 'Daily' || e.type === 'Staff Reimbursement')
                  .map((exp) => (
                    <tr key={exp.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 font-bold text-indigo-700">{exp.id}</td>
                      <td className="p-3 font-bold text-slate-900">{exp.category}</td>
                      <td className="p-3 text-slate-700 font-sans">{exp.description}</td>
                      <td className="p-3 text-slate-500">{exp.date}</td>
                      <td className="p-3 text-slate-600">{exp.paymentMethod}</td>
                      <td className="p-3 font-bold text-amber-600">€{exp.amount.toLocaleString()}</td>
                      <td className="p-3">
                        <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold text-[10px]">
                          {exp.status}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}

        {/* SUB-TAB 3: MONTHLY RECURRING (RENT, BILLS, UTILITIES) */}
        {activeSubTab === 'recurring' && (
          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200 text-slate-700">
                  <th className="p-3">ID</th>
                  <th className="p-3">Category (Rent / Bills)</th>
                  <th className="p-3">Description</th>
                  <th className="p-3">Billing Date</th>
                  <th className="p-3">Monthly Cost</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {expenses
                  .filter((e) => e.type === 'Monthly Recurring')
                  .map((exp) => (
                    <tr key={exp.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 font-bold text-indigo-700">{exp.id}</td>
                      <td className="p-3 font-bold text-slate-900">{exp.category}</td>
                      <td className="p-3 text-slate-700 font-sans">{exp.description}</td>
                      <td className="p-3 text-slate-500">{exp.date}</td>
                      <td className="p-3 font-bold text-amber-600">€{exp.amount.toLocaleString()}</td>
                      <td className="p-3">
                        <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold text-[10px]">
                          {exp.status}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}

        {/* SUB-TAB 4: SALARIES & PAYROLL */}
        {activeSubTab === 'salaries' && (
          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200 text-slate-700">
                  <th className="p-3">Employee Name</th>
                  <th className="p-3">Designation</th>
                  <th className="p-3">Base Salary</th>
                  <th className="p-3">Bonuses & Comm</th>
                  <th className="p-3">Deductions</th>
                  <th className="p-3">Net Payable Salary</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Payslip</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {salaries.map((sal) => (
                  <tr key={sal.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3 font-bold text-slate-900 font-sans">{sal.employeeName}</td>
                    <td className="p-3 text-slate-600 font-sans">{sal.designation}</td>
                    <td className="p-3 text-slate-800">€{sal.baseSalary.toLocaleString()}</td>
                    <td className="p-3 text-emerald-600 font-bold">+€{(sal.bonuses + sal.commissions).toLocaleString()}</td>
                    <td className="p-3 text-red-600">-€{sal.deductions.toLocaleString()}</td>
                    <td className="p-3 font-bold text-indigo-700 text-sm">€{sal.netSalary.toLocaleString()}</td>
                    <td className="p-3">
                      <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold text-[10px]">
                        {sal.status} ({sal.monthYear})
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => setSelectedPayslip(sal)}
                        className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded font-bold text-[10px] cursor-pointer"
                      >
                        View Payslip
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* SUB-TAB 5: INVOICES */}
        {activeSubTab === 'invoices' && (
          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200 text-slate-700">
                  <th className="p-3">Invoice ID</th>
                  <th className="p-3">Client</th>
                  <th className="p-3">Project</th>
                  <th className="p-3">Subtotal</th>
                  <th className="p-3">Tax (10%)</th>
                  <th className="p-3">Total Amount</th>
                  <th className="p-3">Due Date</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3 font-bold text-indigo-700">{inv.id}</td>
                    <td className="p-3 font-bold text-slate-900 font-sans">{inv.clientName}</td>
                    <td className="p-3 text-slate-600 font-sans">{inv.projectName}</td>
                    <td className="p-3 text-slate-700">€{inv.amount.toLocaleString()}</td>
                    <td className="p-3 text-slate-500">€{inv.tax.toLocaleString()}</td>
                    <td className="p-3 font-bold text-emerald-600 text-sm">€{inv.total.toLocaleString()}</td>
                    <td className="p-3 text-slate-500">{inv.dueDate}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                        inv.status === 'Paid' ? 'bg-emerald-100 text-emerald-800' :
                        inv.status === 'Sent' ? 'bg-blue-100 text-blue-800' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => setSelectedInvoice(inv)}
                        className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 font-semibold text-xs px-2.5 py-1 rounded-lg flex items-center gap-1 ml-auto cursor-pointer"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>View PDF</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MODAL: LOG EXPENSE */}
      {showExpenseModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl border border-slate-200 text-slate-800">
            <h3 className="font-bold text-slate-900 text-base">Log Expense Entry</h3>
            <form onSubmit={handleCreateExpenseSubmit} className="space-y-3 text-xs font-sans">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Expense Type</label>
                <select
                  value={expType}
                  onChange={(e) => setExpType(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 font-mono"
                >
                  <option value="Daily">Daily Expense / Travel</option>
                  <option value="Monthly Recurring">Monthly Recurring (Rent / Utilities)</option>
                  <option value="One-time">One-time Equipment</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Category</label>
                <select
                  value={expCategory}
                  onChange={(e) => setExpCategory(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 font-mono"
                >
                  <option value="Rent">Rent</option>
                  <option value="Utilities">Utilities (Electricity/Water/Internet)</option>
                  <option value="Travel">Travel & Rail</option>
                  <option value="Office Supplies">Office Supplies</option>
                  <option value="Software Subscriptions">Software Subscriptions</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Description *</label>
                <input
                  type="text"
                  placeholder="e.g. Office Fiber Broadband Monthly Bill"
                  value={expDesc}
                  onChange={(e) => setExpDesc(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Amount (€) *</label>
                <input
                  type="number"
                  value={expAmount}
                  onChange={(e) => setExpAmount(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 font-mono"
                  required
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowExpenseModal(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold cursor-pointer"
                >
                  Save Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: CREATE INVOICE */}
      {showInvoiceModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl border border-slate-200 text-slate-800">
            <h3 className="font-bold text-slate-900 text-base">Create Client Invoice</h3>
            <form onSubmit={handleCreateInvoiceSubmit} className="space-y-3 text-xs font-sans">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Client Name *</label>
                <input
                  type="text"
                  placeholder="e.g. KlangWerk Digital Solutions GmbH"
                  value={invClientName}
                  onChange={(e) => setInvClientName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Project Name *</label>
                <input
                  type="text"
                  placeholder="e.g. AI Marketing Pipeline & Scraper Setup"
                  value={invProjectName}
                  onChange={(e) => setInvProjectName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Subtotal Amount (€) *</label>
                <input
                  type="number"
                  value={invAmount}
                  onChange={(e) => setInvAmount(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 font-mono"
                  required
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowInvoiceModal(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold cursor-pointer"
                >
                  Generate Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: PAYSLIP PREVIEW */}
      {selectedPayslip && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full space-y-4 shadow-2xl border border-slate-200 text-slate-800">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Employee Salary Payslip</h3>
                <span className="text-xs text-slate-500 font-mono">{selectedPayslip.monthYear}</span>
              </div>
              <button onClick={() => setSelectedPayslip(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                ✕
              </button>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl space-y-2 text-xs font-mono border border-slate-200">
              <div className="font-bold text-slate-900 text-sm">{selectedPayslip.employeeName}</div>
              <div className="text-slate-600">{selectedPayslip.designation}</div>
              <div className="border-t border-slate-200 my-2 pt-2 space-y-1">
                <div className="flex justify-between"><span>Base Salary:</span> <span>€{selectedPayslip.baseSalary.toLocaleString()}</span></div>
                <div className="flex justify-between text-emerald-600"><span>Bonuses & Performance:</span> <span>+€{selectedPayslip.bonuses.toLocaleString()}</span></div>
                <div className="flex justify-between text-red-600"><span>Tax & Deductions:</span> <span>-€{selectedPayslip.deductions.toLocaleString()}</span></div>
                <div className="flex justify-between font-bold text-slate-900 text-sm pt-2 border-t border-slate-200">
                  <span>Net Salary Paid:</span>
                  <span className="text-indigo-600">€{selectedPayslip.netSalary.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelectedPayslip(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl font-semibold text-xs cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: OFFICIAL CLIENT INVOICE PDF PREVIEW */}
      {selectedInvoice && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-2xl w-full space-y-6 shadow-2xl border border-slate-200 text-slate-800 my-8">
            {/* Action Bar / Controls */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-slate-900 text-base">Official European Client Tax Invoice</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer shadow-sm shadow-indigo-200"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF / Print</span>
                </button>
                <button
                  onClick={() => setSelectedInvoice(null)}
                  className="text-slate-400 hover:text-slate-600 text-xl font-bold p-1 cursor-pointer"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Printable Invoice Container */}
            <div className="bg-slate-50/50 border border-slate-200 rounded-2xl p-6 space-y-6 text-xs font-sans">
              {/* Header: Issuer vs Bill To */}
              <div className="flex flex-col sm:flex-row justify-between gap-6 border-b border-slate-200 pb-6">
                <div>
                  <div className="text-lg font-bold text-slate-900 tracking-tight">WorkNet Devs Global B.V.</div>
                  <div className="text-slate-500 mt-1 font-mono text-[11px] space-y-0.5">
                    <div>Keizersgracht 421, 1016 EK Amsterdam</div>
                    <div>VAT / BTW ID: NL864291048B01</div>
                    <div>Chamber of Commerce (KVK): 84920193</div>
                    <div>Billing Support: finance@worknetdevs.eu</div>
                  </div>
                </div>

                <div className="sm:text-right font-mono text-[11px]">
                  <div className="text-indigo-600 font-bold text-base">{selectedInvoice.id}</div>
                  <div className="text-slate-500 mt-1 space-y-0.5">
                    <div>Issue Date: <span className="font-bold text-slate-800">{selectedInvoice.issueDate}</span></div>
                    <div>Due Date: <span className="font-bold text-slate-800">{selectedInvoice.dueDate}</span></div>
                    <div>Status: <span className="font-bold text-emerald-600 uppercase">{selectedInvoice.status}</span></div>
                  </div>
                </div>
              </div>

              {/* Client / Bill To Info */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-1">
                <div className="text-[10px] uppercase font-bold text-slate-400 font-mono">Billed To Recipient</div>
                <div className="font-bold text-slate-900 text-sm">{selectedInvoice.clientName}</div>
                <div className="text-slate-600 font-mono text-[11px]">{selectedInvoice.clientEmail}</div>
                <div className="text-slate-500 text-[11px] font-mono mt-0.5">Project Engagement: {selectedInvoice.projectName}</div>
              </div>

              {/* Line Items Table */}
              <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Deliverable Scope Description</th>
                      <th className="p-3 text-right">Subtotal (€)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="p-3">
                        <div className="font-bold text-slate-800">{selectedInvoice.projectName}</div>
                        <div className="text-[10px] text-slate-500 font-sans mt-0.5">
                          Complete European lead scraper, 10-phase automated follow-up engine & regional contact intelligence setup.
                        </div>
                      </td>
                      <td className="p-3 text-right font-bold text-slate-900">€{selectedInvoice.amount.toLocaleString()}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Totals Summary */}
              <div className="flex justify-end font-mono text-xs">
                <div className="w-64 space-y-2 bg-white border border-slate-200 rounded-xl p-4">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal:</span>
                    <span>€{selectedInvoice.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>EU VAT / Tax (10%):</span>
                    <span>€{selectedInvoice.tax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-bold text-slate-900 text-sm pt-2 border-t border-slate-200">
                    <span>Total Amount Due:</span>
                    <span className="text-emerald-600">€{selectedInvoice.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Payment Instructions / Bank IBAN */}
              <div className="border-t border-slate-200 pt-4 text-[11px] text-slate-500 font-mono space-y-1">
                <div className="font-bold text-slate-700">Bank Wire Payment Details:</div>
                <div>Bank: ING Bank N.V. Netherlands (SWIFT/BIC: INGBNL2A)</div>
                <div>IBAN: NL91 INGB 0402 8192 10</div>
                <div>Payment Reference: Please quote <span className="font-bold text-indigo-700">{selectedInvoice.id}</span> in bank transfer remarks.</div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedInvoice(null)}
                className="bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs px-5 py-2 rounded-xl cursor-pointer"
              >
                Close Invoice Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
