'use client';

import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';

type PlanName = 'SILVER' | 'GOLD' | 'PLATINUM';

type PlanDetails = {
  name: PlanName;
  price: string;
  limit: string;
  icon: 'silver' | 'gold' | 'platinum';
};

type PlanGroup = {
  highlighted: PlanName;
  plans: PlanDetails[];
};

const planData: Record<'marketing' | 'utility' | 'authentication', PlanGroup> = {
  marketing: {
    highlighted: 'GOLD',
    plans: [
      {
        name: 'SILVER',
        price: '7,900',
        limit: '10,000 Message',
        icon: 'silver',
      },
      {
        name: 'GOLD',
        price: '36,000',
        limit: '50,000 Messages',
        icon: 'gold',
      },
      {
        name: 'PLATINUM',
        price: '70,000',
        limit: '1,00,000 Messages',
        icon: 'platinum',
      },
    ],
  },
  utility: {
    highlighted: 'PLATINUM',
    plans: [
      {
        name: 'SILVER',
        price: '3,000',
        limit: '10,000 messages',
        icon: 'silver',
      },
      {
        name: 'GOLD',
        price: '9,000',
        limit: '50,000 messages',
        icon: 'gold',
      },
      {
        name: 'PLATINUM',
        price: '15,000',
        limit: '1,00,000 messages',
        icon: 'platinum',
      },
    ],
  },
  authentication: {
    highlighted: 'PLATINUM',
    plans: [
      {
        name: 'SILVER',
        price: '3,000',
        limit: '10,000 messages',
        icon: 'silver',
      },
      {
        name: 'GOLD',
        price: '9,000',
        limit: '50,000 messages',
        icon: 'gold',
      },
      {
        name: 'PLATINUM',
        price: '15,000',
        limit: '1,00,000 messages',
        icon: 'platinum',
      },
    ],
  },
};

const features = [
  'Lifetime validity',
  'No monthly cost',
  'Free WhatsApp API account setup',
  'Blue Tick Verification',
  'Bulk WhatsApp campaigns',
  'No-Code Chatbot Builder',
  'Buttons & Call to Action',
  'Live Chat',
  'Unlimited Agents',
  'Drip campaigns',
  'Conversation Analytics',
];

// Silver Icon: Target Reticle
const SilverIcon = ({ theme, active }: { theme: 'light' | 'dark'; active: boolean }) => {
  const iconColor = theme === 'dark' ? 'text-[#25d366]' : active ? 'text-white' : 'text-gray-700 group-hover:text-white transition-colors duration-300';
  return (
    <div className="relative flex items-center justify-center w-16 h-16 mx-auto mb-4 transition-transform duration-300 group-hover:scale-110">
      <span className={`absolute top-1 left-2 w-1.5 h-1.5 rounded-full ${theme === 'dark' ? 'bg-[#25d366]/40' : 'bg-black/10'}`} />
      <span className={`absolute bottom-2 left-1 w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-b-[6px] ${theme === 'dark' ? 'border-b-[#22d3ee]' : 'border-b-gray-400'} -rotate-45`} />
      <svg width="44" height="44" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={iconColor}>
        <rect x="14" y="14" width="20" height="20" rx="3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="24" cy="24" r="5" stroke="currentColor" strokeWidth="2.5" />
        <path d="M24 8V12M24 36V40M8 24H12M36 24H40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </div>
  );
};

// Gold Icon: Lifebuoy
const GoldIcon = ({ theme, active }: { theme: 'light' | 'dark'; active: boolean }) => {
  const iconColor = theme === 'dark' ? 'text-[#25d366]' : active ? 'text-white' : 'text-gray-700 group-hover:text-white transition-colors duration-300';
  return (
    <div className="relative flex items-center justify-center w-16 h-16 mx-auto mb-4 transition-transform duration-300 group-hover:scale-110">
      <span className={`absolute top-1 left-2 w-1.5 h-1.5 rounded-full ${theme === 'dark' ? 'bg-[#22d3ee]/40' : 'bg-black/10'}`} />
      <span className={`absolute bottom-2 right-1 w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-b-[6px] ${theme === 'dark' ? 'border-b-[#25d366]' : 'border-b-gray-400'} rotate-45`} />
      <svg width="44" height="44" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={iconColor}>
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
    <div className="relative flex items-center justify-center w-16 h-16 mx-auto mb-4 transition-transform duration-300 group-hover:scale-110">
      <span className={`absolute top-2 right-2 w-1 h-1 rounded-full ${theme === 'dark' ? 'bg-[#25d366]' : 'bg-black'}`} />
      <span className={`absolute bottom-1 left-2 w-0 h-0 border-l-[2px] border-l-transparent border-r-[2px] border-r-transparent border-b-[5px] ${theme === 'dark' ? 'border-b-sky-400' : 'border-b-gray-400'} -rotate-12`} />
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={iconColor}>
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
    <div className={`w-full py-16 transition-all duration-500 relative z-10 ${
      theme === 'dark' ? 'bg-transparent text-slate-200' : 'bg-white text-gray-800'
    }`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className={`text-center border-b pb-8 mb-10 transition-colors duration-500 ${
          theme === 'dark' ? 'border-white/[0.08]' : 'border-gray-200'
        }`}>
          <h2 className={`font-display text-3xl font-black tracking-tight sm:text-4xl transition-colors duration-500 ${
            theme === 'dark' ? 'text-white' : 'text-black'
          }`}>
            WhatsApp Messages <span className={theme === 'dark' ? 'text-gradient-wa' : 'underline decoration-black decoration-[3px] underline-offset-[6px]'}>Pricing</span>
          </h2>
        </div>

        {/* Tabs Row */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          <button
            onClick={() => setActiveTab('marketing')}
            className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 border ${
              theme === 'dark'
                ? activeTab === 'marketing'
                  ? 'bg-wa border-wa text-canvas shadow-[0_0_24px_-4px_rgb(37_211_102/0.5)]'
                  : 'border-white/10 text-slate-300 bg-white/5 hover:bg-white/10 hover:text-white'
                : activeTab === 'marketing'
                  ? 'bg-black border-black text-white font-black shadow-sm'
                  : 'border-gray-300 text-gray-600 bg-white hover:bg-gray-50 hover:text-black hover:border-black'
            }`}
          >
            WhatsApp Business API (Marketing Plan)
          </button>
          <button
            onClick={() => setActiveTab('utility')}
            className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 border ${
              theme === 'dark'
                ? activeTab === 'utility'
                  ? 'bg-wa border-wa text-canvas shadow-[0_0_24px_-4px_rgb(37_211_102/0.5)]'
                  : 'border-white/10 text-slate-300 bg-white/5 hover:bg-white/10 hover:text-white'
                : activeTab === 'utility'
                  ? 'bg-black border-black text-white font-black shadow-sm'
                  : 'border-gray-300 text-gray-600 bg-white hover:bg-gray-50 hover:text-black hover:border-black'
            }`}
          >
            WhatsApp Business API (Utility Plan)
          </button>
          <button
            onClick={() => setActiveTab('authentication')}
            className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 border ${
              theme === 'dark'
                ? activeTab === 'authentication'
                  ? 'bg-wa border-wa text-canvas shadow-[0_0_24px_-4px_rgb(37_211_102/0.5)]'
                  : 'border-white/10 text-slate-300 bg-white/5 hover:bg-white/10 hover:text-white'
                : activeTab === 'authentication'
                  ? 'bg-black border-black text-white font-black shadow-sm'
                  : 'border-gray-300 text-gray-600 bg-white hover:bg-gray-50 hover:text-black hover:border-black'
            }`}
          >
            WhatsApp Business API (Authentication Plan)
          </button>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mt-6">
          {currentGroup.plans.map((plan) => {
            const isHighlightedInLightMode = false; // All cards start as white by default in Light Mode
            
            // Dynamic theme style mapping
            const cardClasses = theme === 'dark'
              ? 'group relative flex flex-col justify-between rounded-3xl border border-white/[0.06] bg-[#111827]/40 text-slate-200 shadow-lg hover:border-wa/30 hover:bg-[#25d366]/[0.06] hover:shadow-[0_0_50px_-12px_rgba(37,211,102,0.3)] hover:-translate-y-2 p-8 transition-all duration-300 h-full'
              : 'group relative flex flex-col justify-between rounded-3xl border border-black/[0.08] bg-white text-gray-900 shadow-sm hover:bg-black hover:text-white hover:border-transparent hover:shadow-xl hover:-translate-y-2 p-8 transition-all duration-300 h-full';

            const titleClasses = theme === 'dark'
              ? 'text-center font-display text-sm font-semibold tracking-widest uppercase mb-6 text-slate-400 group-hover:text-wa transition-colors duration-300'
              : 'text-center font-display text-base font-black tracking-widest uppercase mb-6 transition-colors duration-300 text-gray-900 group-hover:text-white';

            const priceClasses = theme === 'dark'
              ? 'text-5xl font-black tracking-tight text-white'
              : 'text-5xl font-black tracking-tight transition-colors duration-300 text-black group-hover:text-white';

            const currencyClasses = theme === 'dark'
              ? 'text-2xl font-bold mt-1.5 mr-0.5 text-white/95'
              : 'text-xl font-bold mt-1.5 mr-0.5 transition-colors duration-300 text-black group-hover:text-white';

            const limitClasses = theme === 'dark'
              ? 'text-center text-xs font-semibold mt-1 mb-8 text-slate-300'
              : 'text-center text-xs font-bold mt-1 mb-8 transition-colors duration-300 text-gray-600 group-hover:text-gray-300';

            const dividerClasses = theme === 'dark'
              ? 'w-full h-px mb-8 bg-white/[0.08]'
              : 'w-full h-px mb-8 transition-colors duration-300 bg-black/[0.08] group-hover:bg-white/10';

            const checkClasses = theme === 'dark'
              ? 'bg-wa/10 text-wa'
              : 'bg-black/5 text-black group-hover:bg-white/20 group-hover:text-white transition-all duration-300';

            const featureTextClasses = theme === 'dark'
              ? 'text-slate-300'
              : 'text-gray-700 group-hover:text-gray-300';

            const buttonClasses = theme === 'dark'
              ? 'w-full py-3.5 text-center text-xs font-bold uppercase tracking-wider rounded-full border border-white/15 text-white group-hover:bg-wa group-hover:text-canvas group-hover:border-wa group-hover:shadow-[0_0_24px_-4px_rgb(37,211,102/0.5)] transition-all duration-300'
              : 'w-full py-3.5 text-center text-xs font-bold uppercase tracking-wider rounded-full border border-black/15 text-gray-700 bg-white group-hover:bg-white group-hover:text-black group-hover:border-transparent group-hover:shadow-sm transition-all duration-300';

            return (
              <div key={plan.name} className={cardClasses}>
                <div>
                  {/* Card Title */}
                  <h3 className={titleClasses}>
                    {plan.name}
                  </h3>

                  {/* Icon */}
                  {plan.icon === 'silver' && <SilverIcon theme={theme} active={isHighlightedInLightMode} />}
                  {plan.icon === 'gold' && <GoldIcon theme={theme} active={isHighlightedInLightMode} />}
                  {plan.icon === 'platinum' && <PlatinumIcon theme={theme} active={isHighlightedInLightMode} />}

                  {/* Price */}
                  <div className="flex items-start justify-center font-display mt-6">
                    <span className={currencyClasses}>₹</span>
                    <span className={priceClasses}>{plan.price}</span>
                    <span className={`text-xs font-medium self-center ml-1 ${
                      theme === 'dark' ? 'text-slate-400' : isHighlightedInLightMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>/ Per</span>
                  </div>

                  {/* Limit Subtext */}
                  <div className={limitClasses}>
                    {plan.limit}
                  </div>

                  {/* Divider line */}
                  <div className={dividerClasses} />

                  {/* Features List */}
                  <ul className="flex flex-col gap-4 text-sm font-medium mb-10">
                    {features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3.5">
                        <span className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs transition-colors duration-300 ${checkClasses}`}>
                          ✓
                        </span>
                        <span className={`transition-colors duration-300 ${featureTextClasses}`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => window.location.href = '/login'}
                  className={buttonClasses}
                >
                  CHOOSE PLAN
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
