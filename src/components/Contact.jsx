import React from 'react';
import {
  Phone, MapPin, Clock, Calendar, CheckCircle2,
  Navigation, ExternalLink, CreditCard, Mail
} from 'lucide-react';
import { FacebookIcon, InstagramIcon } from './SocialIcons';
import OfficeLocationPanel from './OfficeLocationPanel';
import { useClinic } from '../useClinic';

export default function Contact() {
  const clinic = useClinic();

  return (
    <div className="animate-fade-in bg-brand-light py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-accent mb-2">
            {clinic.name} {clinic.suffix} • {clinic.city}
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-dark mb-4">
            Book &amp; Contact Us
          </h1>
          <p className="text-brand-slate font-normal">
            {clinic.openDays} ({clinic.hours}) at {clinic.shortAddress}. Book directly through our online portal or call/text us at <strong className="text-brand-dark">{clinic.phoneDisplay}</strong>.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Direct Online Booking Card (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-brand-silver shadow-sm space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 bg-brand-accent/10 border border-brand-accent/25 text-brand-accent px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                <Calendar className="w-3.5 h-3.5" />
                Official Online Booking
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-dark">
                Schedule Your Dental Visit Online
              </h2>
              <p className="text-sm text-brand-slate leading-relaxed">
                Reserve your preferred date, time, and dental service directly on {clinic.name}&apos;s official MyMedsPH booking page.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { step: '01', title: 'Choose Service', desc: 'Pick checkup, cleaning, braces, or treatment.' },
                { step: '02', title: 'Pick Your Slot', desc: 'Select a date & time that fits your schedule.' },
                { step: '03', title: 'Visit Clinic', desc: `Head to ${clinic.addressLine1} in ${clinic.city}.` },
              ].map((item) => (
                <div key={item.step} className="bg-brand-light border border-brand-silver rounded-2xl p-4 space-y-1.5">
                  <span className="text-xs font-black text-brand-accent tracking-wider">{item.step}</span>
                  <h3 className="text-sm font-bold text-brand-dark">{item.title}</h3>
                  <p className="text-xs text-brand-slate leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              {clinic.bookingPortal && (
                <a
                  href={clinic.bookingPortal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-brand-accent hover:bg-brand-accentHover text-white font-bold px-8 py-4 rounded-2xl shadow-lg shadow-brand-accent/20 transition-all text-base"
                >
                  <Calendar className="w-5 h-5" />
                  Book Now
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              <a
                href={`tel:${clinic.phoneIntl}`}
                className="inline-flex items-center justify-center gap-2 bg-brand-light hover:bg-[#EFEAD6] text-brand-dark font-bold px-6 py-4 rounded-2xl border border-brand-silver transition-all text-sm"
              >
                <Phone className="w-4 h-4 text-brand-accent" />
                Call / Text: {clinic.phoneDisplay}
              </a>
            </div>

            <div className="border-t border-brand-silver/70 pt-6 flex flex-wrap items-center gap-6 text-xs text-brand-slate">
              <span className="inline-flex items-center gap-2 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-brand-accent" />
                Walk-ins welcome subject to slot availability
              </span>
              {clinic.email && (
                <a href={`mailto:${clinic.email}`} className="inline-flex items-center gap-1.5 font-semibold hover:text-brand-accent transition-colors">
                  <Mail className="w-4 h-4 text-brand-accent" />
                  {clinic.email}
                </a>
              )}
            </div>
          </div>

          {/* Right Column: Clinic Details, Hours & Payments (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">

            {/* Dark Olive Info Card */}
            <div className="brand-gradient-slate text-white rounded-3xl p-6 sm:p-8 border border-brand-cardDark shadow-xl space-y-6">
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-brand-gold">Direct Clinic Info</span>
                <span className="w-2.5 h-2.5 rounded-full bg-brand-gold animate-pulse"></span>
              </div>

              <div className="space-y-4">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${clinic.lat},${clinic.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors group"
                >
                  <MapPin className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-white/60 block font-semibold">{clinic.city} Location</span>
                    <span className="text-sm font-medium leading-relaxed group-hover:text-brand-gold">
                      {clinic.addressLine1},<br />
                      {clinic.addressLine2},<br />
                      {clinic.city}, {clinic.postalCode}
                    </span>
                    <span className="text-xs text-brand-gold block mt-1">
                      {clinic.landmark}
                    </span>
                  </div>
                </a>

                <a
                  href={`tel:${clinic.phoneIntl}`}
                  className="flex items-start gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors group"
                >
                  <Phone className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-white/60 block font-semibold">Call / Text Direct</span>
                    <span className="text-sm font-bold group-hover:text-brand-gold">
                      {clinic.phoneDisplay}
                    </span>
                  </div>
                </a>

                {clinic.email && (
                  <a
                    href={`mailto:${clinic.email}`}
                    className="flex items-start gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors group"
                  >
                    <Mail className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs text-white/60 block font-semibold">Email</span>
                      <span className="text-sm font-semibold group-hover:text-brand-gold">
                        {clinic.email}
                      </span>
                    </div>
                  </a>
                )}

                <div className="flex flex-wrap gap-2.5 px-3 pt-1">
                  {clinic.facebook && (
                    <a
                      href={clinic.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-black/25 border border-white/15 hover:border-brand-gold/60 text-xs font-semibold px-3.5 py-2 rounded-xl text-white/90 hover:text-brand-gold transition-colors"
                    >
                      <FacebookIcon className="w-3.5 h-3.5" />
                      Facebook Page
                    </a>
                  )}
                  {clinic.instagram && (
                    <a
                      href={clinic.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-black/25 border border-white/15 hover:border-brand-gold/60 text-xs font-semibold px-3.5 py-2 rounded-xl text-white/90 hover:text-brand-gold transition-colors"
                    >
                      <InstagramIcon className="w-3.5 h-3.5" />
                      Instagram
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Clinic Hours Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-silver shadow-sm space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-brand-accent" />
                  <h3 className="text-lg font-bold text-brand-dark">Clinic Hours</h3>
                </div>
                {clinic.open7Days && (
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-brand-accent/10 text-brand-accent border border-brand-accent/25 px-2.5 py-1 rounded-full">
                    Open 7 Days
                  </span>
                )}
              </div>

              <div className="divide-y divide-brand-silver/50 text-sm">
                <div className="flex justify-between py-3">
                  <span className="font-semibold text-brand-dark">{clinic.openDays}</span>
                  <span className="text-brand-slate font-bold">{clinic.hours}</span>
                </div>
              </div>
            </div>

            {/* Landmarks & Accepted Payments Card */}
            <div className="bg-white rounded-3xl p-6 border border-brand-silver shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-brand-accent" />
                <h4 className="text-sm font-bold text-brand-dark">Payments &amp; Landmarks</h4>
              </div>

              <div className="text-xs text-brand-slate space-y-2 leading-relaxed">
                <p>
                  <strong>Accepted Payments:</strong> {clinic.payments.join(', ')}.
                </p>
                <p>
                  <strong>Easy Landmarks:</strong> {clinic.landmark}.
                </p>
              </div>

              <a
                href="#office-map"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-accent hover:text-brand-accentHover pt-1"
              >
                <Navigation className="w-3.5 h-3.5" />
                View Live Map &amp; Directions &darr;
              </a>
            </div>

          </div>

        </div>

        {/* Full-Width Interactive Google Map & Office Details Showcase */}
        <div id="office-map" className="mt-16 pt-4">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-dark">
              Visit {clinic.name} in {clinic.city}
            </h2>
            <p className="text-brand-slate text-sm mt-1">
              View the live Google Map pin and directions to our clinic.
            </p>
          </div>
          <OfficeLocationPanel />
        </div>

      </div>
    </div>
  );
}
