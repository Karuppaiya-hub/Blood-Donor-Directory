import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Splash from './components/Splash';

export default function App() {
  const [ready, setReady] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50/30 to-rose-50/20">
      {!ready && <Splash onDone={() => setReady(true)} />}
      <div className={`transition-opacity duration-700 ${ready ? 'opacity-100' : 'opacity-0'}`}>
        <Navbar />
        <Home />
      </div>
    </div>
  );
}
