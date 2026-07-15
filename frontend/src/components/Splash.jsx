import { useEffect, useState } from 'react';

const quotes = [
  "Every drop you give is a life you touch — and a story that continues.",
  "You don't need a cape to be a hero. Just a willing vein and an open heart.",
  "Blood has no religion, no caste, no colour — only the will to keep someone alive.",
  "One hour of your time. One unit of your blood. One lifetime of gratitude.",
  "The most powerful thing a human can give is a part of themselves to a stranger.",
];

export default function Splash({ onDone }) {
  const [fade, setFade] = useState(false);
  const quote = quotes[Math.floor(Math.random() * quotes.length)];

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFade(true), 2800);
    const doneTimer = setTimeout(() => onDone(), 3600);
    return () => { clearTimeout(fadeTimer); clearTimeout(doneTimer); };
  }, []);

  return (
    <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-red-700 via-red-500 to-rose-400 transition-opacity duration-700 ${fade ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>

      {/* Ripple rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[1, 2, 3].map(i => (
          <div key={i} className="absolute rounded-full border border-white/20 animate-ping"
            style={{ width: 120 + i * 80, height: 120 + i * 80, animationDelay: `${i * 0.4}s`, animationDuration: '2.5s' }} />
        ))}
      </div>

      {/* Blood drop SVG */}
      <div className="relative animate-bounce" style={{ animationDuration: '1.8s' }}>
        <svg width="90" height="110" viewBox="0 0 90 110" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M45 5 C45 5 5 55 5 75 C5 97 23 108 45 108 C67 108 85 97 85 75 C85 55 45 5 45 5Z"
            fill="white" fillOpacity="0.95" />
          <path d="M45 30 C45 30 22 62 22 76 C22 89 32 97 45 97"
            stroke="rgba(220,38,38,0.3)" strokeWidth="3" strokeLinecap="round" fill="none" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center mt-6">
          <span className="text-red-500 font-black text-2xl select-none">+</span>
        </div>
      </div>

      {/* Title */}
      <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold text-white tracking-tight drop-shadow-lg text-center px-4">
        A Drop of Hope
      </h1>
      <p className="mt-2 text-red-100 text-sm tracking-widest uppercase font-medium">Blood Donor Directory</p>

      {/* Quote */}
      <div className="mt-10 max-w-sm mx-auto px-6 text-center">
        <p className="text-white/80 text-sm sm:text-base italic leading-relaxed">
          "{quote}"
        </p>
      </div>

      {/* Loading bar */}
      <div className="mt-10 w-40 h-1 bg-white/20 rounded-full overflow-hidden">
        <div className="h-full bg-white rounded-full animate-[grow_2.8s_ease-in-out_forwards]" />
      </div>
    </div>
  );
}
