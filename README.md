# Clinic Demo Hub

One React app → unlimited personalized dental-clinic demo sites.
Every lead gets their own link, all served from **one** Vercel deployment:

```
https://YOUR-APP.vercel.app/?c=masterdent
https://YOUR-APP.vercel.app/?c=bright-smile-legazpi
https://YOUR-APP.vercel.app/?c=any-other-clinic
```

The `?c=` value is the clinic "slug". Everything (name, logo, phone, address, map pin, hours,
payments, social links, colors, page title, SEO) is read from **`src/data/clinics.js`**.

---

## 1. Run it locally

```powershell
npm.cmd install     # first time only
npm.cmd run dev
```

Open `http://localhost:5173/?c=masterdent` and `http://localhost:5173/?c=sample-clinic`.
(`npm.cmd` avoids the PowerShell script-policy error. Plain `npm` works too after you run
`Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned` once.)

---

## 2. Add a new lead (takes ~3 minutes)

1. Open **`src/data/clinics.js`**.
2. Copy the whole `"sample-clinic": { ... }` block and paste it right below it.
3. Change the key to a short, lowercase, no-spaces slug, e.g. `"smilecare-legazpi"`.
4. Fill in the values from the clinic's Facebook/Instagram/Google Maps:
   - `name`, `suffix`, `city`, `region`, `postalCode`, addresses, `landmark`
   - `phoneDisplay` (`0917 123 4567`) and `phoneIntl` (`+639171234567`)
   - `hours`, `openDays`, `open7Days` (true/false)
   - `lat` / `lng`: open the clinic in Google Maps → right-click the pin → click the coordinates to copy
   - `facebook`, `instagram`, `payments`, `rating`
5. **Logo & photos:** save their logo into `public/` (e.g. `public/smilecare-logo.png`) and set
   `logo: "/smilecare-logo.png"`. Same for `hero`, `portrait`, and optional `landmarkMap`.
   (No photo yet? Keep the default `hero`/`portrait` images.)
6. **Colors:** set `theme` as `"R G B"` numbers (presets are listed at the top of `clinics.js`).
7. Test: `http://localhost:5173/?c=smilecare-legazpi`
8. Deploy (step 4). Your demo link is `https://YOUR-APP.vercel.app/?c=smilecare-legazpi`

> Real reviews: add `testimonials: [{ name: "…", rating: 5, comment: "…" }]` to a clinic **only if they are
> genuine** (copied from their public Google/Facebook reviews). With no testimonials the section is hidden.

---

## 3. Put it on GitHub (new repo)

1. Create an **empty** repo at https://github.com/new (e.g. `Clinic-Demo-Hub`; no README/.gitignore/license).
2. In a terminal inside this folder:

```bash
git init
git add .
git commit -m "Clinic demo hub"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/Clinic-Demo-Hub.git
git push -u origin main
```

---

## 4. Deploy once on Vercel

1. https://vercel.com/new → import `Clinic-Demo-Hub` → **Deploy** (defaults are fine for Vite).
2. Optional: Project → Settings → Environment Variables → add `VITE_GOOGLE_SHEETS_WEBAPP_URL`
   (your Google Apps Script URL) so booking-form submissions land in a Google Sheet. Each row includes the
   `clinic` slug so you can tell leads apart.
3. After this, **every `git push` auto-updates every demo link.** Adding a lead = edit `clinics.js`,
   then:

```bash
git add .
git commit -m "Add smilecare-legazpi demo"
git push
```

Wait ~30–45 seconds, then send the link.

---

## 5. Outreach workflow for 100 leads

1. **Track leads in a Google Sheet** with columns:
   `Clinic | FB/IG link | Status | Demo link | Last contacted | Next follow-up | Notes`
   (Status: New → Msg 1 sent → Replied → Demo sent → Quoted → Closed / Dead)
2. **Send 10–15 DMs per day** (never blast 100 at once; Facebook/Instagram flag that as spam).
3. **Message 1 (no link yet, short, asks for the owner):**
   > Hi! Para po kay Doc / Clinic Owner — gumawa ako ng sample website prototype para sa [Clinic] gamit yung branding niyo. Pwede ko po bang isend yung preview link? 😊
4. **Only build a custom demo for clinics that reply "sure/sige".** Add them to `clinics.js`, push, send the link.
5. Follow up once after 2–3 days, then once after a week. Log everything in your sheet.
6. **When someone buys:** create a dedicated repo/Vercel project from this template for that clinic, set their
   custom domain, and make their slug the default (`DEFAULT_CLINIC` in `clinics.js`).
   Keep the hub for demos only.

---

## File map

| File | Purpose |
| --- | --- |
| `src/data/clinics.js` | **All clinic data.** The only file you edit per lead. |
| `src/useClinic.js` | Reads `?c=slug` and exposes the clinic to every component. |
| `src/App.jsx` | Applies the clinic theme, title, favicon and SEO schema; header and footer. |
| `src/components/*` | Pages. They read everything from the clinic object. |
| `public/` | Logos and photos. Name them after the clinic. |
