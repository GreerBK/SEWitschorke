import fs from "fs"
import path from "path"
import YAML from "yaml"

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
  "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho",
  "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana",
  "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi",
  "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
  "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma",
  "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
  "West Virginia", "Wisconsin", "Wyoming",
] as const

function stateToFilename(state: string): string {
  return state.toLowerCase().replace(/\s+/g, "-") + ".jpg"
}

function stateToSlug(state: string): string {
  return state.toLowerCase().replace(/\s+/g, "-")
}

export interface GalleryItem {
  state: string
  image: string
  alt: string
  blurb: string
  popout: string
}

let cached: GalleryItem[] | null = null

/** Load gallery items with descriptions from content/gallery-descriptions.yaml. */
export function getGalleryItems(): GalleryItem[] {
  if (cached) return cached
  const filePath = path.join(process.cwd(), "content", "gallery-descriptions.yaml")
  let descriptions: Record<string, string> = {}
  try {
    const raw = fs.readFileSync(filePath, "utf8")
    descriptions = YAML.parse(raw) ?? {}
  } catch {
    // fallback: no descriptions, use defaults below
  }
  const galleryDir = path.join(process.cwd(), "content", "gallery")
  const defaultPopout = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."

  cached = US_STATES.map((state) => {
    let popout = defaultPopout
    try {
      const slug = stateToSlug(state)
      const yamlPath = path.join(galleryDir, `${slug}.yaml`)
      const raw = fs.readFileSync(yamlPath, "utf8")
      const data = YAML.parse(raw) as { popout?: string } | null
      if (data?.popout && typeof data.popout === "string") popout = data.popout
    } catch {
      // use default
    }
    return {
      state,
      image: `/images/gallery/${stateToFilename(state)}`,
      alt: state,
      blurb: typeof descriptions[state] === "string" ? descriptions[state] : `Add your story from ${state}.`,
      popout,
    }
  })
  return cached
}
