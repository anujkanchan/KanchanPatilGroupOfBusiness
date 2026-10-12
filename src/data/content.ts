import heroDroneImg from '../assets/images/hero_drone_farm_1785129555098.jpg';
import galleryDroneImg from '../assets/images/regenerated_image_1791441858294.png';
import poultryImg from '../assets/images/gavran_poultry_1785129569706.jpg';
import nurseryImg from '../assets/images/kgroup_nursery_1785129580449.jpg';
import founderImg from '../assets/images/founder_anuj_1785129596095.jpg';
import galleryImg1 from '../assets/images/regenerated_image_1785386555124.jpg';
import galleryImg2 from '../assets/images/regenerated_image_1785157600316.jpg';
import galleryImg3 from '../assets/images/regenerated_image_1785390194723.jpg';
import eggsImg from '../assets/images/organic_gavran_eggs_1785387513206.jpg';
import eggBasketImg from '../assets/images/gavran_eggs_basket_1790570762396.jpg';
import eggHandsImg from '../assets/images/gavran_eggs_hands_1790570797337.jpg';
import eggBowlImg from '../assets/images/gavran_eggs_bowl_1790570810098.jpg';
import eggCollectionImg from '../assets/images/gavran_eggs_collection_1790570823569.jpg';
import hqImg from '../assets/images/kgroup_hq_entrance_1785388879413.jpg';
import lobbyImg from '../assets/images/kgroup_welcome_lobby_1785388893947.jpg';
import innovationImg from '../assets/images/kgroup_innovation_hub_1785388907634.jpg';
import surajJadhavImg from '../assets/images/suraj_jadhav_client_1785417940771.jpg';
import amarJadhavImg from '../assets/images/amar_jadhav_client_1785417954968.jpg';
import ganeshKanchanImg from '../assets/images/ganesh_kanchan_portrait_1785417972318.jpg';

import { Business, GalleryItem, Testimonial, TimelineEvent, StatItem, FeatureCard, FounderInfo } from '../types';

export const HERO_DATA = {
  welcome: "WELCOME TO",
  brand: "KANCHAN PATIL GROUP",
  tagline: "Growing Nature. Building Trust.",
  description: "A premier diversified corporate group pioneering sustainable agriculture, high-yield eco poultry farming, and lush nursery plant cultivation.",
  heroImage: heroDroneImg,
};

export const FOUNDER_DATA: FounderInfo = {
  name: "Anuj Ganesh Kanchan",
  title: "Founder",
  subtitles: [
    "Computer Science & Artificial Intelligence Engineer",
    "Entrepreneur",
    "Visionary Leader"
  ],
  quote: "Building businesses that grow with trust, innovation, and sustainability.",
  bio: "Anuj Ganesh Kanchan combines cutting-edge engineering precision with deep-rooted passion for sustainable agriculture and natural living. As a Computer Science & AI Engineer turned forward-thinking entrepreneur, he established Kanchan Patil Group to revolutionize traditional farming and nursery systems with modern technology, organic principles, and uncompromised quality standards.",
  image: founderImg,
  socials: {
    linkedin: "https://www.linkedin.com/in/anuj-ganesh-kanchan-167b4a290",
    instagram: "https://instagram.com/anuj_kanchan",
    facebook: "https://facebook.com/kgroupofficial",
    github: "https://github.com/anujkanchan",
    whatsapp: "https://wa.me/917517004343"
  }
};

export const BUSINESSES_DATA: Business[] = [
  {
    id: "gavran-poultry",
    name: "Gavran Poultry Farms",
    tagline: "Fresh Country Chicken & Healthy Farming",
    slug: "gavran-poultry-farms",
    image: poultryImg,
    description: "Gavran Poultry Farms is dedicated to raising 100% natural, free-range country birds in hygienic, stress-free environments. We blend traditional free-roaming poultry care with modern biometric health oversight to produce chemical-free, nutrient-rich country chicken and fresh eggs.",
    highlights: [
      "Fresh Country Chicken",
      "Healthy Free-Range Farming",
      "Natural Feed & Herbal Care",
      "Premium Uncompromised Quality",
      "Organic Farm Eggs & Chicks"
    ],
    features: [
      "100% Antibiotic & Hormone-Free Country Birds",
      "Spacious Open-Air Grazing Grounds",
      "Strict Bio-Security & Veterinary Oversight",
      "Fresh Daily Direct Supply to Wholesalers & Consumers",
      "100% Organic Grain & Pure Mineral Water Care Routine"
    ],
    services: [
      {
        title: "Free-Range Country Chicken",
        description: "Pure-bred Gavran poultry raised in lush green pastures for rich taste, superior texture, and maximum nutrition.",
        iconName: "Bird"
      },
      {
        title: "Organic Farm Eggs",
        description: "Naturally laid farm-fresh eggs harvested daily from free-roaming, grain-fed country hens.",
        iconName: "Egg"
      },
      {
        title: "Chicks & Poultry Supply",
        description: "High-grade day-old country chicks and vaccination-certified breeding pairs for regional farms.",
        iconName: "Feather"
      },
      {
        title: "Poultry Farming Advisory",
        description: "Expert guidance for farmers on sustainable housing, organic nutrition, and disease management.",
        iconName: "ShieldCheck"
      }
    ],
    benefits: [
      "Superior protein & low cholesterol country chicken",
      "Ethical, cruelty-free, and natural living conditions for birds",
      "Traceable farm-to-table hygiene and freshness",
      "Direct bulk supply at transparent fair pricing"
    ],
    gallery: [
      { url: poultryImg, caption: "Open-Air Grazing Grounds", category: "Poultry" }
    ]
  },
  {
    id: "kgroup-nursery",
    name: "K Group of Nursery",
    tagline: "Indoor, Outdoor, Flower Plants & Landscape Architecture",
    slug: "k-group-nursery",
    image: nurseryImg,
    description: "K Group of Nursery is a leading horticultural enterprise specializing in premium Net Pots, vibrant ornamental plants, professional landscaping solutions, and sustainable green innovations - growing excellence with every plant.",
    highlights: [
      "Exotic Indoor Air-Purifying Plants",
      "Vibrant Outdoor & Shade Trees",
      "Aromatic Flower Varieties",
      "Commercial Landscaping & Wholesale Supply",
      "Custom Rooftop & Green Wall Setup"
    ],
    features: [
      "Quality Successfully Delivered, Trust Successfully Earned.",
      "Delivering Excellence. Sharing Nature's Best.",
      "Premium 6-Inch Bicolour Tecoma – A Perfect Blend of Colour and Elegance.",
      "From Our Nursery to Your Project – 100,000+ Live Net Pot Plants Delivered.",
      "Safe Express Transport & On-Site Planting Setup"
    ],
    services: [
      {
        title: "Indoor & Tropical Plants",
        description: "Curating Premium Anthuriums, Petra Plants, Yellow & Bicolour Tecoma, and High-Quality Ornamental Plants for Luxury Landscapes, Corporate Environments, and Modern Green Spaces.",
        iconName: "Flower2"
      },
      {
        title: "Outdoor & Flowering Flora",
        description: "Hardy fruit trees, ornamental shrubs, and seasonal bloomers built to thrive in outdoor environments.",
        iconName: "Trees"
      },
      {
        title: "Landscape Architecture",
        description: "Full-service landscape conceptualization, hardscaping, lawn setup, and automated drip irrigation.",
        iconName: "Compass"
      },
      {
        title: "Wholesale Nursery Supply",
        description: "Bulk orders for commercial builders, resorts, government parks, and retail garden centers.",
        iconName: "Truck"
      }
    ],
    benefits: [
      "Healthy, deeply-rooted plants nurtured in climate-controlled nurseries",
      "Custom landscape design tailormade for luxury residences & offices",
      "Complete post-planting care guidance and organic plant nutrition",
      "Bulk delivery with white-glove transport and setup assistance"
    ],
    gallery: [
      { url: nurseryImg, caption: "Grand Climate - Controlled Black Shed net House", category: "Nursery" }
    ]
  }
];

export const FEATURES_DATA: FeatureCard[] = [
  {
    id: "quality",
    title: "Premium Quality",
    description: "Every bird, egg, plant, and tree undergoes rigorous quality audits to ensure gold-standard excellence.",
    icon: "Award"
  },
  {
    id: "farming",
    title: "Natural Farming",
    description: "100% chemical-free cultivation, organic feeds, and natural ecosystems prioritizing planetary health.",
    icon: "Sprout"
  },
  {
    id: "satisfaction",
    title: "Customer Satisfaction",
    description: "Deep-rooted commitment to transparency, reliable supply, and white-glove client support.",
    icon: "HeartHandshake"
  },
  {
    id: "sustainability",
    title: "Sustainable Agriculture",
    description: "Pioneering eco-friendly farming practices, water conservation, and green technology for future generations.",
    icon: "Leaf"
  }
];

export const TIMELINE_DATA: TimelineEvent[] = [
  {
    year: "2024",
    title: "K Group of Nursery Established",
    subtitle: "Inception of Botanical Excellence",
    description: "Established our flagship nursery dedicated to premium indoor plants, outdoor ornamentals, and commercial landscaping projects.",
    icon: "Sprout"
  },
  {
    year: "2025",
    title: "Gavran Poultry Farms Founded",
    subtitle: "Pioneering Free-Range Eco Poultry",
    description: "Expanded into high-quality country poultry farming with open pasture grazing and chemical-free bird nutrition.",
    icon: "Hen"
  },
  {
    year: "Future",
    title: "Real Estate & Land Investments",
    subtitle: "Strategic Land Banking & Development",
    description: "Venturing into strategic land acquisitions, prime agricultural land investments, and sustainable real estate development.",
    icon: "Building2"
  }
];

export const STATS_DATA: StatItem[] = [
  { id: "businesses", label: "Premier Businesses", value: 2, suffix: "+", icon: "Building2" },
  { id: "customers", label: "Satisfied Customers", value: 199, suffix: "+", icon: "Users" },
  { id: "plants", label: "Healthy Netpot Live Plants Sold", value: 99, suffix: "k+", icon: "Flower" },
  { id: "poultry", label: "Gavran - Healthy Eggs, Hens, Male Rooster", value: 5, suffix: "k+", icon: "Hen" },
  { id: "daily-eggs", label: "Daily Production, Pure Gavran Eggs", value: 1000, suffix: "+", icon: "Egg" }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Strong Genetics • Free-Range Lifestyle • 100% Pure Gavran Male Rooster.",
    category: "Poultry",
    imageUrl: galleryImg1
  },
  {
    id: "gal-2",
    title: "Gavran Pure Country Roosters & Free-Range Birds",
    category: "Poultry",
    imageUrl: poultryImg
  },
  {
    id: "gal-3",
    title: "High-Tech Greenhouse & Netpot Nursery System",
    category: "Nursery",
    imageUrl: nurseryImg
  },
  {
    id: "gal-4",
    title: "Building India's Next Generation of Business Excellence.",
    category: "Nursery",
    imageUrl: galleryImg2
  },
  {
    id: "gal-5",
    title: "Eco Agriculture K group Land & Drone Farm Management",
    category: "Farm",
    imageUrl: galleryDroneImg
  },
  {
    id: "gal-6",
    title: "Precision Growing Starts with Premium Net Pots",
    category: "Nursery",
    imageUrl: galleryImg3
  },
  {
    id: "gal-7",
    title: "100% Fresh Farm-Raised Organic Country Gavran Eggs",
    category: "Eggs",
    imageUrl: eggsImg
  },
  {
    id: "gal-8",
    title: "High Protein, Pure Gavran Eggs",
    category: "Eggs",
    imageUrl: eggBasketImg
  },
  {
    id: "gal-11",
    title: "Pure Farm-to-Table Gavran Eggs Harvested Daily with Care",
    category: "Eggs",
    imageUrl: eggHandsImg
  },
  {
    id: "gal-12",
    title: "Pure Gavran Eggs",
    category: "Eggs",
    imageUrl: eggBowlImg
  },
  {
    id: "gal-13",
    title: "Rich Yolk & High Nutrition Organic Farm Gavran Eggs",
    category: "Eggs",
    imageUrl: eggCollectionImg
  },
  {
    id: "gal-14",
    title: "K Group Headquarters – Inspiring People. Transforming Industries.",
    category: "Corporate",
    imageUrl: hqImg
  },
  {
    id: "gal-15",
    title: "Welcome to K Group – Where Excellence Begins.",
    category: "Corporate",
    imageUrl: lobbyImg
  },
  {
    id: "gal-16",
    title: "Welcome to K Group - Building Trust, Driving Innovation, and Shaping Tomorrow.",
    category: "Corporate",
    imageUrl: innovationImg
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "test-1",
    name: "Mr. Suraj Jadhav",
    role: "Client",
    business: "K Group of Gavran Poultry Farm",
    comment: "Mr. Anuj Ganesh Kanchan has built an outstanding Gavran Poultry Farm with exceptional care and professionalism. The Gavran hens and roosters are healthy, active, and true to their native breed. The quality of the birds, transparent farming practices, and excellent customer service make K Group the perfect choice for anyone looking for premium native poultry.",
    rating: 5,
    avatar: surajJadhavImg
  },
  {
    id: "test-2",
    name: "Mr. Amar Jadhav",
    role: "Client",
    business: "K Group of Gavran Poultry Farm",
    comment: "Mr. Anuj Ganesh Kanchan has earned our trust by delivering truly pure Gavran eggs of the highest quality. Every egg is fresh, naturally produced, and rich in taste and nutrition. His dedication to ethical farming and maintaining premium standards is reflected in every product. K Group is undoubtedly one of the best Gavran poultry farms.",
    rating: 5,
    avatar: amarJadhavImg
  },
  {
    id: "test-3",
    name: "Mr. Ganesh Kanchan",
    role: "Co-Founder",
    business: "K Group of Gavran Poultry Farm & K Group Nursery",
    comment: "As a father, I am truly proud of what my son, Mr. Anuj Ganesh Kanchan, has achieved through K Group Nursery. His dedication, hard work, and commitment to quality are reflected in every Tecoma plant, whether in net pots or 6-inch pots. The plants are healthy, well-maintained, and grown with exceptional care. I wish him continued success in building one of the finest premium nurseries in the country.",
    rating: 5,
    avatar: ganeshKanchanImg
  }
];

export const VISION_TEXT = "Our vision is to become one of India's most trusted business groups by delivering quality, sustainability, innovation, and customer satisfaction.";
