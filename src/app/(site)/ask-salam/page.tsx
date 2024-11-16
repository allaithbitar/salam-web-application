import React from "react";
import AskArea from "./_components/ask-area/ask-area.component";
import Card from "@/components/card/card.component";
import PageHeader from "@/components/typography/page-header.component";
import Section from "@/components/section/section.component";
import AskSalamQuestions from "@/app/(dashboard)/dashboard/questions/_components/ask-salam-questions/ask-salam-questions.component";
import { getQuestions } from "@/server-actions/questions";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const AskSalamPage = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    initialPageParam: 0,
    // getNextPageParam: (lastPage, _, lastPageParam) => {
    //   if (lastPage.length < 20) return null;
    //   return lastPageParam + 1;
    // },
    queryKey: [
      "GET_QUESTIONS_INFINITE",
      { order: "dsc", status: "answered", pageSize: 20, pageNumber: 0 },
    ],
    queryFn: () =>
      getQuestions({
        order: "dsc",
        status: "answered",
        pageNumber: 0,
        pageSize: 20,
      }),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col gap-6">
        <Card>
          <PageHeader
            title="إسأل سلام"
            subtitle="ﻓﻲ ﺑﻌﺾ ﺍﻷﺣﻴﺎﻥ، ﻗﺪ ﻻ ﻧﺠﺪ ﻣﻦ ﻧﺼﺎﺭﺣﻪ ﺑﻤﺸﺎﻋﺮﻧﺎ ﺃﻭ ﻣﻦ ﻧﻄﺮﺡ ﻋﻠﻴﻪ ﺃﺳﺌﻠﺘﻨﺎ. ﻫﻨﺎ، ﻧﻘﺪﻡ ﻟﻜﻢ ﻣﻨﺼﺔ ﻟﻄﺮﺡ ﺃﺳﺌﻠﺘﻜﻢ ﻋﻦ ﺍﻟﺼﺤﺔ "
          />
          <AskArea />
        </Card>
        <Card>
          <Section label="الأسئلة المطروحة">
            <AskSalamQuestions hideStatusFilter status="answered" />
          </Section>
        </Card>
      </div>
    </HydrationBoundary>
  );
};

export default AskSalamPage;
