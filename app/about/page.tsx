import Image from "next/image"
import type { Metadata } from "next"
import { getBioContent, getAwards } from "@/lib/about-content"

export const metadata: Metadata = {
  title: "About | SE Witschorke",
  description:
    "Learn about SE Witschorke - author, foodie, and traveler. Read her bio, see her awards, and explore her passions.",
}

export default function AboutPage() {
  const bio = getBioContent()
  const awards = getAwards()

  return (
    <>
      {/* Teal header band */}
      <section className="bg-teal-dark py-14 md:py-20">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <p className="font-sans text-[10px] md:text-xs tracking-[0.3em] uppercase text-sage-light/60 mb-3">
            The Author
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-primary-foreground">
            About SE
          </h2>
        </div>
      </section>

      {/* Bio Section — light sage background */}
      <section className="py-14 md:py-20 bg-sage-light/20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex flex-col md:flex-row gap-10 md:gap-16">
            {/* Bio Text */}
            <div className="flex-1 order-2 md:order-1">
              <div className="space-y-5 text-foreground font-serif text-sm md:text-base leading-relaxed">
                {bio.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Author Photo + Contact */}
            <div className="order-1 md:order-2 shrink-0 flex flex-col items-center">
              <div className="relative w-64 h-80 md:w-72 md:h-96 mx-auto rounded-sm overflow-hidden shadow-lg">
                <Image
                  src="/images/about/author-portrait-about.png"
                  alt="SE Witschorke"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
              <a
                href="mailto:sewitschorke@gmail.com"
                className="mt-8 inline-flex items-center justify-center px-8 py-3 font-sans text-xs tracking-[0.2em] uppercase text-primary-foreground bg-teal-dark rounded-sm hover:bg-primary transition-all duration-300"
              >
                Get in touch
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Awards Section — teal background */}
      <section className="py-14 md:py-20 bg-teal-dark">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center mb-10">
            <p className="font-sans text-[10px] md:text-xs tracking-[0.3em] uppercase text-sage-light/60 mb-3">
              Recognition
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-primary-foreground">
              Awards
            </h2>
          </div>

          <div className="max-w-2xl mx-auto space-y-6">
            {awards.map((award) => (
              <div key={award.year + award.work} className="flex gap-4 md:gap-6 items-baseline">
                <span className="font-sans font-bold text-xl md:text-2xl text-sage-light shrink-0 w-14 md:w-16 text-right">
                  {award.year}
                </span>
                <div className="flex-1 border-l border-sage-light/20 pl-4 md:pl-6">
                  <p className="font-serif text-sm md:text-base text-primary-foreground/90 leading-relaxed">
                    {award.title}
                  </p>
                  <p className="font-serif italic text-sm text-sage-light/70 mt-1">
                    {award.work}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Grid — sage background */}
      <section className="py-14 md:py-20 bg-sage-light/20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center mb-10">
            <p className="font-sans text-[10px] md:text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">
              Life &amp; Adventures
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground">
              Snapshots
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            <div className="relative aspect-square rounded-sm overflow-hidden shadow-sm">
              <Image
                src="/images/about/about-1.jpg"
                alt="A close-up of a dog wearing a bandana"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="(min-width: 768px) 33vw, 50vw"
              />
            </div>
            <div className="relative aspect-square rounded-sm overflow-hidden shadow-sm">
              <Image
                src="/images/about/about-2.jpg"
                alt="Books on display in a bookstore"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="(min-width: 768px) 33vw, 50vw"
              />
            </div>
            <div className="relative aspect-square rounded-sm overflow-hidden shadow-sm col-span-2 md:col-span-1">
              <Image
                src="/images/about/about-3.jpg"
                alt="A charcuterie board with bread, fruit, and cheese"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="(min-width: 768px) 33vw, 100vw"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
