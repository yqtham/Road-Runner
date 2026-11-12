import React, { useState } from 'react';
import { TOURIST_ROUTES, ESIM_PACKAGES, SINGAPORE_LOCATIONS } from '../data/mockData';
import { TouristRoute, ESIMPackage, LocationItem } from '../types';
import {
  Compass,
  Wifi,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
  Check,
  QrCode,
  Sparkles,
  Luggage,
  Coins,
  ExternalLink,
} from 'lucide-react';

interface TouristHubProps {
  onSelectRoute: (pickup: LocationItem, dropoff: LocationItem) => void;
}

export const TouristHub: React.FC<TouristHubProps> = ({ onSelectRoute }) => {
  const [selectedRoute, setSelectedRoute] = useState<TouristRoute>(TOURIST_ROUTES[0]);
  const [selectedESim, setSelectedESim] = useState<ESIMPackage | null>(null);
  const [purchasedESim, setPurchasedESim] = useState<ESIMPackage | null>(null);
  const [totalCommissionEarned, setTotalCommissionEarned] = useState<number>(14.5);

  const handleBuyESim = (pkg: ESIMPackage) => {
    setSelectedESim(pkg);
  };

  const handleConfirmPurchase = () => {
    if (selectedESim) {
      setPurchasedESim(selectedESim);
      setTotalCommissionEarned((prev) => prev + selectedESim.commissionToRoadRunner);
      setSelectedESim(null);
    }
  };

  const handleRouteToBooking = (route: TouristRoute) => {
    // Pick suitable default pickup and destination
    const pickup = SINGAPORE_LOCATIONS[0]; // Changi Airport or City
    const dropoff = SINGAPORE_LOCATIONS.find((l) => l.id === 'mbs') || SINGAPORE_LOCATIONS[2];
    onSelectRoute(pickup, dropoff);
  };

  return (
    <section id="tourist_hub" className="py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              <span>Customer Segment: Tourists</span>
              <span aria-hidden="true">·</span>
              <span>Singapore Visitor Concierge</span>
            </div>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
              Curated Tourist Routes & Travel eSIM Store
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Personalized tourist itineraries, local cab etiquette, and instant 5G travel data bundles.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">
              Road Runner Partner Revenue: <strong className="font-mono text-emerald-600 dark:text-emerald-400">S${totalCommissionEarned.toFixed(2)}</strong> earned
            </span>
          </div>
        </div>

        {/* Tourist Itineraries Section */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left: Featured Itinerary Display */}
          <div className="lg:col-span-7 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  Featured Sightseeing Circuit
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {selectedRoute.name}
                </h3>
              </div>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {selectedRoute.estTotalDistance}
              </span>
            </div>

            {/* Route Image with fallback */}
            <div className="relative h-48 w-full overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 mb-4">
              <img
                src={selectedRoute.image}
                alt={selectedRoute.name}
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 text-white text-xs font-medium">
                {selectedRoute.tagline}
              </div>
            </div>

            {/* Stops list */}
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                Curated Stops
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {selectedRoute.stops.map((stop, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-700 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300"
                  >
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-slate-950">
                      {idx + 1}
                    </span>
                    <span>{stop}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Insider Travel Advice */}
            <div className="mt-4 rounded-xl border border-amber-200/60 bg-amber-50/50 p-3.5 text-xs text-amber-950 dark:border-amber-900/40 dark:bg-amber-950/20 dark:text-amber-200">
              <span className="font-bold block mb-1">Singapore Local Cab Tip:</span>
              <p>{selectedRoute.insiderAdvice}</p>
              <div className="mt-2 flex items-center gap-3 text-[11px] font-semibold text-amber-800 dark:text-amber-300">
                <span>Best Timing: {selectedRoute.recommendedTime}</span>
                <span aria-hidden="true">·</span>
                <span>Est Cab Fare: {selectedRoute.estCabFare}</span>
              </div>
            </div>

            {/* Route Booking Button */}
            <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
              <div className="text-xs text-slate-500">
                Compare Grab, Gojek & Tada for this exact route
              </div>
              <button
                onClick={() => handleRouteToBooking(selectedRoute)}
                className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 transition-colors"
              >
                <span>Find Rides for This Route</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Right: Route Selector List */}
          <div className="lg:col-span-5 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Select Curated Singapore Routes
            </h4>
            {TOURIST_ROUTES.map((route) => {
              const isSelected = selectedRoute.id === route.id;
              return (
                <button
                  key={route.id}
                  onClick={() => setSelectedRoute(route)}
                  className={`w-full rounded-2xl border p-4 text-left transition-all ${
                    isSelected
                      ? 'border-amber-500 bg-amber-50/30 dark:border-amber-600 dark:bg-amber-950/30 shadow-xs ring-1 ring-amber-500'
                      : 'border-slate-200 bg-white hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">
                      {route.name}
                    </span>
                    <span className="text-xs font-mono text-slate-500">{route.estCabFare}</span>
                  </div>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                    {route.tagline}
                  </p>
                  <div className="mt-2 flex items-center gap-2 text-[11px] text-amber-600 dark:text-amber-400 font-medium">
                    <span>{route.stops.length} Stops</span>
                    <span aria-hidden="true">·</span>
                    <span>{route.recommendedTime.split('(')[0]}</span>
                  </div>
                </button>
              );
            })}

            {/* Singapore Tourist Tips Card */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/40 text-xs text-slate-600 dark:text-slate-300">
              <div className="font-bold text-slate-900 dark:text-white mb-1.5 flex items-center gap-1.5">
                <Luggage className="h-4 w-4 text-amber-500" />
                <span>3 Quick Taxi Tips for Tourists in Singapore</span>
              </div>
              <ul className="space-y-1 text-[11px] list-disc list-inside">
                <li>No tipping is expected in Singapore; metered and flat app prices are final.</li>
                <li>Rain surge hits around 4:30 PM. Tada and CDG Zig have lower surge rates during downpours.</li>
                <li>Hail cars at designated taxi stands in CBD and Orchard Road rather than waving on roads.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Tourist eSIM Marketplace (BMC Revenue Stream: "Partner with third party providers such as esim") */}
        <div className="mt-12 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                <span>Revenue Stream · Partner Marketplace</span>
                <span aria-hidden="true">·</span>
                <span>Third-Party Sign-up Commission</span>
              </div>
              <h3 className="mt-1 text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                Singapore High-Speed 5G Tourist eSIMs
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Instant digital activation upon landing at Changi Airport. Road Runner earns 20% commission on every activated plan.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <Wifi className="h-4 w-4 text-emerald-500" />
              <span>Singtel & StarHub 5G Networks</span>
            </div>
          </div>

          {/* eSIM Plan Cards */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {ESIM_PACKAGES.map((pkg) => {
              return (
                <div
                  key={pkg.id}
                  className={`relative rounded-2xl border p-5 flex flex-col justify-between transition-all ${
                    pkg.popular
                      ? 'border-amber-500 bg-amber-50/20 dark:border-amber-600 dark:bg-amber-950/20 shadow-sm'
                      : 'border-slate-200 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-800/40'
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3 right-4 rounded-full bg-amber-500 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-950">
                      Most Popular
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                      <span>{pkg.provider}</span>
                      <span>{pkg.validityDays} Days</span>
                    </div>

                    <h4 className="mt-1 text-base font-bold text-slate-900 dark:text-white">
                      {pkg.name}
                    </h4>

                    <div className="mt-3 flex items-baseline gap-2">
                      <span className="text-2xl font-extrabold font-mono text-slate-900 dark:text-white">
                        S${pkg.priceSgd.toFixed(2)}
                      </span>
                      <span className="text-xs text-slate-400 line-through font-mono">
                        S${pkg.originalPriceSgd.toFixed(2)}
                      </span>
                    </div>

                    <div className="mt-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      {pkg.dataAllowance}
                    </div>

                    {/* Features list */}
                    <ul className="mt-4 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                      {pkg.features.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 border-t border-slate-200 pt-4 dark:border-slate-700/60">
                    <button
                      onClick={() => handleBuyESim(pkg)}
                      className="w-full rounded-xl bg-slate-900 py-2.5 text-xs font-bold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 transition-colors"
                    >
                      Instant Buy & QR Activate
                    </button>

                    <div className="mt-2 text-center text-[11px] text-slate-400">
                      Platform commission: S${pkg.commissionToRoadRunner.toFixed(2)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* eSIM Purchase Confirmation Modal */}
      {selectedESim && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
          <div className="relative w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900 text-slate-900 dark:text-white">
            <h3 className="text-lg font-bold">Activate {selectedESim.name}</h3>
            <p className="mt-1 text-xs text-slate-500">
              Partner integration with {selectedESim.provider} on {selectedESim.network}.
            </p>

            <div className="mt-4 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/60 text-xs space-y-2">
              <div className="flex justify-between">
                <span>Data Allowance</span>
                <span className="font-bold">{selectedESim.dataAllowance}</span>
              </div>
              <div className="flex justify-between">
                <span>Validity</span>
                <span className="font-bold">{selectedESim.validityDays} Days</span>
              </div>
              <div className="flex justify-between border-t pt-2 border-slate-200 dark:border-slate-700">
                <span className="font-bold">Total Price</span>
                <span className="font-bold font-mono text-base">S${selectedESim.priceSgd.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[11px] text-emerald-600 dark:text-emerald-400">
                <span>Road Runner Commission</span>
                <span className="font-mono font-semibold">+S${selectedESim.commissionToRoadRunner.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedESim(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmPurchase}
                className="rounded-xl bg-amber-500 px-5 py-2 text-xs font-bold text-slate-950 hover:bg-amber-400 transition-colors"
              >
                Confirm & Generate QR Code
              </button>
            </div>
          </div>
        </div>
      )}

      {/* eSIM Activated QR Modal */}
      {purchasedESim && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
          <div className="relative w-full max-w-sm rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-2xl dark:border-slate-800 dark:bg-slate-900 text-slate-900 dark:text-white">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 mb-3">
              <QrCode className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold">eSIM Activated!</h3>
            <p className="mt-1 text-xs text-slate-500">
              Scan this QR code with your iPhone or Android camera to install the {purchasedESim.name} profile.
            </p>

            <div className="my-4 mx-auto flex h-36 w-36 items-center justify-center rounded-2xl border-2 border-slate-900 bg-white p-2 dark:border-white">
              {/* Sleek SVG QR Representation */}
              <div className="grid grid-cols-4 gap-1.5 w-full h-full p-2 bg-slate-900 rounded-lg">
                <span className="bg-white rounded-xs" />
                <span className="bg-amber-400 rounded-xs" />
                <span className="bg-white rounded-xs" />
                <span className="bg-white rounded-xs" />
                <span className="bg-white rounded-xs" />
                <span className="bg-white rounded-xs" />
                <span className="bg-amber-400 rounded-xs" />
                <span className="bg-white rounded-xs" />
                <span className="bg-white rounded-xs" />
                <span className="bg-amber-400 rounded-xs" />
                <span className="bg-white rounded-xs" />
                <span className="bg-white rounded-xs" />
                <span className="bg-white rounded-xs" />
                <span className="bg-white rounded-xs" />
                <span className="bg-white rounded-xs" />
                <span className="bg-amber-400 rounded-xs" />
              </div>
            </div>

            <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mb-4">
              ✓ Commission S${purchasedESim.commissionToRoadRunner.toFixed(2)} credited to Road Runner revenue
            </div>

            <button
              onClick={() => setPurchasedESim(null)}
              className="w-full rounded-xl bg-slate-900 py-2.5 text-xs font-bold text-white dark:bg-white dark:text-slate-900"
            >
              Done & Start Surfing
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
