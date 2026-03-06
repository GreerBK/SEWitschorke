import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Hero Background Image */}
      <div className="relative h-[420px] md:h-[520px]">
        <Image
          src="/images/hero-waterfront.jpg"
          alt="Scenic waterfront view"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay for legibility */}
        <div className="absolute inset-0 bg-teal-dark/25" />

        {/* Author bottom-left, quote bottom-right */}
        <div className="absolute inset-0">
          {/* Author — bigger, slightly inset from bottom-left */}
          <div className="absolute bottom-0 left-4 md:left-6">
            <div className="relative w-48 h-64 sm:w-56 sm:h-72 md:w-64 md:h-80 lg:w-72 lg:h-96">
              <Image
                src="/images/about/author-portrait-home.png"
                alt="SE Witschorke, Author"
                fill
                className="object-cover object-bottom drop-shadow-2xl"
                priority
              />
            </div>
            <p className="mt-2 text-[10px] sm:text-xs text-primary-foreground/90 drop-shadow-md">
              Headshot by{" "}
              <a
                href="https://www.jdswiger.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2"
              >
                JD Swiger
              </a>
            </p>
          </div>

          {/* Quote — pushed toward bottom-right */}
          <div className="absolute bottom-6 right-4 md:bottom-10 md:right-10 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg text-right text-primary-foreground">
            <span className="block text-5xl md:text-6xl lg:text-7xl font-serif leading-none text-sage-light select-none mb-2">
              &ldquo;
            </span>
            <blockquote className="font-serif italic text-base md:text-lg lg:text-xl text-primary-foreground/95 leading-relaxed">
              Stories live in the spaces between the places we go and the people we meet.
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  )
}
