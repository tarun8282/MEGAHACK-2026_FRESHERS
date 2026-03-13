import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, ShieldCheck, Clock } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-indigo-400/10 blur-[120px] -z-10 rounded-full"></div>
        
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Nagar<span className="bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">Setu</span>
          </h1>
          <p className="text-2xl text-slate-600 dark:text-slate-400/90 font-medium italic">
            Connecting citizens to municipal care.
          </p>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Report potholes, water leaks, and garbage issues directly to your municipal corporation. 
            AI-powered classification and real-time tracking until the job is done.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Link to="/complaint/new" className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white rounded-full text-lg font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 dark:shadow-none flex items-center justify-center gap-2">
              Report an Issue <ArrowRight size={20} />
            </Link>
            <Link to="/heatmap" className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-full text-lg font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-2">
              View Heatmap <MapPin size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
        {[
          {
            icon: <MapPin className="text-blue-500" />,
            title: "Smart Reporting",
            desc: "Pin the exact location and upload photos. Our AI does the rest."
          },
          {
            icon: <ShieldCheck className="text-green-500" />,
            title: "AI Routing",
            desc: "Gemini AI automatically classifies and routes your complaint to the right department."
          },
          {
            icon: <Clock className="text-purple-500" />,
            title: "Real-time Tracking",
            desc: "Get live updates as officers work on your complaint. Transparency at every step."
          }
        ].map((feature, i) => (
          <div key={i} className="p-8 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl space-y-4 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-slate-50 dark:bg-slate-900 rounded-2xl flex items-center justify-center">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{feature.title}</h3>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </section>

      {/* Stats Section */}
      <section className="bg-slate-900 text-white py-16 rounded-[40px] px-8 text-center mx-4 overflow-hidden relative">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-600/20 blur-[80px] rounded-full"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-600/20 blur-[80px] rounded-full"></div>
        
        <div className="relative z-10 space-y-12">
          <h2 className="text-3xl font-bold">Making Cities Better, One Report at a Time</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { val: "24/7", label: "Availability" },
              { val: "100%", label: "Transparency" },
              { val: "< 10s", label: "AI Classification" },
              { val: "365d", label: "Service" }
            ].map((stat, i) => (
              <div key={i} className="space-y-1">
                <div className="text-4xl font-extrabold bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent">{stat.val}</div>
                <div className="text-slate-400 text-sm font-medium uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
