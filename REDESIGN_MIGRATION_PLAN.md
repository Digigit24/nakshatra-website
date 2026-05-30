# Nakshatra Redesign Migration Plan

Reusable plan for migrating the remaining Nakshatra pages to the current redesign system.

## Current Status

- Root-level redesign pages are migrated, including `index.html`, `about-us.html`, `services.html`, `blog.html`, `blog-single.html`, `contact.html`, appointment, IVF location pages, and IUI location pages.
- Remaining content pages:
  - `services/`: 52 service detail pages
  - `blogs/`: 17 blog article pages
- Do not redesign `googlefe0a6efc944df458.html`; it is a Google verification file.

## Migration Order

1. High-value service pages:
   - IVF / ART pages
   - IUI page
   - ICSI page
   - Egg/sperm/embryo freezing pages
   - Diagnostics and failed IVF pages
2. Remaining service detail pages by category:
   - Female fertility
   - Male infertility
   - Surgeries
   - Obstetrics and gynecology
   - Pregnancy and prenatal services
3. Blog article pages in `blogs/`.

## Non-Negotiable Preservation Rules

For every page, preserve:

- SEO title, meta description, keywords, canonical, OG tags, Twitter tags, robots tag.
- JSON-LD/schema, breadcrumb schema, FAQ schema, local business/medical schema.
- All existing headings and medical meaning.
- All forms, form IDs, form names, field names, actions, methods, validation hooks, and submit scripts.
- Phone, WhatsApp, appointment, map, social, and internal links.
- Tracking scripts, Google verification, GTM, gtag, Meta Pixel, Instagram embed scripts.
- Existing images unless an image path is broken or visibly inappropriate and a local replacement exists.

Do not:

- Invent medical claims, success rates, prices, guarantees, awards, doctor claims, or distance claims.
- Replace real service links with `appointment-page.html` unless that was already the original destination.
- Leave duplicate hidden legacy body content.
- Use `href="#"` for visible navigation or CTAs.
- Touch completed pages while migrating a new page.

## Common Page Skeleton

Use this pattern for migrated pages. Adjust paths for subfolders.

### Root Page Assets

```html
<link href="css/all.min.css" rel="stylesheet">
<link href="css/nakshatra-redesign.css?v=17.0" rel="stylesheet">
<link rel="stylesheet" href="https://www.maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
```

### Subfolder Page Assets

```html
<link href="../css/all.min.css" rel="stylesheet">
<link href="../css/nakshatra-redesign.css?v=17.0" rel="stylesheet">
<link rel="stylesheet" href="https://www.maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
```

### Body

```html
<body class="redesign-body">
  <div class="scroll-progress-bar" id="scrollProgressBar"></div>
  <div class="nav-overlay" id="navOverlay"></div>

  <!-- Floating call and WhatsApp buttons -->
  <!-- Header copied from completed pages, with path depth adjusted -->

  <main>
    <!-- Page-specific redesigned sections -->
  </main>

  <!-- Footer copied from completed pages, with path depth adjusted -->
  <!-- Mobile sticky bar -->
  <!-- Existing scripts and required dependencies -->
</body>
```

## Header Pattern

Use the completed header pattern from `index.html`, `about-us.html`, `services.html`, or `contact.html`.

Required nav order:

1. Home
2. About Us
3. Treatments mega menu
4. Blog
5. Contact Us

For subfolder pages, adjust links:

- `../index.html`
- `../about-us.html`
- `../services.html`
- `../blog.html`
- `../contact.html`
- Mega-menu service links should usually be relative to the current page depth.

Keep the Treatments mega-menu behavior and JS IDs unchanged:

- `navToggle`
- `navClose`
- `navOverlay`
- `navMenu`
- `megaMenuPanel`

## Footer Pattern

Use `footer-redesign` from completed pages.

For subfolder pages, adjust:

- Logo/image paths with `../`
- Internal footer links with `../` where needed
- Service links relative to page depth

Preserve footer phone, WhatsApp, email, address, social links, and opening-hours text unless fixing encoding.

## Service Detail Page Template

Best for pages under `services/`.

Suggested visible order:

1. Header/nav
2. Service hero
   - One H1 only
   - Short preserved service summary
   - Primary CTA to existing appointment/contact destination
   - Secondary CTA to phone or WhatsApp if already used
   - Relevant local image if already present or available
3. Trust strip
   - Small clinic/doctor/service proof points from existing content only
4. Service overview
   - Preserve original medical meaning
   - Use `r-section`, `r-container`, `r-section-title-wrapper`
5. Symptoms / who it helps / indications
   - Cards or split layout
6. Process / treatment steps
   - Only use steps that already exist or are clearly in original content
7. Benefits / why choose Nakshatra
   - No invented claims
8. FAQ accordion if present
9. Final CTA
10. Footer
11. Mobile sticky bar

Reusable section markup:

```html
<section class="r-section">
  <div class="r-container">
    <div class="r-section-title-wrapper">
      <span class="r-section-subtitle">Service</span>
      <h2 class="r-section-title">Section heading <span>with accent</span></h2>
      <p class="r-section-desc">Preserved supporting copy.</p>
    </div>
  </div>
</section>
```

Reusable card:

```html
<article class="service-card-redesign">
  <div class="service-card-icon-wrapper" aria-hidden="true">
    <!-- Prefer inline SVG if Font Awesome renders blank -->
  </div>
  <div class="service-card-info">
    <h3>Existing title</h3>
    <p>Existing description.</p>
  </div>
  <a href="existing-destination.html" class="service-card-learn-link">
    Learn More <i class="fa fa-arrow-right"></i>
  </a>
</article>
```

## Blog Article Page Template

Best for pages under `blogs/`.

Suggested visible order:

1. Header/nav
2. Article hero
   - One H1 only
   - Preserve title, author/date/category, image
3. Article body
   - Preserve article text and heading structure
   - Improve readability with a constrained content column
4. Related posts or blog CTA if already present
5. Final appointment/contact CTA only if already present or consistent with original conversion intent
6. Footer
7. Mobile sticky bar

Article layout pattern:

```html
<section class="r-section">
  <div class="r-container">
    <article class="blog-article-redesign">
      <!-- Preserve original article content -->
    </article>
  </div>
</section>
```

If custom CSS is needed, keep it page-local and minimal.

## Blog Listing Pattern

`blog.html` is already migrated. Use it as the listing reference.

Important:

- Preserve all blog titles, excerpts, dates, images, categories, and URLs.
- For images containing text, use `object-fit: contain` or a safe image wrapper.
- Keep all cards present and responsive.

## Location Landing Page Pattern

Use `best-ivf-center-in-pune.html` and completed location pages as the reference.

Suggested visible order:

1. Header/nav
2. Location-focused hero with form
3. Doctor/clinic trust section
4. Why choose Nakshatra for the location/service
5. Service cards
6. Process section
7. Nearby location/access cards
8. Testimonials if present
9. FAQ accordion
10. Final CTA
11. Footer
12. Mobile sticky bar

Important:

- Preserve city/locality intent exactly.
- Do not copy another location's distance text unless already correct.
- Use readable distance copy, for example `5-7 km away - 10-15 min drive`, or preserve the existing distance claim.

## IUI Location Page Pattern

Use completed IUI pages, not IVF pages, for content logic.

Important:

- Keep IUI intent. Do not introduce IVF-only terminology such as egg retrieval, embryo transfer, embryo freezing, blastocyst transfer, or IVF success-rate claims unless already present.
- Preserve Instagram/social proof sections if present.
- Use IUI process language only:
  - Consultation and evaluation
  - Ovulation tracking
  - Semen preparation
  - Insemination
  - Follow-up/pregnancy test

## Inline Icon Policy

Use Font Awesome only where it is known to render correctly.

Use inline SVG for:

- Clock/calendar
- Location pin
- Phone
- Snowflake/freezing
- Lab/test tube
- Diagnostics/chart
- Pregnancy/care
- Procedure/surgery

Do not leave empty icon wrappers.

## Page-Local CSS Policy

Prefer existing classes from `css/nakshatra-redesign.css`.

Add page-local CSS only when:

- A page has a unique layout.
- A small responsive fix is required.
- A fallback icon or embedded media wrapper needs reliable rendering.

Do not create a separate design system.

## Cleanup Checklist

Before editing:

1. Read the page head and scripts.
2. Identify schema blocks and forms.
3. Identify old visible content sections.
4. Identify hidden legacy duplicate content.
5. List all links, forms, and scripts that must be preserved.

During migration:

1. Keep one H1.
2. Move visible original content into redesigned sections.
3. Remove hidden duplicate legacy body markup.
4. Preserve schema and tracking.
5. Keep Bootstrap/jQuery/validator dependencies when used by forms/scripts.
6. Avoid `href="#"`.
7. Fix encoding issues such as `â`, `Â`, and `Ã`.

After editing, run checks:

```powershell
$html = Get-Content -LiteralPath 'PAGE.html' -Raw -Encoding UTF8
([regex]::Matches($html, '<h1\b', 'IgnoreCase')).Count
([regex]::Matches($html, 'href=["'']#["'']', 'IgnoreCase')).Count
([regex]::Matches($html, 'â|Â|Ã')).Count
$ids = [regex]::Matches($html, '\sid=["'']([^"'']+)["'']') | ForEach-Object { $_.Groups[1].Value }
$ids | Group-Object | Where-Object { $_.Count -gt 1 }
```

Validate JSON-LD:

```powershell
$scripts = [regex]::Matches($html, '<script[^>]+type=["'']application/ld\+json["''][^>]*>(.*?)</script>', 'Singleline,IgnoreCase')
foreach ($s in $scripts) { $s.Groups[1].Value | ConvertFrom-Json | Out-Null }
```

Check changed files:

```powershell
git diff --name-only
git diff --check -- PAGE.html
```

## Final Report Template

Use this report after each page:

```text
1. changed files
2. sections redesigned
3. SEO/schema/items preserved
4. whether hidden legacy markup remains
5. H1 count
6. duplicate IDs check
7. href="#" check
8. corrupted character check
9. imagery used and missing image path issues
10. forms/scripts/link preservation status
11. manual testing checklist
```

## Manual Testing Checklist

For each migrated page:

- Desktop header and Treatments mega-menu.
- Mobile nav open/close and Treatments submenu.
- Floating phone and WhatsApp buttons.
- Mobile sticky bar.
- Forms validate and submit as before.
- Phone, WhatsApp, email, map, appointment, service, and blog links.
- FAQ accordion if present.
- Instagram embeds/carousels if present.
- Images load and are not badly cropped.
- No content hidden under sticky mobile bar.
- No large blank gaps.
- No blank icon boxes.
- One H1 only.

