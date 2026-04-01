import Image from "next/image"
import Link from "next/link"
import { getBooks } from "@/lib/books"

export function LatestWorks() {
  const books = getBooks().filter((book) => book.featured)

  return (
    <section className="py-16 md:py-24 bg-background relative">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-display text-4xl md:text-5xl text-foreground">
            Cooking up tasty books
          </h2>
        </div>

        {/* Book grid — larger covers with hover effects */}
          <div className="flex flex-wrap items-start justify-center gap-10 md:gap-16">
          {books.map((book, idx) => (
            <Link
              key={book.image}
              href={book.href || "/books"}
              className="group inline-flex"
              style={{ animationDelay: `${idx * 0.15}s` }}
            >
              <div className="relative w-32 h-48 md:w-40 md:h-56 lg:w-44 lg:h-60 shadow-lg transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2 rounded-sm overflow-hidden">
                <Image
                  src={book.image}
                  alt={`Cover of ${book.title}`}
                  fill
                  className="object-cover rounded-sm"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/10 group-hover:to-transparent transition-all duration-500" />
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            href="/books"
            className="inline-block font-sans text-xs tracking-[0.2em] uppercase text-primary border-b border-primary/30 pb-1 hover:border-primary transition-colors duration-300"
          >
            View all books
          </Link>
        </div>
      </div>
    </section>
  )
}
