"use client"

import { useEffect, useState } from "react"

interface RssItem {
  title: string
  link: string
  pubDate: string
  description?: string
  thumbnail?: string
}

type FeedSource = "feed" | "notes"

export function SubstackEmbed() {
  const [posts, setPosts] = useState<RssItem[]>([])
  const [source, setSource] = useState<FeedSource>("feed")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch("/api/substack-feed")
      .then((res) => res.json())
      .then((data: { items?: RssItem[]; source?: FeedSource }) => {
        if (Array.isArray(data.items)) setPosts(data.items)
        if (data.source) setSource(data.source)
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="bg-card rounded-lg p-8 md:p-10 shadow-sm border border-border/50">
        <h3 className="font-sans font-bold text-xs tracking-[0.2em] uppercase text-foreground mb-2">
          Newsletter
        </h3>
        <p className="text-muted-foreground text-sm font-serif">Loading latest posts…</p>
      </div>
    )
  }

  if (error || !posts.length) {
    return (
      <div className="bg-card rounded-lg p-8 md:p-10 shadow-sm border border-border/50">
        <h3 className="font-sans font-bold text-xs tracking-[0.2em] uppercase text-foreground mb-3">
          Newsletter
        </h3>
        <p className="text-muted-foreground text-sm font-serif leading-relaxed mb-5">
          Essays on writing, travel, and foodie adventures.
        </p>
        <a
          href="https://substack.com/@sewitschorke/notes"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block font-sans text-xs tracking-[0.15em] uppercase text-primary border-b border-primary/30 pb-0.5 hover:border-primary transition-colors"
        >
          Read on Substack
        </a>
      </div>
    )
  }

  return (
    <div className="bg-card rounded-lg p-8 md:p-10 shadow-sm border border-border/50">
      <h3 className="font-sans font-bold text-xs tracking-[0.2em] uppercase text-foreground mb-6">
        {source === "notes" ? "Latest Notes" : "Newsletter"}
      </h3>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.link} className="group">
            <a
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <p className="text-foreground group-hover:text-primary transition-colors text-sm font-serif font-bold line-clamp-2 leading-snug">
                {post.title}
              </p>
              <p className="text-muted-foreground text-xs mt-1 font-sans tracking-wider">
                {new Date(post.pubDate).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </a>
          </li>
        ))}
      </ul>
      <div className="mt-6 pt-4 border-t border-border/50">
        <a
          href="https://substack.com/@sewitschorke/notes"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block font-sans text-xs tracking-[0.15em] uppercase text-primary border-b border-primary/30 pb-0.5 hover:border-primary transition-colors"
        >
          Read more on Substack
        </a>
      </div>
    </div>
  )
}
