#!/usr/bin/env node

const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

/**
 * Build script for JSON Forgefy Browser Library
 * Uses esbuild to bundle the actual json-forgefy library for browser use
 */

const BROWSER_LIB_PATH = path.join(__dirname, 'forgefy-browser.js');
const ENTRY_POINT = path.join(__dirname, 'forgefy-entry.js');

async function createBrowserBundle() {
  console.log('🔧 Building browser-compatible Forgefy library with esbuild...');

  // Create entry point file that exports Forgefy to window
  const entryContent = `import Forgefy from 'json-forgefy';

// Export to window for browser use
if (typeof window !== 'undefined') {
  window.Forgefy = Forgefy;
}

export { Forgefy };
`;

  // Write entry point
  fs.writeFileSync(ENTRY_POINT, entryContent);
  console.log('✅ Created entry point file');

  try {
    // Bundle with esbuild
    await esbuild.build({
      entryPoints: [ENTRY_POINT],
      bundle: true,
      format: 'iife',
      globalName: 'ForgefyBundle',
      outfile: BROWSER_LIB_PATH,
      platform: 'browser',
      target: 'es2015',
      minify: false,
      sourcemap: false,
    });

    console.log(`✅ Browser library created: ${BROWSER_LIB_PATH}`);

    // Clean up entry point
    fs.unlinkSync(ENTRY_POINT);
    console.log('✅ Cleaned up temporary files');

  } catch (error) {
    // Clean up entry point even on error
    if (fs.existsSync(ENTRY_POINT)) {
      fs.unlinkSync(ENTRY_POINT);
    }
    throw error;
  }
}

async function main() {
  try {
    await createBrowserBundle();
    console.log('🎉 Browser library build complete!');
  } catch (error) {
    console.error('❌ Error building browser library:', error.message);
    console.error(error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { createBrowserBundle };
