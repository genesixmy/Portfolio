#!/usr/bin/env node

/**
 * MCP Server for TypeScript Analysis
 * Provides type checking and definition lookup capabilities
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const projectRoot = process.env.PROJECT_ROOT || '.';
const tsConfigPath = process.env.TS_CONFIG_PATH || './tsconfig.json';

/**
 * Get TypeScript errors
 */
function getTypeErrors() {
  try {
    const fullPath = path.join(projectRoot, tsConfigPath);
    if (!fs.existsSync(fullPath)) {
      return {
        error: 'TypeScript config not found',
      };
    }

    // Run TypeScript compiler to check for errors
    try {
      const output = execSync('npx tsc --noEmit', {
        cwd: projectRoot,
        encoding: 'utf-8',
      });

      return {
        success: true,
        errors: [],
        message: 'No TypeScript errors found',
      };
    } catch (error) {
      // Parse compiler output
      const output = error.stdout || error.stderr || error.message;
      const lines = output.split('\n').filter(line => line.trim());

      const errors = lines
        .filter(line => line.includes('error TS'))
        .map(line => {
          // Parse error message format: file.ts(line,col): error TSxxxx: message
          const match = line.match(/(.+?)\((\d+),(\d+)\):\s*error\s*(TS\d+):\s*(.*)/);
          if (match) {
            return {
              file: match[1],
              line: parseInt(match[2]),
              column: parseInt(match[3]),
              code: match[4],
              message: match[5],
            };
          }
          return { raw: line };
        });

      return {
        success: false,
        errorCount: errors.length,
        errors: errors.slice(0, 10), // Limit to first 10
        totalErrors: errors.length,
        truncated: errors.length > 10,
      };
    }
  } catch (error) {
    return {
      error: `Failed to check TypeScript errors: ${error.message}`,
    };
  }
}

/**
 * Get type definitions for a symbol
 * This is a simplified version - real implementation would use ts-morph or similar
 */
function getDefinitions(symbol) {
  try {
    // Search for the symbol in component files
    const srcPath = path.join(projectRoot, 'src');
    if (!fs.existsSync(srcPath)) {
      return {
        error: 'src directory not found',
      };
    }

    const results = [];
    const search = (dir) => {
      const files = fs.readdirSync(dir, { withFileTypes: true });
      files.forEach(file => {
        if (file.isDirectory()) {
          search(path.join(dir, file.name));
        } else if (file.name.endsWith('.ts') || file.name.endsWith('.tsx')) {
          const content = fs.readFileSync(path.join(dir, file.name), 'utf-8');
          // Look for: const/let/function/interface/type symbol
          const patterns = [
            new RegExp(`\\b(const|let|var)\\s+${symbol}\\b`, 'g'),
            new RegExp(`\\bfunction\\s+${symbol}\\b`, 'g'),
            new RegExp(`\\binterface\\s+${symbol}\\b`, 'g'),
            new RegExp(`\\btype\\s+${symbol}\\b`, 'g'),
          ];

          patterns.forEach(pattern => {
            if (pattern.test(content)) {
              const lines = content.split('\n');
              lines.forEach((line, idx) => {
                if (pattern.test(line)) {
                  results.push({
                    file: path.relative(projectRoot, path.join(dir, file.name)),
                    line: idx + 1,
                    content: line.trim(),
                  });
                }
              });
            }
          });
        }
      });
    };

    search(srcPath);

    return {
      success: true,
      symbol,
      definitions: results.slice(0, 5), // Limit to first 5
      count: results.length,
      truncated: results.length > 5,
    };
  } catch (error) {
    return {
      error: `Failed to get definitions: ${error.message}`,
    };
  }
}

/**
 * Get type information for a file
 */
function getFileTypes(filePath) {
  try {
    const fullPath = path.join(projectRoot, filePath);
    if (!fs.existsSync(fullPath)) {
      return {
        error: `File not found: ${filePath}`,
      };
    }

    const content = fs.readFileSync(fullPath, 'utf-8');

    // Extract type information from the file
    const exports = [];
    const imports = [];

    const lines = content.split('\n');
    lines.forEach((line, idx) => {
      if (line.includes('export')) {
        exports.push({ line: idx + 1, content: line.trim() });
      }
      if (line.includes('import')) {
        imports.push({ line: idx + 1, content: line.trim() });
      }
    });

    return {
      success: true,
      file: filePath,
      imports: imports.slice(0, 10),
      exports: exports.slice(0, 10),
      totalImports: imports.length,
      totalExports: exports.length,
    };
  } catch (error) {
    return {
      error: `Failed to get file types: ${error.message}`,
    };
  }
}

/**
 * Main MCP server loop
 */
async function main() {
  const handlers = {
    'get-type-errors': (params) => getTypeErrors(),
    'get-definitions': (params) => getDefinitions(params.symbol),
    'get-file-types': (params) => getFileTypes(params.path),
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
