// middleware.ts
import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const url = req.nextUrl
  const path = url.pathname

  // Deja pasar la página de login y los endpoints de API
  if (path === '/admin/login' || path.startsWith('/api/')) {
    return NextResponse.next()
  }

  // Protege todo lo demás bajo /admin
  if (path.startsWith('/admin')) {
    const token = req.cookies.get('ADMIN_DASH_TOKEN')?.value
    if (!token || token !== process.env.ADMIN_DASH_TOKEN) {
      url.pathname = '/admin/login'
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

// Solo corre en /admin/*
export const config = {
  matcher: ['/admin/:path*']
}
