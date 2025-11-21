# Project Dependencies

Complete list of project dependencies dan their purposes.

## Core Dependencies

### Framework & UI
- **next@14.2.0** - React framework dengan App Router
- **react@18.3.0** - UI library
- **react-dom@18.3.0** - DOM rendering untuk React

### Animation & Graphics
- **framer-motion@11.0.0** - Declarative animation library
- **@react-three/fiber@8.15.0** - React renderer untuk Three.js
- **@react-three/drei@9.88.0** - Useful helpers untuk React Three Fiber
- **three@0.160.0** - 3D graphics library

### Utilities
- **clsx@2.1.0** - Utility untuk conditional class names
- **tailwind-merge@2.2.0** - Merge Tailwind CSS classes

## Development Dependencies

### TypeScript & Types
- **typescript@5.3.0** - TypeScript language
- **@types/node@20.11.0** - Node.js types
- **@types/react@18.2.0** - React types
- **@types/react-dom@18.2.0** - React DOM types
- **@types/three@0.160.0** - Three.js types

### Styling
- **tailwindcss@3.4.0** - Utility-first CSS framework
- **autoprefixer@10.4.0** - PostCSS plugin untuk vendor prefixes
- **postcss@8.4.0** - CSS transformation tool

### Linting & Code Quality
- **eslint@8.56.0** - JavaScript linter
- **eslint-config-next@14.2.0** - ESLint config untuk Next.js

## Tech Stack Summary

```
Frontend:
├── React 18 (UI)
├── Next.js 14 (Framework)
├── TypeScript (Language)
├── Tailwind CSS (Styling)
├── Framer Motion (Animation)
└── Three.js (3D Graphics)

Build & Development:
├── Next.js Built-in Build System
├── TypeScript Compiler
├── ESLint (Code Quality)
├── Tailwind CLI (CSS Generation)
└── PostCSS (CSS Transformation)
```

## Why These Dependencies?

### Framer Motion
- Production-grade animation library
- Great React integration
- Excellent documentation
- Used untuk all page animations

### Three.js + React Three Fiber
- 3D graphics rendering
- Interactive visual elements
- React-friendly abstraction
- Performance optimized

### Tailwind CSS
- Utility-first approach
- Small bundle size
- Great developer experience
- Dark mode support built-in

### TypeScript
- Type safety
- Better IDE support
- Catch bugs earlier
- Improved code documentation

## Adding New Dependencies

```bash
# Install production dependency
npm install <package-name>

# Install dev dependency
npm install --save-dev <package-name>

# Update dependencies
npm update

# Check for outdated packages
npm outdated
```

## Security

Check untuk security vulnerabilities:

```bash
npm audit
npm audit fix
```

Check akan automatically run pada build dan CI/CD pipelines.
