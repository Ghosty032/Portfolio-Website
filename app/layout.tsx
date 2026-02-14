import type { Metadata } from "next";
import localFont from "next/font/local";
import { Geist, Geist_Mono, Syne, Outfit, Plus_Jakarta_Sans, Notable, Pixelify_Sans, Stalinist_One, Iceberg } from "next/font/google";
import SmoothScroll from "./components/SmoothScroll";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

const iceberg = Iceberg({
  variable: "--font-iceberg",
  subsets: ["latin"],
  weight: "400",
});

const pixelifySans = Pixelify_Sans({
  variable: "--font-pixelify-sans",
  subsets: ["latin"],
});

const stalinistOne = Stalinist_One({
  variable: "--font-stalinist-one",
  subsets: ["latin"],
  weight: "400",
});

const notable = Notable({
  variable: "--font-notable",
  subsets: ["latin"],
  weight: "400",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const chillax = localFont({
  src: "./fonts/Chillax-Variable.woff2",
  variable: "--font-chillax",
  display: "swap",
});

const comico = localFont({
  src: "./fonts/Comico-Regular.woff2",
  variable: "--font-comico",
  display: "swap",
});


const clash = localFont({
  src: "./fonts/ClashDisplay-Variable.woff2",
  variable: "--font-clash",
  display: "swap",
});

const newTitle = localFont({
  src: "./fonts/NewTitle-Variable.woff2",
  variable: "--font-new-title",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Portfolio",
};


import CustomCursor from "./components/CustomCursor";

// ... existing imports ...

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${chillax.variable} ${comico.variable} ${clash.variable} ${newTitle.variable} ${syne.variable} ${outfit.variable} ${plusJakartaSans.variable} ${notable.variable} ${pixelifySans.variable} ${stalinistOne.variable} ${iceberg.variable} antialiased cursor-none`}
      >
        <CustomCursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
