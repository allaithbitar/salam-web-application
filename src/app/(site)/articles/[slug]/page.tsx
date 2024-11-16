import BlurredBgImage from "@/components/blurred-bg-image.component/blurred-bg-image.component";
import Card from "@/components/card/card.component";
import ArticleParticipations from "@/components/pages-components/site/articles/article-participations.component";
import RelatedArticles from "@/components/pages-components/site/articles/related-articles.component";
import PageHeader from "@/components/typography/page-header.component";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatIsoDate } from "@/lib/utils";
import { getArticleBySlug } from "@/server-actions/articles";
// import ShareArticle from "./_components/share-article.component";

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const article = await getArticleBySlug(params.slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.contentShort,
    openGraph: {
      images: [
        {
          url: `http://localhost:3000/uploads/${article.cover!.fileName}`,
        },
      ],
    },
  };
}

const BlogPage = async (props: { params: Promise<{ slug: string }> }) => {
  const params = await props.params;
  const article = await getArticleBySlug(params.slug);
  if (!article) return null;
  return (
    <div className="mt-4 grid grid-cols-4 gap-4">
      <div className="col-span-4 xl:col-span-3">
        <Card className="flex flex-col gap-6 p-4">
          <PageHeader title={article.title} className="my-0 mt-2"></PageHeader>
          <BlurredBgImage
            className="mx-auto overflow-hidden rounded-lg"
            src={`/uploads/${article.cover!.fileName}`}
            alt={article.title}
          />

          <article
            dir="ltr"
            dangerouslySetInnerHTML={{ __html: article.content }}
          ></article>
          <section className="flex gap-1">
            {article.categories.map((c) => (
              <Badge key={c.id}> {c.name}</Badge>
            ))}
          </section>
          <div className="flex justify-between text-gray-500">
            <time dateTime={article.publishedAt!}>
              <span>تم النشر بتاريخ </span>
              {formatIsoDate(article.publishedAt!, false)}
            </time>
            <p>المشاهدات {article.views}</p>
          </div>

          {/* <section className="flex flex-col gap-2"> */}
          {/*   <h3 className="text-2xl font-semibold text-primary"></h3> */}
          {/* </section> */}
        </Card>
      </div>
      <aside className="col-span-4 xl:col-span-1">
        <Card className="flex flex-col gap-4">
          <ArticleParticipations participations={article.participations} />
          <Separator />
          <RelatedArticles
            articleCategoryIds={article.categories.map((c) => c.id)}
          />
          {/* <ShareArticle slug={article.slug} /> */}
        </Card>
      </aside>
    </div>
  );
};

export default BlogPage;
