"use client"

import Image from "next/image"
import { useState } from "react"
import { getStateOutline } from "@/lib/state-outlines"
import type { GalleryItem } from "@/lib/gallery-descriptions"

function strokeWidthFromViewBox(viewBox: string, fraction = 0.02): number {
  const [,, w, h] = viewBox.split(/\s+/).map(Number)
  const size = Math.min(w, h)
  if (!Number.isFinite(size) || size <= 0) return 2
  return Math.max(1, size * fraction)
}

function GalleryCard({ item, priority = false }: { item: GalleryItem; priority?: boolean }) {
  const [active, setActive] = useState(false)
  const [imgError, setImgError] = useState(false)
  const outline = getStateOutline(item.state)
  const strokeWidth = strokeWidthFromViewBox(outline.viewBox)

  return (
    <div
      className="relative aspect-square overflow-hidden rounded-sm cursor-pointer group"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onClick={() => setActive((prev) => !prev)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      tabIndex={0}
      role="figure"
      aria-label={`${item.alt} - ${item.state}: ${item.blurb}`}
    >
      {!imgError ? (
        <Image
          src={item.image}
          alt={item.alt}
          fill
          priority={priority}
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 50vw, 25vw"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="absolute inset-0 bg-warm-gray flex items-center justify-center" aria-hidden>
          <span className="text-muted-foreground text-sm font-sans">{item.state}</span>
        </div>
      )}

      {/* Hover / tap overlay */}
      <div
        className={`absolute inset-0 bg-teal-dark/80 backdrop-blur-[2px] flex flex-col items-center justify-center p-3 md:p-5 text-center transition-all duration-500 ${
          active ? "opacity-100" : "opacity-0"
        }`}
      >
        <svg
          viewBox={outline.viewBox}
          className="w-10 h-10 md:w-16 md:h-16 mb-2 flex-shrink-0"
          fill="none"
          stroke="white"
          strokeWidth={strokeWidth}
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          <path d={outline.path} fill="white" fillOpacity="0.12" />
        </svg>

        <p className="font-sans font-bold text-[11px] md:text-sm text-primary-foreground tracking-[0.15em] uppercase">
          {item.state}
        </p>

        <div className="mt-1.5 w-6 h-px bg-gold/60" />

        <p className="font-serif italic text-[10px] md:text-sm text-sage-light/90 mt-2 leading-snug max-w-[140px] md:max-w-[180px]">
          {item.blurb}
        </p>
      </div>

      {/* Mobile: subtle state label at bottom */}
      <div className={`absolute bottom-0 inset-x-0 bg-gradient-to-t from-teal-dark/70 to-transparent py-2 pt-6 text-center sm:hidden transition-opacity duration-300 ${active ? "opacity-0" : "opacity-100"}`}>
        <p className="font-sans text-[10px] text-primary-foreground/80 tracking-[0.15em] uppercase">
          {item.state}
        </p>
      </div>
    </div>
  )
}

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
      {items.map((item, idx) => (
        <GalleryCard key={item.state} item={item} priority={idx === 0} />
      ))}
    </div>
  )
}
