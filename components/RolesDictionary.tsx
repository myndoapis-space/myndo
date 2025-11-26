
import React, { useState } from 'react';
import { PEOPLE, GENERIC_ROLES } from '../constants';
import { User, Briefcase } from 'lucide-react';

const RolesDictionary: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'people' | 'responsibilities'>('people');

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-10">
      
      {/* Tabs */}
      <div className="flex justify-center mb-6">
        <div className="bg-white p-1 rounded-xl border border-slate-200 shadow-sm inline-flex">
          <button
            onClick={() => setActiveTab('people')}
            className={`px-6 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === 'people' 
              ? 'bg-slate-800 text-white shadow' 
              : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <User className="w-4 h-4" /> Persone (Team)
          </button>
          <button
            onClick={() => setActiveTab('responsibilities')}
            className={`px-6 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === 'responsibilities' 
              ? 'bg-slate-800 text-white shadow' 
              : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <Briefcase className="w-4 h-4" /> Ruoli & Responsabilità
          </button>
        </div>
      </div>

      {/* PEOPLE TAB */}
      {activeTab === 'people' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PEOPLE.map(person => (
            <div key={person.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-all">
              <div className={`h-2 w-full ${person.color}`}></div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-1 rounded text-[10px] font-bold text-white uppercase ${person.color}`}>{person.type}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{person.name}</h3>
                {person.skills && (
                    <div className="flex flex-wrap gap-1 mb-4">
                       {person.skills.map((skill, i) => (
                         <span key={i} className="text-[10px] bg-slate-100 px-2 py-1 rounded text-slate-600 uppercase font-bold">{skill}</span>
                       ))}
                    </div>
                )}
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-slate-400 uppercase">Focus</p>
                  <ul className="text-sm text-slate-600 space-y-1">
                    {person.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="block w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5"></span>
                        {resp}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* RESPONSIBILITIES TAB */}
      {activeTab === 'responsibilities' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {GENERIC_ROLES.map(role => (
            <div key={role.id} className="bg-slate-50 rounded-xl border border-slate-200 p-6">
               <div className="flex items-center gap-3 mb-4">
                 <div className="p-3 bg-white rounded-lg shadow-sm">
                    <Briefcase className="w-6 h-6 text-slate-700" />
                 </div>
                 <div>
                   <h3 className="text-lg font-bold text-slate-900">{role.title}</h3>
                   <p className="text-xs text-slate-500">{role.description}</p>
                 </div>
               </div>
               
               <div className="bg-white rounded-lg border border-slate-200 p-4">
                 <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Cosa fa in Agenzia</h4>
                 <ul className="space-y-2">
                   {role.responsibilities.map((r, i) => (
                     <li key={i} className="text-sm text-slate-700 flex items-start gap-2">
                        <span className="text-slate-300">•</span> {r}
                     </li>
                   ))}
                 </ul>
               </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default RolesDictionary;
