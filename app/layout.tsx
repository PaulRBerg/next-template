import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  description: "A modern Next.js template for building production-ready web applications.",
  title: "Next.js Template",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // `suppressHydrationWarning` only silences mismatches one level deep on <html>, so it covers
    // attributes injected by browser extensions (e.g. Grammarly, dark-mode toggles) without hiding
    // hydration errors from our own components.
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        {process.env.NODE_ENV === "development" ? (
          <Script
            crossOrigin="anonymous"
            src="https://unpkg.com/react-grab/dist/index.global.js"
            strategy="lazyOnload"
          />
        ) : null}
      </body>
    </html>
  );
}
