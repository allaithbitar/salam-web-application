import BlurredBgImage from "@/components/blurred-bg-image.component/blurred-bg-image.component";
import { useGetMemberByIdQuery } from "@/lib/react-query/queries/member.queries";
import { getMemberById } from "@/server-actions/members";
import { UserCircleIcon } from "lucide-react";
import React from "react";

const MemberPage = async props => {
  const params = await props.params;
  const member = await getMemberById(Number(params.id));
  return (
    <div className="mt-28">
      <div className="min-h-[400px] rounded-lg bg-white relative flex flex-col items-center pt-[90px]">
        <div className="size-[160px] absolute -top-[80px] left-1/2 transform -translate-x-1/2 rounded-lg overflow-hidden">
          {member?.image ? (
            <BlurredBgImage
              className="aspect-square"
              src={`/uploads/${member.image?.fileName}`}
              alt={member.displayName}
            />
          ) : (
            <UserCircleIcon size="100%" />
          )}
        </div>
        <div>
          <p>{member?.displayName}</p>
        </div>
      </div>
    </div>
  );
};

export default MemberPage;
