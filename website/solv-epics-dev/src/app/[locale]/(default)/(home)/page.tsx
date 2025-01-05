import { setRequestLocale } from 'next-intl/server'
import { getDataForPageByGroupDir, PageProps } from '@/lib/pages'
import { getArticleForIndex } from '@/lib/articles'
import ArticleIndex from '@/components/articles/ArticleIndex'
import HomeHeroRow from './HomeHeroRow'
import CTARow from '@/components/rows/CTARow'
import ProductsSlideRow from '@/components/rows/ProductsSlideRow'
import EasyStartValidatorRow from './EasyStartValidatorRow'
import AdaptiveSolutionsRow from './AdaptiveSolutionsRow'
import QualityOperationsRow from './QualityOperationsRow'
import EvolvingToSLVRow from './EvolvingToSLVRow'

const groupDir = '(home)'
const { generateMetadata } = getDataForPageByGroupDir(groupDir)
export { generateMetadata }

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const newsData = getArticleForIndex(
    'news',
    ['title', 'thumbnail', 'date'],
    locale,
  )

  return (
    <>
      <HomeHeroRow />
      <EvolvingToSLVRow />
      <EasyStartValidatorRow />
      <AdaptiveSolutionsRow />
      <QualityOperationsRow />
      <CTARow />
      <ProductsSlideRow />
      <ArticleIndex articlesData={newsData} showItemsNum={3} />
    </>
  )
}
