import React, { useState } from 'react';
import { Server, CheckCircle2, Copy, Check, ShieldCheck, Terminal, Layers, Code2 } from 'lucide-react';

export const InfraGuideSection: React.FC = () => {
  const [copiedScript, setCopiedScript] = useState(false);

  const APPS_SCRIPT_CODE = `/**
 * Work.net Devs - Google Apps Script Time-Driven Email Scheduler ($0/mo)
 * Attach this script to your Google Sheet Master Database
 */

function sendScheduledOutboundEmails() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Leads_Master");
  if (!sheet) return;
  
  var data = sheet.getDataRange().getValues();
  var today = new Date();
  
  // Gmail daily limit safety check (max 45 emails per trigger run)
  var sentCount = 0;
  
  for (var i = 1; i < data.length; i++) {
    var lead = data[i];
    var email = lead[6]; // Email column
    var status = lead[18]; // Status column
    var phase = lead[17]; // Phase column
    var businessName = lead[1];
    var contactPerson = lead[12];
    
    if (status === "Queued" && sentCount < 5) {
      var subject = businessName + " - Immediate Growth Opportunity Found";
      var body = "Dear " + contactPerson + ",\\n\\n" +
                 "At Work.net Devs, we analyzed " + businessName + "'s current digital presence...\\n\\n" +
                 "Best regards,\\nWork.net Devs Team";
                 
      // Send via free Gmail service
      GmailApp.sendEmail(email, subject, body);
      
      // Update sheet status
      sheet.getRange(i + 1, 19).setValue("Phase " + phase + ": Email Sent");
      sheet.getRange(i + 1, 20).setValue(new Date().toISOString());
      
      sentCount++;
    }
  }
}

// Create Time-Driven Trigger for 09:30 AM CET
function createDailyTrigger() {
  ScriptApp.newTrigger("sendScheduledOutboundEmails")
    .timeBased()
    .atHour(9)
    .nearMinute(30)
    .everyDays(1)
    .create();
}`;

  const handleCopyScript = () => {
    navigator.clipboard.writeText(APPS_SCRIPT_CODE);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl text-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-1">
            <Server className="w-4 h-4" />
            <span>Forever Free Enterprise Architecture</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            $0 / Month Cloud & Automation Infrastructure
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
            Detailed architecture guide for running the Work.net Devs Lead Generation System with zero ongoing server costs using Google Cloud, Workspace, and n8n.
          </p>
        </div>
        <div className="bg-emerald-900/60 border border-emerald-500/50 rounded-xl px-4 py-2 font-mono text-emerald-300 font-bold text-sm text-center shadow-sm">
          Total Cost: $0.00 / month (Forever)
        </div>
      </div>

      {/* 3 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* GCP Free Tier */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3 shadow-sm text-slate-800">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <div className="bg-indigo-50 text-indigo-700 p-2 rounded-lg border border-indigo-100">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-slate-900 text-sm">Google Cloud Platform ($0)</h2>
              <span className="text-[10px] text-emerald-700 font-mono font-bold">Always Free Tier</span>
            </div>
          </div>
          <ul className="text-xs text-slate-700 space-y-2 font-mono">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Cloud Run: 2M free requests/mo</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Compute Engine: e2-micro instance</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Firestore: 1 GB free document storage</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Cloud Storage: 5 GB free assets</span>
            </li>
          </ul>
        </div>

        {/* Google Workspace Free Tier */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3 shadow-sm text-slate-800">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <div className="bg-emerald-50 text-emerald-700 p-2 rounded-lg border border-emerald-100">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-slate-900 text-sm">Google Workspace ($0)</h2>
              <span className="text-[10px] text-emerald-700 font-mono font-bold">Native Integration</span>
            </div>
          </div>
          <ul className="text-xs text-slate-700 space-y-2 font-mono">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Gmail: 48 outbound emails/day</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Google Sheets: Zero-cost Database</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Apps Script: Time-driven triggers</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Looker Studio: Free KPI Dashboards</span>
            </li>
          </ul>
        </div>

        {/* Open Source Dev Tools */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3 shadow-sm text-slate-800">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <div className="bg-purple-50 text-purple-700 p-2 rounded-lg border border-purple-100">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-slate-900 text-sm">Open Source Tools ($0)</h2>
              <span className="text-[10px] text-emerald-700 font-mono font-bold">Self-Hosted</span>
            </div>
          </div>
          <ul className="text-xs text-slate-700 space-y-2 font-mono">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>n8n: Open-source workflow automation</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>VS Code & GitHub Private Repos</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Gemini 3.6 Flash Server Integration</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyable Google Apps Script Code */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4 shadow-sm text-slate-800">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-indigo-600" />
            <h2 className="font-bold text-slate-900 text-sm">Google Apps Script Outbound Trigger Script</h2>
          </div>
          <button
            onClick={handleCopyScript}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all shadow-sm shadow-indigo-200 cursor-pointer"
          >
            {copiedScript ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedScript ? 'Copied to Clipboard' : 'Copy Apps Script'}</span>
          </button>
        </div>

        <pre className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs font-mono text-emerald-400 overflow-x-auto max-h-72 leading-relaxed shadow-inner">
          {APPS_SCRIPT_CODE}
        </pre>
      </div>

      {/* Production Deployment Commands */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl text-slate-100 space-y-4 font-mono text-xs">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <h2 className="font-bold text-white text-sm">Complete Google Cloud & Docker Deployment Commands</h2>
          </div>
          <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 px-2.5 py-0.5 rounded text-[10px] font-bold">
            100% Free Forever Tier
          </span>
        </div>

        <div className="space-y-3">
          <div>
            <div className="text-slate-400 text-[11px] mb-1"># 1. Install Google Cloud SDK & Create Free e2-micro VM</div>
            <pre className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-emerald-400 overflow-x-auto">
{`curl https://sdk.cloud.google.com | bash
exec -l $SHELL
gcloud init

gcloud compute instances create lead-generator \\
    --machine-type=e2-micro \\
    --zone=us-central1-a \\
    --image-family=ubuntu-2004-lts \\
    --image-project=ubuntu-os-cloud \\
    --boot-disk-size=30GB`}
            </pre>
          </div>

          <div>
            <div className="text-slate-400 text-[11px] mb-1"># 2. SSH into VM & Install Docker + Self-Hosted n8n Workflow Container</div>
            <pre className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-emerald-400 overflow-x-auto">
{`gcloud compute ssh lead-generator --zone=us-central1-a

sudo apt-get update && sudo apt-get install docker.io docker-compose python3-pip -y

docker run -d --restart=always \\
    --name n8n \\
    -p 5678:5678 \\
    -v ~/.n8n:/home/node/.n8n \\
    n8nio/n8n

pip3 install beautifulsoup4 requests pandas openpyxl google-cloud-firestore google-auth`}
            </pre>
          </div>

          <div>
            <div className="text-slate-400 text-[11px] mb-1"># 3. Deploy Lead Service to Google Cloud Run (Serverless Auto-scale to 0)</div>
            <pre className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-emerald-400 overflow-x-auto">
{`gcloud run deploy lead-service \\
    --source . \\
    --platform managed \\
    --region us-central1 \\
    --memory 512Mi \\
    --cpu 1 \\
    --concurrency 80 \\
    --max-instances 3 \\
    --min-instances 0 \\
    --timeout 60`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
