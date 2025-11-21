#!/usr/bin/env node

/**
 * MCP Server for Testing Utilities
 * Provides testing, analysis, and performance monitoring tools
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const projectRoot = process.env.PROJECT_ROOT || '.';

/**
 * Run unit tests dengan Vitest
 */
function runUnitTests(options = {}) {
  try {
    const { ui = false, coverage = false, watch = false } = options;
    let cmd = 'npm run test';

    if (ui) cmd = 'npm run test:ui';
    else if (coverage) cmd = 'npm run test:coverage';
    else if (watch) cmd = 'npm run test:watch';

    console.log(`Running unit tests: ${cmd}`);

    const result = execSync(cmd, {
      cwd: projectRoot,
      encoding: 'utf-8',
      stdio: 'pipe',
    });

    return {
      success: true,
      message: 'Tests completed',
      output: result,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Tests failed',
      output: error.stdout || error.stderr || error.message,
    };
  }
}

/**
 * Run E2E tests dengan Playwright
 */
function runE2ETests(options = {}) {
  try {
    const { ui = false, debug = false } = options;
    let cmd = 'npm run e2e';

    if (ui) cmd = 'npm run e2e:ui';
    else if (debug) cmd = 'npm run e2e:debug';

    console.log(`Running E2E tests: ${cmd}`);

    const result = execSync(cmd, {
      cwd: projectRoot,
      encoding: 'utf-8',
      stdio: 'pipe',
    });

    return {
      success: true,
      message: 'E2E tests completed',
      output: result,
    };
  } catch (error) {
    return {
      success: false,
      message: 'E2E tests failed',
      output: error.stdout || error.stderr || error.message,
    };
  }
}

/**
 * Analyze bundle size
 */
function analyzeBundleSize() {
  try {
    console.log('Analyzing bundle size...');

    const result = execSync('npm run bundle-analyze', {
      cwd: projectRoot,
      encoding: 'utf-8',
      stdio: 'pipe',
    });

    return {
      success: true,
      message: 'Bundle analysis completed',
      reportPath: 'bundles-report-client.html',
      output: result,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Bundle analysis failed',
      output: error.stdout || error.stderr || error.message,
    };
  }
}

/**
 * Check performance metrics
 */
function checkPerformance() {
  try {
    console.log('Checking performance metrics...');

    // Get TypeScript compilation time
    const startTs = Date.now();
    execSync('tsc --noEmit', { cwd: projectRoot, stdio: 'pipe' });
    const typeCheckTime = Date.now() - startTs;

    // Get build time
    const startBuild = Date.now();
    execSync('next build', { cwd: projectRoot, stdio: 'pipe' });
    const buildTime = Date.now() - startBuild;

    return {
      success: true,
      metrics: {
        typeCheckTime: `${typeCheckTime}ms`,
        buildTime: `${buildTime}ms`,
        timestamp: new Date().toISOString(),
      },
      message: 'Performance check completed',
    };
  } catch (error) {
    return {
      success: false,
      message: 'Performance check failed',
      error: error.message,
    };
  }
}

/**
 * Lint code quality
 */
function checkCodeQuality() {
  try {
    console.log('Checking code quality...');

    const results = {};

    // ESLint
    try {
      execSync('npm run lint', { cwd: projectRoot, stdio: 'pipe' });
      results.eslint = { pass: true };
    } catch (e) {
      results.eslint = { pass: false, error: 'Linting errors found' };
    }

    // Type checking
    try {
      execSync('tsc --noEmit', { cwd: projectRoot, stdio: 'pipe' });
      results.typescript = { pass: true };
    } catch (e) {
      results.typescript = { pass: false, error: 'Type errors found' };
    }

    // Format checking
    try {
      execSync('npm run format:check', { cwd: projectRoot, stdio: 'pipe' });
      results.formatting = { pass: true };
    } catch (e) {
      results.formatting = { pass: false, error: 'Formatting issues found' };
    }

    const allPass = Object.values(results).every((r) => r.pass);

    return {
      success: allPass,
      checks: results,
      message: allPass ? 'All quality checks passed' : 'Some quality checks failed',
    };
  } catch (error) {
    return {
      success: false,
      message: 'Code quality check failed',
      error: error.message,
    };
  }
}

/**
 * Get test coverage report
 */
function getCoverageReport() {
  try {
    const coveragePath = path.join(projectRoot, 'coverage');

    if (!fs.existsSync(coveragePath)) {
      return {
        success: false,
        message: 'Coverage report not found. Run "npm run test:coverage" first',
      };
    }

    const indexPath = path.join(coveragePath, 'index.html');

    return {
      success: true,
      message: 'Coverage report found',
      reportPath: indexPath,
      viewCommand: `Open ${indexPath} in browser`,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to get coverage report',
      error: error.message,
    };
  }
}

/**
 * List test files
 */
function listTestFiles() {
  try {
    const srcPath = path.join(projectRoot, 'src');
    const testFiles = [];

    const findTestFiles = (dir) => {
      const files = fs.readdirSync(dir, { withFileTypes: true });
      files.forEach((file) => {
        if (file.isDirectory()) {
          findTestFiles(path.join(dir, file.name));
        } else if (file.name.endsWith('.test.ts') || file.name.endsWith('.test.tsx')) {
          testFiles.push(path.relative(projectRoot, path.join(dir, file.name)));
        }
      });
    };

    if (fs.existsSync(srcPath)) {
      findTestFiles(srcPath);
    }

    return {
      success: true,
      testFiles,
      count: testFiles.length,
      message: `Found ${testFiles.length} test files`,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to list test files',
      error: error.message,
    };
  }
}

/**
 * Main MCP server loop
 */
async function main() {
  const handlers = {
    'run-unit-tests': (params) => runUnitTests(params),
    'run-e2e-tests': (params) => runE2ETests(params),
    'analyze-bundle': () => analyzeBundleSize(),
    'check-performance': () => checkPerformance(),
    'check-code-quality': () => checkCodeQuality(),
    'get-coverage-report': () => getCoverageReport(),
    'list-test-files': () => listTestFiles(),
  };

  process.stdin.on('data', async (data) => {
    try {
      const input = JSON.parse(data.toString());
      const tool = input.tool || input.name;
      const handler = handlers[tool];

      if (handler) {
        const result = handler(input.params || input.arguments || {});
        console.log(JSON.stringify({ success: true, result }));
      } else {
        console.log(JSON.stringify({ success: false, error: `Unknown tool: ${tool}` }));
      }
    } catch (error) {
      console.log(JSON.stringify({ success: false, error: error.message }));
    }
  });
}

main().catch(console.error);
