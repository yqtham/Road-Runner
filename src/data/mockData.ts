import { LocationItem, RideOption, RideOperator, NewsItem, TrafficCondition, PeakSurgeSlot, TouristRoute, ESIMPackage, BMCBlock } from '../types';

export const SINGAPORE_LOCATIONS: LocationItem[] = [
  {
    id: 'changi_t3',
    name: 'Singapore Changi Airport (Terminal 3)',
    area: 'Changi',
    address: '65 Airport Boulevard, Singapore 819663',
    lat: 1.3556,
    lng: 103.9872,
    category: 'airport',
  },
  {
    id: 'jewel_changi',
    name: 'Jewel Changi Airport (Rain Vortex)',
    area: 'Changi',
    address: '78 Airport Boulevard, Singapore 819666',
    lat: 1.3602,
    lng: 103.9897,
    category: 'tourist',
  },
  {
    id: 'mbs',
    name: 'Marina Bay Sands (Hotel Tower 1 Dropoff)',
    area: 'Downtown Core / Bayfront',
    address: '10 Bayfront Avenue, Singapore 018956',
    lat: 1.2838,
    lng: 103.8591,
    category: 'tourist',
  },
  {
    id: 'gardens_bay',
    name: 'Gardens by the Bay (Supertree Grove)',
    area: 'Marina South',
    address: '18 Marina Gardens Dr, Singapore 018953',
    lat: 1.2816,
    lng: 103.8636,
    category: 'tourist',
  },
  {
    id: 'raffles_place',
    name: 'Raffles Place (One Raffles Quay)',
    area: 'Central Business District (CBD)',
    address: '1 Raffles Quay, Singapore 048583',
    lat: 1.2825,
    lng: 103.8521,
    category: 'work',
  },
  {
    id: 'one_north',
    name: 'One-North (Fusionopolis)',
    area: 'Buona Vista / Queenstown',
    address: '1 Fusionopolis Way, Singapore 138632',
    lat: 1.2994,
    lng: 103.7876,
    category: 'work',
  },
  {
    id: 'ion_orchard',
    name: 'ION Orchard (Taxi Stand)',
    area: 'Orchard Road',
    address: '2 Orchard Turn, Singapore 238801',
    lat: 1.3040,
    lng: 103.8318,
    category: 'popular',
  },
  {
    id: 'sentosa_rws',
    name: 'Resorts World Sentosa',
    area: 'Sentosa Island',
    address: '8 Sentosa Gateway, Singapore 098269',
    lat: 1.2562,
    lng: 103.8208,
    category: 'tourist',
  },
  {
    id: 'chinatown',
    name: 'Chinatown Heritage Centre / Maxwell',
    area: 'Outram',
    address: '1 Maxwell Rd, Singapore 069118',
    lat: 1.2804,
    lng: 103.8448,
    category: 'tourist',
  },
  {
    id: 'bugis_junction',
    name: 'Bugis Junction & Arab Street',
    area: 'Kampong Gelam',
    address: '200 Victoria St, Singapore 188021',
    lat: 1.3005,
    lng: 103.8554,
    category: 'popular',
  },
  {
    id: 'jurong_east',
    name: 'Jurong East MRT & Westgate',
    area: 'Jurong Gateway',
    address: '3 Gateway Dr, Singapore 608532',
    lat: 1.3340,
    lng: 103.7436,
    category: 'work',
  },
  {
    id: 'tampines_hub',
    name: 'Our Tampines Hub',
    area: 'Tampines Regional Centre',
    address: '1 Tampines Walk, Singapore 528523',
    lat: 1.3533,
    lng: 103.9405,
    category: 'residential',
  },
];

// Calculate approximate straight-line distance in km between two coords
export function calculateDistanceKm(from: LocationItem, to: LocationItem): number {
  const dLat = (to.lat - from.lat) * 111;
  const dLng = (to.lng - from.lng) * 111 * Math.cos((from.lat * Math.PI) / 180);
  const direct = Math.sqrt(dLat * dLat + dLng * dLng);
  // Road network factor in Singapore is ~1.28
  return Math.max(1.8, Math.round(direct * 1.28 * 10) / 10);
}

// Generate real-time comparative prices across all 5 operators
export function generateComparativeRides(
  pickup: LocationItem,
  dropoff: LocationItem,
  passengerType: '4-seater' | '6-seater' | 'premium',
  preferences: { petFriendly?: boolean; wheelchairFriendly?: boolean; highRatingOnly?: boolean }
): RideOption[] {
  const dist = calculateDistanceKm(pickup, dropoff);
  const baseTravelMinutes = Math.max(8, Math.round(dist * 2.2 + 5));

  // Operator characteristics based on Singapore ride-hailing landscape
  const operatorProfiles: {
    operator: RideOperator;
    serviceName: string;
    baseFare: number;
    perKm: number;
    surgeMult: number;
    etaMinutes: number;
    driverRating: number;
    petFriendly: boolean;
    wheelchairFriendly: boolean;
    commissionRate: number;
    perk: string;
    bg: string;
  }[] = [
    {
      operator: 'grab',
      serviceName: passengerType === '6-seater' ? 'GrabCar 6' : passengerType === 'premium' ? 'GrabCar Exec' : preferences.petFriendly ? 'GrabPet' : 'JustGrab',
      baseFare: 4.8,
      perKm: 0.85,
      surgeMult: 1.25, // Grab frequently has dynamic surge
      etaMinutes: 3, // Highest fleet density in SG
      driverRating: 4.88,
      petFriendly: true,
      wheelchairFriendly: true,
      commissionRate: 0.05,
      perk: 'Fastest dispatch in Singapore · GrabRewards points',
      bg: '#00B14F', // Grab green
    },
    {
      operator: 'gojek',
      serviceName: passengerType === '6-seater' ? 'GoCar XL' : passengerType === 'premium' ? 'GoCar Premium' : 'GoCar',
      baseFare: 4.4,
      perKm: 0.78,
      surgeMult: 1.15,
      etaMinutes: 5,
      driverRating: 4.82,
      petFriendly: false,
      wheelchairFriendly: false,
      commissionRate: 0.045,
      perk: 'Off-peak coupon stacking eligible · Flash discounts',
      bg: '#00AA13', // Gojek green
    },
    {
      operator: 'tada',
      serviceName: passengerType === '6-seater' ? 'Tada XL' : 'Tada Standard',
      baseFare: 4.2,
      perKm: 0.74,
      surgeMult: 1.0, // Tada has zero driver platform commission, very stable low surges!
      etaMinutes: 6,
      driverRating: 4.91,
      petFriendly: preferences.petFriendly ? true : false,
      wheelchairFriendly: false,
      commissionRate: 0.04,
      perk: 'Zero-commission driver network · No hidden surge spikes',
      bg: '#FF6400', // Tada orange
    },
    {
      operator: 'ryde',
      serviceName: passengerType === '6-seater' ? 'RydeXL' : preferences.petFriendly ? 'RydePet' : 'RydeX',
      baseFare: 4.5,
      perKm: 0.75,
      surgeMult: 1.1,
      etaMinutes: 7,
      driverRating: 4.85,
      petFriendly: true,
      wheelchairFriendly: false,
      commissionRate: 0.05,
      perk: 'Ryde Coins cashback · Community rating standard',
      bg: '#DC2626', // Ryde red
    },
    {
      operator: 'zig',
      serviceName: passengerType === '6-seater' ? 'CDG Zig 6-Seater Taxi' : preferences.wheelchairFriendly ? 'CDG Zig Assist' : 'CDG Zig Taxi (Metered/Fixed)',
      baseFare: 4.6,
      perKm: 0.8,
      surgeMult: 1.05,
      etaMinutes: 4,
      driverRating: 4.89,
      petFriendly: false,
      wheelchairFriendly: true,
      commissionRate: 0.045,
      perk: 'ComfortDelGro trusted veteran fleet · Bus lane priority during peaks',
      bg: '#1D4ED8', // CDG Zig blue
    },
  ];

  const results: RideOption[] = operatorProfiles
    .map((op, idx) => {
      let seatMultiplier = passengerType === '6-seater' ? 1.45 : passengerType === 'premium' ? 1.8 : 1.0;
      if (preferences.petFriendly && op.petFriendly) seatMultiplier *= 1.12;

      // Base calculation in Singapore Dollars (SGD)
      const rawFare = (op.baseFare + dist * op.perKm) * op.surgeMult * seatMultiplier;
      const roundedFare = Math.round(rawFare * 10) / 10;
      const originalFare = Math.round(roundedFare * (op.surgeMult > 1.05 ? op.surgeMult : 1.1) * 10) / 10;

      return {
        id: `ride_${op.operator}_${idx}`,
        operator: op.operator,
        serviceName: op.serviceName,
        vehicleType: (passengerType === '6-seater' ? '6-seater' : passengerType === 'premium' ? 'premium' : '4-seater') as RideOption['vehicleType'],
        fare: roundedFare,
        originalFare: Math.max(roundedFare, originalFare),
        etaMinutes: op.etaMinutes,
        travelTimeMinutes: baseTravelMinutes + (op.etaMinutes > 5 ? 2 : 0),
        distanceKm: dist,
        surgeMultiplier: op.surgeMult,
        surgeReason: op.surgeMult > 1.1 ? 'High demand in this zone' : undefined,
        driverRating: op.driverRating,
        petFriendly: op.petFriendly,
        wheelchairFriendly: op.wheelchairFriendly,
        operatorCommissionRate: op.commissionRate,
        perkDescription: op.perk,
        operatorLogoBg: op.bg,
      };
    })
    .filter((ride) => {
      if (preferences.petFriendly && !ride.petFriendly) return false;
      if (preferences.wheelchairFriendly && !ride.wheelchairFriendly) return false;
      if (preferences.highRatingOnly && ride.driverRating < 4.85) return false;
      return true;
    });

  return results.sort((a, b) => a.fare - b.fare);
}

// Singapore expressway live traffic condition and ERP rates
export const SINGAPORE_TRAFFIC_CONDITIONS: TrafficCondition[] = [
  {
    id: 'cte_south',
    expressway: 'CTE (Central Expressway)',
    section: 'Braddell Flyover to Moulmein Exit',
    direction: 'Southbound (towards CBD)',
    status: 'congested',
    speedKmh: 28,
    erpRateSgd: 3.0,
    erpGantry: 'CTE Gantries 1 & 2',
    insiderTip: 'Heavy morning rush toward CBD. Advise PIE/Lornie Highway or wait 12 mins for ERP rate drop to S$2.00.',
  },
  {
    id: 'pie_east',
    expressway: 'PIE (Pan Island Expressway)',
    section: 'Kallang Way to Paya Lebar',
    direction: 'Eastbound (towards Changi Airport)',
    status: 'smooth',
    speedKmh: 78,
    erpRateSgd: 0.0,
    erpGantry: 'Off-peak rate',
    insiderTip: 'Excellent flow to Airport. Fastest airport corridor right now without surcharges.',
  },
  {
    id: 'aye_west',
    expressway: 'AYE (Ayer Rajah Expressway)',
    section: 'Clementi Ave 6 to Jurong Town Hall',
    direction: 'Westbound',
    status: 'moderate',
    speedKmh: 54,
    erpRateSgd: 1.5,
    erpGantry: 'AYE Near Alexandra',
    insiderTip: 'Moderate movement near Science Park. Drivers using Tada report minimal wait time.',
  },
  {
    id: 'ecp_city',
    expressway: 'ECP (East Coast Parkway)',
    section: 'Fort Road to Sheares Bridge',
    direction: 'Westbound (towards Marina Bay)',
    status: 'smooth',
    speedKmh: 82,
    erpRateSgd: 1.0,
    erpGantry: 'ECP Ophir Gantry',
    insiderTip: 'Scenic route into Marina Bay Sands. Very smooth traveling speed.',
  },
  {
    id: 'kpe_south',
    expressway: 'KPE (Kallang-Paya Lebar Tunnel)',
    section: 'Airport Road into Marina Coastal',
    direction: 'Southbound',
    status: 'smooth',
    speedKmh: 75,
    erpRateSgd: 2.0,
    erpGantry: 'KPE Tunnel Slip Road',
    insiderTip: 'Underground tunnel clear. CDG Zig taxis frequently use KPE for fast CBD link.',
  },
];

// 12-hour surge forecast for Singapore peak hour avoidance
export const PEAK_SURGE_HOURS: PeakSurgeSlot[] = [
  { timeLabel: '07:30 AM', hour: 7.5, expectedSurge: 1.15, status: 'moderate', fareEstimateSgd: 22.5, recommendation: 'Early commuters start booking; fares reasonable.' },
  { timeLabel: '08:15 AM', hour: 8.25, expectedSurge: 1.45, status: 'peak', fareEstimateSgd: 29.8, recommendation: 'Severe peak rush. High surge across Grab & Gojek.' },
  { timeLabel: '09:00 AM', hour: 9.0, expectedSurge: 1.3, status: 'peak', fareEstimateSgd: 26.0, recommendation: 'Peak tapering off. Tada offers stable pricing.' },
  { timeLabel: '09:45 AM', hour: 9.75, expectedSurge: 1.0, status: 'low', fareEstimateSgd: 19.5, recommendation: 'Optimal departure window! Save up to S$10.30.' },
  { timeLabel: '12:30 PM', hour: 12.5, expectedSurge: 1.1, status: 'low', fareEstimateSgd: 20.0, recommendation: 'Lunch crowd around CBD & Tanjong Pagar.' },
  { timeLabel: '05:45 PM', hour: 17.75, expectedSurge: 1.25, status: 'moderate', fareEstimateSgd: 24.5, recommendation: 'Evening departures commencing. Book before 6:00 PM.' },
  { timeLabel: '06:30 PM', hour: 18.5, expectedSurge: 1.5, status: 'peak', fareEstimateSgd: 31.0, recommendation: 'City-wide evening peak. Grab & CDG Zig have highest availability.' },
  { timeLabel: '07:30 PM', hour: 19.5, expectedSurge: 1.2, status: 'moderate', fareEstimateSgd: 23.0, recommendation: 'Surge subsiding across residential routes.' },
  { timeLabel: '09:00 PM', hour: 21.0, expectedSurge: 1.0, status: 'low', fareEstimateSgd: 18.5, recommendation: 'Smooth roads, zero surge.' },
];

// Curated Singapore In-Ride News Feed ("Road Runner Digest")
export const IN_RIDE_NEWS: NewsItem[] = [
  {
    id: 'news_1',
    title: 'Monetary Authority of Singapore (MAS) Holds Steady on Monetary Policy Band as GDP Growth Firms',
    source: 'The Straits Times & Business Times',
    category: 'economy',
    readTimeMinutes: 3,
    publishedAgo: '18 mins ago',
    summary: 'MAS announced its prevailing rate of appreciation will be maintained, supporting price stability amid resilient regional trade and strong local employment.',
    fullContent: 'Singapore’s central bank maintained its monetary policy settings today, matching consensus expectations. Core inflation showed signs of softening while the economic momentum in biomedical manufacturing and logistics remains on track. Economists noted that consumer spending in urban transport and lifestyle services continues to expand sustainably across Southeast Asian markets.',
  },
  {
    id: 'news_2',
    title: 'Singapore Tech Ecosystem Secures US$3.8B in Q3 Clean Mobility and AI Infrastructure Deals',
    source: 'Tech in Asia Singapore',
    category: 'tech',
    readTimeMinutes: 4,
    publishedAgo: '42 mins ago',
    summary: 'Smart routing algorithms, urban fleet aggregation, and electric charging networks lead venture investments as Singapore accelerates its Smart Nation 2.0 vision.',
    fullContent: 'Venture inflows into Singapore-headquartered mobility and data platforms recorded substantial quarterly acceleration. Startups focused on multi-modal transit comparison, low-emission dispatching, and dynamic route intelligence received notable institutional support. The Economic Development Board (EDB) emphasized public-private integration as a critical anchor for regional expansion.',
  },
  {
    id: 'news_3',
    title: 'Michelin Guide Singapore Adds 6 New Hawker Stalls to Bib Gourmand in Maxwell & Chinatown',
    source: 'CNA Lifestyle',
    category: 'food',
    readTimeMinutes: 2,
    publishedAgo: '1 hour ago',
    summary: 'Beloved traditional stalls serving claypot rice, laksa, and heritage bak chor mee recognized for culinary excellence under S$15 per meal.',
    fullContent: 'Inspectors highlighted the tireless craftsmanship of second-generation hawkers across Maxwell Food Centre and Amoy Street. The announcement is expected to bring heightened lunchtime cab traffic to Outram and Tanjong Pagar. Commuters traveling towards Chinatown can expect quick pick-up slots via Tada and CDG Zig along South Bridge Road.',
  },
  {
    id: 'news_4',
    title: 'Changi Airport Terminal 5 Groundworks Advance: Next-Gen Autonomous Transit Pods Unveiled',
    source: 'Lianhe Zaobao & Aviation Week',
    category: 'travel',
    readTimeMinutes: 3,
    publishedAgo: '2 hours ago',
    summary: 'The upcoming mega-terminal will connect directly with contactless baggage logistics and on-demand rapid ride-hailing staging bays.',
    fullContent: 'Singapore Changi Airport continues to set global benchmarks with its T5 expansion. Designed to handle up to 50 million passengers annually, the facility integrates zero-emission EV staging areas, unified app-based taxi bays, and automated digital baggage concourses. Changi group confirmed dedicated pick-up zones for verified multi-operator aggregators like Road Runner.',
  },
  {
    id: 'news_5',
    title: 'Hidden Gem Cycling & Walking Trails: The 24km Rail Corridor from Kranji to Tanjong Pagar',
    source: 'SG Urban Explorers',
    category: 'local',
    readTimeMinutes: 3,
    publishedAgo: '3 hours ago',
    summary: 'A complete scenic guide to traversing the preserved railway heritage corridor with top coffee pit-stops at Bukit Timah Railway Station.',
    fullContent: 'The restored Singapore Rail Corridor offers an unbroken green artery running north to south. Visitors and residents can step out of modern urban bustle into dense rainforest canopy and historic iron truss bridges. The trail is fully wheelchair and stroller accessible, with convenient ride-hailing drop-offs at King Albert Park and Rail Mall.',
  },
];

// Tourist Curated Itineraries in Singapore
export const TOURIST_ROUTES: TouristRoute[] = [
  {
    id: 'mbs_gardens',
    name: 'Iconic Marina Bay & Supertree Wonder',
    tagline: 'Futuristic architectural wonders, Cloud Forest & light shows',
    stops: ['Marina Bay Sands SkyPark', 'Gardens by the Bay Supertrees', 'Helix Bridge', 'Merlion Park'],
    estTotalDistance: '6.4 km total',
    estCabFare: 'S$14 - S$18',
    recommendedTime: '4:30 PM – 8:30 PM (Catch Sunset & Garden Rhapsody)',
    insiderAdvice: 'Avoid walking between MBS and Gardens under the afternoon sun; take a quick S$6 ride or use the underground link. Flag rides from MBS Tower 3 taxi stand for shortest driver queues.',
    image: '/src/assets/images/tourist_singapore_landmark_1794491583634.jpg',
  },
  {
    id: 'heritage_trail',
    name: 'Heritage & Hawker Gastronomy Trail',
    tagline: 'From Chinatown tea houses to Little India spices and Kampong Gelam cafes',
    stops: ['Chinatown Maxwell Food Centre', 'Buddha Tooth Relic Temple', 'Little India Sri Veeramakaliamman', 'Haji Lane & Sultan Mosque'],
    estTotalDistance: '8.2 km total',
    estCabFare: 'S$16 - S$21',
    recommendedTime: '10:00 AM – 3:00 PM',
    insiderAdvice: 'Save time between precincts using Tada or Ryde for quick 8-minute hops instead of multiple MRT train interchanges in the heat.',
    image: '/src/assets/images/hero_singapore_skyline_1794491584402.jpg',
  },
  {
    id: 'sentosa_island',
    name: 'Sentosa Island Play & Beach Escape',
    tagline: 'Universal Studios, S.E.A. Aquarium, and Siloso beach sunset clubs',
    stops: ['Resorts World Sentosa', 'Universal Studios Singapore', 'Tanjong Beach Club'],
    estTotalDistance: '14.5 km from City',
    estCabFare: 'S$18 - S$26',
    recommendedTime: '11:00 AM – 7:00 PM',
    insiderAdvice: 'Taking a ride-hailing car onto Sentosa bypasses the S$6 monorail queues and hotel guests enter the island gantry without admission surcharge when showing a hotel booking.',
    image: '/src/assets/images/tourist_singapore_landmark_1794491583634.jpg',
  },
];

// Partner eSIM Packages (From Revenue Stream in BMC: "Partner with third party providers such as esim")
export const ESIM_PACKAGES: ESIMPackage[] = [
  {
    id: 'esim_sg_10gb',
    provider: 'Airalo SG Connect',
    name: 'Singapore Explorer 10GB',
    dataAllowance: '10 GB High-Speed 5G',
    validityDays: 15,
    priceSgd: 14.5,
    originalPriceSgd: 19.0,
    network: 'Singtel 5G / StarHub',
    commissionToRoadRunner: 2.9, // 20% commission
    features: ['Instant QR Code Activation', 'Full 5G Speeds', 'Hotspot / Tethering Enabled', 'No ID upload required'],
    popular: true,
  },
  {
    id: 'esim_sg_unlimited',
    provider: 'Singtel Tourist 5G',
    name: 'Singapore Unlimited Max',
    dataAllowance: 'Unlimited 5G Data (100GB FUP)',
    validityDays: 28,
    priceSgd: 28.0,
    originalPriceSgd: 35.0,
    network: 'Singtel #1 Coverage',
    commissionToRoadRunner: 5.6, // 20% commission
    features: ['500 mins Local Outgoing Calls', '100 Local SMS', 'Compliant with Tourist Entry', 'Priority customer care'],
  },
  {
    id: 'esim_sg_light',
    provider: 'ChangiMobile Flex',
    name: 'Transit QuickPass 3GB',
    dataAllowance: '3 GB 4G/5G Data',
    validityDays: 7,
    priceSgd: 7.5,
    originalPriceSgd: 10.0,
    network: 'M1 Network',
    commissionToRoadRunner: 1.5,
    features: ['Ideal for 2-3 day business trips', 'Instant activation in Changi Airport', 'WhatsApp & Maps optimized'],
  },
];

// Complete structured representation of the User's uploaded Business Model Canvas
export const ROAD_RUNNER_BMC_BLOCKS: BMCBlock[] = [
  {
    id: 'key_partners',
    title: 'Key Partners',
    subtitle: 'Who gives us competitive advantage?',
    color: 'border-blue-500 text-blue-800 bg-blue-50 dark:bg-blue-950/40 dark:text-blue-200',
    badgeBg: 'bg-blue-100 text-blue-900 dark:bg-blue-900/60 dark:text-blue-100',
    notes: [
      {
        text: 'Zig, Grab, Gojek, Tada, Ryde',
        description: 'Direct API integrations with Singapore’s top 5 licensed ride-hailing and taxi operators to aggregate live vehicle supply.',
        appFeatureTarget: 'ride_search',
      },
      {
        text: 'News website or online magazines',
        description: 'Publishing partners feeding verified local business, economic, and lifestyle articles into the Road Runner In-Ride Digest.',
        appFeatureTarget: 'news_feed',
      },
    ],
  },
  {
    id: 'key_activities',
    title: 'Key Activities',
    subtitle: 'What are the key steps to move ahead?',
    color: 'border-sky-500 text-sky-800 bg-sky-50 dark:bg-sky-950/40 dark:text-sky-200',
    badgeBg: 'bg-sky-100 text-sky-900 dark:bg-sky-900/60 dark:text-sky-100',
    notes: [
      {
        text: 'APIs from Key Partners to pull latest pricing and nearest available driver',
        description: 'Real-time pricing matrix engine querying dynamic surge rates, vehicle proximity, and arrival estimates every 5 seconds.',
        appFeatureTarget: 'ride_search',
      },
      {
        text: 'APIs from Key Partners to pull latest news on economy, local news, hobbies, travels, etc',
        description: 'Algorithmic content curation classifying news snippets by commute duration and passenger preferences.',
        appFeatureTarget: 'news_feed',
      },
    ],
  },
  {
    id: 'key_resources',
    title: 'Key Resources',
    subtitle: 'What resources do you need?',
    color: 'border-cyan-500 text-cyan-800 bg-cyan-50 dark:bg-cyan-950/40 dark:text-cyan-200',
    badgeBg: 'bg-cyan-100 text-cyan-900 dark:bg-cyan-900/60 dark:text-cyan-100',
    notes: [
      {
        text: 'Digital anchor platform with connect APIs to all available ride hailing applications',
        description: 'The core meta-search infrastructure handling deep-linking, multi-fleet dispatching, and pricing parity verification.',
        appFeatureTarget: 'ride_search',
      },
      {
        text: 'Digital anchor platform with connect APIs to all news feed',
        description: 'In-app media rendering engine with text-to-speech listening capabilities, categorized for quick in-vehicle consumption.',
        appFeatureTarget: 'news_feed',
      },
    ],
  },
  {
    id: 'key_propositions',
    title: 'Key Propositions',
    subtitle: 'How will you make customers’ lives happier?',
    color: 'border-amber-500 text-amber-800 bg-amber-50 dark:bg-amber-950/40 dark:text-amber-200',
    badgeBg: 'bg-amber-100 text-amber-900 dark:bg-amber-900/60 dark:text-amber-100',
    notes: [
      {
        text: 'Cheapest and fastest ride available',
        description: 'Instantly identifies the lowest fare and the quickest driver arrival across Grab, Gojek, Tada, Ryde, and Zig.',
        appFeatureTarget: 'ride_search',
      },
      {
        text: 'Personalisation of rides. Choose highly rated drivers, pet friendly, or wheelchair friendly',
        description: 'Filters operators based on specific passenger accessibility and lifestyle criteria.',
        appFeatureTarget: 'ride_search',
      },
      {
        text: 'Personalise news feed push to customer',
        description: 'In-transit curated briefing matched to commute length and topic preferences.',
        appFeatureTarget: 'news_feed',
      },
      {
        text: 'Aim to reduce cost and waiting time during peak hours',
        description: 'Smart departure window predictor warning users of impending surge and recommending departure shifts to save up to S$12.',
        appFeatureTarget: 'peak_radar',
      },
      {
        text: 'Personalise routes for tourist visiting Singapore',
        description: 'Curated sightseeing itineraries with pre-calculated cab fares and landmark dropoff tips.',
        appFeatureTarget: 'tourist_hub',
      },
      {
        text: 'Insider tips on traffic conditions and prompt on suggested travel time',
        description: 'Live expressway conditions (CTE, PIE, AYE) paired with ERP gantry avoidance advice.',
        appFeatureTarget: 'peak_radar',
      },
    ],
  },
  {
    id: 'customer_relationships',
    title: 'Customer Relationships',
    subtitle: 'How often do you interact with customers?',
    color: 'border-orange-500 text-orange-800 bg-orange-50 dark:bg-orange-950/40 dark:text-orange-200',
    badgeBg: 'bg-orange-100 text-orange-900 dark:bg-orange-900/60 dark:text-orange-100',
    notes: [
      {
        text: 'Daily based on daily commutes and travels',
        description: 'Serving as the daily morning and evening commute command center for urban professionals.',
        appFeatureTarget: 'ride_search',
      },
      {
        text: 'Daily based on push notifications',
        description: 'Timely reminders: "CTE is clear", "Surge dropping near Raffles Place in 5 mins", "Rain forecast at 6 PM".',
        appFeatureTarget: 'peak_radar',
      },
      {
        text: 'Daily personalise news feed based on their preference',
        description: 'Continuous refinement of content recommendations as riders complete their commutes.',
        appFeatureTarget: 'news_feed',
      },
    ],
  },
  {
    id: 'channels',
    title: 'Channels',
    subtitle: 'How are you going to reach your customers?',
    color: 'border-emerald-500 text-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-200',
    badgeBg: 'bg-emerald-100 text-emerald-900 dark:bg-emerald-900/60 dark:text-emerald-100',
    notes: [
      {
        text: 'Social media, traditional advertisement, mobile application',
        description: 'Modern progressive web app and native mobile app supported by viral price comparison showcases on social channels.',
        appFeatureTarget: 'ride_search',
      },
      {
        text: 'Advertisement space at airport and central business districts',
        description: 'Physical QR banners at Changi Airport baggage halls and CBD office lobbies targeting arriving travelers and workers.',
        appFeatureTarget: 'tourist_hub',
      },
      {
        text: 'Sales team to reach out to corporates',
        description: 'Enterprise outreach offering corporate portals, employee mobility allowances, and automated tax expense reports.',
        appFeatureTarget: 'corporate_portal',
      },
    ],
  },
  {
    id: 'customer_segments',
    title: 'Customer Segments',
    subtitle: 'Who are your customers?',
    color: 'border-rose-500 text-rose-800 bg-rose-50 dark:bg-rose-950/40 dark:text-rose-200',
    badgeBg: 'bg-rose-100 text-rose-900 dark:bg-rose-900/60 dark:text-rose-100',
    notes: [
      {
        text: 'Young working adults who values time',
        description: 'Time-sensitive professionals who hate waiting 15 minutes or toggling 4 separate apps to escape peak surcharges.',
        appFeatureTarget: 'ride_search',
      },
      {
        text: 'Tourists',
        description: 'Visitors seeking straightforward transportation without having to figure out local apps, plus tourist eSIM connectivity.',
        appFeatureTarget: 'tourist_hub',
      },
      {
        text: 'Corporates who give it as employee benefit',
        description: 'Companies wanting transparent consolidated transport expensing and discounted employee ride allowances.',
        appFeatureTarget: 'corporate_portal',
      },
    ],
  },
  {
    id: 'cost_structure',
    title: 'Cost Structure',
    subtitle: 'How much are you planning to spend?',
    color: 'border-emerald-600 text-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-200',
    badgeBg: 'bg-emerald-100 text-emerald-900 dark:bg-emerald-900/60 dark:text-emerald-100',
    notes: [
      {
        text: 'Minimal cost as we will not own vehicle fleets and drivers',
        description: 'Asset-light digital meta-search aggregator model. Zero depreciation, zero fuel, zero insurance liabilities.',
        appFeatureTarget: 'corporate_portal',
      },
      {
        text: 'Marketing period of a year for awareness',
        description: 'First-year focused marketing budget allocated to high-impact airport installations and CBD digital screens.',
        appFeatureTarget: 'tourist_hub',
      },
      {
        text: 'Discount vouchers to be given for first time users',
        description: 'Customer acquisition promo vouchers (e.g., S$5 off first ride with code FIRST5SG) to spur rapid adoption.',
        appFeatureTarget: 'ride_search',
      },
    ],
  },
  {
    id: 'revenue_streams',
    title: 'Revenue Streams',
    subtitle: 'How much are you planning to earn?',
    color: 'border-teal-600 text-teal-800 bg-teal-50 dark:bg-teal-950/40 dark:text-teal-200',
    badgeBg: 'bg-teal-100 text-teal-900 dark:bg-teal-900/60 dark:text-teal-100',
    notes: [
      {
        text: 'A small commission fee to be taken from chosen ride hailing operator',
        description: 'Earn 4% – 5% affiliate dispatch fee per completed ride referral from Grab, Gojek, Tada, Ryde, and Zig.',
        appFeatureTarget: 'ride_search',
      },
      {
        text: 'Advertising space from our digital anchor platform',
        description: 'High-value sponsor real estate displayed to high-intent commuters during rides and on the daily digest feed.',
        appFeatureTarget: 'news_feed',
      },
      {
        text: 'Partner with third party providers such as esim to be sold on our digital anchor platform, to be earn for every successful sign up',
        description: 'High-margin affiliate commission (20% per sale, ~S$2.90 to S$5.60/user) on tourist eSIM data packages.',
        appFeatureTarget: 'tourist_hub',
      },
    ],
  },
];
