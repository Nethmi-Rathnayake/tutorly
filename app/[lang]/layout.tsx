import type { Metadata } from "next";
import { Aclonica, IBM_Plex_Sans_Arabic, Inter, Plus_Jakarta_Sans } from "next/font/google";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { siteConfig } from "@/lib/constants/site";
import { localeDir, locales } from "@/lib/i18n/config";
import { getT } from "@/lib/i18n/server";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const aclonica = Aclonica({
  variable: "--font-brand",
  subsets: ["latin"],
  weight: "400",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

// Arabic glyphs fall back to this face (see --font-sans); it only downloads when Arabic text renders.
const plexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  preload: false,
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const dynamicParams = false;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return {
    title: {
      default: `${siteConfig.name} — ${t("Find the Right Tutor for Your Learning Journey")}`,
      template: `%s | ${siteConfig.name}`,
    },
    description: t(siteConfig.description),
  };
}

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const t = await getT();
  return (
    <html
      lang={t.locale}
      dir={localeDir(t.locale)}
      className={`${jakarta.variable} ${aclonica.variable} ${inter.variable} ${plexArabic.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only z-[100] rounded-full bg-brand-700 px-4 py-2 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:start-4 focus:top-4"
        >
          {t("Skip to content")}
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
