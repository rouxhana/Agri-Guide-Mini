'use client';
import Link from 'next/link';
import { Leaf, Search, User, Globe } from 'lucide-react';

import { useAuth } from '@/lib/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[var(--border)] bg-[var(--card)] text-[var(--card-foreground)] shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Leaf className="h-6 w-6 text-primary-600" />
          <span className="font-bold text-xl tracking-tight text-primary-900 dark:text-primary-50">AgriHelp</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/analytics" className="hover:text-primary-600 transition-colors">Crop Analytics</Link>
          <Link href="/diagnostics" className="hover:text-primary-600 transition-colors">Soil Diagnostics</Link>
          <Link href="/community" className="hover:text-primary-600 transition-colors">Community</Link>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-[var(--border)] rounded-full transition-colors" aria-label="Language">
            <Globe className="h-5 w-5" />
          </button>
          
          {user ? (
            <div className="flex items-center gap-4">
              <Link href="/profile" className="flex items-center gap-2 p-1.5 hover:bg-[var(--border)] rounded-full transition-colors pr-4">
                <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center font-bold text-primary-700">
                  {user.name?.[0].toUpperCase()}
                </div>
                <span className="hidden lg:inline text-sm font-medium">{user.name}</span>
              </Link>
              <button 
                onClick={logout}
                className="text-sm font-bold text-earth-500 hover:text-red-500 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login" className="px-4 py-2 text-sm font-bold text-earth-800 hover:text-primary-600 transition-colors">
                Login
              </Link>
              <Link href="/signup" className="px-4 py-2 text-sm font-bold bg-primary-600 text-white rounded-full hover:bg-primary-500 transition-colors shadow-md">
                Join
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
