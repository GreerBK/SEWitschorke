import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Books | SE Witschorke",
  description: "Browse the books by SE Witschorke - middle grade and young adult fiction.",
}

const books = [
  {
    title: "The R.U.I.N.S. at Fiddlefern",
    image: "/images/book-1.jpg",
    description:
      "When twelve-year-old Macy discovers a hidden map inside an old library book, she and her best friend venture into the mysterious ruins behind Fiddlefern Farm. What they uncover is a secret that has been buried for over a century \u2014 one that will change everything they thought they knew about their small town.",
    year: "2010",
    category: "Middle Grade",
  },
  {
    title: "Looking for Stardust",
    image: "/images/book-2.jpg",
    description:
      "Thirteen-year-old Ellie has always believed the universe holds answers to life\u2019s biggest questions. After her grandmother passes away, Ellie embarks on a journey guided by a series of handwritten letters, each one leading her closer to understanding what her grandmother meant by \u201Clooking for stardust.\u201D",
    year: "2017",
    category: "Middle Grade",
  },
  {
    title: "Queens and Kings",
    image: "/images/book-3.jpg",
    description:
      "In a world where power is inherited and loyalty is tested, sixteen-year-old Ava must navigate the treacherous politics of a crumbling kingdom. When an ancient prophecy names her as the one who will restore balance, Ava must decide whether to accept her destiny or forge a new path entirely.",
    year: "2021",
    category: "Young Adult",
  },
]

export default function BooksPage() {
  return (
    <section className="py-14 md:py-20 bg-background">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="text-center font-serif italic text-3xl md:text-4xl text-foreground mb-4">
          Books
        </h2>
        <p className="text-center text-muted-foreground text-sm font-serif mb-12">
          A selection of works by SE Witschorke
        </p>

        {/* Menu-style divider top */}
        <div className="border-t-2 border-teal-dark mb-2" />
        <div className="border-t border-teal-dark/40 mb-10" />

        {/* Book List */}
        <div className="space-y-0">
          {books.map((book, index) => (
            <div key={book.title}>
              <article className="flex gap-6 md:gap-8 py-8">
                {/* Book Cover */}
                <div className="shrink-0">
                  <div className="relative w-24 h-36 md:w-28 md:h-40 shadow-md">
                    <Image
                      src={book.image}
                      alt={`Cover of ${book.title}`}
                      fill
                      className="object-cover rounded-sm"
                    />
                  </div>
                </div>

                {/* Book Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <h3 className="text-xl md:text-2xl font-sans font-bold text-foreground">
                      {book.title}
                    </h3>
                    <span className="text-xs text-muted-foreground font-sans tracking-wider uppercase">
                      {book.category}
                    </span>
                  </div>
                  <p className="mt-3 font-serif text-sm md:text-base text-foreground leading-relaxed">
                    {book.description}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground font-sans">
                    {book.year}
                  </p>
                </div>
              </article>

              {/* Menu-style divider */}
              {index < books.length - 1 && (
                <div className="border-t border-border" />
              )}
            </div>
          ))}
        </div>

        {/* Menu-style divider bottom */}
        <div className="border-t border-teal-dark/40 mt-2" />
        <div className="border-t-2 border-teal-dark mt-2" />
      </div>
    </section>
  )
}
