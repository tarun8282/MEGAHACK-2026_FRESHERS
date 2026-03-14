import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BarChart3, TrendingUp, Users, Target, Activity, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const OfficerAnalytics: React.FC = () => {
    const { user } = useAuth();

    return (
        <div className="space-y-8 pb-12 animate-in fade-in duration-500">
            <div className="space-y-1">
                <Link to="/officer/dashboard" className="flex items-center gap-2 text-slate-500 hover:text-navy-blue transition-all font-bold group mb-2">
                    <ArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
                </Link>
                <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase font-deva tracking-tight">
                    {user?.departments?.name || 'Department'} <span className="text-saffron">Analytics</span>
                </h1>
                <p className="text-slate-500 font-medium">Performance metrics for {user?.cities?.name || 'your jurisdiction'}.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Avg Resolution Time', value: 'N/A', change: 'Calculating...', icon: <Clock className="text-india-green-600" /> },
                    { label: 'SLA Compliance', value: '0%', change: 'Pending', icon: <Target className="text-saffron" /> },
                    { label: 'Active Officers', value: '1', change: 'Current', icon: <Users className="text-navy-blue" /> },
                    { label: 'Resolution Rate', value: '0%', change: 'N/A', icon: <Activity className="text-india-green-600" /> },
                ].map((stat, i) => (
                    <div key={i} className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] border border-slate-200 dark:border-slate-700 shadow-sm">
                        <div className="p-3 w-fit rounded-2xl bg-slate-50 dark:bg-slate-900 mb-4">{stat.icon}</div>
                        <div className="text-3xl font-black text-slate-900 dark:text-white">{stat.value}</div>
                        <div className="flex items-center justify-between mt-1">
                            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{stat.label}</div>
                            <div className="text-[10px] font-black text-slate-400 italic">{stat.change}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-slate-50 dark:bg-slate-900/50 p-12 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl shadow-sm flex items-center justify-center">
                    <BarChart3 size={32} className="text-saffron animate-pulse" />
                </div>
                <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white">Advanced Visualization Coming Soon</h3>
                    <p className="text-slate-500 max-w-sm mx-auto mt-2">Data models for monthly trends and category distribution are currently being calibrated for your department.</p>
                </div>
            </div>
        </div>
    );
};

export default OfficerAnalytics;
