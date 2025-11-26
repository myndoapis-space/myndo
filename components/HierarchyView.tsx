
import React from 'react';
import { HIERARCHY } from '../constants';
import { HierarchyNode } from '../types';
import { User, Users } from 'lucide-react';

const NodeCard: React.FC<{ node: HierarchyNode; level: number }> = ({ node, level }) => {
  const isRoot = level === 0;
  
  return (
    <div className={`flex flex-col items-center ${isRoot ? 'mb-10' : 'mx-3'}`}>
      <div className={`
        relative z-10 p-3 rounded-xl border shadow-sm text-center transition-all hover:shadow-md
        ${node.isSeparateDept 
            ? 'bg-amber-50 border-amber-200' 
            : level === 0 
                ? 'bg-slate-900 text-white border-slate-900 px-6 py-4' 
                : node.children && level === 1
                    ? 'bg-slate-100 border-slate-300 font-bold'
                    : 'bg-white border-slate-200 text-sm'
        }
      `}>
        <div className="font-bold flex items-center gap-2 justify-center whitespace-nowrap">
           {level === 0 ? <Users className="w-5 h-5 opacity-90" /> : <User className="w-3 h-3 opacity-50" />}
           {node.title}
        </div>
      </div>
      
      {node.children && node.children.length > 0 && (
        <div className="flex mt-8 relative">
           {/* Connector Lines Logic */}
           <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-8 w-px h-8 bg-slate-300"></div>
           
           {/* Horizontal bar connecting children */}
           {node.children.length > 1 && (
             <div className="absolute top-0 left-6 right-6 h-px bg-slate-300"></div>
           )}

           {node.children.map((child, idx) => (
             <div key={child.id} className="flex flex-col items-center relative px-3">
                <div className="h-8 w-px bg-slate-300 mb-0"></div>
                <NodeCard node={child} level={level + 1} />
             </div>
           ))}
        </div>
      )}
    </div>
  );
};

const HierarchyView: React.FC = () => {
  return (
    <div className="overflow-auto p-8 bg-slate-50 h-full flex flex-col items-center">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-slate-800">Organigramma Operativo</h2>
        <p className="text-slate-500">Struttura aggiornata con Executive per reparto</p>
      </div>
      
      <div className="min-w-[1400px] flex justify-center pb-20 scale-95 origin-top">
         {HIERARCHY.map(rootNode => (
           <NodeCard key={rootNode.id} node={rootNode} level={0} />
         ))}
      </div>
    </div>
  );
};

export default HierarchyView;
