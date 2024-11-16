"use client";
import { cn } from "@/lib/utils";
import {
  MessageCircleQuestionIcon,
  NewspaperIcon,
  UsersIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

type NavLink = { label: string; icon: any; href: string };

const links = [
  {
    label: "المقالات",
    href: "/dashboard/articles",
    icon: NewspaperIcon,
  },
  {
    label: "الاعضاء",
    href: "/dashboard/members",
    icon: UsersIcon,
  },
  {
    label: "الاسئلة",
    href: "/dashboard/questions",
    icon: MessageCircleQuestionIcon,
  },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-2">
      <div className="bg-primary m-2 rounded-lg grid place-items-center p-2 pt-4">
        <Image
          src="/images/salam-logo-bw.png"
          alt="navbar-bg"
          height={50}
          width={50}
        />
        <p className="text-3xl text-primary-foreground">سلام</p>
      </div>

      <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
        {links.map((l) => {
          const isSelected = pathname.startsWith(l.href);
          return (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "flex items-center gap-2 rounded-lg  px-3 py-2  transition-all hover:text-primary",
                isSelected &&
                  "bg-primary text-primary-foreground hover:text-primary-foreground",
              )}
            >
              <l.icon />
              {l.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
