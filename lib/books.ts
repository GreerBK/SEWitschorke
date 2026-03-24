import fs from "fs"
import path from "path"
import YAML from "yaml"

export interface Book {
  title: string
  image: string
  description: string
  year: string
  level: string
  featured?: boolean
  href?: string
  orderUrl?: string
  imageName?: string
}

interface BooksYaml {
  books: Book[]
}

let cachedBooks: Book[] | null = null

export function getBooks(): Book[] {
  if (cachedBooks) return cachedBooks
  const filePath = path.join(process.cwd(), "content", "books.yaml")
  try {
    const raw = fs.readFileSync(filePath, "utf8")
    const parsed = YAML.parse(raw) as BooksYaml | null
    cachedBooks = parsed?.books ?? []
  } catch {
    cachedBooks = []
  }
  return cachedBooks
}

