"use client"

import Image from "next/image"
import { useState } from "react"
import { getStateOutline } from "@/lib/state-outlines"
import type { GalleryItem } from "@/lib/gallery-descriptions"

/** Derive a consistent stroke width from viewBox so all state borders look the same thickness. */
function strokeWidthFromViewBox(viewBox: string, fraction = 0.02): number {
  const [,, w, h] = viewBox.split(/\s+/).map(Number)
  const size = Math.min(w, h)
  if (!Number.isFinite(size) || size <= 0) return 2
  return Math.max(1, size * fraction)
}

function GalleryCard({ item, priority = false }: { item: GalleryItem; priority?: boolean }) {
  const [hovered, setHovered] = useState(false)
  const [imgError, setImgError] = useState(false)
  const outline = getStateOutline(item.state)
  const strokeWidth = strokeWidthFromViewBox(outline.viewBox)

  return (
    <div
      className="relative aspect-square overflow-hidden rounded cursor-pointer group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
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
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 20vw"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="absolute inset-0 bg-muted flex items-center justify-center" aria-hidden>
          <span className="text-muted-foreground text-sm font-medium">{item.state}</span>
        </div>
      )}

      {/* Hover overlay: highlight with state outline and blurb */}
      <div
        className={`absolute inset-0 bg-teal-dark/75 flex flex-col items-center justify-center p-4 text-center transition-opacity duration-300 ${
          hovered ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* State outline SVG */}
        <svg
          viewBox={outline.viewBox}
          className="w-16 h-16 md:w-20 md:h-20 mb-2 flex-shrink-0"
          fill="none"
          stroke="white"
          strokeWidth={strokeWidth}
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          <path d={outline.path} fill="white" fillOpacity="0.15" />
        </svg>

        {/* State name */}
        <p className="font-sans font-bold text-sm md:text-base text-primary-foreground tracking-wider uppercase">
          {item.state}
        </p>

        {/* Blurb */}
        <p className="font-serif italic text-xs md:text-sm text-sage-light mt-2 leading-relaxed max-w-[200px]">
          {item.blurb}
        </p>
      </div>
    </div>
  )
}

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.map((item, idx) => (
        <GalleryCard key={item.state} item={item} priority={idx === 0} />
      ))}
    </div>
  )
}
