"use client";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { Calendar, EditIcon, EyeIcon, ImageIcon } from "lucide-react";
import { Badge } from "../ui/badge";
import { TArticle } from "@/types/article";
import BlurredBgImage from "../blurred-bg-image.component/blurred-bg-image.component";

const ArticleCard: React.FC<{
  article: TArticle;
  clickUrl: string;
  onEditClick?: (id: number) => void;
  isDashboardView?: boolean;
  compact?: boolean;
}> = ({ article, clickUrl, isDashboardView = false, compact, onEditClick }) => {
  const isDraft = article.status === "draft";
  const isPublished = article.status === "published";

  if (compact) {
    return (
      <div className="flex gap-2">
        {article.cover ? (
          <BlurredBgImage
            className="flex-shrink-0 size-20 rounded-lg"
            src={`/uploads/${article.cover.fileName}`}
            alt={article.cover.fileName}
          />
        ) : (
          <div className="h-[215px] grid place-items-center  bg-primary/10">
            <ImageIcon size={120} />
          </div>
        )}
        <Link href={clickUrl} title={article.title}>
          <p className="text-primary line-clamp-2 overflow-ellipsis">
            {article.title}
          </p>
          <p className="line-clamp-1 overflow-ellipsis text-gray-500 text-sm">
            {article.contentShort}
          </p>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full relative flex flex-col bg-white rounded-lg overflow-hidden flex-shrink-0 border">
      {isDashboardView && (
        <div className="absolute top-0 left-0 w-full p-3 flex justify-between items-start z-10">
          {isDraft && (
            <div className="rounded-full bg-warning text-warning-foreground w-fit p-1 px-3 text-sm font-bold">
              مسودة
            </div>
          )}
          {isPublished && (
            <div className="rounded-full bg-success text-success-foreground w-fit p-1 px-3 text-sm font-bold">
              منشورة
            </div>
          )}

          <Button size="smallIcon" onClick={() => onEditClick?.(article.id)}>
            <EditIcon />
          </Button>
        </div>
      )}
      {article.cover ? (
        <BlurredBgImage
          className="flex-shrink-0"
          src={`/uploads/${article.cover.fileName}`}
          alt={article.cover.fileName}
        />
      ) : (
        <div className="h-[215px] grid place-items-center  bg-primary/10">
          <ImageIcon size={120} />
        </div>
      )}
      <div className="p-3 flex flex-col gap-2 flex-1 flex-shrink-0">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            {article.categories.map((c) => (
              <Badge key={c.id}>{c.name}</Badge>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <Link href={clickUrl} title={article.title}>
            <p className="text-primary font-bold line-clamp-2 overflow-ellipsis">
              {article.title}
            </p>
          </Link>
          <p className="text-gray-500 text-sm line-clamp-3 overflow-ellipsis">
            {article.contentShort}...
          </p>
        </div>
        <div className="flex justify-between mt-auto text-gray-500">
          {isPublished && (
            <div className="flex gap-1 items-center">
              <time className="text-sm" dateTime={article.publishedAt!}>
                {Intl.DateTimeFormat("ar-SY", {}).format(
                  new Date(article.publishedAt!),
                )}
              </time>
              <Calendar size={16} />
            </div>
          )}

          <div className="flex gap-1 items-center ">
            <p className="text-sm">{article.views}</p>
            <EyeIcon size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ArticleCard;
