import React, { useState, useEffect } from 'react';
import { LoadingScreen } from './components/LoadingScreen';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { PremiumAmbientBackground } from './components/PremiumAmbientBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { GlobalPresenceMapSection } from './components/GlobalPresenceMapSection';
import { AboutSection } from './components/AboutSection';
import { BusinessesSection } from './components/BusinessesSection';
import { WhyChooseUsSection } from './components/WhyChooseUsSection';
import { FounderSection } from './components/FounderSection';
import { TimelineSection } from './components/TimelineSection';
import { StatisticsSection } from './components/StatisticsSection';
import { GallerySection } from './components/GallerySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { VisionSection } from './components/VisionSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { DedicatedBusinessPage } from './components/DedicatedBusinessPage';
import { GeminiChatbot } from './components/GeminiChatbot';
import { LanguageProvider } from './context/LanguageContext';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState<'home' | 'gavran-poultry-farms' | 'k-group-nursery'>('home');
  const [quotaExceeded, setQuotaExceeded] = useState(false);

  useEffect(() => {
    const handler = () => setQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', handler);
    return () => window.removeEventListener('gmp-quota-exceeded', handler);
  }, []);

  const handleNavigate = (page: 'home' | 'gavran-poultry-farms' | 'k-group-nursery', sectionId?: string) => {
    setActivePage(page);
    if (page === 'home') {
      if (sectionId) {
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }, 100);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-transparent text-white selection:bg-[#D4AF37] selection:text-black relative font-body">
      {/* Thin Gold Viewport Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Quota Defense Banner */}
      {quotaExceeded && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm">
          <span>
            Google Maps Platform quota reached. If you are the app owner, visit{' '}
            <a
              href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold text-amber-950 hover:text-amber-800"
            >
              maps developer site
            </a>{' '}
            for instructions to update your account.
          </span>
        </div>
      )}

      {/* Loading Screen */}
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      {/* Extreme Premium Live Ambient Background */}
      <PremiumAmbientBackground />

      {/* Sticky Glassmorphic Navbar */}
      <Navbar
        activePage={activePage}
        onNavigate={handleNavigate}
      />

      {/* Main Content Router */}
      {activePage === 'home' ? (
        <main>
          {/* Hero Section */}
          <Hero
            onExploreBusinesses={() => handleNavigate('home', 'businesses')}
            onContactUs={() => handleNavigate('home', 'contact')}
          />

          {/* Ultra-Premium Interactive 3D World Map: Our Global Presence */}
          <GlobalPresenceMapSection />

          {/* About Section */}
          <AboutSection
            onNavigateToBusiness={(slug) => handleNavigate(slug)}
          />

          {/* Our Businesses Section */}
          <BusinessesSection
            onExploreBusiness={(slug) => handleNavigate(slug)}
          />

          {/* Why Choose Us Section */}
          <WhyChooseUsSection />

          {/* Founder Section */}
          <FounderSection />

          {/* Evolution Timeline */}
          <TimelineSection />

          {/* Statistics Counters */}
          <StatisticsSection />

          {/* Masonry Gallery */}
          <GallerySection />

          {/* Testimonials */}
          <TestimonialsSection />

          {/* Corporate Vision */}
          <VisionSection />

          {/* Contact Section */}
          <ContactSection />
        </main>
      ) : (
        <DedicatedBusinessPage
          slug={activePage}
          onBackToHome={() => handleNavigate('home')}
          onNavigate={handleNavigate}
        />
      )}

      {/* Luxury Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Gemini AI Multi-Turn Chatbot with Maps & Search Grounding */}
      <GeminiChatbot />
    </div>
  </LanguageProvider>
);
}
