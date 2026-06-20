import type { Metadata } from "next";
import { Geist_Mono, Inter, Manrope } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { businessConfig } from "@/config/business";
import "./globals.css";

const manrope = Manrope({
  display: "swap",
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  display: "swap",
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://doitsafehub.com"),
  title: {
    default: "DO IT SAFE HUB | Discreet Contraceptive Ecommerce",
    template: "%s | DO IT SAFE HUB",
  },
  description: businessConfig.description,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/DIS_HUB_icon.png",
  },
  openGraph: {
    title: "DO IT SAFE HUB | Discreet Contraceptive Ecommerce",
    description: businessConfig.description,
    url: "https://doitsafehub.com",
    siteName: "DO IT SAFE HUB",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/hero-product-composition.png",
        width: 1200,
        height: 630,
        alt: "Contraceptive and wellness products from DO IT SAFE HUB.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DO IT SAFE HUB | Discreet Contraceptive Ecommerce",
    description: businessConfig.description,
    images: ["/images/hero-product-composition.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={`${manrope.variable} ${inter.variable} ${geistMono.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
      lang="en"
      suppressHydrationWarning
    >
      <body className="font-body flex min-h-full flex-col">
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (sessionStorage.getItem('dis-hub-splash-seen')) {
                  document.documentElement.setAttribute('data-splash-seen', 'true');
                } else {
                  document.documentElement.setAttribute('data-splash-active', 'true');
                }
              } catch (e) {}
            `,
          }}
        />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
