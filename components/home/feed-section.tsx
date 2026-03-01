import siteData from "@/content/site.json"

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
              {siteData.substackDescription}
            </p>
            <a
              href={siteData.substackUrl}
              className="inline-block mt-4 text-sm text-primary hover:text-teal-dark transition-colors underline underline-offset-4"
            >
              {siteData.substackText}
            </a>
          </div>

          {/* Social Media Feed */}
          <div className="bg-muted rounded-md p-8 text-center">
            <h3 className="font-serif italic text-lg text-foreground mb-2">
              Social Media Feed
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {siteData.socialDescription}
            </p>
            <a
              href={siteData.socialUrl}
              className="inline-block mt-4 text-sm text-primary hover:text-teal-dark transition-colors underline underline-offset-4"
            >
              {siteData.socialText}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
