"use client"

import Image from "next/image"
import { useState } from "react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import { XIcon } from "lucide-react"
import { cn } from "@/lib/utils"
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
  onOpenPopout,
}: {
  item: GalleryItem
  priority?: boolean
  onOpenPopout: (item: GalleryItem) => void
}) {
  const [active, setActive] = useState(false)
  const [imgError, setImgError] = useState(false)
  const outline = getStateOutline(item.state)
  const strokeWidth = strokeWidthFromViewBox(outline.viewBox)

  return (
    <div
      className="relative aspect-square overflow-hidden rounded-sm cursor-pointer group"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onClick={() => onOpenPopout(item)}
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

      {/* Hover / tap overlay — state outline + name, centered */}
      <div
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

        <p className="font-sans font-bold text-[11px] md:text-sm text-primary-foreground tracking-[0.15em] uppercase">
          {item.state}
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

function GalleryPopoutBody({ item }: { item: GalleryItem }) {
  const outline = getStateOutline(item.state)
  const strokeWidth = strokeWidthFromViewBox(outline.viewBox)

  return (
    <div className="relative w-full overflow-visible rounded-[28px] bg-[#006ba6] pt-[2.835rem] pb-[2.025rem] pl-[1.8225rem] pr-[1.8225rem] shadow-xl sm:pt-[3.43125rem] sm:pb-[2.43rem] sm:pl-[2.2275rem] sm:pr-[2.2275rem]">
      {/* Same bg as shell, slight overlap into body to avoid subpixel seam */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 z-10 flex h-[4.025rem] w-[8.3375rem] -translate-x-1/2 -translate-y-[calc(50%-2px)] items-end justify-center rounded-t-full bg-[#006ba6] pb-[0.43125rem] pt-[0.575rem] sm:h-[4.45rem]"
        aria-hidden
      >
        <svg
          viewBox={outline.viewBox}
          className="h-[2.975625rem] w-[2.975625rem] flex-shrink-0 sm:h-[3.30625rem] sm:w-[3.30625rem]"
          fill="none"
          stroke="#ffffff"
          strokeWidth={strokeWidth}
          preserveAspectRatio="xMidYMid meet"
        >
          <path d={outline.path} fill="#ffffff" fillOpacity={0.12} />
        </svg>
      </div>

      <DialogClose
        className="absolute top-4 right-4 z-20 cursor-pointer rounded-sm p-1 text-white opacity-90 ring-offset-[#006ba6] transition-opacity hover:opacity-100 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#006ba6]"
        aria-label="Close"
      >
        <XIcon className="size-6" strokeWidth={2} />
      </DialogClose>

      <DialogTitle className="sr-only">{item.state}</DialogTitle>

      <div className="rounded-2xl bg-white px-5 py-8 sm:px-8 sm:py-10">
        <p className="text-center font-sans text-sm leading-relaxed text-neutral-800 sm:text-base">
          {item.popout}
        </p>
      </div>
    </div>
  )
}

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [popoutItem, setPopoutItem] = useState<GalleryItem | null>(null)

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
        {items.map((item, idx) => (
          <GalleryCard
            key={item.state}
            item={item}
            priority={idx === 0}
            onOpenPopout={setPopoutItem}
          />
        ))}
      </div>

      <Dialog open={!!popoutItem} onOpenChange={(open) => !open && setPopoutItem(null)}>
        <DialogContent
          showCloseButton={false}
          overlayClassName="bg-black/60 backdrop-blur-[2px]"
          onOpenAutoFocus={(e) => e.preventDefault()}
          className={cn(
            "max-w-[min(calc(100%-2rem),32rem)] gap-0 overflow-visible border-0 bg-transparent p-0 shadow-none sm:max-w-lg",
          )}
        >
          {popoutItem && <GalleryPopoutBody item={popoutItem} />}
        </DialogContent>
      </Dialog>
    </>
  )
}
