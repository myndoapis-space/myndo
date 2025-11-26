
import React from 'react';
import { ArrowRight, Users, Settings, Database, MessageSquare, Handshake, Info } from 'lucide-react';

const InfoTooltip: React.FC<{ text: React.ReactNode }> = ({ text }) => (
  <div className="group relative inline-block ml-2 align-middle">
    <Info className="w-4 h-4 text-slate-400 hover:text-indigo-600 cursor-help transition-colors" />
    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-72 p-3 bg-slate-800 text-white text-xs rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 pointer-events-none leading-relaxed">
      {text}
      <div className="absolute left-1/2 -translate-x-1/2 top-full w-2 h-2 bg-slate-800 rotate-45"></div>
    </div>
  </div>
);

const VisualMap: React.FC = () => {
  return (
    <div className="h-full bg-slate-50 overflow-x-auto overflow-y-auto p-4">
      <div className="min-w-[1400px] mx-auto space-y-16 pb-20">
        
        {/* HEADER */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-800">Mappa Concettuale Agenzia</h2>
          <p className="text-slate-500">Flusso di Ruoli, Responsabilità e Strumenti (Cronos, Teams, OneDrive)</p>
        </div>

        {/* --- LAYER 1: STRATEGIA & ACQUISIZIONE --- */}
        <div className="relative bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          <div className="absolute -top-4 left-8 bg-slate-800 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide flex items-center">
            Livello 1: Strategia & Ingresso
            <InfoTooltip text={
              <span>
                <strong>Definizione Strategia Alta:</strong> Viene definita tra Giulio, Loris, i Director delle singole aree e il COO.<br/><br/>
                Le informazioni vengono passate agli Account per la proposta.<br/><br/>
                <em>Edge Case:</em> A volte Roberta (Strategic) fa la proposta diretta, ma le slide vengono finalizzate su <strong>Canva/Gamma (AI Templates)</strong>.
              </span>
            } />
          </div>
          
          <div className="flex justify-between items-center gap-8">
            
            {/* INGRESSO */}
            <div className="flex flex-col items-center gap-3 w-1/5">
               <div className="p-4 bg-blue-50 border-2 border-blue-100 rounded-2xl text-center w-full shadow-sm hover:shadow-md transition-shadow">
                 <div className="font-bold text-blue-900 text-lg">Giulio & Loris</div>
                 <div className="text-xs text-blue-600 font-bold uppercase mt-1">Client Directors</div>
                 <div className="mt-3 text-xs text-slate-500 bg-white p-2 rounded border border-blue-50">
                   Portano il Cliente<br/>Brief Standardizzato
                 </div>
               </div>
            </div>

            <ArrowRight className="text-slate-300 w-8 h-8" />

            {/* THE HUB (COO) */}
            <div className="flex flex-col items-center gap-3 w-1/4 relative">
               <div className="p-6 bg-rose-50 border-2 border-rose-200 rounded-full w-48 h-48 flex flex-col items-center justify-center text-center shadow-lg z-10">
                 <Settings className="w-8 h-8 text-rose-600 mb-2" />
                 <div className="font-bold text-rose-900 text-xl">Sara Serafini</div>
                 <div className="text-xs text-rose-700 font-bold uppercase">COO / The Hub</div>
                 <div className="mt-2 text-[10px] text-rose-800 leading-tight p-2">
                   Su input Commerciale:<br/>
                   1. Attiva i Director<br/>
                   2. Attiva l'Account
                 </div>
               </div>
               
               {/* Connection Lines to Directors */}
               <div className="absolute top-1/2 left-full w-8 h-0.5 bg-rose-200"></div>
            </div>

            {/* DIRECTORS CLUSTER */}
            <div className="flex-1 grid grid-cols-3 gap-3">
               {[
                 {role: 'Creative Dir', name: 'Paolo Ferrigno'},
                 {role: 'Events Dir', name: 'Lorena Mele'},
                 {role: 'Strategic Dir', name: 'Roberta Gasperoni'},
                 {role: 'Media Dir', name: 'Massimiliano P.'},
                 {role: 'Digital Exec', name: 'Exec. Digital'}
               ].map(dir => (
                 <div key={dir.role} className="p-3 bg-white border border-slate-200 rounded-lg text-center shadow-sm hover:-translate-y-1 transition-transform">
                   <div className="text-xs font-bold text-slate-400 uppercase">{dir.role}</div>
                   <div className="font-bold text-slate-700 text-sm">{dir.name}</div>
                   {dir.role === 'Events Dir' && (
                     <span className="block mt-1 text-[9px] text-orange-600 bg-orange-50 rounded px-1">Gestisce anche come Account</span>
                   )}
                 </div>
               ))}
            </div>

          </div>
        </div>

        {/* CONNECTION LAYER (Teams Communication) */}
        <div className="flex justify-center py-4 relative">
           <div className="absolute inset-0 flex justify-center items-center">
              <div className="h-full w-0.5 bg-slate-300"></div>
           </div>
           <div className="z-10 bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full text-xs font-bold flex items-center gap-2 border border-indigo-200">
             <MessageSquare className="w-4 h-4" /> COO Attiva Account &rarr; Coordinamento Proposta (Teams)
           </div>
        </div>

        {/* --- LAYER 2: GESTIONE & PROPOSTA (ACCOUNTS) --- */}
        <div className="relative bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          <div className="absolute -top-4 left-8 bg-emerald-700 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide flex items-center">
             Livello 2: Gestione & Proposta
             <InfoTooltip text={
              <span>
                 L'Account raccoglie le info, definisce il pricing (su Cronos) e prepara il documento di presentazione.<br/>
                 Le slide sono create con template standard su Canva/Gamma.
              </span>
             } />
          </div>

          <div className="grid grid-cols-12 gap-8">
            
            {/* ACCOUNT TEAM */}
            <div className="col-span-7">
              <div className="mb-4 text-sm font-bold text-slate-500 uppercase flex items-center gap-2">
                <Users className="w-4 h-4" /> Account Team (5 Key Figures)
              </div>
              <div className="grid grid-cols-3 gap-4">
                 {[
                   {name: 'Francesca Nanni', skill: 'Overall'},
                   {name: 'Giulia Grandi', skill: 'Digital e Performance'},
                   {name: 'Sara Leoni', skill: 'Overall'},
                   {name: 'Ilaria Bigoni', skill: 'Digital e Performance'},
                   {name: 'Sara Serafini', skill: 'Overall'}
                 ].map((acc) => (
                   <div key={acc.name} className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-center hover:bg-emerald-100 transition-colors">
                     <div className="font-bold text-emerald-900">{acc.name}</div>
                     <div className="text-[10px] bg-white rounded px-1 text-emerald-600 mt-1 inline-block border border-emerald-100">{acc.skill}</div>
                   </div>
                 ))}
              </div>
              
              <div className="mt-6 bg-slate-50 p-4 rounded-lg border border-slate-200 text-sm text-slate-600">
                 <strong>Ruolo Account:</strong> Raccoglie la strategia dai Director, definisce il pricing con il Client Director e confeziona la proposta finale.
              </div>
            </div>

            {/* CRONOS & TOOLS ACTION */}
            <div className="col-span-5 bg-indigo-50 border border-indigo-100 rounded-xl p-6 relative">
               <div className="absolute -top-3 -right-3 bg-indigo-600 text-white p-2 rounded-lg shadow-md">
                 <Database className="w-6 h-6" />
               </div>
               <h3 className="font-bold text-indigo-900 mb-4 flex items-center gap-2">
                 Stack Proposta
               </h3>
               
               <div className="grid grid-cols-2 gap-4">
                 <div className="bg-white p-3 rounded border border-indigo-100">
                    <div className="text-xs font-bold text-indigo-500 uppercase mb-1">Cronos</div>
                    <ul className="text-xs text-indigo-900 space-y-1">
                      <li>• Caricamento Fornitori</li>
                      <li>• Analisi Margini</li>
                      <li>• Creazione Pres. Aziendale</li>
                      <li>• Generazione PDF</li>
                    </ul>
                 </div>
                 <div className="bg-white p-3 rounded border border-indigo-100">
                    <div className="text-xs font-bold text-indigo-500 uppercase mb-1">Doc & Repository</div>
                    <ul className="text-xs text-indigo-900 space-y-1">
                      <li>• <strong>Canva/Gamma:</strong> Slide Deck</li>
                      <li>• <strong>OneDrive:</strong> Archivio</li>
                    </ul>
                 </div>
               </div>
            </div>

          </div>
        </div>

        {/* CONNECTION LAYER (Teams Tasking) */}
        <div className="flex justify-center py-4 relative">
           <div className="absolute inset-0 flex justify-center items-center">
              <div className="h-full w-0.5 bg-slate-300"></div>
           </div>
           <div className="z-10 bg-orange-100 text-orange-800 px-4 py-1 rounded-full text-xs font-bold flex items-center gap-2 border border-orange-200">
             <Handshake className="w-4 h-4" /> Progetto Vinto &rarr; Tavolo Tecnico
           </div>
        </div>

        {/* --- LAYER 3: ESECUZIONE (OPERATIVA) --- */}
        <div className="relative bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          <div className="absolute -top-4 left-8 bg-slate-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide flex items-center">
             Livello 3: Setup Tecnico & Task Forces
             <InfoTooltip text={
              <span>
                 Fase di setup operativo su Cronos e attivazione delle squadre.<br/>
                 L'Account guida il setup e la scelta delle persone con COO ed Executive.
              </span>
             } />
          </div>

          <div className="flex gap-8">
             
             {/* PHASE A: DEFINITION (Account + Exec) */}
             <div className="w-1/3 flex flex-col">
                <div className="text-xs font-bold text-slate-500 uppercase mb-2 flex items-center gap-2">
                   <Settings className="w-4 h-4 text-indigo-600"/> Fase A: Definizione Commessa
                </div>
                
                <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 flex flex-col items-center text-center h-full justify-center">
                   <div className="flex items-center gap-4 mb-4">
                      <div className="bg-emerald-100 p-3 rounded-full text-emerald-800 font-bold text-xs border border-emerald-200">Account</div>
                      <ArrowRight className="text-indigo-300" />
                      <div className="bg-teal-100 p-3 rounded-full text-teal-800 font-bold text-xs border border-teal-200">Exec / COO</div>
                   </div>
                   
                   <h4 className="font-bold text-indigo-900 text-lg mb-2">Setup Condiviso</h4>
                   
                   <div className="bg-white p-4 rounded-lg border border-indigo-100 w-full text-left space-y-3 shadow-sm mt-2">
                      <div className="flex items-start gap-2 text-xs text-slate-700">
                        <div className="font-bold text-indigo-600 min-w-[20px]">1.</div>
                        <div>
                           <strong>Caricamento Commessa Cronos</strong><br/>
                           Responsabile: <span className="text-emerald-600 font-bold">Account</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 text-xs text-slate-700">
                        <div className="font-bold text-indigo-600 min-w-[20px]">2.</div>
                        <div>
                           <strong>Scrittura Micro-task & Ore</strong><br/>
                           Responsabile: <span className="text-emerald-600 font-bold">Account</span> <span className="text-slate-400">+</span> <span className="text-teal-600 font-bold">Exec. Director</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 text-xs text-slate-700">
                        <div className="font-bold text-indigo-600 min-w-[20px]">3.</div>
                        <div>
                           <strong>Scelta Operativi (Task Force)</strong><br/>
                           Responsabile: <span className="text-emerald-600 font-bold">Account</span> <span className="text-slate-400">+</span> <span className="text-rose-600 font-bold">COO</span>
                        </div>
                      </div>
                   </div>
                </div>
             </div>

             <ArrowRight className="text-slate-300 w-8 h-8 self-center" />

             {/* PHASE B: EXECUTION (Variable Task Forces) */}
             <div className="flex-1">
                <div className="text-xs font-bold text-slate-500 uppercase mb-2 flex items-center gap-2">
                   <Users className="w-4 h-4 text-pink-500"/> Fase B: Task Forces Attive (Esempi)
                </div>

                <div className="grid grid-cols-3 gap-4">
                   
                   {/* TF 1: DIGITAL */}
                   <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:border-blue-300 transition-colors">
                      <div className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-1 rounded inline-block mb-2">Task Force 1: Digital</div>
                      <h5 className="font-bold text-slate-800 text-sm mb-3">Cliente "Tech Corp"</h5>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between items-center p-1 bg-slate-50 rounded">
                           <span>Lead (Account)</span>
                           <span className="font-bold text-slate-700">Ilaria Bigoni</span>
                        </div>
                        <div className="flex justify-between items-center p-1 bg-slate-50 rounded">
                           <span>Controllo (Exec)</span>
                           <span className="font-bold text-slate-700">Exec. Digital</span>
                        </div>
                        <div className="p-2 border-t border-slate-100 mt-2">
                           <span className="text-slate-400 text-[10px] uppercase">Operativi</span>
                           <div className="text-slate-600">Giacomo Neri, Stefano G.</div>
                        </div>
                      </div>
                   </div>

                   {/* TF 2: SOCIAL */}
                   <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:border-pink-300 transition-colors">
                      <div className="bg-pink-100 text-pink-800 text-[10px] font-bold px-2 py-1 rounded inline-block mb-2">Task Force 2: Social</div>
                      <h5 className="font-bold text-slate-800 text-sm mb-3">Cliente "Fashion Brand"</h5>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between items-center p-1 bg-slate-50 rounded">
                           <span>Lead (Account)</span>
                           <span className="font-bold text-slate-700">Giulia Grandi</span>
                        </div>
                        <div className="flex justify-between items-center p-1 bg-slate-50 rounded">
                           <span>Controllo (Exec)</span>
                           <span className="font-bold text-slate-700">Exec. Communication</span>
                        </div>
                        <div className="p-2 border-t border-slate-100 mt-2">
                           <span className="text-slate-400 text-[10px] uppercase">Operativi</span>
                           <div className="text-slate-600">Veronica, Carlotta (SMM)</div>
                        </div>
                      </div>
                   </div>

                   {/* TF 3: EVENTI */}
                   <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:border-orange-300 transition-colors">
                      <div className="bg-orange-100 text-orange-800 text-[10px] font-bold px-2 py-1 rounded inline-block mb-2">Task Force 3: Eventi</div>
                      <h5 className="font-bold text-slate-800 text-sm mb-3">Cliente "Convention"</h5>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between items-center p-1 bg-slate-50 rounded">
                           <span>Lead (Director)</span>
                           <span className="font-bold text-slate-700">Lorena Mele</span>
                        </div>
                        <div className="flex justify-between items-center p-1 bg-slate-50 rounded">
                           <span>Logistica (Exec)</span>
                           <span className="font-bold text-slate-700">Exec. Eventi</span>
                        </div>
                        <div className="p-2 border-t border-slate-100 mt-2">
                           <span className="text-slate-400 text-[10px] uppercase">Operativi</span>
                           <div className="text-slate-600">Paola C. (PR), Service</div>
                        </div>
                      </div>
                   </div>

                </div>
             </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default VisualMap;
