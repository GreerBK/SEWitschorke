import Image from "next/image"
import siteData from "@/content/site.json"

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Hero Background Image */}
      <div className="relative h-[420px] md:h-[520px]">
        <Image
          src={siteData.heroImage}
          alt="Scenic waterfront view"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-teal-dark/30" />

        {/* Author Portrait + Quote */}
        <div className="absolute inset-0 flex items-end">
          <div className="relative flex items-end w-full max-w-4xl mx-auto px-6 pb-8">
            {/* Author Image */}
            <div className="relative w-40 h-52 md:w-52 md:h-64 shrink-0 rounded overflow-hidden shadow-lg border-2 border-card">
              <Image
                src={siteData.authorImage}
                alt={`${siteData.title}, Author`}
                fill
                className="object-cover"
              />
            </div>

            {/* Quote */}
            <div className="ml-6 md:ml-10 pb-2 text-primary-foreground">
              <span className="text-4xl md:text-5xl font-serif leading-none text-sage-light">&ldquo;</span>
              <blockquote className="font-serif italic text-base md:text-lg text-primary-foreground/90 max-w-md leading-relaxed -mt-4 ml-2">
                {siteData.heroQuote}
              </blockquote>
              {siteData.heroQuoteAttribution && (
                <p className="ml-2 mt-2 text-sm text-sage-light italic">
                  — {siteData.heroQuoteAttribution}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
