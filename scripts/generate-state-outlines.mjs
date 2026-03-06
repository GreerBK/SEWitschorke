/**
 * Fetches US state GeoJSON from https://github.com/glynnbird/usstatesgeojson,
 * projects to 959×593 (Albers USA), and generates lib/state-outlines.ts
 * Run: node scripts/generate-state-outlines.mjs
 */
import { geoAlbersUsa, geoPath } from "d3-geo"
import { writeFileSync } from "fs"
import { join } from "path"

const BASE = "https://raw.githubusercontent.com/glynnbird/usstatesgeojson/master"
const STATE_FILES = [
  "alabama", "alaska", "arizona", "arkansas", "california", "colorado",
  "connecticut", "delaware", "florida", "georgia", "hawaii", "idaho",
  "illinois", "indiana", "iowa", "kansas", "kentucky", "louisiana",
  "maine", "maryland", "massachusetts", "michigan", "minnesota", "mississippi",
  "missouri", "montana", "nebraska", "nevada", "new hampshire", "new jersey",
  "new mexico", "new york", "north carolina", "north dakota", "ohio",
  "oklahoma", "oregon", "pennsylvania", "rhode island", "south carolina",
  "south dakota", "tennessee", "texas", "utah", "vermont", "virginia",
  "washington", "west virginia", "wisconsin", "wyoming",
]

function displayName(fileName) {
  return fileName
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ")
}

async function fetchState(fileName) {
  const url = `${BASE}/${encodeURIComponent(fileName)}.geojson`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`)
  return res.json()
}

async function main() {
  console.log("Fetching state GeoJSON files...")
  const features = []
  const byName = {}
  for (const file of STATE_FILES) {
    const geojson = await fetchState(file)
    const name = displayName(file)
    features.push(geojson)
    byName[name] = geojson
  }

  const featureCollection = { type: "FeatureCollection", features }
  const projection = geoAlbersUsa().fitSize([959, 593], featureCollection)
  const pathGenerator = geoPath().projection(projection)

  const entries = []
  for (const file of STATE_FILES) {
    const name = displayName(file)
    const feature = byName[name]
    const pathStr = pathGenerator(feature)
    if (!pathStr) {
      console.warn(`No path for ${name}`)
      continue
    }
    const compact = pathStr.replace(/\s+/g, " ").trim().replace(/\s+([MLHVCSQTAZ])/gi, "$1")
    const escaped = compact.replace(/"/g, '\\"')
    entries.push(`  "${name}": { viewBox: VIEWBOX_FULL, path: "${escaped}" }`)
  }

  const tsContent = `/**
 * US state SVG outline paths (all 50 states).
 * Generated from https://github.com/glynnbird/usstatesgeojson (GeoJSON → Albers USA 959×593).
 * ViewBox is computed from each path so the state shape fills the icon.
 */
const VIEWBOX_FULL = "0 0 959 593"

export interface StateOutline {
  viewBox: string
  path: string
}

/** Compute viewBox (minX minY width height) from an SVG path so the path fits with padding. */
function viewBoxFromPath(path: string, padding = 2): string {
  const normalized = path.replace(/\\s+/g, " ").trim()
  const nums = normalized
    .replace(/[MLHVCSQTAZ]/gi, " ")
    .split(/[\\s,]+/)
    .filter(Boolean)
    .map(Number)
  let minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity
  for (let i = 0; i < nums.length - 1; i += 2) {
    const x = nums[i]!,
      y = nums[i + 1]!
    if (Number.isFinite(x) && Number.isFinite(y)) {
      minX = Math.min(minX, x)
      minY = Math.min(minY, y)
      maxX = Math.max(maxX, x)
      maxY = Math.max(maxY, y)
    }
  }
  if (!Number.isFinite(minX)) return VIEWBOX_FULL
  const w = maxX - minX || 1
  const h = maxY - minY || 1
  const p = Math.max(padding, Math.min(w, h) * 0.02)
  return \`\${minX - p} \${minY - p} \${w + 2 * p} \${h + 2 * p}\`
}

/** State outline by full state name (e.g. "Texas", "New York"). */
export const STATE_OUTLINES: Record<string, StateOutline> = {
${entries.join(",\n")},
}

/** Normalize path to compact form (no spaces after command letters) for consistent SVG rendering. */
function compactPath(path: string): string {
  const s = path.replace(/\\s+/g, " ").trim()
  return s.replace(/^\\s*([MLHVCSQTAZ])\\s+/, "$1").replace(/\\s+([MLHVCSQTAZ])\\s+/gi, "$1")
}

/** Get outline for a state name (e.g. "Texas", "New York"). Falls back to Texas if unknown. */
export function getStateOutline(stateName: string): StateOutline {
  const o = STATE_OUTLINES[stateName] ?? STATE_OUTLINES["Texas"]
  const path = compactPath(o.path)
  return { path, viewBox: viewBoxFromPath(path) }
}
`

  const outPath = join(process.cwd(), "lib", "state-outlines.ts")
  writeFileSync(outPath, tsContent, "utf8")
  console.log(`Wrote ${outPath} (${entries.length} states)`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
