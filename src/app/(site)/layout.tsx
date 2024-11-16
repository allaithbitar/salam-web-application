import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import Navbar from "@/components/navbar/navbar.component";
import ReactQueryProvider from "@/lib/react-query/react-query";
import DirectionProvider from "@/lib/direction-provider/direction-provider";

export const metadata: Metadata = {
  title: "سلام",
  description: "مبادرة سلام",
};

// Font files can be colocated inside of `pages`
const defaultFont = localFont({
  src: "../fonts/default_font.ttf",
  variable: "--font-default",
});

export default async function SiteRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="rtl"
      className={`${defaultFont.className} antialiased`}
    >
      <body className="flex flex-col gap-4 bg-primary/5">
        <Navbar />
        <ReactQueryProvider>
          <DirectionProvider>
            <main className="container mx-auto px-4 2xl:px-0">{children}</main>
          </DirectionProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
