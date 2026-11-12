import React, { useState } from 'react';
import {
  Briefcase,
  Building2,
  Receipt,
  Download,
  CheckCircle2,
  FileSpreadsheet,
  TrendingDown,
  ShieldCheck,
  CreditCard,
  UserCheck,
} from 'lucide-react';

export const CorporatePortal: React.FC = () => {
  const [billingCode, setBillingCode] = useState('CORP-SEA-TECH-8821');
  const [employeeName, setEmployeeName] = useState('Cheryl Lim (VP Engineering)');
  const [costCenter, setCostCenter] = useState('SG-TECH-042');
  const [monthlyAllowance] = useState(450.0);
  const [usedAllowance, setUsedAllowance] = useState(132.4);
  const [invoiceGenerated, setInvoiceGenerated] = useState(false);

  const pastCorporateRides = [
    {
      id: 'TRIP-8921',
      date: '11 Nov 2026',
      time: '08:45 AM',
      operator: 'Tada Standard',
      from: 'One-North (Fusionopolis)',
      to: 'Raffles Place (One Raffles Quay)',
      fareSgd: 22.8,
      gstSgd: 1.88,
      status: 'Auto-Expensed',
      purpose: 'Client Executive Briefing',
    },
    {
      id: 'TRIP-8840',
      date: '08 Nov 2026',
      time: '06:15 PM',
      operator: 'CDG Zig Taxi',
      from: 'Marina Bay Financial Centre',
      to: 'Changi Airport T3',
      fareSgd: 34.5,
      gstSgd: 2.85,
      status: 'Auto-Expensed',
      purpose: 'Regional Flight Departure',
    },
    {
      id: 'TRIP-8712',
      date: '04 Nov 2026',
      time: '09:10 AM',
      operator: 'GrabCar Exec',
      from: 'Tampines Regional Centre',
      to: 'Raffles Place',
      fareSgd: 28.0,
      gstSgd: 2.31,
      status: 'Auto-Expensed',
      purpose: 'Board Meeting',
    },
  ];

  const handleGenerateInvoice = () => {
    setInvoiceGenerated(true);
    setTimeout(() => {
      alert('Official Tax Invoice & Expense PDF generated for Singapore IRAS claim compliance!');
    }, 400);
  };

  return (
    <section id="corporate_portal" className="py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              <span>Customer Segment: Corporates</span>
              <span aria-hidden="true">·</span>
              <span>Employee Mobility Benefit</span>
            </div>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
              Corporate Mobility Portal & Expense Engine
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Centralized corporate accounts with zero receipt paperwork, employee travel allowances, and IRAS-compliant tax invoices.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleGenerateInvoice}
              className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 transition-colors shadow-xs"
            >
              <Download className="h-4 w-4" />
              <span>Download Monthly GST Tax Statement</span>
            </button>
          </div>
        </div>

        {/* Top 3 KPI Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Monthly Employee Allowance</span>
              <Building2 className="h-4 w-4 text-amber-500" />
            </div>
            <div className="mt-2 text-2xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">
              S${monthlyAllowance.toFixed(2)}
            </div>
            <div className="mt-1 text-xs text-emerald-600 dark:text-emerald-400">
              S${(monthlyAllowance - usedAllowance).toFixed(2)} balance remaining this cycle
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Corporate Savings via Road Runner</span>
              <TrendingDown className="h-4 w-4 text-emerald-500" />
            </div>
            <div className="mt-2 text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400 tabular-nums">
              18.4%
            </div>
            <div className="mt-1 text-xs text-slate-500">
              Saved across Grab, Tada & Zig vs unmanaged bookings
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Active Billing Account</span>
              <CreditCard className="h-4 w-4 text-sky-500" />
            </div>
            <div className="mt-2 text-base font-bold text-slate-900 dark:text-white truncate">
              {billingCode}
            </div>
            <div className="mt-1 text-xs text-slate-500">
              Cost Center: {costCenter} · Singapore Entity
            </div>
          </div>
        </div>

        {/* Corporate Profile & Settings */}
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">
            Employee Mobility Credentials
          </h3>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                Authorized Employee
              </label>
              <input
                type="text"
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 px-3 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                Company Billing Code
              </label>
              <input
                type="text"
                value={billingCode}
                onChange={(e) => setBillingCode(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 px-3 text-xs font-mono text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                Cost Allocation Tag
              </label>
              <input
                type="text"
                value={costCenter}
                onChange={(e) => setCostCenter(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 px-3 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Corporate Past Trips Table */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="border-b border-slate-200 px-6 py-4 dark:border-slate-800 flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Recent Corporate Dispatches & Tax Breakdown
            </h3>
            <span className="text-xs text-slate-500">Auto-synced with company ERP / Concur</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
              <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:bg-slate-800/60 dark:text-slate-400">
                <tr>
                  <th scope="col" className="px-6 py-3">Trip ID & Date</th>
                  <th scope="col" className="px-4 py-3">Operator</th>
                  <th scope="col" className="px-4 py-3">Route</th>
                  <th scope="col" className="px-4 py-3">Business Purpose</th>
                  <th scope="col" className="px-4 py-3">GST (9%)</th>
                  <th scope="col" className="px-6 py-3 text-right">Fare (SGD)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {pastCorporateRides.map((ride) => (
                  <tr key={ride.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                    <td className="px-6 py-3.5">
                      <div className="font-bold text-slate-900 dark:text-white font-mono">{ride.id}</div>
                      <div className="text-[11px] text-slate-400">{ride.date} · {ride.time}</div>
                    </td>
                    <td className="px-4 py-3.5 font-medium">{ride.operator}</td>
                    <td className="px-4 py-3.5">
                      <div>{ride.from}</div>
                      <div className="text-[11px] text-slate-400">→ {ride.to}</div>
                    </td>
                    <td className="px-4 py-3.5 text-slate-600 dark:text-slate-400">{ride.purpose}</td>
                    <td className="px-4 py-3.5 font-mono tabular-nums text-slate-500">S${ride.gstSgd.toFixed(2)}</td>
                    <td className="px-6 py-3.5 text-right font-bold font-mono tabular-nums text-slate-900 dark:text-white">
                      S${ride.fareSgd.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
