import Image from "next/image";
import React from "react";

const AppFigure = () => {
  return (
    <figure className="flex items-center gap-3">
      <Image
        src="/images/salam-logo-bw.png"
        alt="navbar-bg"
        height={50}
        width={50}
      />
      <h1 className="text-3xl text-primary-foreground">سلام</h1>
    </figure>
  );
};

export default AppFigure;
