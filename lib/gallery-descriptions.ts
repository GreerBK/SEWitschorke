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

export interface GalleryItem {
  state: string
  image: string
  alt: string
}

let cached: GalleryItem[] | null = null

/** Load gallery items — one photo per state. */
export function getGalleryItems(): GalleryItem[] {
  if (cached) return cached
  cached = US_STATES.map((state) => ({
    state,
    image: `/images/gallery/${stateToFilename(state)}`,
    alt: state,
  }))
  return cached
}
