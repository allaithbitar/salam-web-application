import { TArticle, TUpdateArticleDto } from "@/types/article";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetArticlesQuery = () => {
  return useQuery({
    queryKey: ["GET_ARTICLES"],
    queryFn: () => axios.get<TArticle[]>("/api/articles"),
    select: (res) => res.data,
  });
};

export const useGetArticleByIdQuery = (id: number) => {
  return useQuery({
    queryKey: ["GET_ARTICLE_BY_ID", id],
    queryFn: () => axios.get<TArticle>("/api/articles", { params: { id } }),
    select: (res) => res.data,
  });
};

// export const useCreateDraftArticleQuery = () => {
//   return useMutation({
//     mutationFn: async () => {
//       const { data } = await axios.post<number>("/api/articles");
//       return data;
//     },
//   });
// };
//
export const useSaveArticleChangesMutation = () => {
  return useMutation({
    mutationFn: ({
      articleData,
      image,
    }: {
      articleData: TUpdateArticleDto;
      image: File | null;
    }) => {
      const formData = new FormData();
      formData.append("articleData", JSON.stringify(articleData));
      if (image) {
        formData.append("image", image);
      }
      return axios.put("/api/articles", formData);
    },
  });
};

// export const usePublishArticleByIdMutation = () => {
//   return useMutation({
//     mutationFn: ({
//       articleData,
//       image,
//     }: {
//       articleData: TArticleForm;
//       image: File | null;
//     }) => {
//       const formData = new FormData();
//       formData.append("action", UPDATE_ARTICLE_ACTION_TYPE.SAVE_CHANGES);
//       formData.append("articleData", JSON.stringify(articleData));
//       if (image) {
//         formData.append("image", image);
//       }
//       return axios.put("/api/articles", formData);
//     },
//   });
// };
