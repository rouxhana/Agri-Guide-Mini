'use client';
import { useState } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Leaf, 
  Sprout, 
  ArrowRight, 
  LineChart, 
  FileText, 
  MessageSquare,
  Sun,
  Droplets,
  Calendar,
  Layers,
  CheckCircle,
  X,
  Bookmark,
  Sparkles,
  Filter
} from 'lucide-react';
import { cropsData } from '@/lib/cropsData';
import { useAuth } from '@/lib/AuthContext';

export default function Home() {
  const { user, updateProfile } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [saveMessage, setSaveMessage] = useState('');

  const categories = ['All', 'Grain', 'Cash Crop', 'Tree', 'Vegetable', 'Flower', 'Pulse'];

  const filteredCrops = cropsData.filter(crop => {
    const matchesSearch = crop.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         crop.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         crop.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = activeCategory === 'All' || crop.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSaveCrop = async (crop) => {
    if (!user) {
      setSaveMessage('Please log in to save guides to your profile.');
      setTimeout(() => setSaveMessage(''), 4000);
      return;
    }

    const currentSaved = user.savedCrops || [];
    const alreadySaved = currentSaved.some(c => c.id === crop.id || c._id === crop.id);

    if (alreadySaved) {
      setSaveMessage(`"${crop.name}" is already in your saved guides!`);
      setTimeout(() => setSaveMessage(''), 4000);
      return;
    }

    const updatedCrops = [...currentSaved, crop];
    const res = await updateProfile({ savedCrops: updatedCrops });
    if (res.success) {
      setSaveMessage(`Successfully saved "${crop.name}" to your profile!`);
    } else {
      setSaveMessage('Error saving guide. Please try again.');
    }
    setTimeout(() => setSaveMessage(''), 4000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0e0c] text-white">
      {/* Hero Section */}
      <section className="relative py-16 px-4 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-primary-900)_0%,_transparent_70%)] opacity-20"></div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <span className="inline-flex items-center gap-1.5 bg-primary-600/10 border border-primary-500/20 text-primary-400 text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full mb-4">
            <Sprout className="h-3.5 w-3.5" /> Tamil Nadu Farming Advisory Hub
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            Farm Smarter with <span className="text-primary-500">AgriHelp</span>
          </h1>
          <p className="text-earth-400 text-base md:text-lg max-w-2xl mx-auto mb-10">
            Step-by-step cultivation guides, crop analytics, soil diagnostics, and community support tailored to small-scale farmers in Tamil Nadu.
          </p>
        </div>
        
        {/* Quick Dashboard Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-6xl mx-auto relative z-10">
          <Link 
            href="/analytics" 
            className="bg-card border border-border rounded-2xl p-5 hover:border-primary-500/50 transition-all group flex items-center gap-4 hover:shadow-lg"
          >
            <div className="w-12 h-12 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center text-primary-400 group-hover:scale-110 transition-transform">
              <LineChart className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white group-hover:text-primary-400 transition-colors">Crop Analytics</h3>
              <p className="text-xs text-earth-500 mt-0.5">7-day parameter trend graphs</p>
            </div>
          </Link>

          <Link 
            href="/diagnostics" 
            className="bg-card border border-border rounded-2xl p-5 hover:border-primary-500/50 transition-all group flex items-center gap-4 hover:shadow-lg"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white group-hover:text-primary-400 transition-colors">Soil Diagnostics</h3>
              <p className="text-xs text-earth-500 mt-0.5">Upload soil test lab reports</p>
            </div>
          </Link>

          <Link 
            href="/community" 
            className="bg-card border border-border rounded-2xl p-5 hover:border-primary-500/50 transition-all group flex items-center gap-4 hover:shadow-lg"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
              <MessageSquare className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white group-hover:text-primary-400 transition-colors">Farmer Community</h3>
              <p className="text-xs text-earth-500 mt-0.5">Discussions & expert tips</p>
            </div>
          </Link>
        </div>
      </section>

      {/* Main Tamil Nadu Crops Cultivation Guide Dashboard */}
      <section className="max-w-7xl mx-auto px-4 py-12 w-full">
        {saveMessage && (
          <div className="bg-primary-500/10 border border-primary-500/30 text-primary-400 p-4 rounded-2xl mb-8 text-center text-sm font-bold animate-fade-in">
            {saveMessage}
          </div>
        )}

        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-primary-500 block mb-1">Cultivation Guide Hub</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">Tamil Nadu Crops & Plants Catalog</h2>
            <p className="text-earth-400 text-sm mt-1">Select any crop for a step-by-step planting, water, fertilizer, and harvest guide.</p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-earth-500" />
            <input 
              type="text" 
              placeholder="Search Paddy, Tomato, Mango..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-card border border-border rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder:text-earth-500 focus:outline-none focus:ring-2 ring-primary-500 transition-all"
            />
          </div>
        </div>

        {/* Category Pills Filter */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-border pb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full font-bold text-xs transition-all border cursor-pointer ${
                activeCategory === cat 
                  ? 'bg-primary-600 border-primary-600 text-white shadow-md shadow-primary-600/20' 
                  : 'bg-card border-border text-earth-400 hover:border-earth-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Crops Grid */}
        {filteredCrops.length === 0 ? (
          <div className="text-center py-16 bg-card rounded-3xl border border-border border-dashed">
            <Sprout className="h-12 w-12 text-earth-600 mx-auto mb-3" />
            <p className="text-earth-400 text-sm">No crop guides found matching "{searchQuery}".</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCrops.map((crop) => (
              <div 
                key={crop.id} 
                className="group bg-card border border-border rounded-3xl overflow-hidden hover:border-primary-500/50 transition-all flex flex-col shadow-sm"
              >
                {/* Crop Image Header */}
                <div className="h-48 relative overflow-hidden bg-black/40">
                  <img 
                    src={crop.imageUrl} 
                    alt={crop.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute top-3 right-3 bg-primary-600 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md shadow-lg">
                    {crop.category}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111814] via-transparent to-transparent"></div>
                </div>
                
                {/* Content */}
                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1.5 group-hover:text-primary-400 transition-colors">
                      {crop.name}
                    </h3>
                    <p className="text-earth-400 text-xs line-clamp-2 mb-4 leading-relaxed">
                      {crop.shortDescription}
                    </p>
                    
                    {/* Attributes Pill Row */}
                    <div className="grid grid-cols-2 gap-2 mb-4 text-[11px] text-earth-300">
                      <span className="flex items-center gap-1 bg-[#17221b] px-2.5 py-1 rounded-md border border-border">
                        <Droplets className="h-3 w-3 text-blue-400" /> {crop.waterRequirement} Water
                      </span>
                      <span className="flex items-center gap-1 bg-[#17221b] px-2.5 py-1 rounded-md border border-border">
                        <Calendar className="h-3 w-3 text-amber-400" /> {crop.durationDays} Days
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 border-t border-border/40 flex items-center justify-between gap-2 mt-auto">
                    <button
                      onClick={() => setSelectedCrop(crop)}
                      className="bg-primary-600/10 hover:bg-primary-600 text-primary-400 hover:text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer flex-grow justify-center border border-primary-500/20 hover:border-primary-500"
                    >
                      Step-by-Step Guide <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => handleSaveCrop(crop)}
                      title="Save to My Profile"
                      className="p-2 border border-border rounded-xl hover:bg-earth-100/20 text-earth-400 hover:text-primary-400 transition-colors cursor-pointer"
                    >
                      <Bookmark className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Step-by-Step Cultivation Guide Modal */}
      {selectedCrop && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="bg-[#111814] border border-border rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
            
            {/* Modal Header Image */}
            <div className="h-56 relative bg-black">
              <img 
                src={selectedCrop.imageUrl} 
                alt={selectedCrop.name}
                className="w-full h-full object-cover opacity-80"
              />
              <button 
                onClick={() => setSelectedCrop(null)}
                className="absolute top-4 right-4 bg-black/60 text-white p-2 rounded-full hover:bg-black transition-colors cursor-pointer border border-white/20"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="absolute inset-0 bg-gradient-to-t from-[#111814] via-transparent to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6">
                <span className="bg-primary-600 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md">
                  {selectedCrop.category}
                </span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-white mt-2">{selectedCrop.name}</h2>
              </div>
            </div>

            {/* Modal Body Content */}
            <div className="p-6 md:p-8 space-y-8">
              
              {/* Quick Spec Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-card border border-border rounded-2xl p-3.5">
                  <span className="text-[10px] text-earth-500 font-bold uppercase tracking-wider block mb-1">Water Need</span>
                  <span className="text-sm font-bold text-white flex items-center gap-1.5">
                    <Droplets className="h-4 w-4 text-blue-400" /> {selectedCrop.waterRequirement}
                  </span>
                </div>

                <div className="bg-card border border-border rounded-2xl p-3.5">
                  <span className="text-[10px] text-earth-500 font-bold uppercase tracking-wider block mb-1">Duration</span>
                  <span className="text-sm font-bold text-white flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-amber-400" /> {selectedCrop.durationDays} Days
                  </span>
                </div>

                <div className="bg-card border border-border rounded-2xl p-3.5">
                  <span className="text-[10px] text-earth-500 font-bold uppercase tracking-wider block mb-1">Sunlight</span>
                  <span className="text-sm font-bold text-white flex items-center gap-1.5">
                    <Sun className="h-4 w-4 text-orange-400" /> {selectedCrop.sunlight}
                  </span>
                </div>

                <div className="bg-card border border-border rounded-2xl p-3.5">
                  <span className="text-[10px] text-earth-500 font-bold uppercase tracking-wider block mb-1">Ideal Soils</span>
                  <span className="text-xs font-bold text-primary-400 truncate block">
                    {selectedCrop.idealSoil.join(', ')}
                  </span>
                </div>
              </div>

              {/* Step by Step Cultivation Guide */}
              <div>
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Sprout className="h-5 w-5 text-primary-500" /> Step-by-Step Cultivation Process
                </h3>
                <div className="space-y-4">
                  {selectedCrop.steps.map((step, idx) => (
                    <div key={idx} className="bg-card border border-border rounded-2xl p-4 flex gap-4 items-start">
                      <div className="w-8 h-8 rounded-full bg-primary-600/20 border border-primary-500/40 text-primary-400 font-bold flex items-center justify-center text-sm flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-white mb-1">{step.title}</h4>
                        <p className="text-xs text-earth-400 leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fertilizer Schedule */}
              {selectedCrop.fertilizerSchedule && selectedCrop.fertilizerSchedule.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Layers className="h-5 w-5 text-emerald-400" /> Fertilizer Application Schedule
                  </h3>
                  <div className="bg-card border border-border rounded-2xl overflow-hidden">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#17221b] text-earth-300 font-bold uppercase tracking-wider border-b border-border">
                        <tr>
                          <th className="p-3.5">Growth Stage</th>
                          <th className="p-3.5">Recommended Dose</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/40">
                        {selectedCrop.fertilizerSchedule.map((f, idx) => (
                          <tr key={idx} className="hover:bg-white/5 transition-colors">
                            <td className="p-3.5 font-semibold text-white">{f.stage}</td>
                            <td className="p-3.5 text-earth-300 font-mono">{f.recommendation}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Modal Actions Footer */}
              <div className="border-t border-border pt-6 flex flex-wrap gap-4 justify-between items-center">
                <button
                  onClick={() => handleSaveCrop(selectedCrop)}
                  className="bg-primary-600 hover:bg-primary-500 text-white font-bold px-6 py-3 rounded-full text-xs transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <Bookmark className="h-4 w-4" /> Save Guide to My Profile
                </button>
                
                <button
                  onClick={() => setSelectedCrop(null)}
                  className="border border-border text-earth-400 hover:text-white px-6 py-3 rounded-full text-xs font-bold transition-all cursor-pointer"
                >
                  Close Guide
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Community Highlights Feed */}
      <section className="w-full bg-earth-50 dark:bg-[#151c17] py-16 border-t border-border/40">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold text-earth-900 dark:text-white">Community Discussions</h2>
              <p className="text-earth-500 mt-2">See what fellow farmers are sharing across Tamil Nadu</p>
            </div>
            <Link href="/community" className="text-primary-600 font-medium hover:underline hidden sm:block">View All Posts</Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Post 1 */}
            <div className="bg-white dark:bg-card p-6 rounded-2xl border border-border shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary-200 rounded-full flex items-center justify-center font-bold text-primary-800">R</div>
                <div>
                  <h4 className="font-semibold text-sm dark:text-white">Ramesh K.</h4>
                  <p className="text-xs text-earth-500">Experienced Farmer • 2h ago</p>
                </div>
              </div>
              <h3 className="font-bold mb-2 dark:text-white">Natural Pest Control for Tomatoes</h3>
              <p className="text-earth-800 dark:text-earth-100 text-sm line-clamp-3">
                I've been using a mix of neem oil and soap water to keep whiteflies away from my tomato crop in Madurai. It's been working surprisingly well without harsh chemicals.
              </p>
            </div>

            {/* Post 2 */}
            <div className="bg-white dark:bg-card p-6 rounded-2xl border border-border shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-orange-200 rounded-full flex items-center justify-center font-bold text-orange-800">K</div>
                <div>
                  <h4 className="font-semibold text-sm dark:text-white">Karthik S.</h4>
                  <p className="text-xs text-earth-500">Beginner • 5h ago</p>
                </div>
              </div>
              <h3 className="font-bold mb-2 dark:text-white">First time planting Paddy in Delta</h3>
              <p className="text-earth-800 dark:text-earth-100 text-sm line-clamp-3">
                Hi everyone, I just got 0.5 acres of land near Tanjore and want to start with Kuruvai Paddy. The soil is clayey. Can someone guide me on standing water height?
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
