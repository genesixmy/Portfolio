# Build Project

Create a production-ready build of the project.

This command optimizes all components, removes development code, and generates static assets.

**Usage:**
```bash
npm run build
```

**What happens:**
- Compiles TypeScript
- Optimizes React components
- Generates static assets
- Creates .next folder with build output
- Reports bundle size information

**After build:**
- Run `npm run start` to test production build locally
