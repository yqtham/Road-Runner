import React, { useState, useEffect } from 'react';
import { BookingState } from '../types';
import {
  X,
  CheckCircle2,
  Car,
  MapPin,
  Navigation,
  Phone,
  MessageSquare,
  ShieldAlert,
  Share2,
  Coins,
  Building2,
} from 'lucide-react';

interface BookingModalProps {
  booking: BookingState;
  onClose: () => void;
  onCancelBooking: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  booking,
  onClose,
  onCancelBooking,
}) => {
  const [step, setStep] = useState<'dispatching' | 'confirmed' | 'arrived'>('dispatching');
  const [driver] = useState({
    name: 'Tan Wee Kiat',
    carModel: 'Toyota Prius Hybrid (Silver)',
    plate: 'SMA 7821 R',
    rating: 4.93,
    trips: '4,820 trips',
    phone: '+65 9123 4567',
  });
  const [progress, setProgress] = useState(20);
  const [etaRemaining, setEtaRemaining] = useState(booking.rideOption?.etaMinutes || 3);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    // Simulated dispatching state
    const t1 = setTimeout(() => {
      setStep('confirmed');
    }, 1200);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setStep('arrived');
          return 100;
        }
        return prev + 15;
      });
      setEtaRemaining((prev) => Math.max(1, prev - 1));
    }, 2500);

    return () => {
      clearTimeout(t1);
      clearInterval(interval);
    };
  }, [booking.rideOption?.etaMinutes]);

  if (!booking.active || !booking.rideOption) return null;

  const ride = booking.rideOption;
  const operatorFee = Math.round(booking.finalFare * ride.operatorCommissionRate * 100) / 100;

  const handleShareTrip = () => {
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900 text-slate-900 dark:text-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition-colors"
          aria-label="Close booking modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div
            className="flex h-11 w-11 items-center justify-center rounded-xl text-white font-bold text-sm shadow-xs"
            style={{ backgroundColor: ride.operatorLogoBg }}
          >
            {ride.operator.toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold">
                {step === 'dispatching' ? 'Connecting to Fleet API...' : 'Driver Confirmed'}
              </h3>
              {step !== 'dispatching' && (
                <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Dispatched
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {ride.serviceName} · Booking via Road Runner Anchor
            </p>
          </div>
        </div>

        {/* Progress Bar & ETA */}
        <div className="mt-5 rounded-2xl bg-slate-50 p-4 border border-slate-100 dark:bg-slate-800/60 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              {step === 'dispatching'
                ? 'Securing nearest available driver...'
                : step === 'arrived'
                ? 'Driver has arrived at pickup point!'
                : `Driver is on the way (ETA: ~${etaRemaining} min)`}
            </span>
            <span className="font-mono tabular-nums text-slate-500">{progress}%</span>
          </div>

          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
            <div
              className="h-full bg-amber-500 transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>

          {step !== 'dispatching' && (
            <div className="mt-4 flex items-center justify-between border-t border-slate-200/60 pt-3 dark:border-slate-700/60">
              <div>
                <div className="font-bold text-sm text-slate-900 dark:text-white">{driver.name}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {driver.carModel} · <span className="font-bold font-mono">{driver.plate}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-semibold text-amber-500 font-mono">★ {driver.rating}</div>
                <div className="text-[11px] text-slate-400">{driver.trips}</div>
              </div>
            </div>
          )}
        </div>

        {/* Route Details */}
        <div className="mt-4 space-y-2.5 text-xs">
          <div className="flex items-start gap-2.5">
            <Navigation className="mt-0.5 h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <div>
              <span className="font-semibold text-slate-700 dark:text-slate-300">Pickup:</span>{' '}
              <span className="text-slate-600 dark:text-slate-400">{booking.pickup.name}</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <MapPin className="mt-0.5 h-3.5 w-3.5 text-rose-600 dark:text-rose-400 shrink-0" />
            <div>
              <span className="font-semibold text-slate-700 dark:text-slate-300">Destination:</span>{' '}
              <span className="text-slate-600 dark:text-slate-400">{booking.dropoff.name}</span>
            </div>
          </div>
        </div>

        {/* Fare & Commercial Mechanics Breakdown */}
        <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-800/40">
          <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 mb-1">
            <span>Operator Base & Distance Fare</span>
            <span className="font-mono tabular-nums">S${ride.fare.toFixed(2)}</span>
          </div>

          {booking.voucherDiscountApplied > 0 && (
            <div className="flex items-center justify-between text-xs text-emerald-600 dark:text-emerald-400 mb-1">
              <span>Road Runner Promo Voucher ({booking.corporateBillingCode || 'WELCOME'})</span>
              <span className="font-mono tabular-nums">-S${booking.voucherDiscountApplied.toFixed(2)}</span>
            </div>
          )}

          <div className="flex items-center justify-between border-t border-slate-200 pt-2 text-sm font-bold text-slate-900 dark:border-slate-700 dark:text-white">
            <span>Total Payable to Driver</span>
            <span className="font-mono tabular-nums text-base">S${booking.finalFare.toFixed(2)}</span>
          </div>

          {/* Revenue Stream Verification from Canvas */}
          <div className="mt-3 flex items-center justify-between border-t border-slate-200/60 pt-2 text-[11px] text-slate-500 dark:border-slate-700/60">
            <span className="flex items-center gap-1">
              <Coins className="h-3 w-3 text-amber-500" />
              <span>Road Runner Platform Commission ({(ride.operatorCommissionRate * 100).toFixed(0)}%)</span>
            </span>
            <span className="font-mono font-semibold text-amber-600 dark:text-amber-400 tabular-nums">
              +S${operatorFee.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Driver Communication & Safety Actions */}
        <div className="mt-5 flex items-center gap-2">
          <button
            onClick={() => alert(`Connecting voice call to driver ${driver.name} (${driver.phone})...`)}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <Phone className="h-3.5 w-3.5 text-emerald-600" />
            <span>Call Driver</span>
          </button>

          <button
            onClick={() => alert(`Opening in-app chat with driver ${driver.name}...`)}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <MessageSquare className="h-3.5 w-3.5 text-sky-600" />
            <span>Message</span>
          </button>

          <button
            onClick={handleShareTrip}
            className="flex items-center justify-center rounded-xl border border-slate-200 bg-white p-2 text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 transition-colors"
            title="Share live ride tracking link"
          >
            <Share2 className="h-4 w-4" />
          </button>
        </div>
        {copiedLink && (
          <p className="mt-1 text-center text-[11px] text-emerald-600 dark:text-emerald-400">
            ✓ Live ride tracking URL copied to clipboard!
          </p>
        )}

        {/* Cancel Button */}
        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={onCancelBooking}
            className="text-xs text-rose-500 hover:text-rose-600 underline font-medium"
          >
            Cancel Ride (Free within 5 mins)
          </button>

          <button
            onClick={onClose}
            className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
