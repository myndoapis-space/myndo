
import React, { useState } from 'react';
import { BriefingState, Department, OperationalPlan, BriefingQuestion, MagicWandAction } from '../types';
import { generateOperationalPlan, refineText } from '../services/geminiService';
import { ArrowRight, BrainCircuit, FileText, Loader2, RefreshCw, Plus, ArrowUp, ArrowDown, Download, Trash2, CheckCircle2, Megaphone, Users, Clock } from 'lucide-react';

const DEPARTMENTS: Department[] = ['Creative', 'Media', 'Digital', 'Events', 'Strategic', 'PR'];

const INITIAL_QUESTIONS: BriefingQuestion[] = [
  // GENERAL
  { id: 'q_obj', text: 'Obiettivi di Business Principali?', type: 'textarea' },
  { id: 'q_target', text: 'Target Audience / Personas?', type: 'text' },
  { id: 'q_budget_split', text: 'Budget Totale (Split Media vs Fee vs Produzione)?', type: 'text' },
  { id: 'q_history', text: 'Storico Agenzie Precedenti & Problematiche?', type: 'textarea' },
  
  // STRATEGIC (Can be added dynamically)
  { id: 'q_industry', text: 'Industry / Settore?', type: 'text', department: 'Strategic' },

  // SPECIFIC
  { id: 'q_creative_output', text: 'Deliverables Creativi Richiesti?', type: 'textarea', department: 'Creative' },
  { id: 'q_tone', text: 'Tone of Voice desiderato?', type: 'text', department: 'Creative' },
  { id: 'q_channels', text: 'Canali Media da attivare?', type: 'text', department: 'Media' },
  { id: 'q_tech', text: 'Stack Tecnologico attuale?', type: 'text', department: 'Digital' },
  { id: 'q_event_type', text: 'Tipologia Evento?', type: 'text', department: 'Events' },
];

const MagicWandInput: React.FC<{
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  multiline?: boolean;
}> = ({ value, onChange, placeholder, multiline }) => {
  const [loading, setLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const handleMagic = async (action: MagicWandAction) => {
    setLoading(true);
    setShowMenu(false);
    const refined = await refineText(value, action);
    onChange(refined);
    setLoading(false);
  };

  return (
    <div className="relative group">
      {multiline ? (
        <textarea
          className="w-full border border-slate-300 rounded-lg p-3 h-24 focus:ring-2 focus:ring-indigo-500 outline-none pr-10"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          type="text"
          className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none pr-10"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      
      {/* Magic Button */}
      <div className="absolute top-3 right-3">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="p-1.5 bg-indigo-50 text-indigo-600 rounded-md hover:bg-indigo-100 transition-colors"
          title="AI Magic Wand"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <BrainCircuit className="w-4 h-4" />}
        </button>
        
        {/* Menu */}
        {showMenu && (
          <div className="absolute right-0 top-full mt-2 w-40 bg-white border border-slate-200 shadow-xl rounded-lg z-20 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <button onClick={() => handleMagic('expand')} className="w-full text-left px-4 py-2 text-xs hover:bg-indigo-50 text-slate-700">Espandi</button>
            <button onClick={() => handleMagic('shorten')} className="w-full text-left px-4 py-2 text-xs hover:bg-indigo-50 text-slate-700">Sintetizza</button>
            <button onClick={() => handleMagic('formalize')} className="w-full text-left px-4 py-2 text-xs hover:bg-indigo-50 text-slate-700">Rendi Formale</button>
            <button onClick={() => handleMagic('bullet_points')} className="w-full text-left px-4 py-2 text-xs hover:bg-indigo-50 text-slate-700">Lista Puntata</button>
          </div>
        )}
      </div>
    </div>
  );
};

const ProcessSimulator: React.FC = () => {
  const [step, setStep] = useState(0); // 0=Setup, 1=Depts, 2=Brief, 3=Plan(Results)
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<BriefingQuestion[]>(INITIAL_QUESTIONS);
  const [state, setState] = useState<BriefingState>({
    clientName: '',
    lead: null,
    selectedDepartments: [],
    answers: {},
    customQuestions: []
  });
  const [plan, setPlan] = useState<OperationalPlan | null>(null);

  // Filter questions based on selected departments
  const activeQuestions = questions.filter(q => 
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

  const addCustomQuestion = () => {
    const newId = `custom_${Date.now()}`;
    const newQ: BriefingQuestion = {
      id: newId,
      text: 'Nuova Domanda Strategica',
      type: 'textarea',
      isCustom: true
    };
    const insertIdx = 4; 
    const newQuestions = [...questions];
    newQuestions.splice(insertIdx, 0, newQ);
    setQuestions(newQuestions);
  };

  const removeQuestion = (id: string) => {
    setQuestions(prev => prev.filter(q => q.id !== id));
  };

  const moveQuestion = (idx: number, dir: -1 | 1) => {
    const newQs = [...questions];
    const targetIdx = idx + dir;
    if (targetIdx < 0 || targetIdx >= newQs.length) return;
    [newQs[idx], newQs[targetIdx]] = [newQs[targetIdx], newQs[idx]];
    setQuestions(newQs);
  };

  const updateQuestionText = (id: string, text: string) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, text } : q));
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
    setQuestions(INITIAL_QUESTIONS);
  };

  const downloadBrief = (unitName: string, instructions: string[]) => {
    const content = `BRIEF OPERATIVO PER: ${unitName.toUpperCase()}\nCLIENTE: ${state.clientName}\n\nISTRUZIONI:\n${instructions.join('\n- ')}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Brief_${unitName}_${state.clientName}.txt`;
    a.click();
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden min-h-[700px] flex flex-col">
      {/* Header */}
      <div className="bg-slate-900 p-6 text-white flex justify-between items-center">
        <div>
           <h2 className="text-2xl font-bold flex items-center gap-2">
             <Megaphone className="w-6 h-6 text-rose-500" />
             The Hub: Internal Briefing
           </h2>
           <p className="text-slate-400 text-sm">Direzione Strategica & Attivazione Unit</p>
        </div>
        <div className="flex gap-2">
           {[0, 1, 2, 3].map(s => (
             <div key={s} className={`w-3 h-3 rounded-full ${step >= s ? 'bg-rose-500' : 'bg-slate-700'}`} />
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
             <h3 className="text-xl font-bold text-slate-800">2. Chi dobbiamo attivare?</h3>
             <p className="text-slate-500">Seleziona i dipartimenti necessari per questo progetto.</p>
             
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
               <h3 className="text-2xl font-bold text-slate-800">3. Raccolta Informazioni</h3>
               <p className="text-slate-500">Le informazioni qui sotto serviranno per istruire i Director.</p>
             </div>

             <div className="flex justify-end mb-4">
                <button 
                  onClick={addCustomQuestion}
                  className="flex items-center gap-2 text-sm font-bold text-indigo-600 hover:bg-indigo-50 px-3 py-2 rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" /> Aggiungi Domanda
                </button>
             </div>

             <div className="space-y-6">
               {activeQuestions.map((q, idx) => (
                 <div key={q.id} className="bg-slate-50 p-6 rounded-xl border border-slate-200 group hover:border-indigo-300 transition-colors relative">
                    
                    {/* Controls */}
                    <div className="absolute right-2 top-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => moveQuestion(idx, -1)} disabled={idx === 0} className="p-1.5 bg-white border border-slate-200 rounded text-slate-400 hover:text-indigo-600 disabled:opacity-30"><ArrowUp className="w-3 h-3"/></button>
                      <button onClick={() => moveQuestion(idx, 1)} disabled={idx === activeQuestions.length - 1} className="p-1.5 bg-white border border-slate-200 rounded text-slate-400 hover:text-indigo-600 disabled:opacity-30"><ArrowDown className="w-3 h-3"/></button>
                      <button onClick={() => removeQuestion(q.id)} className="p-1.5 bg-white border border-slate-200 rounded text-red-400 hover:text-red-600 hover:bg-red-50 ml-2"><Trash2 className="w-3 h-3"/></button>
                    </div>

                    <div className="pl-2">
                      <div className="flex justify-between items-start mb-2 pr-10">
                         {q.isCustom ? (
                           <input 
                             type="text" 
                             value={q.text}
                             onChange={(e) => updateQuestionText(q.id, e.target.value)}
                             className="font-bold text-slate-700 bg-transparent border-b border-dashed border-slate-400 focus:border-indigo-600 outline-none w-3/4"
                           />
                         ) : (
                           <label className="text-sm font-bold text-slate-700 block w-3/4">
                             {idx + 1}. {q.text}
                           </label>
                         )}
                         {q.department && <span className="text-[10px] bg-white border px-2 py-0.5 rounded text-slate-400 uppercase tracking-wider">{q.department}</span>}
                      </div>

                      <MagicWandInput 
                        value={state.answers[q.id] || ''}
                        onChange={(val) => handleAnswer(q.id, val)}
                        multiline={q.type === 'textarea'}
                        placeholder="Rispondi qui..."
                      />
                    </div>
                 </div>
               ))}
             </div>

             <div className="flex gap-4 pt-8 pb-10">
               <button onClick={() => setStep(1)} className="px-6 py-3 text-slate-500 font-bold hover:bg-slate-50 rounded-lg">Indietro</button>
               <button
                onClick={generatePlan}
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-rose-600 to-orange-600 text-white py-4 rounded-xl font-bold text-lg hover:opacity-90 shadow-lg shadow-rose-200 flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="animate-spin" /> : <><CheckCircle2 /> Genera Piano di Attivazione</>}
              </button>
             </div>
           </div>
        )}

        {/* STEP 3: INTERNAL KICK-OFF PLAN */}
        {step === 3 && plan && (
           <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              {/* Header Summary */}
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                 <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-3xl font-bold text-slate-900 mb-2">{state.clientName}</h2>
                      <div className="flex gap-4 text-sm text-slate-500">
                         <span className="flex items-center gap-1"><Users className="w-4 h-4"/> Lead: {state.lead}</span>
                         <span className="flex items-center gap-1"><Clock className="w-4 h-4"/> Durata Prevista: {plan.totalEstimatedDurationWeeks} settimane</span>
                      </div>
                    </div>
                 </div>
                 <div className="mt-6 bg-white p-4 rounded-lg border border-slate-100 italic text-slate-700">
                    "{plan.strategicOverview}"
                 </div>
              </div>

              {/* UNIT CARDS GRID */}
              <div>
                 <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <Megaphone className="w-5 h-5 text-rose-500"/>
                    Istruzioni per i Director
                 </h3>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {plan.unitStrategies.map((unit, idx) => (
                       <div key={idx} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-all">
                          {/* Card Header */}
                          <div className="bg-slate-50 border-b border-slate-100 p-4 flex justify-between items-center">
                             <div>
                                <h4 className="font-bold text-slate-800 uppercase tracking-wide">{unit.unitName}</h4>
                                <span className="text-xs text-slate-500">Director: {unit.directorName}</span>
                             </div>
                             <button 
                               onClick={() => downloadBrief(unit.unitName, unit.internalInstructions)}
                               className="text-indigo-600 hover:bg-indigo-50 p-2 rounded-lg" title="Scarica Brief .txt"
                             >
                                <Download className="w-4 h-4" />
                             </button>
                          </div>

                          {/* Instructions */}
                          <div className="p-6 space-y-6">
                             
                             <div>
                               <h5 className="text-xs font-bold text-slate-400 uppercase mb-2">To-Do List (Action Items)</h5>
                               <ul className="space-y-2">
                                  {unit.internalInstructions.map((inst, i) => (
                                    <li key={i} className="text-sm text-slate-700 flex items-start gap-2">
                                       <span className="text-rose-500 font-bold">•</span> {inst}
                                    </li>
                                  ))}
                               </ul>
                             </div>

                             <div className="grid grid-cols-2 gap-4">
                               <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-100">
                                  <h5 className="text-[10px] font-bold text-indigo-500 uppercase mb-1">Output Richiesto</h5>
                                  <ul className="space-y-1">
                                    {unit.requiredOutput.map((out, i) => (
                                       <li key={i} className="text-xs text-indigo-900 font-medium">{out}</li>
                                    ))}
                                  </ul>
                               </div>
                               <div className="bg-orange-50 p-3 rounded-lg border border-orange-100">
                                  <h5 className="text-[10px] font-bold text-orange-500 uppercase mb-1">Vincoli & Note</h5>
                                  <p className="text-xs text-orange-900">{unit.keyConstraints || "Nessun vincolo specifico."}</p>
                               </div>
                             </div>

                          </div>
                       </div>
                    ))}
                 </div>
              </div>

              <div className="flex justify-center pb-10">
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
