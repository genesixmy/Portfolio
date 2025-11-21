# Quick Start dengan Claude Code

Get started dengan Claude Code untuk portfolio project Anda dalam 5 langkah.

## Step 1: Start Development Server

```bash
npm run dev
```

Server akan start pada `http://localhost:3000`

**Alternative dengan CLI:**
```bash
npx ts-node .claude/cli.ts dev
```

**Atau gunakan slash command:**
```
/dev
```

## Step 2: Understand Project Structure

Explore project structure:

```
/project-structure
```

Atau langsung ask Claude:
```
Claude: Explain the component structure of this project
```

Claude akan menggunakan MCP filesystem tools untuk analyze struktur.

## Step 3: Make Changes

Ask Claude untuk modifications:

```
Claude: Add a new animation untuk hero section

Claude akan:
1. Find Hero.tsx component
2. Analyze existing animations
3. Suggest implementation
4. Generate new animation code
5. Update component
```

## Step 4: Check Quality

Verify code quality:

```bash
npm run lint
npm run build
```

**Atau gunakan CLI:**
```bash
npx ts-node .claude/cli.ts check
```

**Atau ask Claude:**
```
Claude: Check code quality dan run build
```

## Step 5: Continue Development

Claude sekarang siap membantu dengan:
- Bug fixes
- New features
- Code refactoring
- Performance improvements
- Testing

---

## Common Tasks

### Add New Component

```
Claude: Create new component untuk project showcase card

Dengan MCP tools, Claude akan:
1. Search existing components
2. Find styling patterns
3. Check imports & dependencies
4. Generate new component
5. Update parent component
```

### Fix Bug

```
Claude: Fix issue where animation stutters on slow devices

Claude akan:
1. Search untuk animation code
2. Analyze performance
3. Suggest optimizations
4. Make changes
5. Test dengan build
```

### Improve Performance

```
Claude: Analyze bundle size dan suggest optimizations

Claude akan:
1. Run build
2. Check component imports
3. Find unused code
4. Suggest code splitting
5. Make optimizations
```

### Refactor Code

```
Claude: Refactor the Work component untuk better maintainability

Claude akan:
1. Read component
2. Analyze structure
3. Find improvements
4. Refactor code
5. Check dengan linter
```

---

## Slash Commands Quick Reference

| Command | What | When to Use |
|---------|------|------------|
| `/dev` | Start server docs | First thing |
| `/project-structure` | Project overview | Understand structure |
| `/build` | Build docs | Before production |
| `/lint` | Linter docs | Check quality |
| `/dependencies` | Deps reference | Check tech stack |
| `/quick-start` | This guide | Getting started |

---

## Pro Tips

### 1. Use Context Efficiently
```
Good:   "Update Work.tsx animation"
Better: "In Work.tsx line 150, update project card hover animation to use spring physics"
```

### 2. Leverage Claude's Searching
```
Claude akan otomatis search untuk:
- Related components
- Similar patterns
- Existing utilities
- Type definitions
```

### 3. Interactive Development
```
1. Start server dengan /dev
2. Ask Claude untuk changes
3. Claude makes changes
4. You see live reload
5. Continue iterating
```

### 4. Verify Before Committing
```
Before git commit:
- Run /lint untuk quality
- Run /build untuk production check
- Ask Claude untuk review
```

---

## Getting Help

If stuck:

```
Claude: Explain how [component/feature] works
Claude: Help me debug this error
Claude: Suggest best practices untuk [topic]
```

Claude akan gunakan MCP tools untuk:
- Find relevant files
- Analyze code
- Understand context
- Provide accurate help

---

**Ready to start?** Proceed dengan Step 1 atau ask Claude directly!
