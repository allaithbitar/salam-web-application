import Card from "@/components/card/card.component";
import React from "react";
import Faq from "../_components/faq/faq.component";
import PageHeader from "@/components/typography/page-header.component";

const FaqsPage = () => {
  return (
    <Card>
      <PageHeader title="الاسئلة الشائعة" />
      <Faq />
    </Card>
  );
};

export default FaqsPage;
