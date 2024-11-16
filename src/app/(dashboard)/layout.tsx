import type { Metadata } from "next";
import Link from "next/link";
import { CircleUser, Menu, NewspaperIcon, UsersIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import "../globals.css";
import ReactQueryProvider from "@/lib/react-query/react-query";
import { Toaster } from "@/components/ui/toaster";
import localFont from "next/font/local";
import DirectionProvider from "@/lib/direction-provider/direction-provider";
import Sidebar from "./_components/sidebar.component";

export const metadata: Metadata = {
  title: "لوحة التحكم - سلام",
};

// Font files can be colocated inside of `pages`
// const myFont = localFont({
//   src: "../fonts/default_font.ttf",
//   variable: "--font-default",
// });

const defaultFont = localFont({
  src: "../fonts/default_font.ttf",
  variable: "--font-default",
});

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${defaultFont.className} bg-primary/5`}>
        <DirectionProvider>
          <ReactQueryProvider>
            <div className="flex h-screen w-full">
              <div className="hidden border-r md:block md:w-[300px]">
                <div className="flex h-full max-h-screen flex-col gap-2">
                  <div className="flex-1">
                    <Sidebar />
                  </div>
                </div>
              </div>
              <div className="flex flex-col  h-full flex-1">
                <header className="flex h-14 items-center gap-4 border-b  px-2 lg:h-[60px] bg-primary m-2 rounded-lg">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild className="ms-auto">
                      <Button size="icon" className="rounded-full">
                        <CircleUser className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>حسابي</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <Link href="/dashboard/members/me">
                        <DropdownMenuItem>تعديل</DropdownMenuItem>
                      </Link>
                      <DropdownMenuItem>تسجيل الخروج</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <Sheet>
                    <SheetTrigger asChild>
                      <Button size="icon" className="shrink-0 md:hidden">
                        <Menu className="h-5 w-5" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="flex flex-col">
                      <nav className="grid gap-2 text-lg mt-6">
                        {/* {links.map((l) => ( */}
                        {/*   <Link */}
                        {/*     key={l.href} */}
                        {/*     href={l.href} */}
                        {/*     className={cn( */}
                        {/*       "flex items-center gap-2 rounded-lg  px-3 py-2  transition-all hover:text-primary", */}
                        {/*       l.isSelected && */}
                        {/*         "bg-primary text-primary-foreground", */}
                        {/*     )} */}
                        {/*   > */}
                        {/*     <l.icon /> */}
                        {/*     {l.label} */}
                        {/*   </Link> */}
                        {/* ))} */}
                      </nav>

                      {/* <nav className="grid gap-2 text-lg font-medium"> */}
                      {/*   <Link */}
                      {/*     href="#" */}
                      {/*     className="flex items-center gap-2 text-lg font-semibold" */}
                      {/*   > */}
                      {/*     <Package2 className="h-6 w-6" /> */}
                      {/*     <span className="sr-only">Acme Inc</span> */}
                      {/*   </Link> */}
                      {/*   <Link */}
                      {/*     href="#" */}
                      {/*     className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground" */}
                      {/*   > */}
                      {/*     <Home className="h-5 w-5" /> */}
                      {/*     Dashboard */}
                      {/*   </Link> */}
                      {/*   <Link */}
                      {/*     href="#" */}
                      {/*     className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground" */}
                      {/*   > */}
                      {/*     <ShoppingCart className="h-5 w-5" /> */}
                      {/*     Orders */}
                      {/*   </Link> */}
                      {/*   <Link */}
                      {/*     href="#" */}
                      {/*     className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground" */}
                      {/*   > */}
                      {/*     <Package className="h-5 w-5" /> */}
                      {/*     Products */}
                      {/*   </Link> */}
                      {/*   <Link */}
                      {/*     href="#" */}
                      {/*     className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground" */}
                      {/*   > */}
                      {/*     <Users className="h-5 w-5" /> */}
                      {/*     Customers */}
                      {/*   </Link> */}
                      {/*   <Link */}
                      {/*     href="#" */}
                      {/*     className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground" */}
                      {/*   > */}
                      {/*     <LineChart className="h-5 w-5" /> */}
                      {/*     Analytics */}
                      {/*   </Link> */}
                      {/* </nav> */}
                    </SheetContent>
                  </Sheet>
                </header>
                <main className="flex flex-col gap-4 lg:gap-6 px-2 h-full overflow-auto relative">
                  {children}
                </main>
              </div>
            </div>
          </ReactQueryProvider>
          <Toaster />
        </DirectionProvider>
      </body>
    </html>
  );
}
