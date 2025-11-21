# Troubleshooting Guide

Common issues dan solutions ketika menggunakan Claude Code dengan project ini.

## Server Issues

### Dev Server Tidak Start

**Problem:** `npm run dev` fails atau port 3000 sudah dipakai

**Solutions:**
1. Check jika ada process lain menggunakan port 3000:
   ```bash
   # Windows
   netstat -ano | findstr :3000

   # Mac/Linux
   lsof -i :3000
   ```

2. Kill existing process:
   ```bash
   # Windows
   taskkill /PID <pid> /F

   # Mac/Linux
   kill -9 <pid>
   ```

3. Atau gunakan different port:
   ```bash
   npm run dev -- -p 3001
   ```

### Build Fails

**Problem:** `npm run build` error

**Solutions:**
1. Clear build cache:
   ```bash
   rm -rf .next
   npm run build
   ```

2. Check untuk TypeScript errors:
   ```bash
   npx tsc --noEmit
   ```

3. Check dependencies:
   ```bash
   npm install
   ```

---

## Code Issues

### TypeScript Errors

**Problem:** Type errors di components

**Solutions:**

1. Check dengan MCP tool:
   ```
   Claude: Check for TypeScript errors
   ```

2. Or manually:
   ```bash
   npx tsc --noEmit
   ```

3. Common fixes:
   - Import missing types
   - Add type annotations
   - Check prop types
   - Verify imports

### Linting Errors

**Problem:** ESLint violations

**Solutions:**

1. View issues:
   ```bash
   npm run lint
   ```

2. Auto-fix:
   ```bash
   npm run lint -- --fix
   ```

   Atau gunakan CLI:
   ```bash
   npx ts-node .claude/cli.ts lint:fix
   ```

3. Understand rules:
   - Check `.eslintrc.json`
   - Read ESLint docs
   - Ask Claude untuk explanation

---

## MCP Server Issues

### MCP Tools Not Available

**Problem:** Claude tidak bisa access MCP tools

**Solutions:**

1. Check files ada:
   ```bash
   ls .claude/mcp-servers/
   ```

2. Verify `.claude/mcp.json` valid:
   ```json
   {
     "mcpServers": {
       "project-tools": {
         "command": "node",
         "args": ["./.claude/mcp-servers/project-tools.js"]
       }
     }
   }
   ```

3. Check Node.js installed:
   ```bash
   node --version
   npm --version
   ```

4. Restart Claude Code

### File Access Denied

**Problem:** MCP filesystem tools tidak bisa read files

**Solutions:**

1. Check `.claude/settings.local.json`:
   ```json
   {
     "permissions": {
       "allow": ["Read:*", "Write:*"]
     }
   }
   ```

2. Check file paths allowed:
   - `src/` ✓
   - `public/` ✓
   - `docs/` ✓
   - `.claude/` ✓
   - `node_modules/` ✗ (blocked for security)

3. Check file permissions (system level)

---

## Performance Issues

### Dev Server Slow

**Problem:** Hot reload laggy atau slow

**Solutions:**

1. Check disk space:
   ```bash
   df -h  # Mac/Linux
   diskutil info /  # Mac
   ```

2. Clear cache:
   ```bash
   rm -rf node_modules/.vite
   rm -rf .next
   ```

3. Check open files:
   ```bash
   ps aux | grep node
   ```

4. Reduce scope:
   - Work on single component
   - Avoid large imports

### High Memory Usage

**Problem:** Claude Code atau dev server using lots of memory

**Solutions:**

1. Check processes:
   ```bash
   node --max-old-space-size=4096 node_modules/next/dist/bin/next
   ```

2. Restart:
   - Kill dev server
   - Restart Claude Code
   - Start fresh

3. Check untuk memory leaks:
   - Check browser devtools
   - Monitor with task manager

---

## Permission Issues

### "Permission Denied" Errors

**Problem:** Claude dapat't perform action due permissions

**Solutions:**

1. Check `.claude/settings.local.json`:
   ```json
   {
     "permissions": {
       "allow": [
         "Bash(npm run dev:*)",
         "Bash(npm run build)",
         "Read:*",
         "Write:*",
         "Edit:*"
       ]
     }
   }
   ```

2. Add missing permission (if needed)

3. Restart Claude Code

4. Verify permission syntax

### "Command Not Found"

**Problem:** Bash commands tidak working

**Solutions:**

1. Check PATH:
   ```bash
   echo $PATH
   which npm
   which node
   ```

2. Add permission untuk command:
   ```json
   {
     "permissions": {
       "allow": ["Bash(your-command:*)"]
     }
   }
   ```

3. Check Windows vs Mac/Linux syntax

---

## File Issues

### Files Not Saving

**Problem:** Claude edits tak terlihat di editor

**Solutions:**

1. Check file permissions:
   ```bash
   ls -la filename
   ```

2. Check disk space:
   ```bash
   df -h
   ```

3. Reload editor:
   - Close & reopen file
   - Restart Claude Code
   - Check git status

### Merge Conflicts

**Problem:** Multiple edits conflict

**Solutions:**

1. Resolve conflicts manually
2. Ask Claude untuk help
3. Use git để manage versions

### Character Encoding

**Problem:** Special characters corrupted

**Solutions:**

1. Ensure UTF-8:
   ```bash
   file -i filename
   ```

2. Check editor settings
3. Use specific encoding flag

---

## Package Issues

### npm Install Fails

**Problem:** `npm install` errors

**Solutions:**

1. Clear cache:
   ```bash
   npm cache clean --force
   ```

2. Delete & reinstall:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. Check permissions:
   ```bash
   chmod -R 755 node_modules
   ```

### Dependency Conflicts

**Problem:** Package version conflicts

**Solutions:**

1. Check versions:
   ```bash
   npm list
   ```

2. Fix:
   ```bash
   npm install --legacy-peer-deps
   ```

3. Or update:
   ```bash
   npm update
   ```

---

## IDE/Editor Issues

### Changes Not Reflecting

**Problem:** Code changes dalam Claude Code tidak terlihat di editor

**Solutions:**

1. Refresh editor:
   - Close file & reopen
   - Press F5 untuk reload

2. Check file location:
   - Verify correct file edited
   - Check working directory

3. Check permissions:
   - File should be writable
   - Check editor settings

### Syntax Highlighting Broken

**Problem:** Code highlighting wrong setelah Claude edit

**Solutions:**

1. Reload editor
2. Check file extension correct
3. Verify TypeScript config
4. Restart IDE

---

## Network Issues

### Build Fails Due Network

**Problem:** Build fails dengan network error

**Solutions:**

1. Check internet connection
2. Check npm registry:
   ```bash
   npm config get registry
   ```

3. Try offline:
   ```bash
   npm install --prefer-offline
   ```

4. Use different registry:
   ```bash
   npm config set registry https://registry.npmjs.org/
   ```

---

## Getting Help

Jika issue tidak resolve:

1. **Check Logs:**
   ```bash
   npm run build -- --debug
   npx tsc --noEmit --diagnostics
   ```

2. **Ask Claude:**
   ```
   Claude: I'm getting [error message], help me debug
   ```

3. **Search Online:**
   - Error message + "next.js"
   - Error message + "typescript"
   - Stack Overflow

4. **Check Documentation:**
   - `.claude/README.md`
   - Next.js docs
   - TypeScript handbook

---

**Last Updated:** November 2024
