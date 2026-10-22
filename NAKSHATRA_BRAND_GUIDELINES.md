# Nakshatra IVF Clinic — Complete Brand & Design System
### Reference document for redesigning all pages to match the new homepage design

---

## SECTION 0 — HOW TO USE THIS DOCUMENT

This document is the single source of truth for redesigning every page of the Nakshatra IVF website. When given to a new Claude session, the instruction is:

> "You are redesigning pages of the Nakshatra IVF clinic website (nakshatraclinic.com). The homepage (`index.html`) has already been redesigned using `css/nakshatra-redesign.css`. Your job is to apply the exact same header, footer, design tokens, components, and animation patterns to [PAGE NAME]. Do NOT change any existing internal links, hrefs, form actions, or JavaScript logic. Only restyle the HTML. Reference all CSS classes from `css/nakshatra-redesign.css` — do not write new CSS unless a component is truly unique to this page. Link the stylesheet as: `<link href="../css/nakshatra-redesign.css?v=17.0" rel="stylesheet">` (adjust path depth for subfolder pages). Add `class="redesign-body"` to the `<body>` tag."

---

## SECTION 1 — STYLESHEET LINK

Always load the redesign CSS **and** Font Awesome. Adjust `../` depth based on folder level:

```html
<!-- Root-level pages (about-us.html, contact.html, services.html) -->
<link href="css/all.min.css" rel="stylesheet">
<link href="css/nakshatra-redesign.css?v=17.0" rel="stylesheet">
<link rel="stylesheet" href="https://www.maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">

<!-- Subfolder pages (services/ivf-treatment.html) -->
<link href="../css/all.min.css" rel="stylesheet">
<link href="../css/nakshatra-redesign.css?v=17.0" rel="stylesheet">
<link rel="stylesheet" href="https://www.maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
```

Font imports (already inside the CSS, do not add again):
- **Headings:** `Playfair Display` (weights 500, 600, 700, 800)
- **Body:** `Onest` (weights 300, 400, 500, 600, 700, 800)

---

## SECTION 2 — CSS DESIGN TOKENS (`:root` variables)

```css
/* Brand Color Palette */
--color-primary:       #D91B72;   /* Magenta — all CTAs, highlights, accent */
--color-primary-dark:  #B5145E;   /* Hover / active state of primary */
--color-primary-soft:  #FCE8F2;   /* Soft pink — badge backgrounds, card tints */
--color-blush:         #FFF4F8;   /* Lightest pink — page background tint */
--color-lavender:      #F3EDFF;   /* Lavender — secondary accent surfaces */
--color-deep-navy:     #18163F;   /* Main headings, dark text */
--color-purple:        #3A255F;   /* Secondary headings */
--color-body:          #4F4A5F;   /* All paragraph / body text */
--color-muted:         #7B7488;   /* Captions, labels, supporting text */
--color-white:         #FFFFFF;
--color-border:        #F1DCE7;   /* Card and divider borders */
--color-card:          #FFFFFF;

/* Typography */
--font-heading:   'Playfair Display', serif;
--font-body:      'Onest', sans-serif;

/* Border Radii */
--radius-sm:  12px;
--radius-md:  18px;
--radius-lg:  24px;
--radius-xl:  32px;

/* Shadows */
--shadow-soft:   0 20px 50px rgba(24, 22, 63, 0.06);
--shadow-card:   0 12px 34px rgba(217, 27, 114, 0.08);
--shadow-hover:  0 24px 70px rgba(217, 27, 114, 0.15);

/* Gradients */
--gradient-hero: radial-gradient(circle at 90% 20%, #FCE8F2 0%, transparent 40%),
                 linear-gradient(135deg, #FFFFFF 0%, #FFF4F8 55%, #F3EDFF 100%);
--gradient-soft: linear-gradient(135deg, #FFFFFF 0%, #FFF4F8 60%, #F8EEFF 100%);
--gradient-card: linear-gradient(180deg, #FFFFFF 0%, #FFF9FC 100%);
--gradient-cta:  linear-gradient(135deg, #FFF4F8 0%, #FCE8F2 100%);

/* Transitions */
--transition-smooth: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
```

---

## SECTION 3 — GLOBAL RULES (apply to every page)

```html
<!-- Body tag must have this class -->
<body class="redesign-body">
```

Key global CSS rules already in the stylesheet:
- `*, *::before, *::after { box-sizing: border-box; }` — prevents overflow from padding
- `html { overflow-x: hidden; max-width: 100%; }` — no horizontal scroll
- `.redesign-body` sets `font-family: Onest`, `color: #4F4A5F`, `line-height: 1.75`, `font-size: 16px`
- All `h1–h5` inside `.redesign-body` default to `color: #18163F`, `font-weight: 700`, `line-height: 1.2`
- All `a` inside `.redesign-body` get `text-decoration: none; transition: var(--transition-smooth)`

---

## SECTION 4 — LAYOUT SYSTEM

### Container
```html
<div class="r-container"> ... </div>
```
CSS: `width: min(1200px, calc(100% - 48px)); margin-inline: auto;`
Max width 1200px, 24px padding each side on mobile.

### Section Wrapper
```html
<section class="r-section"> ... </section>
```
CSS: `padding: 100px 0;` Desktop. `padding: 64px 0;` on mobile (≤768px).

Can be combined with modifier classes:
- `r-section fears-section` — blush pink background
- `r-section treatments-redesign`
- `r-section success-redesign`
- etc.

### Section Title Block
```html
<div class="r-section-title-wrapper">
  <span class="r-section-subtitle">EYEBROW LABEL</span>
  <h2 class="r-section-title">Main heading with <span>pink accent</span></h2>
  <p class="r-section-desc">Supporting description text here.</p>
</div>
```
- `.r-section-subtitle`: pink, uppercase, 700 weight, 14px, 0.1em letter-spacing
- `.r-section-title`: Playfair Display, `clamp(28px, 4vw, 44px)`, deep navy, `span` turns pink
- `.r-section-desc`: 17px, body color

---

## SECTION 5 — COMPONENT LIBRARY

### Primary Button
```html
<a href="..." class="r-btn-primary">Button Text <i class="fa fa-arrow-right"></i></a>
```
- Background: `#D91B72` | Color: white | Border-radius: 14px
- Padding: `14px 28px` | Font: 700, 15px
- Box-shadow: `0 10px 25px rgba(217, 27, 114, 0.25)`
- Hover: darkens to `#B5145E`, lifts `translateY(-2px)`, stronger shadow

### Secondary Button
```html
<a href="..." class="r-btn-secondary">Button Text</a>
```
- Background: white | Color: `#D91B72` | Border: `1px solid rgba(217,27,114,0.30)`
- Same sizing as primary
- Hover: soft pink background `#FCE8F2`, full pink border, lifts `translateY(-2px)`

### Badge Pill
```html
<div class="r-badge-pill"><i class="fa fa-star"></i> 4.9/5 Google · 2000+ Pregnancies</div>
```
- White background, pink border, pink uppercase text
- `border-radius: 999px`, padding `8px 16px`, font-size 12px, letter-spacing 0.08em

### Section Subtitle / Eyebrow
```html
<span class="r-section-subtitle">You Are Not Alone</span>
```

### Reveal Animation (scroll-triggered)
```html
<div class="reveal"> ... </div>
```
Add `class="reveal"` to any block. JS IntersectionObserver adds `class="visible"` when element enters viewport (threshold: 4%). CSS transitions `opacity 0→1` + `translateY(35px)→0` over 1.2s with spring easing.

### Staggered Reveal (for grids of cards)
```html
<div class="reveal-stagger"> ... children ... </div>
```
Children animate in sequence with 100ms delay between each.

---

## SECTION 6 — THE HEADER (copy exactly to every page)

The header is **sticky**, uses frosted glass (`backdrop-filter: blur(20px)`), and shrinks on scroll via JS adding `.scrolled` class.

### Header HTML (copy verbatim, adjust `href` paths for subfolder pages)

```html
<!-- Scroll Reading Progress Bar -->
<div class="scroll-progress-bar" id="scrollProgressBar"></div>

<!-- Nav Overlay -->
<div class="nav-overlay" id="navOverlay"></div>

<!-- Floating Action Buttons -->
<a href="tel:+917058658711" class="phone-float-redesign" target="_blank" aria-label="Call Nakshatra Clinic">
  <i class="fa fa-phone"></i>
</a>
<a href="https://wa.me/917058658711" class="whatsapp-float-redesign" target="_blank" aria-label="WhatsApp Nakshatra Clinic">
  <i class="fab fa-whatsapp"></i>
</a>

<!-- Header -->
<header class="site-header-redesign">
  <div class="r-container">
    <div class="header-container-redesign">

      <a class="logo-link" href="index.html">
        <img loading="lazy" src="images/nakshatra-logo.jpg" alt="Nakshatra IVF Logo">
      </a>

      <nav class="navigation-menu-redesign">
        <button class="nav-toggle-btn" aria-label="Toggle Menu" id="navToggle">
          <span></span><span></span><span></span>
        </button>

        <ul class="nav-links-list" id="navMenu">
          <button class="nav-close-btn" id="navClose" aria-label="Close Menu">&times;</button>
          <li><a class="nav-link-item" href="index.html">Home</a></li>
          <li><a class="nav-link-item" href="about-us.html">About Us</a></li>
          <li class="nav-item-treatments">
            <a class="nav-link-item mega-trigger" href="services.html">
              Treatments <i class="fa fa-angle-down mega-arrow"></i>
            </a>
            <div class="mega-menu-panel" id="megaMenuPanel">
              <div class="r-container">
                <div class="mega-menu-grid">
                  <div class="mega-col">
                    <div class="mega-col-header"><i class="fa fa-flask"></i> IVF &amp; ART</div>
                    <ul class="mega-links">
                      <li><a href="services/ivf-options.html">IVF Options</a></li>
                      <li><a href="services/advanced-ivf-treatment.html">IVF Treatment</a></li>
                      <li><a href="services/icsi-treatment.html">ICSI Treatment</a></li>
                      <li><a href="services/intrauterine-insemination.html">IUI Insemination</a></li>
                      <li><a href="services/blastocyst-formation.html">Blastocyst Formation</a></li>
                      <li><a href="services/laser-assisted-hatching.html">Laser Hatching</a></li>
                      <li><a href="services/embroys-freezing-vitrification.html">Embryos Freezing</a></li>
                      <li><a href="services/ovum-donation.html">Ovum Donation</a></li>
                      <li><a href="services/ovulation-induction.html">Ovulation Induction</a></li>
                    </ul>
                  </div>
                  <div class="mega-col">
                    <div class="mega-col-header"><i class="fa fa-search-plus"></i> Diagnostics</div>
                    <ul class="mega-links">
                      <li><a href="services/advanced-ivf-tests.html">Advanced IVF Tests</a></li>
                      <li><a href="services/detailed-female-infertility-analysis.html">Female Infertility Analysis</a></li>
                      <li><a href="services/endometrial-receptivity-analysis.html">Endometrial Receptivity</a></li>
                      <li><a href="services/follicular-study.html">Follicular Study</a></li>
                      <li><a href="services/male-infertility-analysis.html">Male Infertility Analysis</a></li>
                      <li><a href="services/dna-fragmentation.html">DNA Fragmentation</a></li>
                      <li><a href="services/preimplantation-genetic-testing.html">PGT Genetic Testing</a></li>
                      <li><a href="services/micro-tese.html">Micro TESE</a></li>
                    </ul>
                  </div>
                  <div class="mega-col">
                    <div class="mega-col-header"><i class="fa fa-female"></i> Female Fertility</div>
                    <ul class="mega-links">
                      <li><a href="services/female-infertility-treatment.html">Female Infertility</a></li>
                      <li><a href="services/low-amh-treatment.html">Low AMH Treatment</a></li>
                      <li><a href="services/polycystic-ovary-syndrome-treatment.html">PCOS Treatment</a></li>
                      <li><a href="services/repeated-implantation-failure.html">Repeated Implantation Failure</a></li>
                      <li><a href="services/ovarian-drilling-for-pcod-treatment.html">Ovarian Drilling (PCOD)</a></li>
                      <li><a href="services/female-infertility-surgeries.html">Blocked Fallopian Tubes</a></li>
                      <li><a href="services/endometrial-polyp-removal.html">Endometrial Polyp Removal</a></li>
                      <li><a href="services/endometriosis-treatment.html">Endometriosis Treatment</a></li>
                      <li><a href="services/ovarian-cysts-removal.html">Ovarian Cysts Removal</a></li>
                      <li><a href="services/removal-of-adhesions-in-uterus.html">Uterine Adhesions Removal</a></li>
                    </ul>
                  </div>
                  <div class="mega-col">
                    <div class="mega-col-header"><i class="fa fa-male"></i> Male Fertility</div>
                    <ul class="mega-links">
                      <li><a href="services/male-infertility-treatment.html">Male Infertility</a></li>
                      <li><a href="services/oligospermia-low-sperm-count-treatment.html">Oligospermia (Low Sperm)</a></li>
                      <li><a href="services/oligo-astheno-teratozoospermia.html">OAT Syndrome</a></li>
                      <li><a href="services/testicular-sperm-aspiration.html">TESA (Sperm Aspiration)</a></li>
                    </ul>
                    <div class="mega-col-header mega-col-header-sub"><i class="fa fa-heart"></i> OB &amp; Pregnancy</div>
                    <ul class="mega-links">
                      <li><a href="services/obstetrics-gynecology.html">Obstetrics &amp; Gynecology</a></li>
                      <li><a href="services/pregnancy.html">Pregnancy Care</a></li>
                      <li><a href="services/preconception-counseling.html">Preconception Counseling</a></li>
                      <li><a href="services/abnormal-uterinebleeding.html">Abnormal Uterine Bleeding</a></li>
                      <li><a href="services/uterine-fibroids.html">Uterine Fibroids</a></li>
                      <li><a href="services/vaginal-infection.html">Vaginal Infection</a></li>
                      <li><a href="services/urinary-tractinfection.html">Urinary Tract Infection</a></li>
                      <li><a href="services/hysteroscopy.html">Hysteroscopy</a></li>
                      <li><a href="services/laparoscopy.html">Laparoscopy</a></li>
                    </ul>
                  </div>
                </div>
                <div class="mega-footer-bar">
                  <a href="services.html" class="mega-view-all-btn">
                    Explore All Treatments <i class="fa fa-long-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </li>
          <li><a class="nav-link-item" href="contact.html">Contact Us</a></li>
        </ul>
      </nav>

      <div class="header-actions">
        <div class="header-location-pill">
          <i class="fa fa-map-marker"></i> Baner, Pune
        </div>
        <a href="#appointment-section" class="r-btn-primary">
          <span class="btn-text-desktop">Book Consultation</span>
          <span class="btn-text-mobile">Book Now</span>
        </a>
      </div>

    </div>
  </div>
</header>

<!-- Proof Strip (desktop only — hidden on mobile ≤768px) -->
<div class="proof-strip-redesign">
  <div class="r-container">
    <div class="proof-strip-grid proof-strip-grid-5">
      <div class="proof-item">
        <i class="fa fa-stethoscope proof-icon"></i>
        <span class="proof-text"><strong class="highlight">15+</strong> Years of Expertise</span>
      </div>
      <div class="proof-item">
        <i class="fa fa-trophy proof-icon"></i>
        <span class="proof-text"><strong class="highlight">70%</strong> IVF Success Rate</span>
      </div>
      <div class="proof-item">
        <i class="fa fa-child proof-icon"></i>
        <span class="proof-text"><strong class="highlight">2000+</strong> Successful Pregnancies</span>
      </div>
      <div class="proof-item">
        <i class="fa fa-star proof-icon"></i>
        <span class="proof-text"><strong class="highlight">4.9&#9733;</strong> Google Rating</span>
      </div>
      <div class="proof-item">
        <i class="fa fa-map-marker proof-icon"></i>
        <span class="proof-text">Baner, Pune &middot; Mon&ndash;Sun: 10am&ndash;7pm</span>
      </div>
    </div>
  </div>
</div>
```

### Header notes
- **Subfolder pages** (`services/*.html`): change all `href` values to `../services/...`, `../index.html`, `../about-us.html`, `../contact.html`; change logo `src` to `../images/nakshatra-logo.jpg`
- The `#appointment-section` anchor links to the contact/booking form on each page
- The header proof strip is **hidden on mobile** (`display: none` at ≤768px) via `.proof-strip-redesign` CSS
- The `.header-location-pill` is hidden on mobile (≤992px)
- On mobile the CTA shows "Book Now" via `.btn-text-mobile`; on desktop it shows "Book Consultation" via `.btn-text-desktop`

---

## SECTION 7 — REQUIRED JAVASCRIPT (copy to every page)

The following JS must be present for header behavior, mobile nav, reveal animations, and sticky bar. Copy from the `<script>` block at the bottom of `index.html`. Key behaviors it handles:

1. **Header scroll shrink** — adds `.scrolled` to `.site-header-redesign` on scroll
2. **Mobile nav** — `#navToggle` opens, `#navClose` closes, `#navOverlay` dims background
3. **Mega menu** — hover/click on `.mega-trigger` toggles `.mega-menu-panel`
4. **IntersectionObserver reveal** — adds `.visible` to any `.reveal` or `.reveal-stagger` element when 4% visible in viewport (`rootMargin: '0px 0px -40px 0px'`)
5. **Progress bar** — updates `#scrollProgressBar` width as user scrolls
6. **Mobile sticky bar** — `.mobile-sticky-bar` shows on mobile after 300ms, hides on CTA click

---

## SECTION 8 — FOOTER (copy verbatim to every page)

The footer lives inside the `index.html` near the bottom. It contains:
- Logo + tagline
- 4-column link grid (Services, Diagnostics, Company, Contact)
- Social links (Instagram, Facebook, YouTube)
- Bottom bar with copyright + legal links

**Copy the full footer HTML block** from `index.html` (search for `<footer class="site-footer-redesign">`). Adjust `href` path depth for subfolder pages.

### Mobile Sticky Bar (also copy)
```html
<div class="mobile-sticky-bar">
  <a href="#appointment-section" class="msb-btn msb-primary" onclick="document.querySelector('.mobile-sticky-bar').style.display='none'">
    <i class="fa fa-calendar-check-o"></i>
    <span>Book Consult</span>
  </a>
  <a href="tel:+917058658711" class="msb-btn">
    <i class="fa fa-phone"></i>
    <span>Call Now</span>
  </a>
  <a href="https://wa.me/917058658711" class="msb-btn">
    <i class="fab fa-whatsapp"></i>
    <span>WhatsApp</span>
  </a>
</div>
```

---

## SECTION 9 — ANIMATIONS & TRANSITIONS

### A. Scroll Reveal (JS + CSS)
Used throughout the page to fade + slide elements in as user scrolls.

**Usage:** Add `class="reveal"` to any block element.

```css
/* Base hidden state */
.reveal {
  opacity: 0;
  transform: translateY(35px) scale(0.98);
  clip-path: inset(12% 8% 12% 8% round 24px);
  transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1),
              transform 1.2s cubic-bezier(0.16, 1, 0.3, 1),
              clip-path 1.2s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Triggered by IntersectionObserver adding .visible */
.reveal.visible {
  opacity: 1;
  transform: translateY(0) scale(1);
  clip-path: inset(0% 0% 0% 0% round 24px);
}
```

**Do NOT use `.reveal` on elements that are always visible at page load** (at the top of the page). Use CSS `@keyframes` instead (see Section 9C).

### B. Staggered Reveal Grid
```html
<div class="reveal-stagger">
  <div>Card 1</div>
  <div>Card 2</div>
  <div>Card 3</div>
</div>
```
Children animate in with 0.1s stagger between each, triggered by IntersectionObserver on parent.

### C. CSS Keyframe Animations (no JS, fires on load)
Use when the section is near the top of the page and may already be in viewport:

```css
@keyframes proofItemIn {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Apply with staggered delays */
.element { animation: proofItemIn 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
.element:nth-child(1) { animation-delay: 0.15s; }
.element:nth-child(2) { animation-delay: 0.25s; }
```

### D. Proof Strip Entry Animation (slide down from header)
```css
@keyframes stripReveal {
  from { opacity: 0; transform: translateY(-20px); }
  to   { opacity: 1; transform: translateY(0); }
}
.proof-strip-redesign {
  animation: stripReveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both;
}
```

### E. Floating Card Animations (hero video cards)
```css
@keyframes float-element {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-10px); }
}
@keyframes float-element-reverse {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(10px); }
}
```

### F. Treatment Card Clip-Path Reveal
```css
@keyframes cardReveal {
  from { clip-path: inset(0 100% 0 0 round 20px); opacity: 0; }
  to   { clip-path: inset(0 0% 0 0 round 20px); opacity: 1; }
}
```

### G. Standard Hover Transitions
- **All interactive cards:** `transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1)` — lifts `translateY(-4px)`, deeper shadow on hover
- **Buttons:** `translateY(-2px)` on hover, shadow deepens
- **Icon boxes:** scale `1.10–1.12` on hover, color shifts to brand pink with glow
- **Spring easing:** `cubic-bezier(0.34, 1.56, 0.64, 1)` for spring/bounce effect
- **Smooth easing:** `cubic-bezier(0.16, 1, 0.3, 1)` for smooth deceleration

---

## SECTION 10 — RESPONSIVE BREAKPOINTS

| Breakpoint | Rule | Key changes |
|---|---|---|
| `≤1200px` | Tablet wide | Proof strip wraps to 2 rows |
| `≤992px` | Tablet | Hero goes 1-column; mobile nav drawer activates; floating cards hidden |
| `≤900px` | Tablet narrow | Hero proof band wraps to 2×2 grid; pricing grid → 2 cols |
| `≤768px` | Mobile | `r-section` padding → 64px; proof strip header **hidden** |
| `≤600px` | Mobile mid | Pricing grid → 1 col; fear cards → 1 col |
| `≤480px` | Mobile small | Hero H1 shrinks; mobile sticky bar shows; font sizes reduced |

---

## SECTION 11 — SECTION PATTERNS (templates for inner pages)

### Inner Page Hero (service/blog pages)
For non-homepage pages, use a simpler hero:

```html
<section class="r-section" style="background: var(--gradient-hero); padding: 60px 0 80px;">
  <div class="r-container">
    <div class="r-section-title-wrapper reveal">
      <span class="r-section-subtitle">IVF &amp; ART</span>
      <h1 class="r-section-title" style="font-size: clamp(32px, 5vw, 56px);">
        IVF Treatment in Baner, <span>Pune</span>
      </h1>
      <p class="r-section-desc">
        Supporting description — 1–2 sentences max. Clear, patient-friendly.
      </p>
      <div style="display:flex; gap:16px; margin-top:24px; flex-wrap:wrap;">
        <a href="#appointment-section" class="r-btn-primary">Book Consultation <i class="fa fa-arrow-right"></i></a>
        <a href="tel:+917058658711" class="r-btn-secondary"><i class="fa fa-phone"></i> +91 70586 58711</a>
      </div>
    </div>
  </div>
</section>
```

### Content Section (white background)
```html
<section class="r-section">
  <div class="r-container">
    <div class="r-section-title-wrapper reveal">
      <span class="r-section-subtitle">Eyebrow</span>
      <h2 class="r-section-title">Section Title <span>with accent</span></h2>
      <p class="r-section-desc">Description text.</p>
    </div>
    <!-- content here -->
  </div>
</section>
```

### Blush Background Section
```html
<section class="r-section" style="background: var(--color-blush);">
```

### Dark Navy Section (for contrast bands)
```html
<section style="background: linear-gradient(135deg, #18163F 0%, #3A255F 100%); padding: 80px 0;">
```
All text inside must be white. Use `color: #FFFFFF` and `color: rgba(255,255,255,0.7)` for body text.

### Card Grid (3-up)
```html
<div style="display:grid; grid-template-columns: repeat(3,1fr); gap:24px;" class="reveal-stagger">
  <div class="r-card">
    <!-- card content -->
  </div>
</div>
```

### Standard Card
```html
<div class="r-card">
  <div class="card-icon-box"><i class="fa fa-..."></i></div>
  <h3>Card Title</h3>
  <p>Card description text.</p>
</div>
```

---

## SECTION 12 — TYPOGRAPHY SCALE

| Element | Font | Size | Weight | Color |
|---|---|---|---|---|
| H1 (homepage hero) | Playfair Display | `clamp(38px, 4.5vw, 64px)` | 800 | `#18163F` |
| H1 (inner pages) | Playfair Display | `clamp(32px, 5vw, 56px)` | 700 | `#18163F` |
| H2 (section titles) | Playfair Display | `clamp(28px, 4vw, 44px)` | 700 | `#18163F` |
| H3 (card titles) | Onest | 20–22px | 700 | `#18163F` |
| H4 | Onest | 16–18px | 700 | `#18163F` |
| Body / paragraphs | Onest | 16–18px | 400 | `#4F4A5F` |
| Section desc | Onest | 17px | 400 | `#4F4A5F` |
| Eyebrow labels | Onest | 14px | 700 | `#D91B72` |
| Muted/caption | Onest | 13px | 500 | `#7B7488` |
| Buttons | Onest | 15px | 700 | white / pink |

**Letter-spacing:** Headings use `-0.02em`. Eyebrow labels use `0.1em`. Buttons use normal.

---

## SECTION 13 — COLOR USAGE RULES

| Use case | Color |
|---|---|
| Primary CTA buttons | `#D91B72` |
| Hover state of primary | `#B5145E` |
| Accent text / highlights / icons | `#D91B72` |
| Section eyebrow labels | `#D91B72` |
| Card icon backgrounds (light) | `#FCE8F2` |
| Section backgrounds (blush) | `#FFF4F8` |
| Lavender accents | `#F3EDFF` |
| All main headings | `#18163F` |
| Secondary headings | `#3A255F` |
| Paragraph text | `#4F4A5F` |
| Muted / supporting text | `#7B7488` |
| Dark band backgrounds | `#18163F` → `#3A255F` gradient |
| Near-black (proof band) | `#07061A` |
| Instagram/brand pink section bg | `linear-gradient(135deg, #B8155A 0%, #D91B72 45%, #E8206E 100%)` |

**Rule:** Never use plain black (`#000000`) anywhere. Use `#18163F` (deep navy) instead.

---

## SECTION 14 — SPACING SYSTEM

| Token | Value | Usage |
|---|---|---|
| `--radius-sm` | 12px | Small chips, badges, small cards |
| `--radius-md` | 18px | Standard cards, pricing cards |
| `--radius-lg` | 24px | Large cards, hero card |
| `--radius-xl` | 32px | Hero video card, featured elements |
| Section padding (desktop) | 100px top/bottom | All `.r-section` |
| Section padding (mobile) | 64px top/bottom | ≤768px |
| Container side padding | 24px each side | Via `calc(100% - 48px)` |
| Card internal padding | 24px | Standard cards |
| Card gap in grids | 20–24px | Between cards |
| Button padding | 14px 28px | Standard; smaller on mobile |
| Section title margin-bottom | 56px | Below `.r-section-title-wrapper` |

---

## SECTION 15 — SPECIAL SECTIONS (homepage-specific, reference for adaptation)

### Hero Proof Band (just below hero)
A dark near-black stats strip with 5 metrics. **Uses CSS animation, not JS reveal.** Key CSS class: `.hero-proof-band`.
- Background: `#07061A` with dot-grid `::before` and top gradient accent line `::after`
- 5 items: icon box + large stat number + label
- Hover lifts item with subtle glow on icon
- Responsive: wraps to 2×2+1 grid on mobile

### Header Proof Strip (below nav, desktop only)
CSS class: `.proof-strip-redesign`. **Hidden on mobile** (`display:none` at ≤768px).
- Dark navy background `#110F2B`
- 5 proof items with gold icons
- Slides in from above on page load via `stripReveal` animation

### Male Fertility Band
Dark navy gradient section with white text. CSS class: `.male-fertility-band`.
- Background: `linear-gradient(135deg, #18163F 0%, #3A255F 100%)`
- Left: text + list + 2 CTA buttons
- Right: 3 stat cards with numbers

### Instagram Reels Section
Brand pink gradient background. CSS class: `.insta-reels-section`.
- Horizontal scroll track of embed cards
- Follow CTA button (frosted glass pill)
- Decorative translucent circles

---

## SECTION 16 — COMPLETE PAGE SHELL (use as starting template)

Every page should follow this exact shell structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <!-- Google Analytics, GTM scripts (copy from index.html) -->

  <!-- SEO Meta -->
  <title>PAGE TITLE | Nakshatra IVF Center Baner Pune</title>
  <meta name="description" content="...">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- OG / Twitter meta -->
  <meta property="og:title" content="...">
  <meta property="og:description" content="...">

  <link rel="canonical" href="https://www.nakshatraclinic.com/PAGE-URL">
  <link rel="shortcut icon" type="image/x-icon" href="images/nakshatra-logo-loader.png">

  <!-- Stylesheets -->
  <link href="css/all.min.css" rel="stylesheet">
  <link href="css/nakshatra-redesign.css?v=17.0" rel="stylesheet">
  <link rel="stylesheet" href="https://www.maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">

  <!-- JSON-LD Schema (page-specific) -->
</head>

<body class="redesign-body">

  <!-- Scroll progress bar -->
  <div class="scroll-progress-bar" id="scrollProgressBar"></div>
  <!-- Nav overlay -->
  <div class="nav-overlay" id="navOverlay"></div>
  <!-- Floating buttons -->
  <a href="tel:+917058658711" class="phone-float-redesign" ...>...</a>
  <a href="https://wa.me/917058658711" class="whatsapp-float-redesign" ...>...</a>

  <!-- HEADER (copy full header block from Section 6 above) -->

  <!-- MAIN PAGE CONTENT -->
  <main>
    <!-- Page hero -->
    <!-- Content sections -->
    <!-- CTA / appointment form section -->
  </main>

  <!-- FOOTER (copy from index.html) -->

  <!-- MOBILE STICKY BAR -->
  <div class="mobile-sticky-bar">...</div>

  <!-- Scripts (copy full script block from index.html) -->
  <script>
    // ... (copy the IIFE from index.html bottom)
  </script>

</body>
</html>
```

---

## SECTION 17 — WRITING STYLE & TONE GUIDELINES

These apply to all copy written for service pages, blog pages, and CTAs:

- **Voice:** Direct, warm, medical but human — like a doctor talking to a friend
- **Avoid:** "World-class", "Best-in-class", "State-of-the-art" (generic)
- **Use:** Specific details — "70% IVF success rate", "15+ years", "2000+ pregnancies"
- **CTA text:** "Book Consultation" (never "Book Free Consult" — no free consultation offered)
- **No mention of ₹100 consultation** — this service does not exist
- **IUI pricing:** Starts from ₹2,900
- **IVF pricing:** From ₹1,20,000
- **ICSI pricing:** From ₹1,50,000
- **Doctor name:** Dr. Ramit Kamate
- **Clinic name:** Nakshatra Fertility & IVF Center
- **Location:** Baner, Pune (Office No. 101, Chaitanya High Point, Dasara Chowk, Balewadi Gaon)
- **Phone:** +91 70586 58711
- **Hours:** Mon–Sun: 10am–7pm
- **Affiliations:** ISAR Member, FOGSI Member
- **Languages:** Marathi, Hindi, English

---

## SECTION 18 — WHAT NOT TO DO

1. **Do NOT** write new CSS for components that already exist in `nakshatra-redesign.css`
2. **Do NOT** use `overflow: hidden` on cards that have absolutely-positioned label badges — use `overflow: visible` instead
3. **Do NOT** use curly/smart quotes (`"` `"`) in any HTML attribute values — use straight ASCII `"`
4. **Do NOT** nest `@keyframes` inside `@supports` blocks
5. **Do NOT** use plain black `#000000` for text — use `#18163F`
6. **Do NOT** add `opacity: 0` to elements near the top of the page and expect IntersectionObserver to reveal them — use CSS `@keyframes` instead
7. **Do NOT** use `reveal` class on the hero section itself (it's above the fold and won't trigger)
8. **Do NOT** change any existing `href` links, form `action` attributes, or `id` values that scripts depend on
9. **Do NOT** mention "free consultation" anywhere — it does not exist
10. **Do NOT** set `overflow: hidden` on `.pricing-grid` or `.pricing-card` if a `.pricing-card-label` badge needs to show above the card

---

## SECTION 19 — PROMPT TEMPLATE FOR NEW CLAUDE SESSION

Copy and paste this prompt when starting a new session to redesign a specific page:

---

**PROMPT:**

You are redesigning a specific page of the Nakshatra IVF clinic website. The homepage (`index.html`) has already been redesigned. Your job is to apply the same design system to the page I will give you.

**Before you start, read this:** `NAKSHATRA_BRAND_GUIDELINES.md` — it contains all CSS variables, component classes, the full header HTML, footer reference, animation patterns, spacing system, and writing guidelines.

**Your rules:**
1. Keep every existing `href`, `src`, `action`, `id`, `name`, and internal link exactly as-is
2. Only add `class` attributes and restructure HTML around existing content
3. Use CSS classes from `nakshatra-redesign.css` — do not write new CSS unless a component is genuinely unique to this page (in that case, add a `<style>` block in the `<head>`)
4. Add `class="redesign-body"` to `<body>`
5. Replace the existing header with the new header from Section 6 of the brand guidelines (adjust paths for subfolder depth)
6. Copy the footer from `index.html` (adjust paths for subfolder depth)
7. Copy the mobile sticky bar, floating phone/WhatsApp buttons, scroll progress bar
8. Copy the full JavaScript block from the bottom of `index.html`
9. Link the stylesheet: `<link href="[PATH]/css/nakshatra-redesign.css?v=17.0" rel="stylesheet">`
10. Apply `reveal` class to content sections that are below the fold
11. Use `r-section-title-wrapper`, `r-section-subtitle`, `r-section-title`, `r-section-desc` for all section headers
12. Use `r-btn-primary` and `r-btn-secondary` for all CTAs
13. Use `r-container` for all content widths
14. Use the dark navy gradient `linear-gradient(135deg, #18163F 0%, #3A255F 100%)` for any dark/CTA band sections
15. Wrap cards in `reveal-stagger` for staggered entrance animations

**The page I want you to redesign:** [PASTE THE CURRENT PAGE HTML HERE]

---

*End of Nakshatra Brand Guidelines — Version 1.0 | Last updated: May 2026*
