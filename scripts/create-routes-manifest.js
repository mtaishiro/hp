const fs = require('fs');
const path = require('path');

// Create a minimal routes-manifest.json for Vercel static export
const routesManifest = {
  version: 3,
  pages404: true,
  basePath: '',
  redirects: [],
  rewrites: [],
  headers: [],
  staticRoutes: [],
  dynamicRoutes: [],
  dataRoutes: [],
  rsc: {
    header: 'RSC',
    varyHeader: 'RSC, Next-Router-State-Tree, Next-Router-Prefetch',
    prefetchHeader: 'Next-Router-Prefetch',
    contentTypeHeader: 'text/x-component',
  },
};

const outDir = path.join(process.cwd(), 'out');
const manifestPath = path.join(outDir, 'routes-manifest.json');

// Ensure out directory exists
if (!fs.existsSync(outDir)) {
  console.error('Error: out directory does not exist. Run "next build" first.');
  process.exit(1);
}

// Write routes-manifest.json
fs.writeFileSync(manifestPath, JSON.stringify(routesManifest, null, 2));
console.log('Created routes-manifest.json for Vercel static export');

