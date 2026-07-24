import { Lead, PipelinePhase, ScheduledEmail } from '../types';

export const REGION_SCHEDULE_WINDOWS: Record<string, string> = {
  Germany: '09:00 AM - 11:00 AM CET (Secondary: 02:00 PM - 04:00 PM CET)',
  Netherlands: '09:30 AM - 11:30 AM CET (Secondary: 01:30 PM - 03:30 PM CET)',
  Spain: '10:00 AM - 12:00 PM CET (Secondary: 04:00 PM - 06:00 PM CET)',
  Denmark: '09:00 AM - 11:00 AM CET (Secondary: 01:00 PM - 03:00 PM CET)',
  Sweden: '09:00 AM - 11:00 AM CET (Secondary: 01:00 PM - 03:00 PM CET)',
  Finland: '09:00 AM - 11:00 AM EET (Secondary: 01:00 PM - 03:00 PM EET)',
  Belgium: '09:00 AM - 11:00 AM CET (Secondary: 02:00 PM - 04:00 PM CET)',
  Austria: '09:00 AM - 11:00 AM CET (Secondary: 02:00 PM - 04:00 PM CET)',
  Estonia: '09:00 AM - 11:00 AM EET (Secondary: 02:00 PM - 04:00 PM EET)',
  'Pan-European': '09:30 AM - 11:30 AM CET',
};

export const REGION_TIMEZONES: Record<string, string> = {
  Germany: 'Europe/Berlin (CET)',
  Netherlands: 'Europe/Amsterdam (CET)',
  Spain: 'Europe/Madrid (CET)',
  Denmark: 'Europe/Copenhagen (CET)',
  Sweden: 'Europe/Stockholm (CET)',
  Finland: 'Europe/Helsinki (EET)',
  Belgium: 'Europe/Brussels (CET)',
  Austria: 'Europe/Vienna (CET)',
  Estonia: 'Europe/Tallinn (EET)',
  'Pan-European': 'Europe/Berlin (CET)',
};

/**
 * Calculates a future optimal schedule time for the regional send window.
 * Ensures NO INSTANT SENDing occurs—all emails are queued for future window dispatch.
 * Staggers send timestamps by staggerIndex to prevent 50+ emails clashing on identical minute.
 */
export function calculateOptimalScheduleTime(country: string, phase: PipelinePhase, staggerIndex: number = 0): string {
  const now = new Date();
  // Schedule offset based on phase to spread across days/weeks in the campaign
  const dayOffsetMap: Record<number, number> = {
    1: 1,  // Tomorrow 09:30
    2: 2,  // Day 2 09:30
    3: 5,  // Day 5 11:00
    4: 8,  // Day 8 10:00
    5: 12, // Day 12 11:30
    6: 18, // Day 18 09:00
    7: 25, // Day 25 10:30
    8: 32, // Day 32 11:30
    9: 40, // Day 40 10:00
    10: 50 // Day 50 11:00
  };

  const daysToAdd = dayOffsetMap[phase] || 1;
  const targetDate = new Date(now.getTime() + daysToAdd * 24 * 60 * 60 * 1000);
  
  // Set default time to 09:30 AM local target time + 4 minute stagger per lead
  const startHour = 9;
  const totalMinutes = 30 + (staggerIndex * 4);
  const addedHours = Math.floor(totalMinutes / 60);
  const finalMinutes = totalMinutes % 60;

  targetDate.setHours(startHour + addedHours, finalMinutes, 0, 0);

  return targetDate.toISOString();
}

/**
 * Generates personalized email subject lines for each of the 10 pipeline phases.
 */
export function generatePersonalizedSubject(phase: PipelinePhase, lead: Lead): string {
  const bName = lead.business_name;
  const city = lead.target_area;

  switch (phase) {
    case 1:
      return `[Automated Audit] Initial Growth Assessment for ${bName} (${city})`;
    case 2:
      return `Quick Question regarding online booking revenue leakage at ${bName}`;
    case 3:
      return `Custom Website & Booking UX Audit + N8N Blueprint for ${bName}`;
    case 4:
      return `[5-Section Growth Blueprint] Complete Digital Matrix for ${bName}`;
    case 5:
      return `Golden Proposal & 20-Min Interactive Working Prototype for ${bName}`;
    case 6:
      return `Monthly Scaling Update: Competitor Intelligence & Quick Wins for ${bName}`;
    case 7:
      return `Multi-Channel Growth Sync: Expanding ${bName}'s Local Market Dominance`;
    case 8:
      return `Custom Salon AI Assistant Built for ${bName} - Live Preview`;
    case 9:
      return `European Salon Benchmark Report: How ${bName} Compares in ${city}`;
    case 10:
      return `Strategic Partnership Alert & Executive Summary for ${bName}`;
    default:
      return `Outbound Growth Addition for ${bName}`;
  }
}

/**
 * Generates rich, highly tailored email bodies written in Senior VP Copywriting style.
 */
export function generatePersonalizedBody(phase: PipelinePhase, lead: Lead): string {
  const bName = lead.business_name;
  const manager = lead.personnel?.responsible_person || lead.personnel?.manager_details || 'Salon Director / Owner';
  const city = lead.target_area;
  const reviewsInfo = lead.metrics?.customer_reviews || '4.8/5 (120 reviews)';
  const keyStrategy = lead.intelligence?.key_strategy || 'Automate client re-booking & Instagram DM scheduling';

  switch (phase) {
    case 1:
      return `Dear ${manager},

Our automated market scanner recently indexed ${bName} in ${city} (Customer Metrics: ${reviewsInfo}).

During our automated digital audit, we noticed several quick-win opportunities to optimize your digital presence, increase online appointment bookings, and reclaim lost client retention.

We have automatically prepared your Phase 1 Initial Assessment Report. This report is scheduled for dispatch in your regional morning window.

Best regards,
WorkNet Enterprise AI Pipeline Agent`;

    case 2:
      return `Dear ${manager},

Following up on our preliminary scan for ${bName}, we analyzed your online booking conversion funnels against top-performing salons in ${city}.

Key Findings:
• Potential monthly revenue leakage from unoptimized mobile booking flows.
• Recommended Strategy: ${keyStrategy}.

Attached is your customized Phase 2 Value Report. We look forward to sharing further implementation steps.

Warm regards,
Outbound Growth Team`;

    case 3:
      return `Dear ${manager},

We have created a custom deliverable specifically for ${bName}: an N8N automated booking & client follow-up workflow blueprint.

This workflow automatically syncs Google Business messages, WhatsApp enquiries, and Instagram DMs directly into your booking system without adding staff overhead.

Your Phase 3 Custom Deliverable report and social amplification breakdown have been queued in your regional schedule.

Best regards,
Enterprise Strategy Group`;

    case 4:
      return `Dear ${manager},

As promised, we have compiled the full 5-Section Growth Blueprint for ${bName}:
1. Complete Digital Audit (${city} Regional Benchmark)
2. Competitive Matrix vs. Local Competitors
3. Technical Optimization & Speed Blueprint
4. Client Lifetime Value (LTV) Maximizer
5. ROI & Payback Timeline Analysis

Your complete PDF documentation is attached and queued for your optimal morning window.

Warm regards,
Senior Strategy Director`;

    case 5:
      return `Dear ${manager},

We have assembled a live 20-minute interactive working prototype tailored specifically for ${bName}.

In this Phase 5 Golden Proposal, we outline:
• Guaranteed 30-day implementation roadmap.
• Direct integration with your existing salon software.
• Zero upfront setup friction.

Please review the attached Golden Proposal summary. We welcome a brief 20-minute strategy call at your convenience.

Best regards,
Managing Director`;

    case 6:
      return `Dear ${manager},

Here is your Monthly Scaling Nurture update for ${bName}.

Recent market shifts in ${city} show increased consumer demand for online automated scheduling and membership subscriptions. We've updated your ROI forecast with 3 new quick wins.

Your Phase 6 Scaling Report is queued for dispatch.

Warm regards,
Outbound Success Manager`;

    case 7:
      return `Dear ${manager},

We are initiating Phase 7 synchronized multi-channel outreach for ${bName} across email, LinkedIn executive sync, and WhatsApp business channels.

Our goal is to ensure your executive team in ${city} has complete visibility into these automated growth levers.

All communication remains strictly scheduled according to European GDPR & business hour compliance.

Best regards,
Multi-Channel Growth Director`;

    case 8:
      return `Dear ${manager},

Our engineering team built a dedicated AI Salon Receptionist prototype tailored for ${bName}.

It handles 24/7 client booking inquiries, answers service price questions, and manages cancellation fill-ins automatically.

Attached is your Phase 8 Tool Demo guide.

Warm regards,
AI Innovation Team`;

    case 9:
      return `Dear ${manager},

We completed a comprehensive European Salon Benchmark comparing top aesthetic centers across Germany, Netherlands, and Scandinavia.

${bName} ranks in the top tier for client satisfaction, and with minor automated follow-up adjustments, can capture an additional 15-22% recurring booking volume.

Your Phase 9 Competitor Intelligence Analysis is attached.

Best regards,
Market Intelligence Unit`;

    case 10:
      return `Dear ${manager},

This is our Phase 10 Strategic Partnership & Industry Executive Summary for ${bName}.

Over the past 50 days, our automated pipeline has benchmarked and documented your exact growth trajectory in ${city}.

We welcome the opportunity to formalize a long-term technology partnership to support ${bName}'s expansion.

Warm regards,
Chief Growth Officer`;

    default:
      return `Dear ${manager},\n\nWe have prepared Phase ${phase} growth deliverables for ${bName} in ${city}.\n\nBest regards,\nWorkNet Growth Team`;
  }
}

/**
 * Creates a fully auto-generated ScheduledEmail item ready for the time window queue.
 */
export function createScheduledEmailForLead(lead: Lead, phase: PipelinePhase, staggerIndex: number = 0): ScheduledEmail {
  const country = lead.country || 'Germany';
  const optWindow = REGION_SCHEDULE_WINDOWS[country] || '09:30 AM - 11:30 AM CET';
  const timezone = REGION_TIMEZONES[country] || 'Europe/Berlin (CET)';
  const scheduledTime = calculateOptimalScheduleTime(country, phase, staggerIndex);

  return {
    id: `sched-${Date.now()}-${Math.random().toString(36).substring(2, 6)}-${lead.id}`,
    lead_id: lead.id,
    business_name: lead.business_name,
    recipient_email: lead.contact?.email || 'contact@company.eu',
    phase: phase,
    subject: generatePersonalizedSubject(phase, lead),
    body: generatePersonalizedBody(phase, lead),
    attachment_name: `${lead.business_name.replace(/[^a-z0-9]/gi, '_')}_Phase${phase}_Report.pdf`,
    scheduled_time: scheduledTime,
    local_timezone: timezone,
    status: 'Queued',
    regional_window: optWindow
  };
}
