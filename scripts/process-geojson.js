const fs = require('fs');
const path = require('path');

function ensureOutputDir() {
  const outputDir = path.join(__dirname, '../public/data');
  fs.mkdirSync(outputDir, { recursive: true });
  return outputDir;
}

function processCWDData() {
  console.log('📊 Processing CWD test results...');

  const filePath = path.join(__dirname, '../data/CWD_Test_Results.geojson');
  if (!fs.existsSync(filePath)) {
    throw new Error('CWD_Test_Results.geojson not found in data/ directory');
  }

  const raw = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  const countyStats = {};

  raw.features.forEach((feature) => {
    const props = feature.properties || {};
    const county = (props.county || 'Unknown').trim();
    const region = props.region || 'Unknown';
    const key = `${county}-${region}`;

    if (!countyStats[key]) {
      countyStats[key] = {
        county,
        region,
        totalTests: 0,
        positiveTests: 0,
        negativeTests: 0,
        bySex: { male: 0, female: 0, unknown: 0 },
        byAge: {},
        recentTests: []
      };
    }

    const stat = countyStats[key];
    stat.totalTests += 1;

    const result = String(props.cwd_result || '').toLowerCase();
    if (result === 'detected' || result === 'positive') {
      stat.positiveTests += 1;
    } else {
      stat.negativeTests += 1;
    }

    const sexKey = String(props.sex || 'unknown').toLowerCase();
    stat.bySex[sexKey] = (stat.bySex[sexKey] || 0) + 1;

    const ageKey = props.age_group || 'Unknown';
    stat.byAge[ageKey] = (stat.byAge[ageKey] || 0) + 1;

    stat.recentTests.push({
      date: props.harvest_date || null,
      sex: props.sex || 'Unknown',
      age: props.age_group || 'Unknown',
      result: props.cwd_result || 'Unknown'
    });
  });

  const results = Object.values(countyStats).map((stat) => {
    const positiveRate = stat.totalTests > 0
      ? Number(((stat.positiveTests / stat.totalTests) * 100).toFixed(2))
      : 0;

    const sortedTests = stat.recentTests
      .filter((item) => item.date)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 10);

    return {
      ...stat,
      positiveRate,
      recentTests: sortedTests
    };
  }).sort((a, b) => a.county.localeCompare(b.county));

  const outputDir = ensureOutputDir();
  fs.writeFileSync(
    path.join(outputDir, 'cwd-stats.json'),
    JSON.stringify(results, null, 2) + '\n'
  );

  console.log(`✅ Processed ${results.length} counties (${raw.features.length} tests)`);
}

function processWMAData() {
  console.log('🗺️  Processing WMA boundaries...');

  const files = [
    'WRD_WMA_Public_5581743244652820884.geojson',
    'WRD_WMA_Public_2490656366933780552.geojson',
    'WRD_WMA_Public_5501813017473416627.geojson',
    'WRD_WMA_Public_-5539768131527565816.geojson'
  ];

  const allFeatures = [];
  const wmaIndex = [];

  files.forEach((filename) => {
    const filePath = path.join(__dirname, '../data', filename);
    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️  File not found: ${filename}`);
      return;
    }

    const raw = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    raw.features.forEach((feature) => {
      if (!feature || !feature.geometry) return;

      const properties = feature.properties || {};
      const simplified = {
        type: 'Feature',
        geometry: feature.geometry,
        properties: {
          id: properties.OBJECTID,
          region: properties.GM_Region || null,
          propertyName: properties.PropName || properties.Name || null,
          name: properties.Name || properties.PropName || 'Unknown',
          acres: properties.Acres || null,
          managedBy: properties.ManagedBy || null
        }
      };

      if (typeof simplified.properties.id === 'undefined' || simplified.properties.id === null) {
        simplified.properties.id = `${simplified.properties.name}-${allFeatures.length}`;
      }

      simplified.id = simplified.properties.id;
      allFeatures.push(simplified);

      wmaIndex.push({
        id: simplified.properties.id,
        region: simplified.properties.region,
        propertyName: simplified.properties.propertyName,
        name: simplified.properties.name,
        acres: simplified.properties.acres,
        managedBy: simplified.properties.managedBy
      });
    });
  });

  const fullGeoJSON = {
    type: 'FeatureCollection',
    features: allFeatures
  };

  const outputDir = ensureOutputDir();

  fs.writeFileSync(
    path.join(outputDir, 'wma-boundaries.geojson'),
    JSON.stringify(fullGeoJSON) + '\n'
  );

  fs.writeFileSync(
    path.join(outputDir, 'wma-index.json'),
    JSON.stringify(wmaIndex, null, 2) + '\n'
  );

  console.log(`✅ Processed ${allFeatures.length} WMA features`);
}

console.log('🚀 Starting GeoJSON processing...\n');

try {
  processCWDData();
  console.log('');
  processWMAData();
  console.log('\n✨ All data processed successfully!');
} catch (error) {
  console.error('\n❌ Error:', error.message);
  process.exit(1);
}
