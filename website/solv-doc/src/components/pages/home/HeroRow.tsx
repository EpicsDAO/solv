import Container from '@/components/common/atoms/Container'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import solanaLogo from '@/assets/img/logo/projects/SolanaLogoHorizontal.svg'
import { Button } from '@/components/common/atoms/Button'
import clsx from 'clsx'
import siteConfig from '@/config/site'
import { useCallback, useMemo, useState } from 'react'
import { copyToClipboard } from '@/utils/userAction'
import latitudeLogo from '@/assets/img/logo/partners/Latitude/latitudesh-logotype-dark.svg'
import googleCloudLogo from '@/assets/img/logo/projects/GoogleCloudHorizontal.svg'
import jitoFoundationLogo from '@/assets/img/logo/projects/JitoFoundation_Logo_Green.svg'

import { BookOpenIcon } from '@heroicons/react/24/outline'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

const commandStep1 = `sh -c "$(curl -sSfL "https://storage.googleapis.com/epics-bucket/resource/solv/${siteConfig.solvInstallerVersion}/install")"`
const commandStep2 = 'cd ~ && source ~/.profile'
const commandStep3 = 'solv setup'

export default function HomeHeroRow() {
  const { t, i18n } = useTranslation()
  const isJapanese = useMemo(() => i18n.language === 'ja', [i18n.language])

  const [copyText1, setCopyText1] = useState('common:copy')
  const [copyText2, setCopyText2] = useState('common:copy')
  const [copyText3, setCopyText3] = useState('common:copy')

  const handleClick1 = useCallback(() => {
    copyToClipboard(commandStep1)
    setCopyText1('common:copied')

    setTimeout(() => {
      setCopyText1('common:copy')
    }, 2000)
  }, [])

  const handleClick2 = useCallback(() => {
    copyToClipboard(commandStep2)
    setCopyText2('common:copied')

    setTimeout(() => {
      setCopyText2('common:copy')
    }, 2000)
  }, [])

  const handleClick3 = useCallback(() => {
    copyToClipboard(commandStep3)
    setCopyText3('common:copied')

    setTimeout(() => {
      setCopyText3('common:copy')
    }, 2000)
  }, [])

  return (
    <>
      <div className="relative isolate overflow-hidden">
        <svg
          className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)] dark:stroke-gray-600"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="0787a7c5-978c-4f66-83c7-11c213f99cb7"
              width={200}
              height={200}
              x="50%"
              y={-1}
              patternUnits="userSpaceOnUse"
            >
              <path d="M.5 200V.5H200" fill="none" />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            strokeWidth={0}
            fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)"
          />
        </svg>
        <Container className="flex flex-col items-center justify-center gap-x-8 gap-y-24 py-24 lg:flex-row lg:items-start lg:justify-between lg:py-32">
          <div>
            <h1
              className={clsx(
                'font-display bg-gradient-to-t from-gray-600 via-gray-700 to-gray-900 bg-clip-text font-extrabold text-transparent dark:from-gray-200 dark:via-gray-50 dark:to-white',
                isJapanese
                  ? 'max-w-2xl text-4xl tracking-tight sm:text-6xl'
                  : 'max-w-2xl text-5xl tracking-tighter sm:text-7xl'
              )}
            >
              {t('home:HeroRow.title')}
            </h1>
            <p
              className={clsx(
                'mt-3 text-lg font-normal tracking-tight text-gray-500 dark:text-gray-200 sm:mt-5 ',
                isJapanese ? 'max-w-xl sm:text-xl' : 'max-w-lg sm:text-2xl'
              )}
            >
              {t('home:HeroRow.body')}
            </p>
            <div className="mt-6 flex gap-x-6">
              <Button href="/doc" className="">
                <BookOpenIcon
                  className="mr-2 inline-block h-5 w-5"
                  aria-hidden="true"
                />
                {t('common:navs.defaultMainNav.doc')}
              </Button>
              <Button
                href={`${siteConfig.githubRepo}`}
                variant="outline"
                className=""
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon
                  icon={faGithub}
                  className="mr-2 inline-block h-5 w-5"
                />
                GitHub
              </Button>
            </div>
            <ul
              role="list"
              className="mt-12 flex flex-row items-start justify-start gap-x-6 gap-y-10 lg:gap-y-0"
            >
              {[
                [
                  {
                    name: 'Solana',
                    logo: solanaLogo,
                    link: 'https://solana.com/',
                  },
                  {
                    name: 'Latitude',
                    logo: latitudeLogo,
                    link: 'https://www.latitude.sh/',
                  },
                ],
                [
                  {
                    name: 'Jito Foundation',
                    logo: jitoFoundationLogo,
                    link: 'https://www.jito.network/',
                  },
                  {
                    name: 'Google Cloud',
                    logo: googleCloudLogo,
                    link: 'https://cloud.google.com/',
                  },
                ],
              ].map((group, groupIndex) => (
                <li key={`HeroRowLogoCloudList${groupIndex}`}>
                  <ul
                    role="list"
                    className="flex flex-row items-center gap-x-6"
                  >
                    {group.map((project) => (
                      <li key={project.name} className="flex">
                        <a href={project.link} target="_blank" rel="noreferrer">
                          <Image
                            src={project.logo}
                            alt={project.name}
                            className={clsx(
                              'max-h-12 hover:opacity-60 dark:grayscale',
                              project.name === 'React'
                                ? 'dark:invert-0'
                                : 'dark:invert'
                            )}
                            width={168}
                            height={48}
                            unoptimized
                          />
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full max-w-lg">
            <div className="p-3">
              <div className="mb-3 flex items-baseline bg-gradient-to-t from-gray-600 via-gray-700 to-gray-900 bg-clip-text text-transparent dark:from-gray-200 dark:via-gray-50 dark:to-white">
                <span className="mr-4 text-4xl font-bold">1.</span>
                <div>
                  <h2 className="text-2xl font-bold tracking-tighter">
                    {t('solvInstall')}
                  </h2>
                </div>
              </div>
              <div className="relative mx-auto rounded-md bg-gray-900 p-4 text-white">
                <div className="absolute left-2 top-2 flex space-x-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500"></div>
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-400"></div>
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
                </div>
                <div className="absolute right-3 top-1.5 flex space-x-1.5">
                  <button
                    onClick={() => {
                      handleClick1()
                    }}
                    className="text-sm font-bold tracking-tight hover:text-gray-200"
                  >
                    {t(copyText1)}
                  </button>
                </div>
                <div className="overflow-x-scroll whitespace-nowrap pt-4 text-left font-mono leading-relaxed scrollbar-hide">
                  $ {commandStep1}
                </div>
              </div>
              <div className="mb-3 mt-4 flex items-baseline bg-gradient-to-t from-gray-600 via-gray-700 to-gray-900 bg-clip-text text-transparent dark:from-gray-200 dark:via-gray-50 dark:to-white">
                <span className="mr-4 text-4xl font-bold">2.</span>
                <div>
                  <h2 className="text-2xl font-bold tracking-tighter">
                    {t('updateSettings')}
                  </h2>
                </div>
              </div>
              <div className="relative mx-auto rounded-md bg-gray-900 p-4 text-white">
                <div className="absolute left-2 top-2 flex space-x-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500"></div>
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-400"></div>
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
                </div>
                <div className="absolute right-3 top-1.5 flex space-x-1.5">
                  <button
                    onClick={() => {
                      handleClick2()
                    }}
                    className="text-sm font-bold tracking-tight hover:text-gray-200"
                  >
                    {t(copyText2)}
                  </button>
                </div>
                <div className="overflow-x-scroll whitespace-nowrap pt-4 text-left font-mono leading-relaxed scrollbar-hide">
                  $ {commandStep2}
                </div>
              </div>
              <div className="mb-3 mt-4 flex items-baseline bg-gradient-to-t from-gray-600 via-gray-700 to-gray-900 bg-clip-text text-transparent dark:from-gray-200 dark:via-gray-50 dark:to-white">
                <span className="mr-4 text-4xl font-bold">3.</span>
                <div>
                  <h2 className="text-2xl font-bold tracking-tighter">
                    {t('setupSolv')}
                  </h2>
                </div>
              </div>
              <div className="relative mx-auto rounded-md bg-gray-900 p-4 text-white">
                <div className="absolute left-2 top-2 flex space-x-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500"></div>
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-400"></div>
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
                </div>
                <div className="absolute right-3 top-1.5 flex space-x-1.5">
                  <button
                    onClick={() => {
                      handleClick3()
                    }}
                    className="text-sm font-bold tracking-tight hover:text-gray-200"
                  >
                    {t(copyText3)}
                  </button>
                </div>
                <div className="overflow-x-scroll whitespace-nowrap pt-4 text-left font-mono leading-relaxed scrollbar-hide">
                  $ {commandStep3}
                </div>
              </div>
              <div className="mb-3 mt-4 flex items-baseline bg-gradient-to-t from-gray-600 via-gray-700 to-gray-900 bg-clip-text text-transparent dark:from-gray-200 dark:via-gray-50 dark:to-white">
                <span className="mr-4 text-4xl font-bold">...</span>
                <div>
                  <h2 className="text-2xl font-bold tracking-tighter">
                    {t('thatsAll')}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  )
}
