
import React, { useState } from 'react';
import { BriefingState, Department, OperationalPlan, BriefingQuestion, MagicWandAction, WireframeLayout, WireframeOption } from '../types';
import { generateOperationalPlan, refineText } from '../services/geminiService';
import { ArrowRight, BrainCircuit, FileText, Loader2, RefreshCw, Send, ChevronRight, Wand2, Plus, ArrowUp, ArrowDown, Download, Monitor, Trash2, LayoutTemplate, Presentation, FileJson } from 'lucide-react';

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

const WIREFRAMES: WireframeOption[] = [
  { id: 'minimal_title', name: 'Minimal Title', preview: 'border-2 border-slate-300 flex items-center justify-center font-bold text-xs' },
  { id: 'title_subtitle', name: 'Title & Intro', preview: 'border-2 border-slate-300 flex flex-col justify-center items-center gap-1' },
  { id: 'bullet_list', name: 'Standard Bullets', preview: 'border-2 border-slate-300 flex flex-col p-2 gap-1' },
  { id: 'split_left_img', name: 'Split Left Img', preview: 'border-2 border-slate-300 grid grid-cols-2 gap-1' },
  { id: 'split_right_img', name: 'Split Right Img', preview: 'border-2 border-slate-300 grid grid-cols-2 gap-1' },
  { id: 'three_columns', name: 'Three Columns', preview: 'border-2 border-slate-300 grid grid-cols-3 gap-1 p-1' },
  { id: 'big_number', name: 'Big Data Focus', preview: 'border-2 border-slate-300 flex items-center justify-center' },
  { id: 'quote_focus', name: 'Quote / Testimonial', preview: 'border-2 border-slate-300 flex items-center justify-center italic' },
  { id: 'timeline', name: 'Timeline Steps', preview: 'border-2 border-slate-300 flex items-end justify-around pb-1' },
  { id: 'grid_gallery', name: 'Grid Gallery', preview: 'border-2 border-slate-300 grid grid-cols-2 grid-rows-2 gap-0.5' },
  { id: 'center_focus', name: 'Center Core', preview: 'border-2 border-slate-300 flex items-center justify-center' },
  { id: 'dark_contrast', name: 'Dark Impact', preview: 'bg-slate-800 border-2 border-slate-800' },
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
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
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

// --- WIREFRAME RENDERER COMPONENT ---
const SlideRenderer: React.FC<{ layout: WireframeLayout, content: any }> = ({ layout, content }) => {
  const common = "w-full h-full p-8 flex flex-col overflow-hidden";
  
  switch(layout) {
    case 'minimal_title':
      return <div className={`${common} justify-center items-center text-center`}>
        <h1 className="text-4xl font-bold text-slate-900">{content.title}</h1>
      </div>;
    case 'title_subtitle':
      return <div className={`${common} justify-center items-center text-center`}>
         <h1 className="text-4xl font-bold text-slate-900 mb-4">{content.title}</h1>
         <p className="text-xl text-slate-500">{content.subtitle}</p>
      </div>;
    case 'split_left_img':
      return <div className="w-full h-full grid grid-cols-2">
         <div className="bg-slate-200 flex items-center justify-center text-slate-400 text-sm uppercase font-bold p-8 text-center">{content.visualCue}</div>
         <div className="p-8 flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-4">{content.title}</h2>
            <ul className="space-y-2">{content.bullets.map((b: string, i: number) => <li key={i} className="text-sm">• {b}</li>)}</ul>
         </div>
      </div>;
    case 'split_right_img':
      return <div className="w-full h-full grid grid-cols-2">
         <div className="p-8 flex flex-col justify-center bg-white">
            <h2 className="text-2xl font-bold mb-4">{content.title}</h2>
            <p className="text-slate-500 mb-4">{content.subtitle}</p>
            <ul className="space-y-2">{content.bullets.map((b: string, i: number) => <li key={i} className="text-sm text-slate-700">• {b}</li>)}</ul>
         </div>
         <div className="bg-slate-200 flex items-center justify-center text-slate-400 text-sm uppercase font-bold p-8 text-center">{content.visualCue}</div>
      </div>;
    case 'dark_contrast':
      return <div className={`${common} bg-slate-900 text-white justify-center`}>
        <h2 className="text-3xl font-bold mb-6 text-indigo-400">{content.title}</h2>
        <ul className="space-y-3">{content.bullets.map((b: string, i: number) => <li key={i} className="text-lg text-slate-300">• {b}</li>)}</ul>
      </div>;
    case 'big_number':
      return <div className={`${common} justify-center items-center`}>
        <div className="text-6xl font-black text-indigo-600 mb-4">0{Math.floor(Math.random() * 9) + 1}</div>
        <h2 className="text-2xl font-bold text-slate-800">{content.title}</h2>
        <p className="text-center text-slate-500 mt-2 max-w-md">{content.subtitle}</p>
      </div>;
    case 'three_columns':
      return <div className={`${common}`}>
        <h2 className="text-2xl font-bold mb-8 text-center">{content.title}</h2>
        <div className="grid grid-cols-3 gap-4 h-full">
           {[0,1,2].map(i => (
             <div key={i} className="bg-slate-50 p-4 rounded border border-slate-100 flex flex-col">
               <div className="w-8 h-8 rounded-full bg-indigo-100 mb-2"></div>
               <p className="text-xs text-slate-600 flex-1">{content.bullets[i] || 'Contento placeholder...'}</p>
             </div>
           ))}
        </div>
      </div>;
    default: // bullet_list fallback
      return <div className={`${common} justify-center`}>
         <h2 className="text-3xl font-bold mb-2 text-indigo-900">{content.title}</h2>
         <h3 className="text-lg text-indigo-500 mb-8">{content.subtitle}</h3>
         <ul className="space-y-3 pl-5 border-l-4 border-indigo-200">
           {content.bullets.map((b: string, i: number) => <li key={i} className="text-base text-slate-700">{b}</li>)}
         </ul>
      </div>;
  }
};

const ProcessSimulator: React.FC = () => {
  const [step, setStep] = useState(0); // 0=Setup, 1=Depts, 2=Brief, 3=Plan, 4=Wireframe, 5=Slides
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
  const [selectedWireframe, setSelectedWireframe] = useState<WireframeLayout | null>(null);

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
    setSelectedWireframe(null);
  };

  const downloadDoc = () => {
    if (!plan) return;
    const content = `CLIENTE: ${state.clientName}\nSTRATEGIA:\n${plan.strategicOverview}\n...`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Strategia_${state.clientName}.doc`;
    a.click();
  };

  const downloadPresentation = () => {
    alert("Scaricamento PPTX avviato... (Simulazione)");
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden min-h-[700px] flex flex-col">
      {/* Header */}
      <div className="bg-slate-900 p-6 text-white flex justify-between items-center">
        <div>
           <h2 className="text-2xl font-bold flex items-center gap-2">
             <BrainCircuit className="w-6 h-6 text-indigo-400" />
             AI Strategic Briefing
           </h2>
           <p className="text-slate-400 text-sm">Magic Wand & Slide Generator</p>
        </div>
        <div className="flex gap-2">
           {[0, 1, 2, 3, 4, 5].map(s => (
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
               <p className="text-slate-500">Usa la "Bacchetta Magica" per migliorare le risposte o aggiungi domande custom.</p>
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
                        placeholder="Scrivi qui (usa la bacchetta magica per AI)..."
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
                className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:opacity-90 shadow-lg shadow-indigo-200 flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="animate-spin" /> : <><BrainCircuit /> Genera Strategia & Slide</>}
              </button>
             </div>
           </div>
        )}

        {/* STEP 3: RESULTS (STRATEGY OVERVIEW) */}
        {step === 3 && plan && (
           <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-center bg-slate-50 p-6 rounded-xl border border-slate-200">
                 <div>
                   <h2 className="text-3xl font-bold text-slate-900">{state.clientName}</h2>
                   <p className="text-slate-500">Durata Stimata: {plan.totalEstimatedDurationWeeks} Settimane</p>
                 </div>
                 <div className="flex gap-2">
                   <button 
                     onClick={downloadDoc}
                     className="bg-white border border-slate-300 text-slate-700 px-6 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-slate-50"
                   >
                     <FileText className="w-5 h-5" /> Scarica Doc (Word/PDF)
                   </button>
                   <button 
                     onClick={() => setStep(4)} // Go to Wireframe Selection
                     className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-indigo-700 shadow-lg shadow-indigo-200"
                   >
                     <Presentation className="w-5 h-5" /> Crea Slide & Presentazione
                   </button>
                 </div>
              </div>

              {/* OVERVIEW */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                 <h4 className="font-bold text-slate-400 uppercase text-xs mb-4">Overview Strategica</h4>
                 <p className="text-lg text-slate-800 leading-relaxed font-serif italic">"{plan.strategicOverview}"</p>
              </div>

              {/* Simple list of units (Detail hidden until slides) */}
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                 {plan.unitStrategies.map((u, i) => (
                   <div key={i} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                      <div className="text-xs font-bold uppercase text-slate-400 mb-1">Unit</div>
                      <div className="font-bold text-slate-800">{u.unitName}</div>
                      <div className="text-xs text-slate-500 mt-2">Director: {u.directorName}</div>
                   </div>
                 ))}
               </div>
           </div>
        )}

        {/* STEP 4: WIREFRAME SELECTION */}
        {step === 4 && (
          <div className="max-w-5xl mx-auto animate-in fade-in zoom-in-95 duration-300">
            <h3 className="text-2xl font-bold text-center mb-2 text-slate-800">Scegli il Wireframe Grafico</h3>
            <p className="text-center text-slate-500 mb-8">Seleziona uno dei 12 layout per generare automaticamente le slide.</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {WIREFRAMES.map((wf) => (
                <button
                  key={wf.id}
                  onClick={() => { setSelectedWireframe(wf.id); setStep(5); }}
                  className="group bg-white rounded-xl border-2 border-slate-200 hover:border-indigo-500 hover:shadow-xl transition-all p-4 text-left flex flex-col gap-3"
                >
                  <div className={`h-24 bg-slate-50 rounded-lg w-full ${wf.preview}`}>
                     <div className="w-1/2 h-2 bg-slate-300 rounded mb-1"></div>
                     <div className="w-3/4 h-2 bg-slate-200 rounded"></div>
                  </div>
                  <span className="font-bold text-slate-700 group-hover:text-indigo-600">{wf.name}</span>
                </button>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <button onClick={() => setStep(3)} className="text-slate-400 hover:text-slate-600 font-bold text-sm">Indietro</button>
            </div>
          </div>
        )}

        {/* STEP 5: SLIDES EDITOR */}
        {step === 5 && plan && selectedWireframe && (
           <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  <LayoutTemplate className="w-5 h-5 text-indigo-600" />
                  Slide Editor: {WIREFRAMES.find(w => w.id === selectedWireframe)?.name}
                </h3>
                <div className="flex gap-2">
                  <button onClick={() => setStep(4)} className="text-slate-500 font-bold px-4 py-2 hover:bg-slate-100 rounded-lg">Cambia Layout</button>
                  <button 
                    onClick={downloadPresentation}
                    className="bg-orange-600 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-orange-700 shadow-md"
                  >
                    <Presentation className="w-4 h-4" /> Scarica PPTX / Google Slides
                  </button>
                </div>
              </div>

              {/* SLIDES GRID */}
              <div className="space-y-12 pb-20">
                 {plan.unitStrategies.map((unit, idx) => (
                    <div key={idx}>
                       <div className="flex items-center gap-4 mb-4">
                          <div className="h-px bg-slate-300 flex-1"></div>
                          <h4 className="font-bold text-slate-400 uppercase tracking-widest">{unit.unitName}</h4>
                          <div className="h-px bg-slate-300 flex-1"></div>
                       </div>
                       
                       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                          {unit.slides.map((slide, sIdx) => (
                             <div key={sIdx} className="bg-white aspect-[16/9] rounded-lg shadow-lg border border-slate-200 overflow-hidden relative group hover:ring-4 ring-indigo-100 transition-all">
                                <SlideRenderer layout={selectedWireframe} content={slide} />
                                
                                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                   <span className="bg-black/50 text-white text-[10px] px-2 py-1 rounded">Slide {sIdx + 1}</span>
                                </div>
                             </div>
                          ))}
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        )}

        {step === 5 && (
           <div className="flex justify-center pb-10">
              <button onClick={handleReset} className="px-8 py-3 bg-slate-800 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-slate-900 transition-colors">
                <RefreshCw className="w-4 h-4" /> Nuovo Progetto
              </button>
           </div>
        )}

      </div>
    </div>
  );
};

export default ProcessSimulator;
