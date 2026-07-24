import { Lead, RegionalSourceInfo, Campaign, ScheduledEmail, SystemLog } from '../types';
import { SALON_LEADS } from './salonLeadsData';

export const INITIAL_REGIONAL_SOURCES: Record<string, RegionalSourceInfo> = {
  Germany: {
    country: 'Germany',
    primary: ['Loqate (19M+ verified)', 'Beauhurst', 'Bundesanzeiger'],
    secondary: ['Handelsregister', 'Statistisches Bundesamt'],
    commercial: ['Gelbe Seiten', 'Kompass Deutschland'],
    priority_db: 'Loqate & Bundesanzeiger',
    verified_records: '19,200,000+'
  },
  Netherlands: {
    country: 'Netherlands',
    primary: ['Company.info (500+ attributes)', 'Dutch Trade Register'],
    secondary: ['Kamer van Koophandel (KVK)', 'CBS Statistics'],
    commercial: ['Telefoongids', 'Informatie Dienst'],
    priority_db: 'Company.info KVK Live Sync',
    verified_records: '3,100,000+'
  },
  Spain: {
    country: 'Spain',
    primary: ['Camerdata (3M+ companies)', 'ICEX Spain', 'SABI Financials'],
    secondary: ['Boletín Oficial del Registro Mercantil (BORME)'],
    commercial: ['Páginas Amarillas', 'InfoEmpresa'],
    priority_db: 'Camerdata & SABI',
    verified_records: '3,400,000+'
  },
  Denmark: {
    country: 'Denmark',
    primary: ['CVR Register (100% official API)', 'CompanyData Denmark'],
    secondary: ['Danmarks Statistik', 'Erhvervsstyrelsen'],
    commercial: ['Krak Business', 'Degulesider'],
    priority_db: 'CVR Central Business Register',
    verified_records: '850,000+'
  },
  Sweden: {
    country: 'Sweden',
    primary: ['Vainu Nordics (5M+ entities)', 'Bolagsverket Registry'],
    secondary: ['Statistiska Centralbyrån', 'UC Credit Intelligence'],
    commercial: ['Eniro Business', 'Hitta.se Enterprise'],
    priority_db: 'Vainu & Bolagsverket',
    verified_records: '1,400,000+'
  },
  Finland: {
    country: 'Finland',
    primary: ['Vainu PRH', 'Patent and Registration Office (PRH)'],
    secondary: ['Tilastokeskus', 'Asiakastieto Business Data'],
    commercial: ['Fonecta Finder', 'Suomen Yritykset'],
    priority_db: 'PRH & Vainu Intelligence',
    verified_records: '620,000+'
  },
  Belgium: {
    country: 'Belgium',
    primary: ['Gouden Gids / Pages d\'Or', 'KBO / BCE Enterprise Registry'],
    secondary: ['Centrale Balans Databank NBB'],
    commercial: ['Kompass Belgium', 'Belgian Chamber Directory'],
    priority_db: 'KBO & Golden Pages Official',
    verified_records: '1,250,000+'
  },
  Austria: {
    country: 'Austria',
    primary: ['Herold Telefonbuch', 'FirmenABC Austria'],
    secondary: ['Statistik Austria', 'WKO Wirtschaftskammer'],
    commercial: ['Austrian Business Register Direct'],
    priority_db: 'WKO & Herold Official',
    verified_records: '680,000+'
  },
  Estonia: {
    country: 'Estonia',
    primary: ['E-krediidiinfo', 'CompanyData Estonia'],
    secondary: ['Statistics Estonia', 'Estonian Chamber of Commerce'],
    commercial: ['Estonian Business Database'],
    priority_db: 'E-krediidiinfo e-Residency Portal',
    verified_records: '162,520+'
  },
  'Pan-European': {
    country: 'Pan-European',
    primary: ['Amadeus Bureau van Dijk', 'BoldData Europe'],
    secondary: ['Orbis Global', 'Kompass International'],
    commercial: ['Europages B2B', 'Dun & Bradstreet Europe'],
    priority_db: 'Amadeus (11M+ Pan-European)',
    verified_records: '25,000,000+'
  }
};

export const INITIAL_LEADS: Lead[] = SALON_LEADS;

export const INITIAL_CAMPAIGNS: Campaign[] = [
  {
    id: 'camp-01',
    name: 'Berlin DACH MarTech Scaleups',
    initial_keywords: ['digital marketing', 'SaaS', 'B2B services'],
    selected_keywords: [
      'digital marketing solutions Berlin',
      'top rated SaaS companies Berlin',
      'corporate B2B vendors Berlin',
      'B2B services in Berlin, Germany',
      'best digital marketing providers Berlin'
    ],
    target_area: 'Berlin, Germany',
    country: 'Germany',
    created_at: '2026-07-15',
    lead_count: 14,
    active_phase: 1,
    status: 'Active'
  },
  {
    id: 'camp-02',
    name: 'Benelux Logistics & Tech Expansion',
    initial_keywords: ['logistics tech', 'freight software', 'supply chain B2B'],
    selected_keywords: [
      'logistics tech solutions Amsterdam',
      'freight software providers Amsterdam',
      'supply chain B2B vendors Netherlands',
      'top rated logistics companies Netherlands',
      'corporate freight software Amsterdam'
    ],
    target_area: 'Amsterdam, Netherlands',
    country: 'Netherlands',
    created_at: '2026-07-10',
    lead_count: 8,
    active_phase: 3,
    status: 'Active'
  }
];

export const INITIAL_SCHEDULED_EMAILS: ScheduledEmail[] = [
  {
    id: 'sched-101',
    lead_id: 'lead-ams-02',
    business_name: 'Vanguard Logistics Tech B.V.',
    recipient_email: 'info@vanguardlogistics.nl',
    phase: 2,
    subject: 'Vanguard Logistics Tech B.V. - Immediate Growth Opportunity Found',
    body: 'Dear Jan-Willem van der Meer,\n\nAt Work.net Devs, we analyzed Vanguard Logistics Tech B.V.\'s current digital presence and identified key pipeline growth opportunities...',
    attachment_name: 'Vanguard_Logistics_Initial_Assessment.pdf',
    scheduled_time: '2026-07-22T09:30:00+02:00',
    local_timezone: 'Europe/Amsterdam (CET)',
    status: 'Queued',
    regional_window: '09:30 AM - 11:30 AM CET'
  },
  {
    id: 'sched-102',
    lead_id: 'lead-madrid-03',
    business_name: 'Solaria Energy Systems S.L.',
    recipient_email: 'comercial@solaria-systems.es',
    phase: 3,
    subject: 'Solaria Energy Systems S.L. - Here\'s Your Custom Social & Web Growth Blueprint',
    body: 'Dear Elena Gomez,\n\nAs promised, we created a custom deliverable for Solaria Energy Systems S.L. to capture green commercial enterprise leads...',
    attachment_name: 'Solaria_30Day_Growth_Deliverable.pdf',
    scheduled_time: '2026-07-22T11:00:00+02:00',
    local_timezone: 'Europe/Madrid (CET)',
    status: 'Queued',
    regional_window: '10:00 AM - 12:00 PM CET'
  },
  {
    id: 'sched-103',
    lead_id: 'lead-stk-05',
    business_name: 'BioSensus Health Tech AB',
    recipient_email: 'info@biosensus.se',
    phase: 5,
    subject: 'BioSensus Health Tech AB - Golden Proposal & 20-Min Demo Invitation',
    body: 'Dear Gustav Ekström,\n\nWe have built a customized demo for BioSensus Health Tech AB demonstrating automated German medical clinic lead acquisition...',
    attachment_name: 'BioSensus_Golden_Proposal.pdf',
    scheduled_time: '2026-07-22T11:30:00+02:00',
    local_timezone: 'Europe/Stockholm (CET)',
    status: 'Queued',
    regional_window: '09:00 AM - 11:00 AM CET'
  }
];

export const INITIAL_SYSTEM_LOGS: SystemLog[] = [
  {
    id: 'log-01',
    timestamp: '2026-07-21 14:10:02',
    level: 'info',
    phase: 1,
    message: 'Binary Search Scraper initialized for target region: Berlin, Germany across 10 keywords.',
    source: 'Smart Scraper Engine'
  },
  {
    id: 'log-02',
    timestamp: '2026-07-21 14:10:45',
    level: 'success',
    phase: 1,
    message: 'Data enriched for KlangWerk Digital Solutions GmbH via Loqate API (28 attributes extracted).',
    source: 'Regional Enricher'
  },
  {
    id: 'log-03',
    timestamp: '2026-07-21 14:15:20',
    level: 'success',
    phase: 2,
    message: 'Initial Assessment Report generated via Gemini AI model for Vanguard Logistics Tech B.V.',
    source: 'Email Generator'
  },
  {
    id: 'log-04',
    timestamp: '2026-07-21 14:20:10',
    level: 'info',
    phase: 3,
    message: 'Social Media Amplification campaign scheduled across LinkedIn, Twitter & Instagram.',
    source: 'Social Manager'
  }
];

// ==========================================
// MOCK DATA FOR ENTERPRISE OPERATIONAL MODULES
// ==========================================

export const INITIAL_REGIONS = [
  {
    id: 'REG-0001',
    name: 'DACH Central Europe',
    country: 'Germany',
    city: 'Berlin',
    timezone: 'Europe/Berlin (CET)',
    currency: 'EUR (€)',
    status: 'Active' as const,
    created_at: '2026-01-10'
  },
  {
    id: 'REG-0002',
    name: 'Benelux Maritime Hub',
    country: 'Netherlands',
    city: 'Amsterdam',
    timezone: 'Europe/Amsterdam (CET)',
    currency: 'EUR (€)',
    status: 'Active' as const,
    created_at: '2026-01-12'
  },
  {
    id: 'REG-0003',
    name: 'Iberia Tech Belt',
    country: 'Spain',
    city: 'Madrid',
    timezone: 'Europe/Madrid (CET)',
    currency: 'EUR (€)',
    status: 'Active' as const,
    created_at: '2026-02-01'
  },
  {
    id: 'REG-0004',
    name: 'Nordics Capital Belt',
    country: 'Sweden',
    city: 'Stockholm',
    timezone: 'Europe/Stockholm (CET)',
    currency: 'SEK (kr)',
    status: 'Active' as const,
    created_at: '2026-03-15'
  }
];

export const INITIAL_STATUSES = [
  { id: 'ST-01', category: 'Lead' as const, name: 'New Lead', color: 'bg-blue-500', order: 1, isDefault: true, autoActions: 'Trigger initial email audit' },
  { id: 'ST-02', category: 'Lead' as const, name: 'Contacted', color: 'bg-indigo-500', order: 2, isDefault: false, autoActions: 'Schedule follow-up task' },
  { id: 'ST-03', category: 'Lead' as const, name: 'Qualified', color: 'bg-amber-500', order: 3, isDefault: false, autoActions: 'Send growth blueprint' },
  { id: 'ST-04', category: 'Lead' as const, name: 'Proposal Sent', color: 'bg-purple-500', order: 4, isDefault: false, autoActions: 'Set 3-day reminder' },
  { id: 'ST-05', category: 'Lead' as const, name: 'Won', color: 'bg-emerald-500', order: 5, isDefault: false, autoActions: 'Create onboarding folder & contract' },
  { id: 'ST-06', category: 'Project' as const, name: 'Discovery', color: 'bg-sky-500', order: 1, isDefault: true },
  { id: 'ST-07', category: 'Project' as const, name: 'Development', color: 'bg-indigo-600', order: 2, isDefault: false, wipLimit: 5 },
  { id: 'ST-08', category: 'Project' as const, name: 'Testing & QA', color: 'bg-amber-600', order: 3, isDefault: false, wipLimit: 3 },
  { id: 'ST-09', category: 'Project' as const, name: 'Deployment', color: 'bg-emerald-600', order: 4, isDefault: false }
];

export const INITIAL_EXPENSES = [
  {
    id: 'EXP-1001',
    type: 'Monthly Recurring' as const,
    category: 'Rent' as const,
    description: 'Central Berlin Tech Office Space Rent',
    amount: 2400,
    currency: 'EUR (€)',
    date: '2026-07-01',
    paymentMethod: 'Bank Transfer' as const,
    status: 'Paid' as const,
    approvedBy: 'Alex Rivera'
  },
  {
    id: 'EXP-1002',
    type: 'Monthly Recurring' as const,
    category: 'Utilities' as const,
    description: 'High-speed Fiber Internet & Office Power',
    amount: 450,
    currency: 'EUR (€)',
    date: '2026-07-05',
    paymentMethod: 'Corporate Card' as const,
    status: 'Paid' as const,
    approvedBy: 'Alex Rivera'
  },
  {
    id: 'EXP-1003',
    type: 'Daily' as const,
    category: 'Travel' as const,
    description: 'DB High-Speed Train Munich Client Meeting',
    amount: 185,
    currency: 'EUR (€)',
    date: '2026-07-14',
    paymentMethod: 'Corporate Card' as const,
    status: 'Approved' as const,
    approvedBy: 'Alex Rivera'
  },
  {
    id: 'EXP-1004',
    type: 'Monthly Recurring' as const,
    category: 'Software Subscriptions' as const,
    description: 'Google Workspace Enterprise & Scraper Proxies',
    amount: 320,
    currency: 'EUR (€)',
    date: '2026-07-15',
    paymentMethod: 'Corporate Card' as const,
    status: 'Paid' as const,
    approvedBy: 'Alex Rivera'
  }
];

export const INITIAL_EMPLOYEES = [
  {
    id: 'EMP-001',
    firstName: 'Alex',
    lastName: 'Rivera',
    email: 'alex.rivera@worknetdevs.com',
    phone: '+49 170 8910293',
    designation: 'Managing Director & Lead BDM',
    department: 'Operations' as const,
    reportingManager: 'Board of Directors',
    joiningDate: '2024-01-15',
    status: 'Active' as const,
    baseSalary: 6500,
    kpis: [
      { id: 'KPI-1', category: 'Revenue' as const, name: 'Monthly Client Acquisition', target: 5, actual: 4, unit: 'Clients', achieved: false },
      { id: 'KPI-2', category: 'Client Satisfaction' as const, name: 'Client Retention Rate', target: 95, actual: 98, unit: '%', achieved: true }
    ]
  },
  {
    id: 'EMP-002',
    firstName: 'Sarah',
    lastName: 'Chen',
    email: 'sarah.chen@worknetdevs.com',
    phone: '+49 170 9928102',
    designation: 'Lead Cloud & Pipeline Architect',
    department: 'Engineering' as const,
    reportingManager: 'Alex Rivera',
    joiningDate: '2024-03-01',
    status: 'Active' as const,
    baseSalary: 5800,
    kpis: [
      { id: 'KPI-3', category: 'Productivity' as const, name: 'Automation Pipeline Uptime', target: 99.9, actual: 100, unit: '%', achieved: true },
      { id: 'KPI-4', category: 'Quality' as const, name: 'Scraper Data Accuracy', target: 98, actual: 99.2, unit: '%', achieved: true }
    ]
  },
  {
    id: 'EMP-003',
    firstName: 'Marcus',
    lastName: 'Vance',
    email: 'marcus.vance@worknetdevs.com',
    phone: '+49 170 3391029',
    designation: 'Senior Full-Stack Engineer',
    department: 'Engineering' as const,
    reportingManager: 'Sarah Chen',
    joiningDate: '2024-06-15',
    status: 'Active' as const,
    baseSalary: 5200,
    kpis: [
      { id: 'KPI-5', category: 'Efficiency' as const, name: 'Sprint Task Completion Rate', target: 90, actual: 94, unit: '%', achieved: true }
    ]
  },
  {
    id: 'EMP-004',
    firstName: 'Elena',
    lastName: 'Rostova',
    email: 'elena.rostova@worknetdevs.com',
    phone: '+49 170 5519203',
    designation: 'HR & Quality Operations Manager',
    department: 'HR & Admin' as const,
    reportingManager: 'Alex Rivera',
    joiningDate: '2025-01-10',
    status: 'Active' as const,
    baseSalary: 4500,
    kpis: [
      { id: 'KPI-6', category: 'Quality' as const, name: 'Staff SOP Compliance Score', target: 95, actual: 96, unit: '%', achieved: true }
    ]
  }
];

export const INITIAL_SALARIES = [
  {
    id: 'SAL-2026-07-01',
    employeeId: 'EMP-001',
    employeeName: 'Alex Rivera',
    designation: 'Managing Director & Lead BDM',
    baseSalary: 6500,
    bonuses: 1200,
    commissions: 800,
    deductions: 1400,
    netSalary: 7100,
    monthYear: 'July 2026',
    status: 'Paid' as const,
    paymentDate: '2026-07-20'
  },
  {
    id: 'SAL-2026-07-02',
    employeeId: 'EMP-002',
    employeeName: 'Sarah Chen',
    designation: 'Lead Cloud & Pipeline Architect',
    baseSalary: 5800,
    bonuses: 600,
    commissions: 0,
    deductions: 1100,
    netSalary: 5300,
    monthYear: 'July 2026',
    status: 'Paid' as const,
    paymentDate: '2026-07-20'
  },
  {
    id: 'SAL-2026-07-03',
    employeeId: 'EMP-003',
    employeeName: 'Marcus Vance',
    designation: 'Senior Full-Stack Engineer',
    baseSalary: 5200,
    bonuses: 400,
    commissions: 0,
    deductions: 950,
    netSalary: 4650,
    monthYear: 'July 2026',
    status: 'Paid' as const,
    paymentDate: '2026-07-20'
  },
  {
    id: 'SAL-2026-07-04',
    employeeId: 'EMP-004',
    employeeName: 'Elena Rostova',
    designation: 'HR & Quality Operations Manager',
    baseSalary: 4500,
    bonuses: 300,
    commissions: 0,
    deductions: 800,
    netSalary: 4000,
    monthYear: 'July 2026',
    status: 'Paid' as const,
    paymentDate: '2026-07-20'
  }
];

export const INITIAL_INVOICES = [
  {
    id: 'INV-2026-001',
    clientName: 'BioSensus Health Tech AB',
    clientEmail: 'info@biosensus.se',
    projectName: 'DACH Clinic Outbound Lead Engine',
    amount: 14500,
    tax: 1450,
    total: 15950,
    issueDate: '2026-07-01',
    dueDate: '2026-07-30',
    status: 'Paid' as const
  },
  {
    id: 'INV-2026-002',
    clientName: 'Solaria Energy Systems S.L.',
    clientEmail: 'comercial@solaria-systems.es',
    projectName: 'Green Energy Lead Discovery & Proposal Portal',
    amount: 9800,
    tax: 980,
    total: 10780,
    issueDate: '2026-07-10',
    dueDate: '2026-08-09',
    status: 'Sent' as const
  },
  {
    id: 'INV-2026-003',
    clientName: 'Vanguard Logistics Tech B.V.',
    clientEmail: 'info@vanguardlogistics.nl',
    projectName: 'Maritime Supply Chain Lead Automation',
    amount: 7200,
    tax: 720,
    total: 7920,
    issueDate: '2026-07-18',
    dueDate: '2026-08-17',
    status: 'Sent' as const
  }
];

export const INITIAL_SOPS = [
  {
    id: 'SOP-001',
    title: '10-Phase B2B Outbound Cold Email Playbook',
    category: 'Sales Playbook' as const,
    summary: 'Standard procedures for timing, personalizing, and advancing European B2B leads from Phase 1 discovery to Phase 10 news updates.',
    content: '1. Phase 1: Scrape & Verify VAT & email via regional database.\n2. Phase 2: Dispatch initial personalized assessment.\n3. Phase 3: Deliver custom 30-day growth deliverable.\n4. Phase 4: Share 5-section Growth Blueprint PDF.\n5. Phase 5: Invite to 20-min live demo with Google Calendar link.',
    lastUpdated: '2026-07-15',
    author: 'Alex Rivera'
  },
  {
    id: 'SOP-002',
    title: 'Employee Onboarding & Google Drive Provisioning',
    category: 'HR & Onboarding' as const,
    summary: 'Step-by-step guide for generating employment contracts, provisioning Google Workspace accounts, and assigning departmental KPIs.',
    content: '1. Create employee entry in HR Directory.\n2. Auto-generate Employment Contract doc.\n3. Send invitation for Google Workspace email.\n4. Assign departmental KPIs and schedule first 30-day review.',
    lastUpdated: '2026-07-10',
    author: 'Elena Rostova'
  },
  {
    id: 'SOP-003',
    title: 'Financial Expense Logging & Monthly Invoice Reminders',
    category: 'Finance Procedures' as const,
    summary: 'Rules for submitting daily receipts, processing monthly recurring rents/salaries, and running automated overdue invoice alerts.',
    content: '1. All travel receipts > €50 require pre-approval.\n2. Salaries are processed on the 20th of each month.\n3. Overdue invoice automated reminders trigger on Day 1, Day 7, and Day 14 past due date.',
    lastUpdated: '2026-07-08',
    author: 'Alex Rivera'
  }
];

export const INITIAL_MEETINGS = [
  {
    id: 'MEET-101',
    title: 'Daily Operations & Pipeline Standup',
    meetLink: 'https://meet.google.com/abc-defg-hij',
    startTime: '2026-07-22T09:00:00',
    endTime: '2026-07-22T09:15:00',
    attendees: ['alex.rivera@worknetdevs.com', 'sarah.chen@worknetdevs.com', 'marcus.vance@worknetdevs.com', 'elena.rostova@worknetdevs.com'],
    status: 'Scheduled' as const,
    agenda: 'Quick review of active leads, daily scraper runs, and blocker resolution.',
    minutesSummary: 'Pending meeting execution.'
  },
  {
    id: 'MEET-102',
    title: 'BioSensus Demo & Contract Review',
    meetLink: 'https://meet.google.com/xyz-uvwx-rst',
    startTime: '2026-07-22T11:30:00',
    endTime: '2026-07-22T12:15:00',
    attendees: ['alex.rivera@worknetdevs.com', 'info@biosensus.se'],
    status: 'Scheduled' as const,
    agenda: 'Present live DACH clinic lead pipeline and finalize €15,950 contract terms.',
    minutesSummary: 'Pending live client meeting.'
  }
];

export const INITIAL_MESSAGES = [
  {
    id: 'MSG-01',
    channelId: 'general',
    senderName: 'Alex Rivera',
    senderRole: 'Managing Director',
    text: 'Good morning team! The new European scraper data for Berlin and Amsterdam is loaded into the Master CRM.',
    timestamp: '08:45 AM'
  },
  {
    id: 'MSG-02',
    channelId: 'general',
    senderName: 'Sarah Chen',
    senderRole: 'Lead Architect',
    text: 'Awesome! Proxy rotation is running smoothly with 100% uptime on Cloud Run.',
    timestamp: '08:50 AM'
  },
  {
    id: 'MSG-03',
    channelId: 'leads',
    senderName: 'Alex Rivera',
    senderRole: 'Managing Director',
    text: 'BioSensus Health Tech accepted the Phase 5 proposal invitation for today at 11:30 AM CET!',
    timestamp: '09:02 AM'
  }
];

export const INITIAL_PROJECTS = [
  {
    id: 'PRJ-2026-001',
    name: 'DACH MedTech Lead Engine & Pipeline',
    clientName: 'BioSensus Health Tech AB',
    status: 'In Progress' as const,
    startDate: '2026-07-01',
    deadline: '2026-08-31',
    progress: 65,
    contractValue: 15950,
    team: ['Alex Rivera', 'Sarah Chen'],
    description: 'Automated clinic lead acquisition, scraper setup, and email follow-up sequence across Germany, Austria, and Switzerland.'
  },
  {
    id: 'PRJ-2026-002',
    name: 'Iberian Green Energy B2B Portal',
    clientName: 'Solaria Energy Systems S.L.',
    status: 'In Progress' as const,
    startDate: '2026-07-10',
    deadline: '2026-09-15',
    progress: 40,
    contractValue: 10780,
    team: ['Marcus Vance', 'Alex Rivera'],
    description: 'Commercial solar panel calculator and B2B corporate warehouse lead generation system in Madrid.'
  },
  {
    id: 'PRJ-2026-003',
    name: 'Benelux Freight Tracking System',
    clientName: 'Vanguard Logistics Tech B.V.',
    status: 'Planning' as const,
    startDate: '2026-07-20',
    deadline: '2026-10-01',
    progress: 15,
    contractValue: 7920,
    team: ['Sarah Chen'],
    description: 'Smart freight visibility platform with automated multi-channel LinkedIn & email outreach.'
  }
];

export const INITIAL_KANBAN_CARDS = [
  {
    id: 'CARD-101',
    title: 'Audit German Medical Directory Proxies',
    description: 'Verify proxy IP pool uptime and rate limits for Munich & Berlin health directories.',
    board: 'dev' as const,
    column: 'Development',
    priority: 'High' as const,
    assignee: 'Sarah Chen',
    dueDate: '2026-07-25',
    timeEstimate: 12,
    timeLogged: 8,
    labels: [{ name: 'SCRAPER', color: 'bg-indigo-500' }],
    checklists: [
      { id: 'chk-1', text: 'Configure Loqate API key', done: true },
      { id: 'chk-2', text: 'Test binary search subdivision', done: true },
      { id: 'chk-3', text: 'Verify VAT regex filter', done: false }
    ],
    attachments: [{ name: 'proxy_test_logs.txt', url: '#' }],
    comments: [{ id: 'cmt-1', author: 'Alex Rivera', text: 'Sarah, let us know once test run passes.', time: '2 hours ago' }]
  },
  {
    id: 'CARD-102',
    title: 'BioSensus Contract Signoff & Escrow',
    description: 'Finalize €15,950 service agreement with Gustav Ekström.',
    board: 'lead' as const,
    column: 'Negotiation',
    priority: 'Urgent' as const,
    assignee: 'Alex Rivera',
    dueDate: '2026-07-23',
    timeEstimate: 4,
    timeLogged: 2,
    labels: [{ name: 'LEAD', color: 'bg-emerald-500' }],
    checklists: [{ id: 'chk-10', text: 'Draft NDA and Employment Contract', done: true }],
    attachments: [],
    comments: []
  },
  {
    id: 'CARD-103',
    title: 'Configure Outbound DKIM & SPF Records',
    description: 'Setup domain authentication for high deliverability cold outreach.',
    board: 'task' as const,
    column: 'In Progress',
    priority: 'Medium' as const,
    assignee: 'Marcus Vance',
    dueDate: '2026-07-26',
    timeEstimate: 6,
    timeLogged: 3,
    labels: [{ name: 'DEVOPS', color: 'bg-purple-500' }],
    checklists: [],
    attachments: [],
    comments: []
  }
];

export const INITIAL_TASKS = [
  {
    id: 'TASK-0101',
    title: 'Deploy Apps Script Webhook Listener',
    description: 'Establish bi-directional Google Sheets sync with Cloud Run backend.',
    category: 'Project' as const,
    status: 'In Progress' as const,
    priority: 'Critical' as const,
    assignee: 'Sarah Chen',
    dueDate: '2026-07-24',
    estHours: 10,
    actHours: 6,
    subtasks: [
      { id: 'st-10', title: 'Deploy WebApp URL in Apps Script editor', done: true },
      { id: 'st-11', title: 'Verify CORS headers in server.ts', done: true }
    ],
    labels: ['Cloud Run', 'Google Workspace']
  },
  {
    id: 'TASK-0102',
    title: 'Process July Employee Salary Payroll',
    description: 'Generate payslips and execute SEPA transfers for 4 team members.',
    category: 'Finance' as const,
    status: 'Done' as const,
    priority: 'High' as const,
    assignee: 'Elena Rostova',
    dueDate: '2026-07-20',
    estHours: 4,
    actHours: 4,
    subtasks: [
      { id: 'st-20', title: 'Calculate performance bonuses', done: true },
      { id: 'st-21', title: 'Issue PDF payslips', done: true }
    ],
    labels: ['Payroll', 'HR']
  }
];


