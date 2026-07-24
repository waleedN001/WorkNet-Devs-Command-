import React, { useState } from 'react';
import { 
  Lead, 
  Campaign, 
  ScheduledEmail, 
  SystemLog, 
  PipelinePhase, 
  RegionalSourceInfo,
  RegionSetting,
  StatusSetting,
  ProjectItem,
  KanbanCard,
  TaskItem,
  ChatMessage,
  MeetingItem,
  ExpenseItem,
  SalaryItem,
  InvoiceItem,
  EmployeeProfile,
  SOPDoc
} from './types';
import { 
  INITIAL_LEADS, 
  INITIAL_CAMPAIGNS, 
  INITIAL_SCHEDULED_EMAILS, 
  INITIAL_SYSTEM_LOGS, 
  INITIAL_REGIONAL_SOURCES,
  INITIAL_REGIONS,
  INITIAL_STATUSES,
  INITIAL_PROJECTS,
  INITIAL_KANBAN_CARDS,
  INITIAL_TASKS,
  INITIAL_MESSAGES,
  INITIAL_MEETINGS,
  INITIAL_EXPENSES,
  INITIAL_SALARIES,
  INITIAL_INVOICES,
  INITIAL_EMPLOYEES,
  INITIAL_SOPS
} from './data/mockData';

// Layout Components
import { Sidebar } from './components/Sidebar';
import { HeaderBar } from './components/HeaderBar';

// Feature Section Components
import { ExecDashboardSection } from './components/ExecDashboardSection';
import { DiscoverySection } from './components/DiscoverySection';
import { LeadsCRMSection } from './components/LeadsCRMSection';
import { PipelineSection } from './components/PipelineSection';
import { ContentGeneratorSection } from './components/ContentGeneratorSection';
import { SchedulerSection } from './components/SchedulerSection';
import { AnalyticsSection } from './components/AnalyticsSection';
import { ProKanbanSection } from './components/ProKanbanSection';
import { ProTaskManagerSection } from './components/ProTaskManagerSection';
import { CommunicationSection } from './components/CommunicationSection';
import { FinanceSection } from './components/FinanceSection';
import { HRSection } from './components/HRSection';
import { KnowledgeBaseSection } from './components/KnowledgeBaseSection';
import { DynamicSettingsSection } from './components/DynamicSettingsSection';
import { TokenTrackingSection } from './components/TokenTrackingSection';

import { 
  createScheduledEmailForLead, 
  generatePersonalizedSubject, 
  generatePersonalizedBody, 
  calculateOptimalScheduleTime 
} from './utils/emailAutomation';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('exec-dashboard');
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);

  // Core Data State
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [campaigns, setCampaigns] = useState<Campaign[]>(INITIAL_CAMPAIGNS);
  const [scheduledEmails, setScheduledEmails] = useState<ScheduledEmail[]>(INITIAL_SCHEDULED_EMAILS);
  const [logs, setLogs] = useState<SystemLog[]>(INITIAL_SYSTEM_LOGS);
  const [regionalSources] = useState<Record<string, RegionalSourceInfo>>(INITIAL_REGIONAL_SOURCES);

  // New Enterprise Module State
  const [regions, setRegions] = useState<RegionSetting[]>(INITIAL_REGIONS);
  const [statuses, setStatuses] = useState<StatusSetting[]>(INITIAL_STATUSES);
  const [projects, setProjects] = useState<ProjectItem[]>(INITIAL_PROJECTS);
  const [kanbanCards, setKanbanCards] = useState<KanbanCard[]>(INITIAL_KANBAN_CARDS);
  const [tasks, setTasks] = useState<TaskItem[]>(INITIAL_TASKS);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [meetings, setMeetings] = useState<MeetingItem[]>(INITIAL_MEETINGS);
  const [expenses, setExpenses] = useState<ExpenseItem[]>(INITIAL_EXPENSES);
  const [salaries, setSalaries] = useState<SalaryItem[]>(INITIAL_SALARIES);
  const [invoices, setInvoices] = useState<InvoiceItem[]>(INITIAL_INVOICES);
  const [employees, setEmployees] = useState<EmployeeProfile[]>(INITIAL_EMPLOYEES);
  const [sops, setSops] = useState<SOPDoc[]>(INITIAL_SOPS);

  // System Logger Helper
  const addLog = (
    message: string, 
    level: 'info' | 'success' | 'warn' | 'error' = 'info', 
    phase: number = 1, 
    source: string = 'Pipeline Control'
  ) => {
    const newLog: SystemLog = {
      id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
      timestamp: new Date().toLocaleTimeString('en-GB') + ' CET',
      level,
      phase,
      message,
      source
    };
    setLogs((prev) => [newLog, ...prev]);
  };

  // Lead Handlers (Auto-Set Phase 1 and Auto-Queue Email with Deduplication)
  const handleAddLeads = (newLeads: Lead[]) => {
    setLeads((prev) => {
      const existingIds = new Set(prev.map((l) => l.id));
      const existingNames = new Set(prev.map((l) => l.business_name.toLowerCase().trim()));
      const existingEmails = new Set(prev.map((l) => l.contact?.email?.toLowerCase().trim()).filter(Boolean));

      const filteredNew = newLeads
        .map((l) => ({
          ...l,
          current_phase: l.current_phase || (1 as PipelinePhase),
          status: l.status || 'Phase 1: Discovery (Auto-Set)'
        }))
        .filter((l) => {
          const nameKey = l.business_name.toLowerCase().trim();
          const emailKey = l.contact?.email?.toLowerCase().trim();
          if (existingIds.has(l.id) || existingNames.has(nameKey)) return false;
          if (emailKey && existingEmails.has(emailKey)) return false;
          return true;
        });

      if (filteredNew.length === 0) {
        addLog(`Discovery scan found leads, but all were identified as duplicates and merged/filtered out. No duplicate records created.`, 'info', 1);
        return prev;
      }

      // Auto-Queue Phase 1 Scheduled Emails for newly added leads
      const newScheduledList = filteredNew.map((lead) => createScheduledEmailForLead(lead, 1));
      setScheduledEmails((schedPrev) => [...newScheduledList, ...schedPrev]);

      addLog(`Added ${filteredNew.length} new unique lead(s). Automatically assigned Phase 1 and queued Phase 1 emails into Scheduled Outbound Queue. (Deduplication Enforced)`, 'success', 1);

      return [...filteredNew, ...prev];
    });
  };

  const handleUpdateLead = (updatedLead: Lead) => {
    setLeads((prev) => prev.map((l) => (l.id === updatedLead.id ? updatedLead : l)));
  };

  const handleDeleteLeads = (leadIds: string[]) => {
    setLeads((prev) => prev.filter((l) => !leadIds.includes(l.id)));
    addLog(`Deleted ${leadIds.length} lead(s) from Master CRM.`, 'warn');
  };

  const handleBatchAdvance = (leadIds: string[]) => {
    const newScheduledItems: ScheduledEmail[] = [];

    setLeads((prev) =>
      prev.map((l, idx) => {
        if (leadIds.includes(l.id)) {
          const nextP = Math.min(l.current_phase + 1, 10) as PipelinePhase;
          // Generate scheduled email with 4-min stagger
          const newSchedEmail = createScheduledEmailForLead(l, nextP, idx);
          newScheduledItems.push(newSchedEmail);

          return {
            ...l,
            current_phase: nextP,
            status: `Phase ${nextP}: Advanced & Queued`,
            last_contact_date: new Date().toISOString().split('T')[0]
          };
        }
        return l;
      })
    );

    // Deduplicate scheduled emails queue (replace existing Queued items for same lead & phase)
    setScheduledEmails((schedPrev) => {
      const keysToReplace = new Set(newScheduledItems.map((item) => `${item.lead_id}-${item.phase}`));
      const filteredPrev = schedPrev.filter((item) => {
        const key = `${item.lead_id}-${item.phase}`;
        return !(item.status === 'Queued' && keysToReplace.has(key));
      });
      return [...newScheduledItems, ...filteredPrev];
    });

    addLog(`Batch advanced ${leadIds.length} lead(s) to next phase and auto-queued scheduled emails.`, 'success');
  };

  const handleAdvanceLeadsToPhase = (phase: PipelinePhase, targetLeadIds?: string[]) => {
    const idsToUpdate = targetLeadIds || leads.map((l) => l.id);

    const updatedScheduledList: ScheduledEmail[] = [];

    setLeads((prev) =>
      prev.map((l) => {
        if (idsToUpdate.includes(l.id)) {
          const updatedLead = {
            ...l,
            current_phase: phase,
            status: `Phase ${phase}: Auto-Scheduled in Queue`,
            last_contact_date: new Date().toISOString().split('T')[0]
          };

          // Generate automated, personalized email for scheduled queue with stagger
          const staggerIndex = idsToUpdate.indexOf(l.id);
          const schedItem = createScheduledEmailForLead(updatedLead, phase, staggerIndex);
          updatedScheduledList.push(schedItem);

          return updatedLead;
        }
        return l;
      })
    );

    // Deduplicate scheduled emails queue (replace existing Queued items for same lead & phase)
    setScheduledEmails((prev) => {
      const keysToReplace = new Set(updatedScheduledList.map((item) => `${item.lead_id}-${item.phase}`));
      const filteredPrev = prev.filter((item) => {
        const key = `${item.lead_id}-${item.phase}`;
        return !(item.status === 'Queued' && keysToReplace.has(key));
      });
      return [...updatedScheduledList, ...filteredPrev];
    });

    addLog(`[Automated Pipeline] Set Phase ${phase} for ${idsToUpdate.length} lead(s). Generated HOD VP Copywriting email & placed into Scheduled Window Queue. (Deduplicated & Staggered)`, 'success', phase);
  };

  const handleRunFullPipeline = () => {
    addLog('Starting automated 10-phase execution...', 'info');
    let currentStep = 1;
    const interval = setInterval(() => {
      if (currentStep > 10) {
        clearInterval(interval);
        addLog('10-phase pipeline automated execution complete! All phase emails queued in Scheduler.', 'success', 10);
        return;
      }
      handleAdvanceLeadsToPhase(currentStep as PipelinePhase);
      currentStep++;
    }, 800);
  };

  const handleTriggerSend = (id: string) => {
    setScheduledEmails((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'Sent' } : item))
    );
    addLog(`Dispatched scheduled email ID ${id} during active regional time window.`, 'info');
  };

  const handleCancelScheduledEmail = (id: string) => {
    setScheduledEmails((prev) => prev.filter((item) => item.id !== id));
    addLog(`Cancelled and removed scheduled email ID ${id} from outbound queue.`, 'warn');
  };

  const handleDispatchBatch = (count: number = 5) => {
    let dispatched = 0;
    setScheduledEmails((prev) =>
      prev.map((item) => {
        if (item.status === 'Queued' && dispatched < count) {
          dispatched++;
          return { ...item, status: 'Sent' };
        }
        return item;
      })
    );
    addLog(`Dispatched batch of ${dispatched} queued emails in active regional window (Rate limit compliant: max ${count}/hr).`, 'success');
  };

  // Region & Status Settings Handlers
  const handleAddRegion = (reg: RegionSetting) => setRegions((prev) => [reg, ...prev]);
  const handleUpdateRegion = (reg: RegionSetting) =>
    setRegions((prev) => prev.map((r) => (r.id === reg.id ? reg : r)));
  const handleDeleteRegion = (id: string) =>
    setRegions((prev) => prev.filter((r) => r.id !== id));

  const handleAddStatus = (stat: StatusSetting) => setStatuses((prev) => [...prev, stat]);
  const handleDeleteStatus = (id: string) =>
    setStatuses((prev) => prev.filter((s) => s.id !== id));

  // Kanban Handlers
  const handleAddKanbanCard = (card: KanbanCard) => setKanbanCards((prev) => [card, ...prev]);
  const handleMoveKanbanCard = (cardId: string, newColumn: string) =>
    setKanbanCards((prev) =>
      prev.map((c) => (c.id === cardId ? { ...c, column: newColumn } : c))
    );
  const handleUpdateKanbanCard = (card: KanbanCard) =>
    setKanbanCards((prev) => prev.map((c) => (c.id === card.id ? card : c)));
  const handleDeleteKanbanCard = (cardId: string) =>
    setKanbanCards((prev) => prev.filter((c) => c.id !== cardId));

  // Task Handlers
  const handleAddTask = (task: TaskItem) => setTasks((prev) => [task, ...prev]);
  const handleUpdateTask = (task: TaskItem) =>
    setTasks((prev) => prev.map((t) => (t.id === task.id ? task : t)));
  const handleDeleteTask = (taskId: string) =>
    setTasks((prev) => prev.filter((t) => t.id !== taskId));

  // Chat & Meeting Handlers
  const handleSendMessage = (msg: ChatMessage) => setMessages((prev) => [...prev, msg]);
  const handleScheduleMeeting = (meet: MeetingItem) => setMeetings((prev) => [meet, ...prev]);

  // Finance Handlers
  const handleAddExpense = (exp: ExpenseItem) => setExpenses((prev) => [exp, ...prev]);
  const handleAddInvoice = (inv: InvoiceItem) => setInvoices((prev) => [inv, ...prev]);

  // HR Handlers
  const handleAddEmployee = (emp: EmployeeProfile) => setEmployees((prev) => [emp, ...prev]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex font-sans antialiased selection:bg-blue-100 selection:text-blue-900">
      {/* Category-based Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        leadCount={leads.length}
        scheduledCount={scheduledEmails.length}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />

      {/* Right Column Layout */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${isSidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'}`}>
        {/* Sticky Header Bar */}
        <HeaderBar
          activeTab={activeTab}
          setMobileOpen={setMobileOpen}
          leadCount={leads.length}
          isSidebarCollapsed={isSidebarCollapsed}
          setIsSidebarCollapsed={setIsSidebarCollapsed}
          onSelectTab={setActiveTab}
        />

        {/* Dynamic Section Renderer */}
        <main className="flex-1 p-4 sm:p-6 max-w-7xl w-full mx-auto space-y-6">
          {/* 1. Executive Dashboard */}
          {activeTab === 'exec-dashboard' && (
            <ExecDashboardSection
              leads={leads}
              projects={projects}
              invoices={invoices}
              expenses={expenses}
              salaries={salaries}
              onSelectTab={setActiveTab}
            />
          )}

          {/* 2. Lead Analytics */}
          {activeTab === 'lead-dashboard' && (
            <AnalyticsSection leads={leads} />
          )}

          {/* 3. Financial Dashboard */}
          {activeTab === 'fin-dashboard' && (
            <FinanceSection
              expenses={expenses}
              onAddExpense={handleAddExpense}
              salaries={salaries}
              invoices={invoices}
              onAddInvoice={handleAddInvoice}
            />
          )}

          {/* 4. Master Leads CRM */}
          {activeTab === 'all-leads' && (
            <LeadsCRMSection
              leads={leads}
              onUpdateLead={handleUpdateLead}
              onDeleteLeads={handleDeleteLeads}
              onBatchAdvance={handleBatchAdvance}
              onLog={addLog}
            />
          )}

          {/* 5. European Discovery & Scraper */}
          {activeTab === 'lead-discovery' && (
            <DiscoverySection onAddLeads={handleAddLeads} onLog={addLog} />
          )}

          {/* 6. 10-Phase Pipeline Engine */}
          {activeTab === 'lead-pipeline' && (
            <PipelineSection
              leads={leads}
              logs={logs}
              onAdvanceLeadsToPhase={handleAdvanceLeadsToPhase}
              onRunFullPipeline={handleRunFullPipeline}
              onClearLogs={() => setLogs([])}
            />
          )}

          {/* 6b. AI Content & Deliverables Studio */}
          {activeTab === 'ai-content-studio' && (
            <ContentGeneratorSection leads={leads} onLog={addLog} />
          )}

          {/* 7. Outbound Scheduler */}
          {activeTab === 'outbound-scheduler' && (
            <SchedulerSection
              scheduledEmails={scheduledEmails}
              onTriggerSend={handleTriggerSend}
              onCancelScheduledEmail={handleCancelScheduledEmail}
              onDispatchBatch={handleDispatchBatch}
              onLog={addLog}
            />
          )}

          {/* 8. Interactive Kanban & Funnel Board */}
          {(activeTab === 'kanban-board' || activeTab === 'all-projects') && (
            <ProKanbanSection
              cards={kanbanCards}
              onAddCard={handleAddKanbanCard}
              onMoveCard={handleMoveKanbanCard}
              onUpdateCard={handleUpdateKanbanCard}
              onDeleteCard={handleDeleteKanbanCard}
            />
          )}

          {/* 10. Task Manager */}
          {activeTab === 'task-manager' && (
            <ProTaskManagerSection
              tasks={tasks}
              onAddTask={handleAddTask}
              onUpdateTask={handleUpdateTask}
              onDeleteTask={handleDeleteTask}
            />
          )}

          {/* 11. Real-Time Chat & Google Meet */}
          {(activeTab === 'team-chat' || activeTab === 'meetings') && (
            <CommunicationSection
              messages={messages}
              onSendMessage={handleSendMessage}
              meetings={meetings}
              onScheduleMeeting={handleScheduleMeeting}
            />
          )}

          {/* 12. Finance & Payroll */}
          {(activeTab === 'finance-overview' || activeTab === 'salaries') && (
            <FinanceSection
              expenses={expenses}
              onAddExpense={handleAddExpense}
              salaries={salaries}
              invoices={invoices}
              onAddInvoice={handleAddInvoice}
              leads={leads}
            />
          )}

          {/* 13. HR Operations */}
          {(activeTab === 'hr-staff' || activeTab === 'hr-performance') && (
            <HRSection
              employees={employees}
              onAddEmployee={handleAddEmployee}
              sops={sops}
            />
          )}

          {/* 14. Knowledge Base & SOPs */}
          {activeTab === 'knowledge-base' && (
            <KnowledgeBaseSection sops={sops} />
          )}

          {/* 14.5. Token & API Usage Metering */}
          {activeTab === 'token-metering' && (
            <TokenTrackingSection onLog={addLog} />
          )}

          {/* 15. Dynamic Settings (Regions & Statuses) */}
          {activeTab === 'dynamic-settings' && (
            <DynamicSettingsSection
              regions={regions}
              onAddRegion={handleAddRegion}
              onUpdateRegion={handleUpdateRegion}
              onDeleteRegion={handleDeleteRegion}
              statuses={statuses}
              onAddStatus={handleAddStatus}
              onDeleteStatus={handleDeleteStatus}
            />
          )}
        </main>

        {/* Global Footer */}
        <footer className="border-t border-slate-200 bg-white py-3 text-center text-xs text-slate-500 font-mono shadow-xs">
          Work.net Devs Enterprise Operations Platform v3.0 • Powered by Google Cloud & React
        </footer>
      </div>
    </div>
  );
}
