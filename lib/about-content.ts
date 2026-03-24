import fs from "fs"
import path from "path"
import YAML from "yaml"

export interface BioContent {
  paragraphs: string[]
}

export interface Award {
  year: string
  title: string
  work: string
}

interface AwardsYaml {
  awards: Award[]
}

let cachedBio: BioContent | null = null
let cachedAwards: Award[] | null = null

export function getBioContent(): BioContent {
  if (cachedBio) return cachedBio
  const filePath = path.join(process.cwd(), "content", "about.yaml")
  try {
    const raw = fs.readFileSync(filePath, "utf8")
    const parsed = YAML.parse(raw) as { bio?: { paragraphs?: string[] } } | null
    const paragraphs = parsed?.bio?.paragraphs ?? []
    cachedBio = { paragraphs }
  } catch {
    cachedBio = { paragraphs: [] }
  }
  return cachedBio
}

export function getAwards(): Award[] {
  if (cachedAwards) return cachedAwards
  const filePath = path.join(process.cwd(), "content", "awards.yaml")
  try {
    const raw = fs.readFileSync(filePath, "utf8")
    const parsed = YAML.parse(raw) as AwardsYaml | null
    cachedAwards = parsed?.awards ?? []
  } catch {
    cachedAwards = []
  }
  return cachedAwards
}

