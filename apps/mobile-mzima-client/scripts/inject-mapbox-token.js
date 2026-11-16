#!/usr/bin/env node
// Writes the mobile Mapbox token into the built web bundle (dist/.../env.json), which
// `cap sync` then copies into the native projects. The token is never committed:
// it comes from MAPBOX_MOBILE_TOKEN (CI secret) or from mapbox-mobile-token.secret
// at the repo root (local builds, gitignored).
//
// Run after `nx build mobile-mzima-client` and before `npx cap sync`.
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '../../..');
const envFile = path.join(root, 'dist/apps/mobile-mzima-client/env.json');
const secretFile = path.join(root, 'mapbox-mobile-token.secret');

let token = (process.env.MAPBOX_MOBILE_TOKEN || '').trim();
if (!token && fs.existsSync(secretFile)) {
  token = fs.readFileSync(secretFile, 'utf8').trim();
}
if (!token) {
  console.error(`No Mapbox token: set MAPBOX_MOBILE_TOKEN or create ${secretFile}`);
  process.exit(1);
}
if (!fs.existsSync(envFile)) {
  console.error(`${envFile} not found: build the mobile app first`);
  process.exit(1);
}

const env = JSON.parse(fs.readFileSync(envFile, 'utf8'));
env.mapbox_api_key = token;
fs.writeFileSync(envFile, JSON.stringify(env, null, 2) + '\n');
console.log(`Mapbox token injected into ${path.relative(root, envFile)}`);
