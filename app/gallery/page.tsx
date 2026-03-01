import type { Metadata } from "next"
import { GalleryGrid } from "@/components/gallery/gallery-grid"

export const metadata: Metadata = {
  title: "Gallery | SE Witschorke",
  description: "Browse travel photography by SE Witschorke. Explore coffee shops, food, and landscapes from across the country.",
}

export default function GalleryPage() {
  return (
    <section className="py-14 md:py-20 bg-background">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-center font-serif italic text-3xl md:text-4xl text-foreground mb-4">
          Gallery
        </h2>
        <p className="text-center text-muted-foreground text-sm font-serif mb-12">
          Hover over a photo to discover the story behind it
        </p>

        <GalleryGrid />
      </div>
    </section>
  )
}
