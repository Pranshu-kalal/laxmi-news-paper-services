/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { CinematicOpeningIntro } from './components/CinematicOpeningIntro';
import { AboutSection } from './components/AboutSection';
import { NewspaperCollection } from './components/NewspaperCollection';
import { SubscriptionPlans } from './components/SubscriptionPlans';
import { TemplateDistribution } from './components/TemplateDistribution';
import { CinematicClockSection } from './components/CinematicClockSection';
import { SubscriptionForm } from './components/SubscriptionForm';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { INITIAL_NEWSPAPERS, NewspaperItem, BUSINESS_INFO } from './data/newspaperData';

export default function App() {
  const [newspapers, setNewspapers] = useState<NewspaperItem[]>(() => {
    const saved = localStorage.getItem('laxmi_newspaper_list');
    return saved ? JSON.parse(saved) : INITIAL_NEWSPAPERS;
  });

  const [selectedNewspaperForForm, setSelectedNewspaperForForm] = useState<NewspaperItem | null>(null);

  const handleUpdateNewspapers = (updated: NewspaperItem[]) => {
    setNewspapers(updated);
    localStorage.setItem('laxmi_newspaper_list', JSON.stringify(updated));
  };

  const scrollToSubscriptionForm = (paper?: NewspaperItem) => {
    if (paper) {
      setSelectedNewspaperForForm(paper);
    }
    const formElement = document.getElementById('subscription-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDirectWhatsApp = () => {
    window.open(BUSINESS_INFO.whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#060b19] text-[#fbf9f4] font-sans antialiased selection:bg-[#d4af37] selection:text-[#060b19]">
      {/* Navigation Header */}
      <Navbar onSubscribeClick={() => scrollToSubscriptionForm()} />

      <main>
        {/* Hero Section: 3D Cinematic Opening Animation with Flying Newspapers & Sunrise */}
        <section id="hero">
          <CinematicOpeningIntro
            onSubscribeClick={() => scrollToSubscriptionForm()}
            onWhatsAppClick={handleDirectWhatsApp}
          />
        </section>

        {/* Section 2: About Laxmi Newspaper Services */}
        <AboutSection />

        {/* Section 3: Our Newspaper Collection (Editable Brand Names & Pricing) */}
        <NewspaperCollection
          newspapers={newspapers}
          onUpdateNewspaper={handleUpdateNewspapers}
          onSelectForSubscription={(paper) => scrollToSubscriptionForm(paper)}
        />

        {/* Section 4: Subscription Plans & Pricing */}
        <SubscriptionPlans onStartSubscription={() => scrollToSubscriptionForm()} />

        {/* Section 5: Special Template Distribution Service */}
        <TemplateDistribution />

        {/* Standalone Section: Ultra-Premium 3D Cinematic Clock Animation */}
        <CinematicClockSection />

        {/* Section 7: Online Subscription Form with WhatsApp Handoff */}
        <SubscriptionForm
          newspapers={newspapers}
          preselectedNewspaper={selectedNewspaperForForm}
        />

        {/* Section 8: Why Choose Us */}
        <WhyChooseUs />

        {/* Section 9: Contact Us */}
        <ContactSection onOpenSubscriptionForm={() => scrollToSubscriptionForm()} />
      </main>

      {/* Section 10: Cinematic Footer */}
      <Footer />
    </div>
  );
}
