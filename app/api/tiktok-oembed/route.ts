export const dynamic = "force-static"

import { NextResponse } from "next/server"

const TIKTOK_PROFILE_URL = "https://www.tiktok.com/@sweetnsavory61"
const OEMBED_URL = `https://www.tiktok.com/oembed?url=${encodeURIComponent(TIKTOK_PROFILE_URL)}`

export async function GET() {
  try {
    const res = await fetch(OEMBED_URL, { next: { revalidate: 3600 } })
    if (!res.ok) throw new Error("TikTok oEmbed failed")
    const data = await res.json()
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: "Failed to load TikTok embed" }, { status: 502 })
  }
}
