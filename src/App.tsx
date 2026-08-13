import React, { useState } from 'react';
import './index.css';
import { 
  Sparkles, 
  Sun, 
  Moon, 
  BookOpen, 
  Heart, 
  Clock, 
  Compass, 
  Award,
  ChevronRight,
  Play
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'corran' | 'prayers' | 'meditation'>('home');

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex justify-center selection:bg-emerald-500 selection:text-white">
      <div className="w-full max-w-md bg-slate-950 min-h-screen flex flex-col justify-between border-x border-slate-800/60 shadow-2xl relative">
        
        {/* Header */}
        <header className="p-6 pb-4 border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-md sticky top-0 z-10 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-emerald-400" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-200 bg-clip-text text-transparent">
                Sakeenah
              </h1>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">Sérénité & Ancrage</p>
          </div>

          <div className="flex items-center gap-2 bg-emerald-950/50 border border-emerald-800/40 px-3 py-1.5 rounded-full text-xs font-medium text-emerald-300">
            <Award className="w-4 h-4 text-emerald-400" />
            <span>120 XP</span>
          </div>
        </header>

        {/* Content Area */}
        <main className="p-6 space-y-6 flex-1 overflow-y-auto">
          
          {/* Daily Quote / Reflection */}
          <section className="bg-gradient-to-br from-emerald-950/60 to-slate-900 border border-emerald-800/30 rounded-2xl p-5 relative overflow-hidden group">
            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl group-hover:bg-emerald-500/20 transition-all"></div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Sun className="w-4 h-4" />
              <span>Pensée du Jour</span>
            </div>
            <h2 className="text-lg font-semibold text-slate-100 leading-snug mb-2">
              "Un temps d'arrêt pour apaiser votre esprit."
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Retrouvez sérénité et clarté à travers le Coran, l'histoire des Prophètes et la méditation guidée.
            </p>
            <button className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-lg shadow-emerald-500/10">
              <Play className="w-3.5 h-3.5 fill-slate-950" />
              Écouter la méditation
            </button>
          </section>

          {/* Prayer Times Card */}
          <section className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-teal-400" />
                <h3 className="text-sm font-semibold text-slate-200">Horaires de Prière</h3>
              </div>
              <span className="text-xs text-slate-500">Paris</span>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-1">
              <div className="bg-slate-950/60 border border-slate-800/60 p-2.5 rounded-xl text-center">
                <span className="block text-[10px] text-slate-400 font-medium">Fajr</span>
                <span className="text-xs font-bold text-slate-200 mt-1 block">05:12</span>
              </div>
              <div className="bg-emerald-950/40 border border-emerald-500/30 p-2.5 rounded-xl text-center relative">
                <span className="block text-[10px] text-emerald-400 font-medium">Dhuhr</span>
                <span className="text-xs font-bold text-emerald-300 mt-1 block">13:45</span>
              </div>
              <div className="bg-slate-950/60 border border-slate-800/60 p-2.5 rounded-xl text-center">
                <span className="block text-[10px] text-slate-400 font-medium">Asr</span>
                <span className="text-xs font-bold text-slate-200 mt-1 block">17:30</span>
              </div>
            </div>
          </section>

          {/* Quick Features */}
          <section className="space-y-3">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Explorer</h3>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between bg-slate-900/60 hover:bg-slate-900 border border-slate-800/60 p-3.5 rounded-xl cursor-pointer transition-all">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-200">Lecture & Récitation</h4>
                    <p className="text-[10px] text-slate-500">Sourate Al-Kahf recommandée aujourd'hui</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-600" />
              </div>

              <div className="flex items-center justify-between bg-slate-900/60 hover:bg-slate-900 border border-slate-800/60 p-3.5 rounded-xl cursor-pointer transition-all">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-teal-500/10 text-teal-400 rounded-lg">
                    <Heart className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-200">Dhikr & Invocations</h4>
                    <p className="text-[10px] text-slate-500">Invocations du soir (Adhkar)</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-600" />
              </div>
            </div>
          </section>

        </main>

        {/* Bottom Navigation */}
        <nav className="p-3 border-t border-slate-800/80 bg-slate-950/90 backdrop-blur-md grid grid-cols-4 gap-1 sticky bottom-0">
          <button 
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center py-1.5 rounded-xl transition-all ${
              activeTab === 'home' ? 'text-emerald-400 bg-emerald-950/40' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <Sparkles className="w-5 h-5" />
            <span className="text-[10px] font-medium mt-1">Accueil</span>
          </button>

          <button 
            onClick={() => setActiveTab('corran')}
            className={`flex flex-col items-center py-1.5 rounded-xl transition-all ${
              activeTab === 'corran' ? 'text-emerald-400 bg-emerald-950/40' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            <span className="text-[10px] font-medium mt-1">Coran</span>
          </button>

          <button 
            onClick={() => setActiveTab('prayers')}
            className={`flex flex-col items-center py-1.5 rounded-xl transition-all ${
              activeTab === 'prayers' ? 'text-emerald-400 bg-emerald-950/40' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <Clock className="w-5 h-5" />
            <span className="text-[10px] font-medium mt-1">Prières</span>
          </button>

          <button 
            onClick={() => setActiveTab('meditation')}
            className={`flex flex-col items-center py-1.5 rounded-xl transition-all ${
              activeTab === 'meditation' ? 'text-emerald-400 bg-emerald-950/40' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <Compass className="w-5 h-5" />
            <span className="text-[10px] font-medium mt-1">Méditation</span>
          </button>
        </nav>

      </div>
    </div>
  );
}