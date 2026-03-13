import { BarChart3, TrendingUp, Users, AlertTriangle, Map as MapIcon, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
    // Mock Admin Overview
    return (
        <div className="space-y-10 animate-in fade-in duration-1000">
            {/* Admin Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Mumbai City Overview</h1>
                    <p className="text-slate-500 font-medium">Real-time performance across all 12 departments.</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 transition-all shadow-sm">
                    <Download size={18} /> Export Report
                </button>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Total Complaints', val: '1,284', delta: '+12%', icon: <BarChart3 className="text-blue-500" />, color: 'bg-blue-50' },
                    { label: 'Resolution Rate', val: '84.2%', delta: '+5.4%', icon: <TrendingUp className="text-green-500" />, color: 'bg-green-50' },
                    { label: 'Active Officers', val: '142', delta: '0%', icon: <Users className="text-indigo-500" />, color: 'bg-indigo-50' },
                    { label: 'SLA Breaches', val: '24', delta: '-15%', icon: <AlertTriangle className="text-red-500" />, color: 'bg-red-50' },
                ].map((kpi, i) => (
                    <div key={i} className="bg-white dark:bg-slate-800 p-8 rounded-[32px] border border-slate-200 dark:border-slate-700 space-y-4 hover:shadow-xl transition-shadow relative overflow-hidden">
                        <div className={`w-14 h-14 ${kpi.color} rounded-2xl flex items-center justify-center`}>
                           {kpi.icon}
                        </div>
                        <div className="space-y-1">
                            <div className="text-slate-500 text-xs font-bold uppercase tracking-widest">{kpi.label}</div>
                            <div className="flex items-end gap-3">
                                <span className="text-4xl font-black text-slate-900 dark:text-white">{kpi.val}</span>
                                <span className="text-sm font-bold text-green-500 mb-1">{kpi.delta}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-2 gap-8">
                {/* Department Leaderboard */}
                <div className="bg-white dark:bg-slate-800 p-8 rounded-[40px] border border-slate-200 dark:border-slate-700 space-y-6">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                        <TrendingUp className="text-indigo-600" /> Department Performance
                    </h3>
                    <div className="space-y-6">
                        {[
                            { dept: 'Water Supply', rate: 94, color: 'bg-blue-500' },
                            { dept: 'Solid Waste', rate: 88, color: 'bg-green-500' },
                            { dept: 'Roads & Traffic', rate: 72, color: 'bg-indigo-500' },
                            { dept: 'Electricity', rate: 91, color: 'bg-amber-500' },
                            { dept: 'Sanitation', rate: 65, color: 'bg-red-500' },
                        ].map((d, i) => (
                            <div key={i} className="space-y-2">
                                <div className="flex justify-between text-sm font-bold uppercase tracking-tighter">
                                    <span className="text-slate-700 dark:text-slate-300">{d.dept}</span>
                                    <span className="text-slate-900 dark:text-white">{d.rate}% Resolved</span>
                                </div>
                                <div className="h-3 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
                                    <div className={`h-full ${d.color} transition-all duration-1000`} style={{ width: `${d.rate}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* City Heatmap Preview Placeholder */}
                <div className="bg-slate-900 text-white p-8 rounded-[40px] relative overflow-hidden group">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1570160897040-d8229fb9c922?q=80&w=2070&auto=format&fit=crop')] bg-cover opacity-20 transition-transform duration-1000 group-hover:scale-110"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                    
                    <div className="relative z-10 h-full flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                            <h3 className="text-2xl font-bold flex items-center gap-2 uppercase tracking-tighter">
                                <MapIcon className="text-red-500" /> Hotspot Map
                            </h3>
                            <p className="text-slate-400 text-sm">Visualizing complaint density across the city.</p>
                        </div>
                        <Link to="/heatmap" className="w-full py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center gap-2 font-bold transition-all border border-white/10">
                            Explore Heatmap <TrendingUp size={18} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
