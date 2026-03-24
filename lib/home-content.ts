import fs from "fs"
import path from "path"
import YAML from "yaml"

export interface PoemQuote {
  text: string
  attribution?: string
}

interface HomeYaml {
  poemQuote?: PoemQuote
}

let cachedPoemQuote: PoemQuote | null = null

export function getPoemQuote(): PoemQuote | null {
  if (cachedPoemQuote) return cachedPoemQuote
  const filePath = path.join(process.cwd(), "content", "home.yaml")
  try {
    const raw = fs.readFileSync(filePath, "utf8")
    const parsed = YAML.parse(raw) as HomeYaml | null
    cachedPoemQuote = parsed?.poemQuote ?? null
  } catch {
    cachedPoemQuote = null
  }
  return cachedPoemQuote
}

