# HI_GPT Dashboard Specification

## Overview

The HI_GPT Dashboard is a modular, privacy-first, and symbolically driven platform for self-liberation and harmonic intelligence. It integrates astrological, energetic, somatic, and behavioral data into actionable diagnostic tiles and interactive modules. All logic, terminology, and UI/UX must align with the Defrag Manifesto.

---

## Core Modules & Tiles

### 1. Celestial Wheel

- Live astrological chart with sacred geometry overlays.
- Interactive: allows date/time input for dynamic transit overlays.

### 2. Mirror State Overview

- Displays real-time emotional/psychological state.
- State: Clear, Fogged, Cracked.
- Gated insight depth per state.

### 3. Personal Map

- Gamified journey tracker with milestone visualization.

### 4. Detailed Dashboard Table

- Replicate the table in `image6.jpg`:
  - **Metrics:** Internal Gear, Somatic Field, Solar Identity, Elemental Pulse, Mirror Dynamics, Polarity Dynamics, MSI Index, Hill Index, Ancestral Gate.
  - **Columns:** Category, Status, Score, Aspect.

### 5. Advanced Multi-Composite Tiles

- Family Constellation Tile: inherited family patterns (Penta, HD overlays).
- Multi-layer overlays: combine astrological transits, biometrics, behavioral patterns.

---

## Data & Logic

- **Required inputs:** Name, Date of Birth, Time of Birth, Location of Birth.
- **Partial mode:** If incomplete, suppresses advanced overlays.
- **Astrology Engine:** Integrate Swiss Ephemeris API for planetary positions.
- **Somatic/Biometric Inputs:** Accepts optional time-tagged data (dreams, HRV, chills).
- **Symbolic Scoring:**
  - `generateMSI()`: Macro-Synchronicity Index (Kairotic Score, 0-100), narrative phase label.
  - `parseSomaticMirror()`: Determines Mirror State.
  - `resonanceScore()`: Scores symbol relevance.
  - `microNodeChecker()`: Detects minor planetary aspects for dream/archetype validation.

---

## UI/UX & Aesthetic

- Minimalist monochrome theme with sacred geometry overlays.
- Black/white and gold/indigo palettes.
- Serif fonts for titles, sans-serif for body.
- All iconography and overlays must echo sacred geometry, toroidal, caduceus, and archetypal forms (see `/docs/branding/README.md`).
- Narrative tone: empowerment, autonomy, mythic, not self-help/cult.

---

## Privacy

**Created:** 2025-07-31 22:03:13  

## Extensibility

- All modules and tiles must be modular, testable, and extensible for future data sources and archetype overlays.

---

## References

- See `/docs/branding/README.md` for all visual and motif references.
- See `defrag_app_doc_manifesto_Version10 (1).md` for philosophy, narrative, and tone.
