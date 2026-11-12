import React, { useState, useEffect, useMemo } from 'react';
import { Menu, X, Phone, MapPin, Clock, ExternalLink, Sparkles } from 'lucide-react';
import Home from './components/Home';
import Services from './components/Services';
import Contact from './components/Contact';
import { FacebookIcon, InstagramIcon } from './components/SocialIcons';
import { ClinicContext, resolveClinic } from './useClinic';

export default function App() {
  const clinic = useMemo(() => resolveClinic(), []);
  return (
    <ClinicContext.Provider value={clinic}>
      <AppShell clinic={clinic} />
    </ClinicContext.Provider>
  );
}

function AppShell({ clinic }) {
  const [page, setPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Apply per-clinic theme, page title, and favicon
  useEffect(() => {
    const root = document.documentElement.style;
    root.setProperty('--brand-dark', clinic.theme.dark);
    root.setProperty('--brand-card', clinic.theme.card);
    root.setProperty('--brand-accent', clinic.theme.accent);
    root.setProperty('--brand-accent-hover', clinic.theme.accentHover);
    root.setProperty('--brand-gold', clinic.theme.gold);

    document.title = `${clinic.name} ${clinic.suffix} | ${clinic.tagline} — ${clinic.city}`;
    const icon = document.querySelector("link[rel='icon']");
    if (icon && clinic.logo) icon.setAttribute('href', clinic.logo);

    // Dynamic Local SEO JSON-LD
    const ld = {
      "@context": "https://schema.org",
      "@type": "Dentist",
      "name": `${clinic.name} ${clinic.suffix}`,
      "description": clinic.tagline,
      "telephone": clinic.phoneIntl,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": `${clinic.addressLine1}, ${clinic.addressLine2}`,
        "addressLocality": clinic.city,
        "addressRegion": clinic.region,
        "postalCode": clinic.postalCode,
        "addressCountry": "PH"
      },
      "geo": { "@type": "GeoCoordinates", "latitude": clinic.lat, "longitude": clinic.lng },
      "sameAs": [clinic.facebook, clinic.instagram, clinic.bookingPortal].filter(Boolean)
    };
    let tag = document.getElementById('clinic-jsonld');
    if (!tag) {
      tag = document.createElement('script');
      tag.type = 'application/ld+json';
      tag.id = 'clinic-jsonld';
      document.head.appendChild(tag);
    }
    tag.textContent = JSON.stringify(ld);
  }, [clinic]);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  }, [page]);

  const BrandLogo = ({ size = "w-11 h-11" }) => (
    <div className={`${size} rounded-xl bg-brand-dark border border-brand-gold/30 p-1 flex items-center justify-center overflow-hidden shadow-sm shrink-0`}>
      <img
        src={clinic.logo}
        alt={`${clinic.name} ${clinic.suffix} Logo`}
        className="w-full h-full object-contain"
      />
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col font-sans bg-brand-light text-brand-dark">

      {/* Top Banner (Desktop Only) */}
      <div className="hidden lg:block bg-brand-dark text-slate-300 py-2.5 border-b border-slate-800 text-xs font-semibold">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-brand-gold" />
              {clinic.shortAddress}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-brand-gold" />
              {clinic.openDays}: {clinic.hours}
            </span>
          </div>
          <div className="flex items-center gap-4">
            {clinic.facebook && (
              <a href={clinic.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold transition-colors inline-flex items-center gap-1">
                <FacebookIcon className="w-3.5 h-3.5" />
                Facebook
              </a>
            )}
            {clinic.instagram && (
              <>
                <span className="text-slate-700">|</span>
                <a href={clinic.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold transition-colors inline-flex items-center gap-1">
                  <InstagramIcon className="w-3.5 h-3.5" />
                  Instagram
                </a>
              </>
            )}
            {clinic.open7Days && (
              <>
                <span className="text-slate-700">|</span>
                <span className="text-emerald-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Open 7 Days a Week
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Header / Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-brand-silver/80 transition-shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">

            <button onClick={() => setPage('home')} className="flex items-center gap-3 focus-visible:ring-brand-accent text-left group">
              <BrandLogo size="w-11 h-11" />
              <div>
                <span className="text-lg font-black tracking-wide block text-brand-dark leading-none group-hover:text-brand-accent transition-colors">
                  {clinic.name}
                </span>
                <span className="text-[10px] font-bold text-brand-slate tracking-[0.22em] uppercase block mt-1">
                  {clinic.suffix}
                </span>
              </div>
            </button>

            <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-brand-slate">
              {[
                ['home', 'Home'],
                ['services', 'Services & Specialties'],
                ['contact', 'Contact & Location'],
              ].map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setPage(key)}
                  className={`py-2 border-b-2 hover:text-brand-dark transition-all ${page === key ? 'border-brand-accent text-brand-dark' : 'border-transparent'}`}
                >
                  {label}
                </button>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-4">
              <a href={`tel:${clinic.phoneIntl}`} className="flex items-center gap-2 text-sm font-bold text-brand-dark hover:text-brand-accent transition-colors">
                <div className="w-8 h-8 rounded-full bg-brand-accent/10 border border-brand-accent/30 flex items-center justify-center text-brand-accent">
                  <Phone className="w-4 h-4" />
                </div>
                <span>{clinic.phoneDisplay}</span>
              </a>
              <a
                href={clinic.bookingPortal || '#contact'}
                target={clinic.bookingPortal ? '_blank' : undefined}
                rel={clinic.bookingPortal ? 'noopener noreferrer' : undefined}
                onClick={clinic.bookingPortal ? undefined : (e) => { e.preventDefault(); setPage('contact'); }}
                className="bg-brand-dark hover:opacity-90 text-brand-gold border border-brand-gold/40 text-xs font-bold px-5 py-3 rounded-xl transition-all shadow-sm inline-flex items-center gap-1.5"
              >
                Book Now
                {clinic.bookingPortal && <ExternalLink className="w-3.5 h-3.5" />}
              </a>
            </div>

            <div className="flex md:hidden items-center gap-3">
              <a
                href={`tel:${clinic.phoneIntl}`}
                className="bg-brand-accent text-white p-3 rounded-xl shadow-md flex items-center justify-center"
                aria-label={`Call ${clinic.name} directly`}
              >
                <Phone className="w-5 h-5" />
              </a>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-brand-dark hover:text-brand-accent"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-brand-silver bg-white px-4 py-6 space-y-4 shadow-xl animate-fade-in">
            <nav className="flex flex-col gap-2">
              {[
                ['home', 'Home'],
                ['services', 'Services & Specialties'],
                ['contact', 'Contact & Location'],
              ].map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setPage(key)}
                  className={`text-left font-bold py-3 px-4 rounded-xl text-base ${page === key ? 'bg-brand-accent/10 text-brand-dark border border-brand-accent/30' : 'text-brand-slate'}`}
                >
                  {label}
                </button>
              ))}
            </nav>
            <div className="border-t border-brand-silver pt-4 flex flex-col gap-3">
              <a href={`tel:${clinic.phoneIntl}`} className="flex items-center justify-center gap-2 bg-brand-dark text-white font-bold py-3.5 rounded-xl text-sm">
                <Phone className="w-4 h-4 text-brand-gold" />
                Call / Text: {clinic.phoneDisplay}
              </a>
              <a
                href={clinic.bookingPortal || '#contact'}
                target={clinic.bookingPortal ? '_blank' : undefined}
                rel={clinic.bookingPortal ? 'noopener noreferrer' : undefined}
                onClick={clinic.bookingPortal ? undefined : (e) => { e.preventDefault(); setPage('contact'); }}
                className="w-full bg-brand-accent hover:bg-brand-accentHover text-white font-bold py-3.5 rounded-xl text-sm shadow-md flex items-center justify-center gap-2"
              >
                Book Now
                {clinic.bookingPortal && <ExternalLink className="w-4 h-4" />}
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Sticky Call Button for Mobile */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 z-40">
        <a
          href={`tel:${clinic.phoneIntl}`}
          className="flex items-center justify-center gap-3 bg-brand-dark text-brand-gold font-bold py-4 rounded-2xl shadow-xl shadow-black/30 border border-brand-gold/50 animate-pulse-subtle"
        >
          <Phone className="w-5 h-5 animate-pulse text-brand-gold" />
          Call / Text Clinic: {clinic.phoneDisplay}
        </a>
      </div>

      <main className="flex-grow pb-16 md:pb-0">
        {page === 'home' && <Home setPage={setPage} />}
        {page === 'services' && <Services />}
        {page === 'contact' && <Contact />}
      </main>

      {/* Footer */}
      <footer className="brand-gradient-slate text-slate-300 border-t border-slate-800 py-16 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">

            <div className="lg:col-span-4 space-y-6">
              <div className="flex items-center gap-3 text-white">
                <BrandLogo size="w-12 h-12" />
                <div>
                  <span className="text-xl font-black tracking-wide block leading-none">{clinic.name}</span>
                  <span className="text-[10px] font-bold text-brand-gold tracking-[0.22em] uppercase block mt-1">{clinic.suffix}</span>
                </div>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
                <strong className="text-slate-200">{clinic.tagline}.</strong> Serving {clinic.city} & {clinic.region} with comprehensive general, cosmetic, pediatric, orthodontic, prosthodontic, endodontic, and oral surgery care.
              </p>
              <div className="flex items-center gap-2 bg-slate-900/80 border border-brand-gold/20 p-3 rounded-xl text-[11px] text-slate-300 max-w-xs">
                <Sparkles className="w-4 h-4 text-brand-gold shrink-0" />
                <span>Gentle Care • Honest Consults • Attentive Aftercare</span>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Quick Links</h4>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li><button onClick={() => setPage('home')} className="hover:text-brand-gold transition-colors">Home</button></li>
                <li><button onClick={() => setPage('services')} className="hover:text-brand-gold transition-colors">Dental Specialties</button></li>
                <li><button onClick={() => setPage('contact')} className="hover:text-brand-gold transition-colors">Book Appointment</button></li>
                {clinic.bookingPortal && (
                  <li>
                    <a href={clinic.bookingPortal} target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold transition-colors inline-flex items-center gap-1">
                      Online Booking Portal
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </li>
                )}
              </ul>
            </div>

            <div className="lg:col-span-3 space-y-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">{clinic.city} Clinic</h4>
              <ul className="space-y-3.5 text-xs text-slate-400">
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                  <span>{clinic.addressLine1}, {clinic.addressLine2}, {clinic.city}, {clinic.postalCode}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-brand-gold shrink-0" />
                  <a href={`tel:${clinic.phoneIntl}`} className="hover:text-brand-gold font-bold text-slate-200">{clinic.phoneIntl.replace('+63', '+63 ')}</a>
                </li>
                <li className="flex items-center gap-3 pt-1">
                  {clinic.facebook && (
                    <a href={clinic.facebook} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 bg-slate-900 border border-slate-800 hover:border-brand-gold/50 px-3 py-1.5 rounded-lg text-slate-300 hover:text-brand-gold transition-colors">
                      <FacebookIcon className="w-3.5 h-3.5" />
                      Facebook
                    </a>
                  )}
                  {clinic.instagram && (
                    <a href={clinic.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 bg-slate-900 border border-slate-800 hover:border-brand-gold/50 px-3 py-1.5 rounded-lg text-slate-300 hover:text-brand-gold transition-colors">
                      <InstagramIcon className="w-3.5 h-3.5" />
                      Instagram
                    </a>
                  )}
                </li>
              </ul>
            </div>

            <div className="lg:col-span-3 space-y-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Clinic Hours</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li className="flex justify-between">
                  <span>{clinic.openDays}</span>
                  <span className="font-semibold text-slate-200">{clinic.hours}</span>
                </li>
                <li className="border-t border-slate-800/80 pt-3 mt-3">
                  <span className="text-[10px] font-bold text-brand-gold block uppercase tracking-wider">Accepted Payments</span>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{clinic.payments.join(', ')}.</p>
                </li>
              </ul>
            </div>

          </div>

          <div className="border-t border-slate-800/80 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <p>© {new Date().getFullYear()} {clinic.name} {clinic.suffix} — {clinic.city}, {clinic.region}. All rights reserved.</p>
            <span>{clinic.tagline}</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
