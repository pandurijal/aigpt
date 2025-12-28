import React from 'react';
import { Tool } from '../types';
import { X, Check, ArrowUpRight } from 'lucide-react';

interface ToolDetailModalProps {
  tool: Tool | null;
  onClose: () => void;
}

const ToolDetailModal: React.FC<ToolDetailModalProps> = ({ tool, onClose }) => {
  if (!tool) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>
      
      <div className="relative bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in duration-200 border border-neutral-200">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 bg-white rounded-full hover:bg-neutral-100 transition-colors z-10 border border-neutral-200"
        >
          <X className="w-5 h-5 text-neutral-900" />
        </button>

        <div className="grid md:grid-cols-2">
            <div className="h-64 md:h-auto overflow-hidden bg-neutral-100 relative">
                <img 
                    src={tool.imageUrl} 
                    alt={tool.name} 
                    className="w-full h-full object-cover grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                />
                <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(0,0,0,0.1)]"></div>
            </div>

            <div className="p-8 md:p-10 flex flex-col h-full">
                <div className="mb-6">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 border-b border-neutral-200 pb-1">
                            {tool.category}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-neutral-300"></span>
                        <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 border-b border-neutral-200 pb-1">
                            {tool.priceModel}
                        </span>
                    </div>
                    <h2 className="text-4xl font-serif font-bold text-neutral-900 mb-4 leading-tight">{tool.name}</h2>
                    <p className="text-neutral-600 leading-relaxed text-sm">
                        {tool.fullDescription}
                    </p>
                </div>

                <div className="mb-8 flex-grow">
                    <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider mb-4">Kapabilitas Utama</h3>
                    <ul className="space-y-3">
                        {tool.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-neutral-700 text-sm group">
                                <Check className="w-4 h-4 text-primary-600 mt-0.5" />
                                <span className="group-hover:text-primary-800 transition-colors">{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex gap-4 pt-6 border-t border-neutral-100">
                    <button className="flex-1 py-3 bg-neutral-900 text-white font-medium hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2">
                        Coba Alat Ini
                        <ArrowUpRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ToolDetailModal;