import { Lead, PipelinePhase, InvoiceItem, ExpenseItem } from '../types';

/**
 * Stage-by-Stage Conversion Probabilities (Weighted Pipeline Calculation)
 * Phase 1: Discovery (5%)
 * Phase 2: Initial Email Sent (10%)
 * Phase 3: Deliverable Shared (15%)
 * Phase 4: Growth Blueprint Delivered (25%)
 * Phase 5: Proposal & Demo Invite (45%)
 * Phase 6: Monthly Scaling Nurture (60%)
 * Phase 7: Multi-Channel Outreach (70%)
 * Phase 8: New Value Shared (80%)
 * Phase 9: Competitor Analysis Sent (85%)
 * Phase 10: Industry News Alert / Closing (90%)
 */
export const STAGE_PROBABILITIES: Record<PipelinePhase, number> = {
  1: 0.05,
  2: 0.10,
  3: 0.15,
  4: 0.25,
  5: 0.45,
  6: 0.60,
  7: 0.70,
  8: 0.80,
  9: 0.85,
  10: 0.90,
};

/**
 * Calculates weighted pipeline value based on deal stage probability.
 * Ignores leads that are Opted Out or Do Not Contact.
 */
export function calculateWeightedPipeline(leads: Lead[]): {
  totalRawValue: number;
  weightedValue: number;
  activeCount: number;
  avgDealSize: number;
} {
  let totalRawValue = 0;
  let weightedValue = 0;
  let activeCount = 0;

  for (const lead of leads) {
    if (lead.status === 'Opted Out' || lead.status === 'Do Not Contact') {
      continue;
    }

    const estValue = extractEstimatedContractValue(lead);
    const prob = STAGE_PROBABILITIES[lead.current_phase] || 0.05;

    totalRawValue += estValue;
    weightedValue += estValue * prob;
    activeCount++;
  }

  const avgDealSize = activeCount > 0 ? totalRawValue / activeCount : 5000;

  return {
    totalRawValue: Math.round(totalRawValue),
    weightedValue: Math.round(weightedValue),
    activeCount,
    avgDealSize: Math.round(avgDealSize),
  };
}

/**
 * Extracts numeric estimated contract value from lead data or assigns default by country/industry.
 */
export function extractEstimatedContractValue(lead: Lead): number {
  if ((lead as any).estContractValue && typeof (lead as any).estContractValue === 'number') {
    return (lead as any).estContractValue;
  }

  // Country multiplier (e.g. Germany/Nordics higher purchasing power than Southern Europe)
  const countryMultiplierMap: Record<string, number> = {
    'Germany': 1.25,
    'Denmark': 1.30,
    'Sweden': 1.25,
    'Norway': 1.35,
    'Netherlands': 1.20,
    'Spain': 0.90,
    'Italy': 0.85,
  };

  const baseValue = 5000;
  const multiplier = countryMultiplierMap[lead.country] || 1.0;
  
  // Phase boost for high maturity leads
  const phaseBonus = lead.current_phase >= 5 ? 1500 : 0;

  return Math.round(baseValue * multiplier + phaseBonus);
}

/**
 * Calculates Monthly Recurring Revenue (MRR), Customer Lifetime Value (LTV),
 * and Customer Acquisition Cost (CAC) based on active client data and finance metrics.
 */
export function calculateFinancialRatios(
  invoices: InvoiceItem[],
  expenses: ExpenseItem[],
  leads: Lead[]
) {
  const paidInvoices = invoices.filter(i => i.status === 'Paid');
  const totalRevenue = paidInvoices.reduce((sum, i) => sum + i.total, 0);

  // Estimated MRR assuming 30% of total revenue is monthly recurring subscriptions
  const estimatedMRR = Math.round((totalRevenue / 12) * 1.5);

  // LTV = Average Contract Value * Average Client Lifespan (24 months)
  const convertedCount = Math.max(1, leads.filter(l => l.status === 'Converted Client' || l.current_phase === 10).length);
  const avgContractVal = totalRevenue > 0 ? totalRevenue / convertedCount : 6500;
  const estimatedLTV = Math.round(avgContractVal * 1.8);

  // CAC = Total Marketing/Sales Expenses / Total Converted Clients
  const marketingExp = expenses
    .filter(e => e.category === 'Marketing' || e.category === 'Software Subscriptions')
    .reduce((sum, e) => sum + e.amount, 0);

  const estimatedCAC = Math.round((marketingExp + 1200) / convertedCount);

  return {
    mrr: estimatedMRR,
    ltv: estimatedLTV,
    cac: estimatedCAC,
    ltvCacRatio: (estimatedLTV / (estimatedCAC || 1)).toFixed(1),
  };
}

/**
 * Calculates Lead Quality Score (0 - 100) based on:
 * - Customer Rating & Review Count
 * - Online Presence Completeness
 * - Target Country Purchasing Power
 * - Time Decay (Older uncontacted leads lose points)
 */
export function calculateDynamicLeadScore(lead: Lead): number {
  let score = 50;

  // 1. Customer Reviews parse
  if (lead.metrics?.customer_reviews) {
    const ratingMatch = lead.metrics.customer_reviews.match(/([\d\.]+)\/5/);
    if (ratingMatch) {
      const stars = parseFloat(ratingMatch[1]);
      if (stars >= 4.5) score += 15;
      else if (stars >= 4.0) score += 10;
      else if (stars < 3.0) score -= 10;
    }

    const reviewCountMatch = lead.metrics.customer_reviews.match(/(\d+)\s*reviews/i);
    if (reviewCountMatch) {
      const count = parseInt(reviewCountMatch[1], 10);
      if (count > 100) score += 10;
      else if (count > 30) score += 5;
    }
  }

  // 2. Presence completeness
  if (lead.presence) {
    let presenceCount = 0;
    if (lead.website_link) presenceCount++;
    if (lead.presence.google_business?.exists) presenceCount++;
    if (lead.presence.facebook?.exists) presenceCount++;
    if (lead.presence.linkedin?.exists) presenceCount++;
    score += presenceCount * 3;
  }

  // 3. Country priority
  if (['Germany', 'Denmark', 'Netherlands', 'Sweden', 'Norway'].includes(lead.country)) {
    score += 10;
  }

  // 4. Contact Info
  if (lead.contact?.email && lead.contact.email.includes('@')) score += 10;
  if (lead.contact?.contact_number) score += 5;

  // 5. Time Decay (If last_contact_date > 60 days ago)
  if (lead.last_contact_date) {
    const daysSince = (Date.now() - new Date(lead.last_contact_date).getTime()) / (1000 * 60 * 60 * 24);
    if (daysSince > 60) score -= 15;
    else if (daysSince > 30) score -= 5;
  }

  // Cap between 10 and 99
  return Math.min(99, Math.max(10, Math.round(score)));
}

/**
 * Normalizes business name for fuzzy matching & duplicate detection.
 * Removes legal entity suffixes (GmbH, B.V., Ltd, Inc, S.A., S.L.), trailing spaces, and punctuation.
 */
export function normalizeBusinessName(name: string): string {
  if (!name) return '';
  return name
    .toLowerCase()
    .replace(/\b(gmbh|b\.v\.|bv|ltd|limited|inc|incorporated|s\.a\.|s\.l\.|ag|corp|co\.)\b/gi, '')
    .replace(/[^a-z0-9]/g, '')
    .trim();
}

/**
 * Normalizes phone numbers into numeric digits only.
 */
export function normalizePhone(phone: string): string {
  if (!phone) return '';
  return phone.replace(/\D/g, '');
}

/**
 * Checks if a candidate lead is a duplicate of an existing list of leads.
 */
export function isDuplicateLead(candidate: Partial<Lead>, existingLeads: Lead[]): {
  isDuplicate: boolean;
  matchingLead?: Lead;
  reason?: string;
} {
  const normName = normalizeBusinessName(candidate.business_name || '');
  const candidateEmail = (candidate.contact?.email || '').toLowerCase().trim();
  const candidatePhone = normalizePhone(candidate.contact?.contact_number || '');

  for (const lead of existingLeads) {
    // 1. Email match
    if (candidateEmail && lead.contact?.email && lead.contact.email.toLowerCase().trim() === candidateEmail) {
      return { isDuplicate: true, matchingLead: lead, reason: `Matching email (${candidateEmail})` };
    }

    // 2. Business Name + Country match
    const leadNormName = normalizeBusinessName(lead.business_name);
    if (normName && leadNormName && normName === leadNormName && candidate.country === lead.country) {
      return { isDuplicate: true, matchingLead: lead, reason: `Matching business name (${lead.business_name}) in ${lead.country}` };
    }

    // 3. Phone match
    const leadPhone = normalizePhone(lead.contact?.contact_number || '');
    if (candidatePhone && leadPhone && candidatePhone.length >= 7 && candidatePhone === leadPhone) {
      return { isDuplicate: true, matchingLead: lead, reason: `Matching phone number (${candidate.contact?.contact_number})` };
    }
  }

  return { isDuplicate: false };
}

/**
 * Calculates phase-by-phase realistic funnel conversion rates and drop-offs.
 */
export function calculateFunnelMetrics(leads: Lead[]) {
  const phaseCounts: Record<PipelinePhase, number> = {
    1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0
  };

  for (const lead of leads) {
    // Lead has reached or passed current_phase
    for (let p = 1; p <= lead.current_phase; p++) {
      phaseCounts[p as PipelinePhase]++;
    }
  }

  const funnelSteps = Array.from({ length: 10 }, (_, i) => {
    const phase = (i + 1) as PipelinePhase;
    const reached = phaseCounts[phase];
    const prevReached = i === 0 ? leads.length : phaseCounts[i as PipelinePhase];
    const conversionRate = prevReached > 0 ? Math.round((reached / prevReached) * 100) : 0;
    const dropOffRate = 100 - conversionRate;

    return {
      phase,
      count: reached,
      conversionRate,
      dropOffRate,
    };
  });

  return funnelSteps;
}

/**
 * Triggers a GDPR Data Export JSON download for a lead.
 */
export function exportLeadGDPRData(lead: Lead) {
  const exportPayload = {
    gdpr_export_date: new Date().toISOString(),
    data_controller: 'WorkNet Devs Global B.V.',
    lead_details: lead,
    compliance_notes: 'Exported under GDPR Article 20 (Right to Data Portability)',
  };

  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportPayload, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `gdpr-export-${lead.business_name.toLowerCase().replace(/[^a-z0-9]/g, '_')}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}
