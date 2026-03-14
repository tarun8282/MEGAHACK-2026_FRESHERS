import React, { useState, useEffect } from 'react';
import { X, Megaphone, AlertTriangle, ShieldCheck, MapPin, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { createAlert } from '../../api/alerts';
import { fetchCities, City } from '../../api/cities';
import { useAuth } from '../../context/AuthContext';
import { AlertPriority } from '../../types/alert';

interface RaiseAlertModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (message: string) => void;
}

const RaiseAlertModal: React.FC<RaiseAlertModalProps> = ({ isOpen, onClose, onSuccess }) => {
    const { user } = useAuth();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('Emergency');
    const [priority, setPriority] = useState<AlertPriority>('high');
    const [targetType, setTargetType] = useState<'state' | 'city'>('state');
    const [targetCityId, setTargetCityId] = useState('');
    const [cities, setCities] = useState<City[]>([]);
    const [loading, setLoading] = useState(false);
    const [fetchingCities, setFetchingCities] = useState(false);

    useEffect(() => {
        if (isOpen && targetType === 'city' && user?.state_id) {
            loadCities();
        }
    }, [isOpen, targetType, user?.state_id]);

    const loadCities = async () => {
        setFetchingCities(true);
        try {
            const data = await fetchCities(user?.state_id);
            setCities(data);
        } catch (error) {
            console.error('Failed to load cities:', error);
        } finally {
            setFetchingCities(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await createAlert({
                title,
                description,
                category,
                priority,
                source: `${user?.states?.name || 'State'} Government`,
                state_id: user?.state_id,
                city_id: targetType === 'city' ? targetCityId : undefined,
                created_by: user?.id,
                location: targetType === 'state' ? 'State-wide' : cities.find(c => c.id === targetCityId)?.name || 'Local City'
            });

            if (result.success) {
                onSuccess('Alert broadcasted successfully!');
                onClose();
                // Reset form
                setTitle('');
                setDescription('');
                setTargetCityId('');
            }
        } catch (error: any) {
            alert(error.message || 'Failed to raise alert');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="bg-white dark:bg-slate-800 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden"
                >
                    <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between bg-navy-blue text-white">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white/20 rounded-xl">
                                <Megaphone size={24} />
                            </div>
                            <div>
                                <h2 className="text-xl font-black tracking-tight">Broadcast Official Alert</h2>
                                <p className="text-xs text-slate-300 font-medium tracking-wider uppercase">State Administration Portal</p>
                            </div>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                            <X size={24} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 space-y-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-black text-slate-700 dark:text-slate-300 uppercase tracking-widest mb-2">Alert Title</label>
                                <input 
                                    required
                                    type="text" 
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="e.g., Heavy Rainfall Red Alert"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-navy-blue-500 transition-all font-medium"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-black text-slate-700 dark:text-slate-300 uppercase tracking-widest mb-2">Description</label>
                                <textarea 
                                    required
                                    rows={3}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Detailed instructions for citizens..."
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-navy-blue-500 transition-all font-medium"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-black text-slate-700 dark:text-slate-300 uppercase tracking-widest mb-2">Priority</label>
                                    <select 
                                        value={priority}
                                        onChange={(e) => setPriority(e.target.value as AlertPriority)}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-navy-blue-500 transition-all font-bold"
                                    >
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                        <option value="critical">Critical</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-black text-slate-700 dark:text-slate-300 uppercase tracking-widest mb-2">Category</label>
                                    <select 
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-navy-blue-500 transition-all font-bold"
                                    >
                                        <option value="Emergency">Emergency</option>
                                        <option value="Weather">Weather</option>
                                        <option value="Infrastructure">Infrastructure</option>
                                        <option value="Health">Health</option>
                                        <option value="Traffic">Traffic</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-black text-slate-700 dark:text-slate-300 uppercase tracking-widest mb-2">Target Audience</label>
                                <div className="grid grid-cols-2 gap-2">
                                    <button 
                                        type="button"
                                        onClick={() => setTargetType('state')}
                                        className={`flex items-center justify-center gap-2 py-3 rounded-xl border-2 transition-all font-bold ${
                                            targetType === 'state' 
                                            ? 'border-navy-blue bg-navy-blue/5 text-navy-blue' 
                                            : 'border-slate-100 dark:border-slate-700 text-slate-500'
                                        }`}
                                    >
                                        <ShieldCheck size={18} /> Entire State
                                    </button>
                                    <button 
                                        type="button"
                                        onClick={() => setTargetType('city')}
                                        className={`flex items-center justify-center gap-2 py-3 rounded-xl border-2 transition-all font-bold ${
                                            targetType === 'city' 
                                            ? 'border-navy-blue bg-navy-blue/5 text-navy-blue' 
                                            : 'border-slate-100 dark:border-slate-700 text-slate-500'
                                        }`}
                                    >
                                        <MapPin size={18} /> Specific City
                                    </button>
                                </div>
                            </div>

                            {targetType === 'city' && (
                                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                                    <label className="block text-sm font-black text-slate-700 dark:text-slate-300 uppercase tracking-widest mb-2">Select City</label>
                                    <select 
                                        required
                                        value={targetCityId}
                                        onChange={(e) => setTargetCityId(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-navy-blue-500 transition-all font-bold"
                                    >
                                        <option value="">Choose a city...</option>
                                        {cities.map(city => (
                                            <option key={city.id} value={city.id}>{city.name}</option>
                                        ))}
                                    </select>
                                    {fetchingCities && <div className="mt-2 text-xs text-slate-400 flex items-center gap-1"><Loader2 size={12} className="animate-spin" /> Loading cities...</div>}
                                </motion.div>
                            )}
                        </div>

                        <div className="pt-4 flex gap-4">
                            <button 
                                type="button" 
                                onClick={onClose}
                                className="flex-1 py-4 rounded-2xl bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-black uppercase tracking-widest hover:bg-slate-200 transition-all"
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit"
                                disabled={loading}
                                className="flex-2 py-4 px-8 rounded-2xl bg-saffron text-white font-black uppercase tracking-widest hover:bg-saffron-600 shadow-xl shadow-saffron-200 dark:shadow-none transition-all flex items-center justify-center gap-2"
                            >
                                {loading ? <Loader2 className="animate-spin" /> : <AlertTriangle size={20} />}
                                Broadcast Alert
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default RaiseAlertModal;
