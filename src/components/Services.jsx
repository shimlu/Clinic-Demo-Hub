import React from 'react';
import {
  Shield, Sparkles, Activity, PlusSquare,
  Smile, Phone, CheckCircle, ShieldCheck
} from 'lucide-react';
import { useClinic } from '../useClinic';

export default function Services() {
  const clinic = useClinic();
  const serviceCategories = [
    {
      title: "General & Pediatric Dentistry",
      subtitle: "Preventive care and gentle visits for adults and children",
      icon: <Shield className="w-6 h-6 text-brand-accent" />,
      items: [
        {
          name: "Dental Checkups & Consultations",
          image: "/services/checkup.jpg",
          tag: "General Dentistry",
          desc: "Thorough oral examinations with honest, transparent treatment plans explained clearly before any procedure begins."
        },
        {
          name: "Oral Prophylaxis (Dental Cleaning)",
          image: "/services/cleaning.jpg",
          tag: "Preventive Care",
          desc: "Gentle plaque, stain, and tartar removal combined with polishing to protect your gums and keep your smile fresh."
        },
        {
          name: "Tooth Fillings (Pasta) & Pediatric Care",
          image: "/services/fillings.jpg",
          tag: "Pediatric & Restorative",
          desc: "Natural tooth-colored composite fillings and calm, kid-friendly pediatric checkups designed to build lifelong healthy habits."
        }
      ]
    },
    {
      title: "Cosmetic Dentistry & Orthodontics",
      subtitle: "Enhance alignment, brightness, and smile confidence",
      icon: <Sparkles className="w-6 h-6 text-brand-gold" />,
      items: [
        {
          name: "Orthodontic Braces",
          image: "/services/braces.jpg",
          tag: "Orthodontics",
          desc: "Customized braces and regular monthly adjustments to gently align teeth, correct bites, and craft balanced smiles."
        },
        {
          name: "Professional Teeth Whitening",
          image: "/services/whitening.jpg",
          tag: "Cosmetic Dentistry",
          desc: "Safe, clinically supervised whitening treatments that noticeably brighten tooth enamel without harsh sensitivity."
        },
        {
          name: "Custom Porcelain Veneers",
          image: "/services/veneers.jpg",
          tag: "Smile Makeover",
          desc: "Ultra-thin, natural-looking veneers designed to refine tooth shape, close small gaps, and revitalize worn smiles."
        }
      ]
    },
    {
      title: "Prosthodontics, Endodontics & Oral Surgery",
      subtitle: "Precision restoration, tooth-saving care & gentle extractions",
      icon: <PlusSquare className="w-6 h-6 text-brand-dark" />,
      items: [
        {
          name: "Crowns, Bridges & Prosthodontics",
          image: "/services/crowns.jpg",
          tag: "Prosthodontics",
          desc: "Durable, finely crafted dental crowns and fixed bridges engineered to match natural teeth and restore chewing strength."
        },
        {
          name: "Root Canal Treatment (Endodontics)",
          image: "/services/rootcanal.jpg",
          tag: "Endodontics",
          desc: "Comfortable root canal therapy that eliminates deep tooth infection and preserves your natural tooth structure."
        },
        {
          name: "Extractions (Bunot) & Wisdom Tooth Removal",
          image: "/services/extraction.jpg",
          tag: "Oral Surgery",
          desc: "Safe routine extractions and impacted wisdom tooth surgery—backed by attentive post-procedure follow-up care."
        }
      ]
    }
  ];

  const painReliefServices = [
    "Acute Toothache & Dental Pain Management",
    "Wisdom Tooth Swelling & Impaction Relief",
    "Broken, Chipped, or Loose Restorations",
    "Gum Infections & Same-Day Dental Checkups"
  ];

  return (
    <div className="animate-fade-in">
      {/* Page Header */}
      <section className="bg-brand-dark py-16 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/35 via-brand-dark to-brand-dark z-0" />
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-gold mb-3">
            {clinic.name} {clinic.suffix} • {clinic.city}
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
            Our Dental Specialties & Services
          </h1>
          <p className="text-slate-300 font-light text-base max-w-2xl mx-auto">
            General Dentistry • Cosmetic Dentistry • Orthodontics • Pediatric Dentistry • Prosthodontics • Endodontics • Oral Surgery
          </p>
        </div>
      </section>

      {/* Dental Pain Relief Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="bg-gradient-to-r from-[#141820] via-[#1c222e] to-[#0a0c10] rounded-3xl p-6 sm:p-10 text-white shadow-xl border border-brand-gold/40">
          <div className="grid md:grid-cols-12 gap-8 items-center">
            {/* Left side */}
            <div className="md:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 bg-amber-500/15 border border-brand-gold/40 text-brand-gold px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                <Activity className="w-3.5 h-3.5 animate-pulse" />
                {clinic.openDays} ({clinic.hours})
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Experiencing Dental Pain? We're Open 7 Days a Week.
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed max-w-2xl">
                Whether it's a sudden toothache, wisdom tooth discomfort, or a broken tooth, visit us at {clinic.shortAddress} or contact us right away for prompt evaluation.
              </p>

              <div className="grid sm:grid-cols-2 gap-3 pt-2">
                {painReliefServices.map((service, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-slate-200 font-medium">
                    <CheckCircle className="w-4 h-4 text-brand-gold shrink-0" />
                    <span>{service}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side */}
            <div className="md:col-span-4 flex flex-col gap-3 text-center md:text-right">
              <a
                href={`tel:${clinic.phoneIntl}`}
                className="inline-flex items-center justify-center gap-2 bg-brand-gold hover:bg-amber-400 text-brand-dark text-base font-extrabold px-6 py-4 rounded-xl shadow-lg transition-transform hover:-translate-y-0.5"
              >
                <Phone className="w-5 h-5" />
                Call / Text Now
              </a>
              <p className="text-xs text-slate-400 font-semibold">
                Clinic Mobile: +63 917 163 0134
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Services Grid */}
      <section className="py-20 bg-brand-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {serviceCategories.map((category, catIdx) => (
              <div key={catIdx} className="space-y-8">
                <div className="border-b border-brand-silver pb-4 flex items-center gap-3">
                  <div className="p-3 bg-white rounded-xl shadow-sm border border-brand-silver">
                    {category.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-extrabold text-brand-dark">{category.title}</h2>
                    <p className="text-sm text-slate-500">{category.subtitle}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  {category.items.map((item, itemIdx) => (
                    <div
                      key={itemIdx}
                      className="group bg-white rounded-2xl border border-brand-silver overflow-hidden flex flex-col justify-between hover-lift shadow-sm"
                    >
                      <div>
                        {/* Visual Procedure Preview */}
                        <div className="relative h-48 w-full bg-slate-900 overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                          <span className="absolute bottom-3 left-4 bg-brand-dark/90 backdrop-blur-sm border border-brand-gold/40 text-brand-gold text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                            {item.tag}
                          </span>
                        </div>

                        <div className="p-6 sm:p-7 pb-0">
                          <h3 className="text-lg font-bold text-brand-dark mb-2.5 flex items-center gap-2.5">
                            <span className="w-1.5 h-6 bg-brand-gold rounded-full shrink-0"></span>
                            {item.name}
                          </h3>
                          <p className="text-slate-500 text-sm leading-relaxed mb-6">
                            {item.desc}
                          </p>
                        </div>
                      </div>

                      <div className="px-6 sm:px-7 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
                        <span className="text-[11px] font-bold tracking-wide text-brand-slate uppercase flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-brand-accent" />
                          Honest Assessment
                        </span>
                        <a
                          href={clinic.bookingPortal || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-bold text-brand-accent hover:text-brand-accentHover flex items-center gap-1"
                        >
                          Book Now &rarr;
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Aftercare & Comfort Reassurance Banner */}
      <section className="py-16 bg-white border-t border-brand-silver">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Smile className="w-4 h-4 text-brand-accent" />
            Quality Dental Care For Every Smile
          </div>
          <h2 className="text-3xl font-extrabold text-brand-dark">
            Transparent Pricing & Follow-Up Aftercare
          </h2>
          <p className="text-slate-500 text-sm leading-relaxed max-w-2xl mx-auto">
            Treatment quotes are tailored to your actual dental needs following a consultation—with flexible payment options including {clinic.payments.join(', ')}.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <a
              href={clinic.bookingPortal || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-dark hover:opacity-90 text-brand-gold font-bold px-8 py-3.5 rounded-xl shadow-md transition-all"
            >
              Book Now
            </a>
            <a
              href={`tel:${clinic.phoneIntl}`}
              className="bg-white border border-brand-silver hover:bg-brand-light text-brand-dark font-bold px-8 py-3.5 rounded-xl transition-all"
            >
              Inquire via Text/Call: {clinic.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
