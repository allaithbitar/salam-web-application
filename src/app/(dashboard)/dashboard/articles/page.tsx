"use client";
import ArticleCard from "@/components/article-card/article-card.component";
import Fab from "@/components/fab/fab.component";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetArticlesQuery } from "@/lib/react-query/queries/articles.queries";
import { createDraftArticle } from "@/server-actions/articles";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";

const DashboardArticlesPage = () => {
  const router = useRouter();
  const {
    data: articles,
    isLoading: isLoadingArticles,
    // isFetching: isFetchingArticles,
  } = useGetArticlesQuery();
  // const { mutateAsync: createDraftArticle } = useCreateDraftArticleQuery();
  const handleAddArticle = async () => {
    const { id: draftArticleId } = await createDraftArticle();

    router.push(`articles/${draftArticleId}`);
  };

  const handleEditClick = useCallback(
    (articleId: number) => {
      router.push(`articles/${articleId}`);
    },
    [router],
  );

  return (
    <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {isLoadingArticles &&
        new Array(4)
          .fill(0)
          .map((_, idx) => (
            <Skeleton key={idx} className="w-full h-[450px] rounded-lg" />
          ))}
      {articles?.map((a) => (
        <ArticleCard
          key={a.id}
          article={a}
          clickUrl={`articles/${a.id}`}
          isDashboardView
          onEditClick={handleEditClick}
        />
      ))}
      <Fab
        buttons={[
          {
            id: 1,
            label: "إضافة مقالة",
            icon: <PlusIcon />,
            onClick: handleAddArticle,
            buttonProps: {
              className: "w-[unset] h-unset p-2 px-4",
            },
          },
        ]}
      />
    </div>
  );
};

export default DashboardArticlesPage;
