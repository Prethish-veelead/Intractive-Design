import { NextResponse, type NextRequest } from "next/server";

const locales = ["th", "en"];

// Thai-first: any URL without a locale goes to the Thai version.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasLocale) return;

  request.nextUrl.pathname = `/th${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Skip Next internals and files with an extension (images, favicon, fonts).
  matcher: ["/((?!_next|.*\\..*).*)"],
};
