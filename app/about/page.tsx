import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About | SE Witschorke",
  description: "Learn about SE Witschorke - author, foodie, and traveler. Read her bio, see her awards, and explore her passions.",
}

const awards = [
  {
    year: "2010",
    title: "Writers' League of Texas Middle Grade Manuscript Contest Winner",
    work: "The R.U.I.N.S. at Fiddlefern",
  },
  {
    year: "2017",
    title: "Writers' League of Texas Middle Grade Manuscript Contest Winner",
    work: "Looking for Stardust",
  },
  {
    year: "2021",
    title: "Writers' League of Texas Young Adult Manuscript Contest Winner",
    work: "Queens and Kings",
  },
]

export default function AboutPage() {
  return (
    <>
      {/* Bio Section */}
      <section className="py-14 md:py-20 bg-background">
        <div className="mx-auto max-w-4xl px-6">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12">
            {/* Bio Text */}
            <div className="flex-1 order-2 md:order-1">
              <div className="prose prose-sm max-w-none text-foreground font-serif leading-relaxed">
                <p>
                  SE doesn&apos;t remember a time when she couldn&apos;t read and spent many
                  hours perusing the local library&apos;s shelves. Starting at a young age, she
                  made up her own stories, mostly those with a romantic nature or
                  about law enforcing women. But it wasn&apos;t until February 14, 2008 that
                  she fell in love with writing while at a teacher&apos;s training. As a result, SE
                  began writing for the middle grade and young adult market.
                </p>
                <p className="mt-4">
                  In 2010, SE won the Writer&apos;s League of Texas Middle Grade manuscript
                  contest. She won the same contest in 2017. She is a current member
                  of The Society of Children&apos;s Book Writers and Illustrators.
                </p>
                <p className="mt-4">
                  SE was born in Neligh, Nebraska, but her family moved to Texas when
                  she was a toddler. She grew up in central Texas and then attended
                  Texas Lutheran University where she earned a BA degree in
                  Elementary Education.
                </p>
                <p className="mt-4">
                  Fond of a Bohemian lifestyle, SE lived briefly in Maine, Montreal,
                  Boston, and Vermont, and identifies as a New Yorker in spirit but no
                  matter how far away she roams, she calls Austin, TX home. She is still
                  an avid reader but these days frequents the local book store. SE is a
                  foodie, both with eating at home and dining out, and can be found
                  attending musical theater or catching a New York Yankees game
                  when she&apos;s not writing.
                </p>
              </div>
            </div>

            {/* Author Photo */}
            <div className="order-1 md:order-2 shrink-0">
              <div className="relative w-48 h-56 md:w-56 md:h-64 mx-auto md:mx-0 rounded overflow-hidden shadow-md">
                <Image
                  src="/images/author-portrait.jpg"
                  alt="SE Witschorke"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-14 md:py-16 bg-muted">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-2xl md:text-3xl font-sans font-bold tracking-wider uppercase text-foreground mb-8">
            Awards
          </h2>
          <ul className="space-y-4">
            {awards.map((award) => (
              <li key={award.year + award.work} className="text-sm md:text-base font-serif text-foreground leading-relaxed">
                <span className="font-sans font-semibold text-primary">{award.year}</span>
                {" - "}
                {award.title}
                {" - "}
                <em>{award.work}</em>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Travel / Food Photos */}
      <section className="py-14 md:py-16 bg-background">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-center font-serif italic text-2xl md:text-3xl text-foreground mb-8">
            Foodie Adventures
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="relative aspect-square rounded overflow-hidden shadow-sm">
              <Image
                src="/images/about-food-1.jpg"
                alt="Chocolate raspberry macarons"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="relative aspect-square rounded overflow-hidden shadow-sm">
              <Image
                src="/images/about-food-2.jpg"
                alt="Artisan pastries"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="relative aspect-square rounded overflow-hidden shadow-sm col-span-2 md:col-span-1">
              <Image
                src="/images/gallery-food-1.jpg"
                alt="French macarons"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
