import type { Metadata } from "next";
import { Geist_Mono, Manrope, Playfair_Display } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { QRCodeWidget } from "@/components/layout/QRCodeWidget";
import { businessConfig } from "@/config/business";
import { images } from "@/config/images";
import "./globals.css";

const bodyFont = Manrope({
  display: "swap",
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const displayFont = Playfair_Display({
  display: "swap",
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fashion-web-ebon.vercel.app"),
  title: "Adi3ye Services | Professional Clothing Care & Fashion Services",
  description: businessConfig.description,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Adi3ye Services | Professional Clothing Care & Fashion Services",
    description: businessConfig.description,
    url: "https://fashion-web-ebon.vercel.app",
    siteName: "Adi3ye Services",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://fashion-web-ebon.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Adi3ye Services - Professional Clothing Care & Fashion Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Adi3ye Services | Professional Clothing Care & Fashion Services",
    description: businessConfig.description,
    images: ["https://fashion-web-ebon.vercel.app/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bodyFont.variable} ${displayFont.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="font-body flex min-h-full flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <QRCodeWidget />
        <Footer />
      </body>
    </html>
  );
}
