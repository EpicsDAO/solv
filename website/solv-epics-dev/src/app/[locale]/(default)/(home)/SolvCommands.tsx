'use client'

import { useTranslations } from 'next-intl'
import { useCopyToClipboard } from '@/hooks/utils/useCopyToClipboard'
import { mainShardGradation } from '@/lib/decoration'
import { cn } from '@/lib/utils'

const commandStep1 = `bash -c "$(curl -sSfL "https://solv-storage.validators.solutions/install")"`
const commandStep2 = 'cd ~ && source ~/.profile'
const commandStep3 = 'solv setup'

export default function SolvCommands() {
  const t = useTranslations()

  const { isCopied: isCopied1, copyToClipboard: copyToClipboard1 } =
    useCopyToClipboard({ timeout: 2000 })
  const { isCopied: isCopied2, copyToClipboard: copyToClipboard2 } =
    useCopyToClipboard({ timeout: 2000 })
  const { isCopied: isCopied3, copyToClipboard: copyToClipboard3 } =
    useCopyToClipboard({ timeout: 2000 })

  return (
    <>
      <div className="grid w-full gap-4 p-3">
        <div className="mx-auto w-full max-w-lg">
          <div
            className={cn(
              'mb-3 flex flex-wrap items-baseline',
              mainShardGradation,
            )}
          >
            <span className="mr-4 text-3xl font-bold sm:text-4xl">1.</span>
            <h2 className="text-2xl font-bold tracking-tight">
              {t('(home).SolvCommands.title1')}
            </h2>
          </div>
          <div className="w-full max-w-full rounded-md bg-zinc-700 text-white">
            <div className="flex flex-row items-center justify-between rounded-t-md bg-zinc-800 p-3">
              <div className="flex space-x-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
              </div>
              <button
                onClick={() => {
                  copyToClipboard1(commandStep1)
                }}
                className="text-sm font-bold tracking-tight hover:text-gray-200"
              >
                {isCopied1 ? t('common.copied') : t('common.copy')}
              </button>
            </div>

            <div className="overflow-x-scroll p-3 pt-4 text-left font-mono scrollbar-hide">
              <p className="w-0 whitespace-nowrap">$ {commandStep1}</p>
            </div>
          </div>
        </div>
        <div className="mx-auto w-full max-w-lg">
          <div
            className={cn(
              'mb-3 flex flex-wrap items-baseline',
              mainShardGradation,
            )}
          >
            <span className="mr-4 text-3xl font-bold sm:text-4xl">2.</span>
            <h2 className="text-2xl font-bold tracking-tight">
              {t('(home).SolvCommands.title2')}
            </h2>
          </div>
          <div className="w-full max-w-full rounded-md bg-zinc-700 text-white">
            <div className="flex flex-row items-center justify-between rounded-t-md bg-zinc-800 p-3">
              <div className="flex space-x-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
              </div>
              <button
                onClick={() => {
                  copyToClipboard2(commandStep2)
                }}
                className="text-sm font-bold tracking-tight hover:text-gray-200"
              >
                {isCopied2 ? t('common.copied') : t('common.copy')}
              </button>
            </div>

            <div className="overflow-x-scroll p-3 pt-4 text-left font-mono scrollbar-hide">
              <p className="w-0 whitespace-nowrap">$ {commandStep2}</p>
            </div>
          </div>
        </div>
        <div className="mx-auto w-full max-w-lg">
          <div
            className={cn(
              'mb-3 flex flex-wrap items-baseline',
              mainShardGradation,
            )}
          >
            <span className="mr-4 text-3xl font-bold sm:text-4xl">3.</span>
            <h2 className="text-2xl font-bold tracking-tight">
              {t('(home).SolvCommands.title3')}
            </h2>
          </div>
          <div className="w-full max-w-full rounded-md bg-zinc-700 text-white">
            <div className="flex flex-row items-center justify-between rounded-t-md bg-zinc-800 p-3">
              <div className="flex space-x-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
              </div>
              <button
                onClick={() => {
                  copyToClipboard3(commandStep3)
                }}
                className="text-sm font-bold tracking-tight hover:text-gray-200"
              >
                {isCopied3 ? t('common.copied') : t('common.copy')}
              </button>
            </div>

            <div className="overflow-x-scroll p-3 pt-4 text-left font-mono scrollbar-hide">
              <p className="w-0 whitespace-nowrap">$ {commandStep3}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
