"use client"

import { useEffect, useRef, useState } from "react"

const TIKTOK_PROFILE_URL = "https://www.tiktok.com/@sweetnsavory61"
const EMBED_SCRIPT_URL = "https://www.tiktok.com/embed.js"

export function TikTokEmbed() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [error, setError] = useState(false)
  const scriptLoadedRef = useRef(false)

  useEffect(() => {
    let cancelled = false

    async function loadEmbed() {
      try {
        const res = await fetch("/api/tiktok-oembed")
        if (!res.ok) throw new Error("oEmbed failed")
        const data = (await res.json()) as { html?: string }
        if (cancelled || !containerRef.current || !data.html) return

        const div = document.createElement("div")
        div.innerHTML = data.html
        const blockquote = div.querySelector("blockquote")
        if (!blockquote) {
          setError(true)
          return
        }

        containerRef.current.innerHTML = ""
        containerRef.current.appendChild(blockquote)

        if (scriptLoadedRef.current) return
        scriptLoadedRef.current = true

        const script = document.createElement("script")
        script.src = EMBED_SCRIPT_URL
        script.async = true
        document.body.appendChild(script)
      } catch {
        if (!cancelled) setError(true)
      }
    }

    loadEmbed()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="bg-card rounded-lg p-8 md:p-10 shadow-sm border border-border/50">
      <h3 className="font-sans font-bold text-xs tracking-[0.2em] uppercase text-foreground mb-6">
        TikTok
      </h3>
      {error ? (
        <>
          <p className="text-muted-foreground text-sm font-serif leading-relaxed mb-5">
            Short videos on food, travel, and life — follow @sweetnsavory61.
          </p>
          <a
            href={TIKTOK_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-sans text-xs tracking-[0.15em] uppercase text-primary border-b border-primary/30 pb-0.5 hover:border-primary transition-colors"
          >
            Follow on TikTok
          </a>
        </>
      ) : (
        <>
          <div
            ref={containerRef}
            className="min-h-[320px] flex items-center justify-center [&_.tiktok-embed]:!max-w-full [&_.tiktok-embed]:!mx-auto"
          />
          <div className="mt-6 pt-4 border-t border-border/50">
            <a
              href={TIKTOK_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-sans text-xs tracking-[0.15em] uppercase text-primary border-b border-primary/30 pb-0.5 hover:border-primary transition-colors"
            >
              Follow on TikTok
            </a>
          </div>
        </>
      )}
    </div>
  )
}
