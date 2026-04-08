import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const { pathname } = req.nextUrl

  // Protect member routes
  if (pathname.startsWith("/member") && !req.auth) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  // Protect store routes (excluding the login page itself to avoid redirect loops)
  if (
    pathname.startsWith("/store") &&
    !pathname.startsWith("/store/login") &&
    !req.auth
  ) {
    return NextResponse.redirect(new URL("/store/login", req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/member/:path*", "/store/:path*", "/api/purchases/:path*", "/api/items/:path*"],
}
