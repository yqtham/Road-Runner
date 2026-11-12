import React from 'react';
import { CustomerPersona } from '../types';
import { Zap, Palmtree, Briefcase, TrendingDown, Clock, ShieldCheck, ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  currentPersona: CustomerPersona;
  onSelectPersona: (persona: CustomerPersona) => void;
  onExploreRides: () => void;
  onOpenRadar: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  currentPersona,
  onSelectPersona,
  onExploreRides,
  onOpenRadar,
}) => {
  return (
    <div className="relative overflow-hidden border-b border-slate-200 bg-slate-900 text-white dark:border-slate-800">
      {/* Background with measured contrast scrim */}
      <div className="absolute inset-0 z-0 opacity-35">
        <img
          src="/src/assets/images/hero_singapore_skyline_1794491584402.jpg"
          alt="Singapore Marina Bay Expressway at twilight"
          className="h-full w-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-900/60" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="max-w-3xl">
          {/* Unboxed category metadata without static pill enclosures */}
          <div className="mb-4 flex flex-wrap items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-400">
            <span>Singapore Multi-Operator Anchor</span>
            <span aria-hidden="true" className="text-slate-500">·</span>
            <span>Grab</span>
            <span aria-hidden="true" className="text-slate-500">/</span>
            <span>Gojek</span>
            <span aria-hidden="true" className="text-slate-500">/</span>
            <span>Tada</span>
            <span aria-hidden="true" className="text-slate-500">/</span>
            <span>Ryde</span>
            <span aria-hidden="true" className="text-slate-500">/</span>
            <span>Zig</span>
          </div>

          <h1
            className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl"
            style={{ textWrap: 'balance' as any }}
          >
            Find the cheapest and fastest ride in Singapore across all 5 operators.
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl">
            Never toggle between apps again. Road Runner pulls real-time fares and nearest drivers across Grab, Gojek, Tada, Ryde, and Zig, shields you from peak surges, and keeps you informed on the move.
          </p>

          {/* Customer Segment Personas - Interactive Switcher */}
          <div className="mt-8">
            <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Select Your Travel Profile
            </span>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              <button
                onClick={() => onSelectPersona('young_professional')}
                className={`flex items-start gap-3 rounded-xl p-3 text-left transition-all ${
                  currentPersona === 'young_professional'
                    ? 'bg-amber-500 text-slate-950 font-medium shadow-md'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 border border-slate-700/60'
                }`}
              >
                <Zap className={`mt-0.5 h-4 w-4 shrink-0 ${currentPersona === 'young_professional' ? 'text-slate-950' : 'text-amber-400'}`} />
                <div>
                  <div className="text-sm font-semibold">Young Commuter</div>
                  <div className={`text-xs ${currentPersona === 'young_professional' ? 'text-slate-900' : 'text-slate-400'}`}>
                    Fast dispatch & peak surge alert
                  </div>
                </div>
              </button>

              <button
                onClick={() => onSelectPersona('tourist')}
                className={`flex items-start gap-3 rounded-xl p-3 text-left transition-all ${
                  currentPersona === 'tourist'
                    ? 'bg-amber-500 text-slate-950 font-medium shadow-md'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 border border-slate-700/60'
                }`}
              >
                <Palmtree className={`mt-0.5 h-4 w-4 shrink-0 ${currentPersona === 'tourist' ? 'text-slate-950' : 'text-emerald-400'}`} />
                <div>
                  <div className="text-sm font-semibold">Tourist in SG</div>
                  <div className={`text-xs ${currentPersona === 'tourist' ? 'text-slate-900' : 'text-slate-400'}`}>
                    Curated sights, eSIM & taxi tips
                  </div>
                </div>
              </button>

              <button
                onClick={() => onSelectPersona('corporate')}
                className={`flex items-start gap-3 rounded-xl p-3 text-left transition-all ${
                  currentPersona === 'corporate'
                    ? 'bg-amber-500 text-slate-950 font-medium shadow-md'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 border border-slate-700/60'
                }`}
              >
                <Briefcase className={`mt-0.5 h-4 w-4 shrink-0 ${currentPersona === 'corporate' ? 'text-slate-950' : 'text-sky-400'}`} />
                <div>
                  <div className="text-sm font-semibold">Corporate Benefit</div>
                  <div className={`text-xs ${currentPersona === 'corporate' ? 'text-slate-900' : 'text-slate-400'}`}>
                    Company expense code & rebates
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={onExploreRides}
              className="flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3 text-sm font-bold text-slate-950 hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20"
            >
              <span>Compare Live Fares Now</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              onClick={onOpenRadar}
              className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/60 px-5 py-3 text-sm font-semibold text-slate-200 hover:bg-slate-800 transition-colors"
            >
              <Clock className="h-4 w-4 text-amber-400" />
              <span>Check Peak Surge Forecast</span>
            </button>
          </div>
        </div>

        {/* 4-Item Proof & Metrics Strip below hero split */}
        <div className="mt-12 grid grid-cols-2 gap-4 border-t border-slate-800 pt-8 sm:grid-cols-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <TrendingDown className="h-3.5 w-3.5 text-amber-400" />
              <span>Avg Peak Savings</span>
            </div>
            <div className="mt-1 text-2xl font-bold font-mono tabular-nums text-white">
              S$5.20
            </div>
            <div className="text-xs text-slate-500">Per peak rush-hour trip</div>
          </div>

          <div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Clock className="h-3.5 w-3.5 text-amber-400" />
              <span>Median Dispatch ETA</span>
            </div>
            <div className="mt-1 text-2xl font-bold font-mono tabular-nums text-white">
              3.4 min
            </div>
            <div className="text-xs text-slate-500">Fastest cross-fleet match</div>
          </div>

          <div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>Live SG Fleets</span>
            </div>
            <div className="mt-1 text-2xl font-bold font-mono tabular-nums text-white">
              5 Fleets
            </div>
            <div className="text-xs text-slate-500">Grab · Gojek · Tada · Ryde · Zig</div>
          </div>

          <div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Zap className="h-3.5 w-3.5 text-amber-400" />
              <span>Business Model</span>
            </div>
            <div className="mt-1 text-2xl font-bold font-mono tabular-nums text-white">
              Asset-Light
            </div>
            <div className="text-xs text-slate-500">Zero fleet ownership liability</div>
          </div>
        </div>
      </div>
    </div>
  );
};
