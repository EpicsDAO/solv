import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import {
  BuildingLibraryIcon,
  CommandLineIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline'

const features = [
  {
    name: 'home:SolvFeaturesRow.feature1Title',
    description: 'home:SolvFeaturesRow.feature1Description',
    icon: GlobeAltIcon,
  },
  {
    name: 'home:SolvFeaturesRow.feature2Title',
    description: 'home:SolvFeaturesRow.feature2Description',
    icon: CommandLineIcon,
  },
  {
    name: 'home:SolvFeaturesRow.feature3Title',
    description: 'home:SolvFeaturesRow.feature3Description',
    icon: BuildingLibraryIcon,
  },
]

export default function SolvFeaturesRow() {
  const { t } = useTranslation()
  return (
    <>
      <div className="overflow-hidden py-24 sm:py-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 sm:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:ml-auto">
              <div className="lg:max-w-lg">
                <h2 className="bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-base font-semibold leading-7 text-transparent">
                  {t('home:SolvFeaturesRow.subtitle')}
                </h2>
                <p className="mt-2 text-3xl font-extrabold tracking-tighter text-gray-900 dark:text-white sm:text-4xl">
                  {t('home:SolvFeaturesRow.title')}
                </p>
                <p className="text-md mt-6 leading-7 text-gray-600 dark:text-gray-400">
                  {t('home:SolvFeaturesRow.description')}
                </p>
                <dl className="mt-10 max-w-xl space-y-6 text-base leading-7 text-gray-600 dark:text-gray-400 lg:max-w-none">
                  {features.map((feature) => (
                    <div key={feature.name} className="relative pl-9">
                      <dt className="inline font-semibold text-gray-900 dark:text-white">
                        <feature.icon
                          className="absolute left-1 top-1 h-5 w-5"
                          aria-hidden="true"
                        />
                        {t(feature.name)}
                      </dt>{' '}
                      <dd className="inline">{t(feature.description)}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
            <div className="flex items-start justify-end lg:order-first">
              <Image
                src="https://storage.googleapis.com/epics-bucket/Validator/solv-install-top.gif"
                alt="solv"
                className="w-[52rem] shadow-xl sm:w-[64rem]"
                width={2432}
                height={1442}
                unoptimized
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
