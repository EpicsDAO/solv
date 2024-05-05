import { CheckCircleIcon } from '@heroicons/react/24/solid'
import Container from '@/components/common/atoms/Container'
import { useTranslation } from 'next-i18next'
import clsx from 'clsx'

const activity = [
  {
    type: 'done',
    text: 'common:RoadmapRow.2022.6',
    date: '2022.6',
    dateTime: '2022-06-02T10:00',
  },
  {
    type: 'done',
    text: 'common:RoadmapRow.2022.7',
    date: '2022.7',
    dateTime: '2022-07-02T10:00',
  },
  {
    type: 'done',
    text: 'common:RoadmapRow.2022.8',
    date: '2022.8',
    dateTime: '2022-08-02T10:00',
  },
  {
    type: 'done',
    text: 'common:RoadmapRow.2022.9',
    date: '2022.9',
    dateTime: '2022-09-02T10:00',
  },
  {
    type: 'done',
    text: 'common:RoadmapRow.2022.10',
    date: '2022.10',
    dateTime: '2022-10-02T10:00',
  },
  {
    type: 'done',
    text: 'common:RoadmapRow.2022.11',
    date: '2022.11',
    dateTime: '2022-11-02T10:00',
  },
  {
    type: 'done',
    text: 'common:RoadmapRow.2023.1',
    date: '2023.1',
    dateTime: '2023-01-02T10:00',
  },
  {
    type: 'done',
    text: 'common:RoadmapRow.2023.4',
    date: '2023.4',
    dateTime: '2023-04-02T10:00',
  },
  {
    type: 'done',
    text: 'common:RoadmapRow.2023.9',
    date: '2023.9',
    dateTime: '2023-09-02T10:00',
  },
  {
    type: 'done',
    text: 'common:RoadmapRow.2023.12',
    date: '2023.12',
    dateTime: '2023-12-02T10:00',
  },
  {
    type: 'done',
    text: 'common:RoadmapRow.2024.2',
    date: '2024.2',
    dateTime: '2024-02-02T10:00',
  },
  {
    type: 'done',
    text: 'common:RoadmapRow.2024.4',
    date: '2024.4',
    dateTime: '2024-04-02T10:00',
  },
  {
    type: 'done',
    text: 'common:RoadmapRow.2024.5',
    date: '2024.5',
    dateTime: '2024-05-02T10:00',
  },
  {
    type: 'yet',
    text: 'common:RoadmapRow.2024.8',
    date: '2024.8',
    dateTime: '2024-08-02T10:00',
  },
  {
    type: 'yet',
    text: 'common:RoadmapRow.2024.10',
    date: '2024.10',
    dateTime: '2024-010-02T10:00',
  },
  {
    type: 'yet',
    text: 'common:RoadmapRow.2025.4',
    date: '2025.4',
    dateTime: '2025-04-02T10:00',
  },
  {
    type: 'yet',
    text: 'common:RoadmapRow.2025.9',
    date: '2025.9',
    dateTime: '2025-09-02T10:00',
  },
  {
    type: 'yet',
    text: 'common:RoadmapRow.2026.4',
    date: '2026.4',
    dateTime: '2026-04-02T10:00',
  },
]

export default function RoadmapRow() {
  const { t } = useTranslation()
  return (
    <>
      <div className="mx-auto max-w-2xl px-4 py-48 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="pb-16 text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-5xl">
            Roadmap
          </h2>
        </div>
        <ul role="list" className="space-y-6">
          {activity.map((activityItem, activityItemIdx) => (
            <li
              key={`RoadmapRow ${activityItem.text}`}
              className="relative flex gap-x-4"
            >
              <div
                className={clsx(
                  activityItemIdx === activity.length - 1 ? 'h-6' : '-bottom-6',
                  'absolute left-0 top-0 flex w-6 justify-center'
                )}
              >
                <div className="w-px bg-gray-200 dark:bg-gray-500" />
              </div>

              <div className="relative flex h-6 w-6 flex-none items-center justify-center bg-white dark:bg-gray-900">
                {activityItem.type === 'done' ? (
                  <div className="h-1.5 w-1.5 rounded-full bg-green-100 ring-1 ring-green-300" />
                ) : (
                  <div className="h-1.5 w-1.5 rounded-full bg-yellow-100 ring-1 ring-yellow-300" />
                )}
              </div>
              <time
                dateTime={activityItem.dateTime}
                className={clsx(
                  activityItem.type === 'done'
                    ? 'text-gray-500 dark:text-gray-300'
                    : 'text-gray-900 dark:text-gray-50',
                  'flex-none py-0.5 text-sm font-bold leading-5'
                )}
              >
                {activityItem.date}
              </time>
              <p
                className={clsx(
                  activityItem.type === 'done'
                    ? 'text-gray-400 dark:text-gray-400'
                    : 'text-gray-700 dark:text-gray-200',
                  'flex-auto py-0.5 text-sm leading-5 '
                )}
              >
                {t(activityItem.text)}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
