"use client";
import OrderByFilter from "@/components/order-by-filter/order-by-filter.component";
import QuestionCard from "@/components/question-card/question-card.component";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { useDebounce } from "@/hooks/use-debounce.hook";
import { useGetQuestionsInfiniteQuery } from "@/lib/react-query/queries/question.queries";
import { TQuestion } from "@/types/question";
import React, { useState } from "react";

const AskSalamQuestions = ({
  onActionClick,
  hideStatusFilter,
  isDashboardView,
  status,
}: {
  isDashboardView?: boolean;
  onActionClick?: (quesitons: TQuestion) => void;
  hideStatusFilter?: boolean;
  status?: TQuestion["status"];
}) => {
  const [search, setSearch] = useState("");
  const [questionsStatus, setQuestionsStatus] = useState<
    "all" | TQuestion["status"]
  >(status || "all");
  const [orderBy, setOrderBy] = useState("dsc_createdAt");
  const debouncedSearch = useDebounce(search);

  const {
    data: { pages } = {},
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useGetQuestionsInfiniteQuery({
    status: questionsStatus === "all" ? undefined : questionsStatus,
    order: orderBy.split("_")[0] as any,
    ...(debouncedSearch && { search: debouncedSearch }),
  });

  const orderByOptions = [
    {
      label: "تاريخ السؤال",
      value: "createdAt",
    },
  ];

  return (
    <div className="stack gap-2">
      <div className="flex gap-2 items-center flex-col lg:flex-row">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="search"
          placeholder="بحث"
        />
        {!hideStatusFilter && (
          <Select
            value={status}
            onValueChange={(v) => setQuestionsStatus(v as any)}
          >
            <SelectTrigger className="w-full lg:w-[250px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">الكل</SelectItem>
              <SelectItem value="answered">المجاب عليها</SelectItem>
              <SelectItem value="unanswered">غير الماجب عنها</SelectItem>
              <SelectItem value="archived">المؤرشفة</SelectItem>
            </SelectContent>
          </Select>
        )}
        <OrderByFilter
          className="w-[300px]"
          value={orderBy}
          onChange={setOrderBy}
          options={orderByOptions}
        />
      </div>
      <div className="columns-1 lg:columns-2 gap-2 space-y-2">
        {pages?.map((p) =>
          p.map((q) => (
            <QuestionCard
              key={q.id}
              question={q}
              isDashboardView={isDashboardView}
              onActionClick={onActionClick}
            />
          )),
        )}
      </div>
      <div className="flex justify-center">
        {isFetching && <LoadingSpinner />}
        {!isFetching && hasNextPage && (
          <Button onClick={() => fetchNextPage()}>تحميل المزيد</Button>
        )}
      </div>
    </div>
  );
};

export default AskSalamQuestions;
