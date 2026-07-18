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

function GalleryCard({
  item,
  priority = false,
}: {
  item: GalleryItem
  priority?: boolean
}) {
  const [active, setActive] = useState(false)
  const [imgError, setImgError] = useState(false)
  const outline = getStateOutline(item.state)
  const strokeWidth = strokeWidthFromViewBox(outline.viewBox)

  return (
    <div
      className="relative aspect-square overflow-hidden rounded-sm group"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
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
          <span className="text-muted-foreground text-sm font-display">{item.state}</span>
        </div>
      )}

      {/* Hover / tap overlay — state outline + name, centered. Decorative: the img alt already names the state. */}
      <div
        aria-hidden
        className={`absolute inset-0 bg-teal-dark/80 backdrop-blur-[2px] flex flex-col items-center justify-center gap-2 md:gap-2.5 text-center transition-all duration-500 ${
          active ? "opacity-100" : "opacity-0"
        }`}
      >
        <svg
          viewBox={outline.viewBox}
          className="w-10 h-10 md:w-16 md:h-16 flex-shrink-0"
          fill="none"
          stroke="white"
          strokeWidth={strokeWidth}
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          <path d={outline.path} fill="white" fillOpacity="0.12" />
        </svg>

        <p className="font-display font-bold text-[11px] md:text-sm text-primary-foreground tracking-[0.15em] uppercase">
          {item.state}
        </p>
      </div>

      {/* Mobile: subtle state label at bottom. Decorative: the img alt already names the state. */}
      <div aria-hidden className={`absolute bottom-0 inset-x-0 bg-gradient-to-t from-teal-dark/70 to-transparent py-2 pt-6 text-center sm:hidden transition-opacity duration-300 ${active ? "opacity-0" : "opacity-100"}`}>
        <p className="font-display text-[10px] text-primary-foreground/80 tracking-[0.15em] uppercase">
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
