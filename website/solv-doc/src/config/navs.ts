// Icons => https://heroicons.com/
import {
  HeartIcon,
  HomeIcon,
  RocketLaunchIcon,
  CogIcon,
  CloudIcon,
  ChartBarIcon,
  CircleStackIcon,
  ArrowPathIcon,
  PresentationChartLineIcon,
  AcademicCapIcon,
  ShareIcon,
} from '@heroicons/react/24/outline'

export const defaultMainNav = [
  {
    name: 'common:navs.defaultMainNav.doc',
    href: '/doc/',
  },
  {
    name: 'common:navs.defaultMainNav.quickstart',
    href: '/doc/quickstart/start-solv/',
  },
  {
    name: 'common:navs.defaultMainNav.enterprise',
    href: '/enterprise/',
  },
  {
    name: 'common:navs.defaultMainNav.news',
    href: '/news/',
  },
  {
    name: 'common:navs.defaultMainNav.dao',
    href: '/dao/',
  },
]

export const commonFooterNav = [
  {
    name: 'common:navs.commonFooterNav.doc',
    href: '/doc/',
  },
  {
    name: 'common:navs.commonFooterNav.quickstart',
    href: '/doc/quickstart/start-solv/',
  },
  {
    name: 'common:navs.commonFooterNav.enterprise',
    href: '/enterprise/',
  },
  {
    name: 'common:navs.commonFooterNav.news',
    href: '/news/',
  },
  {
    name: 'common:navs.commonFooterNav.dao',
    href: '/dao/',
  },
  {
    name: 'common:navs.commonFooterNav.press-kits',
    href: '/press-kits/',
  },
  {
    name: 'common:navs.commonFooterNav.privacy',
    href: '/legal/privacy-policy/',
  },
]

export const docMenuNav = [
  { name: 'doc:menuNav.home', href: '/doc/', icon: HomeIcon },
  {
    name: 'doc:menuNav.general.groupTitle',
    children: [
      {
        name: 'doc:menuNav.general.motivation',
        href: '/doc/general/motivation/',
        icon: HeartIcon,
      },
    ],
  },
  {
    name: 'doc:menuNav.quickstart.groupTitle',
    children: [
      {
        name: 'doc:menuNav.quickstart.start-solv',
        href: '/doc/quickstart/start-solv/',
        icon: RocketLaunchIcon,
      },
      {
        name: 'doc:menuNav.quickstart.update-to-v3',
        href: '/doc/quickstart/update-to-v3/',
        icon: ArrowPathIcon,
      },
    ],
  },
  {
    name: 'doc:menuNav.tutorial.groupTitle',
    children: [
      {
        name: 'doc:menuNav.tutorial.chapter1',
        href: '/doc/tutorial/chapter1/',
        icon: AcademicCapIcon,
      },
      {
        name: 'doc:menuNav.tutorial.chapter2',
        href: '/doc/tutorial/chapter2/',
        icon: CircleStackIcon,
      },
      {
        name: 'doc:menuNav.tutorial.chapter3',
        href: '/doc/tutorial/chapter3/',
        icon: CloudIcon,
      },
      {
        name: 'doc:menuNav.tutorial.chapter4',
        href: '/doc/tutorial/chapter4/',
        icon: PresentationChartLineIcon,
      },
      {
        name: 'doc:menuNav.tutorial.chapter5',
        href: '/doc/tutorial/chapter5/',
        icon: ShareIcon,
      },
    ],
  },
]

export const docHeaderNav = [
  {
    name: 'doc:headerNav.home',
    href: '/',
  },
  {
    name: 'doc:headerNav.news',
    href: '/news/',
  },
]
