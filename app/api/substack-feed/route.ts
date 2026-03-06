import { NextResponse } from "next/server"

const SUBSTACK_RSS = "https://sewitschorke.substack.com/feed"

interface RssItem {
  title: string
  link: string
  pubDate: string
}

function stripCdata(text: string): string {
  const cdata = text.match(/<!\[CDATA\[([\s\S]*?)\]\]>/)
  if (cdata) return cdata[1].trim()
  return text.trim()
}

function parseRssItems(xml: string): RssItem[] {
  const items: RssItem[] = []
  const itemBlocks = xml.split(/<item[\s>]/i)
  // First segment is channel metadata before any <item>
  for (let i = 1; i < itemBlocks.length; i++) {
    const block = itemBlocks[i]
    const titleMatch = block.match(/<title[^>]*>([\s\S]*?)<\/title>/i)
    const linkMatch = block.match(/<link[^>]*>([^<]+)<\/link>/i)
    const pubDateMatch = block.match(/<pubDate[^>]*>([^<]+)<\/pubDate>/i)
    const title = titleMatch ? stripCdata(titleMatch[1]) : ""
    const link = linkMatch ? linkMatch[1].trim() : ""
    const pubDate = pubDateMatch ? pubDateMatch[1].trim() : ""
    if (title && link) items.push({ title, link, pubDate })
  }
  return items.slice(0, 5)
}

const NOTES_PAGE_URL = "https://substack.com/@sewitschorke/notes"

function extractPostsFromNextData(obj: unknown): unknown[] {
  if (!obj || typeof obj !== "object") return []
  const o = obj as Record<string, unknown>
  if (Array.isArray(o.posts)) return o.posts
  if (Array.isArray(o.notes)) return o.notes
  const feed = o.feed as Record<string, unknown> | undefined
  if (feed && Array.isArray(feed.posts)) return feed.posts
  if (o.pageProps && typeof o.pageProps === "object") return extractPostsFromNextData(o.pageProps)
  if (o.props && typeof o.props === "object") return extractPostsFromNextData((o.props as Record<string, unknown>).pageProps)
  return []
}

function parseNotesFromHtml(html: string): RssItem[] {
  const items: RssItem[] = []
  const match = html.match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/)
  if (!match) return items
  try {
    const json = JSON.parse(match[1]) as unknown
    const posts = extractPostsFromNextData(json)
    if (!Array.isArray(posts)) return items
    for (const p of posts.slice(0, 5)) {
      const post = p as { id?: string; title?: string; canonical_url?: string; created_at?: string; body?: string }
      const link = post.canonical_url || (post.id ? `https://substack.com/@sewitschorke/notes/p/${post.id}` : "")
      const title = post.title || (post.body ? post.body.slice(0, 80).replace(/<[^>]+>/g, "").trim() + "…" : "Note")
      if (link) items.push({ title, link, pubDate: post.created_at || "" })
    }
  } catch {
    // ignore parse errors
  }
  return items
}

export async function GET() {
  try {
    const res = await fetch(SUBSTACK_RSS, { next: { revalidate: 600 } })
    if (!res.ok) throw new Error("RSS fetch failed")
    const xml = await res.text()
    let items = parseRssItems(xml)
    let source: "feed" | "notes" = "feed"

    // Main feed has no items (e.g. only Notes) — fetch notes page and parse __NEXT_DATA__
    if (items.length === 0) {
      try {
        const notesRes = await fetch(NOTES_PAGE_URL, {
          next: { revalidate: 600 },
          headers: { "User-Agent": "Mozilla/5.0 (compatible; SubstackFeed/1.0)" },
        })
        if (notesRes.ok) {
          const html = await notesRes.text()
          items = parseNotesFromHtml(html)
          if (items.length > 0) source = "notes"
        }
      } catch {
        // ignore
      }
    }

    return NextResponse.json({ items, source })
  } catch {
    return NextResponse.json({ items: [], source: "feed" as const, error: "Failed to load feed" }, { status: 200 })
  }
}
