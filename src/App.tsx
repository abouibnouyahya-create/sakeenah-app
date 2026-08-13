import './index.css';
import React from 'react';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-6 flex flex-col items-center justify-center">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
        <header className="mb-6 border-b pb-4">
          <h1 className="text-3xl font-extrabold text-emerald-700 tracking-tight">Sakeenah</h1>
          <p className="text-slate-500 font-medium mt-1">Sérénité & Ancrage</p>
        </header>

        <div className="space-y-4">
          <div className="flex items-center justify-between bg-emerald-50 p-4 rounded-xl border border-emerald-100">
            <span className="font-semibold text-emerald-900">120 XP</span>
            <span className="bg-emerald-600 text-white text-xs px-3 py-1 rounded-full font-medium">
              Compagnon Spirituel
            </span>
          </div>

          <main className="py-4">
            <h2 className="text-xl font-bold text-slate-900 mb-2">
              Un temps d'arrêt pour apaiser votre esprit.
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Retrouvez sérénité et clarté à travers le Coran, 1 histoire des Prophètes et la méditation guidée.
            </p>
          </main>

          <section className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <h3 className="font-bold text-slate-700 mb-3">Horaires de Prière (Paris)</h3>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-white p-2 rounded shadow-sm">
                <span className="block text-xs text-slate-400">Fajr</span>
                <span className="font-semibold text-slate-800">05:12</span>
              </div>
              <div className="bg-white p-2 rounded shadow-sm">
                <span className="block text-xs text-slate-400">Dhuhr</span>
                <span className="font-semibold text-slate-800">13:45</span>
              </div>
              <div className="bg-white p-2 rounded shadow-sm">
                <span className="block text-xs text-slate-400">Asr</span>
                <span className="font-semibold text-slate-800">17:30</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}