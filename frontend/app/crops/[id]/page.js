'use client';
import { use } from 'react';
import { getCropById } from '@/lib/cropsData';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Sprout, 
  Droplets, 
  Calendar, 
  Sun, 
  Layers, 
  Bookmark, 
  CheckCircle2 
} from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';
import { useState } from 'react';

export default function CropDetail({ params }) {
  const resolvedParams = use(params);
  const crop = getCropById(resolvedParams.id);
  const { user, updateProfile } = useAuth();
  const [saveMessage, setSaveMessage] = useState('');

  if (!crop) {
    return (
      <div className="min-h-screen bg-[#0a0e0c] text-white flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-2">Crop Guide Not Found</h1>
        <p className="text-earth-400 text-sm mb-6">We couldn't find a guide for the requested plant.</p>
        <Link href="/" className="bg-primary-600 hover:bg-primary-500 text-white font-bold px-6 py-2.5 rounded-full text-xs transition-colors">
          Return to Home Dashboard
        </Link>
      </div>
    );
  }

  const handleSaveCrop = async () => {
    if (!user) {
      setSaveMessage('Please log in to save guides to your profile.');
      setTimeout(() => setSaveMessage(''), 4000);
      return;
    }

    const currentSaved = user.savedCrops || [];
    const alreadySaved = currentSaved.some(c => c.id === crop.id || c._id === crop.id);

    if (alreadySaved) {
      setSaveMessage(`"${crop.name}" is already saved in your profile!`);
      setTimeout(() => setSaveMessage(''), 4000);
      return;
    }

    const updatedCrops = [...currentSaved, crop];
    const res = await updateProfile({ savedCrops: updatedCrops });
    if (res.success) {
      setSaveMessage(`Saved "${crop.name}" to your profile!`);
    } else {
      setSaveMessage('Failed to save guide. Try again.');
    }
    setTimeout(() => setSaveMessage(''), 4000);
  };

  return (
    <div className="min-h-screen bg-[#0a0e0c] text-white py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Back Link */}
        <Link href="/" className="inline-flex items-center gap-2 text-earth-400 hover:text-white text-xs font-bold transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Home Dashboard
        </Link>

        {saveMessage && (
          <div className="bg-primary-500/10 border border-primary-500/30 text-primary-400 p-4 rounded-2xl text-center text-sm font-bold animate-fade-in">
            {saveMessage}
          </div>
        )}

        {/* Hero Card */}
        <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-xl">
          <div className="h-72 relative bg-black">
            <img src={crop.imageUrl} alt={crop.name} className="w-full h-full object-cover opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111814] via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
              <div>
                <span className="bg-primary-600 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-md">
                  {crop.category}
                </span>
                <h1 className="text-3xl md:text-4xl font-extrabold text-white mt-2">{crop.name}</h1>
              </div>
              <button
                onClick={handleSaveCrop}
                className="bg-primary-600 hover:bg-primary-500 text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                <Bookmark className="h-4 w-4" /> Save Guide
              </button>
            </div>
          </div>

          <div className="p-6 md:p-8 space-y-8">
            <p className="text-earth-300 text-base leading-relaxed">{crop.shortDescription}</p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-[#161d18] border border-border rounded-2xl p-4">
                <span className="text-[10px] text-earth-500 font-bold uppercase tracking-wider block mb-1">Water Need</span>
                <span className="text-sm font-bold text-white flex items-center gap-1.5">
                  <Droplets className="h-4 w-4 text-blue-400" /> {crop.waterRequirement}
                </span>
              </div>

              <div className="bg-[#161d18] border border-border rounded-2xl p-4">
                <span className="text-[10px] text-earth-500 font-bold uppercase tracking-wider block mb-1">Duration</span>
                <span className="text-sm font-bold text-white flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-amber-400" /> {crop.durationDays} Days
                </span>
              </div>

              <div className="bg-[#161d18] border border-border rounded-2xl p-4">
                <span className="text-[10px] text-earth-500 font-bold uppercase tracking-wider block mb-1">Sunlight</span>
                <span className="text-sm font-bold text-white flex items-center gap-1.5">
                  <Sun className="h-4 w-4 text-orange-400" /> {crop.sunlight}
                </span>
              </div>

              <div className="bg-[#161d18] border border-border rounded-2xl p-4">
                <span className="text-[10px] text-earth-500 font-bold uppercase tracking-wider block mb-1">Ideal Soils</span>
                <span className="text-xs font-bold text-primary-400 truncate block">
                  {crop.idealSoil.join(', ')}
                </span>
              </div>
            </div>

            {/* Step by Step Cultivation */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Sprout className="h-5 w-5 text-primary-500" /> Step-by-Step Cultivation Process
              </h2>
              <div className="space-y-4">
                {crop.steps.map((step, idx) => (
                  <div key={idx} className="bg-[#161d18] border border-border rounded-2xl p-5 flex gap-4 items-start">
                    <div className="w-9 h-9 rounded-full bg-primary-600/20 border border-primary-500/40 text-primary-400 font-bold flex items-center justify-center text-sm flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-white mb-1">{step.title}</h3>
                      <p className="text-xs text-earth-300 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Fertilizer Schedule */}
            {crop.fertilizerSchedule && crop.fertilizerSchedule.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Layers className="h-5 w-5 text-emerald-400" /> Fertilizer Application Schedule
                </h2>
                <div className="bg-[#161d18] border border-border rounded-2xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#1e2721] text-earth-300 font-bold uppercase tracking-wider border-b border-border">
                      <tr>
                        <th className="p-4">Growth Stage</th>
                        <th className="p-4">Recommended Dose</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/40">
                      {crop.fertilizerSchedule.map((f, idx) => (
                        <tr key={idx} className="hover:bg-white/5 transition-colors">
                          <td className="p-4 font-semibold text-white">{f.stage}</td>
                          <td className="p-4 text-earth-300 font-mono">{f.recommendation}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
