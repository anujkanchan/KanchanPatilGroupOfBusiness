# KANCHAN PATIL GROUP (K GROUP)

> **Growing Nature. Building Trust.**  
> Official corporate digital platform for Kanchan Patil Group — uniting traditional ethical agriculture with cutting-edge engineering, sustainable horticulture, and global logistics.

---

## 🌾 About the Enterprise

**Kanchan Patil Group** is an agro-enterprise headquartered at **Kanchan Patil Farm's** in Uruli Kanchan, Pune, Maharashtra. Founded by **Anuj Ganesh Kanchan** (Computer Science & AI Engineer turned agricultural entrepreneur), the group fuses precision technology and bio-security with authentic rural agriculture.

### Enterprise Pillars

1. **Gavran Poultry Farms**
   - Pure, authentic native Gavran country birds reared in bio-secure, open-air pasture grounds.
   - 100% natural, hormone-free, farm-fresh Gavran brown and speckled eggs collected daily (1,000+ eggs/day).
   - Superior amino acid and protein profiles with rich golden yolks.
   - Reliable bulk supply for breeding stock, fresh eggs, and live birds.

2. **K Group of Nursery**
   - Climate-controlled flora cultivation and commercial landscaping consultation.
   - High-grade wholesale netpot live plants, flowering ornamentals (e.g., 6-inch Tecoma), native shade trees, and landscape flora.
   - Complete greening solutions for private farmhouses, residential estates, and industrial campuses.

3. **Strategic Expansion (The K Group Ecosystem)**
   - **01 Farm:** Poultry production & bio-security.
   - **02 Eggs:** Daily egg collection & grading.
   - **03 Packaging:** Premium branded egg cartons and bulk protective packaging.
   - **04 Distribution:** High-efficiency domestic supply across the Pune-Solapur transit corridor.
   - **05 Export:** International egg market distribution.
   - **06 Global:** Long-term international agro-partnerships.

---

## ✨ Key Platform Features

- **Interactive 3D Global Presence Map (Three.js):**
  - Custom 3D wooden relief world map with illuminated continent backlights.
  - Accurate geographic tracing of India outlined in a pulsating, glowing light-orange border (`#FFB366`).
  - Smooth multi-stage camera transitions (Global World → Asia/India → Maharashtra → Uruli Kanchan, Pune Agro-Sanctuary).
  - Modern Three.js architecture utilizing `THREE.Timer` and `THREE.PCFShadowMap`.
  - Zero-re-render pointer and touch navigation for ultra-smooth panning and zooming.

- **Google Maps Platform Integration:**
  - High-precision interactive map anchored at Kanchan Patil Farm's (18°28'23.1"N, 74°08'01.7"E).
  - Direct turn-by-turn navigation links, street view references, and automated quota-defense safeguards.

- **K - GPT AI Concierge (Gemini API):**
  - Multi-turn conversational estate concierge powered by `@google/genai`.
  - Grounded in live Google Search and Google Maps data for accurate estate directions and agricultural guidance.
  - Real-time speech-to-text recording, audio transcription, and voice playback.

- **Engineered for Core Web Vitals:**
  - **Largest Contentful Paint (LCP):** < 0.5s sub-second paint with snappy introductory transitions.
  - **Interaction to Next Paint (INP):** < 50ms via GPU-accelerated `transform3d`, requestAnimationFrame throttling, and zero layout thrashing.
  - **Cumulative Layout Shift (CLS):** < 0.01 rock-solid visual stability.

- **Luxury Aesthetic & UX:**
  - Dark-mode luxury theme featuring brushed gold accents (`#D4AF37`, `#FFD700`) and forest emerald undertones (`#1F6B3A`).
  - Fluid ambient lighting canvas with subtle champagne dust motes.
  - PWA-ready with Web App Manifest and mobile application icons.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend Framework** | React 19, TypeScript, Vite |
| **Styling & Design** | Tailwind CSS v4, Custom CSS Design System |
| **Animation & 3D** | Three.js (v0.186), Motion (`motion/react`), TopoJSON |
| **Maps & Geospatial** | Google Maps Platform, `@vis.gl/react-google-maps` |
| **Artificial Intelligence** | Google Gen AI TypeScript SDK (`@google/genai`) |
| **Backend & Server** | Node.js, Express, TSX |
| **Icons & Media** | Lucide React |

---

## 📂 Project Architecture

```
├── .env.example              # Environment variables template
├── index.html                # Entry HTML with preloaded fonts and metadata
├── metadata.json             # AI Studio applet configuration and capabilities
├── package.json              # Dependencies and build scripts
├── server.ts                 # Express full-stack entry point & Gemini API proxy
├── vite.config.ts            # Vite build configuration with Tailwind CSS v4
├── public/                   # Static assets, favicon, and PWA icons
└── src/
    ├── App.tsx               # Root application router and layout
    ├── index.css             # Tailwind CSS imports and luxury theme tokens
    ├── main.tsx              # React DOM initialization and quota listeners
    ├── types.ts              # TypeScript interfaces and stage models
    ├── assets/               # Logos and imagery
    ├── data/
    │   └── content.ts        # Enterprise copy, business data, and coordinates
    └── components/
        ├── GlobalPresenceMapSection.tsx # 3D Three.js interactive world map
        ├── GeminiChatbot.tsx            # K - GPT AI Concierge modal
        ├── Hero.tsx                     # Cinematic hero header with 3D tilt
        ├── LoadingScreen.tsx            # Fast high-performance intro splash
        ├── Navbar.tsx                   # Glassmorphic responsive header
        ├── PremiumAmbientBackground.tsx # Ambient canvas glow & auroras
        ├── ScrollProgressBar.tsx        # GPU-accelerated top scroll indicator
        ├── StyledLocationsMap.tsx       # Google Maps Platform location view
        ├── BusinessesSection.tsx        # Core business showcase
        ├── DedicatedBusinessPage.tsx    # Detailed division landing pages
        ├── FounderSection.tsx           # Founder story & vision
        ├── ContactSection.tsx           # Inquiries, WhatsApp, and location
        ├── TimelineSection.tsx          # Group history and milestones
        ├── StatisticsSection.tsx        # Key operational figures
        ├── GallerySection.tsx           # Agro-sanctuary masonry photo gallery
        └── TestimonialsSection.tsx      # Partner reviews & feedback
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v20 or higher
- **npm** or **bun**

### 1. Installation

Clone the repository and install dependencies:

```bash
npm install
```

### 2. Environment Variables

Create a `.env` file in the root directory based on `.env.example`:

```bash
cp .env.example .env
```

Set the required environment keys:

```env
# Required for Gemini AI Concierge
GEMINI_API_KEY="your-gemini-api-key"

# Required for Google Maps Platform display
VITE_GOOGLE_MAPS_API_KEY="your-google-maps-api-key"

# Application URL
APP_URL="https://kanchanpatil-groupofbusiness.ai.studio"

# Application host URL in localhost
APP_URL="http://localhost:3000"
```

### 3. Run Development Server

Start the full-stack Express + Vite development server:

```bash
npm run dev
```

The application will be live at: `http://localhost:3000`

### 4. Build for Production

Type-check and create an optimized production bundle:

```bash
# Type check and lint
npm run lint

# Compile production bundle
npm run build

# Start production server
npm start
```

---

## 📍 Headquarters & Contact

- **Estate:** Kanchan Patil Farm's
- **Address:** Shindawane Road, Kaleshivar Mala, Uruli Kanchan, Taluka Haveli, Dist - Pune, Maharashtra 412202, India
- **Phone / WhatsApp:** [+91 7517004343](https://wa.me/917517004343)
- **Email:** `anujjjmitsoc@gmail.com`
- **Hours:**
  - Poultry Division: Monday – Saturday, 8:00 AM – 7:00 PM
  - Nursery Division: Monday – Sunday, 7:30 AM – 6:30 PM

---

## 📄 License

© 2026 **Kanchan Patil Group (K GROUP)**. All rights reserved.
