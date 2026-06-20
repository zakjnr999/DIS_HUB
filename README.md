# DO IT SAFE HUB

A modern contraceptive and sexual wellness ecommerce demo for DIS HUB, built with Next.js,
TypeScript, Tailwind CSS, React Hook Form, and Zod.

The site is product-led and privacy-conscious: customers can browse real product
images, search and filter the catalogue, add items to a local cart, complete a
demo checkout, and review local demo orders in an admin dashboard.

## Features

- Editorial ecommerce homepage inspired by a compact consumer store reference
- Real product image mapping from `public/images/`
- Category browsing, product tabs, product detail pages, and related products
- Search, category, stock, price, and sort filters on `/shop`
- localStorage cart persistence with reusable cart operations
- Checkout validation for contact, delivery, and payment method details
- Local demo order creation with `CTR-YYYY-XXXX` references
- Order confirmation with WhatsApp support sharing
- Local admin dashboard for order status changes and demo revenue summary
- Discreet packaging, support, and educational messaging throughout

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run lint
npm run build
```

## Key Files

```txt
src/data/products.ts        Product catalogue
src/config/images.ts        Centralized product image paths
src/lib/cartStorage.ts      Cart repository helpers
src/lib/orderStorage.ts     Order repository helpers
src/lib/validation.ts       Checkout schema
src/components/icons        Custom SVG icon system
```

## Notes

Product prices are configured in Ghana cedis. The checkout is demo-only and does
not process payment.
