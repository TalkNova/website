'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

type PlanName = 'STARTER' | 'PROFESSIONAL' | 'PLATINUM';

type PlanDetails = {
  name: PlanName;
  price: string;
  limit: string;
  description: string;
  icon: 'starter' | 'professional' | 'platinum';
  features: string[];
};

type PlanGroup = {
  highlighted: PlanName;
  plans: PlanDetails[];
};

const starterFeatures = [
  'Lifetime validity — No recurring platform fees',
  'Bulk WhatsApp campaign support',
  'Send promotional & transactional WhatsApp messages',
  'WhatsApp template message support',
  'Lead capture through WhatsApp',
  'Quick replies & automated greetings',
  'Basic analytics & message tracking',
  'Easy-to-use dashboard',
  'Fast onboarding support',
];

const professionalFeatures = [
  'Lifetime validity — No monthly platform charges',
  'Bulk WhatsApp campaign support',
  'Automated lead qualification',
  'Smart follow-up automation',
  'Drip campaigns & customer nurturing',
  'WhatsApp buttons & interactive flows',
  'Advanced analytics & reporting',
  'Customer segmentation support',
  'Faster customer response management',
  'Priority onboarding support',
];

const platinumFeatures = [
  'Lifetime validity — No monthly subscription',
  'Free WhatsApp Business API setup',
  'Priority Blue Tick Verification support',
  'Run bulk WhatsApp marketing campaigns',
  'AI-Powered No-Code Chatbot Builder',
  'Smart automated replies & lead qualification',
  'Click-to-WhatsApp campaign support',
  'Drip campaigns for follow-ups & retargeting',
  'Live chat with unlimited team members',
  'WhatsApp buttons & Call-To-Action flows',
  'Real-time conversation analytics & insights',
  'Customer support automation 24×7',
  'Capture, nurture & convert leads automatically',
  'Reduce manual support workload',
  'Fast onboarding & dedicated setup assistance',
];

const planData: Record<'marketing' | 'utility' | 'authentication', PlanGroup> = {
  marketing: {
    highlighted: 'PROFESSIONAL',
    plans: [
      {
        name: 'STARTER',
        price: '11,000',
        limit: '10,000 WhatsApp Messages',
        description: 'Start Automating Your Business on WhatsApp',
        icon: 'starter',
        features: starterFeatures,
      },
      {
        name: 'PROFESSIONAL',
        price: '48,000',
        limit: '50,000 WhatsApp Messages',
        description: 'Scale customer engagement with smart automation and flows.',
        icon: 'professional',
        features: professionalFeatures,
      },
      {
        name: 'PLATINUM',
        price: '90,000',
        limit: '1,00,000 WhatsApp messages',
        description: 'Full-scale automated customer support and custom AI chatbots.',
        icon: 'platinum',
        features: platinumFeatures,
      },
    ],
  },
  utility: {
    highlighted: 'PLATINUM',
    plans: [
      {
        name: 'STARTER',
        price: '3,000',
        limit: '10,000 WhatsApp Messages',
        description: 'Start Automating Your Business on WhatsApp',
        icon: 'starter',
        features: starterFeatures,
      },
      {
        name: 'PROFESSIONAL',
        price: '10,000',
        limit: '50,000 WhatsApp Messages',
        description: 'Scale customer engagement with smart automation and flows.',
        icon: 'professional',
        features: professionalFeatures,
      },
      {
        name: 'PLATINUM',
        price: '18,000',
        limit: '1,00,000 WhatsApp messages',
        description: 'Full-scale automated customer support and custom AI chatbots.',
        icon: 'platinum',
        features: platinumFeatures,
      },
    ],
  },
  authentication: {
    highlighted: 'PLATINUM',
    plans: [
      {
        name: 'STARTER',
        price: '3,000',
        limit: '10,000 WhatsApp Messages',
        description: 'Start Automating Your Business on WhatsApp',
        icon: 'starter',
        features: starterFeatures,
      },
      {
        name: 'PROFESSIONAL',
        price: '10,000',
        limit: '50,000 WhatsApp Messages',
        description: 'Scale customer engagement with smart automation and flows.',
        icon: 'professional',
        features: professionalFeatures,
      },
      {
        name: 'PLATINUM',
        price: '18,000',
        limit: '1,00,000 WhatsApp messages',
        description: 'Full-scale automated customer support and custom AI chatbots.',
        icon: 'platinum',
        features: platinumFeatures,
      },
    ],
  },
};

// Starter Icon: Target Reticle
const StarterIcon = ({ theme, active }: { theme: 'light' | 'dark'; active: boolean }) => {
  const iconColor = theme === 'dark' ? 'text-[#25d366]' : active ? 'text-white' : 'text-gray-700 group-hover:text-white transition-colors duration-300';
  return (
    <div className="relative flex items-center justify-center w-12 h-12 mx-auto transition-transform duration-300 group-hover:scale-110">
      <span className={`absolute top-0 left-1 w-1 h-1 rounded-full ${theme === 'dark' ? 'bg-[#25d366]/40' : 'bg-black/10'}`} />
      <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={iconColor}>
        <rect x="14" y="14" width="20" height="20" rx="3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="24" cy="24" r="5" stroke="currentColor" strokeWidth="2.5" />
        <path d="M24 8V12M24 36V40M8 24H12M36 24H40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </div>
  );
};

// Professional Icon: Lifebuoy
const ProfessionalIcon = ({ theme, active }: { theme: 'light' | 'dark'; active: boolean }) => {
  const iconColor = theme === 'dark' ? 'text-[#25d366]' : active ? 'text-white' : 'text-gray-700 group-hover:text-white transition-colors duration-300';
  return (
    <div className="relative flex items-center justify-center w-12 h-12 mx-auto transition-transform duration-300 group-hover:scale-110">
      <span className={`absolute top-0 left-1 w-1.5 h-1.5 rounded-full ${theme === 'dark' ? 'bg-[#22d3ee]/40' : 'bg-black/10'}`} />
      <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={iconColor}>
        <circle cx="24" cy="24" r="14" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="24" cy="24" r="6" stroke="currentColor" strokeWidth="2.5" />
        <path d="M14 14L19.5 19.5M34 14L28.5 19.5M14 34L19.5 28.5M34 34L28.5 28.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </div>
  );
};

// Platinum Icon: Settings Gear
const PlatinumIcon = ({ theme, active }: { theme: 'light' | 'dark'; active: boolean }) => {
  const iconColor = theme === 'dark' ? 'text-[#25d366]' : active ? 'text-white' : 'text-gray-700 group-hover:text-white transition-colors duration-300';
  return (
    <div className="relative flex items-center justify-center w-12 h-12 mx-auto transition-transform duration-300 group-hover:scale-110">
      <span className={`absolute top-1 right-1 w-1 h-1 rounded-full ${theme === 'dark' ? 'bg-[#25d366]' : 'bg-black'}`} />
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={iconColor}>
        <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
};

export function PricingSection() {
  const [activeTab, setActiveTab] = useState<'marketing' | 'utility' | 'authentication'>('marketing');
  const { theme } = useTheme();

  const currentGroup = planData[activeTab];

  return (
    <div className="w-full py-16 transition-all duration-500 relative z-10 bg-transparent text-slate-200">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center border-b pb-8 mb-10 transition-colors duration-500 border-white/[0.08]">
          <h2 className="font-display text-3xl font-black tracking-tight sm:text-4xl transition-colors duration-500 text-white">
            WhatsApp Messages <span className="text-gradient-wa">Pricing</span>
          </h2>
        </div>

        {/* Tabs Row */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          <button
            onClick={() => setActiveTab('marketing')}
            className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 border ${
              activeTab === 'marketing'
                ? 'bg-wa border-wa text-canvas shadow-[0_0_24px_-4px_rgb(37_211_102/0.5)]'
                : 'border-white/10 text-slate-300 bg-white/5 hover:bg-white/10 hover:text-white'
            }`}
          >
            WhatsApp Business API (Marketing Plan)
          </button>
          <button
            onClick={() => setActiveTab('utility')}
            className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 border ${
              activeTab === 'utility'
                ? 'bg-wa border-wa text-canvas shadow-[0_0_24px_-4px_rgb(37_211_102/0.5)]'
                : 'border-white/10 text-slate-300 bg-white/5 hover:bg-white/10 hover:text-white'
            }`}
          >
            WhatsApp Business API (Utility Plan)
          </button>
          <button
            onClick={() => setActiveTab('authentication')}
            className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 border ${
              activeTab === 'authentication'
                ? 'bg-wa border-wa text-canvas shadow-[0_0_24px_-4px_rgb(37_211_102/0.5)]'
                : 'border-white/10 text-slate-300 bg-white/5 hover:bg-white/10 hover:text-white'
            }`}
          >
            WhatsApp Business API (Authentication Plan)
          </button>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mt-6">
          {currentGroup.plans.map((plan) => {
            const isHighlighted = plan.name === currentGroup.highlighted;
            
            // Premium Card Styles
            const cardClasses = isHighlighted
              ? 'group relative flex flex-col justify-between rounded-3xl border-2 border-wa/40 bg-gradient-to-b from-[#0F2617]/90 to-[#0A111F]/90 text-slate-200 shadow-[0_0_50px_-5px_rgba(37,211,102,0.2)] hover:shadow-[0_0_60px_-5px_rgba(37,211,102,0.3)] hover:border-wa/60 hover:-translate-y-2 p-8 transition-all duration-500 h-full backdrop-blur-xl'
              : 'group relative flex flex-col justify-between rounded-3xl border border-white/[0.08] bg-[#0b0f19]/80 text-slate-200 shadow-xl hover:shadow-[0_0_40px_rgba(37,211,102,0.1)] hover:border-wa/30 hover:-translate-y-2 p-8 transition-all duration-500 h-full backdrop-blur-xl';

            const titleClasses = isHighlighted
              ? 'text-center font-display text-sm font-bold tracking-widest uppercase mb-4 text-wa transition-colors duration-300'
              : 'text-center font-display text-sm font-bold tracking-widest uppercase mb-4 text-slate-400 group-hover:text-wa transition-colors duration-300';

            const buttonClasses = isHighlighted
              ? 'w-full py-3.5 text-center text-xs font-black uppercase tracking-wider rounded-full bg-wa text-canvas shadow-[0_0_24px_-4px_rgb(37_211_102/0.6)] hover:shadow-[0_0_30px_rgb(37_211_102/0.8)] hover:scale-[1.02] transition-all duration-300 cursor-pointer'
              : 'w-full py-3.5 text-center text-xs font-bold uppercase tracking-wider rounded-full border border-white/10 text-white bg-white/5 hover:bg-wa hover:text-canvas hover:border-wa hover:shadow-[0_0_24px_-4px_rgb(37_211_102/0.5)] hover:scale-[1.02] transition-all duration-300 cursor-pointer';

            return (
              <div key={plan.name} className={cardClasses}>
                {isHighlighted && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-wa to-emerald-500 text-canvas text-[10px] font-black tracking-widest uppercase py-1 px-4 rounded-full shadow-[0_0_20px_rgb(37_211_102/0.5)] z-20">
                    Most Popular
                  </span>
                )}
                
                {/* Header Info */}
                <div className="flex flex-col items-center">
                  <h3 className={titleClasses}>
                    {plan.name}
                  </h3>

                  {/* Icon */}
                  <div className="flex justify-center mb-6 relative">
                    <div className="absolute inset-0 bg-wa/5 rounded-full blur-xl w-16 h-16 mx-auto" />
                    <div className="relative z-10 w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center group-hover:border-wa/20 group-hover:bg-wa/5 transition-all duration-300">
                      {plan.icon === 'starter' && <StarterIcon theme="dark" active={isHighlighted} />}
                      {plan.icon === 'professional' && <ProfessionalIcon theme="dark" active={isHighlighted} />}
                      {plan.icon === 'platinum' && <PlatinumIcon theme="dark" active={isHighlighted} />}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-center mt-4 mb-2">
                    <div className="flex items-baseline justify-center font-display">
                      <span className="text-3xl font-black text-wa mr-1">₹</span>
                      <span className="text-6xl font-black tracking-tight text-white">{plan.price}</span>
                    </div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1.5">
                      one-time payment
                    </div>
                  </div>

                  {/* Limit Badge */}
                  <div className="flex justify-center mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-bold bg-white/5 border border-white/10 text-slate-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-wa animate-pulse" />
                      {plan.limit}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-center text-xs text-slate-400 font-medium px-4 mb-6 leading-relaxed min-h-[36px] flex items-center justify-center">
                    {plan.description}
                  </p>
                </div>

                {/* CTA Button placed above Features */}
                <div className="w-full mb-6">
                  <button
                    onClick={() => window.location.href = '/login'}
                    className={buttonClasses}
                  >
                    CHOOSE PLAN
                  </button>
                </div>

                {/* Divider line */}
                <div className="w-full h-px mb-6 bg-white/[0.08]" />

                {/* Features List */}
                <div className="flex-grow">
                  <ul className="flex flex-col gap-4 text-sm font-medium">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3.5">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-wa/10 flex items-center justify-center text-wa transition-colors duration-300">
                          <Check className="w-3.5 h-3.5" />
                        </span>
                        <span className="transition-colors duration-300 text-slate-200 text-[13px] leading-tight pt-0.5">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
