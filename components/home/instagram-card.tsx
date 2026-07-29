const INSTAGRAM_PROFILE_URL = "https://www.instagram.com/sewitschorke/"

export function InstagramCard() {
  return (
    <div className="bg-card rounded-lg p-8 md:p-10 shadow-sm border border-border/50">
      <h3 className="font-sans font-bold text-xs tracking-[0.2em] uppercase text-foreground mb-3">
        Instagram
      </h3>
      <p className="text-muted-foreground text-sm font-serif leading-relaxed mb-5">
        Photos and updates on writing, food, and travel &mdash; follow @sewitschorke.
      </p>
      <a
        href={INSTAGRAM_PROFILE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block font-sans text-xs tracking-[0.15em] uppercase text-primary border-b border-primary/30 pb-0.5 hover:border-primary transition-colors"
      >
        Follow on Instagram
      </a>
    </div>
  )
}
