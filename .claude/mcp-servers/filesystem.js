#!/usr/bin/env node

/**
 * MCP Server for Filesystem Operations
 * Provides file search and reading capabilities within allowed paths
 */

const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

const projectRoot = process.env.PROJECT_ROOT || '.';
const allowedPaths = (process.env.ALLOWED_PATHS || 'src,public,docs,.claude')
  .split(',')
  .map(p => path.join(projectRoot, p.trim()));

/**
 * Check if path is allowed
 */
function isAllowedPath(filePath) {
  const fullPath = path.resolve(filePath);
  return allowedPaths.some(allowed => fullPath.startsWith(path.resolve(allowed)));
}

/**
 * Find files matching a pattern
 */
async function findFiles(pattern, directory = projectRoot) {
  try {
    if (!isAllowedPath(directory)) {
      return {
        error: `Access denied: ${directory} is not in allowed paths`,
        allowedPaths,
      };
    }

    const searchPath = path.join(directory, pattern);
    const files = await glob(searchPath, {
      nodir: true,
      ignore: ['**/node_modules/**', '**/.next/**', '**/.git/**'],
    });

    return {
      success: true,
      files: files.map(f => path.relative(projectRoot, f)),
      count: files.length,
    };
  } catch (error) {
    return {
      error: `Failed to find files: ${error.message}`,
    };
  }
}

/**
 * Search for text in files
 */
async function searchCode(query, fileType = null) {
  try {
    const pattern = fileType ? `**/*.${fileType}` : '**/*';
    const files = await glob(pattern, {
      cwd: projectRoot,
      ignore: ['**/node_modules/**', '**/.next/**', '**/.git/**'],
    });

    const results = [];
    const queryRegex = new RegExp(query, 'gi');

    for (const file of files) {
      if (!isAllowedPath(file)) continue;

      try {
        const content = fs.readFileSync(path.join(projectRoot, file), 'utf-8');
        if (queryRegex.test(content)) {
          const matches = content
            .split('\n')
            .map((line, idx) => ({
              lineNumber: idx + 1,
              content: line,
            }))
            .filter(line => queryRegex.test(line.content));

          if (matches.length > 0) {
            results.push({
              file: file,
              matchCount: matches.length,
              matches: matches.slice(0, 3), // Limit to first 3 matches
            });
          }
        }
      } catch (err) {
        // Skip files that can't be read
      }
    }

    return {
      success: true,
      query,
      results,
      totalMatches: results.reduce((sum, r) => sum + r.matchCount, 0),
    };
  } catch (error) {
    return {
      error: `Failed to search code: ${error.message}`,
    };
  }
}

/**
 * Get file content
 */
function getFileContent(filePath) {
  try {
    const fullPath = path.join(projectRoot, filePath);

    if (!isAllowedPath(fullPath)) {
      return {
        error: `Access denied: ${filePath}`,
      };
    }

    if (!fs.existsSync(fullPath)) {
      return {
        error: `File not found: ${filePath}`,
      };
    }

    const content = fs.readFileSync(fullPath, 'utf-8');
    const lines = content.split('\n');

    return {
      success: true,
      path: filePath,
      size: content.length,
      lines: lines.length,
      content: lines.slice(0, 100).join('\n'), // Limit to first 100 lines
      totalLines: lines.length,
      truncated: lines.length > 100,
    };
  } catch (error) {
    return {
      error: `Failed to read file: ${error.message}`,
    };
  }
}

/**
 * Main MCP server loop
 */
async function main() {
  const handlers = {
    'find-files': async (params) => findFiles(params.pattern, params.directory),
    'search-code': async (params) => searchCode(params.query, params.fileType),
    'get-file-content': (params) => getFileContent(params.path),
  };

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
