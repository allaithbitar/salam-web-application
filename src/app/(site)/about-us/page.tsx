import Card from "@/components/card/card.component";
import MemberCard from "@/components/member-card/member-card.components";
import Section from "@/components/section/section.component";
import PageHeader from "@/components/typography/page-header.component";
import { getMembers } from "@/server-actions/members";
import React from "react";

const AboutUsPage = async () => {
  const members = await getMembers({ status: "active" });
  return (
    <Card className="flex flex-col gap-2">
      <PageHeader title="حولنا" />
      <Section label="أعضاء الفريق">
        <div className="grid grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {members.map((m) => (
            <MemberCard key={m.id} member={m} clickHref={`member/${m.id}`} />
          ))}
        </div>
      </Section>
    </Card>
  );
};

export default AboutUsPage;
