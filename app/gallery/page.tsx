import type { Metadata } from "next"
import { GalleryGrid } from "@/components/gallery/gallery-grid"
import { getGalleryItems } from "@/lib/gallery-descriptions"

export const metadata: Metadata = {
  title: "Gallery | SE Witschorke",
  description: "Browse travel photography by SE Witschorke. Explore coffee shops, food, and landscapes from across the country.",
}

export default function GalleryPage() {
  const items = getGalleryItems()
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center mb-12 md:mb-16">
          <p className="font-sans text-[10px] md:text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">
            Wanderlust
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground">
            Gallery
          </h2>
          <p className="text-muted-foreground text-sm font-serif mt-3">
            Tap or hover to discover the story behind each photo
          </p>
        </div>

        <GalleryGrid items={items} />
      </div>
    </section>
  )
}
