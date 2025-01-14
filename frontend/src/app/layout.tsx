import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import localFont from "next/font/local";

const montserratFont = localFont({
    src: [
      {
        path: "./fonts/Montserrat-Thin.ttf",
        weight: "100",
        style: "normal",
      },
      {
        path: "./fonts/Montserrat-ExtraLight.ttf",
        weight: "200",
        style: "normal",
      },
      {
        path: "./fonts/Montserrat-Light.ttf",
        weight: "300",
        style: "normal",
      },
      {
        path: "./fonts/Montserrat-Regular.ttf",
        weight: "400",
        style: "normal",
      },
      {
        path: "./fonts/Montserrat-Medium.ttf",
        weight: "500",
        style: "normal",
      },
      {
        path: "./fonts/Montserrat-SemiBold.ttf",
        weight: "600",
        style: "normal",
      },
      {
        path: "./fonts/Montserrat-Bold.ttf",
        weight: "700",
        style: "normal",
      },
      {
        path: "./fonts/Montserrat-ExtraBold.ttf",
        weight: "800",
        style: "normal",
      },
      {
        path: "./fonts/Montserrat-Black.ttf",
        weight: "900",
        style: "normal",
      },
    ],
    variable: "--font-montserrat",
    
});

const merriweatherFont = localFont({
    src: [
      {
        path: "./fonts/Merriweather-Light.ttf",
        weight: "300",
        style: "normal",
      },
      {
        path: "./fonts/Merriweather-Regular.ttf",
        weight: "400",
        style: "normal",
      },
      {
        path: "./fonts/Merriweather-Bold.ttf",
        weight: "700",
        style: "normal",
      },
      {
        path: "./fonts/Merriweather-Black.ttf",
        weight: "900",
        style: "normal",
      },
    ],
    variable: "--font-merriweather",
    
});
  
const montezFont = localFont({
    src: [
      {
        path: "./fonts/Montez-Regular.ttf",
        weight: "400",
        style: "normal",
      },
    ],
    variable: "--font-montez",
    
});
  
const outfitFont = localFont({
    src: [
      {
        path: "./fonts/Outfit-Thin.ttf",
        weight: "100",
        style: "normal",
      },
      {
        path: "./fonts/Outfit-Regular.ttf",
        weight: "400",
        style: "normal",
      },
      {
        path: "./fonts/Outfit-Bold.ttf",
        weight: "700",
        style: "normal",
      },
    ],
    variable: "--font-outfit",
  
});
  
const marckScriptFont = localFont({
    src: [
      {
        path: "./fonts/MarckScript-Regular.ttf",
        weight: "400",
        style: "normal",
      },
    ],
      variable: "--font-marck-script",
    display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserratFont.variable} ${merriweatherFont.variable} ${montezFont.variable} ${outfitFont.variable} ${marckScriptFont.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
