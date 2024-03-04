import Link from '@/components/routing/Link'
import { useTranslation } from 'next-i18next'

export default function CTASectionRow() {
  const { t } = useTranslation()
  return (
    <>
      <div className="">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:justify-between lg:px-8">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tighter text-gray-900 dark:text-white sm:text-5xl">
              {t('common:CTASectionRow.title')}
            </h2>
            <p className="mt-2 text-lg font-medium tracking-tight text-gray-400 dark:text-gray-400 sm:text-xl">
              {t('common:CTASectionRow.body')}
            </p>
          </div>

          <div className="mt-10 flex items-center gap-x-6 lg:mt-0 lg:flex-shrink-0">
            <Link
              href="/doc/quickstart/start-solv"
              className="bg-gray-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-gray-200 dark:text-gray-900 dark:hover:bg-gray-300"
            >
              {t('common:CTASectionRow.button')}
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
