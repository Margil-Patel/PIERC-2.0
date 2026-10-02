import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] w-full bg-[#070c16] text-white flex flex-col items-center justify-center px-6 text-center py-20">
      <div className="w-20 h-20 rounded-full bg-red-500/10 text-red-500 border border-red-500/30 flex items-center justify-center font-mono text-3xl font-bold mb-6 animate-pulse">
        404
      </div>
      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
        Page Not Found
      </h1>
      <p className="text-slate-400 max-w-md mb-8">
        The requested innovation portal node does not exist or has been relocated within the PIERC network.
      </p>
      <Link
        to="/"
        className="px-8 py-3.5 rounded-xl bg-[#38bdf8] hover:bg-sky-400 text-slate-950 font-bold transition-all shadow-lg hover:shadow-sky-500/20"
      >
        Return to PIERC Homepage →
      </Link>
    </div>
  );
}
