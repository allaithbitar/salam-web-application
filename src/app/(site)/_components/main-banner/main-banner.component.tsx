import Image from "next/image";
import React from "react";

const MainBanner = () => {
  return (
    <div className="bg-primary/90 rounded-lg p-4 gap-2 text-primary-foreground items-center grid grid-cols-5">
      <h1 className="text-xl col-span-5 md:col-span-4  text-center md:text-start">
        ﻣﺮﺣﺒﺎ ﺑﻜﻢ ﻓﻲ ﺳﻼﻡ ...
        <br /> ﺭﺳﺎﻟﺔ ﻧﺒﻌﺜﻬﺎ ﻣﻦ ﻋﻤﻖ ﺍﻟﻘﻠﻮﺏ ﺍﻟﻤﺘﻌﺒﺔ ﻟﻜﻞ ﻧﻔﺲ ﻣﻀﻄﺮﺑﺔ ﺗﺒﺤﺚ ﻋﻦ
        ﺍﻟﺴﻜﻴﻨﺔ. ﻧﺤﻦ ﻫﻨﺎ ﻟﻨﻐﺮﺱ ﺑﺬﻭﺭ ﺍﻟﻮﻋﻲ، ﻭﻧﻤﺪّ ﻳﺪ ﺍﻟﻌﻮﻥ، ﻭﻧﺤﻄﻢ ﺍﻟﻘﻴﻮﺩ ﺍﻟﺘﻲ
        ﺗﻘﻴﺪﻧﺎ ﻋﻦ ﺍﻟﺤﺪﻳﺚ ﻋﻦ ﺻﺤﺘﻨﺎ ﺍﻟﻨﻔﺴﻴﺔ. ﻫﺪﻓﻨﺎ ﺑﻨﺎﺀ ﻣﺠﺘﻤﻊ ﻭﺍﻉٍ، ﻭﺩﺍﻋﻢ، ﻳﺆﻣﻦ
        ﺑﺄﻥ ﺍﻟﺸﻔﺎﺀ ﺭﺣﻠﺔ، ﻭﺃﻥ ﻛﻞ ﻧﻔﺲ ﺗﺴﺘﺤﻖ ﺍﻟﺴﻼﻡ.
      </h1>
      <div className="flex flex-col items-center flex-shrink-0 col-span-5 md:col-span-1 -order-1">
        <div className="relative w-full h-[200px] md:h-[100px]">
          <Image
            src="/images/salam-logo.png"
            fill
            className="object-contain"
            alt="salam-logo"
          />
        </div>
        <p className="text-2xl">سلام</p>
        <p className="text-primary-foreground/40 text-sm">
          إعرف محيطك لتنمو فيه بسلام
        </p>
      </div>
    </div>
  );
};

export default MainBanner;
