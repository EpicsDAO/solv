import { ReactElement } from 'react'
import DefaultLayout from '@/layouts/default/DefaultLayout'
import siteConfig from '@/config/site'
import { getStaticPaths, makeStaticProps } from '@/lib/getStatic'
import ContactRow from '@/components/pages/common/ContactRow'
import TeamRow from '@/components/pages/dao/TeamRow'
import OurWorksRow from '@/components/pages/common/OurWorksRow'
import RoadmapRow from '@/components/pages/common/RoadmapRow'
import EpicsDAOTitleRow from '@/components/pages/dao/EpicsDAOTitleRow'
import StakeForOpenSourceRow from '@/components/pages/common/StakeForOpenSourceRow'
import WebX2024Row from '@/components/pages/common/WebX2024Row'

const seo = {
  pathname: '/dao',
  title: {
    ja: 'DAO',
    en: 'DAO',
  },
  description: {
    ja: siteConfig.descriptionJA,
    en: siteConfig.descriptionEN,
  },
  img: null,
}

const getStaticProps = makeStaticProps(['common', 'dao'], seo)
export { getStaticPaths, getStaticProps }

export default function OpenSource() {
  return (
    <>
      <EpicsDAOTitleRow />
      <OurWorksRow />
      <RoadmapRow />
      <TeamRow />
      <WebX2024Row />
      <StakeForOpenSourceRow />
      <ContactRow />
    </>
  )
}

OpenSource.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>
}
