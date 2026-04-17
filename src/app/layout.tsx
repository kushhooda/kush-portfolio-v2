import type { Metadata } from "next";
import { Playfair_Display, Space_Mono } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
});

export const metadata: Metadata = {
  title: "CASE #2026 // KUSH HOODA",
  description: "TOP SECRET // DEV_FULLSTACK PROFILE",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${spaceMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-black text-[#e5e5e5] font-mono selection:bg-red-500/30">
        <div className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
        {children}
      </body>
    </html>
  );
}
