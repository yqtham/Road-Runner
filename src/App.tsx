/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { RideSearchAndCompare } from './components/RideSearchAndCompare';
import { PeakHourRadar } from './components/PeakHourRadar';
import { InRideNewsFeed } from './components/InRideNewsFeed';
import { TouristHub } from './components/TouristHub';
import { CorporatePortal } from './components/CorporatePortal';
import { BookingModal } from './components/BookingModal';
import { BMCInspectorModal } from './components/BMCInspectorModal';
import { Footer } from './components/Footer';
import { CustomerPersona, LocationItem, RideOption, BookingState } from './types';
import { SINGAPORE_LOCATIONS } from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('ride_search');
  const [currentPersona, setCurrentPersona] = useState<CustomerPersona>('young_professional');
  const [isDark, setIsDark] = useState<boolean>(false);
  const [isBMCOpen, setIsBMCOpen] = useState<boolean>(false);

  // Active booking state
  const [booking, setBooking] = useState<BookingState>({
    active: false,
    rideOption: null,
    pickup: SINGAPORE_LOCATIONS[5], // One-North
    dropoff: SINGAPORE_LOCATIONS[4], // Raffles Place
    tripStatus: 'searching',
    progress: 15,
    etaCountDown: 3,
    voucherDiscountApplied: 0,
    finalFare: 0,
  });

  // Dark mode effect
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const handleToggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const handleBookRide = (
    ride: RideOption,
    pickup: LocationItem,
    dropoff: LocationItem,
    discountAmount: number,
    voucherCode: string
  ) => {
    const finalFare = Math.max(2.0, Math.round((ride.fare - discountAmount) * 10) / 10);
    setBooking({
      active: true,
      rideOption: ride,
      pickup,
      dropoff,
      tripStatus: 'driver_assigned',
      progress: 25,
      etaCountDown: ride.etaMinutes,
      voucherDiscountApplied: discountAmount,
      finalFare,
      corporateBillingCode: voucherCode === 'CORPBIZ' ? 'CORP-SEA-TECH-8821' : undefined,
    });
  };

  const handleCancelBooking = () => {
    setBooking((prev) => ({ ...prev, active: false, rideOption: null }));
  };

  const handleSelectTouristRoute = (pickup: LocationItem, dropoff: LocationItem) => {
    setActiveTab('ride_search');
    // Scroll smoothly to ride search section
    const el = document.getElementById('ride_search');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePersonaSelect = (persona: CustomerPersona) => {
    setCurrentPersona(persona);
    if (persona === 'tourist') {
      setActiveTab('tourist_hub');
    } else if (persona === 'corporate') {
      setActiveTab('corporate_portal');
    } else {
      setActiveTab('ride_search');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100 flex flex-col justify-between">
      <div>
        {/* Top Navigation Bar conforming to Top Bar Contract */}
        <Navbar
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenBMC={() => setIsBMCOpen(true)}
          isDark={isDark}
          onToggleTheme={handleToggleTheme}
        />

        {/* Hero Section */}
        <HeroSection
          currentPersona={currentPersona}
          onSelectPersona={handlePersonaSelect}
          onExploreRides={() => {
            setActiveTab('ride_search');
            const el = document.getElementById('ride_search');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenRadar={() => {
            setActiveTab('peak_radar');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />

        {/* Main Content Sections based on Active Tab */}
        <main>
          {activeTab === 'ride_search' && (
            <>
              <RideSearchAndCompare
                currentPersona={currentPersona}
                onBookRide={handleBookRide}
                onOpenRadar={() => setActiveTab('peak_radar')}
              />
              <PeakHourRadar />
              <InRideNewsFeed />
            </>
          )}

          {activeTab === 'peak_radar' && (
            <>
              <PeakHourRadar />
              <RideSearchAndCompare
                currentPersona={currentPersona}
                onBookRide={handleBookRide}
                onOpenRadar={() => {}}
              />
            </>
          )}

          {activeTab === 'news_feed' && (
            <InRideNewsFeed />
          )}

          {activeTab === 'tourist_hub' && (
            <>
              <TouristHub onSelectRoute={handleSelectTouristRoute} />
              <RideSearchAndCompare
                currentPersona="tourist"
                onBookRide={handleBookRide}
                onOpenRadar={() => setActiveTab('peak_radar')}
              />
            </>
          )}

          {activeTab === 'corporate_portal' && (
            <>
              <CorporatePortal />
              <RideSearchAndCompare
                currentPersona="corporate"
                onBookRide={handleBookRide}
                onOpenRadar={() => setActiveTab('peak_radar')}
              />
            </>
          )}
        </main>
      </div>

      {/* Footer */}
      <Footer
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenBMC={() => setIsBMCOpen(true)}
      />

      {/* Booking Simulation & Driver Dispatch Modal */}
      <BookingModal
        booking={booking}
        onClose={() => setBooking((prev) => ({ ...prev, active: false }))}
        onCancelBooking={handleCancelBooking}
      />

      {/* Business Model Canvas Inspector Modal */}
      <BMCInspectorModal
        isOpen={isBMCOpen}
        onClose={() => setIsBMCOpen(false)}
        onNavigateToFeature={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
