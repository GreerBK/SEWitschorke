import Image from "next/image"
import type { Metadata } from "next"
import booksData from "@/content/books.json"

export const metadata: Metadata = {
  title: "Books | SE Witschorke",
  description: "Browse the books by SE Witschorke - middle grade and young adult fiction.",
}

export default function BooksPage() {
  const books = booksData.books
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
                    <h3 className="text-xl md:text-2xl font-sans font-normal text-foreground">
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
