import Image from "next/image"
import Link from "next/link"

const books = [
  { title: "The R.U.I.N.S. at Fiddlefern", image: "/images/book-1.jpg", href: "/books" },
  { title: "Looking for Stardust", image: "/images/book-2.jpg", href: "/books" },
  { title: "Queens and Kings", image: "/images/book-3.jpg", href: "/books" },
]

export function LatestWorks() {
  return (
    <section className="py-14 md:py-20 bg-background">
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="text-center font-serif italic text-3xl md:text-4xl text-foreground mb-10">
          Latest Works
        </h2>

        <div className="flex flex-wrap items-start justify-center gap-8 md:gap-12">
          {books.map((book) => (
            <Link
              key={book.title}
              href={book.href}
              className="group flex flex-col items-center text-center w-36 md:w-40"
            >
              <div className="relative w-28 h-40 md:w-32 md:h-44 shadow-md transition-transform group-hover:scale-105">
                <Image
                  src={book.image}
                  alt={`Cover of ${book.title}`}
                  fill
                  className="object-cover rounded-sm"
                />
              </div>
              <p className="mt-3 text-xs md:text-sm font-sans text-foreground group-hover:text-primary transition-colors leading-snug">
                {book.title}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
