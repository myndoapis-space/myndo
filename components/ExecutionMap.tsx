
import React, { useState } from 'react';
import { SCENARIOS } from '../constants';
import { Database, Users, CheckCircle, Monitor, MessageSquare, Cloud } from 'lucide-react';

const ExecutionMap: React.FC = () => {
  const [activeScenarioId, setActiveScenarioId] = useState(SCENARIOS[0].id);
  const activeScenario = SCENARIOS.find(s => s.id === activeScenarioId) || SCENARIOS[0];

  const getToolIcon = (toolName: string) => {
    if (toolName.includes('Teams')) return <MessageSquare className="w-3 h-3" />;
    if (toolName.includes('OneDrive') || toolName.includes('Cloud')) return <Cloud className="w-3 h-3" />;
    if (toolName.includes('Canva') || toolName.includes('Gamma')) return <Monitor className="w-3 h-3" />;
    return <Database className="w-3 h-3" />;
  };

  return (
    <div className="h-full bg-slate-50 p-8 overflow-auto">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Mappa Esecutiva Pratica</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-500 uppercase">Scegli Scenario</h3>
            {SCENARIOS.map(scen => (
              <button
                key={scen.id}
                onClick={() => setActiveScenarioId(scen.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  activeScenarioId === scen.id
                  ? 'bg-white border-indigo-500 shadow-md ring-1 ring-indigo-500'
                  : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="font-bold text-slate-800">{scen.title}</div>
                <div className="text-xs text-slate-500 mt-1 line-clamp-2">{scen.description}</div>
              </button>
            ))}
            
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-sm text-blue-800 mt-8">
               <p>Vista pratica che dettaglia i passaggi dal lead all'esecuzione, includendo i tool e le responsabilità chiave.</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
             <div className="space-y-8">
               {activeScenario.steps.map((step, idx) => (
                 <div key={idx} className="relative flex gap-6">
                    {/* Connector Line */}
                    {idx !== activeScenario.steps.length - 1 && (
                      <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-slate-200 -z-10 translate-y-4"></div>
                    )}

                    {/* Number Bubble */}
                    <div className="w-12 h-12 rounded-full bg-white border-2 border-indigo-100 flex items-center justify-center text-indigo-600 font-bold shadow-sm shrink-0 z-10">
                      {step.step}
                    </div>

                    {/* Step Card */}
                    <div className="flex-1 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                       <div className="flex justify-between items-start mb-2">
                         <h4 className="text-lg font-bold text-slate-800">{step.title}</h4>
                         
                         {/* Tools Badges */}
                         <div className="flex gap-2">
                           {step.tools && step.tools.map((t, i) => (
                             <span key={i} className="px-2 py-1 bg-slate-100 rounded text-[10px] font-bold text-slate-600 flex items-center gap-1 border border-slate-200">
                               {getToolIcon(t)} {t}
                             </span>
                           ))}
                         </div>
                       </div>
                       
                       <p className="text-slate-600 mb-4 text-sm leading-relaxed whitespace-pre-line">{step.description}</p>

                       <div className="flex flex-wrap gap-2 mb-4">
                          {step.roles.map((role, rIdx) => (
                            <span key={rIdx} className="inline-flex items-center gap-1 px-2 py-1 rounded bg-indigo-50 text-indigo-700 text-xs font-medium border border-indigo-100">
                              <Users className="w-3 h-3" /> {role}
                            </span>
                          ))}
                       </div>

                       {step.artifact && (
                         <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 px-3 py-2 rounded-lg border border-emerald-100 w-fit font-semibold">
                            <CheckCircle className="w-3 h-3" />
                            <span>Output: {step.artifact}</span>
                         </div>
                       )}
                    </div>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutionMap;
