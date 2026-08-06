// proxy.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  // Your logic here
  return NextResponse.next()
}

export const config = {
  matcher: '/dashboard/:path*',
}