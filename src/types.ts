export interface Business {
  id: string;
  name: string;
  tagline: string;
  slug: string;
  image: string;
  description: string;
  highlights: string[];
  features: string[];
  services: {
    title: string;
    description: string;
    iconName: string;
  }[];
  benefits: string[];
  gallery: {
    url: string;
    caption: string;
    category: string;
  }[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Nursery' | 'Poultry' | 'Landscaping' | 'Farm' | 'Products' | 'Eggs' | 'Corporate';
  imageUrl: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  business: string;
  comment: string;
  rating: number;
  avatar: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
}

export interface StatItem {
  id: string;
  label: string;
  value: number;
  suffix: string;
  icon: string;
}

export interface FeatureCard {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface FounderInfo {
  name: string;
  title: string;
  subtitles: string[];
  quote: string;
  bio: string;
  image: string;
  socials: {
    linkedin: string;
    instagram: string;
    facebook: string;
    github: string;
    whatsapp?: string;
  };
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  businessInterest: 'General Inquiry' | 'Gavran Poultry Farms' | 'K Group of Nursery' | 'Investment / Partnership';
  message: string;
}
