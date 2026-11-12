/**
 * CLINIC DATA FILE  (the ONLY file you edit to add a new lead/clinic)
 * ---------------------------------------------------------------
 * Each key is the "slug" used in the demo link:
 *    https://YOUR-APP.vercel.app/?c=masterdent
 *
 * To add a clinic: copy the whole `masterdent` block, paste it below,
 * change the key (slug) and the values. Done. No new repo, no new Vercel app.
 *
 * theme colors are "R G B" numbers (not hex). Handy picks:
 *   black/gold  dark: '10 12 16'   accent: '217 119 6'    gold: '234 179 8'
 *   navy/teal   dark: '15 23 42'   accent: '13 148 136'   gold: '245 158 11'
 *   navy/blue   dark: '15 23 42'   accent: '37 99 235'    gold: '56 189 248'
 *   plum/rose   dark: '40 15 40'   accent: '190 24 93'    gold: '244 114 182'
 */

const defaultServicesNote = "Quality Dental Care For Every Smile";

export const clinics = {
  // ----------------------------------------------------------------
  // CLINIC #1  (real example, built from their public FB/IG info)
  // ----------------------------------------------------------------
  masterdent: {
    name: "Masterdent",
    suffix: "Dental Center",
    tagline: "Quality Dental Care For Every Smile",
    city: "Naga City",
    region: "Camarines Sur",
    postalCode: "4400",
    addressLine1: "Cluster A, The CBD 2 Health & Wellness Strip",
    addressLine2: "Joker Arroyo St. (Crescenciana Anciano St.), CBD II, Brgy. Triangulo",
    shortAddress: "CBD 2 Health & Wellness Strip, Joker Arroyo St., Brgy. Triangulo, Naga City",
    landmark: "In front of BCDC • Near SM City Naga",
    phoneDisplay: "0917 163 0134",
    phoneIntl: "+639171630134",
    email: "",
    dentistName: "Doc Len",
    hours: "8:00 AM - 6:00 PM",
    openDays: "Open Daily (Mon - Sun)",
    open7Days: true,
    rating: "4.7",
    lat: 13.6213128,
    lng: 123.194973,
    facebook: "https://www.facebook.com/MasterdentDentalCenter",
    instagram: "https://www.instagram.com/masterdentdentalcenter",
    bookingPortal: "https://mydmdapp.com/c/masterdent",
    payments: ["Cash", "GCash", "QR Ph", "BDO", "Visa", "Mastercard", "JCB"],
    logo: "/masterdent-logo.png",
    landmarkMap: "/masterdent-landmark-map.jpg",
    hero: "/hero_dentist.png",
    portrait: "/dentist_portrait.png",
    theme: { dark: "10 12 16", card: "20 24 32", accent: "217 119 6", accentHover: "180 83 9", gold: "234 179 8" },
  },

  // ----------------------------------------------------------------
  // TEMPLATE: copy this block for every new lead
  // ----------------------------------------------------------------
  "sample-clinic": {
    name: "Bright Smile",
    suffix: "Dental Clinic",
    tagline: defaultServicesNote,
    city: "Legazpi City",
    region: "Albay",
    postalCode: "4500",
    addressLine1: "2nd Floor, Sample Building",
    addressLine2: "Rizal St., Brgy. Sample",
    shortAddress: "Rizal St., Brgy. Sample, Legazpi City",
    landmark: "Near Legazpi City Hall",
    phoneDisplay: "0900 000 0000",
    phoneIntl: "+639000000000",
    email: "",
    dentistName: "Doc",
    hours: "9:00 AM - 5:00 PM",
    openDays: "Open Mon - Sat",
    open7Days: false,
    rating: "4.8",
    lat: 13.1391,
    lng: 123.7438,
    facebook: "https://facebook.com/",
    instagram: "https://instagram.com/",
    bookingPortal: "",
    payments: ["Cash", "GCash", "Visa", "Mastercard"],
    logo: "/favicon.svg",
    landmarkMap: "",
    hero: "/hero_dentist.png",
    portrait: "/dentist_portrait.png",
    theme: { dark: "15 23 42", card: "30 41 59", accent: "13 148 136", accentHover: "15 118 110", gold: "245 158 11" },
  },
};

export const DEFAULT_CLINIC = "masterdent";

