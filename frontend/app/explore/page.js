'use client';
import { useState, useEffect } from 'react';
import { Search, Leaf, Filter, Loader2 } from "lucide-react";
import Link from "next/link";
import { cropsData } from '@/lib/cropsData';

export default function Explore() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Grain', 'Cash Crop', 'Tree', 'Vegetable', 'Flower', 'Pulse'];

  const filteredCrops = cropsData.filter(crop => {
    const matchesSearch = crop.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         crop.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || crop.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full min-h-screen bg-[#0a0e0c] text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore Guides</h1>
            <p className="text-earth-400 text-lg">Discover crops, trees, and plants suitable for your region</p>
          </div>

          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-earth-500" />
            <input 
              type="text" 
              placeholder="Search plants, crops..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 ring-primary-500 transition-all text-white placeholder:text-earth-600 shadow-lg"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-3 rounded-full font-bold text-sm transition-all border ${
                activeCategory === cat 
                ? 'bg-primary-600 border-primary-600 text-white shadow-lg shadow-primary-600/20' 
                : 'bg-white/5 border-white/10 text-earth-400 hover:border-white/20'
              }`}
            >
              {cat === 'All' ? <Leaf className="inline-block h-4 w-4 mr-2" /> : null}
              {cat}s
            </button>
          ))}
          <button className="px-6 py-3 rounded-full font-bold text-sm bg-white/5 border border-white/10 text-earth-400 hover:border-white/20 flex items-center gap-2 ml-auto">
            <Filter className="h-4 w-4" /> More Filters
          </button>
        </div>

        {/* Content */}
        {filteredCrops.length === 0 ? (
          <div className="text-center py-24 bg-white/5 rounded-3xl border border-white/5 border-dashed">
            <p className="text-earth-500 text-lg">No plants found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCrops.map((crop) => (
              <Link 
                key={crop.id} 
                href={`/crops/${crop.id}`}
                className="group bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-primary-500/50 transition-all flex flex-col shadow-sm"
              >
                <div className="h-56 relative overflow-hidden bg-black">
                  <img 
                    src={crop.imageUrl} 
                    alt={crop.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute top-4 right-4 bg-primary-600 text-white text-[10px] font-black uppercase tracking-tighter px-2 py-1 rounded-md shadow-xl z-10">
                    {crop.category}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                </div>
                
                <div className="p-6 flex-grow flex flex-col bg-gradient-to-b from-white/5 to-transparent">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                    {crop.name}
                  </h3>
                  <p className="text-earth-400 text-sm line-clamp-2 mb-4 leading-relaxed">
                    {crop.shortDescription}
                  </p>
                  
                  <div className="mt-auto flex flex-wrap gap-2">
                    {crop.tags.slice(0, 2).map((tag, i) => (
                      <span key={i} className="text-[10px] uppercase tracking-widest font-black bg-white/5 text-earth-500 px-2.5 py-1 rounded-md border border-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
