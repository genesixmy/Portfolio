#!/usr/bin/env ts-node

/**
 * Claude Code CLI Utility
 * Helps with common development tasks in the portfolio project
 *
 * Usage:
 *   npx ts-node .claude/cli.ts <command> [options]
 */

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

interface Command {
  name: string;
  description: string;
  action: (...args: string[]) => void;
}

const projectRoot = process.cwd();
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message: string, color: keyof typeof colors = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function success(message: string) {
  log(`✓ ${message}`, 'green');
}

function error(message: string) {
  log(`✗ ${message}`, 'red');
}

function info(message: string) {
  log(`ℹ ${message}`, 'cyan');
}

function warn(message: string) {
  log(`⚠ ${message}`, 'yellow');
}

function section(title: string) {
  log(`\n${title}`, 'bright');
  log('='.repeat(title.length), 'bright');
}

/**
 * Commands
 */
const commands: Command[] = [
  {
    name: 'dev',
    description: 'Start development server',
    action: () => {
      info('Starting development server on http://localhost:3000');
      execSync('npm run dev', { cwd: projectRoot, stdio: 'inherit' });
    },
  },
  {
    name: 'build',
    description: 'Build project for production',
    action: () => {
      section('Building Project');
      execSync('npm run build', { cwd: projectRoot, stdio: 'inherit' });
      success('Build completed');
    },
  },
  {
    name: 'lint',
    description: 'Run ESLint',
    action: (fix?: string) => {
      section('Running ESLint');
      const cmd = fix === '--fix' ? 'npm run lint -- --fix' : 'npm run lint';
      try {
        execSync(cmd, { cwd: projectRoot, stdio: 'inherit' });
        success('Linting completed');
      } catch {
        error('Linting found issues');
        process.exit(1);
      }
    },
  },
  {
    name: 'lint:fix',
    description: 'Run ESLint and fix issues',
    action: () => {
      section('Fixing linting issues');
      execSync('npm run lint -- --fix', { cwd: projectRoot, stdio: 'inherit' });
      success('Linting issues fixed');
    },
  },
  {
    name: 'check',
    description: 'Run build + lint checks',
    action: () => {
      section('Running Checks');

      info('Building...');
      try {
        execSync('npm run build', { cwd: projectRoot, stdio: 'inherit' });
        success('Build check passed');
      } catch {
        error('Build check failed');
        process.exit(1);
      }

      info('Linting...');
      try {
        execSync('npm run lint', { cwd: projectRoot, stdio: 'inherit' });
        success('Lint check passed');
      } catch {
        error('Lint check failed');
        process.exit(1);
      }

      success('All checks passed!');
    },
  },
  {
    name: 'info',
    description: 'Show project information',
    action: () => {
      section('Project Information');

      const packagePath = path.join(projectRoot, 'package.json');
      const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf-8'));

      log(`Name: ${packageJson.name}`, 'cyan');
      log(`Version: ${packageJson.version}`, 'cyan');
      log(`Description: ${packageJson.description}`, 'cyan');

      section('Dependencies');
      const deps = Object.keys(packageJson.dependencies || {});
      deps.forEach(dep => log(`  • ${dep}`, 'yellow'));

      section('Dev Dependencies');
      const devDeps = Object.keys(packageJson.devDependencies || {});
      devDeps.slice(0, 5).forEach(dep => log(`  • ${dep}`, 'yellow'));
      if (devDeps.length > 5) {
        log(`  ... and ${devDeps.length - 5} more`, 'yellow');
      }

      section('Available Scripts');
      Object.entries(packageJson.scripts || {}).forEach(([name, cmd]) => {
        log(`  ${name}: ${cmd}`, 'blue');
      });
    },
  },
  {
    name: 'components',
    description: 'List all React components',
    action: () => {
      section('React Components');

      const componentsDir = path.join(projectRoot, 'src', 'components');
      if (!fs.existsSync(componentsDir)) {
        error('Components directory not found');
        return;
      }

      const listComponents = (dir: string, prefix = '') => {
        const files = fs.readdirSync(dir, { withFileTypes: true });
        files.forEach(file => {
          if (file.isDirectory()) {
            listComponents(path.join(dir, file.name), prefix + '  ');
          } else if (file.name.endsWith('.tsx')) {
            log(`${prefix}• ${file.name}`, 'green');
          }
        });
      };

      listComponents(componentsDir);
    },
  },
  {
    name: 'test',
    description: 'Run unit tests with Vitest',
    action: (watch?: string) => {
      section('Running Unit Tests');
      const cmd = watch === '--watch' ? 'npm run test:watch' : 'npm run test';
      execSync(cmd, { cwd: projectRoot, stdio: 'inherit' });
      success('Unit tests completed');
    },
  },
  {
    name: 'test:ui',
    description: 'Run tests with UI dashboard',
    action: () => {
      section('Opening Test Dashboard');
      execSync('npm run test:ui', { cwd: projectRoot, stdio: 'inherit' });
    },
  },
  {
    name: 'test:coverage',
    description: 'Run tests with coverage report',
    action: () => {
      section('Running Tests with Coverage');
      execSync('npm run test:coverage', { cwd: projectRoot, stdio: 'inherit' });
      success('Coverage report generated');
      info('Open coverage/index.html untuk view report');
    },
  },
  {
    name: 'e2e',
    description: 'Run E2E tests with Playwright',
    action: () => {
      section('Running E2E Tests');
      execSync('npm run e2e', { cwd: projectRoot, stdio: 'inherit' });
      success('E2E tests completed');
    },
  },
  {
    name: 'e2e:ui',
    description: 'Run E2E tests with interactive UI',
    action: () => {
      section('Opening E2E Test UI');
      execSync('npm run e2e:ui', { cwd: projectRoot, stdio: 'inherit' });
    },
  },
  {
    name: 'analyze',
    description: 'Analyze bundle size',
    action: () => {
      section('Analyzing Bundle');
      execSync('npm run analyze', { cwd: projectRoot, stdio: 'inherit' });
      success('Bundle analysis completed');
      info('Open bundles-report-client.html untuk view report');
    },
  },
  {
    name: 'format:check',
    description: 'Check code formatting',
    action: () => {
      section('Checking Formatting');
      try {
        execSync('npm run format:check', { cwd: projectRoot, stdio: 'inherit' });
        success('All files properly formatted');
      } catch {
        error('Some files need formatting');
        warn('Run: npm run format untuk auto-fix');
      }
    },
  },
  {
    name: 'format',
    description: 'Auto-format code with Prettier',
    action: () => {
      section('Formatting Code');
      execSync('npm run format', { cwd: projectRoot, stdio: 'inherit' });
      success('Code formatted');
    },
  },
  {
    name: 'quality',
    description: 'Run complete quality checks',
    action: () => {
      section('Running Complete Quality Checks');

      info('Checking formatting...');
      try {
        execSync('npm run format:check', { cwd: projectRoot, stdio: 'pipe' });
        success('Formatting check passed');
      } catch {
        error('Formatting issues found');
      }

      info('Type checking...');
      try {
        execSync('npm run type-check', { cwd: projectRoot, stdio: 'pipe' });
        success('Type check passed');
      } catch {
        error('Type errors found');
      }

      info('Linting...');
      try {
        execSync('npm run lint', { cwd: projectRoot, stdio: 'pipe' });
        success('Lint check passed');
      } catch {
        error('Lint errors found');
      }

      info('Building...');
      try {
        execSync('npm run build', { cwd: projectRoot, stdio: 'pipe' });
        success('Build check passed');
      } catch {
        error('Build failed');
      }

      success('Quality check completed');
    },
  },
  {
    name: 'help',
    description: 'Show this help message',
    action: () => {
      section('Claude Code CLI - Portfolio Project');
      log('\nUsage: ts-node .claude/cli.ts <command>\n', 'cyan');
      log('Commands:', 'bright');
      commands.forEach(cmd => {
        log(`  ${cmd.name.padEnd(15)} - ${cmd.description}`, 'yellow');
      });
      log('\nExamples:', 'bright');
      log('  ts-node .claude/cli.ts dev        # Start dev server', 'blue');
      log('  ts-node .claude/cli.ts build      # Build project', 'blue');
      log('  ts-node .claude/cli.ts test       # Run unit tests', 'blue');
      log('  ts-node .claude/cli.ts test:ui    # Test dashboard', 'blue');
      log('  ts-node .claude/cli.ts check      # Run all checks', 'blue');
      log('  ts-node .claude/cli.ts quality    # Quality checks', 'blue');
    },
  },
];

/**
 * Main CLI handler
 */
function main() {
  const args = process.argv.slice(2);
  const commandName = args[0];

  if (!commandName) {
    commands.find(c => c.name === 'help')?.action();
    return;
  }

  const command = commands.find(c => c.name === commandName);

  if (!command) {
    error(`Unknown command: ${commandName}`);
    log('Run "ts-node .claude/cli.ts help" for available commands\n', 'yellow');
    process.exit(1);
  }

  try {
    command.action(...args.slice(1));
  } catch (err) {
    error(`Command failed: ${commandName}`);
    if (err instanceof Error) {
      error(err.message);
    }
    process.exit(1);
  }
}

main();
