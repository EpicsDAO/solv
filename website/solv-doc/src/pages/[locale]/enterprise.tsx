import { ReactElement } from 'react'
import DefaultLayout from '@/layouts/default/DefaultLayout'
import siteConfig from '@/config/site'
import { getStaticPaths, makeStaticProps } from '@/lib/getStatic'
import EnterpriseSupportFormRow from '@/components/pages/enterprise/EnterpriseSupportFormRow'

const seo = {
  pathname: '/enterprise',
  title: {
    ja: 'solv エンタープライズサポート',
    en: 'solv Enterprise Support',
  },
  description: {
    ja: siteConfig.descriptionJA,
    en: siteConfig.descriptionEN,
  },
  img: null,
}

const getStaticProps = makeStaticProps(['common', 'enterprise'], seo)
export { getStaticPaths, getStaticProps }

export default function Enterprise() {
  return (
    <>
      <EnterpriseSupportFormRow />
    </>
  )
}

Enterprise.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>
}
