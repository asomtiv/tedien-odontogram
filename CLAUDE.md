# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository

GitHub: https://github.com/asomtiv/tedien-odontogram.git

## Commands

```bash
# Node.js must be in PATH on Windows — add it if needed:
export PATH="/c/Program Files/nodejs:$PATH"

npm run dev      # Start dev server (Turbopack) at localhost:3000
npm run build    # Production build + TypeScript check
npm run lint     # ESLint
```

## Architecture

This is a **Next.js 16 / React 19 / Tailwind CSS 4** project whose sole purpose is to develop and demo the `OdontogramBoard` component. The dev app (`src/app/`) is just a wrapper — the real deliverable is the self-contained folder `src/components/odontogram/`.

### Component folder: `src/components/odontogram/`

The folder is intentionally free of Next.js dependencies so it can be copied directly into any React + Tailwind project.

| File | Role |
|------|------|
| `types.ts` | Public data contract (`FaceStatus`, `FaceName`, `ToothFaces`, `OdontogramData`, `OdontogramProps`) |
| `constants.ts` | SVG polygon coordinates, FDI row layouts, color map, `getFacePolygons()`, `isMesialRight()` |
| `OdontogramBoard.tsx` | Stateless master component — entry point for consumers |
| `ToothRow.tsx` | Renders a horizontal row of 16 teeth with midline separator |
| `Tooth.tsx` | Single SVG tooth with 5 clickable faces + Radix Popover anchor |
| `FacePopoverContent.tsx` | Diagnosis selection panel rendered inside the popover |
| `index.ts` | Barrel export |

### Data flow

`OdontogramBoard` is **fully controlled**: it owns no dental data state. It receives `data: OdontogramData` and fires `onChange(toothId, face, status)` on every user action. The only local state in the tree is `activeFace: FaceName | null` inside `Tooth.tsx`, which tracks which face's popover is open.

### FDI layout

Teeth are displayed as the clinician sees the patient (mirror view):

- Upper row: `18 17 … 11 | 21 22 … 28`
- Lower row: `48 47 … 41 | 31 32 … 38`

Mesial/distal orientation is resolved by `isMesialRight(toothId)`: quadrants 1 and 4 have mesial on the right, quadrants 2 and 3 on the left.

### SVG geometry

Each tooth uses `viewBox="0 0 100 100"` with two concentric squares:
- Outer: `(5,5)–(95,95)`, Inner: `(30,30)–(70,70)`

The four trapezoids + center square are defined in `constants.ts`. Vestibular/lingual swap between upper and lower teeth.

### Radix Popover integration

Because SVG `<polygon>` elements cannot serve as Radix trigger refs, `Tooth.tsx` uses `Popover.Anchor` on the `<svg>` itself and controls open state via `onClick` on each polygon.

### Path alias

`@/*` maps to `src/*` (configured in `tsconfig.json`). Use `@/components/odontogram` for imports inside the Next.js app.
