'use client';
import { useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import Link from 'next/link';
import { Leaf, Sprout, User, Mail, Lock, CheckCircle2, ArrowLeft, Eye, EyeOff } from 'lucide-react';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'beginner'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('signup'); // 'signup' or 'otp'
  const [mockOtp, setMockOtp] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { registerRequest, verifyOTP } = useAuth();

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    const res = await registerRequest(formData);
    setIsSubmitting(false);
    if (res.success) {
      setMockOtp(res.mockOtp);
      setStep('otp');
      setSuccessMessage('Verification OTP sent successfully!');
      setTimeout(() => setSuccessMessage(''), 5000);
    } else {
      setError(res.message);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (otp.length !== 6) {
      setError('OTP must be exactly 6 digits');
      return;
    }
    setIsSubmitting(true);
    const res = await verifyOTP(formData.email, otp);
    setIsSubmitting(false);
    if (!res.success) {
      setError(res.message);
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center bg-earth-50 dark:bg-[#1a1715] p-4 min-h-[calc(100vh-4rem)]">
      <div className="w-full max-w-md bg-white dark:bg-card border border-border rounded-3xl p-8 shadow-xl relative overflow-hidden transition-all duration-300">
        
        {/* Decorative corner background */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/5 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary-500/5 rounded-full blur-2xl pointer-events-none"></div>

        {step === 'signup' ? (
          <>
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900/50 rounded-full mb-4 shadow-inner">
                <Leaf className="h-8 w-8 text-primary-600 dark:text-primary-500 animate-pulse" />
              </div>
              <h1 className="text-3xl font-bold text-earth-900 dark:text-white tracking-tight">Join AgriHelp</h1>
              <p className="text-earth-500 dark:text-earth-400 mt-2">Start your farming journey today</p>
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-950/35 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 p-3.5 rounded-xl mb-6 text-sm text-center font-medium animate-shake">
                {error}
              </div>
            )}

            <form onSubmit={handleSignupSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-earth-700 dark:text-earth-300 mb-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-earth-400" />
                  <input
                    type="text"
                    required
                    className="w-full bg-earth-50 dark:bg-[#231f1d] border border-border rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 ring-primary-500 dark:text-white transition-all duration-200"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-earth-700 dark:text-earth-300 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-earth-400" />
                  <input
                    type="email"
                    required
                    className="w-full bg-earth-50 dark:bg-[#231f1d] border border-border rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 ring-primary-500 dark:text-white transition-all duration-200"
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
                    className="w-full bg-earth-50 dark:bg-[#231f1d] border border-border rounded-xl pl-10 pr-10 py-2.5 focus:outline-none focus:ring-2 ring-primary-500 dark:text-white transition-all duration-200"
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

              <div>
                <label className="block text-sm font-medium text-earth-700 dark:text-earth-300 mb-3">I am a...</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, role: 'beginner' })}
                    className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all cursor-pointer ${
                      formData.role === 'beginner' 
                      ? 'border-primary-600 bg-primary-50 dark:bg-primary-950/20 text-primary-700 dark:text-primary-400' 
                      : 'border-border hover:border-primary-200 dark:hover:border-primary-900/30 text-earth-600 dark:text-earth-400'
                    }`}
                  >
                    <Sprout className="h-5 w-5" /> Beginner
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, role: 'experienced' })}
                    className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all cursor-pointer ${
                      formData.role === 'experienced' 
                      ? 'border-primary-600 bg-primary-50 dark:bg-primary-950/20 text-primary-700 dark:text-primary-400' 
                      : 'border-border hover:border-primary-200 dark:hover:border-primary-900/30 text-earth-600 dark:text-earth-400'
                    }`}
                  >
                    <Leaf className="h-5 w-5" /> Experienced
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary-600 hover:bg-primary-500 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all mt-6 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Requesting Code...' : 'Create Account'}
              </button>
            </form>

            <p className="text-center text-earth-500 dark:text-earth-400 mt-8 text-sm">
              Already have an account?{' '}
              <Link href="/login" className="text-primary-600 dark:text-primary-500 font-bold hover:underline">
                Log In
              </Link>
            </p>
          </>
        ) : (
          <>
            <div className="text-center mb-8 animate-fade-in">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900/50 rounded-full mb-4 shadow-inner">
                <CheckCircle2 className="h-8 w-8 text-primary-600 dark:text-primary-500" />
              </div>
              <h1 className="text-3xl font-bold text-earth-900 dark:text-white tracking-tight">Verify Your Email</h1>
              <p className="text-earth-500 dark:text-earth-400 mt-2 text-sm leading-relaxed">
                We've sent a 6-digit OTP to<br />
                <span className="font-semibold text-earth-800 dark:text-white">{formData.email}</span>
              </p>
            </div>

            {successMessage && (
              <div className="bg-primary-50 dark:bg-primary-950/20 border border-primary-200 dark:border-primary-900 text-primary-700 dark:text-primary-400 p-3 rounded-xl mb-6 text-sm text-center font-medium animate-fade-in">
                {successMessage}
              </div>
            )}

            {error && (
              <div className="bg-red-50 dark:bg-red-950/35 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 p-3.5 rounded-xl mb-6 text-sm text-center font-medium">
                {error}
              </div>
            )}

            {/* Mock OTP display container */}
            <div className="bg-primary-50 dark:bg-primary-950/20 border border-primary-200 dark:border-primary-900 rounded-2xl p-5 mb-6 text-center shadow-sm">
              <span className="text-[10px] uppercase tracking-wider font-bold text-primary-700 dark:text-primary-400 block mb-1">Local Testing OTP Code</span>
              <span className="text-3xl font-black tracking-widest text-primary-900 dark:text-primary-300 select-all">{mockOtp}</span>
              <span className="text-[10px] text-earth-500 dark:text-earth-400 block mt-2 leading-tight">Copy this code and paste it in the field below to verify.</span>
            </div>

            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-earth-700 dark:text-earth-300 mb-1 text-center">Verification Code</label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  className="w-full bg-earth-50 dark:bg-[#231f1d] border border-border rounded-xl py-3.5 text-center text-3xl font-extrabold tracking-widest focus:outline-none focus:ring-2 ring-primary-500 dark:text-white dark:placeholder-earth-700 transition-all duration-200"
                  placeholder="000000"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').substring(0, 6))}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary-600 hover:bg-primary-500 text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all mt-6 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Verifying...' : 'Verify & Setup Profile'}
              </button>
            </form>

            <button
              type="button"
              onClick={() => {
                setStep('signup');
                setOtp('');
                setError('');
              }}
              className="w-full flex items-center justify-center gap-2 text-earth-500 hover:text-earth-800 dark:text-earth-400 dark:hover:text-white text-sm font-bold mt-5 transition-colors cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" /> Edit Details
            </button>
          </>
        )}
      </div>
    </div>
  );
}
