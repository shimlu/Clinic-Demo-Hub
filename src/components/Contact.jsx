import React, { useState } from 'react';
import {
  Phone, MapPin, Clock, ShieldCheck, CheckCircle2,
  AlertCircle, Info, Navigation, ExternalLink, CreditCard
} from 'lucide-react';
import { FacebookIcon, InstagramIcon } from './SocialIcons';
import OfficeLocationPanel from './OfficeLocationPanel';
import { useClinic } from '../useClinic';

export default function Contact() {
  const clinic = useClinic();
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    patientType: 'New Patient',
    date: '',
    time: '',
    reason: '',
    notes: ''
  });

  // Validation State
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingId, setBookingId] = useState('');

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Form Validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full Name is required.";
    } else if (formData.name.length > 50) {
      newErrors.name = "Full Name cannot exceed 50 characters.";
    }

    const phoneRegex = /^[+]?[0-9\s-]{7,15}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "Mobile number is required.";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = `Please enter a valid mobile number (e.g. ${clinic.phoneDisplay}).`;
    } else if (formData.phone.length > 20) {
      newErrors.phone = "Mobile number cannot exceed 20 characters.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    } else if (formData.email.length > 80) {
      newErrors.email = "Email address cannot exceed 80 characters.";
    }

    const todayStr = new Date().toISOString().split('T')[0];
    if (!formData.date) {
      newErrors.date = "Please select a preferred date.";
    } else if (formData.date < todayStr) {
      newErrors.date = "Preferred date cannot be in the past.";
    }

    if (!formData.time) {
      newErrors.time = "Please select a preferred time.";
    }

    if (!formData.reason) {
      newErrors.reason = "Please select the reason for your visit.";
    }

    if (formData.notes && formData.notes.length > 500) {
      newErrors.notes = "Notes cannot exceed 500 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      // Generate booking reference (prefix = first letters of clinic slug)
      const refId = clinic.slug.replace(/[^a-z]/gi, '').slice(0, 3).toUpperCase() + "-" + Math.floor(100000 + Math.random() * 900000);
      setBookingId(refId);

      const webAppUrl = (import.meta.env.VITE_GOOGLE_SHEETS_WEBAPP_URL || "").trim();

      if (webAppUrl) {
        try {
          await fetch(webAppUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              ...formData,
              clinic: clinic.slug,
              bookingId: refId
            })
          });
        } catch (error) {
          console.error("Failed to write to Google Sheet:", error);
        }
      } else {
        console.log("No Google Sheet Web App URL configured. Data logged:", { ...formData, bookingId: refId });
        await new Promise(resolve => setTimeout(resolve, 800));
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
      window.scrollTo({ top: 200, behavior: 'smooth' });
    }
  };

  return (
    <div className="animate-fade-in bg-brand-light py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-accent mb-2">
            {clinic.name} {clinic.suffix} • {clinic.city}
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-dark mb-4">
            Book Your Dental Appointment
          </h1>
          <p className="text-slate-500 font-light">
            {clinic.openDays} ({clinic.hours}) at {clinic.shortAddress}. Request a schedule below or call/text us directly at <strong className="text-brand-dark">{clinic.phoneDisplay}</strong>.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Appointment Request Form (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-brand-silver shadow-sm">

            {isSubmitted ? (
              <div className="text-center py-8 space-y-6 animate-slide-up">
                <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-500">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl font-extrabold text-brand-dark">Appointment Request Received!</h2>
                  <p className="text-sm text-slate-500 max-w-md mx-auto">
                    Thank you, <span className="font-bold text-brand-dark">{formData.name}</span>. Your booking request for {clinic.name} {clinic.suffix} has been submitted.
                  </p>
                </div>

                {/* Booking summary card */}
                <div className="bg-brand-light border border-brand-silver rounded-2xl p-6 max-w-md mx-auto text-left space-y-3">
                  <div className="flex justify-between border-b border-brand-silver/60 pb-2 text-xs text-slate-400 font-bold">
                    <span>BOOKING REFERENCE</span>
                    <span className="text-brand-accent">{bookingId}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm pt-1">
                    <div>
                      <p className="text-xs text-slate-400">Preferred Date</p>
                      <p className="font-semibold text-brand-dark">{formData.date}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Preferred Time</p>
                      <p className="font-semibold text-brand-dark">{formData.time}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Patient Status</p>
                      <p className="font-semibold text-brand-dark">{formData.patientType}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Reason</p>
                      <p className="font-semibold text-brand-dark">{formData.reason}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 text-xs text-amber-900 flex items-start gap-3 max-w-md mx-auto text-left">
                  <Info className="w-4 h-4 shrink-0 mt-0.5 text-brand-accent" />
                  <p>
                    <strong>What happens next?</strong> Our front desk team will reach out via SMS or call at <strong>{formData.phone}</strong> to confirm your exact chair slot. Need urgent help? Text/call <strong>{clinic.phoneDisplay}</strong>.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: '', phone: '', email: '', patientType: 'New Patient', date: '', time: '', reason: '', notes: '' });
                  }}
                  className="bg-brand-dark hover:bg-slate-800 text-brand-gold font-bold px-6 py-3 rounded-xl transition-all text-sm"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">

                {/* MyDMD / Privacy Header Banner */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 border border-slate-200/80 rounded-xl p-4 text-xs text-slate-600">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-brand-accent shrink-0" />
                    <div>
                      <span className="font-bold text-brand-dark block">Fast Clinic Scheduling</span>
                      Confidential patient intake • {clinic.openDays}
                    </div>
                  </div>
                  {clinic.bookingPortal && (
                    <a
                      href={clinic.bookingPortal}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-brand-accent hover:text-brand-accentHover font-bold whitespace-nowrap"
                    >
                      Online Booking Portal
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-xs font-bold text-brand-dark uppercase tracking-wider">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      maxLength={50}
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Juan Dela Cruz"
                      className={`w-full bg-slate-50 border ${errors.name ? 'border-rose-400 focus:ring-rose-200' : 'border-brand-silver focus:ring-amber-100'} rounded-xl px-4 py-3 text-sm transition-all focus:border-brand-accent focus:bg-white`}
                    />
                    {errors.name && (
                      <p className="text-xs text-rose-500 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Mobile Number */}
                  <div className="space-y-2">
                    <label htmlFor="phone" className="block text-xs font-bold text-brand-dark uppercase tracking-wider">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      maxLength={20}
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={`e.g. ${clinic.phoneDisplay}`}
                      className={`w-full bg-slate-50 border ${errors.phone ? 'border-rose-400 focus:ring-rose-200' : 'border-brand-silver focus:ring-amber-100'} rounded-xl px-4 py-3 text-sm transition-all focus:border-brand-accent focus:bg-white`}
                    />
                    {errors.phone && (
                      <p className="text-xs text-rose-500 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Email Address */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-xs font-bold text-brand-dark uppercase tracking-wider">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      maxLength={80}
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. you@gmail.com"
                      className={`w-full bg-slate-50 border ${errors.email ? 'border-rose-400 focus:ring-rose-200' : 'border-brand-silver focus:ring-amber-100'} rounded-xl px-4 py-3 text-sm transition-all focus:border-brand-accent focus:bg-white`}
                    />
                    {errors.email && (
                      <p className="text-xs text-rose-500 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Patient Type */}
                  <div className="space-y-2">
                    <label htmlFor="patientType" className="block text-xs font-bold text-brand-dark uppercase tracking-wider">
                      Patient Status
                    </label>
                    <select
                      id="patientType"
                      name="patientType"
                      value={formData.patientType}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-brand-silver rounded-xl px-4 py-3 text-sm transition-all focus:border-brand-accent focus:bg-white focus:ring-amber-100"
                    >
                      <option value="New Patient">New Patient</option>
                      <option value="Existing Patient">Existing / Returning Patient</option>
                    </select>
                  </div>

                  {/* Preferred Date */}
                  <div className="space-y-2">
                    <label htmlFor="date" className="block text-xs font-bold text-brand-dark uppercase tracking-wider">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      min={new Date().toISOString().split('T')[0]}
                      value={formData.date}
                      onChange={handleChange}
                      className={`w-full bg-slate-50 border ${errors.date ? 'border-rose-400 focus:ring-rose-200' : 'border-brand-silver focus:ring-amber-100'} rounded-xl px-4 py-3 text-sm transition-all focus:border-brand-accent focus:bg-white`}
                    />
                    {errors.date && (
                      <p className="text-xs text-rose-500 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.date}
                      </p>
                    )}
                  </div>

                  {/* Preferred Time */}
                  <div className="space-y-2">
                    <label htmlFor="time" className="block text-xs font-bold text-brand-dark uppercase tracking-wider">
                      Preferred Time Slot *
                    </label>
                    <select
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className={`w-full bg-slate-50 border ${errors.time ? 'border-rose-400 focus:ring-rose-200' : 'border-brand-silver focus:ring-amber-100'} rounded-xl px-4 py-3 text-sm transition-all focus:border-brand-accent focus:bg-white`}
                    >
                      <option value="">Select a time...</option>
                      <option value="8:00 AM - 9:00 AM">8:00 AM - 9:00 AM</option>
                      <option value="9:00 AM - 10:00 AM">9:00 AM - 10:00 AM</option>
                      <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
                      <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</option>
                      <option value="1:00 PM - 2:00 PM">1:00 PM - 2:00 PM</option>
                      <option value="2:00 PM - 3:00 PM">2:00 PM - 3:00 PM</option>
                      <option value="3:00 PM - 4:00 PM">3:00 PM - 4:00 PM</option>
                      <option value="4:00 PM - 5:00 PM">4:00 PM - 5:00 PM</option>
                      <option value="5:00 PM - 6:00 PM">5:00 PM - 6:00 PM</option>
                    </select>
                    {errors.time && (
                      <p className="text-xs text-rose-500 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.time}
                      </p>
                    )}
                  </div>

                  {/* Reason for Visit */}
                  <div className="space-y-2 sm:col-span-2">
                    <label htmlFor="reason" className="block text-xs font-bold text-brand-dark uppercase tracking-wider">
                      Reason for Appointment *
                    </label>
                    <select
                      id="reason"
                      name="reason"
                      value={formData.reason}
                      onChange={handleChange}
                      className={`w-full bg-slate-50 border ${errors.reason ? 'border-rose-400 focus:ring-rose-200' : 'border-brand-silver focus:ring-amber-100'} rounded-xl px-4 py-3 text-sm transition-all focus:border-brand-accent focus:bg-white`}
                    >
                      <option value="">Select dental service...</option>
                      <option value="Dental Checkup & Consultation">Dental Checkup & Consultation</option>
                      <option value="Dental Cleaning (Oral Prophylaxis)">Dental Cleaning (Oral Prophylaxis)</option>
                      <option value="Dental Pain / Urgent Relief">Dental Pain / Urgent Relief</option>
                      <option value="Tooth Filling (Pasta)">Tooth Filling (Pasta)</option>
                      <option value="Tooth Extraction (Bunot) / Wisdom Tooth Removal">Tooth Extraction (Bunot) / Wisdom Tooth Removal</option>
                      <option value="Orthodontic Braces / Adjustment">Orthodontic Braces / Adjustment</option>
                      <option value="Root Canal / Crowns / Bridges / Veneers">Root Canal / Crowns / Bridges / Veneers</option>
                      <option value="Teeth Whitening / Cosmetic Dentistry">Teeth Whitening / Cosmetic Dentistry</option>
                      <option value="Pediatric Dental Visit">Pediatric Dental Visit</option>
                    </select>
                    {errors.reason && (
                      <p className="text-xs text-rose-500 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.reason}
                      </p>
                    )}
                  </div>

                  {/* Additional Notes */}
                  <div className="space-y-2 sm:col-span-2">
                    <div className="flex justify-between items-center">
                      <label htmlFor="notes" className="block text-xs font-bold text-brand-dark uppercase tracking-wider">
                        Symptoms or Notes (Optional)
                      </label>
                      {errors.notes && (
                        <span className="text-xs text-rose-500 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.notes}
                        </span>
                      )}
                    </div>
                    <textarea
                      id="notes"
                      name="notes"
                      rows="3"
                      maxLength={500}
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Describe any tooth pain, swelling, preferred dentist, or questions..."
                      className={`w-full bg-slate-50 border ${errors.notes ? 'border-rose-400 focus:ring-rose-200' : 'border-brand-silver focus:ring-amber-100'} rounded-xl px-4 py-3 text-sm focus:border-brand-accent focus:bg-white transition-all resize-none`}
                    ></textarea>
                    <div className="flex justify-between text-[10px] text-slate-400 px-1">
                      <span>Briefly note symptoms or preferred schedule</span>
                      <span>{formData.notes ? formData.notes.length : 0} / 500 characters</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-brand-dark hover:bg-slate-800 text-brand-gold border border-brand-gold/40 text-base font-extrabold py-4 rounded-xl shadow-lg transition-all duration-200 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? 'Sending Request...' : 'Request Appointment'}
                  </button>
                  <p className="text-center text-[10px] text-slate-400 mt-3">
                    Our clinic team will confirm your exact appointment slot via SMS or call.
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Contact Details, Hours & Payments (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">

            {/* NAP & Contact Info Box */}
            <div className="bg-brand-dark text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-lg space-y-6">
              <div>
                <span className="text-[10px] font-extrabold tracking-widest text-brand-gold uppercase">
                  Clinic Information
                </span>
                <h2 className="text-2xl font-extrabold mt-1">{clinic.name} {clinic.suffix}</h2>
              </div>

              <div className="space-y-4">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${clinic.lat},${clinic.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-800/80 transition-colors group"
                >
                  <MapPin className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-slate-400 block font-semibold">{clinic.city} Location</span>
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
                  className="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-800/80 transition-colors group"
                >
                  <Phone className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-slate-400 block font-semibold">Call / Text Direct</span>
                    <span className="text-sm font-bold group-hover:text-brand-gold">
                      {clinic.phoneDisplay}
                    </span>
                  </div>
                </a>

                <div className="flex flex-wrap gap-2.5 px-3 pt-1">
                  {clinic.facebook && (
                    <a
                      href={clinic.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-slate-900 border border-slate-700 hover:border-brand-gold/60 text-xs font-semibold px-3.5 py-2 rounded-xl text-slate-200 hover:text-brand-gold transition-colors"
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
                      className="inline-flex items-center gap-1.5 bg-slate-900 border border-slate-700 hover:border-brand-gold/60 text-xs font-semibold px-3.5 py-2 rounded-xl text-slate-200 hover:text-brand-gold transition-colors"
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
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full">
                    Open 7 Days
                  </span>
                )}
              </div>

              <div className="divide-y divide-brand-silver/50 text-sm">
                {[
                  { days: clinic.openDays, hours: clinic.hours },
                ].map((row, idx) => (
                  <div key={idx} className="flex justify-between py-3">
                    <span className="font-semibold text-brand-dark">{row.days}</span>
                    <span className="text-slate-600 font-bold">{row.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Landmarks & Accepted Payments Card */}
            <div className="bg-white rounded-3xl p-6 border border-brand-silver shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-brand-accent" />
                  <h4 className="text-sm font-bold text-brand-dark">Payments & Landmarks</h4>
                </div>
              </div>

              <div className="text-xs text-slate-500 space-y-2 leading-relaxed">
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
                View Live Map & Directions &darr;
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
            <p className="text-slate-500 text-sm mt-1">
              View the live Google Map pin and directions to our clinic.
            </p>
          </div>
          <OfficeLocationPanel />
        </div>

      </div>
    </div>
  );
}
