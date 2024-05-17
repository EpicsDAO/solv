import { ReactElement } from 'react'
import { getStaticPaths } from '@/lib/getStatic'
import DefaultLayout from '@/layouts/default/DefaultLayout'
import HeroRow from '@/components/pages/home/HeroRow'
import siteConfig from '@/config/site'
import { getAllArticles, getArticleBySlug } from '@/utils/article'
import { getI18nProps } from '@/lib/getStatic'
import TopNewsRow from '@/components/articles/news/TopNewsRow'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import SolvFeaturesRow from '@/components/pages/home/SolvFeaturesRow'
import ContactRow from '@/components/pages/common/ContactRow'
import CTASectionRow from '@/components/pages/common/CTASectionRow'
import MediaLogoRow from '@/components/pages/common/MediaLogoRow'
import WhyOpenSourceDevelopmentRow from '@/components/pages/common/WhyOpenSourceDevelopment'
import OurWorksRow from '@/components/pages/common/OurWorksRow'
import SolvTutorialYouTubeRow from '@/components/pages/common/SolvTutorialYouTubeRow'
import BooksRow from '@/components/pages/common/BooksRow'
import StakeForOpenSourceRow from '@/components/pages/common/StakeForOpenSourceRow'
import NicoNicoChoKaigi2024Row from '@/components/pages/common/NicoNicoChoKaigi2024Row'

const articleDirName = 'news'

const seo = {
  pathname: '/',
  title: {
    ja: 'トップページ',
    en: 'Top page',
  },
  description: {
    ja: siteConfig.descriptionJA,
    en: siteConfig.descriptionEN,
  },
  img: null,
}

export default function Home({
  urls,
  articles,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <HeroRow />
      <SolvFeaturesRow />
      <SolvTutorialYouTubeRow />
      <WhyOpenSourceDevelopmentRow />
      <StakeForOpenSourceRow />
      <TopNewsRow articles={articles} urls={urls} />
      <BooksRow />
      <MediaLogoRow />
      <NicoNicoChoKaigi2024Row />
      <OurWorksRow />
      <ContactRow />
      <CTASectionRow />
    </>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>
}

const articleDirPrefix = `articles/${articleDirName}/`

export const getStaticProps: GetStaticProps = async (ctx) => {
  const slugs = getAllArticles(articleDirPrefix).filter(
    (article) => article[0] !== 'ja'
  )
  const articles = slugs
    .map((slug) =>
      getArticleBySlug(
        slug.filter((_, index) => index !== 0),
        ['title', 'category', 'thumbnail', 'date', 'content'],
        articleDirPrefix,
        (ctx.params?.locale as string) ?? 'en'
      )
    )
    .reverse()
    .slice(0, 4)

  const urls = slugs
    .map(
      (slug) => `/${articleDirName}/${slug[1]}/${slug[2]}/${slug[3]}/${slug[4]}`
    )
    .reverse()
    .slice(0, 4)

  return {
    props: {
      urls,
      articles,
      ...(await getI18nProps(ctx, ['common', 'home', articleDirName], seo)),
    },
  }
}

export { getStaticPaths }
