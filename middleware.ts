import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const VISITOR_COOKIE = "challenge_visitor_id";

export function middleware(request: NextRequest) {
  const res = NextResponse.next();
  if (!request.cookies.get(VISITOR_COOKIE)?.value) {
    res.cookies.set(VISITOR_COOKIE, crypto.randomUUID(), {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
  }
  return res;
}
