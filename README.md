# Estudio Cimiento — Design System

**Agencia de sistemas operativos digitales para pequeños negocios y emprendedores.**
Founded by Suka (Mateo De Falco).

> **Tagline:** sistemas que ordenan tu operación.
> **Promise:** construimos la base digital de tu negocio y te dejamos al mando.

Estudio Cimiento builds the digital foundation of small businesses and leaves their owners in command of their own operation. The real product is organizational clarity: understanding how a client's business works and translating that into digital structure. Technology (Notion, AI, web) is the vehicle; the differentiator is the **handoff** — the client ends up autonomous, not dependent.

---

## What this repo contains

This repository is the **Estudio Cimiento design system** — the complete visual and component foundation for all brand interfaces:

- **Design tokens** (`tokens/`) — color, typography, spacing, effects, and font imports as CSS custom properties
- **Core components** (`components/`) — React (JSX) components with TypeScript definitions and usage prompts
- **Landing UI kit** (`ui_kits/landing/`) — hero, nav, process, proof, and wedge sections for the brand site
- **Operaciones UI kit** (`ui_kits/operaciones/`) — the Notion-style operations and tasks board (the wedge product)
- **Brand assets** (`assets/`) — SVG logos and symbol in all variants
- **Guidelines** (`guidelines/`) — HTML specimen cards for each design token category
- **CSS entry point** (`styles.css`) — single import that pulls in all tokens

---

## Brand color palette

The system ships two modes. **Day is the primary**; night activates via `data-theme="night"`.

| Role | Day | Night |
|---|---|---|
| Background | `#F4F0E8` (cream) | `#1E2530` (steel) |
| Surface raised | warm off-white | `#2A323F` |
| Ink / text | `#1C1E22` | `#F2F0EA` (cream) |
| Muted text | `#8A8276` (warm gray) | `#8A93A0` (cool gray) |
| Accent (metallic) | `#B5863C` (bronze) | `#D89149` (copper) |

**Accent rule:** the metallic goes in small doses — symbol, hairline, detail, a single primary CTA. Never large metallic areas.

---

## Typography

- **Primary:** [Hanken Grotesk](https://fonts.google.com/specimen/Hanken+Grotesk) — humanist grotesque, weights 300–700
- **Mono:** JetBrains Mono — for data tables and code
- Headlines in weight **500 (medium)** with negative tracking (`-0.02em`)
- **Overline** is the brand's typographic signature: lowercase, wide tracking (`0.32em`), accent color

> If you hold a General Sans license, replace Hanken Grotesk in `tokens/fonts.css`.

---

## How to use

### Tokens

Link `styles.css` as the single entry point — it imports all token files:

```html
<link rel="stylesheet" href="/styles.css">
```

Then use CSS custom properties in your stylesheets:

```css
.my-element {
  background: var(--surface-base);
  color: var(--ink-primary);
  border-color: var(--accent);
}
```

### Components

Components live in `components/` as React JSX with TypeScript definitions. Each component includes a `.prompt.md` file that documents intent and usage for AI-assisted development.

```jsx
import Button from './components/core/Button'
import Logo from './components/brand/Logo'
import PhaseList from './components/brand/PhaseList'
```

---

## Folder structure

```
EstudioCimiento/
├── styles.css                  # CSS entry point (imports all tokens)
├── SKILL.md                    # Claude Code Agent Skill definition
├── tokens/
│   ├── colors.css              # Color custom properties (day + night)
│   ├── typography.css          # Type scale
│   ├── spacing.css             # 8px-base spacing and border radii
│   ├── effects.css             # Shadows and transitions
│   └── fonts.css               # @font-face / Google Fonts import
├── assets/
│   ├── logo-day.svg            # Full lockup, day palette
│   ├── logo-night.svg          # Full lockup, night palette
│   ├── symbol.svg              # Symbol only (currentColor)
│   ├── symbol-bronze.svg       # Symbol, day accent
│   └── symbol-copper.svg       # Symbol, night accent
├── components/
│   ├── core/                   # Button, Badge, Tag, Card
│   ├── forms/                  # Input
│   └── brand/                  # Logo, Overline, PhaseList
├── ui_kits/
│   ├── landing/                # Brand site sections
│   └── operaciones/            # Operations & tasks board (wedge product)
└── guidelines/                 # HTML specimen cards for the design system
```

---

## The four service phases

Estudio Cimiento's engagement follows four structured phases, visualized as ascending steps (the brand symbol):

1. **Relevamiento** — Understand how the business actually works
2. **Desarrollo** — Build the digital structure
3. **Validacion** — Test with the client in real conditions
4. **Traspaso** — Full handoff; the client takes command

These phases appear as the `PhaseList` brand component.

---

## Case study: Gryphon

A financial firm managed its entire client database in a spreadsheet that stopped scaling as the business grew. Suka built a custom online management platform: comitente administration, multi-market operations dashboard, organized databases, and a task system. The result was a significant reduction in operational time; the client runs the system independently.

> Format: context, problem, solution, result. (**Note:** exact time-saving metrics are pending confirmation before publication.)

---

## Claude Code Agent Skill

`SKILL.md` in the repo root defines an **Agent Skill** for Claude Code. When this repo is loaded as a skill, Claude becomes an expert Estudio Cimiento designer — able to generate on-brand HTML prototypes, production components, and brand assets following all visual and voice guidelines documented here.

Invoke it via `/estudio-cimiento-design` in a Claude Code session that has this repo configured as a skill source.

---

## Brand language note

The brand voice is **Argentine Spanish (rioplatense)** — voseo ("quedas al mando"), first-person plural for the agency ("construimos"), lowercase as a typographic treatment for headlines and the logotype, and no decorative emojis. This README is in English for GitHub discoverability; all user-facing copy ships in Spanish.
