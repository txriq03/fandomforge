import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Torus from "next/font/local";
import "./globals.css";
import Providers from "@/providers/Providers";
import NavWrapper from "@/Components/navigation/NavWrapper";
import Topbar from "@/Components/navigation/Topbar";

const torus = Torus({
  src: "./fonts/torus/Torus-Regular.otf",
  variable: "--font-torus",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "FandomForge",
  description: "Where fan knowledge is forged and tested.",
  authors: [{ name: "Tariq", url: "https://github.com/txriq03" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`bg-background ${torus.variable}`}>
      <body className={`antialiased  ${geistSans.variable}`}>
        <Providers>
          <NavWrapper>
            <div className="space-y-4">
              <Topbar />
              {children}
            </div>
          </NavWrapper>
        </Providers>
      </body>
    </html>
  );
}
