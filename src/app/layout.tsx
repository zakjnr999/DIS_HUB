import type { Metadata } from "next";
import { Geist_Mono, Manrope, Playfair_Display } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
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
  metadataBase: new URL("https://adi3yeservices.com"),
  title: "Adi3ye Services",
  description: businessConfig.description,
  icons: {
    icon: "/adeyie_icon.png",
    apple: "/adeyie_icon.png",
  },
  openGraph: {
    title: "Adi3ye Services",
    description: businessConfig.description,
    images: [images.hero.src],
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
        <Footer />
      </body>
    </html>
  );
}
