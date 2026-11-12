export type RideOperator = 'grab' | 'gojek' | 'tada' | 'ryde' | 'zig';

export type CustomerPersona = 'young_professional' | 'tourist' | 'corporate';

export interface LocationItem {
  id: string;
  name: string;
  area: string;
  address: string;
  lat: number;
  lng: number;
  category: 'popular' | 'work' | 'tourist' | 'airport' | 'residential';
}

export interface RideOption {
  id: string;
  operator: RideOperator;
  serviceName: string;
  vehicleType: '4-seater' | '6-seater' | 'premium' | 'taxi';
  fare: number;
  originalFare: number;
  etaMinutes: number;
  travelTimeMinutes: number;
  distanceKm: number;
  surgeMultiplier: number;
  surgeReason?: string;
  driverRating: number;
  petFriendly: boolean;
  wheelchairFriendly: boolean;
  operatorCommissionRate: number; // e.g. 0.05 for 5% affiliate commission
  perkDescription?: string;
  operatorLogoBg: string;
}

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  category: 'economy' | 'tech' | 'food' | 'travel' | 'local';
  readTimeMinutes: number;
  publishedAgo: string;
  summary: string;
  fullContent: string;
  url?: string;
}

export interface TrafficCondition {
  id: string;
  expressway: string;
  section: string;
  direction: string;
  status: 'smooth' | 'moderate' | 'congested' | 'accident';
  speedKmh: number;
  erpRateSgd: number;
  erpGantry: string;
  insiderTip: string;
}

export interface PeakSurgeSlot {
  timeLabel: string;
  hour: number;
  expectedSurge: number;
  status: 'low' | 'moderate' | 'peak';
  fareEstimateSgd: number;
  recommendation: string;
}

export interface TouristRoute {
  id: string;
  name: string;
  tagline: string;
  stops: string[];
  estTotalDistance: string;
  estCabFare: string;
  recommendedTime: string;
  insiderAdvice: string;
  image: string;
}

export interface ESIMPackage {
  id: string;
  provider: string;
  name: string;
  dataAllowance: string;
  validityDays: number;
  priceSgd: number;
  originalPriceSgd: number;
  network: string;
  commissionToRoadRunner: number;
  features: string[];
  popular?: boolean;
}

export interface BookingState {
  active: boolean;
  rideOption: RideOption | null;
  pickup: LocationItem;
  dropoff: LocationItem;
  driverName?: string;
  carModel?: string;
  carPlate?: string;
  rating?: number;
  tripStatus: 'searching' | 'driver_assigned' | 'arriving' | 'in_trip' | 'completed';
  progress: number;
  etaCountDown: number;
  voucherDiscountApplied: number;
  finalFare: number;
  corporateBillingCode?: string;
}

export interface BMCBlock {
  id: string;
  title: string;
  subtitle: string;
  color: string;
  badgeBg: string;
  notes: {
    text: string;
    description: string;
    appFeatureTarget: string; // anchor or tab key
  }[];
}
