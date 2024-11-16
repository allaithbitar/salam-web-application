import { TGetMembersOptions } from "@/server-actions/members";
import { TMember, TUpdateMemberImageDto } from "@/types/member";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetMembersQuery = ({ status }: TGetMembersOptions = {}) => {
  return useQuery({
    queryKey: ["GET_MEMBERS", status],
    queryFn: () => {
      return axios.get<TMember[]>("/api/members", {
        params: {
          status,
        },
      });
    },
    select: (res) => res.data,
  });
};

export const useGetMemberByIdQuery = (id: number | null) => {
  return useQuery({
    queryKey: ["GET_MEMBER_BY_ID", id],
    queryFn: () => {
      return axios.get<TMember>("/api/members", {
        params: {
          id,
        },
      });
    },
    select: (res) => res.data,
    enabled: !!id,
  });
};

export const useUpdateMemberImageMututaion = () => {
  return useMutation({
    mutationFn: (payload: TUpdateMemberImageDto) => {
      const formData = new FormData();
      formData.append("memberId", payload.memberId.toString());
      formData.append("image", payload.image);
      formData.append("oldImage", JSON.stringify(payload.oldImage));
      return axios.put<TMember>("/api/members", formData);
    },
  });
};
