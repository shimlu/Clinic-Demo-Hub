# PROJECT CONTEXT (read this first, new AI / new conversation)

This folder is the **multi-clinic demo hub**. Full background lives in `D:\Yeshu Meridian\Dentist\CONTEXT.md`
(the Masterdent project). Read that file too if it is accessible.

## What this is
One React + Vite + Tailwind app that serves unlimited personalized dental-clinic demo sites from a single
Vercel deployment: `https://YOUR-APP.vercel.app/?c=<clinic-slug>`.
Built by copying the Masterdent site and making it data-driven. User sells these sites to PH clinics via FB/IG DMs.

## Status
- Builds and lints clean. Not yet pushed to GitHub or deployed (no `.git` folder here; user must `git init` and push to a new repo, e.g. `shimlu/Clinic-Demo-Hub`).
- `src/data/clinics.js` has two entries: `masterdent` (real clinic) and `sample-clinic` (template).

## Key files
- `src/data/clinics.js`: all clinic data, the only file edited per lead. Instructions are in its header comment.
- `src/useClinic.js`: reads `?c=slug` (falls back to `DEFAULT_CLINIC`) and exposes the clinic via context.
- `src/App.jsx`: applies theme CSS variables, page title, favicon and JSON-LD per clinic; header/footer.
- `src/components/{Home,Services,Contact,OfficeLocationPanel}.jsx`: read all data via `useClinic()`.
- `tailwind.config.js` + `src/index.css`: `brand-*` colors are CSS variables set per clinic.
- `README.md`: step-by-step guide (run locally, add a lead, GitHub, Vercel, outreach workflow).

## Gotchas
- Windows PowerShell: use `npm.cmd` (script policy blocks `npm.ps1`).
- lucide-react v1 has no Facebook/Instagram icons; use `src/components/SocialIcons.jsx`.
- Booking time slots in `Contact.jsx` are hardcoded 8 AM-6 PM for every clinic. Make them per-clinic if needed.
- Testimonials render only if a clinic has a genuine `testimonials` array. Never invent reviews.
- Hub copies `public/services/*.jpg` (generic AI-generated procedure images) and starter hero/portrait images.
- `.env` is intentionally NOT copied here. Set `VITE_GOOGLE_SHEETS_WEBAPP_URL` in Vercel (payload includes `clinic` slug).

## Verify after changes
`npm.cmd run lint` then `npm.cmd run build`.

