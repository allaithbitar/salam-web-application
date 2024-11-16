import Image from "next/image";
import React from "react";

const Banner = () => {
  return (
    <div>
      <div className="relative flex items-center rounded-lg overflow-hidden">
        <Image
          src="/images/header.jpg"
          alt="navbar-bg"
          fill
          quality={100}
          objectFit="cover"
        />
        <div className="w-full flex items-center z-10 gap-4 p-10">
          <div className="relative size-20">
            <Image
              src="/images/salam-logo.png"
              alt="logo"
              fill
              objectFit="contain"
            />
          </div>
          <p className="text-5xl text-primary">سلام</p>
          <p className="text-2xl text-primary ms-auto">
            اعرف محيطك لتنمو فيه بسلام
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
