import initialData from '../data/piercLiveEcosystem.json';

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

let cachedData = initialData;

/**
 * Returns currently loaded ecosystem data (instant, synchronous)
 */
export function getPiercEcosystemData() {
  return cachedData;
}

export function getBoardOfGovernors() {
  return cachedData.governors || initialData.governors;
}

export function getOperatingTeam() {
  return cachedData.team || initialData.team;
}

export function getFabLabInventory() {
  return cachedData.inventory || initialData.inventory;
}

export function getGalleryMoments() {
  return cachedData.gallery || initialData.gallery;
}

export function getAchievers() {
  return cachedData.achievers || initialData.achievers;
}

export function getAchievements() {
  return cachedData.achievements || initialData.achievements;
}

export function getNewsletters() {
  return cachedData.newsletters || initialData.newsletters;
}

/**
 * Optionally revalidates and refreshes with latest live Firestore data
 */
export async function fetchLivePiercData() {
  try {
    const res = await fetch(FIRESTORE_URL);
    if (!res.ok) return cachedData;
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

    cachedData = {
      ...cachedData,
      governors: governors.length ? governors : cachedData.governors,
      team: team.length ? team : cachedData.team,
    };
    return cachedData;
  } catch (err) {
    console.warn('PIERC live Firestore fetch fallback to local:', err);
    return cachedData;
  }
}

export default {
  getPiercEcosystemData,
  getBoardOfGovernors,
  getOperatingTeam,
  getFabLabInventory,
  getGalleryMoments,
  getAchievers,
  getAchievements,
  getNewsletters,
  fetchLivePiercData,
};
