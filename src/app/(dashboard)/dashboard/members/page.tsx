"use client";
import Fab from "@/components/fab/fab.component";
import MemberCard from "@/components/member-card/member-card.components";
import MemberActionModal from "@/components/pages-components/dashboard/members/member-action-modal.component";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetMembersQuery } from "@/lib/react-query/queries/member.queries";
import { TMember } from "@/types/member";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";

type TStatus = TMember["status"] | "all";

const DashboardMembersPage = () => {
  const [status, setStatus] = useState<TStatus>("all");
  const [search, setSearch] = useState("");
  const { data: members } = useGetMembersQuery();
  const [memberId, setMemberId] = useState<number | null>(null);
  const router = useRouter();

  const handleAddMember = () => {
    setMemberId(0);
  };

  const handleEditMember = (_memberId: number) => {
    router.push(`members/${_memberId.toString()}`);
  };

  const filteredMembers = useMemo(() => {
    let _members = members || [];
    if (search) {
      _members = _members.filter((m) =>
        m.displayName.toLowerCase().includes(search.toLowerCase()),
      );
    }
    if (status !== "all") {
      _members = _members.filter((m) => m.status === status);
    }
    return _members;
  }, [status, members, search]);
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <Select value={status!} onValueChange={(v) => setStatus(v as any)}>
          <SelectTrigger className="w-[250px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">كل الأعضاء</SelectItem>
            <SelectItem value="pending_approval">
              بانتظار قبول العضوية
            </SelectItem>
            <SelectItem value="active">النشطين</SelectItem>
            <SelectItem value="inactive">الموقوفين</SelectItem>
          </SelectContent>
        </Select>
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="البحث"
          type="search"
        />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {filteredMembers?.map((m) => {
          return (
            <MemberCard
              key={m.id}
              member={m}
              onEditClick={handleEditMember}
              isDashboardView
            />
          );
        })}
        <Fab
          buttons={[
            {
              id: 1,
              label: "إضافة عضو",
              icon: <PlusIcon />,
              onClick: handleAddMember,
              buttonProps: {
                className: "w-[unset] h-unset p-2 px-4",
              },
            },
          ]}
        />

        <MemberActionModal
          memberId={memberId}
          onOpenChange={() => setMemberId(null)}
        />
      </div>
    </div>
  );
};

export default DashboardMembersPage;
