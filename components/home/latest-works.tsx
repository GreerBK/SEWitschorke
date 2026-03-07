import Image from "next/image"
import Link from "next/link"

const books = [
  { title: "BOOK TITLE", image: "/images/book-1.jpg", href: "/books" },
  { title: "BOOK TITLE", image: "/images/book-2.jpg", href: "/books" },
  { title: "BOOK TITLE", image: "/images/book-3.jpg", href: "/books" },
]

export function LatestWorks() {
  return (
    <section className="py-16 md:py-24 bg-background relative">
      <div className="mx-auto max-w-5xl px-6">
        {/* Section header with decorative elements */}
        <div className="text-center mb-12 md:mb-16">
          <p className="font-sans text-[10px] md:text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">
            Explore
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground">
            Latest Works
          </h2>
          {/* Decorative gold rule */}
          <div className="mt-4 mx-auto w-12 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
        </div>

        {/* Book grid — larger covers with hover effects */}
        <div className="flex flex-wrap items-start justify-center gap-10 md:gap-16">
          {books.map((book, idx) => (
            <Link
              key={book.image}
              href={book.href}
              className="group flex flex-col items-center text-center"
              style={{ animationDelay: `${idx * 0.15}s` }}
            >
              <div className="relative w-32 h-48 md:w-40 md:h-56 lg:w-44 lg:h-60 shadow-lg transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2 rounded-sm overflow-hidden">
                <Image
                  src={book.image}
                  alt={`Cover of ${book.title}`}
                  fill
                  className="object-cover rounded-sm"
                />
                {/* Subtle shine effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/10 group-hover:to-transparent transition-all duration-500" />
              </div>
              <p className="mt-4 text-xs md:text-sm font-sans tracking-[0.1em] uppercase text-muted-foreground group-hover:text-primary transition-colors duration-300">
                {book.title}
              </p>
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
