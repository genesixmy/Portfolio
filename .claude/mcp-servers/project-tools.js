#!/usr/bin/env node

/**
 * MCP Server for Project Development Tools
 * Handles running dev server, building, linting, and getting project info
 */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const projectRoot = process.env.PROJECT_ROOT || '.';

/**
 * Run a command and capture output
 */
function runCommand(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: projectRoot,
      stdio: 'pipe',
      shell: true,
      ...options,
    });

    let stdout = '';
    let stderr = '';

    child.stdout?.on('data', (data) => {
      stdout += data.toString();
    });

    child.stderr?.on('data', (data) => {
      stderr += data.toString();
    });

    child.on('close', (code) => {
      if (code === 0 || options.allowNonZeroExit) {
        resolve({ stdout, stderr, code });
      } else {
        reject(new Error(`Command failed with code ${code}: ${stderr}`));
      }
    });

    child.on('error', reject);
  });
}

/**
 * Start development server
 */
async function runDevServer(port = 3000) {
  console.log(`Starting development server on port ${port}...`);

  try {
    const result = await runCommand('npm', ['run', 'dev', '--', `-p`, String(port)], {
      allowNonZeroExit: true,
    });

    return {
      success: true,
      message: `Development server started on http://localhost:${port}`,
      output: result.stdout,
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed to start dev server: ${error.message}`,
      error: error.message,
    };
  }
}

/**
 * Build project
 */
async function buildProject() {
  console.log('Building project...');

  try {
    const result = await runCommand('npm', ['run', 'build']);

    return {
      success: true,
      message: 'Build completed successfully',
      output: result.stdout,
    };
  } catch (error) {
    return {
      success: false,
      message: `Build failed: ${error.message}`,
      error: error.message,
    };
  }
}

/**
 * Run ESLint
 */
async function runLinter(fix = false) {
  console.log('Running ESLint...');

  try {
    const args = ['run', 'lint'];
    if (fix) {
      args.push('--', '--fix');
    }

    const result = await runCommand('npm', args, {
      allowNonZeroExit: true,
    });

    return {
      success: result.code === 0,
      message: fix ? 'Linting completed and issues fixed' : 'Linting completed',
      output: result.stdout || result.stderr,
    };
  } catch (error) {
    return {
      success: false,
      message: `Linting failed: ${error.message}`,
      error: error.message,
    };
  }
}

/**
 * Get project information
 */
function getProjectInfo() {
  try {
    const packagePath = path.join(projectRoot, 'package.json');
    const tsconfigPath = path.join(projectRoot, 'tsconfig.json');
    const tailwindPath = path.join(projectRoot, 'tailwind.config.ts');

    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf-8'));
    const hasTypeScript = fs.existsSync(tsconfigPath);
    const hasTailwind = fs.existsSync(tailwindPath);

    const srcPath = path.join(projectRoot, 'src');
    const srcExists = fs.existsSync(srcPath);

    let componentsCount = 0;
    if (srcExists) {
      const componentsPath = path.join(srcPath, 'components');
      if (fs.existsSync(componentsPath)) {
        const count = (str) => {
          let c = 0;
          const items = fs.readdirSync(str, { withFileTypes: true });
          items.forEach(item => {
            if (item.isFile() && item.name.endsWith('.tsx')) c++;
            if (item.isDirectory()) c += count(path.join(str, item.name));
          });
          return c;
        };
        componentsCount = count(componentsPath);
      }
    }

    return {
      projectName: packageJson.name,
      version: packageJson.version,
      description: packageJson.description,
      dependencies: Object.keys(packageJson.dependencies || {}),
      devDependencies: Object.keys(packageJson.devDependencies || {}),
      scripts: Object.keys(packageJson.scripts || {}),
      hasTypeScript,
      hasTailwind,
      componentsCount,
      framework: 'Next.js',
      language: 'TypeScript',
    };
  } catch (error) {
    return {
      error: `Failed to get project info: ${error.message}`,
    };
  }
}

/**
 * Main MCP server loop
 */
async function main() {
  const handlers = {
    'run-dev-server': runDevServer,
    'build-project': buildProject,
    'run-linter': runLinter,
    'get-project-info': getProjectInfo,
  };

  // Listen for tool calls from Claude Code
  process.stdin.on('data', async (data) => {
    try {
      const input = JSON.parse(data.toString());
      const tool = input.tool || input.name;
      const handler = handlers[tool];

      if (handler) {
        const result = await handler(input.params || input.arguments || {});
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
