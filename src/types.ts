/**
 * Work.net Devs - Business Lead Generation & Growth Automation System v2.0
 * Global TypeScript Interfaces & Data Types
 */

export interface LeadOnlinePresence {
  facebook: { exists: boolean; url: string };
  linkedin: { exists: boolean; url: string };
  instagram: { exists: boolean; url: string };
  yelp: { exists: boolean; url: string };
  google_business: { exists: boolean; url: string };
  trustpilot: { exists: boolean; url: string };
}

export interface LeadContactInfo {
  physical_address: string;
  contact_number: string;
  email: string;
  vat_number: string;
}

export interface LeadKeyPersonnel {
  owner_details: string;
  manager_details: string;
  responsible_person: string;
}

export interface LeadBusinessIntelligence {
  key_context: string;
  key_strategy: string;
  annual_revenue: '$100K - $500K' | '$500K - $2M' | '$2M - $10M' | '$10M+';
  business_scale: 'Small' | 'Medium' | 'Large' | 'Enterprise';
  establishment_year: number;
  major_revision_year: number;
  vision_mission: string;
}

export interface LeadPerformanceMetrics {
  customer_reviews: string; // e.g. "4.8/5 (142 reviews)"
  business_system_rating: string; // e.g. "6.5/10 - Manual CRM, No Auto-followup"
  system_remark: string; // Notes on leakages & current tech stack
}

export type PipelinePhase = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type LeadStatus =
  | 'Discovered'
  | 'Phase 1: Discovered'
  | 'Phase 1: Discovery (Auto-Set)'
  | 'Phase 2: Initial Email Sent'
  | 'Phase 3: Deliverable Shared'
  | 'Phase 4: Growth Blueprint Delivered'
  | 'Phase 5: Proposal & Demo Invite'
  | 'Phase 6: Monthly Scaling Nurture'
  | 'Phase 7: Multi-Channel Outreach'
  | 'Phase 8: New Value Shared'
  | 'Phase 9: Competitor Analysis Sent'
  | 'Phase 10: Industry News Alert'
  | 'Demo Booked'
  | 'Converted Client'
  | 'Opted Out'
  | string;

export interface Lead {
  id: string;
  business_name: string;
  website_link: string;
  business_industry: string;
  target_area: string;
  country: string;
  presence: LeadOnlinePresence;
  contact: LeadContactInfo;
  personnel: LeadKeyPersonnel;
  intelligence: LeadBusinessIntelligence;
  metrics: LeadPerformanceMetrics;
  current_phase: PipelinePhase;
  status: LeadStatus;
  last_contact_date: string;
  notes: string;
  regional_data_source: string;
  score: number; // Lead quality score 0-100
  selected?: boolean;
}

export interface KeywordSuggestion {
  keyword: string;
  intent_type: 'Long-tail' | 'Industry-Specific' | 'Problem-Based' | 'Commercial Intent' | 'Location-Specific' | 'B2B Corporate';
  search_volume: string;
  competition: 'Low' | 'Medium' | 'High';
}

export interface Campaign {
  id: string;
  name: string;
  initial_keywords: string[];
  selected_keywords: string[];
  target_area: string;
  country: string;
  created_at: string;
  lead_count: number;
  active_phase: PipelinePhase;
  status: 'Active' | 'Paused' | 'Completed';
}

export interface ScheduledEmail {
  id: string;
  lead_id: string;
  business_name: string;
  recipient_email: string;
  phase: PipelinePhase;
  subject: string;
  body: string;
  attachment_name: string;
  scheduled_time: string;
  local_timezone: string;
  status: 'Queued' | 'Sent' | 'Failed' | 'Paused';
  regional_window: string;
}

export interface SystemLog {
  id: string;
  timestamp: string;
  level: 'info' | 'success' | 'warn' | 'error';
  phase: number;
  message: string;
  source: string;
}

export interface RegionalSourceInfo {
  country: string;
  primary: string[];
  secondary: string[];
  commercial: string[];
  priority_db: string;
  verified_records: string;
}

export interface DeliverableTemplate {
  key: string;
  title: string;
  description: string;
  estimated_impact: string;
}

// ==========================================
// ENTERPRISE PLATFORM EXTENDED INTERFACES
// ==========================================

export type LeadItem = Lead;

export interface ProjectItem {
  id: string;
  name: string;
  clientName: string;
  status: 'Planning' | 'In Progress' | 'Review' | 'Completed' | 'On Hold';
  startDate: string;
  deadline: string;
  progress: number;
  contractValue: number;
  team: string[];
  description: string;
}

export interface RegionSetting {
  id: string;
  name: string;
  country: string;
  city: string;
  timezone: string;
  currency: string;
  status: 'Active' | 'Inactive';
  created_at: string;
}

export interface StatusSetting {
  id: string;
  category: 'Lead' | 'Project' | 'Task';
  name: string;
  color: string;
  order: number;
  isDefault: boolean;
  autoActions?: string;
  wipLimit?: number;
}

export interface KanbanCard {
  id: string;
  title: string;
  description?: string;
  board: 'lead' | 'dev' | 'task';
  column: string;
  priority: 'High' | 'Medium' | 'Low' | 'Urgent';
  assignee: string;
  assigneeAvatar?: string;
  dueDate?: string;
  timeEstimate?: number; // hours
  timeLogged?: number; // hours
  labels: { name: string; color: string }[];
  checklists?: { id: string; text: string; done: boolean }[];
  attachments?: { id: string; name: string; url: string; size: string }[];
  comments?: { id: string; author: string; text: string; time: string }[];
  updated_at?: string;
}

export interface TaskItem {
  id: string;
  title: string;
  description: string;
  category: 'Project' | 'Sales' | 'Administrative' | 'Finance' | 'HR' | 'Marketing';
  status: 'To Do' | 'In Progress' | 'Review' | 'Testing' | 'Blocked' | 'Done';
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  assignee: string;
  assigneeAvatar?: string;
  dueDate: string;
  estHours: number;
  actHours: number;
  subtasks: { id: string; title: string; done: boolean }[];
  dependencies?: string[]; // Task IDs
  labels: string[];
}

export interface ChatMessage {
  id: string;
  channelId: string;
  senderName: string;
  senderAvatar?: string;
  senderRole?: string;
  text: string;
  timestamp: string;
  attachments?: { name: string; url: string; size: string }[];
}

export interface MeetingItem {
  id: string;
  title: string;
  meetLink: string;
  startTime: string;
  endTime: string;
  attendees: string[];
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  agenda: string;
  minutesDocUrl?: string;
  minutesSummary?: string;
}

export interface ExpenseItem {
  id: string;
  type: 'Daily' | 'Monthly Recurring' | 'One-time' | 'Staff Reimbursement';
  category: 'Office Supplies' | 'Travel' | 'Meals' | 'Rent' | 'Utilities' | 'Salaries' | 'Software Subscriptions' | 'Marketing' | 'Equipment' | 'Maintenance';
  description: string;
  amount: number;
  currency: string;
  date: string;
  paymentMethod: 'Bank Transfer' | 'Corporate Card' | 'PayPal' | 'Cash';
  status: 'Approved' | 'Pending' | 'Paid';
  receiptAttached?: boolean;
  approvedBy?: string;
}

export interface SalaryItem {
  id: string;
  employeeId: string;
  employeeName: string;
  designation: string;
  baseSalary: number;
  bonuses: number;
  commissions: number;
  deductions: number;
  netSalary: number;
  monthYear: string; // e.g. "July 2026"
  status: 'Paid' | 'Processing' | 'Hold';
  paymentDate: string;
}

export interface InvoiceItem {
  id: string;
  clientName: string;
  clientEmail: string;
  projectName: string;
  amount: number;
  tax: number;
  total: number;
  issueDate: string;
  dueDate: string;
  status: 'Paid' | 'Sent' | 'Draft' | 'Overdue';
}

export interface EmployeeProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  designation: string;
  department: 'Engineering' | 'Sales & Growth' | 'Operations' | 'Finance' | 'HR & Admin';
  reportingManager: string;
  joiningDate: string;
  status: 'Active' | 'On Leave' | 'Terminated';
  baseSalary: number;
  contractUrl?: string;
  kpis: EmployeeKPI[];
}

export interface EmployeeKPI {
  id: string;
  category: 'Productivity' | 'Quality' | 'Client Satisfaction' | 'Revenue' | 'Efficiency';
  name: string;
  target: number;
  actual: number;
  unit: string;
  achieved: boolean;
}

export interface PerformanceReview {
  id: string;
  employeeId: string;
  employeeName: string;
  reviewerName: string;
  period: string; // e.g. "Q2 2026"
  productivityScore: number; // 1-10
  qualityScore: number;
  communicationScore: number;
  teamworkScore: number;
  leadershipScore: number;
  overallRating: 'Outstanding' | 'Exceeds Expectations' | 'Meets Expectations' | 'Needs Improvement';
  comments: string;
}

export interface SOPDoc {
  id: string;
  title: string;
  category: 'Company Policies' | 'Technical SOP' | 'Sales Playbook' | 'HR & Onboarding' | 'Finance Procedures';
  summary: string;
  content: string;
  lastUpdated: string;
  author: string;
}

