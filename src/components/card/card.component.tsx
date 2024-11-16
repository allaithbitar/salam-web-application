import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

const Card = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("bg-white p-4 rounded-lg", className)}>{children}</div>
  );
};

export default Card;
