import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import logoHorizontal from '@/assets/img/logo/EpicsLogoHorizontal.svg'
import logoHorizontalInvert from '@/assets/img/logo/EpicsLogoHorizontalInvert.svg'

export default function EpicsDAOTitleRow() {
  const { t } = useTranslation()
  return (
    <div className="px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="mt-2 bg-gradient-to-tr from-green-500 via-blue-400 to-purple-400 bg-clip-text text-4xl font-extrabold tracking-tighter text-transparent sm:text-6xl">
          Epics DAO
        </h2>
        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-200">
          {t('dao:EpicsDAOTitleRow.description')}
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-x-6">
          <Image
            src={logoHorizontal}
            alt="Epics DAO"
            className="mx-auto mb-2 h-10 dark:hidden"
            unoptimized
          />
          <Image
            src={logoHorizontalInvert}
            alt="Epics DAO"
            className="mx-auto mb-2 hidden h-10 dark:block"
            unoptimized
          />
          <a
            href="https://app.realms.today/dao/EPCT"
            className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-500 dark:text-white dark:hover:text-gray-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('dao:governance')} <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </div>
  )
}
