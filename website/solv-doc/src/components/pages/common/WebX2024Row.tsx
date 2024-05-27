import Container from '@/components/common/atoms/Container'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'

import WebX2024Key from '@/assets/img/work/webx2024key.jpg'
import { useMemo } from 'react'

export default function WebX2024Row() {
  const { t, i18n } = useTranslation()
  const isJapanese = useMemo(() => i18n.language === 'ja', [i18n])

  return (
    <>
      <Container className="mb-32 sm:mb-48">
        <div className="px-6 pb-10 pt-24 sm:pb-16 sm:pt-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="bg-gradient-to-t from-red-600 via-orange-500 to-yellow-400 bg-clip-text text-lg font-semibold leading-7 tracking-tight text-transparent">
              WebX 2024
            </h2>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tighter text-gray-900 dark:text-white sm:text-5xl">
              {t('common:WebX2024Row.title')}
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-200">
              {t('common:WebX2024Row.description')}
            </p>
          </div>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href={
                isJapanese
                  ? 'https://webx-asia.com/ja/ticket/?lang=JA&promo=spsr_Discount_elsoul'
                  : 'https://webx-asia.com/ticket/?lang=EN&promo=spsr_Discount_elsoul'
              }
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-500 dark:text-white dark:hover:text-gray-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('common:WebX2024Row.discountLink')}{' '}
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
        <div className="">
          <a
            href={
              isJapanese
                ? 'https://webx-asia.com/ja/'
                : 'https://webx-asia.com/'
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={WebX2024Key}
              width={1920}
              height={1080}
              className="shadow-2xl"
              alt="WebX 2024"
            />
          </a>
        </div>
      </Container>
    </>
  )
}
