import React, { useState } from 'react';
import { SINGAPORE_TRAFFIC_CONDITIONS, PEAK_SURGE_HOURS } from '../data/mockData';
import { TrafficCondition, PeakSurgeSlot } from '../types';
import {
  Clock,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Bell,
  Compass,
  ArrowRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';

export const PeakHourRadar: React.FC = () => {
  const [selectedTraffic, setSelectedTraffic] = useState<TrafficCondition>(SINGAPORE_TRAFFIC_CONDITIONS[0]);
  const [activeSurgeSlot, setActiveSurgeSlot] = useState<PeakSurgeSlot>(PEAK_SURGE_HOURS[1]); // 8:15 AM Peak
  const [notificationScheduled, setNotificationScheduled] = useState(false);

  const handleScheduleAlert = () => {
    setNotificationScheduled(true);
    setTimeout(() => setNotificationScheduled(false), 3500);
  };

  return (
    <section id="peak_radar" className="py-8 sm:py-12 bg-slate-50/50 dark:bg-slate-900/30 border-y border-slate-200/60 dark:border-slate-800/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              <span>Smart Commute Radar</span>
              <span aria-hidden="true">·</span>
              <span>LTA Traffic Feeds & ERP Rates</span>
            </div>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
              Peak Hour Surge Defense & Traffic Advisor
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Aim to reduce cost and waiting time during peak hours with predictive departure windows.
            </p>
          </div>

          <button
            onClick={handleScheduleAlert}
            className="flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-amber-400 transition-colors shadow-xs shrink-0"
          >
            <Bell className="h-4 w-4" />
            <span>Enable Daily Peak Drop Notifications</span>
          </button>
        </div>

        {notificationScheduled && (
          <div className="mb-6 rounded-xl border border-emerald-300 bg-emerald-50 p-3.5 text-xs text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>
                Daily push notification armed! Road Runner will ping you 15 minutes before surge drops along your morning and evening commute corridors.
              </span>
            </div>
            <span className="font-semibold text-emerald-700 dark:text-emerald-300">Active</span>
          </div>
        )}

        {/* 2-Column Layout: Surge Predictor & Live Expressway Radar */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left Column: 12-Hour Surge Heat Timeline */}
          <div className="lg:col-span-7 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Today's Estimated Surge Heatmap
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Click any hour slot to check estimated fare delta & departure recommendation
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="flex items-center gap-1 text-emerald-600 font-medium">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" /> Low (1.0x)
                </span>
                <span className="flex items-center gap-1 text-amber-600 font-medium">
                  <span className="h-2 w-2 rounded-full bg-amber-500" /> Mod (1.2x)
                </span>
                <span className="flex items-center gap-1 text-rose-600 font-medium">
                  <span className="h-2 w-2 rounded-full bg-rose-500" /> Peak (1.5x)
                </span>
              </div>
            </div>

            {/* Time Slot Horizontal Bar Selector */}
            <div className="mt-5 grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-1.5">
              {PEAK_SURGE_HOURS.map((slot) => {
                const isSelected = activeSurgeSlot.timeLabel === slot.timeLabel;
                const statusColor =
                  slot.status === 'peak'
                    ? 'bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-950/60 dark:text-rose-200 dark:border-rose-800'
                    : slot.status === 'moderate'
                    ? 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/60 dark:text-amber-200 dark:border-amber-800'
                    : 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-200 dark:border-emerald-800';

                return (
                  <button
                    key={slot.timeLabel}
                    onClick={() => setActiveSurgeSlot(slot)}
                    className={`flex flex-col items-center rounded-xl p-2 text-center border transition-all ${statusColor} ${
                      isSelected ? 'ring-2 ring-slate-900 dark:ring-white scale-105 shadow-sm' : 'opacity-85 hover:opacity-100'
                    }`}
                  >
                    <span className="text-[11px] font-semibold">{slot.timeLabel.split(' ')[0]}</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">{slot.timeLabel.split(' ')[1]}</span>
                    <span className="mt-1 text-xs font-bold font-mono">{slot.expectedSurge}x</span>
                  </button>
                );
              })}
            </div>

            {/* Active Surge Slot Detail Card */}
            <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/60">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-base text-slate-900 dark:text-white">
                      Selected Slot: {activeSurgeSlot.timeLabel}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                      {activeSurgeSlot.status.toUpperCase()} SURGE ({activeSurgeSlot.expectedSurge}x)
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                    {activeSurgeSlot.recommendation}
                  </p>
                </div>

                <div className="text-left sm:text-right shrink-0">
                  <div className="text-xs text-slate-500 dark:text-slate-400">Estimated Average Fare</div>
                  <div className="text-xl font-bold font-mono tabular-nums text-slate-900 dark:text-white">
                    ~S${activeSurgeSlot.fareEstimateSgd.toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Savvy Commuter Action Tip */}
              <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-3 dark:border-slate-700/80 text-xs">
                <span className="text-slate-600 dark:text-slate-400">
                  {activeSurgeSlot.expectedSurge > 1.2
                    ? '💡 Commute Tip: Delay departure by 20–30 mins to avoid the S$7–S$10 peak taxi surcharge.'
                    : '✓ Recommended Time: Best value window with zero operator surge fees.'}
                </span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400 shrink-0 ml-2">
                  Road Runner Advisor
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Live Singapore Expressway Traffic Feed */}
          <div className="lg:col-span-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Expressway & ERP Status
                </h3>
                <span className="text-xs text-slate-500 font-mono">Live Sync</span>
              </div>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                LTA Electronic Road Pricing gantries & arterial flow updates.
              </p>

              {/* Expressway List */}
              <div className="mt-4 space-y-2">
                {SINGAPORE_TRAFFIC_CONDITIONS.map((cond) => {
                  const isSelected = selectedTraffic.id === cond.id;
                  const statusBadge =
                    cond.status === 'congested'
                      ? 'text-rose-600 dark:text-rose-400'
                      : cond.status === 'moderate'
                      ? 'text-amber-600 dark:text-amber-400'
                      : 'text-emerald-600 dark:text-emerald-400';

                  return (
                    <button
                      key={cond.id}
                      onClick={() => setSelectedTraffic(cond)}
                      className={`w-full rounded-xl p-3 text-left border transition-all ${
                        isSelected
                          ? 'border-amber-500 bg-amber-50/40 dark:border-amber-600 dark:bg-amber-950/30'
                          : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800/40 dark:hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs text-slate-900 dark:text-white">
                          {cond.expressway}
                        </span>
                        <span className={`text-xs font-bold uppercase tracking-wider ${statusBadge}`}>
                          {cond.status} · {cond.speedKmh} km/h
                        </span>
                      </div>
                      <div className="mt-1 truncate text-xs text-slate-500 dark:text-slate-400">
                        {cond.section} ({cond.direction})
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Expressway Insider Tip Box */}
            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3.5 dark:border-slate-800 dark:bg-slate-800/60 text-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-slate-900 dark:text-white">
                  {selectedTraffic.expressway} Advice
                </span>
                <span className="font-mono font-semibold text-slate-700 dark:text-slate-300">
                  ERP: S${selectedTraffic.erpRateSgd.toFixed(2)}
                </span>
              </div>
              <p className="text-slate-600 dark:text-slate-300">
                {selectedTraffic.insiderTip}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
