import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname

  // Define public paths that don't require authentication
  const isPublicPath =
    path === "/signin" ||
    path === "/signup" ||
    path === "/" ||
    path.startsWith("/products") ||
    path.startsWith("/_next") ||
    path.includes("/api/") ||
    path.includes(".png") ||
    path.includes(".jpg") ||
    path.includes(".svg") ||
    path.includes(".ico")

  // Define protected paths that require authentication
  const isProtectedPath =
    path === "/cart" ||
    path === "/checkout" ||
    path === "/dashboard" ||
    path.startsWith("/dashboard/") ||
    path === "/order-confirmation" ||
    path.startsWith("/order-confirmation/")

  // Check if user is authenticated (has a user cookie)
  const isAuthenticated = request.cookies.has("user")

  // Redirect unauthenticated users to signin page when trying to access protected routes
  if (!isAuthenticated && isProtectedPath) {
    // Store the original URL to redirect back after login
    const url = new URL("/signin", request.url)
    url.searchParams.set("callbackUrl", request.nextUrl.pathname)
    return NextResponse.redirect(url)
  }

  // Redirect authenticated users away from auth pages
  if (isAuthenticated && (path === "/signin" || path === "/signup")) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  // Allow the request to continue
  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}

