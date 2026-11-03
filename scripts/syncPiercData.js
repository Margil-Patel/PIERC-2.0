/**
 * PIERC Live Ecosystem Data Sync Script
 * Fetches the real production data directly from the PIERC Firestore API
 * and refreshes src/data/piercLiveEcosystem.json
 *
 * Usage: node scripts/syncPiercData.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FIRESTORE_URL =
  'https://firestore.googleapis.com/v1/projects/edc-pierc/databases/(default)/documents/websiteData/edc';

function parseFirestoreValue(val) {
  if (!val) return null;
  if ('stringValue' in val) return val.stringValue;
  if ('integerValue' in val) return parseInt(val.integerValue, 10);
  if ('doubleValue' in val) return parseFloat(val.doubleValue);
  if ('booleanValue' in val) return val.booleanValue;
  if ('nullValue' in val) return null;
  if ('arrayValue' in val) {
    return (val.arrayValue.values || []).map(parseFirestoreValue);
  }
  if ('mapValue' in val) {
    const fields = val.mapValue.fields || {};
    const res = {};
    for (const [k, v] of Object.entries(fields)) {
      res[k] = parseFirestoreValue(v);
    }
    return res;
  }
  return val;
}

const inventoryNames = {
  lasercutter: 'Industrial CO2 Laser Cutter & Engraver',
  sla: 'Formlabs SLA Precision Resin 3D Farm',
  replicator: 'MakerBot Replicator Industrial FDM',
  scanner: 'High-Precision 3D Optical Scanner',
  vaccumforming: 'Automated Vacuum Forming Station',
  Vinyl: 'Precision High-Speed Vinyl Cutter',
  pcb: 'SMD PCB Prototyping & Reflow Suite',
  router: '5-Axis Heavy-Duty CNC Router & Mill',
  esdWorkstation: 'ESD-Safe Electronics Assembly Workstation',
  workbench: 'Heavy-Duty Hardware Fabrication Workbench',
  handtools: 'Industrial Calibrated Hand Tools Suite',
  powertools: 'High-Torque Workshop Power Tools',
};

const inventoryCategories = {
  lasercutter: 'Subtractive & Laser',
  sla: 'Additive Manufacturing',
  replicator: 'Additive Manufacturing',
  scanner: '3D Scanning & Metrology',
  vaccumforming: 'Thermoforming',
  Vinyl: 'Precision Cutting',
  pcb: 'Electronics & Embedded',
  router: 'CNC Machining',
  esdWorkstation: 'Electronics & Embedded',
  workbench: 'Mechanical & Assembly',
  handtools: 'Tooling & Prototyping',
  powertools: 'Tooling & Prototyping',
};

async function sync() {
  console.log('Fetching live ecosystem data from PIERC Firestore...');
  const res = await fetch(FIRESTORE_URL);
  if (!res.ok) {
    throw new Error(`Failed to fetch PIERC Firestore: ${res.statusText}`);
  }
  const raw = await res.json();
  const parsed = {};
  for (const [k, v] of Object.entries(raw.fields || {})) {
    parsed[k] = parseFirestoreValue(v);
  }

  const governors = (parsed.jsonData?.governor || []).map((g) => {
    const name = (g.name || '').trim();
    const cleanName = name.replace(/Dr\.|Prof\./g, '').trim();
    const parts = cleanName.split(/\s+/).filter(Boolean);
    const initials = parts.slice(0, 2).map((p) => p[0].toUpperCase()).join('') || 'PU';
    return {
      id: String(g.id || ''),
      name,
      role: (g.position || '').trim(),
      bio: (g.description || '').trim(),
      image: (g.image || '').trim(),
      initials,
    };
  }).sort((a, b) => (parseInt(a.id, 10) || 99) - (parseInt(b.id, 10) || 99));

  const team = (parsed.jsonData?.team || []).map((t) => {
    const name = (t.name || '').trim();
    const cleanName = name.replace(/Mr\.|Mrs\.|Ms\./g, '').trim();
    const parts = cleanName.split(/\s+/).filter(Boolean);
    const initials = parts.slice(0, 2).map((p) => p[0].toUpperCase()).join('') || 'TM';
    return {
      id: String(t.id || ''),
      name,
      role: (t.position || '').trim(),
      image: (t.image || '').trim(),
      linkedIn: (t.linkedIn || '').trim(),
      facebook: (t.facebook || '').trim(),
      initials,
    };
  }).sort((a, b) => (parseInt(a.id, 10) || 99) - (parseInt(b.id, 10) || 99));

  const inventory = Object.entries(parsed.assets?.inventory || {})
    .filter(([, url]) => typeof url === 'string')
    .map(([key, url]) => ({
      key,
      title: inventoryNames[key] || key,
      category: inventoryCategories[key] || 'Hardware',
      image: url,
    }));

  const gallery = (parsed.assets?.imageGallery || [])
    .filter((url) => typeof url === 'string')
    .map((url, idx) => ({
      id: idx + 1,
      url,
      caption: `PIERC Innovation & Startup Ecosystem Moment ${idx + 1}`,
    }));

  const creativeSpaces = Object.entries(parsed.assets?.creativeSpace || {})
    .filter(([, url]) => typeof url === 'string')
    .map(([key, url]) => ({
      key,
      title: `${key.charAt(0).toUpperCase() + key.slice(1)} Space`,
      image: url,
    }));

  const payload = {
    updatedAt: new Date().toISOString(),
    governors,
    team,
    inventory,
    gallery,
    creativeSpaces,
    achievers: parsed.jsonData?.achievers || [],
    achievements: parsed.jsonData?.achievements || [],
    newsletters: parsed.jsonData?.newsletters || [],
    vsf: {
      heroImg: parsed.assets?.vsf?.heroImg,
      speakers: parsed.assets?.vsf?.speakers || [],
      partners: parsed.assets?.vsf?.partners || [],
      youtubeLink: parsed.assets?.vsf?.youtubeLink,
    },
  };

  const targetPath = path.resolve(__dirname, '../src/data/piercLiveEcosystem.json');
  fs.writeFileSync(targetPath, JSON.stringify(payload, null, 2), 'utf-8');
  console.log(`Successfully synced ${governors.length} governors, ${team.length} team members, ${inventory.length} machines, and ${gallery.length} gallery photos.`);
}

sync().catch((err) => {
  console.error('Error syncing PIERC data:', err);
  process.exit(1);
});
