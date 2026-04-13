import Image from "next/image"
import type { Metadata } from "next"
import { getBooks } from "@/lib/books"

export const metadata: Metadata = {
  title: "Books | SE Witschorke",
  description: "New titles from SE Witschorke — coming soon.",
}

export default function BooksPage() {
  const featured = getBooks().filter((book) => book.featured)

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="font-serif text-xl md:text-2xl text-foreground normal-case italic">
            Tasty titles coming soon!
          </h1>
        </div>

        <div className="flex flex-wrap items-start justify-center gap-10 md:gap-16">
          {featured.map((book) => (
            <div key={book.image} className="inline-flex">
              <div className="relative w-32 h-48 md:w-40 md:h-56 lg:w-44 lg:h-60 shadow-lg rounded-sm overflow-hidden">
                <Image
                  src={book.image}
                  alt={`Cover of ${book.title}`}
                  fill
                  className="object-cover rounded-sm"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
