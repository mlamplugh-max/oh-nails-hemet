# Oh Nails – Hemet, CA Nail Studio Website

A polished, responsive one-page website for **Oh Nails** in Hemet, CA.

## Features

- Elegant mobile-first salon design
- Sticky navigation and mobile CTA bar
- Hero, About, Services, Pricing, Booking, Gallery, Directions, Contact, and Footer sections
- Appointment request form with validation and honeypot spam trap
- Cloudflare Pages Functions API for booking requests
- Optional Resend email delivery for business + customer confirmation emails
- AI-style chat widget with deterministic fallback knowledge and optional OpenAI-compatible API integration
- Local SEO metadata and NailSalon JSON-LD schema
- Config file for business placeholders in `src/businessInfo.ts`

## Business placeholders to update

Edit `/a0/usr/projects/oh_nails/src/businessInfo.ts`:

```ts
businessInfo.phone
businessInfo.email
businessInfo.address
businessInfo.hours
businessInfo.bookingEmail
businessInfo.googleMapsUrl
businessInfo.instagramUrl
businessInfo.facebookUrl
```

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

## Cloudflare Pages deployment

```bash
npx wrangler pages deploy dist --project-name oh-nails-hemet
```

Set these Cloudflare Pages environment variables for real email delivery:

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Resend API key for email sending |
| `BOOKING_EMAIL` | Business email that receives appointment requests |
| `FROM_EMAIL` | Verified sender, e.g. `Oh Nails Website <bookings@yourdomain.com>` |
| `OPENAI_API_KEY` | Optional key for dynamic assistant responses |
| `OPENAI_BASE_URL` | Optional OpenAI-compatible base URL |
| `OPENAI_MODEL` | Optional model name |

Without email variables, booking requests are validated and logged by the Function but not emailed.
