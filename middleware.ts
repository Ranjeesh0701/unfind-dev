import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/users")) {
    return NextResponse.redirect(new URL("/feed", request.url));
  }

  return NextResponse.next();
}
