import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Hero Background Image */}
      <div className="relative h-[520px] sm:h-[480px] md:h-[520px]">
        <Image
          src="/images/hero-waterfront.jpg"
          alt="Scenic waterfront view"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay for legibility */}
        <div className="absolute inset-0 bg-teal-dark/30" />

        {/* Mobile layout: centered stack — portrait above, quote below */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-8 px-6 sm:hidden">
          <div className="relative w-44 h-60 mb-4 shrink-0">
            <Image
              src="/images/about/author-portrait-home.png"
              alt="SE Witschorke, Author"
              fill
              className="object-cover object-bottom drop-shadow-2xl"
              priority
            />
          </div>
          <blockquote className="font-serif italic text-sm text-primary-foreground/95 leading-relaxed text-center max-w-[280px]">
            &ldquo;Stories live in the spaces between the places we go and the people we meet.&rdquo;
          </blockquote>
          <p className="mt-3 text-[10px] text-primary-foreground/80 drop-shadow-md">
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

        {/* Desktop layout: portrait left, quote right */}
        <div className="absolute inset-0 hidden sm:block">
          <div className="absolute bottom-0 left-6 md:left-10">
            <div className="relative w-52 h-72 md:w-64 md:h-80 lg:w-72 lg:h-96">
              <Image
                src="/images/about/author-portrait-home.png"
                alt="SE Witschorke, Author"
                fill
                className="object-cover object-bottom drop-shadow-2xl"
                priority
              />
            </div>
            <p className="mt-2 text-xs text-primary-foreground/90 drop-shadow-md">
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
          <div className="absolute bottom-10 right-6 md:right-10 max-w-sm md:max-w-md lg:max-w-lg text-right text-primary-foreground">
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
