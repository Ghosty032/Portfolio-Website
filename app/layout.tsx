import type { Metadata } from "next";
import localFont from "next/font/local";
import { Geist, Outfit, Plus_Jakarta_Sans, Pixelify_Sans, Stalinist_One } from "next/font/google";
import SmoothScroll from "./components/SmoothScroll";
import "./globals.css";



const pixelifySans = Pixelify_Sans({
  variable: "--font-pixelify-sans",
  subsets: ["latin"],
});

const stalinistOne = Stalinist_One({
  variable: "--font-stalinist-one",
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



const chillax = localFont({
  src: "./fonts/Chillax-Variable.woff2",
  variable: "--font-chillax",
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
        className={`${geistSans.variable} ${chillax.variable} ${clash.variable} ${newTitle.variable} ${outfit.variable} ${plusJakartaSans.variable} ${pixelifySans.variable} ${stalinistOne.variable} antialiased cursor-none`}
      >
        <CustomCursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
