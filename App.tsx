
import React, { useState } from 'react';
import { LayoutDashboard, GitGraph, PlayCircle, Users, FileText } from 'lucide-react';
import VisualMap from './components/VisualMap';
import ProcessSimulator from './components/ProcessSimulator';
import ExecutionMap from './components/ExecutionMap';
import RolesDictionary from './components/RolesDictionary';
import Assistant from './components/Assistant';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'flow' | 'roles' | 'simulation' | 'execution'>('flow');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      
      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="w-full px-5">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <LayoutDashboard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">AgencyFlow</h1>
                <p className="text-xs text-slate-500 font-medium">Gestione Processi & Ruoli</p>
              </div>
            </div>

            <div className="flex space-x-1 items-center overflow-x-auto">
              <button
                onClick={() => setCurrentView('flow')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  currentView === 'flow' 
                  ? 'bg-slate-100 text-indigo-600' 
                  : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span className="flex items-center gap-2"><GitGraph className="w-4 h-4" /> Mappa Concettuale</span>
              </button>

              <button
                onClick={() => setCurrentView('execution')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  currentView === 'execution' 
                  ? 'bg-slate-100 text-indigo-600' 
                  : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span className="flex items-center gap-2"><FileText className="w-4 h-4" /> Esempi Pratici</span>
              </button>
              
              <button
                onClick={() => setCurrentView('simulation')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  currentView === 'simulation' 
                  ? 'bg-slate-100 text-indigo-600' 
                  : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span className="flex items-center gap-2"><PlayCircle className="w-4 h-4" /> Simulatore Brief</span>
              </button>

              <button
                onClick={() => setCurrentView('roles')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  currentView === 'roles' 
                  ? 'bg-slate-100 text-indigo-600' 
                  : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span className="flex items-center gap-2"><Users className="w-4 h-4" /> Dizionario Ruoli</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 w-full p-5">
        
        {currentView === 'flow' && (
          <div className="h-[calc(100vh-8rem)]">
             <VisualMap />
          </div>
        )}

        {currentView === 'execution' && (
          <div className="h-[calc(100vh-8rem)]">
             <ExecutionMap />
          </div>
        )}

        {currentView === 'simulation' && (
          <div className="max-w-5xl mx-auto py-8">
            <ProcessSimulator />
          </div>
        )}

        {currentView === 'roles' && (
          <div className="h-full">
            <RolesDictionary />
          </div>
        )}

      </main>

      <Assistant />
    </div>
  );
};

export default App;
