import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('token')?.value
  const isAuthenticated = !!token

  // Public-only routes (accessible without a token)
  const guestOnlyRoutes = ['/signin', '/signup']

  // Fully public routes (anyone can visit, no redirect either way)
  const publicRoutes = [
    '/home',
    '/about',
    '/contact',
    '/pricing',
    '/features',
    '/blog',
    '/docs',
    '/careers',
    '/terms',
    "/test",
    '/privacy',
    '/cookie-policy',
    // '/login',
    //  '/signup'
    
  ]

  const isPublicRoute = publicRoutes.some(
    route => pathname === route || pathname.startsWith(route + '/')
  )
  const isGuestOnlyRoute = guestOnlyRoutes.includes(pathname)

  // ROOT `/`: dashboard if authenticated, otherwise send to /home
  if (pathname === '/') {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/home', request.url))
    }
    return NextResponse.next() // authenticated → show dashboard
  }

  // GUEST-ONLY (login/signup): if already authenticated, go to dashboard
  if (isGuestOnlyRoute && isAuthenticated) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // PROTECTED ROUTES: not public and not authenticated
  if (!isPublicRoute && !isGuestOnlyRoute && !isAuthenticated) {
    const homeUrl = new URL('/home', request.url)
    homeUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(homeUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}