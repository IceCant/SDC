# SDC source-site inventory

Inspected from the public English pages of `sdchotelsupply.com` on 4 September 2026.

## Reconstructed content

- 91 named products across 13 retail and hotel-supply collections
- 36 custom-logo client/project examples
- 21 Cambodian destinations and service areas
- 10 events, exhibitions, training activities and partnerships
- 18 hospitality education topics
- 2 promotions
- 2 career listings, both marked as expired on 30 November 2025
- Contact, client and terms pages

The full product names and category relationships are stored as structured content in `src/catalog.js`.

## Important source-quality findings

- Most product pages do not expose reliable pricing; the source often shows `$0` or no usable price. The redesign therefore uses “Request a quote.”
- Many product pages contain only a title and images. The redesign does not invent dimensions, materials or availability.
- The original kettle detail page provides: polished melamine welcome tray, black colour, 42 × 30 × 3 cm tray and integrated kettle space.
- “In stock” and “Pre-order” are shown only where those words appear in the original product name. They should be verified before a production launch.
- The original promotions page advertises 10% off, but does not provide a clear validity period. The redesign asks visitors to confirm the offer.
- The original career listings are outdated. The redesign labels them as archived and asks applicants to verify availability.
- The original terms page is generic template text, not a trustworthy SDC-specific commercial policy. The redesign replaces it with a legal-review placeholder.
- The public client page exposes little readable information; existing homepage client logos were retained without adding unsupported claims.

## New site routes

- `#/` — homepage
- `#/products` — searchable catalog and category filters
- `#/product/:slug` — product enquiry/detail pages
- `#/custom` — custom-logo reference directory
- `#/coverage` — Cambodia destination directory
- `#/promotions` — offer details
- `#/events` — complete event archive
- `#/education` — complete learning library
- `#/careers` — career archive
- `#/contact` — showroom and enquiry page
- `#/terms` — legal-review placeholder

## Production follow-up

Before launch, SDC should confirm current prices, stock status, specifications, job vacancies, promotion validity, product photography rights and final legal terms. The quote form is a working prototype interaction and still needs connection to the preferred inbox, WhatsApp number or CRM.
