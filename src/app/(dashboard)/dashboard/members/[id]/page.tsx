"use client";
import MemberInfoForm from "@/components/pages-components/dashboard/members/member-info-form.component";
import MemberProfileImage from "@/components/pages-components/dashboard/members/member-profile-image.component";
import LoadingOverlay from "@/components/ui/loading-overlay";
import {
  useGetMemberByIdQuery,
  useUpdateMemberImageMututaion,
} from "@/lib/react-query/queries/member.queries";
import { useParams } from "next/navigation";
import React from "react";

const DashboardProfilePage = () => {
  const { id } = useParams();
  const { data, refetch: refetchMemberData } = useGetMemberByIdQuery(
    Number(id),
  );
  const { mutateAsync: updateProfileImage, isPending: isUpdatingProfileImage } =
    useUpdateMemberImageMututaion();

  const handleUpdateProfileImage = async (newImage: File) => {
    await updateProfileImage({
      image: newImage,
      oldImage: data!.image ?? null,
      memberId: data!.id,
    });
    await refetchMemberData();
    try {
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" gap-4 grid grid-cols-12 w-full">
      <div className="col-span-12 lg:col-span-9">
        {data && <MemberInfoForm member={data} />}
        {/* {data && <MemberInfoForm member={data} />} */}
      </div>
      <div className="col-span-12 lg:col-span-3 relative">
        <MemberProfileImage
          onSave={handleUpdateProfileImage}
          memberImageUrl={data?.image?.fileName ?? ""}
        />
        {isUpdatingProfileImage && <LoadingOverlay />}
      </div>
    </div>
  );
};

export default DashboardProfilePage;
