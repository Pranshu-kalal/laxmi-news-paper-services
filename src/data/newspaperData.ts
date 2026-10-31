export interface NewspaperItem {
  id: string;
  name: string;
  tagline: string;
  language: 'Gujarati' | 'English' | 'Hindi / Regional';
  category: 'Daily Morning' | 'Business & Finance' | 'City & Lifestyle';
  circulationEst: string;
  monthlyBasePrice: number;
  highlight: string;
  colorScheme: {
    accent: string;
    border: string;
    badge: string;
  };
}

export const BUSINESS_INFO = {
  name: 'Laxmi Newspaper Services',
  founder: 'Prakash Bhai Kalal',
  phone: '+91 9574371328',
  phoneRaw: '9574371328',
  whatsappUrl: 'https://wa.me/919574371328',
  deliveryTime: '6:00 AM',
  monthlySubscriptionPrice: 180,
  location: 'Naroda & Nikol, Ahmedabad, Gujarat',
  serviceAreas: [
    'Naroda',
    'Nikol',
  ],
  ownerQrImage: '/assets/aistudio/upi_qr_scanner.png',
  heritageDioramaImage: '/assets/aistudio/lllllll_31ad3fc5.jpeg',
};

// All papers set to exactly ₹180 as requested
export const INITIAL_NEWSPAPERS: NewspaperItem[] = [
  {
    id: 'divya-bhaskar',
    name: 'Divya Bhaskar',
    tagline: 'Gujarat’s Leading Daily - Morning Edition',
    language: 'Gujarati',
    category: 'Daily Morning',
    circulationEst: 'Top Choice in Naroda & Nikol',
    monthlyBasePrice: 180,
    highlight: 'Comprehensive state news, business & local area reporting',
    colorScheme: {
      accent: '#E65100',
      border: 'rgba(230, 81, 0, 0.4)',
      badge: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    },
  },
  {
    id: 'sandesh',
    name: 'Sandesh',
    tagline: 'Gujarat’s Heritage News Voice for Generations',
    language: 'Gujarati',
    category: 'Daily Morning',
    circulationEst: 'High Reader Trust',
    monthlyBasePrice: 180,
    highlight: 'Unbiased investigative journalism and Sunday magazine specials',
    colorScheme: {
      accent: '#C62828',
      border: 'rgba(198, 40, 40, 0.4)',
      badge: 'bg-red-500/10 text-red-400 border-red-500/20',
    },
  },
  {
    id: 'gujarat-patrika',
    name: 'Gujarat Patrika',
    tagline: 'Deep Regional Perspectives & Cultural Heritage',
    language: 'Gujarati',
    category: 'Daily Morning',
    circulationEst: 'Trusted Morning Staple',
    monthlyBasePrice: 180,
    highlight: 'In-depth regional insights, cultural updates & Gujarat focus',
    colorScheme: {
      accent: '#1565C0',
      border: 'rgba(21, 101, 192, 0.4)',
      badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    },
  },
  {
    id: 'navgujrat',
    name: 'Navgujrat',
    tagline: 'Navgujarat Samay - Contemporary, Fresh & Dynamic',
    language: 'Gujarati',
    category: 'Daily Morning',
    circulationEst: 'Neighborhood Favorite',
    monthlyBasePrice: 180,
    highlight: 'Modern format, youth-centric editorials and technology coverage',
    colorScheme: {
      accent: '#2E7D32',
      border: 'rgba(46, 125, 50, 0.4)',
      badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    },
  },
  {
    id: 'ahmedabad-mirror',
    name: 'Ahmedabad Mirror',
    tagline: 'Urban Beat, Culture, City Events & Local Living',
    language: 'English',
    category: 'City & Lifestyle',
    circulationEst: 'Metro Read',
    monthlyBasePrice: 180,
    highlight: 'Hyperlocal civic news, lifestyle, cinema, and city stories',
    colorScheme: {
      accent: '#D81B60',
      border: 'rgba(216, 27, 96, 0.4)',
      badge: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
    },
  },
  {
    id: 'times-of-india',
    name: 'Times of India',
    tagline: 'India’s #1 English National Daily Morning Broadside',
    language: 'English',
    category: 'Daily Morning',
    circulationEst: 'National Flagship',
    monthlyBasePrice: 180,
    highlight: 'Global & national affairs, Times City, Sports & Editorial page',
    colorScheme: {
      accent: '#C5221F',
      border: 'rgba(197, 34, 31, 0.4)',
      badge: 'bg-red-500/10 text-red-400 border-red-500/20',
    },
  },
  {
    id: 'economic',
    name: 'Economic',
    tagline: 'The Economic Times - India’s Premier Business Paper',
    language: 'English',
    category: 'Business & Finance',
    circulationEst: 'Leaders Choice',
    monthlyBasePrice: 180,
    highlight: 'Stock markets, corporate updates, startup ecosystem & economy',
    colorScheme: {
      accent: '#D4AF37',
      border: 'rgba(212, 175, 55, 0.4)',
      badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    },
  },
];

// 1000 Templates = ₹300 only
export const TEMPLATE_DISTRIBUTION_CONFIG = {
  baseUnit: 1000,
  basePrice: 300,
  ratePerTemplate: 0.3,
};

export const WHY_CHOOSE_ITEMS = [
  {
    number: '01',
    title: 'On-Time Morning Delivery',
    desc: 'Unmatched morning reliability in Naroda & Nikol. Your paper reaches your porch before your morning chai is poured.',
  },
  {
    number: '02',
    title: 'Guaranteed at 6:00 AM',
    desc: 'Rain or shine, summer or winter, 365 days a year—our delivery team reaches your door by 6:00 AM.',
  },
  {
    number: '03',
    title: 'Flat ₹180 Monthly Subscription',
    desc: 'Transparent ₹180 per month for any newspaper. Zero hidden charges, easy renewals, and holiday pause.',
  },
  {
    number: '04',
    title: 'All Top 7 Newspaper Choices',
    desc: 'Divya Bhaskar, Sandesh, Gujarat Patrika, Navgujrat, Ahmedabad Mirror, Times of India, and Economic—all at ₹180.',
  },
  {
    number: '05',
    title: 'Template Distribution: 1000 = ₹300',
    desc: 'Promote your shop, clinic, or business across Naroda & Nikol. 1000 pamphlets inserted directly for only ₹300.',
  },
  {
    number: '06',
    title: 'Focused on Naroda & Nikol',
    desc: 'Dedicated local delivery routes ensuring 100% reliable coverage across all societies and colonies in Naroda & Nikol.',
  },
  {
    number: '07',
    title: 'Direct Customer Support',
    desc: 'Direct line to founder Prakash Bhai Kalal. Call or WhatsApp anytime for instant route assistance.',
  },
];
