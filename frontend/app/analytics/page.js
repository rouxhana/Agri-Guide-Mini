'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  LineChart, 
  Sprout, 
  Layers, 
  CheckSquare, 
  RotateCcw, 
  Sun, 
  CloudRain, 
  Cloud, 
  Thermometer, 
  Droplets,
  Calendar,
  Radio,
  User,
  ArrowRight
} from 'lucide-react';

export default function AnalyticsDashboard() {
  const [crop, setCrop] = useState('Groundnut');
  const [weather, setWeather] = useState('Sunny');
  const [activeDay, setActiveDay] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [currentTime, setCurrentTime] = useState('');

  // Update clock on load
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

  // Generate 7-day parameter trend based on inputs
  const generateTrend = () => {
    const days = ['Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed'];
    let tempBase = 28;
    let moistureBase = 45;

    // Adjust bases according to crop profile
    if (crop === 'Paddy') {
      moistureBase = 75; // Needs lots of water
      tempBase = 30;
    } else if (crop === 'Groundnut') {
      moistureBase = 35; // Moderate water
      tempBase = 28;
    } else if (crop === 'Tomato') {
      moistureBase = 55; // Well-watered
      tempBase = 26;
    } else if (crop === 'Chillies') {
      moistureBase = 40;
      tempBase = 32;
    } else if (crop === 'Millets') {
      moistureBase = 20; // Very dry
      tempBase = 33;
    }

    // Adjust bases according to weather condition
    if (weather === 'Rainy') {
      moistureBase = Math.min(moistureBase + 30, 95);
      tempBase -= 5;
    } else if (weather === 'Drought') {
      moistureBase = Math.max(moistureBase - 25, 10);
      tempBase += 6;
    } else if (weather === 'Cloudy') {
      tempBase -= 2;
      moistureBase = Math.min(moistureBase + 5, 90);
    }

    const data = days.map((day, index) => {
      // Add slight randomized daily fluctuations (-3 to +3)
      const dailyTemp = parseFloat((tempBase + (Math.sin(index) * 2.5) + (Math.random() - 0.5) * 2).toFixed(1));
      const dailyMoisture = Math.round(moistureBase + (Math.cos(index) * 6) + (Math.random() - 0.5) * 8);

      return {
        day,
        temp: Math.max(15, Math.min(45, dailyTemp)),
        moisture: Math.max(5, Math.min(100, dailyMoisture))
      };
    });

    setChartData(data);
    // Default select Thursday (first day) or current day
    setActiveDay(0);
  };

  useEffect(() => {
    generateTrend();
  }, [crop, weather]);

  // SVG Chart layout helper constants
  const width = 800;
  const height = 300;
  const paddingX = 60;
  const paddingY = 45;
  const chartWidth = width - paddingX * 2;
  const chartHeight = height - paddingY * 2;

  // Calculate coordinates for points
  const points = chartData.map((data, index) => {
    const x = paddingX + (index * (chartWidth / (chartData.length - 1)));
    
    // Temp scale: 10 to 50
    const tempY = paddingY + chartHeight - ((data.temp - 10) / 40) * chartHeight;
    
    // Moisture scale: 0 to 100
    const moistureY = paddingY + chartHeight - (data.moisture / 100) * chartHeight;

    return { x, tempY, moistureY, ...data };
  });

  // Generate SVG Path definitions
  const tempPath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.tempY}`).join(' ');
  const moisturePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.moistureY}`).join(' ');

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
          <button className="px-5 py-3.5 font-bold text-sm text-primary-500 border-b-2 border-primary-500 bg-primary-500/5 flex items-center gap-2">
            <LineChart className="h-4 w-4" /> Crop Analytics
          </button>
          <Link href="/diagnostics" className="px-5 py-3.5 font-bold text-sm text-earth-500 hover:text-white flex items-center gap-2 transition-all">
            <Layers className="h-4 w-4" /> Soil Diagnostics
          </Link>
          <div className="relative group">
            <button className="px-5 py-3.5 font-bold text-sm text-earth-500 opacity-60 cursor-not-allowed flex items-center gap-2">
              <CheckSquare className="h-4 w-4" /> Field Tasks
            </button>
            <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-[#161e1a] border border-border text-[10px] text-earth-400 whitespace-nowrap px-2 py-1 rounded shadow-xl">
              Coming Soon
            </div>
          </div>
        </div>

        {/* Dashboard Main Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Chart Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card border border-border rounded-3xl p-6 relative">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <LineChart className="h-5 w-5 text-primary-500" /> Environmental Analytics
                  </h2>
                  <p className="text-xs text-earth-500 mt-0.5">Simulated 7-day environmental parameter trends based on current configurations.</p>
                </div>
                <button 
                  onClick={generateTrend}
                  className="flex items-center gap-1.5 bg-[#17221b] border border-primary-800 hover:border-primary-500 text-primary-400 hover:text-white px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  <RotateCcw className="h-3.5 w-3.5" /> Regenerate Trend
                </button>
              </div>

              {/* Chart Visualizer */}
              <div className="relative w-full aspect-[8/3] border border-border/40 rounded-2xl bg-earth-50/5 p-4 overflow-hidden flex items-center justify-center">
                {points.length > 0 ? (
                  <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
                    {/* Horizontal grid lines */}
                    {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => {
                      const y = paddingY + ratio * chartHeight;
                      return (
                        <line
                          key={index}
                          x1={paddingX}
                          y1={y}
                          x2={width - paddingX}
                          y2={y}
                          stroke="#1f2e25"
                          strokeWidth="1"
                          strokeDasharray="4,4"
                        />
                      );
                    })}

                    {/* Left Y Axis (Temp Label) */}
                    <text x={paddingX - 10} y={paddingY - 15} textAnchor="end" className="text-[10px] font-black fill-orange-500">Temp (°C)</text>
                    <text x={paddingX - 10} y={paddingY + 5} textAnchor="end" className="text-[9px] fill-earth-500">50</text>
                    <text x={paddingX - 10} y={paddingY + chartHeight / 2} textAnchor="end" className="text-[9px] fill-earth-500">30</text>
                    <text x={paddingX - 10} y={paddingY + chartHeight + 3} textAnchor="end" className="text-[9px] fill-earth-500">10</text>

                    {/* Right Y Axis (Moisture Label) */}
                    <text x={width - paddingX + 10} y={paddingY - 15} textAnchor="start" className="text-[10px] font-black fill-blue-400">Moisture (%)</text>
                    <text x={width - paddingX + 10} y={paddingY + 5} textAnchor="start" className="text-[9px] fill-earth-500">100</text>
                    <text x={width - paddingX + 10} y={paddingY + chartHeight / 2} textAnchor="start" className="text-[9px] fill-earth-500">50</text>
                    <text x={width - paddingX + 10} y={paddingY + chartHeight + 3} textAnchor="start" className="text-[9px] fill-earth-500">0</text>

                    {/* Temp Line path */}
                    <path
                      d={tempPath}
                      fill="none"
                      stroke="#f97316"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Moisture Line path */}
                    <path
                      d={moisturePath}
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Node points and interactivity overlays */}
                    {points.map((p, idx) => (
                      <g key={idx}>
                        {/* Day labels on X-axis */}
                        <text
                          x={p.x}
                          y={height - paddingY + 22}
                          textAnchor="middle"
                          className={`text-xs font-bold ${activeDay === idx ? 'fill-primary-500' : 'fill-earth-500'}`}
                        >
                          {p.day}
                        </text>

                        {/* Interactive vertical hover helper */}
                        {activeDay === idx && (
                          <line
                            x1={p.x}
                            y1={paddingY - 5}
                            x2={p.x}
                            y2={height - paddingY + 5}
                            stroke="#00e676"
                            strokeWidth="1.5"
                            strokeDasharray="2,2"
                          />
                        )}

                        {/* Temp Node dot */}
                        <circle
                          cx={p.x}
                          cy={p.tempY}
                          r={activeDay === idx ? "7" : "4.5"}
                          className="fill-orange-500 stroke-[#0a0e0c]"
                          strokeWidth="2"
                        />

                        {/* Moisture Node dot */}
                        <circle
                          cx={p.x}
                          cy={p.moistureY}
                          r={activeDay === idx ? "7" : "4.5"}
                          className="fill-blue-500 stroke-[#0a0e0c]"
                          strokeWidth="2"
                        />

                        {/* Invisible hover zone slice */}
                        <rect
                          x={p.x - chartWidth / (chartData.length * 2)}
                          y={paddingY}
                          width={chartWidth / (chartData.length - 1)}
                          height={chartHeight}
                          fill="transparent"
                          className="cursor-pointer"
                          onMouseEnter={() => setActiveDay(idx)}
                        />
                      </g>
                    ))}
                  </svg>
                ) : (
                  <div className="text-earth-500 text-xs italic">Loading simulated parameters...</div>
                )}
              </div>

              {/* Dynamic tooltip bar below the chart (matches the screenshot styled bubble) */}
              {activeDay !== null && chartData[activeDay] && (
                <div className="mt-4 flex items-center justify-center">
                  <div className="bg-[#17221b] border border-primary-500/30 px-6 py-2.5 rounded-xl shadow-md flex items-center gap-6 animate-scale-up">
                    <span className="text-sm font-black text-primary-500 uppercase tracking-wider">{chartData[activeDay].day}</span>
                    <span className="h-4 w-px bg-border"></span>
                    <span className="flex items-center gap-1.5 text-xs text-orange-400 font-bold">
                      <Thermometer className="h-4 w-4" /> Temp: {chartData[activeDay].temp}°C
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-blue-400 font-bold">
                      <Droplets className="h-4 w-4" /> Moisture: {chartData[activeDay].moisture}%
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Simulated Analysis Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-card border border-border rounded-3xl p-5">
                <h4 className="font-bold text-sm text-earth-900 dark:text-white mb-2 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span> Thermal Diagnosis
                </h4>
                {activeDay !== null && chartData[activeDay] && (
                  <p className="text-xs text-earth-500 leading-relaxed">
                    {chartData[activeDay].temp > 32 
                      ? "High temperatures detected. Increased transpirational loss expected. Verify soil moisture lines immediately."
                      : "Optimal thermal profile for active canopy growth. Normal metabolic rate observed."}
                  </p>
                )}
              </div>

              <div className="bg-card border border-border rounded-3xl p-5">
                <h4 className="font-bold text-sm text-earth-900 dark:text-white mb-2 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> Irrigation Status
                </h4>
                {activeDay !== null && chartData[activeDay] && (
                  <p className="text-xs text-earth-500 leading-relaxed">
                    {chartData[activeDay].moisture < 30
                      ? "ALERT: Soil moisture is falling below safety threshold. Basal root stress risk. Run irrigation cycle for 35 mins."
                      : chartData[activeDay].moisture > 70 
                      ? "Pore space saturated. Reduce irrigation rate to prevent root rot or fungal propagation."
                      : "Balanced soil humidity. Water levels within the target moisture range."}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Right Controller Panel */}
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-3xl p-6">
              <h3 className="font-bold text-lg dark:text-white mb-4 flex items-center gap-2">
                <Sun className="h-5 w-5 text-primary-500" /> Simulation Controls
              </h3>
              
              <div className="space-y-5">
                {/* Crop dropdown selection */}
                <div>
                  <label className="block text-xs text-earth-500 font-bold uppercase tracking-wider mb-2">Target Crop Profile</label>
                  <select 
                    className="w-full bg-[#161a18] border border-border rounded-xl px-3.5 py-2.5 text-sm font-semibold text-white focus:ring-2 ring-primary-500 outline-none animate-none"
                    value={crop}
                    onChange={(e) => setCrop(e.target.value)}
                  >
                    <option value="Groundnut">Groundnut (Coimbatore-1)</option>
                    <option value="Paddy">Paddy (Rice - Ponni)</option>
                    <option value="Tomato">Tomato (Nattu Red)</option>
                    <option value="Chillies">Chillies (Guntur Variety)</option>
                    <option value="Millets">Ragi / Millets (Dryland)</option>
                  </select>
                </div>

                {/* Weather dropdown simulator */}
                <div>
                  <label className="block text-xs text-earth-500 font-bold uppercase tracking-wider mb-2">Weather Condition</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'Sunny', label: 'Sunny', icon: Sun, color: 'text-orange-400' },
                      { id: 'Rainy', label: 'Rainy', icon: CloudRain, color: 'text-blue-400' },
                      { id: 'Cloudy', label: 'Cloudy', icon: Cloud, color: 'text-gray-400' },
                      { id: 'Drought', label: 'Drought', icon: Thermometer, color: 'text-red-400' }
                    ].map((w) => {
                      const Icon = w.icon;
                      return (
                        <button
                          key={w.id}
                          type="button"
                          onClick={() => setWeather(w.id)}
                          className={`flex items-center gap-1.5 justify-center p-2.5 border rounded-xl font-bold text-xs transition-all cursor-pointer ${
                            weather === w.id 
                              ? 'bg-primary-600/10 border-primary-500 text-white shadow'
                              : 'bg-[#161a18] border-border text-earth-500 hover:border-earth-800'
                          }`}
                        >
                          <Icon className={`h-4 w-4 ${w.color}`} /> {w.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Static crop configuration info card */}
            <div className="bg-card border border-border rounded-3xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/5 rounded-full blur-2xl"></div>
              <h3 className="font-bold text-sm text-primary-500 uppercase tracking-widest mb-3">Optimal Target Profile</h3>
              
              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center border-b border-border/40 pb-2">
                  <span className="text-earth-500">Selected Crop:</span>
                  <span className="font-bold">{crop}</span>
                </div>
                <div className="flex justify-between items-center border-b border-border/40 pb-2">
                  <span className="text-earth-500">Humidity Range:</span>
                  <span className="font-semibold">
                    {crop === 'Paddy' ? '70% - 90%' : crop === 'Groundnut' ? '30% - 50%' : crop === 'Tomato' ? '50% - 70%' : '40% - 60%'}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-border/40 pb-2">
                  <span className="text-earth-500">Ideal Temp:</span>
                  <span className="font-semibold">22°C - 32°C</span>
                </div>
                <div className="flex justify-between items-center pb-1">
                  <span className="text-earth-500">Growth Stage:</span>
                  <span className="font-bold text-primary-500 uppercase tracking-wider text-[10px]">Vegetative</span>
                </div>
              </div>
            </div>

            {/* Advisory quick links */}
            <div className="bg-gradient-to-r from-emerald-950/20 to-teal-950/20 border border-emerald-900/30 rounded-3xl p-6">
              <h4 className="font-bold text-sm text-primary-400 mb-2">Need chemical analysis?</h4>
              <p className="text-xs text-earth-500 leading-relaxed mb-4">Run diagnostics on your soil laboratory test reports to optimize NPK chemical configurations.</p>
              <Link href="/diagnostics" className="inline-flex items-center gap-1 text-xs font-black text-white hover:text-primary-400 transition-colors uppercase tracking-wider">
                Go to Diagnostics <ArrowRight className="h-4.5 w-4.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
