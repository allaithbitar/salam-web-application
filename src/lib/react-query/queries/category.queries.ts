import { TCategory } from "@/types/category";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetCategoriesQuery = () => {
  return useQuery({
    queryFn: () => axios.get<TCategory[]>("/api/categories"),
    queryKey: ["GET_CATEGORIES"],
    select: (res) => res.data,
  });
};
