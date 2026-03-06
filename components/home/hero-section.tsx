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

        {/* Mobile layout: quote above, portrait flush at bottom */}
        <div className="absolute inset-0 flex flex-col items-center justify-end px-6 sm:hidden">
          {/* Quote — positioned above the portrait */}
          <div className="text-center mb-5">
            <span className="block text-4xl font-serif leading-none text-sage-light select-none mb-1">
              &ldquo;
            </span>
            <blockquote className="font-serif italic text-base text-primary-foreground leading-relaxed max-w-[300px] drop-shadow-md">
              Stories live in the spaces between the places we go and the people we meet.
            </blockquote>
          </div>

          {/* Author portrait — flush at bottom */}
          <div className="relative w-44 h-60 shrink-0">
            <Image
              src="/images/about/author-portrait-home.png"
              alt="SE Witschorke, Author"
              fill
              className="object-cover object-bottom drop-shadow-2xl"
              priority
            />
            <p className="absolute bottom-1 left-1 text-[10px] text-primary-foreground/80 drop-shadow-md">
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
              {/* Credit overlaid on bottom of portrait so it doesn't push it down */}
              <p className="absolute bottom-1 left-1 text-[10px] text-primary-foreground/80 drop-shadow-md">
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
