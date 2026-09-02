'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { mockReports } from '@/lib/mockReports';
import { 
  Sprout, 
  LineChart, 
  Layers, 
  CheckSquare, 
  Calendar, 
  Radio, 
  UploadCloud,
  FileText,
  CheckCircle,
  AlertTriangle,
  Info,
  ArrowRight,
  TrendingDown,
  Droplet,
  Layers3
} from 'lucide-react';
import axios from 'axios';

export default function DiagnosticsDashboard() {
  const [activeReport, setActiveReport] = useState(null);
  const [currentTime, setCurrentTime] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const fileInputRef = useRef(null);

  // Set initial clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleSelectMockReport = (reportId) => {
    setLoading(true);
    setUploadedFile(null);
    setTimeout(() => {
      const report = mockReports.find(r => r.id === reportId);
      setActiveReport(report);
      setLoading(false);
    }, 600);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = async (file) => {
    setLoading(true);
    setUploadedFile(file.name);
    
    const reader = new FileReader();
    reader.onload = async (event) => {
      const textContent = event.target.result;
      
      try {
        // Post to backend API to parse
        const res = await axios.post('http://localhost:5000/api/diagnostics/analyze', {
          text: textContent,
          fileName: file.name
        });
        
        setActiveReport(res.data);
      } catch (err) {
        console.warn('Backend parse failed, falling back to client-side parse:', err);
        
        // Client side parsing fallback
        const lowerText = textContent.toLowerCase();
        let ph = 6.5;
        let n = "Medium";
        let p = "Medium";
        let k = "Medium";
        let verdict = "Soil chemistry processed.";
        let advisories = [];

        if (lowerText.includes('acidic') || (lowerText.match(/ph\s*:\s*([0-5]\.[0-9])/i))) {
          ph = 5.2;
          n = "Low";
          p = "Low";
          k = "Low";
          verdict = "Acidic Soil with NPK Deficiencies (Client-Side Parse)";
          advisories = mockReports.find(r => r.id === "acidic_low_npk.txt").parsed.advisories;
        } else if (lowerText.includes('alkaline') || lowerText.includes('saline') || (lowerText.match(/ph\s*:\s*([8-9]\.[0-9])/i))) {
          ph = 8.5;
          n = "Medium";
          p = "High";
          k = "Low";
          verdict = "Alkaline Soil with High Salinity (Client-Side Parse)";
          advisories = mockReports.find(r => r.id === "alkaline_saline.txt").parsed.advisories;
        } else {
          // Default to optimal
          ph = 6.8;
          n = "High";
          p = "Medium";
          k = "High";
          verdict = "Optimal Soil Profile (Client-Side Parse)";
          advisories = mockReports.find(r => r.id === "optimal_soil_report.txt").parsed.advisories;
        }

        setActiveReport({
          id: file.name,
          name: file.name,
          rawText: textContent,
          parsed: {
            ph,
            phStatus: ph < 6.0 ? "Acidic" : ph > 7.5 ? "Alkaline" : "Optimal",
            nitrogen: n,
            phosphorus: p,
            potassium: k,
            carbon: "Medium",
            salinity: ph > 8.0 ? "Saline" : "Safe",
            verdict,
            advisories
          }
        });
      } finally {
        setLoading(false);
      }
    };
    reader.readAsText(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'optimal':
      case 'high':
      case 'safe':
        return 'text-emerald-400 bg-emerald-950/30 border-emerald-900/50';
      case 'medium':
        return 'text-amber-400 bg-amber-950/30 border-amber-900/50';
      case 'low':
      case 'deficient':
      case 'acidic':
      case 'alkaline':
      case 'saline':
        return 'text-red-400 bg-red-950/30 border-red-900/50';
      default:
        return 'text-earth-400 bg-earth-950/30 border-border';
    }
  };

  const getVerdictBg = (phStatus) => {
    if (!phStatus) return 'border-border bg-earth-50/10';
    if (phStatus.toLowerCase() === 'optimal') return 'border-emerald-500/30 bg-emerald-950/10 text-emerald-300';
    if (phStatus.toLowerCase() === 'acidic') return 'border-red-500/30 bg-red-950/10 text-red-300';
    return 'border-amber-500/30 bg-amber-950/10 text-amber-300';
  };

  return (
    <div className="w-full min-h-screen bg-[#0a0e0c] text-white">
      {/* Top Advisory Dashboard Header */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-card border border-border rounded-3xl p-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-900/10 rounded-full blur-3xl pointer-events-none"></div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-2xl tracking-tight text-white">AgriHelp</span>
              <span className="bg-primary-600/20 text-primary-400 text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border border-primary-500/20">Mini</span>
            </div>
            <p className="text-xs text-earth-500 mt-1">Smart Advisory Dashboard</p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-earth-500">
            <span className="flex items-center gap-1.5 bg-[#17221b] border border-border px-3 py-1.5 rounded-full text-primary-400">
              <Radio className="h-3 w-3 animate-pulse" /> Sensor Sync Active
            </span>
            <span className="flex items-center gap-1 bg-[#161a18] px-3 py-1.5 rounded-full border border-border">
              <Calendar className="h-3.5 w-3.5" /> {currentTime || 'Loading...'}
            </span>
            <span className="bg-[#161a18] border border-border px-3 py-1.5 rounded-full">
              Regional Station ID: <span className="text-earth-900 dark:text-white font-bold">#302A</span>
            </span>
            <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center font-bold text-primary-700">
              U
            </div>
          </div>
        </div>

        {/* Navigation Tabs bar */}
        <div className="flex flex-wrap border-b border-border mb-8 gap-1.5">
          <Link href="/" className="px-5 py-3.5 font-bold text-sm text-earth-500 hover:text-white flex items-center gap-2 transition-all">
            <Sprout className="h-4 w-4" /> Advisory Hub
          </Link>
          <Link href="/analytics" className="px-5 py-3.5 font-bold text-sm text-earth-500 hover:text-white flex items-center gap-2 transition-all">
            <LineChart className="h-4 w-4" /> Crop Analytics
          </Link>
          <button className="px-5 py-3.5 font-bold text-sm text-primary-500 border-b-2 border-primary-500 bg-primary-500/5 flex items-center gap-2">
            <Layers className="h-4 w-4" /> Soil Diagnostics
          </button>
          <div className="relative group">
            <button className="px-5 py-3.5 font-bold text-sm text-earth-500 opacity-60 cursor-not-allowed flex items-center gap-2">
              <CheckSquare className="h-4 w-4" /> Field Tasks
            </button>
            <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-[#161e1a] border border-border text-[10px] text-earth-400 whitespace-nowrap px-2 py-1 rounded shadow-xl">
              Coming Soon
            </div>
          </div>
        </div>

        {/* Dashboard Content Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Soil Test Report Upload */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-card border border-border rounded-3xl p-6">
              <h3 className="font-bold text-lg dark:text-white mb-2 flex items-center gap-2">
                <UploadCloud className="h-5 w-5 text-primary-500" /> Soil Test Report
              </h3>
              <p className="text-xs text-earth-500 mb-6">Upload a lab-issued soil report (.txt, .json) to analyze chemical attributes and NPK profiles.</p>

              {/* Drag & Drop Area */}
              <div 
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={triggerFileInput}
                className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center min-h-[180px] ${
                  dragOver 
                    ? 'border-primary-500 bg-primary-950/10' 
                    : 'border-border/60 hover:border-primary-800 bg-[#121614]/30'
                }`}
              >
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".txt,.json"
                  className="hidden" 
                />
                
                <UploadCloud className={`h-12 w-12 mb-3 transition-transform ${dragOver ? 'text-primary-400 scale-110' : 'text-earth-500'}`} />
                <span className="text-xs font-bold text-earth-900 dark:text-white">Drag & drop soil report here</span>
                <span className="text-[10px] text-earth-500 mt-1 block">Supports raw text (.txt) or JSON (.json) files</span>
                
                <button 
                  type="button" 
                  className="bg-primary-600 hover:bg-primary-500 text-white text-xs font-bold px-4 py-2 rounded-full mt-4 transition-all shadow-md"
                >
                  Browse Files
                </button>
              </div>

              {/* Uploaded indicator */}
              {uploadedFile && (
                <div className="bg-[#17221b] border border-primary-500/20 rounded-xl p-3 mt-4 flex items-center justify-between animate-fade-in">
                  <div className="flex items-center gap-2 text-xs">
                    <FileText className="h-4 w-4 text-primary-400" />
                    <span className="font-semibold text-earth-900 dark:text-white max-w-[180px] truncate">{uploadedFile}</span>
                  </div>
                  <span className="bg-primary-600/20 text-primary-400 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded">Uploaded</span>
                </div>
              )}

              {/* Saved Soil Test History */}
              <div className="mt-8 border-t border-border/40 pt-6">
                <h4 className="text-xs font-black uppercase tracking-wider text-earth-500 mb-4">Quick-Test Sandbox Samples:</h4>
                <div className="space-y-2">
                  {mockReports.map((report) => (
                    <button
                      key={report.id}
                      onClick={() => handleSelectMockReport(report.id)}
                      className={`w-full flex items-center justify-between p-3.5 border rounded-xl text-left transition-all group ${
                        activeReport?.id === report.id
                          ? 'border-primary-500 bg-primary-600/5'
                          : 'border-border hover:border-earth-800 bg-[#121614]/10'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <FileText className={`h-4.5 w-4.5 transition-colors ${activeReport?.id === report.id ? 'text-primary-400' : 'text-earth-500'}`} />
                        <div>
                          <span className="text-xs font-bold text-earth-900 dark:text-white group-hover:text-primary-400 transition-colors block leading-tight">{report.name}</span>
                          <span className="text-[10px] text-earth-500 block mt-0.5 truncate max-w-[200px]">{report.desc}</span>
                        </div>
                      </div>
                      <ArrowRight className="h-3.5 w-3.5 text-earth-600 group-hover:text-primary-500 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Advisory Feed */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-card border border-border rounded-3xl p-6 min-h-[450px] flex flex-col">
              
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg dark:text-white flex items-center gap-2">
                  <Layers3 className="h-5 w-5 text-primary-500" /> Soil Advisory Feed
                </h3>
                <span className="text-xs font-bold text-earth-500">
                  {loading ? 'Analyzing...' : activeReport ? `${activeReport.parsed.advisories.length} Advisories` : '0 Advisories'}
                </span>
              </div>

              {loading ? (
                <div className="flex-grow flex flex-col items-center justify-center text-center p-12">
                  <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-xs text-earth-500 mt-4 font-semibold">Running chemical matrix diagnostics...</span>
                </div>
              ) : activeReport ? (
                <div className="space-y-6 animate-fade-in flex-grow flex flex-col">
                  
                  {/* Verdict Banner */}
                  <div className={`border-l-4 p-4 rounded-xl flex items-start gap-3 ${getVerdictBg(activeReport.parsed.phStatus)}`}>
                    {activeReport.parsed.phStatus.toLowerCase() === 'optimal' ? (
                      <CheckCircle className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                    )}
                    <div>
                      <h4 className="font-extrabold text-sm uppercase tracking-wide">Diagnosis Verdict</h4>
                      <p className="text-xs font-bold mt-1 text-white">{activeReport.parsed.verdict}</p>
                    </div>
                  </div>

                  {/* Parameter Status Cards Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    {/* pH */}
                    <div className="bg-[#121614]/40 border border-border rounded-xl p-3.5 text-center">
                      <span className="text-[10px] uppercase font-bold text-earth-500 block mb-1">pH Level</span>
                      <span className="text-lg font-black text-white">{activeReport.parsed.ph}</span>
                      <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border block mt-2 text-center truncate ${getStatusColor(activeReport.parsed.phStatus)}`}>
                        {activeReport.parsed.phStatus}
                      </span>
                    </div>

                    {/* Nitrogen */}
                    <div className="bg-[#121614]/40 border border-border rounded-xl p-3.5 text-center">
                      <span className="text-[10px] uppercase font-bold text-earth-500 block mb-1">Nitrogen (N)</span>
                      <span className="text-lg font-black text-white">N</span>
                      <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border block mt-2 text-center truncate ${getStatusColor(activeReport.parsed.nitrogen)}`}>
                        {activeReport.parsed.nitrogen}
                      </span>
                    </div>

                    {/* Phosphorus */}
                    <div className="bg-[#121614]/40 border border-border rounded-xl p-3.5 text-center">
                      <span className="text-[10px] uppercase font-bold text-earth-500 block mb-1">Phosphorus (P)</span>
                      <span className="text-lg font-black text-white">P</span>
                      <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border block mt-2 text-center truncate ${getStatusColor(activeReport.parsed.phosphorus)}`}>
                        {activeReport.parsed.phosphorus}
                      </span>
                    </div>

                    {/* Potassium */}
                    <div className="bg-[#121614]/40 border border-border rounded-xl p-3.5 text-center">
                      <span className="text-[10px] uppercase font-bold text-earth-500 block mb-1">Potassium (K)</span>
                      <span className="text-lg font-black text-white">K</span>
                      <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border block mt-2 text-center truncate ${getStatusColor(activeReport.parsed.potassium)}`}>
                        {activeReport.parsed.potassium}
                      </span>
                    </div>

                    {/* Carbon */}
                    <div className="bg-[#121614]/40 border border-border rounded-xl p-3.5 text-center col-span-2 sm:col-span-1">
                      <span className="text-[10px] uppercase font-bold text-earth-500 block mb-1">Org. Carbon</span>
                      <span className="text-lg font-black text-white">C</span>
                      <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border block mt-2 text-center truncate ${getStatusColor(activeReport.parsed.carbon)}`}>
                        {activeReport.parsed.carbon}
                      </span>
                    </div>
                  </div>

                  {/* Detailed Advisory Guidelines */}
                  <div className="space-y-3 mt-4 flex-grow">
                    <h4 className="text-xs font-black uppercase tracking-wider text-earth-500 mb-2">Advisory Directives:</h4>
                    {activeReport.parsed.advisories.map((advisory) => (
                      <div 
                        key={advisory.id} 
                        className="bg-[#111613] border border-border rounded-2xl p-4 flex gap-3.5 items-start hover:border-primary-500/20 transition-all group"
                      >
                        <div className="w-8 h-8 rounded-full bg-primary-900/35 border border-primary-800 text-primary-400 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                          {advisory.id}
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase tracking-wider font-black text-primary-400 block">{advisory.category}</span>
                          <p className="text-xs text-earth-500 dark:text-earth-400 leading-relaxed group-hover:text-white transition-colors">{advisory.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              ) : (
                <div className="flex-grow flex flex-col items-center justify-center text-center p-8 bg-earth-50/5 border border-border border-dashed rounded-2xl">
                  <Layers className="h-12 w-12 text-earth-600 mb-4" />
                  <h4 className="text-base font-bold text-white mb-1">No Soil Report Active</h4>
                  <p className="text-xs text-earth-500 max-w-sm leading-relaxed mb-6">Upload a laboratory soil report document or click a quick-test sandbox sample in the left column to run chemical diagnostics.</p>
                  
                  <div className="bg-[#161a18] border border-border px-4 py-3 rounded-2xl flex items-start gap-2 max-w-sm text-left">
                    <Info className="h-4.5 w-4.5 text-primary-500 flex-shrink-0 mt-0.5" />
                    <span className="text-[10px] text-earth-500 leading-relaxed">
                      <strong>Recommendation</strong>: Once loaded, regional fertilizer dosage recommendations and specific pH amendments will calculate here automatically.
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
