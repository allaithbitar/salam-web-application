import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

const PageHeader = ({
  title,
  subtitle,
  children,
  className,
}: {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  className?: string;
}) => {
  return (
    <header className={cn("flex flex-col my-4", className)}>
      <h1 className="text-3xl text-primary font-semibold">{title}</h1>
      {subtitle && <h2 className="text-gray-500">{subtitle}</h2>}
      {children}
    </header>
  );
};

export default PageHeader;
