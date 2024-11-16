import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import ArticleCard from "../article-card/article-card.component";
import {
  getArticlesByCategoryIds,
  getArticlesWithCategories,
} from "@/server-actions/articles";
import { TArticle } from "@/types/article";

const ArticlesList = async ({
  limit,
  categroyId,
}: {
  limit?: number;
  categroyId?: number;
}) => {
  let articles: TArticle[] = [];
  if (categroyId) {
    articles = await getArticlesByCategoryIds({ categoryIds: [categroyId] });
  } else {
    articles = await getArticlesWithCategories({
      limit: 4,
      status: "published",
    });
  }
  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {articles.map((a) => (
          <ArticleCard key={a.id} article={a} clickUrl={`articles/${a.slug}`} />
        ))}
      </div>
      {limit && (
        <Link href="/articles" className="text-center text-primary">
          <Button>قراءة المزيد</Button>
        </Link>
      )}
    </div>
  );
};

export default ArticlesList;
