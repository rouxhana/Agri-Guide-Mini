'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { MapPin, Settings, Bookmark, Grid, Save, X } from "lucide-react";

export default function Profile() {
  const { user, loading, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    soilType: '',
    landSize: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        location: user.location || '',
        soilType: user.soilType || '',
        landSize: user.landSize || ''
      });
    }
  }, [user]);

  if (loading) return <div className="flex-grow flex items-center justify-center">Loading...</div>;
  if (!user) return <div className="flex-grow flex items-center justify-center">Please log in to view your profile.</div>;

  const handleUpdate = async (e) => {
    e.preventDefault();
    const res = await updateProfile(formData);
    if (res.success) {
      setIsEditing(false);
      setMessage('Profile updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } else {
      setMessage('Error: ' + res.message);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 min-h-screen">
      {message && (
        <div className={`p-4 rounded-xl mb-6 text-center text-sm font-bold ${message.includes('Error') ? 'bg-red-50 text-red-600' : 'bg-primary-50 text-primary-700'}`}>
          {message}
        </div>
      )}

      {/* Profile Header */}
      <div className="bg-white dark:bg-card border border-border rounded-3xl p-8 shadow-sm flex flex-col md:flex-row items-center md:items-start gap-8 mb-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-32 bg-primary-100 dark:bg-primary-900 z-0"></div>
        
        <div className="w-32 h-32 rounded-full bg-white dark:bg-card border-4 border-white dark:border-card z-10 flex items-center justify-center shadow-lg relative mt-8 md:mt-12 overflow-hidden text-5xl font-bold text-primary-600">
          {user.name?.[0].toUpperCase()}
        </div>
        
        <div className="z-10 text-center md:text-left mt-0 md:mt-16 flex-grow">
          {isEditing ? (
            <div className="space-y-4 max-w-md">
              <input 
                className="text-3xl font-bold text-earth-900 dark:text-white bg-earth-50 dark:bg-[#231f1d] border border-border rounded-lg px-2 w-full"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-earth-500" />
                <input 
                  className="text-earth-500 font-medium bg-earth-50 dark:bg-[#231f1d] border border-border rounded-lg px-2 w-full"
                  value={formData.location}
                  placeholder="Location (e.g. Madurai, Tamil Nadu)"
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                />
              </div>
            </div>
          ) : (
            <>
              <h1 className="text-3xl font-bold text-earth-900 dark:text-white">{user.name}</h1>
              <p className="text-earth-500 font-medium flex items-center justify-center md:justify-start gap-1 mt-1">
                <MapPin className="h-4 w-4" /> {user.location || 'Set location'}
              </p>
            </>
          )}
          
          <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
            <span className="bg-earth-100 dark:bg-earth-800 text-earth-800 dark:text-earth-200 text-sm px-3 py-1 rounded-full font-medium capitalize">{user.role} Farmer</span>
            {!isEditing && (
              <>
                <span className="bg-earth-100 dark:bg-earth-800 text-earth-800 dark:text-earth-200 text-sm px-3 py-1 rounded-full font-medium">{user.landSize ? user.landSize + ' Acres' : 'No size set'}</span>
                <span className="bg-earth-100 dark:bg-earth-800 text-earth-800 dark:text-earth-200 text-sm px-3 py-1 rounded-full font-medium">{user.soilType || 'No soil type set'}</span>
              </>
            )}
          </div>

          {isEditing && (
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="text-xs text-earth-500 block mb-1">Land Size (Acres)</label>
                <input 
                  type="number"
                  step="0.1"
                  className="bg-earth-50 dark:bg-[#231f1d] border border-border rounded-lg px-2 py-1 w-full dark:text-white"
                  value={formData.landSize}
                  onChange={(e) => setFormData({...formData, landSize: e.target.value})}
                />
              </div>
              <div>
                <label className="text-xs text-earth-500 block mb-1">Soil Type</label>
                <select 
                  className="bg-earth-50 dark:bg-[#231f1d] border border-border rounded-lg px-2 py-1 w-full dark:text-white"
                  value={formData.soilType}
                  onChange={(e) => setFormData({...formData, soilType: e.target.value})}
                >
                  <option value="">Select Soil</option>
                  <option value="Red Soil">Red Soil</option>
                  <option value="Black Soil">Black Soil</option>
                  <option value="Clayey">Clayey</option>
                  <option value="Sandy">Sandy</option>
                </select>
              </div>
            </div>
          )}
        </div>
        
        <div className="z-10 mt-0 md:mt-16 flex gap-2">
          {isEditing ? (
            <>
              <button 
                onClick={handleUpdate}
                className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-full font-medium hover:bg-primary-500 transition-colors shadow-md"
              >
                <Save className="h-4 w-4" /> Save
              </button>
              <button 
                onClick={() => setIsEditing(false)}
                className="flex items-center gap-2 border border-border bg-white dark:bg-earth-100 text-earth-800 dark:text-white px-4 py-2 rounded-full font-medium hover:bg-earth-50 dark:hover:bg-earth-200 transition-colors"
              >
                <X className="h-4 w-4" /> Cancel
              </button>
            </>
          ) : (
            <button 
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 border border-border bg-white dark:bg-earth-100 text-earth-800 dark:text-white px-4 py-2 rounded-full font-medium hover:bg-earth-50 dark:hover:bg-earth-200 transition-colors"
            >
              <Settings className="h-4 w-4" /> Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border mb-6">
        <button className="px-6 py-3 font-bold text-primary-600 border-b-2 border-primary-600 flex items-center gap-2">
          <Bookmark className="h-5 w-5" /> Saved Guides
        </button>
        <button className="px-6 py-3 font-medium text-earth-500 hover:text-earth-900 dark:hover:text-white flex items-center gap-2 transition-colors">
          <Grid className="h-5 w-5" /> My Posts
        </button>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
         {user.savedCrops?.length > 0 ? (
           user.savedCrops.map(crop => (
             <div key={crop._id} className="bg-white dark:bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer">
                <div className="h-32 bg-primary-100 dark:bg-primary-900 relative"></div>
                <div className="p-4">
                  <h3 className="font-bold text-lg dark:text-white mb-1">{crop.name}</h3>
                  <p className="text-earth-500 text-sm">Saved recently</p>
                </div>
             </div>
           ))
         ) : (
           <p className="text-earth-500 text-sm italic col-span-3 text-center py-8">No saved guides yet. Explore crops to save them here.</p>
         )}
      </div>
    </div>
  );
}
