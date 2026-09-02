'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import { MapPin, Sprout, Grid, ChevronRight, Sparkles, Check, Layers } from 'lucide-react';

export default function ProfileSetup() {
  const { user, loading, updateProfile } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    location: '',
    soilType: '',
    landSize: '0.5'
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  // Check if already authenticated, if not loaded wait, if no user redirect to login
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    } else if (user && user.location && user.soilType && user.landSize) {
      // If profile is already set up, let them visit profile directly (optional, but good practice)
      // router.push('/profile');
    }
  }, [user, loading]);

  const soilTypes = [
    {
      id: 'Red Soil',
      name: 'Red Soil (செம்மண்)',
      desc: 'Sandy clay loam, low organic content. Perfect for Groundnut, Sorghum, and Millets.',
      color: 'from-orange-600 to-red-700',
      crops: ['Groundnut', 'Sorghum', 'Millets']
    },
    {
      id: 'Black Soil',
      name: 'Black Soil (கரிசல் மண்)',
      desc: 'Clayey structure, high moisture retention. Excellent for Cotton, Chillies, and Maize.',
      color: 'from-neutral-800 to-neutral-900',
      crops: ['Cotton', 'Chillies', 'Maize']
    },
    {
      id: 'Clayey',
      name: 'Clayey/Alluvial (களிமண்)',
      desc: 'Rich in nutrients, heavy moisture retention. Ideal for Paddy (Rice) and Banana.',
      color: 'from-emerald-800 to-teal-900',
      crops: ['Paddy', 'Banana', 'Sugarcane']
    },
    {
      id: 'Sandy',
      name: 'Sandy Soil (மணல் மண்)',
      desc: 'Loose, high drainage, needs frequent watering. Suited for Cashew, Groundnut, and Tubers.',
      color: 'from-amber-600 to-yellow-700',
      crops: ['Cashew', 'Groundnut', 'Tapioca']
    }
  ];

  // Dynamic recommendations preview based on selected soil
  useEffect(() => {
    const selected = soilTypes.find(s => s.id === formData.soilType);
    if (selected) {
      setSuggestions(selected.crops);
    } else {
      setSuggestions([]);
    }
  }, [formData.soilType]);

  if (loading || !user) {
    return (
      <div className="flex-grow flex items-center justify-center bg-earth-50 dark:bg-[#0a0e0c] min-h-[calc(100vh-4rem)]">
        <div className="text-earth-500 font-medium">Loading Setup Wizard...</div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.location) {
      setError('Please provide your location.');
      return;
    }
    if (!formData.soilType) {
      setError('Please select your soil type.');
      return;
    }
    if (!formData.landSize || parseFloat(formData.landSize) <= 0) {
      setError('Please provide a valid land size.');
      return;
    }

    setIsSubmitting(true);
    const res = await updateProfile(formData);
    setIsSubmitting(false);

    if (res.success) {
      router.push('/profile');
    } else {
      setError(res.message || 'Failed to update profile. Please try again.');
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center bg-earth-50 dark:bg-[#0a0e0c] py-12 px-4 min-h-[calc(100vh-4rem)]">
      <div className="w-full max-w-3xl bg-white dark:bg-card border border-border rounded-3xl shadow-xl overflow-hidden transition-all duration-300">
        
        {/* Onboarding Header Banner */}
        <div className="relative bg-gradient-to-r from-primary-800 to-primary-900 px-8 py-10 text-white overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/20 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <span className="text-xs font-black uppercase tracking-widest bg-primary-600 px-3 py-1 rounded-full shadow-md">Onboarding Wizard</span>
            <h1 className="text-3xl font-extrabold mt-3">Welcome to AgriHelp, {user.name}!</h1>
            <p className="text-primary-100 text-sm mt-1 max-w-lg">Let's set up your farm details. We use this information to customize crop guides, fertilizer doses, and cultivation recommendations tailored to your land.</p>
          </div>
        </div>

        <div className="p-8">
          {error && (
            <div className="bg-red-50 dark:bg-red-950/35 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 p-4 rounded-2xl mb-6 text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Step 1: Location & Land Size */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-earth-800 dark:text-white mb-2 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary-500" /> Location (Town / District)
                </label>
                <input
                  type="text"
                  required
                  className="w-full bg-earth-50 dark:bg-[#1f201d] border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 ring-primary-500 text-earth-900 dark:text-white transition-all placeholder:text-earth-400"
                  placeholder="e.g. Madurai, Tamil Nadu"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
                <span className="text-xs text-earth-500 mt-1 block">Specify your district in Tamil Nadu for location-aware advice.</span>
              </div>

              <div>
                <label className="block text-sm font-semibold text-earth-800 dark:text-white mb-2 flex items-center gap-2">
                  <Grid className="h-4 w-4 text-primary-500" /> Land Size (Acres)
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    step="0.1"
                    min="0.1"
                    max="100"
                    required
                    className="w-32 bg-earth-50 dark:bg-[#1f201d] border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 ring-primary-500 text-earth-900 dark:text-white font-bold text-center transition-all"
                    value={formData.landSize}
                    onChange={(e) => setFormData({ ...formData, landSize: e.target.value })}
                  />
                  <input
                    type="range"
                    min="0.1"
                    max="5.0"
                    step="0.1"
                    className="flex-grow accent-primary-600 h-2 bg-earth-200 dark:bg-earth-800 rounded-lg cursor-pointer"
                    value={parseFloat(formData.landSize) <= 5 ? formData.landSize : '5'}
                    onChange={(e) => setFormData({ ...formData, landSize: e.target.value })}
                  />
                </div>
                <span className="text-xs text-earth-500 mt-1 block">
                  {parseFloat(formData.landSize) < 1 
                    ? "✨ Ideal for micro-farming (< 1 acre). Tailored space optimization is active!" 
                    : "Standard land holding configuration."}
                </span>
              </div>
            </div>

            {/* Step 2: Soil Type Selection */}
            <div>
              <label className="block text-sm font-semibold text-earth-800 dark:text-white mb-3 flex items-center gap-2">
                <Layers className="h-4 w-4 text-primary-500" /> Select Your Soil Type
              </label>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {soilTypes.map((soil) => (
                  <div
                    key={soil.id}
                    onClick={() => setFormData({ ...formData, soilType: soil.id })}
                    className={`relative rounded-2xl border-2 p-5 cursor-pointer transition-all flex flex-col justify-between overflow-hidden group hover:shadow-md ${
                      formData.soilType === soil.id
                        ? 'border-primary-600 bg-primary-50/50 dark:bg-primary-950/15'
                        : 'border-border hover:border-primary-200 dark:hover:border-primary-900/40 bg-white dark:bg-card'
                    }`}
                  >
                    {/* Visual soil-colored card accent */}
                    <div className={`absolute top-0 right-0 w-2 h-full bg-gradient-to-b ${soil.color}`}></div>

                    <div>
                      <div className="flex items-center justify-between mb-2 pr-4">
                        <h3 className="font-bold text-earth-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                          {soil.name}
                        </h3>
                        {formData.soilType === soil.id && (
                          <div className="w-5 h-5 rounded-full bg-primary-600 text-white flex items-center justify-center shadow-md animate-scale-up">
                            <Check className="h-3 w-3 stroke-[3]" />
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-earth-500 dark:text-earth-400 leading-relaxed mb-4 pr-3">
                        {soil.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 3: Dynamic Recommended Crops Preview */}
            {suggestions.length > 0 && (
              <div className="bg-primary-50 dark:bg-primary-950/10 border border-primary-200/50 dark:border-primary-950/40 rounded-2xl p-5 animate-fade-in flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center text-primary-700 dark:text-primary-400 flex-shrink-0">
                  <Sparkles className="h-5 w-5 animate-pulse" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-primary-900 dark:text-primary-300">Tailored Crop Suggestions</h4>
                  <p className="text-xs text-earth-500 dark:text-earth-400 mt-0.5 leading-relaxed">
                    Based on your <strong>{formData.soilType}</strong> and landholding size of <strong>{formData.landSize} Acres</strong>, we recommend:
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {suggestions.map((crop, index) => (
                      <span
                        key={index}
                        className="bg-primary-100/70 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 border border-primary-200/50 dark:border-primary-800/45 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-md"
                      >
                        {crop}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Submit Bar */}
            <div className="border-t border-border pt-6 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-primary-600 hover:bg-primary-500 text-white px-8 py-3.5 rounded-full font-bold shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Saving Farm Profile...' : 'Complete Registration'}
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
