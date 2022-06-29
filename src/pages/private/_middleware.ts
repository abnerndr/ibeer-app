import { NextResponse } from 'next/server'
import type { NextFetchEvent, NextRequest } from 'next/server'

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  if (!req.cookies['astro.token'] && req.url !== '/public/authentication/login') {
    const { pathname, origin } = req.nextUrl
    return NextResponse.redirect(`${origin}/public/authentication/login`)
  }
 // if (
   // req.cookies['albert.subscription'] &&
   // !JSON.parse(req.cookies['albert.subscription'])?.is_term_accepted &&
   // req.url.indexOf('/private/terms') === -1
 // ) {
   // return NextResponse.redirect('/private/terms')
 // }
  return NextResponse.next()
}