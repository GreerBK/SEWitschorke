export function FeedSection() {
  return (
    <section className="pb-14 md:pb-20 bg-background">
      <div className="mx-auto max-w-4xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Substack Feed */}
          <div className="bg-muted rounded-md p-8 text-center">
            <h3 className="font-serif italic text-lg text-foreground mb-2">
              Substack Feed
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Follow along for essays on writing, travel stories, and foodie adventures.
            </p>
            <a
              href="#"
              className="inline-block mt-4 text-sm text-primary hover:text-teal-dark transition-colors underline underline-offset-4"
            >
              Read on Substack
            </a>
          </div>

          {/* Social Media Feed */}
          <div className="bg-muted rounded-md p-8 text-center">
            <h3 className="font-serif italic text-lg text-foreground mb-2">
              Social Media Feed
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              See the latest photos and updates from travels, meals, and book events.
            </p>
            <a
              href="#"
              className="inline-block mt-4 text-sm text-primary hover:text-teal-dark transition-colors underline underline-offset-4"
            >
              Follow on Instagram
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
