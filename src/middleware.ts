import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { nextUrl, nextauth } = req;
    const { token } = nextauth;

    if (token && nextUrl.pathname.startsWith("/auth")) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // if (!token && nextUrl.pathname.startsWith("/write")) {
    //   return NextResponse.redirect(new URL("/auth/sign-in", req.url));
    // }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  },
);

export const config = {
  matcher: ["/write", "/auth/:path"],
};
