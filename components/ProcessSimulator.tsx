
import React, { useState } from 'react';
import { BriefingState, Department, OperationalPlan, BriefingQuestion } from '../types';
import { generateOperationalPlan } from '../services/geminiService';
import { ArrowRight, CheckCircle, BrainCircuit, FileText, Loader2, RefreshCw, Send, ChevronRight } from 'lucide-react';

const DEPARTMENTS: Department[] = ['Creative', 'Media', 'Digital', 'Events', 'Strategic', 'PR'];

const QUESTIONS: BriefingQuestion[] = [
  // GENERAL
  { id: 'q_obj', text: 'Obiettivi di Business Principali?', type: 'textarea' },
  { id: 'q_target', text: 'Target Audience / Personas?', type: 'text' },
  { id: 'q_budget_split', text: 'Budget Totale (Split Media vs Fee vs Produzione)?', type: 'text' },
  { id: 'q_history', text: 'Storico Agenzie Precedenti & Problematiche?', type: 'textarea' },
  { id: 'q_competitors', text: 'Principali Competitor?', type: 'text' },
  
  // CREATIVE
  { id: 'q_creative_output', text: 'Deliverables Creativi Richiesti (Video, KV, Social)?', type: 'textarea', department: 'Creative' },
  { id: 'q_tone', text: 'Tone of Voice desiderato?', type: 'text', department: 'Creative' },
  
  // MEDIA
  { id: 'q_channels', text: 'Canali Media da attivare (Meta, Google, TikTok)?', type: 'text', department: 'Media' },
  { id: 'q_kpis', text: 'KPIs Media (Awareness, Lead, Conversion)?', type: 'text', department: 'Media' },
  
  // DIGITAL
  { id: 'q_tech', text: 'Stack Tecnologico attuale / Sito Web?', type: 'text', department: 'Digital' },
  { id: 'q_crm', text: 'Integrazioni CRM / Marketing Automation?', type: 'text', department: 'Digital' },
  
  // EVENTS
  { id: 'q_event_type', text: 'Tipologia Evento (Convention, Party, Lancio)?', type: 'text', department: 'Events' },
  { id: 'q_pax', text: 'Numero Partecipanti & Location?', type: 'text', department: 'Events' },
  
  // STRATEGIC
  { id: 'q_positioning', text: 'Posizionamento di Marca desiderato?', type: 'textarea', department: 'Strategic' }
];

const ProcessSimulator: React.FC = () => {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState<BriefingState>({
    clientName: '',
    lead: null,
    selectedDepartments: [],
    answers: {}
  });
  const [plan, setPlan] = useState<OperationalPlan | null>(null);

  const activeQuestions = QUESTIONS.filter(q => 
    !q.department || state.selectedDepartments.includes(q.department)
  );

  const handleAnswer = (id: string, val: string) => {
    setState(prev => ({ ...prev, answers: { ...prev.answers, [id]: val } }));
  };

  const toggleDept = (dept: Department) => {
    setState(prev => {
      const exists = prev.selectedDepartments.includes(dept);
      return {
        ...prev,
        selectedDepartments: exists 
          ? prev.selectedDepartments.filter(d => d !== dept)
          : [...prev.selectedDepartments, dept]
      };
    });
  };

  const generatePlan = async () => {
    setLoading(true);
    const result = await generateOperationalPlan(state);
    setPlan(result);
    setLoading(false);
    setStep(3);
  };

  const handleReset = () => {
    setStep(0);
    setState({ clientName: '', lead: null, selectedDepartments: [], answers: {} });
    setPlan(null);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden min-h-[600px] flex flex-col">
      {/* Header */}
      <div className="bg-slate-900 p-6 text-white flex justify-between items-center">
        <div>
           <h2 className="text-2xl font-bold flex items-center gap-2">
             <BrainCircuit className="w-6 h-6 text-indigo-400" />
             AI Strategic Briefing
           </h2>
           <p className="text-slate-400 text-sm">Dal Lead al Piano Operativo Automatico</p>
        </div>
        <div className="flex gap-2">
           {[0, 1, 2, 3].map(s => (
             <div key={s} className={`w-3 h-3 rounded-full ${step === s ? 'bg-indigo-500' : 'bg-slate-700'}`} />
           ))}
        </div>
      </div>

      <div className="p-8 flex-1 overflow-y-auto">
        
        {/* STEP 0: SETUP */}
        {step === 0 && (
          <div className="max-w-xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-xl font-bold text-slate-800">1. Setup Cliente & Lead</h3>
            
            <div>
              <label className="block text-sm font-bold text-slate-600 mb-2">Nome Cliente</label>
              <input 
                type="text" 
                className="w-full border border-slate-300 rounded-lg p-3 text-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="es. Global Tech Corp"
                value={state.clientName}
                onChange={e => setState({...state, clientName: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-600 mb-2">Lead Owner (Client Director)</label>
              <div className="grid grid-cols-2 gap-4">
                {['Giulio', 'Loris'].map((leadName) => (
                  <button
                    key={leadName}
                    onClick={() => setState({...state, lead: leadName as any})}
                    className={`p-4 rounded-xl border-2 transition-all font-bold text-lg ${
                      state.lead === leadName 
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700' 
                      : 'border-slate-200 text-slate-500 hover:border-indigo-200'
                    }`}
                  >
                    {leadName}
                  </button>
                ))}
              </div>
            </div>

            <button
              disabled={!state.clientName || !state.lead}
              onClick={() => setStep(1)}
              className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center gap-2 mt-8"
            >
              Avanti: Scegli Unit <ArrowRight />
            </button>
          </div>
        )}

        {/* STEP 1: UNITS */}
        {step === 1 && (
          <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <h3 className="text-xl font-bold text-slate-800">2. Quali Unit attiviamo?</h3>
             <p className="text-slate-500">Seleziona i dipartimenti necessari. Il brief si adatterà automaticamente.</p>
             
             <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {DEPARTMENTS.map(dept => (
                  <button
                    key={dept}
                    onClick={() => toggleDept(dept)}
                    className={`p-6 rounded-xl border-2 text-left transition-all ${
                      state.selectedDepartments.includes(dept)
                      ? 'border-indigo-500 bg-indigo-50 shadow-md'
                      : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full mb-2 ${
                      state.selectedDepartments.includes(dept) ? 'bg-indigo-500' : 'bg-slate-300'
                    }`} />
                    <span className={`font-bold ${
                      state.selectedDepartments.includes(dept) ? 'text-indigo-900' : 'text-slate-600'
                    }`}>{dept}</span>
                  </button>
                ))}
             </div>

             <div className="flex gap-4 pt-8">
               <button onClick={() => setStep(0)} className="px-6 py-3 text-slate-500 font-bold hover:bg-slate-50 rounded-lg">Indietro</button>
               <button
                disabled={state.selectedDepartments.length === 0}
                onClick={() => setStep(2)}
                className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-bold text-lg hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                Vai al Brief <ArrowRight />
              </button>
             </div>
          </div>
        )}

        {/* STEP 2: QUESTIONNAIRE */}
        {step === 2 && (
           <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="text-center mb-8">
               <h3 className="text-2xl font-bold text-slate-800">3. Agency Briefing</h3>
               <p className="text-slate-500">Rispondi alle domande strategiche per generare il piano operativo.</p>
             </div>

             <div className="space-y-6">
               {activeQuestions.map((q, idx) => (
                 <div key={q.id} className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <label className="block text-sm font-bold text-slate-700 mb-2 flex justify-between">
                      {idx + 1}. {q.text}
                      {q.department && <span className="text-[10px] bg-white border px-2 py-0.5 rounded text-slate-400 uppercase tracking-wider">{q.department}</span>}
                    </label>
                    {q.type === 'textarea' ? (
                      <textarea 
                        className="w-full border border-slate-300 rounded-lg p-3 h-24 focus:ring-2 focus:ring-indigo-500 outline-none"
                        placeholder="Inserisci dettagli..."
                        value={state.answers[q.id] || ''}
                        onChange={(e) => handleAnswer(q.id, e.target.value)}
                      />
                    ) : (
                      <input 
                        type="text" 
                        className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                        placeholder="Risposta..."
                        value={state.answers[q.id] || ''}
                        onChange={(e) => handleAnswer(q.id, e.target.value)}
                      />
                    )}
                 </div>
               ))}
             </div>

             <div className="flex gap-4 pt-8 pb-10">
               <button onClick={() => setStep(1)} className="px-6 py-3 text-slate-500 font-bold hover:bg-slate-50 rounded-lg">Indietro</button>
               <button
                onClick={generatePlan}
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:opacity-90 shadow-lg shadow-indigo-200 flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="animate-spin" /> : <><BrainCircuit /> Genera Piano Operativo AI</>}
              </button>
             </div>
           </div>
        )}

        {/* STEP 3: RESULTS */}
        {step === 3 && plan && (
           <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              {/* SUMMARY HEADER */}
              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 text-center">
                 <h2 className="text-3xl font-bold text-slate-900 mb-2">{state.clientName}</h2>
                 <p className="text-slate-500 mb-6">Piano Operativo Generato da AI • Lead: {state.lead}</p>
                 <div className="bg-white p-6 rounded-xl border border-slate-200 text-left max-w-3xl mx-auto shadow-sm">
                   <h4 className="font-bold text-indigo-600 uppercase text-xs mb-2">Overview Strategica</h4>
                   <p className="text-slate-700 leading-relaxed">{plan.strategicOverview}</p>
                 </div>
              </div>

              {/* MACRO TASKS TIMELINE */}
              <div>
                 <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                   <FileText className="text-slate-400"/> Macro Fasi
                 </h3>
                 <div className="space-y-4">
                    {plan.macroTasks.map((phase, idx) => (
                      <div key={idx} className="flex gap-4 items-start">
                         <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold shrink-0 mt-1">
                           {idx + 1}
                         </div>
                         <div className="flex-1 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                            <h4 className="font-bold text-slate-900 mb-2">{phase.phase}</h4>
                            <div className="flex flex-wrap gap-2">
                              {phase.tasks.map((t, i) => (
                                <span key={i} className="px-3 py-1 bg-slate-100 rounded-full text-xs text-slate-600 border border-slate-200">
                                  {t}
                                </span>
                              ))}
                            </div>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>

              {/* UNIT BRIEFS GRID */}
              <div>
                 <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                   <Send className="text-slate-400"/> Brief per Director
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {plan.unitBriefs.map((unit, idx) => (
                       <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                          <div className="absolute top-0 left-0 w-2 h-full bg-indigo-500"></div>
                          <div className="pl-4">
                             <div className="flex justify-between items-start mb-4">
                                <div>
                                   <h4 className="font-bold text-lg text-slate-900">{unit.unitName}</h4>
                                   <p className="text-sm text-slate-500">To: <span className="font-bold text-indigo-600">{unit.directorName}</span></p>
                                </div>
                                <div className="text-right">
                                   <div className="text-2xl font-bold text-slate-800">{unit.estimatedHours}h</div>
                                   <div className="text-xs text-slate-400 uppercase font-bold">Stima Ore</div>
                                </div>
                             </div>

                             <div className="mb-4">
                               <h5 className="text-xs font-bold text-slate-400 uppercase mb-2">Richieste Chiave</h5>
                               <ul className="space-y-2">
                                 {unit.keyRequirements.map((req, i) => (
                                   <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                                     <ChevronRight className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                                     {req}
                                   </li>
                                 ))}
                               </ul>
                             </div>

                             {unit.recommendedSuppliers.length > 0 && (
                               <div className="pt-4 border-t border-slate-100">
                                  <h5 className="text-xs font-bold text-slate-400 uppercase mb-2">Fornitori Suggeriti</h5>
                                  <div className="flex flex-wrap gap-2">
                                    {unit.recommendedSuppliers.map((sup, i) => (
                                      <span key={i} className="px-2 py-1 bg-amber-50 text-amber-700 border border-amber-100 rounded text-xs font-medium">
                                        {sup}
                                      </span>
                                    ))}
                                  </div>
                               </div>
                             )}
                          </div>
                       </div>
                    ))}
                 </div>
              </div>

              <div className="flex justify-center pt-8 pb-10">
                <button onClick={handleReset} className="px-8 py-3 bg-slate-800 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-slate-900 transition-colors">
                  <RefreshCw className="w-4 h-4" /> Nuovo Progetto
                </button>
              </div>

           </div>
        )}

      </div>
    </div>
  );
};

export default ProcessSimulator;
