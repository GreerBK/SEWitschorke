import fs from "fs"
import path from "path"
import YAML from "yaml"

export interface NavLink {
  href: string
  label: string
}

interface NavYaml {
  links: NavLink[]
}

let cachedLinks: NavLink[] | null = null

export function getNavLinks(): NavLink[] {
  if (cachedLinks) return cachedLinks
  const filePath = path.join(process.cwd(), "content", "nav.yaml")
  try {
    const raw = fs.readFileSync(filePath, "utf8")
    const parsed = YAML.parse(raw) as NavYaml | null
    cachedLinks = parsed?.links ?? []
  } catch {
    cachedLinks = []
  }
  return cachedLinks
}

