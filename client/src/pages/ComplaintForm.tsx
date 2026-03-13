import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Upload, FileText, CheckCircle2, ChevronRight, ChevronLeft, Loader, AlertCircle } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useAuth } from '../context/AuthContext';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const ComplaintForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const { user } = useAuth();

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const nextStep = () => {
    // Validate current step before moving forward
    if (step === 1) {
      if (!title.trim() || !description.trim()) {
        setError('Please fill in all fields');
        return;
      }
    }
    if (step === 2) {
      if (!latitude || !longitude) {
        setError('Please select a location');
        return;
      }
    }
    setError('');
    setStep(prev => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setError('');
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length + files.length > 5) {
      setError('Maximum 5 files allowed');
      return;
    }
    setFiles([...files, ...selectedFiles]);
    setError('');
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleUseMyLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude.toString());
        setLongitude(position.coords.longitude.toString());
        setError('');
      }, (error) => {
        setError('Failed to get location: ' + error.message);
      });
    } else {
      setError('Geolocation not supported by your browser');
    }
  };

  const handleSubmit = async () => {
    try {
      if (!user?.id) {
        setError('User not authenticated');
        return;
      }

      setLoading(true);
      setError('');

      const formData = new FormData();
      formData.append('citizen_id', user.id);
      formData.append('title', title);
      formData.append('description', description);
      formData.append('latitude', latitude);
      formData.append('longitude', longitude);
      formData.append('city_id', user.city_id || '');
      formData.append('state_id', user.state_id || '');

      // Add files to formData
      files.forEach((file) => {
        formData.append('media', file);
      });

      const response = await fetch('/api/complaints', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit complaint');
      }

      setSuccessMessage('Complaint submitted successfully! Complaint No: ' + data.complaint_number);
      setStep(3);
      
      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Error submitting complaint');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white font-deva">Report a Civic Issue</h1>
        <p className="text-slate-500 dark:text-slate-400">Fill in the details below to notify your municipal corporation.</p>
      </div>

      {/* Stepper */}
      <div className="flex items-center justify-center gap-4">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center font-bold transition-all",
              step === s ? "bg-saffron text-white" : step > s ? "bg-india-green-500 text-white" : "bg-slate-200 dark:bg-slate-800 text-slate-500"
            )}>
              {step > s ? <CheckCircle2 size={20} /> : s}
            </div>
            {s < 3 && <div className="w-12 h-1 bg-slate-200 dark:bg-slate-800 rounded-lg overflow-hidden">
               <div className={cn("h-full bg-saffron transition-all duration-500", step > s ? "w-full" : "w-0")}></div>
            </div>}
          </div>
        ))}
      </div>

      {/* Error/Success Messages */}
      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-3 text-red-700 dark:text-red-300">
          <AlertCircle size={20} />
          {error}
        </div>
      )}
      {successMessage && (
        <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center gap-3 text-green-700 dark:text-green-300">
          <CheckCircle2 size={20} />
          {successMessage}
        </div>
      )}

      {/* Form Content */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-8 shadow-xl">
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-3 text-saffron-600 dark:text-saffron-400 font-bold mb-4">
              <FileText /> Step 1: Issue Details
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Issue Title *</label>
                <input 
                  type="text" 
                  placeholder="e.g., Large pothole near Central Park gate" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-saffron-500 outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Detailed Description *</label>
                <textarea 
                  rows={4}
                  placeholder="Explain the problem and how it's affecting your neighborhood..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-saffron-500 outline-none transition-all"
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-3 text-saffron-600 dark:text-saffron-400 font-bold mb-4">
              <MapPin /> Step 2: Location
            </div>
            {latitude && longitude ? (
              <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <p className="text-green-700 dark:text-green-300 font-semibold">Location selected!</p>
                <p className="text-sm text-green-600 dark:text-green-400">Latitude: {latitude}, Longitude: {longitude}</p>
              </div>
            ) : (
              <div className="aspect-video bg-slate-100 dark:bg-slate-900 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center gap-3 text-slate-500">
                 <MapPin size={48} className="animate-bounce" />
                 <p>Map integration pending - Use button below for now</p>
              </div>
            )}
            <button 
              onClick={handleUseMyLocation}
              className="w-full px-4 py-3 bg-navy-blue-500 text-white rounded-lg hover:bg-navy-blue-600 transition-colors font-semibold"
            >
              📍 Use My Current Location
            </button>
            <p className="text-xs text-slate-500">We'll use your device's GPS to pinpoint the exact location of the issue.</p>
          </div>
        )}

        {step === 3 && !successMessage && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-3 text-saffron-600 dark:text-saffron-400 font-bold mb-4">
              <Upload /> Step 3: Evidence (Photos/Video)
            </div>
            <label className="aspect-video bg-saffron-50/50 dark:bg-saffron-900/10 rounded-lg border-2 border-dashed border-saffron-200 dark:border-saffron-800 flex flex-col items-center justify-center gap-4 group cursor-pointer hover:bg-saffron-50 transition-colors">
               <input 
                 type="file" 
                 multiple 
                 accept="image/*,video/*"
                 onChange={handleFileChange}
                 className="hidden"
               />
               <div className="w-16 h-16 bg-saffron-100 dark:bg-saffron-900/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Upload className="text-saffron-600" />
               </div>
               <div className="text-center">
                  <p className="font-bold text-slate-900 dark:text-white">Click or drag to upload</p>
                  <p className="text-sm text-slate-500">PNG, JPG, MP4 (Max 5 files)</p>
               </div>
            </label>
            {files.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">Uploaded files ({files.length}/5):</p>
                <div className="space-y-2">
                  {files.map((file, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
                      <span className="text-sm text-slate-600 dark:text-slate-400">{file.name}</span>
                      <button
                        onClick={() => removeFile(idx)}
                        className="text-red-600 hover:text-red-700 text-sm font-semibold"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {successMessage && step === 3 && (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="text-green-600" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Complaint Submitted!</h2>
            <p className="text-slate-600 dark:text-slate-400">{successMessage}</p>
            <p className="text-sm text-slate-500">Redirecting to dashboard...</p>
          </div>
        )}

        {/* Action Buttons */}
        {!successMessage && (
          <div className="flex items-center justify-between mt-10 pt-6 border-t border-slate-100 dark:border-slate-700">
            <button 
              onClick={prevStep}
              disabled={step === 1 || loading}
              className="flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 disabled:opacity-0 transition-all"
            >
              <ChevronLeft size={20} /> Back
            </button>
            
            {step < 3 ? (
              <button 
                onClick={nextStep}
                disabled={loading}
                className="flex items-center gap-2 px-8 py-3 bg-saffron text-white rounded-lg font-bold hover:bg-saffron-600 shadow-lg shadow-saffron-200 dark:shadow-none transition-all disabled:opacity-50"
              >
                {loading ? <Loader size={20} className="animate-spin" /> : 'Continue'} <ChevronRight size={20} />
              </button>
            ) : (
              <button 
                onClick={handleSubmit}
                disabled={loading || !latitude || !longitude || title.trim() === '' || description.trim() === ''}
                className="px-10 py-3 bg-india-green-500 text-white rounded-lg font-bold hover:bg-india-green-600 shadow-lg shadow-india-green-200 dark:shadow-none transition-all disabled:opacity-50 flex items-center gap-2"
              >
                {loading ? <Loader size={20} className="animate-spin" /> : 'Submit Complaint'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ComplaintForm;
