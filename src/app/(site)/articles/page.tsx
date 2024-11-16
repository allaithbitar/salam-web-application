import ArticlesList from "@/components/articles-list/articles-list.component";
import Card from "@/components/card/card.component";
import HomeCarousel from "@/components/home-carousel/home-carousel.component";
import PageHeader from "@/components/typography/page-header.component";
import { Badge } from "@/components/ui/badge";
import { getAllCategories } from "@/server-actions/categories";
import { TCategory } from "@/types/category";
import Link from "next/link";
import React from "react";

const defaultCategory: TCategory = {
  id: 0,
  name: "الكل",
};

const ArticlesPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const categoryId = Number((await searchParams)?.categoryId || 0);
  console.log(categoryId);
  const categories = await getAllCategories();
  return (
    <div className="stack gap-2">
      <HomeCarousel />
      <Card>
        <PageHeader
          title="المقالات"
          subtitle="ﻧﻮﻓﺮ ﻫﻨﺎ ﻣﻌﻠﻮﻣﺎﺕ ﻣﺪﻋﻮﻣﺔ ﺑﺎﻷﺑﺤﺎﺙ ﺍﻟﻌﻠﻤﻴﺔ، ﻟﺘﻜﻮﻥ ﻣﺮﺟﻌﺎً ﻟﻜﻞ ﻣﻦ ﻳﺮﻏﺐ ﻓﻲ ﻓﻬﻢ ﻋﻤﻴﻖ ﻟﻠﺼﺤﺔ ﺍﻟﻨﻔﺴﻴﺔ ﻭﻛﻴﻔﻴﺔ ﺍﻟﻌﻨﺎﻳﺔ ﺑﻬﺎ"
        />
        <div className="flex gap-2 mb-4">
          {[defaultCategory, ...categories].map((c) => (
            <Link
              key={c.id}
              href={c.id ? `/articles?categoryId=${c.id}` : "/articles"}
              replace
              shallow
            >
              <Badge>{c.name}</Badge>
            </Link>
          ))}
        </div>
        <ArticlesList categroyId={categoryId} />
      </Card>
    </div>
  );
};

export default ArticlesPage;
