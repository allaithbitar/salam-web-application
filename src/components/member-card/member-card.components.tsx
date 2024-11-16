import { formatIsoDate } from "@/lib/utils";
import { TMember } from "@/types/member";
import { CircleUser, EditIcon } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import BlurredBgImage from "../blurred-bg-image.component/blurred-bg-image.component";

const MemberCard = ({
  member,
  onEditClick,
  isDashboardView,
  clickHref,
}: {
  member: TMember;
  onEditClick?: (memberId: number) => void;
  isDashboardView?: boolean;
  clickHref?: string;
}) => {
  const isActive = member.status === "active";
  const isPendingApproval = member.status === "pending_approval";
  const isInactive = member.status === "inactive";

  const cardContent = (
    <div className="w-full aspect-square rounded-lg flex flex-col  gap-2 relative border">
      {isDashboardView && (
        <div className="absolute top-0 left-0 w-full p-3 flex justify-between items-start z-10">
          {isPendingApproval && (
            <div className="rounded-full bg-warning text-warning-foreground w-fit p-1 px-3 text-sm font-bold">
              بانتظار قبول طلب العضوية
            </div>
          )}
          {isActive && (
            <div className="rounded-full bg-success text-success-foreground w-fit p-1 px-3 text-sm font-bold">
              نشط
            </div>
          )}

          <Button size="smallIcon" onClick={() => onEditClick?.(member.id)}>
            <EditIcon />
          </Button>
        </div>
      )}
      <div className="relative aspect-square w-full overflow-hidden rounded-lg rounded-bl-none rounded-br-none">
        {member.imageId ? (
          <BlurredBgImage
            className="aspect-square"
            src={`/uploads/${member.image?.fileName}`}
            alt={member.displayName}
          />
        ) : (
          <div className="grid place-items-center bg-primary/10 rounded-lg h-full">
            <CircleUser size={100} />
          </div>
        )}
      </div>

      <div className="p-2 text-center flex flex-col justify-center">
        <p className="text-primary font-semibold">{member.displayName}</p>
        <small>{member.role}</small>
        <small className="text-muted">
          {formatIsoDate(member.createdAt, false)}
        </small>
      </div>
    </div>
  );

  if (clickHref) {
    return <Link href={clickHref}>{cardContent}</Link>;
  }

  return cardContent;
};

export default MemberCard;
