import {
  getArticleById,
  getArticlesWithCategories,
  updateArticle,
} from "@/server-actions/articles";
import { TUpdateArticleDto } from "@/types/article";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    const article = await getArticleById(parseInt(id));
    return NextResponse.json(article ?? {}, { status: article ? 200 : 404 });
  } else {
    const articles = await getArticlesWithCategories();
    return NextResponse.json(articles, { status: 200 });
  }
}

// export async function POST() {
//   const { id } = await createDraftArticle();
//   return NextResponse.json(id, { status: 200 });
// }

export async function PUT(req: Request) {
  const formData = await req.formData();

  const articleData: TUpdateArticleDto = JSON.parse(
    formData.get("articleData") as string,
  );

  const image = formData.get("image") as File | null;

  await updateArticle(articleData, image);

  return NextResponse.json({}, { status: 200 });
}

// export async function DELETE(req: Request) {
//   const { id } = await req.json();
//   await deleteArticleById(id);
//   return NextResponse.json({}, { status: 200 });
// }
