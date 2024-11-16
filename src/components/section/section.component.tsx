import React, { ReactNode } from "react";

const Section: React.FC<{ label: string; children: ReactNode }> = ({
  label,
  children,
}) => {
  return (
    <section className="flex flex-col gap-3 w-full">
      <h3 className="text-2xl p-2 text-primary bg-primary-foreground rounded-lg w-full text-center border-primary border-[3px] border-b-[5px] font-semibold">
        {label}
      </h3>
      {children}
    </section>
  );
};
export default Section;
