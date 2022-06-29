import { NextResponse } from 'next/server'
import type { NextFetchEvent, NextRequest } from 'next/server'

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  if(req.url === '/'){
      return NextResponse.redirect('/public/authentication/login')
  }
  return NextResponse.next()
}