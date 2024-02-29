import { useCallback, useState } from 'react'
import { useTranslation } from 'next-i18next'

import Image from 'next/image'
import { Button } from '@/components/common/atoms/Button'
import { copyToClipboard } from '@/utils/userAction'

export default function LatitudeCouponRow() {
  const { t } = useTranslation()

  const [copyText1, setCopyText1] = useState('common:copy')

  const handleClick1 = useCallback(() => {
    copyToClipboard('ELSOUL100')
    setCopyText1('common:copied')

    setTimeout(() => {
      setCopyText1('common:copy')
    }, 2000)
  }, [])

  return (
    <>
      <div className="overflow-hidden py-24 sm:py-32 lg:pb-60 lg:pt-32">
        <div className="mx-auto max-w-7xl md:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-2 lg:items-center">
            <div className="px-6 lg:px-0 lg:pr-4 lg:pt-4">
              <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg">
                <h2 className="bg-gradient-to-tl from-green-500 via-blue-400 to-purple-400 bg-clip-text text-base font-semibold leading-7 text-transparent">
                  {t('common:LatitudeCouponRow.subtitle')}
                </h2>
                <p className="mt-2 text-3xl font-extrabold tracking-tighter text-gray-900 dark:text-white sm:text-4xl">
                  {t('common:LatitudeCouponRow.title')}
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
                  {t('common:LatitudeCouponRow.description')}
                </p>
              </div>
              <div className="relative mx-auto my-6 rounded-md bg-gray-900 p-4 text-white">
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
                    className="text-sm font-bold hover:text-gray-200"
                  >
                    {t(copyText1)}
                  </button>
                </div>
                <div className="overflow-x-scroll whitespace-nowrap pt-4 text-left font-mono leading-relaxed scrollbar-hide">
                  {'🎫 '}
                  {t('common:LatitudeCouponRow.couponCode')}: ELSOUL100
                </div>
              </div>
              <div className="mt-12 flex gap-x-6">
                <Button
                  href="https://www.latitude.sh/dashboard/signup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className=""
                >
                  {t('common:LatitudeCouponRow.register')}
                </Button>
              </div>
            </div>
            <div className="sm:px-6 lg:px-0">
              <div className="shadow-2xl">
                <a
                  href="https://www.latitude.sh/dashboard/signup"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="https://storage.googleapis.com/epics-bucket/Validator/LatitudeCoupon.png"
                    alt="Latitude Coupon"
                    className="w-[52rem] shadow-xl sm:w-[64rem]"
                    width={1920}
                    height={1080}
                    unoptimized
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
