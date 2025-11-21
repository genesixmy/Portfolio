# Testing Framework & Tools

Complete guide untuk testing setup dengan Vitest dan Playwright.

## Overview

Project sekarang dilengkapi dengan:
- **Unit Testing** - Vitest + React Testing Library
- **E2E Testing** - Playwright
- **Test Coverage** - Automated coverage reports
- **Performance Monitoring** - Bundle analysis & metrics

## Unit Testing dengan Vitest

### Jalankan Tests

```bash
# Run tests once
npm run test

# Run in watch mode (re-run on file changes)
npm run test:watch

# Run with UI dashboard
npm run test:ui

# Run with coverage report
npm run test:coverage
```

### Test Structure

Tests harus berada di:
- `src/**/*.test.ts`
- `src/**/*.test.tsx`
- `src/**/__tests__/**`

### Writing Unit Tests

```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('should render correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Expected text')).toBeInTheDocument();
  });

  it('should handle user interaction', () => {
    const onClick = vi.fn();
    render(<MyComponent onClick={onClick} />);

    screen.getByRole('button').click();
    expect(onClick).toHaveBeenCalled();
  });
});
```

### Test Coverage

```bash
# Generate coverage report
npm run test:coverage

# Report akan di-generate ke coverage/ folder
# Open coverage/index.html untuk view detailed report
```

**Coverage Targets:**
- Lines: 70%
- Functions: 70%
- Branches: 70%
- Statements: 70%

## E2E Testing dengan Playwright

### Jalankan E2E Tests

```bash
# Run all E2E tests
npm run e2e

# Run with UI (interactive)
npm run e2e:ui

# Run in debug mode
npm run e2e:debug
```

### E2E Test Structure

Tests harus berada di:
- `e2e/**/*.spec.ts`

### Writing E2E Tests

```typescript
import { test, expect } from '@playwright/test';

test('user can navigate', async ({ page }) => {
  await page.goto('/');

  // Find & click element
  await page.locator('a[href="/work"]').click();

  // Verify result
  await expect(page.locator('#work-section')).toBeVisible();
});
```

### E2E Test Browsers

Tests otomatis jalan di:
- Chromium
- Firefox
- WebKit (Safari)
- Mobile Chrome
- Mobile Safari

## Code Quality Tools

### ESLint (Linting)

```bash
# Check for issues
npm run lint

# Auto-fix issues
npm run lint:fix
```

**Checks:**
- Code style consistency
- Unused variables
- React hooks rules
- Accessibility issues
- TypeScript types

### Prettier (Code Formatting)

```bash
# Check formatting
npm run format:check

# Auto-format code
npm run format
```

**Formats:**
- Consistent indentation
- Line length (100 chars)
- Quote style
- Trailing commas
- Arrow function parens

### Type Checking

```bash
# Check TypeScript types
npm run type-check

# This runs without emitting files
```

## Performance Analysis

### Bundle Analysis

```bash
# Analyze bundle size
npm run analyze

# atau
npm run bundle-analyze

# Report generated: bundles-report-client.html
```

### Performance Metrics

```bash
# Check build performance
npm run build

# Includes:
# - TypeScript compilation time
# - Bundle size
# - Chunk sizes
```

## Pre-commit Hooks

Automatically runs sebelum commit:

```bash
# Triggered automatically
git commit -m "message"

# Runs:
# 1. ESLint --fix
# 2. Prettier --write
# 3. Tests (if needed)
```

## CI/CD Integration

Recommended untuk CI pipeline:

```bash
# Full quality check
npm run type-check
npm run lint
npm run test
npm run build
npm run e2e
```

## All Available Commands

| Command | Purpose |
|---------|---------|
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | ESLint + Prettier auto-fix |
| `npm run format` | Run Prettier |
| `npm run format:check` | Check formatting |
| `npm run type-check` | Check TypeScript types |
| `npm run test` | Run unit tests (Vitest) |
| `npm run test:watch` | Tests in watch mode |
| `npm run test:ui` | Tests with UI |
| `npm run test:coverage` | Tests with coverage |
| `npm run e2e` | Run E2E tests |
| `npm run e2e:ui` | E2E with interactive UI |
| `npm run e2e:debug` | E2E in debug mode |
| `npm run analyze` | Bundle size analysis |
| `npm run bundle-analyze` | Bundle analysis report |
| `npm run precommit` | Pre-commit hooks |

## Best Practices

### Unit Testing
1. **Test behavior, not implementation**
   ```typescript
   // Good
   expect(screen.getByText('Welcome')).toBeInTheDocument();

   // Bad
   expect(component.state.title).toBe('Welcome');
   ```

2. **Use data-testid sparingly**
   ```typescript
   // First choice: semantic queries
   screen.getByRole('button', { name: 'Submit' })

   // Last choice
   screen.getByTestId('submit-button')
   ```

3. **Test user flows**
   ```typescript
   // Simulate real user interaction
   user.click(screen.getByRole('button'))
   user.type(input, 'text')
   ```

### E2E Testing
1. **Test critical user paths**
   - Navigation
   - Form submission
   - Data display

2. **Keep tests maintainable**
   ```typescript
   // Create helpers for common actions
   async function navigateToWork(page) {
     await page.goto('/');
     await page.locator('a[href="#work"]').click();
   }
   ```

3. **Use proper wait strategies**
   ```typescript
   // Wait for element to appear
   await page.locator('.loaded').waitFor();
   ```

## Troubleshooting

### Tests failing
1. Check test logs: `npm run test -- --reporter=verbose`
2. Use debug mode: `npm run test:ui`
3. Check for timing issues in E2E

### Coverage targets not met
1. Add missing tests
2. Check uncovered lines: `npm run test:coverage`
3. Report dalam `coverage/index.html`

### Performance issues
1. Run bundle analysis: `npm run analyze`
2. Check large dependencies
3. Consider code-splitting

## Resources

- **Vitest Docs:** https://vitest.dev/
- **React Testing Library:** https://testing-library.com/
- **Playwright Docs:** https://playwright.dev/
- **ESLint:** https://eslint.org/
- **Prettier:** https://prettier.io/

## Next Steps

1. **Write unit tests** untuk components
2. **Add E2E tests** untuk critical flows
3. **Monitor coverage** dan improve quality
4. **Run tests** sebelum commit/deploy
