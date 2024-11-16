import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { getArticlesWithCategories } from "@/server-actions/articles";
import Image from "next/image";

const HomeCarousel = async () => {
  const articles = await getArticlesWithCategories({
    status: "published",
  });

  return (
    <div className="w-full">
      <Carousel className="w-full">
        <CarouselContent>
          {articles.map((a, idx) => (
            <CarouselItem key={idx}>
              <div className="w-full relative h-[400px] rounded-lg overflow-hidden">
                <Image
                  alt={a.cover!.fileName}
                  src={`/uploads/${a.cover!.fileName}`}
                  quality={100}
                  // width={a.cover!.width}
                  // height={a.cover!.height}
                  fill
                  className="rounded-lg object-contain z-[2]"
                />

                <Image
                  alt={a.cover!.fileName}
                  src={`/uploads/${a.cover!.fileName}`}
                  quality={1}
                  // width={a.cover!.width}
                  // height={a.cover!.height}
                  fill
                  className="rounded-lg object-cover blur scale-150"
                />
                <div className=" absolute left-1/2 transform -translate-x-1/2 bottom-[4%] p-4 backdrop-blur-sm  backdrop-contrast-[1] backdrop-brightness-[.5] rounded-lg w-[98%] z-10">
                  <h3 className="text-xl text-primary-foreground">{a.title}</h3>
                  <p className="text-gray-400">{a.contentShort}...</p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default HomeCarousel;
