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
          {books.map((book, index) => {
            const imageLeft = index % 2 === 0
            return (
              <div key={book.image}>
                <article className={`flex gap-6 md:gap-8 py-8 flex-col ${imageLeft ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  {/* Book Cover — alternates left/right */}
                  <div className="shrink-0">
                    <div className="relative w-24 h-36 md:w-28 md:h-40 shadow-md rounded-sm bg-gold/90 overflow-hidden">
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
            )
          })}
        </div>

        {/* Menu-style divider bottom */}
        <div className="border-t border-teal-dark/40 mt-2" />
        <div className="border-t-2 border-teal-dark mt-2" />
      </div>
    </section>
  )
}
