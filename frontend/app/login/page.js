'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/AuthContext';
import Link from 'next/link';
import { Leaf, Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const { login } = useAuth();

  useEffect(() => {
    // Check if saved credentials exist in localStorage
    const savedEmail = localStorage.getItem('agrihelp_remember_email');
    const savedPassword = localStorage.getItem('agrihelp_remember_password');
    if (savedEmail) {
      setFormData({
        email: savedEmail,
        password: savedPassword || ''
      });
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (rememberMe) {
      localStorage.setItem('agrihelp_remember_email', formData.email);
      localStorage.setItem('agrihelp_remember_password', formData.password);
    } else {
      localStorage.removeItem('agrihelp_remember_email');
      localStorage.removeItem('agrihelp_remember_password');
    }

    const res = await login(formData.email, formData.password);
    if (!res.success) {
      setError(res.message);
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center bg-earth-50 dark:bg-[#1a1715] p-4 min-h-[calc(100vh-4rem)]">
      <div className="w-full max-w-md bg-white dark:bg-card border border-border rounded-3xl p-8 shadow-xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900/50 rounded-full mb-4">
            <Leaf className="h-8 w-8 text-primary-600 dark:text-primary-500 animate-pulse" />
          </div>
          <h1 className="text-3xl font-bold text-earth-900 dark:text-white tracking-tight">Welcome Back</h1>
          <p className="text-earth-500 dark:text-earth-400 mt-2">Log in to manage your farm profile</p>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-950/35 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 p-3.5 rounded-xl mb-6 text-sm text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-earth-700 dark:text-earth-300 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-earth-400" />
              <input
                type="email"
                required
                className="w-full bg-earth-50 dark:bg-[#231f1d] border border-border rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 ring-primary-500 dark:text-white transition-all"
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-earth-700 dark:text-earth-300 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-earth-400" />
              <input
                type={showPassword ? "text" : "password"}
                required
                className="w-full bg-earth-50 dark:bg-[#231f1d] border border-border rounded-xl pl-10 pr-10 py-2.5 focus:outline-none focus:ring-2 ring-primary-500 dark:text-white transition-all"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-earth-400 hover:text-earth-200 p-1 cursor-pointer"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 text-sm text-earth-600 dark:text-earth-400 cursor-pointer">
              <input 
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded accent-primary-600 h-4 w-4 border-border"
              />
              Remember my login info
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-primary-600 hover:bg-primary-500 text-white font-bold py-3 rounded-xl shadow-lg transition-all mt-6 cursor-pointer"
          >
            Log In
          </button>
        </form>

        <p className="text-center text-earth-500 dark:text-earth-400 mt-8 text-sm">
          Don't have an account?{' '}
          <Link href="/signup" className="text-primary-600 dark:text-primary-500 font-bold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
