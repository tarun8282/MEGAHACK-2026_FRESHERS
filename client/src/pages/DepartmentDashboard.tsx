import React from 'react';
import { LayoutDashboard, ListFilter, Clock, Search } from 'lucide-react';

const DepartmentDashboard: React.FC = () => {
    // Mock data for Officer
    const complaints = [
        { id: '1', number: 'MH-MUM-2024-0342', title: 'Deep Pothole on Linking Road', status: 'in_progress', priority: 'high', date: '2 hours ago' },
        { id: '2', number: 'MH-MUM-2024-0345', title: 'Road damage near Juhu', status: 'under_review', priority: 'medium', date: '5 hours ago' },
        { id: '3', number: 'MH-MUM-2024-0350', title: 'Potholes in Bandra East', status: 'escalated', priority: 'critical', date: '1 day ago' },
    ];

    return (
        <div className="space-y-10">
            {/* Officer Header */}
            <div className="bg-slate-900 text-white p-10 rounded-[40px] relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 text-slate-800 -z-10 rotate-12">
                   <LayoutDashboard size={200} />
                </div>
                <div className="relative z-10 space-y-4">
                    <div className="inline-block px-4 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-bold uppercase tracking-widest border border-indigo-500/30">
                        Officer Dashboard
                    </div>
                    <h1 className="text-4xl font-bold">BMC Roads Department</h1>
                    <p className="text-slate-400 max-w-lg">Manage your assigned complaints and resolve them before the SLA deadline.</p>
                </div>
            </div>

            {/* Performance Mini Stats */}
            <div className="grid md:grid-cols-3 gap-6">
                {[
                    { label: 'Assigned Today', val: '12', color: 'text-indigo-600', bg: 'bg-indigo-50' },
                    { label: 'Avg Resolution', val: '14.5h', color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'SLA Compliance', val: '92%', color: 'text-green-600', bg: 'bg-green-50' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700">
                        <div className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-2">{stat.label}</div>
                        <div className={`text-4xl font-black ${stat.color}`}>{stat.val}</div>
                    </div>
                ))}
            </div>

            {/* Queue Section */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                        <Clock className="text-indigo-600" /> Pending Queue
                    </h2>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input type="text" placeholder="Search ID..." className="pl-10 pr-4 py-2 rounded-xl bg-white border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm w-64" />
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                            <ListFilter size={18} /> Filters
                        </button>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[32px] overflow-hidden shadow-xl">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
                                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">ID & Title</th>
                                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest text-center">Priority</th>
                                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest text-center">Status</th>
                                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {complaints.map((c) => (
                                <tr key={c.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="font-mono text-xs font-bold text-indigo-600 mb-1">{c.number}</div>
                                        <div className="font-bold text-slate-900 dark:text-white uppercase group-hover:text-indigo-600 transition-colors">{c.title}</div>
                                        <div className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                                            <Clock size={12} /> Received {c.date}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-center">
                                        <span className={cn(
                                            "px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border",
                                            c.priority === 'critical' ? "bg-red-100 text-red-700 border-red-200" :
                                            c.priority === 'high' ? "bg-orange-100 text-orange-700 border-orange-200" : "bg-blue-100 text-blue-700 border-blue-200"
                                        )}>
                                            {c.priority}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-center">
                                        <span className="capitalize text-slate-600 dark:text-slate-400 font-medium text-sm border px-3 py-1 rounded-full bg-white dark:bg-slate-900">
                                            {c.status.replace('_', ' ')}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <button className="px-6 py-2 bg-indigo-600 text-white rounded-full font-bold text-sm hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all">
                                            Resolve
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(' ');
}

export default DepartmentDashboard;
