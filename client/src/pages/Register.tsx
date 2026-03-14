import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AlertCircle, CheckCircle, Loader, ChevronDown } from 'lucide-react';
import { fetchStates, State } from '../api/states';
import { fetchCities, City } from '../api/cities';

type RegistrationStep = 'details' | 'otp-verification' | 'success';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { sendRegistrationOTP, verifyOTPAndSignUp } = useAuth();

  const [step, setStep] = useState<RegistrationStep>('details');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Step 1: Details form
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [password, setPassword] = useState('');

  // Location selection
  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [selectedStateId, setSelectedStateId] = useState('');
  const [selectedCityId, setSelectedCityId] = useState('');
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);

  // Step 2: OTP verification
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  // Load states on mount
  useEffect(() => {
    const loadStates = async () => {
      setLoadingStates(true);
      try {
        const data = await fetchStates();
        setStates(data);
      } catch (err) {
        console.error('Failed to load states:', err);
      } finally {
        setLoadingStates(false);
      }
    };
    loadStates();
  }, []);

  // Load cities when state changes
  useEffect(() => {
    if (!selectedStateId) {
      setCities([]);
      setSelectedCityId('');
      return;
    }
    const loadCities = async () => {
      setLoadingCities(true);
      setSelectedCityId('');
      try {
        const data = await fetchCities(selectedStateId);
        setCities(data);
      } catch (err) {
        console.error('Failed to load cities:', err);
      } finally {
        setLoadingCities(false);
      }
    };
    loadCities();
  }, [selectedStateId]);

  const handleOTPChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!fullName.trim()) return setError('Please enter your full name');
    if (!email.trim()) return setError('Please enter your email address');
    if (!mobileNo.trim()) return setError('Please enter your mobile number');
    if (password.length < 8) return setError('Password must be at least 8 characters long');
    if (!selectedStateId) return setError('Please select your state');
    if (!selectedCityId) return setError('Please select your city');

    setLoading(true);
    try {
      const response = await sendRegistrationOTP(email, fullName, mobileNo);
      if (response.success) {
        setSuccessMessage('OTP sent to your email. Check your inbox!');
        setStep('otp-verification');
        setError('');
      } else {
        setError(response.error || response.message);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const otpToken = otp.join('');
    if (otpToken.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    setLoading(true);
    try {
      // Pass state_id and city_id so the backend saves them to the citizen profile
      const response = await verifyOTPAndSignUp(
        email,
        fullName,
        mobileNo,
        otpToken,
        password,
        selectedCityId,
        selectedStateId
      );

      if (response.success) {
        setSuccessMessage('Account created successfully! Redirecting...');
        setStep('success');
        setTimeout(() => navigate('/dashboard'), 2000);
      } else {
        setError(response.error || response.message);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to verify OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setError('');
    setLoading(true);
    try {
      const response = await sendRegistrationOTP(email, fullName, mobileNo);
      if (response.success) {
        setSuccessMessage('OTP sent again. Check your email!');
        setOtp(['', '', '', '', '', '']);
      } else {
        setError(response.error || response.message);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to resend OTP');
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-saffron-500 focus:border-transparent transition-all shadow-sm';

  return (
    <div className="flex items-center justify-center min-h-[80vh] py-12">
      <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700 w-full max-w-md space-y-6">

        {/* Header */}
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white font-deva">Join NagarSetu</h2>
          <p className="text-slate-500 dark:text-slate-400">Be the bridge to a better city</p>
        </div>

        {/* Step Progress */}
        {step !== 'success' && (
          <div className="flex items-center gap-2">
            <div className={`flex-1 h-1.5 rounded-full transition-colors ${step === 'details' ? 'bg-saffron' : 'bg-india-green-500'}`} />
            <div className={`flex-1 h-1.5 rounded-full transition-colors ${step === 'otp-verification' ? 'bg-saffron' : step === 'success' ? 'bg-india-green-500' : 'bg-slate-200 dark:bg-slate-700'}`} />
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl text-red-700 dark:text-red-400 text-sm flex gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Success */}
        {successMessage && step !== 'success' && (
          <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl text-green-700 dark:text-green-400 text-sm flex gap-3">
            <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* ==================== STEP 1: DETAILS ==================== */}
        {step === 'details' && (
          <form onSubmit={handleSendOTP} className="space-y-4">

            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Full Name</label>
              <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Rajesh Kumar" className={inputClass} disabled={loading} autoFocus />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email Address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="rajesh@example.com" className={inputClass} disabled={loading} />
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Mobile Number</label>
              <div className="flex">
                <span className="px-4 py-3 rounded-l-lg border border-r-0 border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-slate-600 text-slate-700 dark:text-slate-300 text-sm font-medium">+91</span>
                <input type="tel" value={mobileNo} onChange={(e) => setMobileNo(e.target.value)} placeholder="Enter mobile number" className="flex-1 px-4 py-3 rounded-r-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-saffron-500 transition-all shadow-sm" disabled={loading} />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Create Password <span className="text-xs text-slate-400">(min 8 characters)</span></label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className={inputClass} disabled={loading} />
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 pt-1">
              <div className="flex-1 h-px bg-slate-200 dark:bg-slate-600" />
              <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Your Location</span>
              <div className="flex-1 h-px bg-slate-200 dark:bg-slate-600" />
            </div>

            {/* State Selector */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">State <span className="text-red-500">*</span></label>
              <div className="relative">
                <select
                  value={selectedStateId}
                  onChange={(e) => setSelectedStateId(e.target.value)}
                  className={`${inputClass} appearance-none`}
                  disabled={loading || loadingStates}
                >
                  <option value="">{loadingStates ? 'Loading states...' : 'Select your state'}</option>
                  {states.map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-3.5 w-5 h-5 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* City Selector */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">City / Municipality <span className="text-red-500">*</span></label>
              <div className="relative">
                <select
                  value={selectedCityId}
                  onChange={(e) => setSelectedCityId(e.target.value)}
                  className={`${inputClass} appearance-none`}
                  disabled={loading || !selectedStateId || loadingCities}
                >
                  <option value="">
                    {!selectedStateId ? 'Select a state first' : loadingCities ? 'Loading cities...' : 'Select your city'}
                  </option>
                  {cities.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-3.5 w-5 h-5 text-slate-400 pointer-events-none" />
              </div>
              <p className="mt-1 text-xs text-slate-400">Used to show you relevant complaints and alerts in your area.</p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || !fullName || !email || !mobileNo || password.length < 8 || !selectedStateId || !selectedCityId}
              className="w-full py-3 px-4 rounded-lg bg-saffron hover:bg-saffron-600 shadow-md shadow-saffron-200/50 dark:shadow-none disabled:bg-slate-400 disabled:shadow-none text-white font-bold transition-all flex items-center justify-center gap-2"
            >
              {loading && <Loader className="w-4 h-4 animate-spin" />}
              {loading ? 'Sending OTP...' : 'Send OTP to Email'}
            </button>

            <div className="text-center text-sm text-slate-600 dark:text-slate-400">
              Already have an account?{' '}
              <button type="button" onClick={() => navigate('/login')} className="text-saffron-600 hover:text-saffron-700 dark:text-saffron-400 font-bold transition-colors">
                Login here
              </button>
            </div>
          </form>
        )}

        {/* ==================== STEP 2: OTP ==================== */}
        {step === 'otp-verification' && (
          <form onSubmit={handleVerifyOTP} className="space-y-6">
            <div className="text-center space-y-1">
              <p className="text-sm text-slate-600 dark:text-slate-400">OTP sent to your email</p>
              <p className="font-semibold text-slate-900 dark:text-white break-all">{email}</p>
            </div>

            <div className="flex gap-2 justify-center">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  value={digit}
                  onChange={(e) => handleOTPChange(index, e.target.value.slice(-1))}
                  maxLength={1}
                  className="w-12 h-12 text-center text-2xl rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-saffron-500 focus:ring-2 focus:ring-saffron-500/20 transition-all shadow-sm font-bold"
                  disabled={loading}
                  inputMode="numeric"
                />
              ))}
            </div>

            <div className="text-center">
              <button type="button" onClick={handleResendOTP} disabled={loading} className="text-sm text-saffron-600 hover:text-saffron-700 dark:text-saffron-400 font-bold transition-colors">
                Didn't receive OTP? Resend
              </button>
            </div>

            <button
              type="submit"
              disabled={loading || otp.join('').length !== 6}
              className="w-full py-3 px-4 rounded-lg bg-india-green-500 hover:bg-india-green-600 shadow-md shadow-india-green-200/50 dark:shadow-none disabled:bg-slate-400 disabled:shadow-none text-white font-bold transition-all flex items-center justify-center gap-2"
            >
              {loading && <Loader className="w-4 h-4 animate-spin" />}
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>

            <button
              type="button"
              onClick={() => { setStep('details'); setOtp(['', '', '', '', '', '']); setSuccessMessage(''); }}
              className="w-full py-2 px-4 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              ← Back
            </button>
          </form>
        )}

        {/* ==================== STEP 3: SUCCESS ==================== */}
        {step === 'success' && (
          <div className="text-center space-y-5 py-4">
            <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto">
              <CheckCircle className="w-12 h-12 text-india-green-500" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Account Created!</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Welcome to NagarSetu. You're all set to start reporting and tracking civic complaints.
              </p>
              <p className="text-sm text-slate-400 flex items-center justify-center gap-2">
                <Loader className="w-4 h-4 animate-spin" /> Redirecting to your dashboard...
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Register;