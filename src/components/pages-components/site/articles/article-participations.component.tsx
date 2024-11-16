import { TArticle } from "@/types/article";
import { CircleUserRound } from "lucide-react";
import Link from "next/link";
import React from "react";

const ArticleParticipations = ({
  participations,
}: {
  participations: TArticle["participations"];
}) => {
  return (
    <section className="flex flex-col gap-2">
      <p className="text-xl">شارك في إعداد المقالة</p>
      <div className="flex flex-col gap-1">
        {participations.map((p) => {
          return (
            <div key={p.participationText}>
              <div className="flex gap-1 items-center rounded-md">
                <CircleUserRound size={30} />
                <Link
                  href={`/member/${p.member.id}`}
                  className="text-primary font-bold"
                >
                  <p>{p.member.displayName}</p>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ArticleParticipations;
