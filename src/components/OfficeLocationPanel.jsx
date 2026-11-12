import React, { useState } from 'react';
import { MapPin, Smartphone, Clock, ExternalLink, Star, Navigation, Compass, Map as MapIcon, Car, ShieldCheck } from 'lucide-react';
import { useClinic } from '../useClinic';

export default function OfficeLocationPanel() {
  const clinic = useClinic();
  const [mapMode, setMapMode] = useState('google'); // 'google' | 'landmark'
  const hasLandmarkMap = Boolean(clinic.landmarkMap);

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${clinic.lat},${clinic.lng}`;
  const googleDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${clinic.lat},${clinic.lng}`;
  const embedUrl = `https://maps.google.com/maps?q=${clinic.lat},${clinic.lng}+(${encodeURIComponent(clinic.name + ' ' + clinic.suffix)})&t=&z=17&ie=UTF8&iwloc=B&output=embed`;

  return (
    <div className="w-full bg-brand-dark text-white rounded-3xl overflow-hidden border border-slate-800 shadow-2xl my-10">
      <div className="grid lg:grid-cols-12 min-h-[540px]">

        {/* Left Column: Office Details */}
        <div className="lg:col-span-5 p-8 sm:p-12 lg:p-14 flex flex-col justify-between brand-gradient-slate border-b lg:border-b-0 lg:border-r border-slate-800/80">
          <div className="space-y-8">

            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-brand-gold mb-2 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse"></span>
                {clinic.region}
              </p>
              <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white lowercase leading-none font-sans">
                our {clinic.city.toLowerCase()}<br />
                <span className="text-brand-gold">office</span>
              </h2>
              <div className="w-16 h-1 bg-brand-gold rounded-full mt-4"></div>
            </div>

            <div className="space-y-6 text-sm">

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="text-brand-gold mt-1">
                  <Compass className="w-6 h-6 stroke-[1.75]" />
                </div>
                <div className="space-y-1">
                  <p className="text-white text-base font-bold leading-snug">{clinic.addressLine1}</p>
                  <p className="text-slate-300 leading-relaxed">
                    {clinic.addressLine2},<br />
                    {clinic.city}, {clinic.region} {clinic.postalCode}
                  </p>
                  <p className="text-xs text-brand-gold/90 font-medium pt-0.5">Landmark: {clinic.landmark}</p>
                  <a
                    href={googleDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-brand-gold hover:opacity-80 font-semibold underline underline-offset-4 pt-1 transition-colors"
                  >
                    Get Directions
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="text-brand-gold mt-1">
                  <Smartphone className="w-6 h-6 stroke-[1.75]" />
                </div>
                <div className="space-y-1">
                  <a
                    href={`tel:${clinic.phoneIntl}`}
                    className="text-white hover:text-brand-gold font-bold text-base underline underline-offset-4 transition-colors block"
                  >
                    Call / Text {clinic.phoneDisplay}
                  </a>
                  <p className="text-xs text-slate-400">Direct line for appointments, dental pain & inquiries</p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4">
                <div className="text-brand-gold mt-1">
                  <Clock className="w-6 h-6 stroke-[1.75]" />
                </div>
                <div className="w-full space-y-1.5 pt-0.5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Clinic Schedule</span>
                    {clinic.open7Days && (
                      <span className="text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                        Open 7 Days
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between items-center text-xs text-slate-300 border-b border-slate-800/60 pb-1">
                    <span className="font-medium text-slate-400">{clinic.openDays}:</span>
                    <span className="text-slate-100 font-semibold">{clinic.hours}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
            <span className="inline-flex items-center gap-1.5 text-[11px] bg-slate-900 border border-slate-800 text-slate-200 px-3 py-1.5 rounded-lg">
              <Car className="w-3.5 h-3.5 text-brand-gold" />
              Easy Access & Parking
            </span>
            <span className="inline-flex items-center gap-1.5 text-[11px] bg-slate-900 border border-slate-800 text-slate-200 px-3 py-1.5 rounded-lg">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-gold" />
              {clinic.city}
            </span>
          </div>
        </div>

        {/* Right Column: Map */}
        <div className="lg:col-span-7 relative min-h-[460px] lg:min-h-full bg-slate-900 overflow-hidden flex flex-col">

          {/* Switcher bar (landmark toggle only appears when this clinic has a landmark image) */}
          <div className="bg-slate-950 border-b border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-2 z-20">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Clinic Map View</span>
            <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-700/80 shadow-sm">
              <button
                type="button"
                onClick={() => setMapMode('google')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all inline-flex items-center gap-1.5 ${mapMode === 'google' ? 'bg-brand-gold text-brand-dark' : 'text-slate-300 hover:text-white'}`}
              >
                <MapPin className="w-3.5 h-3.5" />
                Live Map
              </button>
              {hasLandmarkMap && (
                <button
                  type="button"
                  onClick={() => setMapMode('landmark')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all inline-flex items-center gap-1.5 ${mapMode === 'landmark' ? 'bg-brand-gold text-brand-dark' : 'text-slate-300 hover:text-white'}`}
                >
                  <MapIcon className="w-3.5 h-3.5" />
                  Landmark Guide
                </button>
              )}
            </div>
          </div>

          <div className="relative flex-grow flex flex-col">
            {mapMode === 'google' && (
              <div className="bg-white text-slate-900 p-4 border-b border-slate-200 sm:border sm:rounded-xl sm:shadow-2xl sm:absolute sm:top-4 sm:left-4 sm:z-20 sm:max-w-[300px] animate-fade-in">
                <div className="space-y-2">
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-slate-900 leading-tight">
                      {clinic.name} {clinic.suffix}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-snug">{clinic.shortAddress}, {clinic.postalCode}</p>
                  </div>

                  <div className="flex items-center gap-1 text-xs">
                    <span className="font-bold text-slate-800">{clinic.rating}</span>
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium text-xs ml-1">
                      {clinic.city}
                    </a>
                  </div>

                  <div className="pt-1 flex items-center gap-2">
                    <a
                      href={googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-brand-dark hover:opacity-90 text-brand-gold text-xs font-bold px-3.5 py-1.5 rounded-lg shadow-sm transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Open in Maps
                    </a>
                    <a
                      href={googleDirectionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-brand-accent/10 hover:bg-brand-accent/20 text-brand-accent transition-colors shadow-sm border border-brand-accent/30"
                      title="Get Directions"
                    >
                      <Navigation className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            )}

            {mapMode === 'google' || !hasLandmarkMap ? (
              <iframe
                title={`${clinic.name} ${clinic.suffix} Map`}
                src={embedUrl}
                className="w-full h-[360px] sm:h-full sm:min-h-[440px] lg:min-h-full border-0 filter contrast-[1.02]"
                loading="lazy"
                allowFullScreen
              ></iframe>
            ) : (
              <div className="w-full h-full min-h-[380px] sm:min-h-[440px] bg-slate-100 flex flex-col items-center justify-center p-4 sm:p-8">
                <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-300 bg-white max-w-2xl w-full">
                  <img
                    src={clinic.landmarkMap}
                    alt={`${clinic.name} landmark guide`}
                    className="w-full h-auto object-contain"
                  />
                </div>
                <p className="text-xs text-slate-600 font-semibold mt-3 text-center">{clinic.landmark}</p>
              </div>
            )}
          </div>

          <div className="bg-slate-950/95 border-t border-slate-800 px-4 py-2.5 text-xs text-slate-400 flex flex-wrap justify-between items-center gap-2 z-10">
            <span className="flex items-center gap-1.5 text-slate-300 text-[11px]">
              <MapPin className="w-3.5 h-3.5 text-brand-gold" />
              {clinic.landmark}
            </span>
            <a
              href={googleDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-gold hover:opacity-80 font-semibold text-[11px] inline-flex items-center gap-1"
            >
              Start GPS Navigation &rarr;
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}
