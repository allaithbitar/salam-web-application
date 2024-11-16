import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

const FormSection = ({
  label,
  children,
  actionArea,
  className,
}: {
  label: string;
  children: ReactNode;
  actionArea?: ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col gap-2 w-full", className)}>
      <div className="flex justify-between items-center text-primary bg-primary/5 p-2 rounded-lg">
        <p className="text-2xl">{label}</p>
        {actionArea}
      </div>
      {children}
    </div>
  );
};

export default FormSection;
