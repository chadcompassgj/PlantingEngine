
import React from 'react';
import { Project } from '../types';
// Import 'trees' from its actual location in treeData.ts
import { trees } from '../treeData';
import { Trash2, FileText, ClipboardList, MapPin, Ruler } from 'lucide-react';

interface ProjectDetailProps {
  project: Project;
  onUpdateNotes: (treeId: string, notes: string) => void;
  onRemove: (treeId: string) => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onUpdateNotes, onRemove }) => {
  const projectTrees = project.items.map(item => ({
    ...item,
    data: trees.find(t => t.id === item.treeId)!
  }));

  if (projectTrees.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-slate-400 p-8 text-center bg-white rounded-3xl border-2 border-dashed border-slate-200">
        <ClipboardList className="w-12 h-12 text-slate-200 mb-4" />
        <h3 className="text-lg font-bold text-slate-600">This project is empty.</h3>
        <p className="max-w-xs mt-2 font-medium">Browse the catalog and save species to your design list.</p>
      </div>
    );
  }

  const totalCanopyWidth = projectTrees.reduce((acc, t) => acc + t.data.widthMax, 0);

  return (
    <div className="space-y-6">
      <div className="bg-emerald-800 p-8 rounded-3xl text-white shadow-xl shadow-emerald-900/10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-300">Landscape Design Summary</span>
            <h2 className="text-3xl font-black mt-1">{project.name}</h2>
            <p className="text-emerald-100 text-sm mt-2 opacity-80">Created on {new Date(project.createdAt).toLocaleDateString()}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-emerald-700/40 p-4 rounded-2xl border border-emerald-600/30">
              <span className="text-[10px] font-black uppercase text-emerald-200">Species Count</span>
              <p className="text-2xl font-black">{projectTrees.length}</p>
            </div>
            <div className="bg-emerald-700/40 p-4 rounded-2xl border border-emerald-600/30">
              <span className="text-[10px] font-black uppercase text-emerald-200">Total Avg Spread</span>
              <p className="text-2xl font-black">{totalCanopyWidth}'</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {projectTrees.map(({ treeId, designNotes, data }) => (
          <div key={treeId} className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-all flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              <span className="text-[9px] font-black uppercase text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full mb-2 inline-block">
                {data.category}
              </span>
              <h3 className="text-xl font-black text-slate-900 leading-tight">{data.commonName}</h3>
              <p className="text-xs text-slate-400 font-bold uppercase mt-1">{data.variety}</p>
              
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-tighter">
                  <Ruler className="w-3.5 h-3.5" /> Max Height: {data.heightMax}'
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-tighter">
                  <MapPin className="w-3.5 h-3.5" /> Source: {data.nursery}
                </div>
              </div>
            </div>

            <div className="flex-1 flex flex-col">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                <FileText className="w-3 h-3" />
                Intended Use & Placement Notes
              </label>
              <textarea 
                value={designNotes}
                onChange={(e) => onUpdateNotes(treeId, e.target.value)}
                placeholder="e.g. Center piece for south lawn renovation..."
                className="flex-1 w-full bg-slate-50 border-slate-100 rounded-xl p-3 text-sm font-medium focus:ring-emerald-500 focus:border-emerald-500 min-h-[100px]"
              />
            </div>

            <div className="shrink-0 flex md:flex-col justify-end gap-2">
              <button 
                onClick={() => onRemove(treeId)}
                className="p-3 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectDetail;
