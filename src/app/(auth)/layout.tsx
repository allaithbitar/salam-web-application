import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";

export const metadata: Metadata = {
  title: "تسجيل الدخول",
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
    <html lang="en" className={defaultFont.className}>
      <body>
        <div className="w-dvw h-dvh grid place-items-center">{children}</div>
      </body>
    </html>
  );
}
