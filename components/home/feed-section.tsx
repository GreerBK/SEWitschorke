import { SubstackEmbed } from "./substack-embed"
import { TikTokEmbed } from "./tiktok-embed"

export function FeedSection() {
  return (
    <section className="py-16 md:py-24 bg-warm-gray relative">
      <div className="mx-auto max-w-5xl px-6">
        {/* Section header */}
        <div className="text-center mb-12">
          <p className="font-sans text-[10px] md:text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">
            Stay Connected
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground">
            From the Desk
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <SubstackEmbed />
          <TikTokEmbed />
        </div>
      </div>
    </section>
  )
}
