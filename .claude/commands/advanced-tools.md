# Advanced Development Tools

Comprehensive guide untuk advanced tools dan features.

## Tools Included

### 1. Testing Framework (Vitest)
- **Unit testing** dengan Vitest
- **React Testing Library** untuk component testing
- **Coverage reports** untuk track test quality
- **UI dashboard** untuk visual test execution

### 2. E2E Testing (Playwright)
- **Cross-browser testing** (Chrome, Firefox, Safari)
- **Mobile testing** (iOS, Android)
- **Visual regression** testing capability
- **Interactive debugging** dengan Playwright inspector

### 3. Code Quality Tools
- **ESLint** dengan TypeScript support
- **Prettier** untuk automatic formatting
- **Husky** para pre-commit hooks
- **lint-staged** untuk staged file linting

### 4. Performance Tools
- **Bundle analyzer** untuk bundle size analysis
- **Performance metrics** tracking
- **Next.js optimizations** built-in
- **Type checking** dalam build pipeline

## Quick Command Reference

### Development

```bash
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Run production build
npm run type-check       # Check TypeScript types
```

### Testing

```bash
npm run test             # Run unit tests
npm run test:watch       # Watch mode
npm run test:ui          # UI dashboard
npm run test:coverage    # With coverage report
npm run e2e              # Run E2E tests
npm run e2e:ui           # E2E with UI
npm run e2e:debug        # E2E debug mode
```

### Quality

```bash
npm run lint             # Run ESLint
npm run lint:fix         # ESLint + Prettier fix
npm run format           # Run Prettier
npm run format:check     # Check formatting
npm run precommit        # Pre-commit checks
```

### Performance

```bash
npm run analyze          # Bundle analysis
npm run bundle-analyze   # Bundle report
```

## Workflows

### Development Workflow

```bash
# 1. Start development
npm run dev

# 2. In another terminal, watch tests
npm run test:watch

# 3. Make changes and see live reload
# Tests auto-run on file changes

# 4. Before commit
npm run lint:fix
npm run type-check
npm run test
```

### Continuous Integration Workflow

```bash
# Full quality check (run before deployment)
npm run type-check       # ✓ Type checking
npm run lint             # ✓ Linting
npm run format:check     # ✓ Formatting
npm run test             # ✓ Unit tests
npm run e2e              # ✓ E2E tests
npm run build            # ✓ Production build
```

### Performance Optimization Workflow

```bash
# 1. Analyze current bundle
npm run analyze

# 2. Review report
# - Check bundle size
# - Identify large modules
# - Look for duplicates

# 3. Optimize
# - Code-split components
# - Remove unused dependencies
# - Lazy-load features

# 4. Re-analyze
npm run analyze
```

## Configuration Files

### Testing Configuration

**`vitest.config.ts`**
- Test environment: jsdom
- Coverage providers: v8
- Include patterns: `**/*.test.ts(x)`
- Coverage targets: 70% minimum

**`vitest.setup.ts`**
- Testing Library setup
- Mock Next.js modules
- Global test utilities

**`playwright.config.ts`**
- Multiple browser testing
- Mobile viewport testing
- Screenshot on failure
- Development server auto-start

### Quality Configuration

**`.prettierrc.json`**
```json
{
  "semi": true,
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2
}
```

**`.eslintrc.json`**
- TypeScript support
- React hooks checking
- Accessibility checking
- Prettier integration

**`.husky/pre-commit`**
- Auto-runs lint-staged
- Runs ESLint + Prettier
- Prevents commits with issues

## Advanced Features

### Test Coverage Dashboard

```bash
npm run test:coverage

# Open coverage/index.html untuk:
# - Coverage percentage
# - Line-by-line coverage
# - Branch coverage
# - Missing statements
```

### Interactive Test UI

```bash
npm run test:ui

# Opens browser dengan:
# - Test explorer
# - Test results
# - Source code viewer
# - Coverage visualization
```

### E2E Debug Mode

```bash
npm run e2e:debug

# Opens Playwright Inspector untuk:
# - Step through tests
# - Inspect elements
# - Call console
# - Set breakpoints
```

### Bundle Analysis

```bash
npm run analyze

# Generates report dengan:
# - Bundle size visualization
# - Module size breakdown
# - Chunk analysis
# - Size trends
```

## Integration with Claude Code

Claude dapat menggunakan semua tools ini:

```
Claude: Run tests dan show coverage

Claude akan:
1. Run npm run test:coverage
2. Analyze coverage report
3. Suggest improvements
4. Help write missing tests
```

```
Claude: Check bundle size dan optimize

Claude akan:
1. Run npm run analyze
2. Identify large modules
3. Suggest optimizations
4. Help refactor code
```

```
Claude: Run full quality check

Claude akan:
1. Type checking
2. Linting
3. Formatting
4. Tests
5. Build verification
```

## Performance Targets

### Build Performance
- TypeScript compilation: < 5s
- Bundle size: < 500KB (gzipped)
- Page load: < 3s
- Lighthouse score: > 90

### Code Quality
- ESLint: 0 errors
- TypeScript: 0 errors
- Test coverage: > 70%
- Prettier: 100% formatted

### E2E Testing
- All tests passing
- No console errors
- Accessibility compliance
- Mobile responsiveness

## Best Practices

### 1. Regular Testing
```bash
# Daily
npm run test:watch
npm run lint:fix

# Weekly
npm run test:coverage
npm run analyze

# Before deployment
npm run build
npm run e2e
```

### 2. Code Quality
- Write tests for new features
- Keep coverage above 70%
- Run linter before commit
- Format code with Prettier

### 3. Performance
- Monitor bundle size
- Use code-splitting
- Lazy-load components
- Optimize images

### 4. Accessibility
- Test with keyboard navigation
- Check color contrast
- Verify alt text
- Use semantic HTML

## Troubleshooting

### Tests Failing
1. Check error messages
2. Run in debug mode: `npm run test:ui`
3. Check for timing issues
4. Verify mock setup

### Coverage Low
1. Run: `npm run test:coverage`
2. Open `coverage/index.html`
3. Add tests untuk uncovered lines
4. Track coverage trends

### Bundle Size Large
1. Run: `npm run analyze`
2. Review `bundles-report-client.html`
3. Identify large modules
4. Refactor atau lazy-load

### Performance Slow
1. Check TypeScript: `npm run type-check`
2. Run build: `npm run build`
3. Analyze: `npm run analyze`
4. Review metrics

## Resources

- **Testing Library:** https://testing-library.com/
- **Vitest:** https://vitest.dev/
- **Playwright:** https://playwright.dev/
- **ESLint:** https://eslint.org/
- **Prettier:** https://prettier.io/
- **Next.js:** https://nextjs.org/docs

## Next Steps

1. **Write tests** untuk existing components
2. **Add E2E tests** untuk critical flows
3. **Monitor coverage** dan improve quality
4. **Setup CI/CD** dengan automated tests
5. **Track performance** metrics regularly
