"use client";
import ArticleForm from "@/components/article-form/article-form.component";
import React, { use } from "react";

const DashboardArticlePage = (props: { params: Promise<{ id: string }> }) => {
  const params = use(props.params);
  console.log(params);
  return (
    <div>
      <ArticleForm articleId={parseInt(params.id)} />
    </div>
  );
};

export default DashboardArticlePage;
