import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/lib/i18n/config";
import { isMaintenanceMode, maintenanceHtml } from "@/lib/maintenance";

/**
 * Locale routing: /ar/... is served as-is, English stays at unprefixed URLs by rewriting them to
 * the internal /en segment, and explicit /en/... URLs redirect to their unprefixed form.
 * While MAINTENANCE_MODE=true (lib/maintenance.ts) every page request gets the maintenance page instead.
 */
export function proxy(request: NextRequest) {
  if (isMaintenanceMode()) {
    return new NextResponse(maintenanceHtml(), {
      status: 503,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Retry-After": "3600",
        "Cache-Control": "no-store",
        "X-Robots-Tag": "noindex, nofollow",
      },
    });
  }

  const { pathname } = request.nextUrl;
  const segment = pathname.split("/")[1];

  if (segment === defaultLocale) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(defaultLocale.length + 1) || "/";
    return NextResponse.redirect(url);
  }
  if ((locales as readonly string[]).includes(segment)) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip Next internals, API routes and files with an extension (public assets, favicon).
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
