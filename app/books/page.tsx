import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Books | SE Witschorke",
  description: "Browse the books by SE Witschorke - middle grade and young adult fiction.",
}

const books = [
  {
    title: "BOOK TITLE",
    image: "/images/book-1.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    year: "2010",
    category: "Middle Grade",
  },
  {
    title: "BOOK TITLE",
    image: "/images/book-2.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    year: "2017",
    category: "Middle Grade",
  },
  {
    title: "BOOK TITLE",
    image: "/images/book-3.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    year: "2021",
    category: "Young Adult",
  },
]

export default function BooksPage() {
  return (
    <>
      {/* Teal header band */}
      <section className="bg-teal-dark py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="font-sans text-[10px] md:text-xs tracking-[0.3em] uppercase text-sage-light/60 mb-3">
            Bibliography
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-primary-foreground">
            Books
          </h2>
          <p className="text-sage-light/70 text-sm font-serif mt-3">
            A selection of works by SE Witschorke
          </p>
          <div className="mt-4 mx-auto w-12 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
        </div>
      </section>

      {/* Book listing — sage-tinted background */}
      <section className="py-14 md:py-20 bg-sage-light/20">
        <div className="mx-auto max-w-3xl px-6">
          {/* Decorative top border */}
          <div className="h-[2px] bg-teal-dark mb-1" />
          <div className="h-px bg-teal-dark/30 mb-10" />

          {/* Book List */}
          <div className="space-y-0">
            {books.map((book, index) => {
              const imageLeft = index % 2 === 0
              return (
                <div key={book.image}>
                  <article className={`flex gap-6 md:gap-10 py-10 flex-col ${imageLeft ? "md:flex-row" : "md:flex-row-reverse"}`}>
                    {/* Book Cover */}
                    <div className="shrink-0">
                      <div className="relative w-28 h-40 md:w-32 md:h-44 shadow-lg rounded-sm overflow-hidden transition-transform duration-500 hover:-translate-y-1 hover:shadow-xl">
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
                        <h3 className="font-display text-2xl md:text-3xl text-foreground">
                          {book.title}
                        </h3>
                        <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-primary-foreground bg-teal-dark px-2 py-0.5 rounded-sm">
                          {book.category}
                        </span>
                      </div>
                      <p className="mt-4 font-serif text-sm md:text-base text-foreground/80 leading-relaxed">
                        {book.description}
                      </p>
                      <p className="mt-3 font-sans text-xs tracking-wider text-muted-foreground">
                        {book.year}
                      </p>
                    </div>
                  </article>

                  {/* Divider */}
                  {index < books.length - 1 && (
                    <div className="h-px bg-gradient-to-r from-transparent via-teal/30 to-transparent" />
                  )}
                </div>
              )
            })}
          </div>

          {/* Decorative bottom border */}
          <div className="h-px bg-teal-dark/30 mt-2" />
          <div className="h-[2px] bg-teal-dark mt-1" />
        </div>
      </section>
    </>
  )
}
