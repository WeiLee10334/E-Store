import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const { pathname } = req.nextUrl

  // Protect member routes
  if (pathname.startsWith("/member") && !req.auth) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  // Protect store routes
  if (pathname.startsWith("/store") && !req.auth) {
    return NextResponse.redirect(new URL("/store/login", req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/member/:path*", "/store/:path*", "/api/purchases/:path*", "/api/items/:path*"],
}
