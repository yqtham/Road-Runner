import React from 'react';
import { CustomerPersona } from '../types';

interface FooterProps {
  onTabChange: (tab: string) => void;
  onOpenBMC: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onTabChange, onOpenBMC }) => {
  return (
    <footer className="border-t border-slate-200 bg-white py-12 transition-colors dark:border-slate-800 dark:bg-slate-900 text-slate-600 dark:text-slate-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-900 text-amber-400 font-extrabold text-sm dark:bg-amber-400 dark:text-slate-900">
                RR
              </span>
              <span className="text-base font-bold text-slate-900 dark:text-white">
                Road Runner
              </span>
            </div>
            <p className="mt-2 text-xs text-slate-500 max-w-md">
              Singapore's multi-operator ride meta-search & smart mobility anchor platform. Real-time comparison across Grab, Gojek, Tada, Ryde, and Zig.
            </p>
          </div>

          {/* Nav Mirror Links */}
          <div className="flex flex-wrap items-center gap-6 text-xs font-medium">
            <button
              onClick={() => onTabChange('ride_search')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Ride Compare
            </button>
            <button
              onClick={() => onTabChange('peak_radar')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Peak Radar
            </button>
            <button
              onClick={() => onTabChange('news_feed')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              In-Ride News
            </button>
            <button
              onClick={() => onTabChange('tourist_hub')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Tourist & eSIM
            </button>
            <button
              onClick={() => onTabChange('corporate_portal')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Corporate Benefits
            </button>
            <button
              onClick={onOpenBMC}
              className="font-bold text-amber-600 dark:text-amber-400 hover:underline"
            >
              Business Model Canvas
            </button>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-100 pt-6 dark:border-slate-800 text-[11px] text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            © {new Date().getFullYear()} Road Runner Singapore Pte. Ltd. All rights reserved.
          </div>
          <div>
            Built with Singapore Land Transport Authority (LTA) open data & partner fleet APIs.
          </div>
        </div>
      </div>
    </footer>
  );
};
