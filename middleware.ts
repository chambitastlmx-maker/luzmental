import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const url = req.nextUrl
  if (url.pathname.startsWith('/admin')) {
    const token = req.cookies.get('ADMIN_DASH_TOKEN')?.value
    if (!token || token !== process.env.ADMIN_DASH_TOKEN) {
      url.pathname = '/admin/login'
      return NextResponse.redirect(url)
    }
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
}
