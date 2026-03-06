import { SubstackEmbed } from "./substack-embed"
import { TikTokEmbed } from "./tiktok-embed"

export function FeedSection() {
  return (
    <section className="pb-14 md:pb-20 bg-background">
      <div className="mx-auto max-w-4xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SubstackEmbed />
          <TikTokEmbed />
        </div>
      </div>
    </section>
  )
}
