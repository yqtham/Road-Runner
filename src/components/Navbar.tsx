import React from 'react';
import { Compass, FileText, Moon, Sun } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onOpenBMC: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  onOpenBMC,
  isDark,
  onToggleTheme,
}) => {
  const navItems = [
    { id: 'ride_search', label: 'Ride Compare' },
    { id: 'peak_radar', label: 'Peak Radar' },
    { id: 'news_feed', label: 'In-Ride News' },
    { id: 'tourist_hub', label: 'Tourist & eSIM' },
    { id: 'corporate_portal', label: 'Corporate' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md transition-colors dark:border-slate-800 dark:bg-slate-900/95">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-4 py-3 sm:px-6 lg:px-8">
        {/* Zone 1: Brand Wordmark (Single text element, no attached subtitle pills) */}
        <button
          onClick={() => onTabChange('ride_search')}
          className="flex items-center gap-2 text-left font-bold tracking-tight text-slate-900 transition-opacity hover:opacity-90 dark:text-white shrink-0 whitespace-nowrap"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-amber-400 font-extrabold text-lg dark:bg-amber-400 dark:text-slate-900 shadow-sm">
            RR
          </span>
          <span className="text-xl font-extrabold tracking-tight">Road Runner</span>
        </button>

        {/* Zone 2: 4-5 single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 text-sm font-medium ${
                  isActive
                    ? 'border-amber-500 text-slate-950 dark:text-white font-semibold'
                    : 'border-transparent text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action button + utility theme toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onToggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-label="Toggle color theme"
          >
            {isDark ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
          </button>

          <button
            onClick={onOpenBMC}
            className="flex items-center gap-2 rounded-lg bg-amber-500 px-3.5 py-2 text-xs font-semibold text-slate-950 hover:bg-amber-400 transition-colors shadow-sm whitespace-nowrap shrink-0"
          >
            <FileText className="h-3.5 w-3.5" />
            <span>Business Model Canvas</span>
          </button>
        </div>
      </div>

      {/* Mobile navigation tab scrollbar */}
      <div className="flex md:hidden overflow-x-auto px-4 py-2 border-t border-slate-100 dark:border-slate-800/60 gap-2 scrollbar-none">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`whitespace-nowrap px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                isActive
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-300'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
