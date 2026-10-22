#!/usr/bin/env python3
"""
nakshatra_qa_fix.py
Bulk QA fix script for Nakshatra IVF location pages.

Fixes all known systemic bugs across every best-ivf-center-in-*.html file.

Usage:
  python nakshatra_qa_fix.py           # apply all fixes
  python nakshatra_qa_fix.py --dry-run # preview changes without writing

Before running:
  Fill in EGG_DONATION_BODY and RIF_BODY below with the correct card text.
"""

import re
import sys
import os
from pathlib import Path

# ──────────────────────────────────────────────────────────────────────────────
# CONFIGURATION — edit the two TODO lines before running
# ──────────────────────────────────────────────────────────────────────────────

WEBSITE_DIR = Path(__file__).parent  # same folder as this script

# ── Paste Egg Donation card body text here (replace the TODO string) ──────────
EGG_DONATION_BODY = (
    "TODO: Paste Egg Donation Program card body text here."
)

# ── Paste RIF card body text here (replace the TODO string) ──────────────────
RIF_BODY = (
    "TODO: Paste Repeated Implantation Failure (RIF) Treatment card body text here."
)

# ─────────────────────────────────────────────────────────────────────────────
# Do not edit below this line
# ─────────────────────────────────────────────────────────────────────────────

DRY_RUN = "--dry-run" in sys.argv

# The Sperm Donation text that was incorrectly copy-pasted into both cards
SPERM_DONATION_COPY = (
    "Severe male infertility or genetic concerns? Anonymous sperm donation from "
    "rigorously tested donors helps build family. Entire process remains "
    "confidential with counseling support provided."
)


def get_location(content: str) -> str:
    """Extract location from header pill, e.g. 'Punawale, PCMC'."""
    m = re.search(
        r'class="header-location-pill"[^>]*>.*?fa-map-marker[^>]*></i>\s*([^<]+?)\s*</div>',
        content,
    )
    return m.group(1).strip() if m else "Unknown Location"


def apply_fixes(content: str) -> tuple[str, list[str]]:
    """Apply all fixes. Returns (new_content, list_of_change_descriptions)."""
    changes: list[str] = []

    # ── FIX 1: Email typo ─────────────────────────────────────────────────────
    # nakshtraclinic (missing 'a') → nakshatraclinic
    count = content.count("nakshtraclinic@gmail.com")
    if count:
        content = content.replace(
            "nakshtraclinic@gmail.com", "nakshatraclinic@gmail.com"
        )
        changes.append(f"Email typo fixed in {count} place(s)")

    # ── FIX 2: GA URL — add missing www. ─────────────────────────────────────
    if "https://googletagmanager.com/" in content:
        content = content.replace(
            "https://googletagmanager.com/",
            "https://www.googletagmanager.com/",
        )
        changes.append("GA URL: added missing www.")

    # ── FIX 3: Move GA scripts from between </head> and <body> into <body> ────
    # Matches the two GA script tags sitting between </head> and <body class=...>
    ga_misplaced = re.compile(
        r"(</head>)\n"
        r"(<script async src=\"https://www\.googletagmanager\.com/gtag/js[^\"]*\"></script>\n"
        r"<script>\n"
        r"  window\.dataLayer = window\.dataLayer \|\| \[\];\n"
        r"  function gtag\(\)\{dataLayer\.push\(arguments\);\}\n"
        r"  gtag\('js', new Date\(\)\);\n\n"
        r"  gtag\('config', 'G-G3JF3BY7JN'\);\n"
        r"</script>)\n"
        r"(<body class=\"redesign-body\">)",
        re.DOTALL,
    )
    m = ga_misplaced.search(content)
    if m:
        # Reorder: </head> → <body> → GA block
        content = ga_misplaced.sub(r"\1\n\3\n\2", content)
        changes.append("GA scripts moved from between </head>/<body> into <body>")

    # ── FIX 4: Double space in meta / OG / Twitter descriptions ──────────────
    if "rate.  Transparent" in content:
        content = content.replace("rate.  Transparent", "rate. Transparent")
        changes.append("Double space removed in description tags")

    # ── FIX 5: Twitter title trailing space ───────────────────────────────────
    new = re.sub(
        r'(<meta name="twitter:title"\s+content="[^"]+?)\s+"',
        r'\1"',
        content,
    )
    if new != content:
        content = new
        changes.append("Twitter title: trailing space removed")

    # ── FIX 6: Accordion aria-expanded swap ───────────────────────────────────
    # Item 1 is closed (has 'collapsed' class) but wrongly says aria-expanded="true"
    new = re.sub(
        r'(class="accordion-button collapsed"[^>]+?aria-expanded=")true"',
        r'\1false"',
        content,
        count=1,
    )
    if new != content:
        content = new
        changes.append("Accordion item 1: aria-expanded true → false")

    # Item 2 is open (no 'collapsed' class) but wrongly says aria-expanded="false"
    new = re.sub(
        r'(class="accordion-button"[^>]+?aria-expanded=")false"',
        r'\1true"',
        content,
        count=1,
    )
    if new != content:
        content = new
        changes.append("Accordion item 2: aria-expanded false → true")

    # ── FIX 7: @context — remove www. from schema.org (older pages only) ─────
    if '"https://www.schema.org"' in content:
        content = content.replace(
            '"https://www.schema.org"', '"https://schema.org"'
        )
        changes.append("@context: www.schema.org → schema.org")

    # ── FIX 8: Google Fonts trailing spaces (older pages only) ────────────────
    new = re.sub(r'(href="https://fonts\.[^"]+?)\s+"', r'\1"', content)
    if new != content:
        content = new
        changes.append("Google Fonts hrefs: trailing spaces removed")

    # ── FIX 9: Schema FAQ success rate 85% → 70% ─────────────────────────────
    new = re.sub(
        r"(Our IVF success rates in [^\"]+? consistently )exceed 85%",
        r"\g<1>reach 70%",
        content,
    )
    if new != content:
        content = new
        changes.append("Schema FAQ: success rate 85% → 70%")

    # ── FIX 10: MedicalWebPage — replace AUB content with IVF content ─────────
    location = get_location(content)

    aub_name = re.compile(
        r'"name":\s*"Abnormal Uterine Bleeding Treatment in [^"]+"'
    )
    if aub_name.search(content):
        content = aub_name.sub(
            f'"name": "Best IVF Center in {location} | Nakshatra Clinic"',
            content,
        )
        changes.append(f"MedicalWebPage name: AUB copy → IVF ({location})")

    aub_desc = re.compile(
        r'"description":\s*"Get advanced Abnormal Uterine Bleeding \(AUB\) treatment in [^"]+"'
    )
    if aub_desc.search(content):
        content = aub_desc.sub(
            f'"description": "Get advanced IVF, IUI and ICSI treatment in {location}. '
            f'Consult Dr. Ramit Kamate — 70%+ IVF success rate, transparent cost, EMI available."',
            content,
        )
        changes.append(f"MedicalWebPage description: AUB copy → IVF ({location})")

    # ── FIX 11: Egg Donation card — replace Sperm Donation copy ──────────────
    if "TODO" not in EGG_DONATION_BODY:
        egg_pat = re.compile(
            r"(<h3>Egg Donation Program</h3><p>)"
            + re.escape(SPERM_DONATION_COPY)
            + r"(</p></div>)"
        )
        new = egg_pat.sub(r"\g<1>" + EGG_DONATION_BODY + r"\2", content)
        if new != content:
            content = new
            changes.append("Egg Donation card: Sperm Donation copy replaced")
    else:
        changes.append(
            "⚠ SKIPPED — Egg Donation card (fill in EGG_DONATION_BODY first)"
        )

    # ── FIX 12: RIF card — replace Sperm Donation copy ───────────────────────
    if "TODO" not in RIF_BODY:
        rif_pat = re.compile(
            r"(<h3>Repeated Implantation Failure \(RIF\) Treatment</h3><p>)"
            + re.escape(SPERM_DONATION_COPY)
            + r"(</p></div>)"
        )
        new = rif_pat.sub(r"\g<1>" + RIF_BODY + r"\2", content)
        if new != content:
            content = new
            changes.append("RIF card: Sperm Donation copy replaced")
    else:
        changes.append(
            "⚠ SKIPPED — RIF card (fill in RIF_BODY first)"
        )

    return content, changes


def main() -> None:
    files = sorted(WEBSITE_DIR.glob("best-ivf-center-in-*.html"))

    if not files:
        print("No location pages found. Make sure the script is in the website folder.")
        sys.exit(1)

    mode = "DRY RUN — no files will be written" if DRY_RUN else "LIVE — files will be overwritten"
    print(f"\n{'='*60}")
    print(f"  Nakshatra IVF Bulk QA Fix  |  {mode}")
    print(f"{'='*60}")
    print(f"  Found {len(files)} location page(s)\n")

    total_changes = 0
    files_changed = 0

    for filepath in files:
        content = filepath.read_text(encoding="utf-8")
        new_content, changes = apply_fixes(content)

        real_changes = [c for c in changes if not c.startswith("⚠")]
        skips = [c for c in changes if c.startswith("⚠")]

        if real_changes:
            files_changed += 1
            total_changes += len(real_changes)
            print(f"✅  {filepath.name}")
            for c in real_changes:
                print(f"     • {c}")
            if skips:
                for s in skips:
                    print(f"     {s}")
            if not DRY_RUN:
                filepath.write_text(new_content, encoding="utf-8")
        else:
            print(f"⬜  {filepath.name} — already clean")
            if skips:
                for s in skips:
                    print(f"     {s}")

    print(f"\n{'─'*60}")
    print(f"  {total_changes} fix(es) across {files_changed} file(s)")
    if DRY_RUN:
        print("  Nothing written. Remove --dry-run to apply changes.")
    print(f"{'─'*60}\n")


if __name__ == "__main__":
    main()
