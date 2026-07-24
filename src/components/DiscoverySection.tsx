import React, { useState } from 'react';
import { KeywordSuggestion, Lead } from '../types';
import { 
  Search, 
  Sparkles, 
  CheckSquare, 
  Square, 
  Play, 
  MapPin, 
  Building2, 
  Sliders, 
  CheckCircle2, 
  Loader2, 
  Database,
  ArrowRight,
  Compass
} from 'lucide-react';

interface DiscoverySectionProps {
  onAddLeads: (newLeads: Lead[]) => void;
  onLog: (msg: string, level?: 'info' | 'success' | 'warn' | 'error') => void;
}

const EUROPEAN_REGIONS = [
  { name: 'Berlin, Germany', country: 'Germany' },
  { name: 'Munich, Germany', country: 'Germany' },
  { name: 'Amsterdam, Netherlands', country: 'Netherlands' },
  { name: 'Rotterdam, Netherlands', country: 'Netherlands' },
  { name: 'Madrid, Spain', country: 'Spain' },
  { name: 'Barcelona, Spain', country: 'Spain' },
  { name: 'Copenhagen, Denmark', country: 'Denmark' },
  { name: 'Stockholm, Sweden', country: 'Sweden' },
  { name: 'Helsinki, Finland', country: 'Finland' },
  { name: 'Brussels, Belgium', country: 'Belgium' },
  { name: 'Vienna, Austria', country: 'Austria' },
  { name: 'Tallinn, Estonia', country: 'Estonia' },
];

export const DiscoverySection: React.FC<DiscoverySectionProps> = ({ onAddLeads, onLog }) => {
  // Input State
  const [kw1, setKw1] = useState('Hair Dresser Salon');
  const [kw2, setKw2] = useState('Beauty Parlor & Spa');
  const [kw3, setKw3] = useState('Skincare & Aesthetic Center');
  const [targetArea, setTargetArea] = useState('Berlin, Germany');
  const [customArea, setCustomArea] = useState('');

  // AI Keyword State
  const [isGeneratingKw, setIsGeneratingKw] = useState(false);
  const [suggestions, setSuggestions] = useState<KeywordSuggestion[]>([]);
  const [selectedKw, setSelectedKw] = useState<string[]>([]);

  // Scraper State
  const [isScraping, setIsScraping] = useState(false);
  const [scraperProgress, setScraperProgress] = useState(0);
  const [extractedLeads, setExtractedLeads] = useState<Lead[]>([]);

  // Single Business Deep Scraper State
  const [singleBizName, setSingleBizName] = useState('Shan Rahimkhan Coiffure & Beauty');
  const [singleBizUrl, setSingleBizUrl] = useState('https://shanrahimkhan.de');
  const [isSingleScraping, setIsSingleScraping] = useState(false);

  const activeArea = customArea.trim() || targetArea;
  const currentCountry = EUROPEAN_REGIONS.find(r => r.name === targetArea)?.country || 'Germany';

  // Step 1: Generate 10 Related Keywords via Gemini AI
  const handleGenerateKeywords = async () => {
    setIsGeneratingKw(true);
    onLog(`Generating 10 AI B2B search keywords for initial inputs: "${kw1}", "${kw2}", "${kw3}" in "${activeArea}"...`, 'info');
    
    try {
      const response = await fetch('/api/keywords/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          initial_keywords: [kw1, kw2, kw3].filter(Boolean),
          target_area: activeArea
        })
      });

      const data = await response.json();
      if (data.suggestions && Array.isArray(data.suggestions)) {
        setSuggestions(data.suggestions);
        // Pre-select first 5 keywords
        const first5 = data.suggestions.slice(0, 5).map((s: KeywordSuggestion) => s.keyword);
        setSelectedKw(first5);
        onLog(`Generated 10 AI keywords successfully! Pre-selected 5 keywords.`, 'success');
      }
    } catch (err) {
      onLog(`Failed generating keywords: ${err}`, 'error');
    } finally {
      setIsGeneratingKw(false);
    }
  };

  // Toggle Keyword Selection (must select exactly 5 or up to 5)
  const toggleKeyword = (kw: string) => {
    if (selectedKw.includes(kw)) {
      setSelectedKw(selectedKw.filter(k => k !== kw));
    } else {
      if (selectedKw.length >= 5) {
        onLog('You can select up to 5 keywords for optimal binary search scraping precision.', 'warn');
        return;
      }
      setSelectedKw([...selectedKw, kw]);
    }
  };

  // Step 2: Two-Pass Deep Scraper Execution
  const handleRunBinaryScraper = async () => {
    if (selectedKw.length === 0) {
      onLog('Please select at least 1 keyword before running the deep search scraper.', 'warn');
      return;
    }

    setIsScraping(true);
    setScraperProgress(10);
    onLog(`[Pass 1: Discovery] Querying Google Business Profile, Maps & Trade Registries for ${activeArea}...`, 'info');

    // Progress timer
    const timer = setInterval(() => {
      setScraperProgress((prev) => {
        if (prev === 40) {
          onLog(`[Pass 2: Deep Crawl] Crawling discovered business websites (/imprint, /contact, /about, /team) & social networks...`, 'info');
        }
        if (prev >= 90) {
          clearInterval(timer);
          return 90;
        }
        return prev + 20;
      });
    }, 450);

    try {
      const response = await fetch('/api/scraper/binary-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          keywords: selectedKw,
          target_area: activeArea,
          country: currentCountry
        })
      });

      const data = await response.json();
      clearInterval(timer);
      setScraperProgress(100);

      if (data.leads && Array.isArray(data.leads)) {
        setExtractedLeads(data.leads);
        onAddLeads(data.leads);
        onLog(`Two-Pass Deep Scraper complete! Extracted ${data.leads.length} qualified leads conforming to full 25+ business_data_schema fields!`, 'success');
      }
    } catch (err) {
      clearInterval(timer);
      onLog(`Scraper execution error: ${err}`, 'error');
    } finally {
      setTimeout(() => setIsScraping(false), 500);
    }
  };

  // Targeted Single Business Pass 2 Deep Scrape
  const handleSingleDeepScrape = async () => {
    if (!singleBizName.trim() || !singleBizUrl.trim()) {
      onLog('Please enter a valid business name and website URL for targeted deep scraping.', 'warn');
      return;
    }

    setIsSingleScraping(true);
    onLog(`[Targeted Pass 2 Deep Scrape] Executing specific crawl on "${singleBizName}" (${singleBizUrl})...`, 'info');

    try {
      const response = await fetch('/api/scraper/deep-rescrape-single', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          business_name: singleBizName,
          website_link: singleBizUrl,
          target_area: activeArea,
          country: currentCountry
        })
      });

      const data = await response.json();
      if (data.success && data.lead) {
        setExtractedLeads(prev => [data.lead, ...prev]);
        onAddLeads([data.lead]);
        onLog(`Deep Scrape successful for "${data.lead.business_name}"! Full 25+ business_data_schema fields added to Master CRM!`, 'success');
      }
    } catch (err) {
      onLog(`Targeted deep scrape failed: ${err}`, 'error');
    } finally {
      setIsSingleScraping(false);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl text-slate-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-1">
              <Compass className="w-4 h-4" />
              <span>Phase 1: Discovery Engine & Smart Scraper</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Keyword Generation & Binary Search Scraper
            </h1>
            <p className="text-slate-300 text-sm mt-1 max-w-3xl">
              Automates European B2B target discovery using AI keyword expansion, regional business registries (Loqate, Company.info, Camerdata, CVR Register), and 25+ attribute deep scraping.
            </p>
          </div>
          <div className="bg-slate-900/90 border border-slate-700/60 rounded-xl p-3 text-xs space-y-1 font-mono text-slate-300 shadow-inner">
            <div className="text-indigo-300 font-semibold mb-1">Scraper Config:</div>
            <div>• Rate Limit: 1 req/min</div>
            <div>• Search Depth: 30 pages</div>
            <div>• Timeout: 3000ms</div>
          </div>
        </div>
      </div>

      {/* Input Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Step 1 Form: Keywords & Target Area */}
        <div className="lg:col-span-1 bg-white border border-slate-200 rounded-xl p-5 space-y-4 shadow-sm text-slate-800">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <div className="bg-indigo-50 text-indigo-700 w-7 h-7 rounded-lg flex items-center justify-center font-bold text-sm border border-indigo-200">
              1
            </div>
            <div>
              <h2 className="font-semibold text-slate-900 text-sm">Input Initial Keywords</h2>
              <p className="text-slate-500 text-xs">Enter 3 core business keywords</p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Keyword 1</label>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={kw1}
                  onChange={(e) => setKw1(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                  placeholder="e.g. digital marketing"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Keyword 2</label>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={kw2}
                  onChange={(e) => setKw2(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                  placeholder="e.g. SaaS"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Keyword 3</label>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={kw3}
                  onChange={(e) => setKw3(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                  placeholder="e.g. B2B services"
                />
              </div>
            </div>

            <div className="pt-2">
              <label className="block text-xs font-medium text-slate-700 mb-1">Target European Area</label>
              <div className="relative mb-2">
                <MapPin className="w-4 h-4 text-indigo-600 absolute left-3 top-2.5" />
                <select
                  value={targetArea}
                  onChange={(e) => {
                    setTargetArea(e.target.value);
                    setCustomArea('');
                  }}
                  className="w-full bg-white border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                >
                  {EUROPEAN_REGIONS.map((r) => (
                    <option key={r.name} value={r.name}>
                      {r.name} ({r.country})
                    </option>
                  ))}
                </select>
              </div>

              <input
                type="text"
                value={customArea}
                onChange={(e) => setCustomArea(e.target.value)}
                placeholder="Or type custom city/region (e.g. Cologne, Germany)"
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm placeholder-slate-400"
              />
            </div>

            <button
              id="btn-generate-keywords"
              onClick={handleGenerateKeywords}
              disabled={isGeneratingKw}
              className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-sm shadow-indigo-200 cursor-pointer disabled:opacity-50"
            >
              {isGeneratingKw ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Analyzing Search Volumes...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate 10 Related Keywords</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Step 2: Generated Keyword Selector */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-5 space-y-4 shadow-sm flex flex-col justify-between text-slate-800">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="bg-indigo-50 text-indigo-700 w-7 h-7 rounded-lg flex items-center justify-center font-bold text-sm border border-indigo-200">
                  2
                </div>
                <div>
                  <h2 className="font-semibold text-slate-900 text-sm">AI Keyword Suggestions ({suggestions.length})</h2>
                  <p className="text-slate-500 text-xs">Select exactly 5 keywords for binary search scraping</p>
                </div>
              </div>
              <div className="bg-slate-100 border border-slate-200 px-3 py-1 rounded-full text-xs font-mono text-slate-700">
                Selected: <span className="text-indigo-600 font-bold">{selectedKw.length}</span> / 5
              </div>
            </div>

            {suggestions.length === 0 ? (
              <div className="py-12 text-center text-slate-400 space-y-3">
                <Search className="w-10 h-10 mx-auto text-slate-300 stroke-1" />
                <p className="text-xs">Click "Generate 10 Related Keywords" to produce commercial intent suggestions.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 mt-4 max-h-[320px] overflow-y-auto pr-1">
                {suggestions.map((item, idx) => {
                  const isSelected = selectedKw.includes(item.keyword);
                  return (
                    <div
                      key={idx}
                      onClick={() => toggleKeyword(item.keyword)}
                      className={`p-3 rounded-lg border cursor-pointer transition-all flex items-start gap-3 ${
                        isSelected
                          ? 'bg-indigo-50/80 border-indigo-500 text-indigo-950 shadow-sm'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <div className="mt-0.5">
                        {isSelected ? (
                          <CheckSquare className="w-4 h-4 text-indigo-600" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-400" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-xs truncate">{item.keyword}</div>
                        <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-500 font-mono">
                          <span className="bg-white border border-slate-200 px-1.5 py-0.5 rounded text-indigo-700 font-medium">{item.intent_type}</span>
                          <span>Vol: {item.search_volume}</span>
                          <span className={item.competition === 'High' ? 'text-amber-600 font-medium' : 'text-emerald-600 font-medium'}>
                            Comp: {item.competition}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Execute Scraper Button */}
          {suggestions.length > 0 && (
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-slate-500 font-mono">
                Scraper Target: <strong className="text-slate-800">{activeArea}</strong> | Sources: Google Business, LinkedIn, Loqate
              </div>
              <button
                id="btn-run-scraper"
                onClick={handleRunBinaryScraper}
                disabled={isScraping || selectedKw.length === 0}
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs py-2.5 px-6 rounded-lg flex items-center justify-center gap-2 transition-all shadow-sm shadow-emerald-200 cursor-pointer disabled:opacity-50"
              >
                {isScraping ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Scraping Binary Search ({scraperProgress}%)...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-white" />
                    <span>Run Smart Binary Search Scraper</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Progress Bar during scraping */}
      {isScraping && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-800 font-mono">
            <div className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
              <span className="font-bold">
                {scraperProgress < 50
                  ? '[Pass 1] Discovering Business Listings (Google Maps & Trade Registries)...'
                  : '[Pass 2] Deep Crawling Website (/imprint, /about, /contact) & Extracting 25+ Schema Fields...'}
              </span>
            </div>
            <span className="font-bold text-indigo-600 text-sm">{scraperProgress}%</span>
          </div>
          <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden border border-slate-200">
            <div
              className="bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 h-full transition-all duration-300 ease-out"
              style={{ width: `${scraperProgress}%` }}
            />
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-500 pt-1">
            <div className={scraperProgress >= 10 ? 'text-indigo-700 font-semibold flex items-center gap-1' : 'text-slate-400'}>
              ✓ Pass 1: Broad Keyword Listing Discovery
            </div>
            <div className={scraperProgress >= 50 ? 'text-indigo-700 font-semibold flex items-center gap-1' : 'text-slate-400'}>
              ✓ Pass 2: Specific Business Name & Sub-Page Web Crawl
            </div>
          </div>
        </div>
      )}

      {/* Targeted Single Business Deep Scraper Tool */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl text-slate-100 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Pass 2 Targeted Deep Scraper</span>
            </div>
            <h2 className="text-lg font-bold text-white">Targeted Single Business Deep Web Crawl</h2>
            <p className="text-slate-300 text-xs mt-0.5">
              Discovered a business from Google or another listing? Enter its specific name & website URL below to execute a deep web crawl across their `/about`, `/contact`, `/imprint` & social profiles.
            </p>
          </div>
          <span className="bg-emerald-950 border border-emerald-800 text-emerald-300 font-mono text-[10px] px-3 py-1 rounded-full font-bold self-start sm:self-auto">
            Schema: business_data_schema (25+ Fields)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">Business Name</label>
            <input
              type="text"
              value={singleBizName}
              onChange={(e) => setSingleBizName(e.target.value)}
              placeholder="e.g. Nordic Tech Solutions GmbH"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-indigo-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">Website URL</label>
            <input
              type="text"
              value={singleBizUrl}
              onChange={(e) => setSingleBizUrl(e.target.value)}
              placeholder="e.g. https://nordictech.de"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-indigo-500 font-mono"
            />
          </div>

          <div className="flex items-end">
            <button
              id="btn-single-deep-scrape"
              onClick={handleSingleDeepScrape}
              disabled={isSingleScraping || !singleBizName || !singleBizUrl}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-md shadow-indigo-950 cursor-pointer disabled:opacity-50"
            >
              {isSingleScraping ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Deep Crawling Domain...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>Run Targeted Pass 2 Deep Scrape</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Schema Reference Accordion / Pill list */}
        <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3 text-[11px] font-mono text-slate-400 space-y-1">
          <div className="text-indigo-400 font-semibold text-xs mb-1">Full 25+ business_data_schema Extracted Fields:</div>
          <div className="flex flex-wrap gap-1.5 text-[10px]">
            <span className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-emerald-400">business_name</span>
            <span className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-emerald-400">website_link</span>
            <span className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-emerald-400">business_industry</span>
            <span className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-indigo-300">facebook</span>
            <span className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-indigo-300">linkedin</span>
            <span className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-indigo-300">instagram</span>
            <span className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-indigo-300">google_business</span>
            <span className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-indigo-300">trustpilot</span>
            <span className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-amber-300">physical_address</span>
            <span className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-amber-300">contact_number</span>
            <span className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-amber-300">email</span>
            <span className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-amber-300">vat_number</span>
            <span className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-purple-300">owner_details</span>
            <span className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-purple-300">manager_details</span>
            <span className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-purple-300">responsible_person</span>
            <span className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-sky-300">key_context</span>
            <span className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-sky-300">key_strategy</span>
            <span className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-sky-300">annual_revenue</span>
            <span className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-sky-300">business_scale</span>
            <span className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-sky-300">establishment_year</span>
            <span className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-rose-300">customer_reviews</span>
            <span className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-rose-300">business_system_rating</span>
            <span className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-rose-300">system_remark</span>
          </div>
        </div>
      </div>

      {/* Extracted Leads Preview Table */}
      {extractedLeads.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Extracted Business Leads ({extractedLeads.length})</h3>
                <p className="text-slate-500 text-xs">Full 25+ Schema Enriched Leads added to Master CRM</p>
              </div>
            </div>
            <div className="text-xs text-emerald-700 font-mono bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 font-semibold">
              Synced to Master CRM
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-500 font-mono text-[10px] font-bold uppercase border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Business Name</th>
                  <th className="py-2.5 px-3">Industry</th>
                  <th className="py-2.5 px-3">Location & Registry</th>
                  <th className="py-2.5 px-3">Decision Maker</th>
                  <th className="py-2.5 px-3">Email Contact</th>
                  <th className="py-2.5 px-3">Revenue & Scale</th>
                  <th className="py-2.5 px-3">Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans">
                {extractedLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 px-3 font-semibold text-slate-900">
                      <div>{lead.business_name}</div>
                      <a href={lead.website_link} target="_blank" rel="noreferrer" className="text-[10px] text-indigo-600 hover:underline">
                        {lead.website_link}
                      </a>
                    </td>
                    <td className="py-2.5 px-3 text-slate-600">{lead.business_industry}</td>
                    <td className="py-2.5 px-3">
                      <div className="font-medium text-slate-800">{lead.target_area}</div>
                      <span className="text-[10px] text-slate-400 font-mono">{lead.regional_data_source}</span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-800 font-medium">{lead.personnel.responsible_person}</td>
                    <td className="py-2.5 px-3 font-mono text-indigo-700 font-medium">{lead.contact.email}</td>
                    <td className="py-2.5 px-3">
                      <span className="bg-slate-100 text-slate-700 border border-slate-200 px-2 py-0.5 rounded text-[10px] font-mono">
                        {lead.intelligence.annual_revenue}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-mono text-emerald-600 font-bold">{lead.score}/100</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
