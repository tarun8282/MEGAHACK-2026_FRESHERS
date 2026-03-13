import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Upload, FileText, CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const ComplaintForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Report a Civic Issue</h1>
        <p className="text-slate-500 dark:text-slate-400">Fill in the details below to notify your municipal corporation.</p>
      </div>

      {/* Stepper */}
      <div className="flex items-center justify-center gap-4">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all",
              step === s ? "bg-indigo-600 text-white" : step > s ? "bg-green-500 text-white" : "bg-slate-200 dark:bg-slate-800 text-slate-500"
            )}>
              {step > s ? <CheckCircle2 size={20} /> : s}
            </div>
            {s < 3 && <div className="w-12 h-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
               <div className={cn("h-full bg-indigo-600 transition-all duration-500", step > s ? "w-full" : "w-0")}></div>
            </div>}
          </div>
        ))}
      </div>

      {/* Form Content */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-8 shadow-xl">
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-3 text-indigo-600 dark:text-indigo-400 font-bold mb-4">
              <FileText /> Step 1: Issue Details
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Issue Title</label>
                <input 
                  type="text" 
                  placeholder="e.g., Large pothole near Central Park gate" 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Detailed Description</label>
                <textarea 
                  rows={4}
                  placeholder="Explain the problem and how it's affecting your neighborhood..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-3 text-indigo-600 dark:text-indigo-400 font-bold mb-4">
              <MapPin /> Step 2: Location
            </div>
            <div className="aspect-video bg-slate-100 dark:bg-slate-900 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center gap-3 text-slate-500">
               <MapPin size={48} className="animate-bounce" />
               <p>Leaflet Map Picker Integration Pending...</p>
               <button className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-300 transition-colors">Use My Location</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-3 text-indigo-600 dark:text-indigo-400 font-bold mb-4">
              <Upload /> Step 3: Evidence (Photos/Video)
            </div>
            <div className="aspect-video bg-indigo-50/50 dark:bg-indigo-900/10 rounded-2xl border-2 border-dashed border-indigo-200 dark:border-indigo-800 flex flex-col items-center justify-center gap-4 group cursor-pointer hover:bg-indigo-50 transition-colors">
               <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Upload className="text-indigo-600" />
               </div>
               <div className="text-center">
                  <p className="font-bold text-slate-900 dark:text-white">Click or drag to upload</p>
                  <p className="text-sm text-slate-500">PNG, JPG, MP4 (Max 5 files)</p>
               </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between mt-10 pt-6 border-t border-slate-100 dark:border-slate-700">
          <button 
            onClick={prevStep}
            disabled={step === 1}
            className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 disabled:opacity-0 transition-all"
          >
            <ChevronLeft size={20} /> Back
          </button>
          
          {step < 3 ? (
            <button 
              onClick={nextStep}
              className="flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white rounded-full font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 dark:shadow-none transition-all"
            >
              Continue <ChevronRight size={20} />
            </button>
          ) : (
            <button 
              onClick={() => navigate('/dashboard')}
              className="px-10 py-3 bg-green-500 text-white rounded-full font-bold hover:bg-green-600 shadow-lg shadow-green-200 dark:shadow-none transition-all"
            >
              Submit Complaint
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComplaintForm;
