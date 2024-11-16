import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const BlurredBgImage = ({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) => {
  return (
    <div
      className={cn("relative aspect-video w-full overflow-hidden", className)}
    >
      <Image
        src={src}
        fill
        alt={alt}
        className="rounded-lg object-contain z-[2]"
      />

      <Image
        src={src}
        fill
        quality={1}
        alt={alt}
        className="rounded-lg object-cover blur scale-150"
      />
    </div>
  );
};

export default BlurredBgImage;
