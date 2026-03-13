import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Filter, Layers, Info } from 'lucide-react';

// Heatmap effect component (Leaflet.heat integration)
const HeatLayerPlaceholder: React.FC = () => {
    return (
        <div className="absolute inset-0 pointer-events-none z-[1000] flex items-center justify-center">
             <div className="p-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl flex items-center gap-3 animate-pulse">
                <Info className="text-indigo-600" />
                <span className="font-bold text-slate-700 dark:text-slate-200">Interactive Heatmap Loading...</span>
             </div>
        </div>
    );
};

const HeatmapView: React.FC = () => {
    const position: [number, number] = [19.0760, 72.8777]; // Mumbai center

    return (
        <div className="h-[calc(100vh-140px)] rounded-[40px] overflow-hidden border border-slate-200 dark:border-slate-700 shadow-2xl relative bg-slate-100 dark:bg-slate-900">
            {/* Overlay Controls */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 z-[1000] flex items-center gap-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg">
                <button className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-indigo-200 dark:shadow-none transition-all">
                   <Layers size={18} /> City Heatmap
                </button>
                <button className="px-6 py-2 text-slate-600 dark:text-slate-400 font-bold hover:bg-white dark:hover:bg-slate-800 rounded-xl transition-all">
                    Ward View
                </button>
            </div>

            <div className="absolute bottom-6 right-6 z-[1000] space-y-3">
                 <div className="p-4 bg-white/90 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg space-y-3">
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Heat Intensity</div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-3 rounded-full bg-red-500 shadow-lg shadow-red-500/30"></div>
                            <span className="text-xs font-bold dark:text-white">Critical Density</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-3 rounded-full bg-orange-500 shadow-lg shadow-orange-500/30"></div>
                            <span className="text-xs font-bold dark:text-white">High Volume</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-3 rounded-full bg-blue-500 shadow-lg shadow-blue-500/30"></div>
                            <span className="text-xs font-bold dark:text-white">Low/Moderate</span>
                        </div>
                    </div>
                 </div>
                 <button className="w-full p-4 bg-white/90 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg flex items-center gap-3 font-bold text-slate-700 dark:text-slate-200 group">
                    <Filter className="text-indigo-600 group-hover:rotate-12 transition-transform" /> Advanced Filter
                 </button>
            </div>

            <MapContainer center={position} zoom={12} scrollWheelZoom={true} className="h-full w-full z-0">
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={position}>
                    <Popup>
                        Brihanmumbai Municipal Corporation HQ
                    </Popup>
                </Marker>
                <HeatLayerPlaceholder />
            </MapContainer>
        </div>
    );
};

export default HeatmapView;
