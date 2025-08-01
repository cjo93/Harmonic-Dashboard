import React from 'react';
import { Link } from 'react-router-dom';


const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-black text-black font-sans">
    <header className="w-full bg-black text-gold py-6 shadow-lg flex flex-col items-center border-b-4 border-gold">
      <div className="flex items-center gap-4">
        <span className="text-4xl font-serif select-none">&#11044;</span>
        <h1 className="text-3xl font-serif font-bold tracking-widest uppercase drop-shadow-lg">Defrag Dashboard</h1>
        <span className="text-4xl font-serif select-none">&#9733;</span>
      </div>
      <nav className="space-x-8">
        <Link
          to="/"
          className="text-gold hover:text-white transition-colors duration-200 font-medium"
        >
          Home
        </Link>
        <Link
          to="/analytics"
          className="text-gold hover:text-white transition-colors duration-200 font-medium"
        >
          Analytics
        </Link>
        <Link
          to="/astrology"
          className="text-gold hover:text-white transition-colors duration-200 font-medium"
        >
          Astrology Tiles
        </Link>
        <Link
          to="/personal-cosmos"
          className="text-gold hover:text-white transition-colors duration-200 font-medium"
        >
          Personal Cosmos
        </Link>
        <Link
          to="/settings"
          className="text-gold hover:text-white transition-colors duration-200 font-medium"
        >
          Settings
        </Link>
      </nav>
      <div className="mt-2 text-xs font-serif tracking-widest uppercase">Decode the Design. Break the Loop. Return to Signal.</div>
    </header>
    <main className="max-w-4xl mx-auto w-full py-8 px-4">
      {children}
    </main>
    <footer className="w-full text-center py-4 text-gold bg-black/80 font-serif text-xs mt-8 border-t border-gold">
      The Sacred Rebellion &mdash; Built for the Coded Ones
    </footer>
  </div>
);

export default Layout;
