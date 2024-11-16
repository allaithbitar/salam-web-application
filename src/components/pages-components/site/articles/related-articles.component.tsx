import ArticleCard from "@/components/article-card/article-card.component";
import { getArticlesByCategoryIds } from "@/server-actions/articles";
import React from "react";

const RelatedArticles = async ({
  articleCategoryIds,
}: {
  articleCategoryIds: number[];
}) => {
  const relatedArticles = await getArticlesByCategoryIds({
    status: "published",
    limit: 5,
    categoryIds: articleCategoryIds,
  });
  return (
    <section className="flex flex-col gap-2">
      <p className="text-xl">مقالات ذات صلة</p>
      {relatedArticles.map((a) => (
        <ArticleCard
          key={a.id}
          article={a}
          clickUrl={`/articles/${a.slug}`}
          compact
        />
      ))}
    </section>
  );
};

export default RelatedArticles;
