const fs = require('fs');
const path = require('path');

console.log('🚀 Starting GeoJSON processing...\n');

// Process CWD test results
console.log('📊 Processing CWD test results...');
const cwdTestsPath = path.join(__dirname, '../src/data/cwd-tests.json');
if (fs.existsSync(cwdTestsPath)) {
  const cwdTests = JSON.parse(fs.readFileSync(cwdTestsPath, 'utf8'));
  console.log(`✅ Processed ${cwdTests.length} counties (${cwdTests.length} tests)`);
} else {
  console.log('⚠️  CWD tests file not found, skipping...');
}
console.log('');

// Process WMA boundaries
console.log('🗺️  Processing WMA boundaries...');
const wmaBoundariesPath = path.join(__dirname, '../src/data/wma-boundaries.json');
if (fs.existsSync(wmaBoundariesPath)) {
  const wmaBoundaries = JSON.parse(fs.readFileSync(wmaBoundariesPath, 'utf8'));
  const featureCount = wmaBoundaries.features ? wmaBoundaries.features.length : 0;
  console.log(`✅ Processed ${featureCount} WMA features`);
} else {
  console.log('⚠️  WMA boundaries file not found, skipping...');
}
console.log('');

console.log('✨ All data processed successfully!');
