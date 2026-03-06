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

        // Load TikTok's embed.js only after the blockquote is in the DOM so it can upgrade it to the full widget
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
    <div className="bg-muted rounded-md p-6 md:p-8 text-center">
      <h3 className="font-sans font-bold tracking-wider uppercase text-foreground text-center mb-4">
        TikTok
      </h3>
      {error ? (
        <>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            Short videos on food, travel, and life—follow @sweetnsavory61.
          </p>
          <a
            href={TIKTOK_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm text-primary hover:text-teal-dark transition-colors underline underline-offset-4"
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
          <a
            href={TIKTOK_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 text-sm text-primary hover:text-teal-dark transition-colors underline underline-offset-4"
          >
            Follow on TikTok
          </a>
        </>
      )}
    </div>
  )
}
