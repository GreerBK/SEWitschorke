"use client"

import { useEffect, useState } from "react"

const INSTAGRAM_PROFILE_URL = "https://www.instagram.com/sewitschorke/"
const EMBED_SCRIPT_URL = "https://www.instagram.com/embed.js"

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } }
  }
}

export function InstagramCard() {
  const [error, setError] = useState(false)

  useEffect(() => {
    if (window.instgrm) {
      window.instgrm.Embeds.process()
      return
    }
    if (document.querySelector(`script[src="${EMBED_SCRIPT_URL}"]`)) return

    const script = document.createElement("script")
    script.src = EMBED_SCRIPT_URL
    script.async = true
    script.onerror = () => setError(true)
    document.body.appendChild(script)
  }, [])

  return (
    <div className="bg-card rounded-lg p-8 md:p-10 shadow-sm border border-border/50">
      <h3 className="font-sans font-bold text-xs tracking-[0.2em] uppercase text-foreground mb-6">
        Instagram
      </h3>
      {error ? (
        <>
          <p className="text-muted-foreground text-sm font-serif leading-relaxed mb-5">
            Photos and updates on writing, food, and travel &mdash; follow @sewitschorke.
          </p>
          <a
            href={INSTAGRAM_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-sans text-xs tracking-[0.15em] uppercase text-primary border-b border-primary/30 pb-0.5 hover:border-primary transition-colors"
          >
            Follow on Instagram
          </a>
        </>
      ) : (
        <>
          <blockquote
            className="instagram-media !max-w-full !min-w-0 !mx-auto"
            data-instgrm-permalink={`${INSTAGRAM_PROFILE_URL}?utm_source=ig_embed&utm_campaign=loading`}
            data-instgrm-version="14"
            style={{
              background: "#FFF",
              border: 0,
              borderRadius: "3px",
              margin: "0 auto",
              padding: 0,
              width: "100%",
            }}
          >
            <a
              href={INSTAGRAM_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block py-12 text-center font-sans text-xs tracking-[0.15em] uppercase text-primary"
            >
              View @sewitschorke on Instagram
            </a>
          </blockquote>
          <div className="mt-6 pt-4 border-t border-border/50">
            <a
              href={INSTAGRAM_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-sans text-xs tracking-[0.15em] uppercase text-primary border-b border-primary/30 pb-0.5 hover:border-primary transition-colors"
            >
              Follow on Instagram
            </a>
          </div>
        </>
      )}
    </div>
  )
}
