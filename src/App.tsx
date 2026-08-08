import React, { useState, useEffect } from 'react';
import { 
  Heart, Compass, BarChart2, Sparkles, Moon, Sun, 
  GraduationCap, Award, RefreshCw, Zap, ChevronRight, 
  Play, Pause, Flame, Clock, Navigation, Volume2, BookOpen, Wind
} from 'lucide-react';

interface PrayerTimes {
  city: string;
  fajr: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
}

interface Course {
  id: string;
  category: string;
  title: string;
  description: string;
  level: string;
  steps: { id: string; title: string; duration: string; content: string }[];
}

const INITIAL_COURSES: Course[] = [
  {
    id: 'c1',
    category: 'Spiritualité',
    title: 'Ancrage et Sérénité',
    description: 'Apprenez à surmonter l inquiétude à travers la méditation et la foi.',
    level: 'Débutant',
    steps: [
      { id: 's1', title: 'Comprendre l Inquiétude', duration: '3 min', content: 'L inquiétude fait partie de l expérience humaine. Apprenez à la traverser avec patience.' },
      { id: 's2', title: 'La Pratique du Dhikr', duration: '5 min', content: 'Le souvenir régulier apaise le cœur et stabilise l esprit dans les moments sombres.' }
    ]
  }
];

const INITIAL_PROPHETS = [
  {
    id: 'p1',
    name: 'Prophète Youssef (Joseph)',
    title: 'La Patience et la Résilience',
    summary: 'Traverser les épreuves de l abandon et du puits pour atteindre la lumière.',
    full_story: 'Séparé de sa famille et jeté dans un puits par ses frères, Youssef garda une foi inébranlable...',
    lessons: ['La patience porte toujours ses fruits', 'Le pardon libère l âme', 'Garder espoir en toutes circumstances']
  },
  {
    id: 'p2',
    name: 'Prophète Younous (Jonas)',
    title: 'L Ancrage au Cœur des Ténèbres',
    summary: 'Le pouvoir de l invocation et de la remise en question au fond de l océan.',
    full_story: 'Dans le ventre de la baleine, au fond de la mer, Younous invoqua la lumière avec humilité...',
    lessons: ['Reconnaître ses faiblesses', 'L invocation sincère brise la solitude', 'L espoir ne meurt jamais']
  }
];

const INITIAL_RECITERS = [
  {
    id: 'r1',
    name: 'Mishary Rashid Alafasy',
    style: 'Apaisant',
    surahs: [
      { number: 1, name: 'Al-Fatiha', url: 'https://server8.mp3quran.net/afs/001.mp3' },
      { number: 67, name: 'Al-Mulk', url: 'https://server8.mp3quran.net/afs/067.mp3' },
      { number: 112, name: 'Al-Ikhlas', url: 'https://server8.mp3quran.net/afs/112.mp3' }
    ]
  }
];

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => localStorage.getItem('sakeenah_dark') !== 'false');
  const [tab, setTab] = useState<'accueil' | 'coran' | 'prophetes' | 'qibla' | 'academie' | 'coach' | 'progres'>('accueil');
  
  const [courses] = useState<Course[]>(INITIAL_COURSES);
  const [prophets] = useState(INITIAL_PROPHETS);
  const [reciters] = useState(INITIAL_RECITERS);
  const [selectedReciter, setSelectedReciter] = useState(INITIAL_RECITERS[0]);
  
  const [prayerTimes] = useState<PrayerTimes>({
    city: 'Paris',
    fajr: '05:12',
    dhuhr: '13:45',
    asr: '17:30',
    maghrib: '20:50',
    isha: '22:15'
  });

  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const [playingTrackUrl, setPlayingTrackUrl] = useState<string | null>(null);

  const [userXp, setUserXp] = useState<number>(() => parseInt(localStorage.getItem('sakeenah_xp') || '120', 10));
  const [completedSteps, setCompletedSteps] = useState<string[]>(() => JSON.parse(localStorage.getItem('sakeenah_completed_steps') || '[]'));
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [activeProphet, setActiveProphet] = useState<typeof INITIAL_PROPHETS[0] | null>(null);
  const [tasbeeh, setTasbeeh] = useState<number>(() => parseInt(localStorage.getItem('sakeenah_tasbeeh') || '0', 10));

  const [isBreathing, setIsBreathing] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'Inspirez' | 'Maintenez' | 'Expierez'>('Inspirez');
  const [breathTimer, setBreathTimer] = useState(5);

  useEffect(() => {
    let interval: any = null;
    if (isBreathing) {
      interval = setInterval(() => {
        setBreathTimer((prev) => {
          if (prev <= 1) {
            setBreathPhase((current) => {
              if (current === 'Inspirez') return 'Maintenez';
              if (current === 'Maintenez') return 'Expierez';
              return 'Inspirez';
            });
            return 5;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setBreathPhase('Inspirez');
      setBreathTimer(5);
    }
    return () => clearInterval(interval);
  }, [isBreathing]);

  const playAudio = (url: string) => {
    if (currentAudio) {
      currentAudio.pause();
      if (playingTrackUrl === url) {
        setPlayingTrackUrl(null);
        setCurrentAudio(null);
        return;
      }
    }
    const audio = new Audio(url);
    audio.play();
    setCurrentAudio(audio);
    setPlayingTrackUrl(url);
    audio.onended = () => {
      setPlayingTrackUrl(null);
      setCurrentAudio(null);
    };
  };

  const triggerHaptic = () => { if ('vibrate' in navigator) navigator.vibrate(25); };

  const completeCurrentStep = (stepId: string) => {
    if (!completedSteps.includes(stepId)) {
      const updated = [...completedSteps, stepId];
      setCompletedSteps(updated);
      setUserXp(prev => prev + 50);
      localStorage.setItem('sakeenah_completed_steps', JSON.stringify(updated));
      localStorage.setItem('sakeenah_xp', (userXp + 50).toString());
      triggerHaptic();
    }
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-700 ${darkMode ? 'bg-[#090D16] text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      
      <header className={`sticky top-0 z-40 backdrop-blur-2xl border-b ${darkMode ? 'bg-[#090D16]/70 border-slate-800/80' : 'bg-white/70 border-slate-200/80'}`}>
        <div className="max-w-6xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
              <Sparkles size={20} />
            </div>
            <div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-emerald-400 to-teal-200 bg-clip-text text-transparent">Sakeenah</h1>
              <p className="text-xs opacity-50 font-medium">Sérénité & Ancrage</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
              <Flame size={16} className="text-amber-400 fill-amber-400" />
              <span>{userXp} XP</span>
            </div>
            <button onClick={() => { setDarkMode(!darkMode); localStorage.setItem('sakeenah_dark', (!darkMode).toString()); }} className="p-2.5 rounded-2xl border border-slate-700/50 text-amber-400 cursor-pointer">
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 pb-32">

        {tab === 'accueil' && (
          <div className="space-y-8">
            <div className="rounded-3xl p-8 border border-emerald-500/20 bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 text-white shadow-2xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                <Zap size={13} /> Compagnon Spirituel
              </span>
              <h2 className="text-3xl font-extrabold mt-4">Un temps d arrêt pour apaiser votre esprit.</h2>
              <p className="text-sm opacity-80 mt-2">Retrouvez sérénité et clarté à travers le Coran, l histoire des Prophètes et la méditation guidée.</p>
            </div>

            <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-100 shadow-xl'}`}>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <Clock className="text-emerald-400" size={18} />
                  <h3 className="font-bold text-sm">Horaires de Prière ({prayerTimes.city})</h3>
                </div>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Aujourd hui</span>
              </div>
              <div className="grid grid-cols-5 gap-2 text-center">
                {[
                  { name: 'Fajr', time: prayerTimes.fajr },
                  { name: 'Dhuhr', time: prayerTimes.dhuhr },
                  { name: 'Asr', time: prayerTimes.asr },
                  { name: 'Maghrib', time: prayerTimes.maghrib },
                  { name: 'Isha', time: prayerTimes.isha }
                ].map(p => (
                  <div key={p.name} className="p-3 rounded-2xl bg-slate-500/5 border border-slate-500/10">
                    <p className="text-[10px] opacity-50 uppercase font-bold">{p.name}</p>
                    <p className="text-xs font-extrabold text-emerald-400 mt-1">{p.time}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`p-8 rounded-3xl border flex flex-col justify-between ${darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-100 shadow-xl'}`}>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-base">Ancrage & Dhikr</h3>
                    <p className="text-xs opacity-50">Compteur de répétitions</p>
                  </div>
                  <button onClick={() => { setTasbeeh(0); localStorage.setItem('sakeenah_tasbeeh', '0'); }} className="opacity-60 hover:opacity-100"><RefreshCw size={15} /></button>
                </div>
                <div className="my-6 text-center text-6xl font-black font-mono text-emerald-400">{tasbeeh}</div>
                <button onClick={() => { triggerHaptic(); const next = tasbeeh + 1; setTasbeeh(next); localStorage.setItem('sakeenah_tasbeeh', next.toString()); }} className="w-full py-4 rounded-2xl bg-emerald-600 text-white font-bold text-sm shadow-lg shadow-emerald-600/25 cursor-pointer">
                  Incrémenter (+1)
                </button>
              </div>

              <div className={`p-8 rounded-3xl border flex flex-col justify-between ${darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-100 shadow-xl'}`}>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Exercice conseillé</span>
                  <h3 className="text-xl font-bold mt-1">Cohérence Cardiaque</h3>
                  <p className="text-xs opacity-60 mt-2 leading-relaxed">Régulez votre rythme cardiaque et diminuez le stress grâce à un cycle respiratoire guidé.</p>
                </div>
                <button onClick={() => setTab('coach')} className="mt-6 w-full py-4 rounded-2xl bg-slate-800 text-white font-bold text-sm flex items-center justify-center gap-2 border border-slate-700 cursor-pointer">
                  <Wind size={16} /> Démarrer la séance
                </button>
              </div>
            </div>
          </div>
        )}

        {tab === 'coran' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold">Lecteur du Coran</h2>
              <p className="text-xs opacity-50 mt-1">Écoutez les récitations apaisantes.</p>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2">
              {reciters.map(reciter => (
                <button key={reciter.id} onClick={() => setSelectedReciter(reciter)} className={`px-5 py-3 rounded-2xl border text-xs font-bold cursor-pointer ${selectedReciter.id === reciter.id ? 'bg-emerald-600 border-emerald-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>
                  {reciter.name}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {selectedReciter.surahs.map(surah => (
                <div key={surah.number} className={`p-5 rounded-3xl border flex items-center justify-between ${darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-100 shadow-md'}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 font-bold text-xs flex items-center justify-center">{surah.number}</div>
                    <div>
                      <h4 className="font-bold text-sm">{surah.name}</h4>
                      <p className="text-[10px] opacity-50">{selectedReciter.name}</p>
                    </div>
                  </div>
                  <button onClick={() => playAudio(surah.url)} className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 cursor-pointer">
                    {playingTrackUrl === surah.url ? <Pause size={16} /> : <Play size={16} />}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'prophetes' && (
          <div className="space-y-6">
            {!activeProphet ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {prophets.map(prophet => (
                  <div key={prophet.id} onClick={() => setActiveProphet(prophet)} className={`p-6 rounded-3xl border cursor-pointer hover:border-emerald-500/50 transition ${darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-100 shadow-xl'}`}>
                    <h3 className="font-bold text-xl">{prophet.name}</h3>
                    <p className="text-xs text-emerald-400 font-medium mt-1">{prophet.title}</p>
                    <p className="text-xs opacity-60 mt-2">{prophet.summary}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className={`p-8 rounded-3xl border space-y-6 ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-100'}`}>
                <button onClick={() => setActiveProphet(null)} className="text-xs font-bold text-emerald-400 hover:underline">← Retour</button>
                <h2 className="text-2xl font-bold">{activeProphet.name}</h2>
                <p className="text-sm opacity-90 leading-relaxed">{activeProphet.full_story}</p>
              </div>
            )}
          </div>
        )}

        {tab === 'qibla' && (
          <div className="max-w-xl mx-auto space-y-6 text-center">
            <h2 className="text-2xl font-extrabold">Boussole Qibla</h2>
            <div className={`p-10 rounded-3xl border ${darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white'}`}>
              <div className="w-48 h-48 mx-auto rounded-full border-4 border-dashed border-emerald-500/40 flex items-center justify-center bg-emerald-500/5">
                <Navigation size={56} className="text-emerald-400 transform rotate-45 animate-pulse" />
              </div>
              <p className="text-sm font-bold text-emerald-400 mt-6">Direction : 118° SE (Paris)</p>
            </div>
          </div>
        )}

        {tab === 'academie' && (
          <div className="space-y-6">
            {!activeCourse ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {courses.map(course => (
                  <div key={course.id} onClick={() => { setActiveCourse(course); setActiveStepIndex(0); }} className={`p-6 rounded-3xl border cursor-pointer hover:border-emerald-500/50 ${darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white'}`}>
                    <span className="text-[10px] font-bold uppercase text-emerald-400">{course.category}</span>
                    <h3 className="font-bold text-lg mt-1">{course.title}</h3>
                    <p className="text-xs opacity-60 mt-1">{course.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className={`p-8 rounded-3xl border space-y-6 ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white'}`}>
                <button onClick={() => setActiveCourse(null)} className="text-xs font-bold text-emerald-400 hover:underline">← Retour</button>
                <h2 className="text-xl font-bold">{activeCourse.steps[activeStepIndex]?.title}</h2>
                <p className="text-sm p-4 rounded-2xl bg-slate-500/5">{activeCourse.steps[activeStepIndex]?.content}</p>
                <button onClick={() => completeCurrentStep(activeCourse.steps[activeStepIndex].id)} className="w-full py-3 rounded-2xl bg-emerald-600 text-white font-bold text-xs">
                  Valider la leçon (+50 XP)
                </button>
              </div>
            )}
          </div>
        )}

        {tab === 'coach' && (
          <div className="max-w-xl mx-auto space-y-6 text-center">
            <h2 className="text-2xl font-extrabold">Cohérence Cardiaque</h2>
            <div className={`p-10 rounded-3xl border space-y-8 ${darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white'}`}>
              <div className="w-48 h-48 mx-auto flex items-center justify-center relative">
                <div className={`absolute inset-0 rounded-full border-4 border-emerald-500/30 transition-all duration-1000 ${isBreathing && breathPhase === 'Inspirez' ? 'scale-125 bg-emerald-500/20' : ''}`} />
                <span className="text-base font-bold text-emerald-400 uppercase">{isBreathing ? breathPhase : 'Prêt ?'}</span>
              </div>
              <button onClick={() => setIsBreathing(!isBreathing)} className="w-full py-4 rounded-2xl bg-emerald-600 text-white font-bold text-sm">
                {isBreathing ? 'Arrêter' : 'Commencer'}
              </button>
            </div>
          </div>
        )}

        {tab === 'progres' && (
          <div className="max-w-xl mx-auto space-y-6">
            <h2 className="text-2xl font-extrabold">Votre Progression</h2>
            <div className={`p-8 rounded-3xl border space-y-4 ${darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white'}`}>
              <div className="flex items-center gap-4">
                <Award size={32} className="text-emerald-400" />
                <div>
                  <h3 className="font-bold">Niveau : Compagnon Régulier</h3>
                  <p className="text-xs opacity-50">{userXp} XP accumulés</p>
                </div>
              </div>
              <p className="text-xs text-emerald-400 font-semibold">{completedSteps.length} leçons complétées</p>
            </div>
          </div>
        )}

      </main>

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-xl px-4">
        <nav className={`backdrop-blur-2xl border rounded-full px-5 py-3.5 flex justify-between items-center shadow-2xl ${darkMode ? 'bg-[#090D16]/80 border-slate-800 text-slate-400' : 'bg-white/80 border-slate-200 text-slate-600'}`}>
          {[
            { id: 'accueil', label: 'Accueil', icon: Heart },
            { id: 'coran', label: 'Coran', icon: Volume2 },
            { id: 'prophetes', label: 'Prophètes', icon: BookOpen },
            { id: 'qibla', label: 'Qibla', icon: Compass },
            { id: 'academie', label: 'Académie', icon: GraduationCap },
            { id: 'progres', label: 'Suivi', icon: BarChart2 }
          ].map(item => {
            const Icon = item.icon;
            const isActive = tab === item.id;
            return (
              <button key={item.id} onClick={() => { triggerHaptic(); setTab(item.id as any); }} className={`flex flex-col items-center gap-1 cursor-pointer ${isActive ? 'text-emerald-400 font-bold scale-110' : 'hover:text-slate-200'}`}>
                <Icon size={18} />
                <span className="text-[10px]">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

    </div>
  );
}