import type { Metadata } from "next";
import { Aclonica, IBM_Plex_Sans_Arabic, Inter, Plus_Jakarta_Sans } from "next/font/google";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { MotionProvider } from "@/components/ui/motion-provider";
import { ScrollAnimations } from "@/components/ui/scroll-animations";
import { siteConfig } from "@/lib/constants/site";
import { localeDir, locales } from "@/lib/i18n/config";
import { getT } from "@/lib/i18n/server";
import { absoluteUrl, jsonLdString } from "@/lib/seo";
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
  const description = t(siteConfig.description);
  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: `${siteConfig.name} — ${t("Find the Right Tutor for Your Learning Journey")}`,
      template: `%s | ${siteConfig.name}`,
    },
    description,
    applicationName: siteConfig.name,
    category: "education",
    openGraph: { type: "website", siteName: siteConfig.name, description, images: ["/og-image.jpg"] },
    twitter: { card: "summary_large_image", images: ["/og-image.jpg"] },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    },
    // Search Console / Bing verification tokens come from the environment.
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
      other: process.env.BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION } : undefined,
    },
  };
}

// Organization + WebSite structured data (node_modules/next/dist/docs/01-app/02-guides/json-ld.md).
// Only verifiable facts from siteConfig; no ratings, review counts or credentials.
const siteJsonLd = (locale: string) => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["EducationalOrganization", "LocalBusiness"],
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
      logo: `${siteConfig.url}/logo.png`,
      image: `${siteConfig.url}/images/hero-main.jpg`,
      description: siteConfig.description,
      email: siteConfig.contact.email,
      telephone: siteConfig.contact.telephone,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Level 14, Al Saqr Business Tower, DIFC",
        addressLocality: "Dubai",
        addressCountry: "AE",
      },
      areaServed: [
        { "@type": "City", name: "Dubai" },
        { "@type": "City", name: "Abu Dhabi" },
        { "@type": "Country", name: "United Arab Emirates" },
      ],
      knowsLanguage: ["en", "ar"],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: siteConfig.contact.email,
        telephone: siteConfig.contact.telephone,
        availableLanguage: ["English", "Arabic"],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      url: absoluteUrl("/", locale === "ar" ? "ar" : "en"),
      name: siteConfig.name,
      inLanguage: locale,
      publisher: { "@id": `${siteConfig.url}/#organization` },
    },
  ],
});

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const t = await getT();
  return (
    <html
      lang={t.locale}
      dir={localeDir(t.locale)}
      className={`${jakarta.variable} ${aclonica.variable} ${inter.variable} ${plexArabic.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(siteJsonLd(t.locale)) }} />
        <a
          href="#main"
          className="sr-only z-[100] rounded-full bg-brand-700 px-4 py-2 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:start-4 focus:top-4"
        >
          {t("Skip to content")}
        </a>
        <MotionProvider>
          <SiteHeader />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter />
          <ScrollAnimations />
        </MotionProvider>
      </body>
    </html>
  );
}
