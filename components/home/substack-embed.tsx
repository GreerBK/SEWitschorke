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
      <div className="bg-muted rounded-md p-8 text-center">
        <h3 className="font-sans font-bold tracking-wider uppercase text-foreground text-center mb-2">
          Newsletter
        </h3>
        <p className="text-muted-foreground text-sm">Loading latest posts…</p>
      </div>
    )
  }

  if (error || !posts.length) {
    return (
      <div className="bg-muted rounded-md p-8 text-center">
        <h3 className="font-sans font-bold tracking-wider uppercase text-foreground text-center mb-2">
          Newsletter
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
          Essays on writing, travel, and foodie adventures.
        </p>
        <a
          href="https://substack.com/@sewitschorke/notes"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-sm text-primary hover:text-teal-dark transition-colors underline underline-offset-4"
        >
          Read on Substack
        </a>
      </div>
    )
  }

  return (
    <div className="bg-muted rounded-md p-6 md:p-8 text-center">
      <h3 className="font-sans font-bold tracking-wider uppercase text-foreground text-center mb-4">
        {source === "notes" ? "Latest notes" : "Latest from the Newsletter"}
      </h3>
      <ul className="space-y-3 text-center">
        {posts.map((post) => (
          <li key={post.link}>
            <a
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary transition-colors text-sm font-medium line-clamp-2 inline-block"
            >
              {post.title}
            </a>
            <p className="text-muted-foreground text-xs mt-0.5">
              {new Date(post.pubDate).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </li>
        ))}
      </ul>
      <a
        href="https://substack.com/@sewitschorke/notes"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-4 text-sm text-primary hover:text-teal-dark transition-colors underline underline-offset-4"
      >
        Read more on Substack
      </a>
    </div>
  )
}
