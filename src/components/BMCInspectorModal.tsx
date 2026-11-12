import React, { useState } from 'react';
import { ROAD_RUNNER_BMC_BLOCKS } from '../data/mockData';
import { BMCBlock } from '../types';
import {
  X,
  ExternalLink,
  Sparkles,
  Layers,
  ArrowRight,
  Maximize2,
  FileText,
  Image as ImageIcon,
} from 'lucide-react';

interface BMCInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToFeature: (tab: string) => void;
}

export const BMCInspectorModal: React.FC<BMCInspectorModalProps> = ({
  isOpen,
  onClose,
  onNavigateToFeature,
}) => {
  const [activeBlock, setActiveBlock] = useState<BMCBlock>(ROAD_RUNNER_BMC_BLOCKS[3]); // Default to Value Propositions
  const [showOriginalImage, setShowOriginalImage] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-5xl rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xl dark:border-slate-800 dark:bg-slate-900 text-slate-900 dark:text-white max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-slate-950 font-bold text-sm shadow-xs">
              BMC
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight">
                Road Runner — Business Model Canvas Inspector
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Direct translation from your uploaded strategic canvas into live interactive software.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowOriginalImage(!showOriginalImage)}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 transition-colors"
            >
              <ImageIcon className="h-3.5 w-3.5 text-amber-500" />
              <span>{showOriginalImage ? 'Hide Canvas Image' : 'View Uploaded Canvas'}</span>
            </button>

            <button
              onClick={onClose}
              className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
              aria-label="Close BMC modal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto pt-5 flex-1 pr-1">
          {/* Optional Original Image Preview */}
          {showOriginalImage && (
            <div className="mb-6 rounded-2xl border border-slate-200 bg-slate-100 p-3 dark:border-slate-800 dark:bg-slate-800/80">
              <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300 font-semibold mb-2">
                <span>Original Uploaded Canvas Source (public/assets/aistudio/Road_Runner_76b7f37e.png)</span>
                <span className="text-[11px] text-slate-400">9 Core Canvas Blocks</span>
              </div>
              <div className="max-h-72 overflow-auto rounded-xl border border-slate-300 dark:border-slate-700 bg-white">
                <img
                  src="/public/assets/aistudio/Road_Runner_76b7f37e.png"
                  alt="Road Runner Business Model Canvas Original"
                  className="w-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          )}

          {/* 9 Blocks Grid Selector */}
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-1.5">
            {ROAD_RUNNER_BMC_BLOCKS.map((block) => {
              const isSelected = activeBlock.id === block.id;
              return (
                <button
                  key={block.id}
                  onClick={() => setActiveBlock(block)}
                  className={`rounded-xl p-2 text-center text-xs border transition-all ${
                    isSelected
                      ? 'border-amber-500 bg-amber-50 font-bold text-amber-950 dark:bg-amber-950/60 dark:text-amber-200 ring-2 ring-amber-500'
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300'
                  }`}
                >
                  <div className="truncate font-semibold text-[11px]">{block.title}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{block.notes.length} notes</div>
                </button>
              );
            })}
          </div>

          {/* Selected Block Detailed Breakdown */}
          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50/70 p-6 dark:border-slate-800 dark:bg-slate-800/40">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-4 dark:border-slate-700/80">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  Business Model Block
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {activeBlock.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {activeBlock.subtitle}
                </p>
              </div>

              <div className="text-xs font-semibold text-slate-400">
                {activeBlock.notes.length} Strategic Items
              </div>
            </div>

            {/* Notes list with direct app jump */}
            <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
              {activeBlock.notes.map((note, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs dark:border-slate-700/80 dark:bg-slate-900 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="text-sm font-bold text-slate-900 dark:text-white">
                        {note.text}
                      </span>
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-amber-100 text-[10px] font-bold text-amber-900 dark:bg-amber-900/60 dark:text-amber-200">
                        #{idx + 1}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {note.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-400">
                      Mapped to: <strong className="text-slate-600 dark:text-slate-300 font-mono">{note.appFeatureTarget}</strong>
                    </span>
                    <button
                      onClick={() => {
                        onClose();
                        onNavigateToFeature(note.appFeatureTarget);
                      }}
                      className="flex items-center gap-1 font-semibold text-amber-600 dark:text-amber-400 hover:underline"
                    >
                      <span>Jump to Feature</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5 border-t border-slate-200 pt-4 dark:border-slate-800 flex items-center justify-between shrink-0 text-xs">
          <span className="text-slate-500">
            Road Runner Architecture: Asset-Light Singapore Ride Aggregator
          </span>
          <button
            onClick={onClose}
            className="rounded-xl bg-slate-900 px-5 py-2 text-xs font-bold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 transition-colors"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
