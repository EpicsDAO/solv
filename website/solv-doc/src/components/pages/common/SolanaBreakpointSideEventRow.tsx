import Container from '@/components/common/atoms/Container'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import SolanaBreakPointSideEvent from '@/assets/img/event/SolanaBreakpointSideEventLatitudeEpicsWeWork.png'

export default function SolanaBreakpointSideEventRow() {
  const { t } = useTranslation()

  return (
    <>
      <Container className="mb-32 sm:mb-48">
        <div className="px-6 pb-10 pt-24 sm:pb-16 sm:pt-32 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="bg-gradient-to-t from-blue-500 via-purple-400 to-pink-300 bg-clip-text text-base font-semibold leading-7 text-transparent">
              Solana Breakpoint 2023 Side Event
            </h2>
            <h2 className="mt-2 text-4xl font-extrabold tracking-tighter text-gray-900 dark:text-white sm:text-4xl">
              {t('common:SolanaBreakpointSideEventRow.title')}
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-200">
              {t('common:SolanaBreakpointSideEventRow.description')}
            </p>
          </div>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href={'https://lu.ma/8ttm0niu'}
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-500 dark:text-white dark:hover:text-gray-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('common:SolanaBreakpointSideEventRow.link')}{' '}
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
        <div className="">
          <a
            href={'https://lu.ma/8ttm0niu'}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={SolanaBreakPointSideEvent}
              width={1920}
              height={1080}
              className="shadow-2xl"
              alt="Solana Breakpoint Side Event - Solana Validator Hands-on Workshop by Epics DAO, ELSOUL LABO and Latitude"
            />
          </a>
        </div>
      </Container>
    </>
  )
}
