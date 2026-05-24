'use client';

import { LandingNavbar } from '@/components/landing/LandingNavbar';
import { LandingFooter } from '@/components/landing/LandingFooter';
import { FloatingWhatsApp } from '@/components/landing/FloatingWhatsApp';
import { StickyMobileCta } from '@/components/landing/StickyMobileCta';
import { AmbientBackground } from '@/components/landing/AmbientBackground';
import { HeroSection } from '@/components/landing/sections/HeroSection';
import { TrustSection } from '@/components/landing/sections/TrustSection';
import { ProblemSolutionSection } from '@/components/landing/sections/ProblemSolutionSection';
import { ServicesSection } from '@/components/landing/sections/ServicesSection';
import { HowItWorksSection } from '@/components/landing/sections/HowItWorksSection';
import { ChatDemoSection } from '@/components/landing/sections/ChatDemoSection';
import { ResultsSection } from '@/components/landing/sections/ResultsSection';
import { IndustriesSection } from '@/components/landing/sections/IndustriesSection';
import { TestimonialsSection } from '@/components/landing/sections/TestimonialsSection';
import { FAQSection } from '@/components/landing/sections/FAQSection';
import { FinalCTASection } from '@/components/landing/sections/FinalCTASection';
import { useTheme } from '@/context/ThemeContext';

export function LandingPage() {
  const { theme } = useTheme();

  return (
    <div className={`relative min-h-screen overflow-x-hidden transition-colors duration-500 ${
      theme === 'dark' ? 'bg-canvas text-slate-100' : 'bg-white text-gray-900'
    }`}>
      {theme === 'dark' && <AmbientBackground />}
      <LandingNavbar />
      <main>
        <HeroSection />
        <TrustSection />
        <ProblemSolutionSection />
        <ServicesSection />
        <HowItWorksSection />
        <ChatDemoSection />
        <ResultsSection />
        <IndustriesSection />
        <TestimonialsSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <LandingFooter />
      <FloatingWhatsApp />
      <StickyMobileCta />
    </div>
  );
}
