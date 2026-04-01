import Image from "next/image"
import { getPoemQuote } from "@/lib/home-content"

export function HeroSection() {
  const poemQuote = getPoemQuote()
  const quoteText = poemQuote?.text || "Stories live in the spaces between the places we go and the people we meet."

  return (
    <section className="relative w-full overflow-hidden">
      {/* ── Desktop: split layout ── */}
      <div className="hidden sm:grid sm:grid-cols-[280px_1fr] md:grid-cols-[320px_1fr] lg:grid-cols-[380px_1fr] min-h-[520px] md:min-h-[560px] relative">
        <Image
          src="/images/hero-waterfront.jpg"
          alt="Scenic waterfront view"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-teal-dark/60 via-teal-dark/20 to-teal-dark/5" />

        {/* Left panel — solid teal with symmetrical top arch, inset from left/bottom */}
        <div className="relative z-10 h-full min-h-0 flex flex-col justify-end pl-4 pb-4 md:pl-5 md:pb-5 lg:pl-6 lg:pb-6">
          <div className="relative w-full bg-teal-dark rounded-t-[132px] md:rounded-t-[150px] lg:rounded-t-[178px] flex flex-col items-center justify-end pt-2 md:pt-3">
            {/* Author portrait — flush at bottom */}
            <div className="relative w-full max-w-[260px] md:max-w-[280px] lg:max-w-[320px] aspect-[3/4] animate-fade-in">
              <Image
                src="/images/about/author-portrait-home.png"
                alt="SE Witschorke, Author"
                fill
                className="object-cover object-bottom"
                priority
              />
              <p className="absolute bottom-2 left-0 right-0 text-center text-[10px] text-sage-light/50 font-serif">
                Headshot by{" "}
                <a
                  href="https://www.jdswiger.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-sage-light/80 transition-colors"
                >
                  JD Swiger
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Right panel — waterfront photo with quote */}
        <div className="relative z-10">
          {/* Quote — bottom-right */}
          <div className="absolute bottom-10 right-8 md:right-12 lg:right-16 left-8 md:left-auto max-w-sm md:max-w-md lg:max-w-lg text-right animate-slide-in-right delay-200">
            <div className="relative pl-10 md:pl-12 lg:pl-14">
              <span className="absolute left-0 top-0 font-display text-5xl md:text-6xl lg:text-7xl text-sage-light/40 leading-none select-none -translate-y-0.5" aria-hidden>
                &ldquo;
              </span>
              <blockquote className="font-display text-xl md:text-2xl lg:text-3xl text-primary-foreground leading-snug">
                {quoteText}
              </blockquote>
            </div>
            <div className="mt-4 ml-auto w-16 h-px bg-gradient-to-l from-gold to-transparent animate-line-grow delay-500" />
          </div>
        </div>
      </div>

      {/* ── Mobile: stacked layout ── */}
      <div className="sm:hidden">
        {/* Waterfront photo with quote */}
        <div className="relative h-[340px]">
          <Image
            src="/images/hero-waterfront.jpg"
            alt="Scenic waterfront view"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-teal-dark/70 via-teal-dark/30 to-teal-dark/10" />

          {/* Quote centered */}
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-8 px-6">
            <div className="relative pl-8 max-w-[300px] text-left">
              <span className="absolute left-0 top-0 font-display text-4xl text-sage-light/50 leading-none select-none -translate-y-0.5" aria-hidden>
                &ldquo;
              </span>
              <blockquote className="font-display text-base text-primary-foreground leading-snug">
                {quoteText}
              </blockquote>
            </div>
          </div>
        </div>

        {/* Teal strip with portrait — symmetrical arch, inset from edges */}
        <div className="bg-teal-dark rounded-t-[calc(50vw_-_1rem)] mx-4 mb-4 flex flex-col items-center pt-4">
          <div className="relative w-40 h-48">
            <Image
              src="/images/about/author-portrait-home.png"
              alt="SE Witschorke, Author"
              fill
              className="object-cover object-bottom"
              priority
            />
            <p className="absolute bottom-2 left-0 right-0 text-center text-[9px] text-sage-light/50 font-serif">
              Headshot by{" "}
              <a
                href="https://www.jdswiger.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-sage-light/80 transition-colors"
              >
                JD Swiger
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
