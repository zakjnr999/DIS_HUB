# Adi3ye Services

A modern frontend-only service booking platform for a fashion, tailoring,
clothing care, dress alteration, custom sewing, and clothing service business.

The project is built for presentation use, but the code is organized like a real
product surface so localStorage can be replaced with API calls later.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- React Hook Form
- Zod validation
- localStorage demo persistence
- Custom reusable SVG icon components

## Features

- Flyer-style home hero for Adi3ye Services
- About, services, how-it-works, testimonials, FAQ, contact, and footer sections
- Dedicated booking page at `/book`
- Guided multi-step booking form
- Customer details, service selection, material type, image upload, price range,
  pickup/delivery, service date/time, urgency, notes, and final review
- Up to 3 image previews with JPG, JPEG, PNG, WEBP, and 5MB checks
- Booking reference generation in `ADI-YYYY-XXXX` format
- Booking success page with WhatsApp sharing
- Demo admin dashboard at `/admin`
- Booking status updates, stats, search, status filtering, and clear bookings
- Responsive layout for mobile, tablet, laptop, and desktop screens

## Folder Structure

```txt
src/
  app/                 Next.js routes
  components/          Reusable UI, layout, home, booking, admin, and icon components
  config/              Business contact and brand config
  data/                Services, FAQs, statuses, materials, pickup options, prices
  hooks/               Client-side booking and storage hooks
  lib/                 Storage, validation, WhatsApp, references, utilities
  types/               Booking and service TypeScript types
```

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build for Production

```bash
npm run build
npm run start
```

## Replace the Flyer Image

The image paths are centralized in:

`src/config/images.ts`

Add replacement files to `public/images/`, then update the matching `src` value
in that config file. Service cards, hero visuals, testimonial avatars, the
booking side panel, contact image, and admin empty state all read from there.

## Change Contact Details

Edit:

`src/config/business.ts`

The WhatsApp number, phone link, email address, default WhatsApp message, and
business display details are all stored there.

## Demo Bookings

Bookings are saved in browser localStorage through:

`src/lib/bookingStorage.ts`

This keeps the demo frontend-only. For a backend later, replace those helper
functions with API calls while keeping the rest of the booking and admin UI.

## Custom Icon System

The custom SVG icon family is in:

`src/components/icons/index.tsx`

Icons share the same line style, stroke width, rounded joins, and brand colors
through surrounding component classes. Service data maps to icons through
`serviceIconMap`.

## Future Improvements

- Real backend/API
- Admin authentication
- SMS notifications
- Email notifications
- Online payment
- Real image upload storage
- Booking status notifications
- Customer accounts
