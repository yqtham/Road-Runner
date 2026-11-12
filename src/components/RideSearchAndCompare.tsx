import React, { useState, useMemo } from 'react';
import { SINGAPORE_LOCATIONS, generateComparativeRides, calculateDistanceKm } from '../data/mockData';
import { LocationItem, RideOption, CustomerPersona } from '../types';
import {
  MapPin,
  Navigation,
  ArrowUpDown,
  Car,
  Dog,
  Accessibility,
  Star,
  Clock,
  Sparkles,
  Ticket,
  ChevronRight,
  Shield,
  Layers,
  CheckCircle2,
  TableProperties,
  LayoutGrid,
  Zap,
  TrendingDown,
  Info,
} from 'lucide-react';

interface RideSearchAndCompareProps {
  currentPersona: CustomerPersona;
  onBookRide: (ride: RideOption, pickup: LocationItem, dropoff: LocationItem, discount: number, voucherCode: string) => void;
  onOpenRadar: () => void;
}

export const RideSearchAndCompare: React.FC<RideSearchAndCompareProps> = ({
  currentPersona,
  onBookRide,
  onOpenRadar,
}) => {
  // Pre-selected default locations based on persona
  const defaultPickup = currentPersona === 'tourist'
    ? SINGAPORE_LOCATIONS[0] // Changi Airport T3
    : currentPersona === 'corporate'
    ? SINGAPORE_LOCATIONS[4] // Raffles Place CBD
    : SINGAPORE_LOCATIONS[5]; // One-North

  const defaultDropoff = currentPersona === 'tourist'
    ? SINGAPORE_LOCATIONS[2] // Marina Bay Sands
    : currentPersona === 'corporate'
    ? SINGAPORE_LOCATIONS[0] // Changi Airport
    : SINGAPORE_LOCATIONS[4]; // Raffles Place CBD

  const [pickup, setPickup] = useState<LocationItem>(defaultPickup);
  const [dropoff, setDropoff] = useState<LocationItem>(defaultDropoff);

  const [passengerType, setPassengerType] = useState<'4-seater' | '6-seater' | 'premium'>('4-seater');
  const [petFriendly, setPetFriendly] = useState(false);
  const [wheelchairFriendly, setWheelchairFriendly] = useState(false);
  const [highRatingOnly, setHighRatingOnly] = useState(false);

  // View style: 'cards' or 'table'
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  // Voucher discount system (BMC Cost Structure & Promos)
  const [voucherCode, setVoucherCode] = useState(
    currentPersona === 'young_professional' ? 'FIRST5SG' : currentPersona === 'corporate' ? 'CORPBIZ' : ''
  );
  const [appliedVoucher, setAppliedVoucher] = useState<{ code: string; discountSgd: number; label: string } | null>(
    currentPersona === 'young_professional'
      ? { code: 'FIRST5SG', discountSgd: 5.0, label: 'S$5.00 First-Time Rider Voucher Applied' }
      : currentPersona === 'corporate'
      ? { code: 'CORPBIZ', discountSgd: 6.5, label: 'S$6.50 Corporate Mobility Subsidy Applied' }
      : null
  );
  const [voucherError, setVoucherError] = useState<string>('');

  // Handle Location Swapping
  const handleSwap = () => {
    const temp = pickup;
    setPickup(dropoff);
    setDropoff(temp);
  };

  // Generate real-time options across all 5 operators
  const rides = useMemo(() => {
    return generateComparativeRides(pickup, dropoff, passengerType, {
      petFriendly,
      wheelchairFriendly,
      highRatingOnly,
    });
  }, [pickup, dropoff, passengerType, petFriendly, wheelchairFriendly, highRatingOnly]);

  const distanceKm = useMemo(() => calculateDistanceKm(pickup, dropoff), [pickup, dropoff]);

  // Identify lowest price and lowest ETA
  const cheapestFare = rides.length > 0 ? Math.min(...rides.map((r) => r.fare)) : 0;
  const fastestEta = rides.length > 0 ? Math.min(...rides.map((r) => r.etaMinutes)) : 0;
  const averageFare = rides.length > 0 ? rides.reduce((acc, curr) => acc + curr.fare, 0) / rides.length : 0;

  const cheapestRide = rides.find((r) => r.fare === cheapestFare);
  const fastestRide = rides.find((r) => r.etaMinutes === fastestEta);

  // Voucher validation
  const handleApplyVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    setVoucherError('');
    const cleanCode = voucherCode.trim().toUpperCase();

    if (!cleanCode) {
      setAppliedVoucher(null);
      return;
    }

    if (cleanCode === 'FIRST5SG') {
      setAppliedVoucher({ code: cleanCode, discountSgd: 5.0, label: 'S$5.00 First-Time Rider Welcome Voucher' });
    } else if (cleanCode === 'CORPBIZ') {
      setAppliedVoucher({ code: cleanCode, discountSgd: 6.5, label: 'S$6.50 Corporate Employee Mobility Credit' });
    } else if (cleanCode === 'OFFPEAK') {
      setAppliedVoucher({ code: cleanCode, discountSgd: 3.0, label: 'S$3.00 Off-Peak Travel Rebate' });
    } else {
      setVoucherError('Invalid promo code. Try FIRST5SG or CORPBIZ.');
      setAppliedVoucher(null);
    }
  };

  return (
    <section id="ride_search" className="py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              <span>Singapore Multi-Partner Dispatch</span>
              <span aria-hidden="true">·</span>
              <span>Real-Time Time & Price Comparison</span>
            </div>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
              Compare Ride-Hailing Partners: Fares & Arrival Times
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Live pricing and nearest driver beacons pulled directly from <strong>Zig (CDG)</strong>, <strong>Grab</strong>, <strong>Gojek</strong>, <strong>Tada</strong>, and <strong>Ryde</strong>.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Toggle */}
            <div className="flex items-center rounded-xl bg-slate-100 p-1 border border-slate-200 dark:bg-slate-800 dark:border-slate-700">
              <button
                onClick={() => setViewMode('cards')}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                  viewMode === 'cards'
                    ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-900 dark:text-white font-semibold'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-300'
                }`}
                title="Cards view"
              >
                <LayoutGrid className="h-3.5 w-3.5" />
                <span>Card View</span>
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                  viewMode === 'table'
                    ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-900 dark:text-white font-semibold'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-300'
                }`}
                title="Side-by-side comparison table"
              >
                <TableProperties className="h-3.5 w-3.5" />
                <span>Side-by-Side Table</span>
              </button>
            </div>

            <button
              onClick={onOpenRadar}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-xs dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <Clock className="h-3.5 w-3.5 text-amber-500" />
              <span className="hidden sm:inline">Peak Hour Forecast</span>
            </button>
          </div>
        </div>

        {/* Route Input Bar */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-center">
            {/* Pickup Input */}
            <div className="lg:col-span-5">
              <label className="mb-1 block text-xs font-semibold text-slate-600 dark:text-slate-300">
                Pickup Point in Singapore
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Navigation className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <select
                  value={pickup.id}
                  onChange={(e) => {
                    const found = SINGAPORE_LOCATIONS.find((loc) => loc.id === e.target.value);
                    if (found) setPickup(found);
                  }}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-2.5 pl-9 pr-3 text-sm font-medium text-slate-900 focus:border-amber-500 focus:bg-white focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                >
                  {SINGAPORE_LOCATIONS.map((loc) => (
                    <option key={`pickup_${loc.id}`} value={loc.id} disabled={loc.id === dropoff.id}>
                      {loc.name} ({loc.area})
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-1 truncate text-xs text-slate-500 dark:text-slate-400">
                {pickup.address}
              </div>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center lg:col-span-2">
              <button
                onClick={handleSwap}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 hover:text-amber-600 transition-colors shadow-xs dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                title="Swap pickup and destination"
                aria-label="Swap locations"
              >
                <ArrowUpDown className="h-4 w-4" />
              </button>
            </div>

            {/* Dropoff Input */}
            <div className="lg:col-span-5">
              <label className="mb-1 block text-xs font-semibold text-slate-600 dark:text-slate-300">
                Destination Point in Singapore
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <MapPin className="h-4 w-4 text-rose-600 dark:text-rose-400" />
                </div>
                <select
                  value={dropoff.id}
                  onChange={(e) => {
                    const found = SINGAPORE_LOCATIONS.find((loc) => loc.id === e.target.value);
                    if (found) setDropoff(found);
                  }}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-2.5 pl-9 pr-3 text-sm font-medium text-slate-900 focus:border-amber-500 focus:bg-white focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                >
                  {SINGAPORE_LOCATIONS.map((loc) => (
                    <option key={`dropoff_${loc.id}`} value={loc.id} disabled={loc.id === pickup.id}>
                      {loc.name} ({loc.area})
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-1 truncate text-xs text-slate-500 dark:text-slate-400">
                {dropoff.address}
              </div>
            </div>
          </div>

          {/* Quick Route Info & Route Presets */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4 dark:border-slate-800/80">
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-slate-900 dark:text-white font-mono tabular-nums">
                ~{distanceKm} km trip
              </span>
              <span aria-hidden="true">·</span>
              <span>Est. travel time: ~{Math.round(distanceKm * 2.2 + 5)} mins</span>
              <span aria-hidden="true">·</span>
              <span>5 operators verified</span>
            </div>

            {/* Quick destination presets */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              <span className="text-slate-400 shrink-0">Popular:</span>
              <button
                onClick={() => {
                  const mbs = SINGAPORE_LOCATIONS.find((l) => l.id === 'mbs');
                  if (mbs) setDropoff(mbs);
                }}
                className="rounded-md border border-slate-200 px-2 py-1 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 shrink-0"
              >
                Marina Bay Sands
              </button>
              <button
                onClick={() => {
                  const raffles = SINGAPORE_LOCATIONS.find((l) => l.id === 'raffles_place');
                  if (raffles) setDropoff(raffles);
                }}
                className="rounded-md border border-slate-200 px-2 py-1 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 shrink-0"
              >
                Raffles Place CBD
              </button>
              <button
                onClick={() => {
                  const changi = SINGAPORE_LOCATIONS.find((l) => l.id === 'changi_t3');
                  if (changi) setDropoff(changi);
                }}
                className="rounded-md border border-slate-200 px-2 py-1 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 shrink-0"
              >
                Changi Airport T3
              </button>
              <button
                onClick={() => {
                  const sentosa = SINGAPORE_LOCATIONS.find((l) => l.id === 'sentosa_rws');
                  if (sentosa) setDropoff(sentosa);
                }}
                className="rounded-md border border-slate-200 px-2 py-1 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 shrink-0"
              >
                Sentosa Island
              </button>
            </div>
          </div>
        </div>

        {/* --- Quick Highlights: Price vs Speed Champion --- */}
        {rides.length > 0 && (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Cheapest Partner Card */}
            {cheapestRide && (
              <div className="rounded-2xl border border-emerald-300 bg-emerald-50/60 p-4 text-xs dark:border-emerald-800 dark:bg-emerald-950/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white font-bold text-xs"
                    style={{ backgroundColor: cheapestRide.operatorLogoBg }}
                  >
                    {cheapestRide.operator.toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 font-bold text-emerald-900 dark:text-emerald-200 text-sm">
                      <TrendingDown className="h-4 w-4 text-emerald-600" />
                      <span>Cheapest Option: {cheapestRide.serviceName}</span>
                    </div>
                    <div className="text-emerald-700 dark:text-emerald-400">
                      Saves S${(averageFare - cheapestRide.fare).toFixed(2)} compared to fleet average
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-lg font-extrabold font-mono text-emerald-900 dark:text-emerald-200 tabular-nums">
                    S${(cheapestRide.fare - (appliedVoucher ? appliedVoucher.discountSgd : 0)).toFixed(2)}
                  </div>
                  <div className="text-[11px] text-emerald-700 dark:text-emerald-400">
                    Pickup in {cheapestRide.etaMinutes} mins
                  </div>
                </div>
              </div>
            )}

            {/* Fastest Partner Card */}
            {fastestRide && (
              <div className="rounded-2xl border border-sky-300 bg-sky-50/60 p-4 text-xs dark:border-sky-800 dark:bg-sky-950/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white font-bold text-xs"
                    style={{ backgroundColor: fastestRide.operatorLogoBg }}
                  >
                    {fastestRide.operator.toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 font-bold text-sky-900 dark:text-sky-200 text-sm">
                      <Zap className="h-4 w-4 text-sky-600" />
                      <span>Fastest Pickup: {fastestRide.serviceName}</span>
                    </div>
                    <div className="text-sky-700 dark:text-sky-400">
                      Nearest driver arrives in only {fastestRide.etaMinutes} minutes
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-lg font-extrabold font-mono text-sky-900 dark:text-sky-200 tabular-nums">
                    {fastestRide.etaMinutes} min ETA
                  </div>
                  <div className="text-[11px] text-sky-700 dark:text-sky-400">
                    Fare: S${(fastestRide.fare - (appliedVoucher ? appliedVoucher.discountSgd : 0)).toFixed(2)}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Filter Controls: Zero-pill discipline with clean segmented buttons */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          {/* Passenger Vehicle Capacity Filter */}
          <div className="flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-100 p-1 dark:border-slate-800 dark:bg-slate-800/80">
            <button
              onClick={() => setPassengerType('4-seater')}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                passengerType === '4-seater'
                  ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-900 dark:text-white font-semibold'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
              }`}
            >
              Standard 4-Seater
            </button>
            <button
              onClick={() => setPassengerType('6-seater')}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                passengerType === '6-seater'
                  ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-900 dark:text-white font-semibold'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
              }`}
            >
              6-Seater Large
            </button>
            <button
              onClick={() => setPassengerType('premium')}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                passengerType === 'premium'
                  ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-900 dark:text-white font-semibold'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
              }`}
            >
              Premium Exec
            </button>
          </div>

          {/* Personalization Options */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setPetFriendly(!petFriendly)}
              className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                petFriendly
                  ? 'border-amber-500 bg-amber-50 text-amber-900 dark:bg-amber-950/40 dark:text-amber-200 dark:border-amber-600'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
              }`}
            >
              <Dog className="h-3.5 w-3.5" />
              <span>Pet-Friendly (GrabPet/RydePet)</span>
            </button>

            <button
              onClick={() => setWheelchairFriendly(!wheelchairFriendly)}
              className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                wheelchairFriendly
                  ? 'border-sky-500 bg-sky-50 text-sky-900 dark:bg-sky-950/40 dark:text-sky-200 dark:border-sky-600'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
              }`}
            >
              <Accessibility className="h-3.5 w-3.5" />
              <span>Wheelchair / Assist</span>
            </button>

            <button
              onClick={() => setHighRatingOnly(!highRatingOnly)}
              className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                highRatingOnly
                  ? 'border-amber-500 bg-amber-50 text-amber-900 dark:bg-amber-950/40 dark:text-amber-200 dark:border-amber-600'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
              }`}
            >
              <Star className="h-3.5 w-3.5" />
              <span>Top Rated Drivers (4.85★+)</span>
            </button>
          </div>
        </div>

        {/* Voucher Promo Banner */}
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 rounded-xl border border-amber-200/80 bg-amber-50/60 p-3 text-xs text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-200">
          <div className="flex items-center gap-2">
            <Ticket className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
            <div>
              <span className="font-semibold">Voucher Promo:</span>{' '}
              {appliedVoucher ? (
                <span className="font-medium text-emerald-700 dark:text-emerald-400">
                  {appliedVoucher.label}
                </span>
              ) : (
                <span>Use FIRST5SG for S$5 first ride discount, or CORPBIZ for corporate employee credit</span>
              )}
            </div>
          </div>

          <form onSubmit={handleApplyVoucher} className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="text"
              value={voucherCode}
              onChange={(e) => setVoucherCode(e.target.value)}
              placeholder="Enter promo code"
              className="rounded-lg border border-amber-300 bg-white px-2.5 py-1 text-xs uppercase font-medium text-slate-900 focus:border-amber-600 focus:outline-hidden dark:border-amber-800 dark:bg-slate-900 dark:text-white"
            />
            <button
              type="submit"
              className="rounded-lg bg-amber-500 px-3 py-1 text-xs font-semibold text-slate-950 hover:bg-amber-400 transition-colors whitespace-nowrap"
            >
              {appliedVoucher ? 'Update' : 'Apply'}
            </button>
          </form>
        </div>
        {voucherError && <p className="mt-1 text-xs text-rose-500">{voucherError}</p>}

        {/* --- VIEW MODE 1: SIDE-BY-SIDE TABLE VIEW --- */}
        {viewMode === 'table' ? (
          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
                <thead className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-400">
                  <tr>
                    <th scope="col" className="px-5 py-3.5">Ride Partner</th>
                    <th scope="col" className="px-4 py-3.5">Pickup Time (ETA)</th>
                    <th scope="col" className="px-4 py-3.5">Trip Time</th>
                    <th scope="col" className="px-4 py-3.5">Surge Factor</th>
                    <th scope="col" className="px-4 py-3.5">Partner Edge</th>
                    <th scope="col" className="px-4 py-3.5 text-right">Price (SGD)</th>
                    <th scope="col" className="px-5 py-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {rides.map((ride) => {
                    const isCheapest = ride.fare === cheapestFare;
                    const isFastest = ride.etaMinutes === fastestEta;
                    const discountAmount = appliedVoucher ? appliedVoucher.discountSgd : 0;
                    const finalFare = Math.max(2.0, Math.round((ride.fare - discountAmount) * 10) / 10);

                    return (
                      <tr
                        key={ride.id}
                        className={`hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors ${
                          isCheapest ? 'bg-emerald-50/20 dark:bg-emerald-950/15' : ''
                        }`}
                      >
                        {/* Operator Column */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <span
                              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white font-bold text-xs"
                              style={{ backgroundColor: ride.operatorLogoBg }}
                            >
                              {ride.operator.slice(0, 3).toUpperCase()}
                            </span>
                            <div>
                              <div className="font-bold text-slate-900 dark:text-white text-sm">
                                {ride.serviceName}
                              </div>
                              <div className="text-[11px] text-slate-500">
                                {ride.operator.toUpperCase()} · ★ {ride.driverRating}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Pickup ETA Column */}
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-1.5 font-bold font-mono tabular-nums text-slate-900 dark:text-white">
                            <Clock className="h-3.5 w-3.5 text-slate-400" />
                            <span>{ride.etaMinutes} mins</span>
                          </div>
                          {isFastest && (
                            <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                              ⚡ Fastest Pickup
                            </span>
                          )}
                        </td>

                        {/* Trip Duration Column */}
                        <td className="px-4 py-4 font-mono tabular-nums text-slate-600 dark:text-slate-300">
                          ~{ride.travelTimeMinutes} mins
                        </td>

                        {/* Surge Multiplier Column */}
                        <td className="px-4 py-4 font-mono tabular-nums">
                          {ride.surgeMultiplier > 1.05 ? (
                            <span className="font-bold text-rose-600 dark:text-rose-400">
                              {ride.surgeMultiplier}x Surge
                            </span>
                          ) : (
                            <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                              1.0x (Standard)
                            </span>
                          )}
                        </td>

                        {/* Partner Edge */}
                        <td className="px-4 py-4 text-xs text-slate-500 max-w-xs truncate">
                          {ride.perkDescription}
                        </td>

                        {/* Price Column */}
                        <td className="px-4 py-4 text-right">
                          <div className="text-base font-extrabold font-mono text-slate-900 dark:text-white tabular-nums">
                            S${finalFare.toFixed(2)}
                          </div>
                          {isCheapest && (
                            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                              ★ Lowest Fare
                            </span>
                          )}
                        </td>

                        {/* Action Column */}
                        <td className="px-5 py-4 text-right">
                          <button
                            onClick={() =>
                              onBookRide(ride, pickup, dropoff, discountAmount, appliedVoucher ? appliedVoucher.code : '')
                            }
                            className="rounded-xl bg-slate-900 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 transition-colors shadow-xs"
                          >
                            Book Ride
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* --- VIEW MODE 2: CARDS COMPARISON VIEW --- */
          <div className="mt-6 space-y-3">
            {rides.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center dark:border-slate-700">
                <Car className="mx-auto h-8 w-8 text-slate-400 mb-2" />
                <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200">
                  No matching fleets found for your active filters
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  Try disabling some preferences (e.g. wheelchair or pet-friendly) to see all 5 Singapore operators.
                </p>
                <button
                  onClick={() => {
                    setPetFriendly(false);
                    setWheelchairFriendly(false);
                    setHighRatingOnly(false);
                  }}
                  className="mt-3 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium text-white dark:bg-white dark:text-slate-900"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              rides.map((ride) => {
                const isCheapest = ride.fare === cheapestFare;
                const isFastest = ride.etaMinutes === fastestEta;
                const discountAmount = appliedVoucher ? appliedVoucher.discountSgd : 0;
                const finalFare = Math.max(2.0, Math.round((ride.fare - discountAmount) * 10) / 10);
                const savingsVsAverage = Math.max(0, Math.round((averageFare - ride.fare) * 10) / 10);

                return (
                  <div
                    key={ride.id}
                    className={`relative rounded-2xl border transition-all p-4 sm:p-5 ${
                      isCheapest
                        ? 'border-emerald-500 bg-emerald-50/20 dark:border-emerald-600/80 dark:bg-emerald-950/20 shadow-xs'
                        : isFastest
                        ? 'border-sky-400/80 bg-sky-50/20 dark:border-sky-700 dark:bg-sky-950/20 shadow-xs'
                        : 'border-slate-200 bg-white hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      {/* Left: Operator Branding & Details */}
                      <div className="flex items-start gap-3.5">
                        <div
                          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white font-bold text-sm shadow-xs"
                          style={{ backgroundColor: ride.operatorLogoBg }}
                        >
                          {ride.operator.toUpperCase()}
                        </div>

                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-base font-bold text-slate-900 dark:text-white">
                              {ride.serviceName}
                            </h3>

                            {isCheapest && (
                              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide">
                                ★ Cheapest Option
                              </span>
                            )}
                            {isFastest && !isCheapest && (
                              <span className="text-xs font-bold text-sky-700 dark:text-sky-400 uppercase tracking-wide">
                                ⚡ Fastest Pickup ({ride.etaMinutes} min)
                              </span>
                            )}
                          </div>

                          {/* Unboxed Metadata with Typographic Separators */}
                          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                            <span className="font-semibold text-slate-700 dark:text-slate-300">
                              Pickup: {ride.etaMinutes} mins
                            </span>
                            <span aria-hidden="true">·</span>
                            <span>Trip: ~{ride.travelTimeMinutes} mins</span>
                            <span aria-hidden="true">·</span>
                            <span className="flex items-center gap-0.5 text-amber-600 dark:text-amber-400 font-medium">
                              ★ {ride.driverRating}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span>{ride.vehicleType}</span>
                            <span aria-hidden="true">·</span>
                            <span>{ride.surgeMultiplier}x surge</span>
                          </div>

                          {/* Operator Value Perk */}
                          <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-300">
                            {ride.perkDescription}
                          </p>
                        </div>
                      </div>

                      {/* Right: Pricing, Savings & Dispatch CTA */}
                      <div className="flex flex-col sm:items-end justify-between gap-2 shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100 dark:border-slate-800">
                        <div className="text-left sm:text-right">
                          <div className="flex items-baseline sm:justify-end gap-2">
                            {appliedVoucher && (
                              <span className="text-xs text-slate-400 line-through font-mono tabular-nums">
                                S${ride.fare.toFixed(2)}
                              </span>
                            )}
                            <span className="text-2xl font-extrabold font-mono tabular-nums text-slate-900 dark:text-white">
                              S${finalFare.toFixed(2)}
                            </span>
                          </div>

                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            {isCheapest && savingsVsAverage > 0 ? (
                              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                                Saves ~S${savingsVsAverage.toFixed(2)} vs fleet avg
                              </span>
                            ) : (
                              <span>Driver ETA: {ride.etaMinutes} min</span>
                            )}
                          </div>
                        </div>

                        {/* Dispatch & Booking Button */}
                        <button
                          onClick={() =>
                            onBookRide(ride, pickup, dropoff, discountAmount, appliedVoucher ? appliedVoucher.code : '')
                          }
                          className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white hover:bg-slate-800 active:scale-98 transition-all dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 shadow-xs"
                        >
                          <span>Book with {ride.operator.toUpperCase()}</span>
                          <ChevronRight className="h-3.5 w-3.5" />
                        </button>

                        <span className="text-[11px] text-slate-400 dark:text-slate-500">
                          Road Runner earns {(ride.operatorCommissionRate * 100).toFixed(0)}% operator affiliate fee
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Informative Partner Footnote */}
        <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-400 flex items-start gap-3">
          <Info className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
          <div>
            <div className="font-semibold text-slate-900 dark:text-white mb-0.5">
              5 Singapore Operators Unified in One Tap
            </div>
            <p>
              Prices include prevailing GST and Electronic Road Pricing (ERP) where applicable. When you tap "Book", Road Runner passes your coordinate request to the operator's driver dispatch grid without markup.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
