# Claude Code Setup - Portfolio Project

Dokumentasi lengkap setup Claude Code untuk development penuh project portfolio Anda.

## 📋 Daftar Isi

1. [Overview](#overview)
2. [Struktur Setup](#struktur-setup)
3. [Slash Commands](#slash-commands)
4. [MCP Servers](#mcp-servers)
5. [CLI Utility](#cli-utility)
6. [Settings & Permissions](#settings--permissions)
7. [Workflow Recommendations](#workflow-recommendations)

---

## Overview

Setup ini menyediakan integrasi penuh Claude Code dengan project Next.js portfolio Anda, mencakup:

- **Slash Commands**: Quick access ke common tasks
- **MCP Servers**: Model Context Protocol untuk tools yang lebih powerful
- **CLI Utility**: Command-line interface untuk automation
- **Permissions**: Configured untuk secure development workflow

## Struktur Setup

```
.claude/
├── settings.local.json       # Konfigurasi permissions & settings
├── mcp.json                  # MCP server configuration
├── cli.ts                    # CLI utility script
├── commands/                 # Slash commands
│   ├── dev.md               # Start dev server
│   ├── build.md             # Build project
│   ├── lint.md              # Run linter
│   └── project-structure.md # Project overview
└── mcp-servers/             # MCP server implementations
    ├── project-tools.js      # Dev tools (build, lint, dev)
    ├── filesystem.js         # File operations
    └── typescript.js         # TypeScript analysis
```

## Slash Commands

Gunakan slash commands untuk quick access ke dokumentasi & tasks:

### `/dev`
Mulai development server pada port 3000.

**Apa yang terjadi:**
- Next.js dev server starts
- Hot reload enabled
- Accessible di http://localhost:3000

### `/build`
Build project untuk production.

**Apa yang terjadi:**
- TypeScript compilation
- Component optimization
- Asset generation
- Bundle size reporting

### `/lint`
Check code quality dengan ESLint.

**Apa yang terjadi:**
- Scans untuk style violations
- Checks untuk unused variables
- Finds potential bugs
- Reports best practice issues

### `/project-structure`
Show dokumentasi lengkap project structure.

Berguna untuk memahami:
- Directory organization
- Component hierarchy
- Tech stack details
- Key files & their purposes

## MCP Servers

MCP (Model Context Protocol) servers memberikan Claude akses ke powerful tools:

### 1. Project Tools Server
**Lokasi:** `.claude/mcp-servers/project-tools.js`

**Tools tersedia:**
- `run-dev-server` - Start dev server
- `build-project` - Build production
- `run-linter` - Run ESLint
- `get-project-info` - Get project metadata

**Contoh penggunaan:**
```
Claude: Build project dan lapor hasilnya
→ Menggunakan build-project tool
→ Returns success/failure + output
```

### 2. Filesystem Server
**Lokasi:** `.claude/mcp-servers/filesystem.js`

**Tools tersedia:**
- `find-files` - Search files by pattern
- `search-code` - Search text in files
- `get-file-content` - Read file content

**Allowed paths:** `src`, `public`, `docs`, `.claude`

**Contoh penggunaan:**
```
Claude: Cari semua component yang menggunakan Framer Motion
→ Menggunakan search-code tool
→ Returns matching files & line numbers
```

### 3. TypeScript Server
**Lokasi:** `.claude/mcp-servers/typescript.js`

**Tools tersedia:**
- `get-type-errors` - Check TS compilation errors
- `get-definitions` - Find symbol definitions
- `get-file-types` - Get imports/exports for file

**Contoh penggunaan:**
```
Claude: Check ada TypeScript errors
→ Menggunakan get-type-errors tool
→ Returns error list dengan file & line numbers
```

## CLI Utility

TypeScript CLI untuk automation & quick tasks.

**Setup (optional):**
```bash
# Install ts-node globally (if needed)
npm install -g ts-node typescript

# Or use npx
npx ts-node .claude/cli.ts --help
```

**Tersedia Commands:**

```
dev          - Start development server
build        - Build project untuk production
lint         - Run ESLint
lint:fix     - Run ESLint dan fix issues otomatis
check        - Run build + lint checks
info         - Show project information
components   - List all React components
help         - Show help message
```

**Contoh:**

```bash
# Start dev server
npx ts-node .claude/cli.ts dev

# Build & check everything
npx ts-node .claude/cli.ts check

# List components
npx ts-node .claude/cli.ts components

# Fix linting issues
npx ts-node .claude/cli.ts lint:fix
```

## Settings & Permissions

**File:** `.claude/settings.local.json`

Konfigurasi permissions untuk secure development:

```json
{
  "permissions": {
    "allow": [
      "Bash(npm run dev:*)",
      "Bash(npm run build)",
      "Bash(npm run lint:*)",
      "Bash(npm run start)",
      "Bash(npm install)",
      "Read:*",
      "Write:*",
      "Edit:*",
      "Glob:*",
      "Grep:*"
    ]
  }
}
```

### Permissions Dijelaskan:

| Permission | Apa | Untuk apa |
|------------|-----|-----------|
| `Bash(npm *)` | Run npm commands | Development tasks |
| `Read:*` | Read semua files | Understand codebase |
| `Write:*` | Create/modify files | Add features, fix bugs |
| `Edit:*` | Edit existing files | Refactor, update code |
| `Glob:*` | Find files | Search codebase |
| `Grep:*` | Search file content | Find specific code |

## Workflow Recommendations

### 1. Development Session

```
Mulai dengan:
/dev
→ Claude: Mulai dev server

Claude bisa sekarang:
- Read & analyze components
- Search untuk specific code
- Suggest improvements
- Help debug issues
```

### 2. Building New Feature

```
Claude: Help saya buat <feature>

Claude akan:
1. Explore codebase menggunakan filesystem tools
2. Find related components & utilities
3. Suggest implementation approach
4. Help dengan code generation
5. Run linter untuk check quality
```

### 3. Debugging

```
Claude: Ada issue di <component>, help me debug

Claude akan:
1. Search untuk related files
2. Get TypeScript type errors
3. Analyze component logic
4. Suggest fixes
5. Run tests/build untuk verify
```

### 4. Code Review

```
Claude: Review code quality dan suggest improvements

Claude akan:
1. Run linter checks
2. Search untuk best practices
3. Check TypeScript types
4. Suggest optimizations
```

## Tips untuk Claude Code Usage

### 1. Be Specific
```
Good:   "Add a new animation to the Work section"
Better: "In Work.tsx, add hover animation untuk project cards menggunakan Framer Motion"
```

### 2. Leverage Slash Commands
```
/dev              - Start dev server dulu
/project-structure - Understand project structure
/lint             - Check code quality
```

### 3. Use Claude's Tools
Claude akan otomatis menggunakan:
- File search untuk find related code
- Filesystem operations untuk read/write
- TypeScript analysis untuk type checking
- Dev tools untuk run builds/lint

### 4. Interactive Development
```
1. /dev          - Start server
2. Make changes  - Claude edit files
3. /lint         - Check quality
4. /build        - Verify production build
```

## Troubleshooting

### MCP Servers Not Working
1. Check `.claude/mcp-servers/` files ada
2. Verify `NODE_PATH` environment variable
3. Restart Claude Code
4. Check `.claude/mcp.json` config syntax

### Permissions Denied
1. Check `.claude/settings.local.json`
2. Verify permission patterns
3. Ensure proper JSON syntax
4. Restart Claude Code

### File Access Issues
1. Files harus di allowed paths: `src`, `public`, `docs`, `.claude`
2. Node_modules & .next ignored untuk security
3. Binary files tidak supported

### TypeScript Errors
1. Check `tsconfig.json` valid
2. Run `npm install` untuk dependencies
3. Verify file paths are correct
4. Check untuk circular imports

## Advanced Configuration

### Customize Permissions
Edit `.claude/settings.local.json`:

```json
{
  "permissions": {
    "allow": [
      "Bash(npm run custom-command)",
      "Read:src/**/*"
    ],
    "deny": ["Bash(rm:*)"],
    "ask": ["Write:src/**/*"]
  }
}
```

### Add Custom Slash Commands
Create `.claude/commands/custom.md`:

```markdown
# My Custom Command

Description of what command does.

Details & instructions here.
```

### Extend MCP Servers
Edit `.claude/mcp-servers/project-tools.js`:

```javascript
const handlers = {
  'custom-tool': async (params) => {
    // Your implementation
    return result;
  }
};
```

## Resources

- [Claude Code Documentation](https://claude.com/claude-code)
- [MCP Specification](https://modelcontextprotocol.io/)
- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## Getting Help

Jika ada issues atau suggestions:

1. Check troubleshooting section
2. Review `.claude/settings.local.json` configuration
3. Verify file permissions
4. Check MCP server logs

---

**Last Updated:** November 2024
**Project:** Designer Portfolio - Next.js 14
