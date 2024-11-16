import Link from "next/link";
import React from "react";
import AppFigure from "../shared/app-figure.component";

const Navbar = () => {
  const links = [
    {
      label: "الرئيسية",
      href: "/",
    },
    {
      label: "المقالات",
      href: "/articles",
    },
    {
      label: "الاسئلة الشائعة",
      href: "/faqs",
    },
    {
      label: "إسأل سلام",
      href: "/ask-salam",
    },

    // {
    //   label: "من نحن",
    //   href: "/about-us",
    // },
    {
      label: "انضم لنا",
      href: "/join-us",
    },
  ];
  return (
    <header className="overflow-hidden">
      <div className="bg-primary text-primary-foreground px-2 lg:px-0">
        <div className=" py-2 flex items-center container mx-auto gap-3">
          <AppFigure />
          <nav className="flex gap-2 justify-center ms-auto">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="hover:bg-primary-foreground hover:text-primary p-2 rounded-lg transition text-center min-w-16"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
