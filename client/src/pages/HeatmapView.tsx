import React, { useEffect, useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';
import { Info, Loader, AlertCircle, LocateFixed } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// Component to handle auto-bounds and fly-to
const MapController = ({ userLocation, recenterTrigger, complaints }: { 
    userLocation: [number, number] | null, 
    recenterTrigger: number,
    complaints: Complaint[]
}) => {
    const map = useMap();

    // Auto-fit bounds when complaints load
    useEffect(() => {
        if (complaints.length > 0) {
            const bounds = L.latLngBounds(complaints.map(c => [c.latitude, c.longitude]));
            map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
        }
    }, [complaints, map]);

    // Fly to user location
    useEffect(() => {
        if (userLocation) {
            map.flyTo(userLocation, 14, { duration: 1.5 });
        }
    }, [userLocation, map, recenterTrigger]);

    return null;
};

// Actual Heatmap Layer using leaflet.heat
const HeatLayer = ({ points }: { points: [number, number, number][] }) => {
    const map = useMap();

    useEffect(() => {
        if (!points || points.length === 0) return;

        // @ts-ignore - L.heatLayer is added by 'leaflet.heat'
        const heat = L.heatLayer(points, {
            radius: 25,
            blur: 15,
            maxZoom: 17,
            gradient: {
                0.4: 'blue',
                0.6: 'cyan',
                0.8: 'lime',
                0.9: 'yellow',
                1.0: 'red'
            }
        }).addTo(map);

        return () => {
            map.removeLayer(heat);
        };
    }, [points, map]);

    return null;
};

interface Complaint {
    id: string;
    complaint_number: string;
    title: string;
    description: string;
    latitude: number;
    longitude: number;
    status: string;
    address: string;
    priority?: string;
}

const createIcon = (priority: string) => {
    const colors: { [key: string]: string } = {
        'high': '#ef4444',
        'critical': '#991b1b',
        'medium': '#f97316',
        'low': '#22c55e',
        'urgent': '#dc2626'
    };
    const color = colors[priority?.toLowerCase()] || '#64748b';
    return L.divIcon({
        html: `<div style="background: ${color}; border: 3px solid white; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>`,
        iconSize: [24, 24],
        className: 'custom-marker'
    });
};

const createUserIcon = () => {
    return L.divIcon({
        html: `<div style="background: #2563eb; border: 2px solid white; border-radius: 50%; width: 14px; height: 14px; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.3), 0 2px 8px rgba(0,0,0,0.3);"></div>`,
        iconSize: [14, 14],
        className: 'user-marker'
    });
};

const HeatmapView: React.FC = () => {
    const { user } = useAuth();
    const defaultPosition: [number, number] = [19.0760, 72.8777]; // Mumbai
    const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
    const [recenterTrigger, setRecenterTrigger] = useState(0);
    const [complaints, setComplaints] = useState<Complaint[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filterPriority, setFilterPriority] = useState<string>('all');
    const [showMarkers, setShowMarkers] = useState(true);

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const cityId = user?.city_id || '';
                const response = await fetch(`/api/complaints?city_id=${cityId}`);
                const data = await response.json();
                if (data.success) {
                    // Robust coordinate validation and parsing
                    const validComplaints = (data.complaints || []).filter((c: any) => {
                        const lat = parseFloat(c.latitude);
                        const lng = parseFloat(c.longitude);
                        // Be more permissive: as long as it's a valid number and not exactly 0
                        return !isNaN(lat) && !isNaN(lng) && lat !== 0 && lng !== 0;
                    }).map((c: any) => ({
                        ...c,
                        latitude: parseFloat(c.latitude),
                        longitude: parseFloat(c.longitude)
                    }));
                    
                    console.log('Heatmap Data Diagnostics:', {
                        totalReceived: data.complaints?.length,
                        validFound: validComplaints.length,
                        sample: validComplaints.slice(0, 2)
                    });
                    
                    setComplaints(validComplaints);
                } else {
                    setError(data.error || 'Failed to fetch complaints');
                }
            } catch (err: any) {
                setError(err.message || 'Error connecting to API');
            } finally {
                setLoading(false);
            }
        };

        fetchComplaints();

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (pos) => setUserLocation([pos.coords.latitude, pos.coords.longitude]),
                (err) => console.log("Location Error:", err)
            );
        }
    }, [user?.city_id]);

    const filteredComplaints = useMemo(() => {
        if (filterPriority === 'all') return complaints;
        return complaints.filter(c => (c.priority || 'medium').toLowerCase() === filterPriority.toLowerCase());
    }, [complaints, filterPriority]);

    const heatPoints = useMemo(() => {
        const intensityMap: Record<string, number> = { 'critical': 1.0, 'high': 0.8, 'medium': 0.5, 'low': 0.3 };
        return filteredComplaints.map(c => {
            const intensity = intensityMap[(c.priority || 'medium').toLowerCase()] || 0.5;
            return [c.latitude, c.longitude, intensity] as [number, number, number];
        });
    }, [filteredComplaints]);

    const getPriorityColor = (priority?: string) => {
        const colors: { [key: string]: string } = { 'high': 'bg-red-500', 'critical': 'bg-red-900', 'medium': 'bg-orange-500', 'low': 'bg-green-500', 'urgent': 'bg-red-600' };
        return colors[priority?.toLowerCase() || ''] || 'bg-slate-500';
    };

    const getStatusColor = (status: string) => {
        if (status === 'resolved') return 'text-green-600';
        if (['in_progress', 'under_review'].includes(status)) return 'text-blue-600';
        return 'text-orange-600';
    };

    return (
        <div className="h-[calc(100vh-140px)] rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 shadow-2xl relative bg-slate-100 dark:bg-slate-900">
            {error && (
                <div className="absolute top-6 left-1/2 -translate-x-1/2 z-[1000] p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-2 text-red-700 dark:text-red-300">
                    <AlertCircle size={20} /> {error}
                </div>
            )}

            {loading && (
                <div className="absolute inset-0 flex items-center justify-center z-[1000] bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
                    <div className="text-center space-y-4">
                        <Loader className="animate-spin h-10 w-10 text-saffron-600 mx-auto" />
                        <p className="text-slate-600 dark:text-slate-400 font-semibold">Loading data...</p>
                    </div>
                </div>
            )}

            {/* Float Controls */}
            <div className="absolute top-6 right-6 z-[1000] flex flex-col gap-2">
                 <button 
                    onClick={() => setShowMarkers(!showMarkers)}
                    className="px-4 py-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-bold shadow-lg transition-all active:scale-95"
                >
                    {showMarkers ? 'Hide Markers' : 'Show Markers'}
                </button>
            </div>

            <div className="absolute bottom-6 left-6 z-[1000] flex flex-col gap-2">
                {userLocation && (
                    <button 
                        onClick={() => setRecenterTrigger(t => t + 1)}
                        className="p-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 transition-all active:scale-95"
                    >
                        <LocateFixed size={24} className="text-slate-700 dark:text-slate-300" />
                    </button>
                )}
            </div>

            <div className="absolute bottom-6 right-6 z-[1000] space-y-3 min-w-[220px]">
                <div className="p-4 bg-white/90 dark:bg-slate-900/80 backdrop-blur-md rounded-lg border border-slate-200 dark:border-slate-800 shadow-lg space-y-4">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] block">Priority Filter</label>
                        <select
                            value={filterPriority}
                            onChange={(e) => setFilterPriority(e.target.value)}
                            className="w-full px-3 py-2 text-sm font-bold bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 outline-none"
                        >
                            <option value="all">All ({complaints.length})</option>
                            {['Critical', 'High', 'Medium', 'Low'].map(p => (
                                <option key={p} value={p.toLowerCase()}>{p} ({complaints.filter(c => (c.priority || 'medium').toLowerCase() === p.toLowerCase()).length})</option>
                            ))}
                        </select>
                    </div>

                    <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3">Intensity Scale</div>
                        <div className="space-y-2">
                            {[['Critical', 'bg-red-900'], ['High', 'bg-red-500'], ['Medium', 'bg-orange-500'], ['Low', 'bg-green-500']].map(([label, color]) => (
                                <div key={label} className="flex items-center gap-3">
                                    <div className={`w-3 h-3 rounded-full ${color}`}></div>
                                    <span className="text-xs font-semibold dark:text-slate-300">{label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="p-3 bg-white/90 dark:bg-slate-900/80 backdrop-blur-md rounded-lg border border-slate-200 dark:border-slate-800 shadow-lg">
                    <p className="text-[10px] font-bold text-slate-500 uppercase">Current View</p>
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{filteredComplaints.length} Data Points</p>
                </div>
            </div>

            <MapContainer center={defaultPosition} zoom={12} scrollWheelZoom={true} className="h-full w-full z-0">
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap" />
                
                <HeatLayer points={heatPoints} />
                
                {showMarkers && filteredComplaints.map((complaint) => (
                    <Marker key={complaint.id} position={[complaint.latitude, complaint.longitude]} icon={createIcon(complaint.priority || 'low')}>
                        <Popup>
                            <div className="space-y-2 w-64 p-1">
                                <div className="font-bold text-slate-900 border-b pb-1 mb-1">{complaint.title}</div>
                                <div className="text-xs text-slate-600 line-clamp-3">{complaint.description}</div>
                                <div className="text-[10px] text-slate-500 italic">{complaint.address}</div>
                                <div className="flex gap-2 pt-2">
                                    <span className={`px-2 py-0.5 text-[10px] font-black rounded uppercase ${getPriorityColor(complaint.priority)} text-white`}>
                                        {complaint.priority || 'MEDIUM'}
                                    </span>
                                    <span className={`px-2 py-0.5 text-[10px] font-black rounded uppercase ${getStatusColor(complaint.status)} bg-slate-100 dark:bg-slate-800`}>
                                        {complaint.status.replace(/_/g, ' ')}
                                    </span>
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                ))}

                {userLocation && (
                    <Marker position={userLocation} icon={createUserIcon()}>
                        <Popup><div className="font-bold">You are here</div></Popup>
                    </Marker>
                )}
                
                <MapController userLocation={userLocation} recenterTrigger={recenterTrigger} complaints={filteredComplaints} />
            </MapContainer>
        </div>
    );
};

export default HeatmapView;
