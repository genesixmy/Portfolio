# Project Structure Overview

Understand the organization of this Next.js portfolio project.

## Directory Layout

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── sections/          # Page sections (Hero, Work, Skills, etc)
│   ├── common/            # Reusable components (Navigation, Footer, etc)
│   └── three/             # Three.js components
└── lib/                   # Utilities and helpers
    ├── utils.ts           # Common utilities
    └── cn.ts              # Tailwind classname merger

public/
├── projects/              # Project screenshots
├── skills/                # Skill icons
└── favicon.ico

Configuration Files:
- tsconfig.json            # TypeScript configuration
- tailwind.config.ts       # Tailwind CSS settings
- next.config.mjs          # Next.js configuration
- postcss.config.mjs       # PostCSS plugins
- .eslintrc.json          # ESLint rules

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **UI Library:** React 18
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **3D Graphics:** Three.js + React Three Fiber
- **Language:** TypeScript
- **Linting:** ESLint

## Key Components

1. **Sections** - Major page sections with animations
   - Hero - Landing/introduction
   - Work - Project portfolio showcase
   - Skills - Technical skills
   - Contact - Contact information

2. **Common** - Shared components
   - Navigation - Header/navbar
   - Footer - Footer section
   - Button variants - CTA buttons

3. **Three** - 3D interactive elements
   - Scene setup
   - Models and animations
