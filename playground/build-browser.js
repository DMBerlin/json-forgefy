const browserify = require('browserify');
const fs = require('fs');
const path = require('path');

console.log('🔧 Building browser-compatible Forgefy library...');

// Create browserify bundle
const b = browserify({
  entries: ['./src/forgefy-browser.js'],
  standalone: 'Forgefy'
});

// Bundle the library
b.bundle((err, buf) => {
  if (err) {
    console.error('❌ Build failed:', err);
    process.exit(1);
  }

  // Write the browser bundle
  const outputPath = path.join(__dirname, 'forgefy-browser.js');
  fs.writeFileSync(outputPath, buf);

  console.log('✅ Browser library created:', outputPath);
  console.log('🎉 Browser library build complete!');
});
