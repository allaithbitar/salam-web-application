import ArticlesList from "@/components/articles-list/articles-list.component";
import Card from "@/components/card/card.component";
import HomeCarousel from "@/components/home-carousel/home-carousel.component";
import Section from "@/components/section/section.component";
import MainBanner from "./_components/main-banner/main-banner.component";
import OurGoal from "./_components/our-goal/our-goal.component";
import JoinUs from "./_components/join-us/join-us.component";
import Faq from "./_components/faq/faq.component";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className="flex flex-col gap-6">
      <MainBanner />
      <Card>
        <Section label="أهدافنا و رسالتنا">
          <OurGoal />
        </Section>
      </Card>

      {/* <Banner /> */}
      <Card>
        <Section label="المقالات">
          <ArticlesList limit={4} />
        </Section>
      </Card>

      <Card>
        <Section label="تطوع معنا">
          <JoinUs />
        </Section>
      </Card>

      {/* <Section label="تابعنا"> */}
      {/*   <BlogsList truncate /> */}
      {/* </Section> */}
    </div>
  );
}
