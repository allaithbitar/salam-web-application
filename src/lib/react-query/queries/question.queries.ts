import { getQuestions } from "@/server-actions/questions";
import { TGetQuestionsPayload } from "@/types/question";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export const useGetQuestionsQuery = (payload: TGetQuestionsPayload = {}) => {
  return useQuery({
    queryKey: ["GET_QUESTIONS", payload],
    queryFn: async () => getQuestions(payload),
  });
};

export const useGetQuestionsInfiniteQuery = (
  payload: TGetQuestionsPayload = {},
) => {
  let { pageNumber, pageSize } = payload;
  pageSize ??= 20;
  pageNumber ??= 0;
  payload = { ...payload, pageSize, pageNumber };

  console.log({ pageSize, pageNumber, payload });

  return useInfiniteQuery({
    queryKey: ["GET_QUESTIONS_INFINITE", payload],
    queryFn: async ({ pageParam }) =>
      getQuestions({ ...payload, pageNumber: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.length < pageSize) {
        return null;
      }
      return lastPageParam + 1;
    },
  });
};
