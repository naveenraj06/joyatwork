import React from 'react';

export function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-6 shadow-2xl">
        <div className="w-16 h-16 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-2xl flex items-center justify-center mx-auto text-3xl">
          📖
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-black tracking-tight text-white">
            Employee Moments SDK
          </h1>
          <p className="text-sm text-slate-400 leading-relaxed">
            The developer preview dashboard has been replaced with Storybook to enforce prop-driven design, isolated components development, and zero-dependency package output.
          </p>
        </div>
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-left space-y-2">
          <div className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
            Development Commands
          </div>
          <div className="font-mono text-xs text-slate-300 space-y-1">
            <p>• Run Storybook: <span className="text-emerald-400">npm run dev</span></p>
            <p>• Build Package: <span className="text-emerald-400">npm run build:all</span></p>
            <p>• Run Linter: <span className="text-emerald-400">npm run lint</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
