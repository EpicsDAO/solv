//@ts-nocheck
'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import BlinksWalletIndicator from '@/components/solana/BlinksWalletIndicator'
import BlinksComponent from '@/components/solana/BlinksComponent'
import { VALIDATORS_BLINKS_BASE_URL } from '@/constants/links'

export default function DirectStakingTabs() {
  const t = useTranslations()

  const [tabValue, setTabValue] = useState('epics')

  return (
    <>
      <div className="grid gap-6">
        <Tabs value={tabValue} onValueChange={setTabValue} className="w-full">
          <TabsList className="mb-7 grid w-full grid-cols-2">
            <TabsTrigger value="epics">Epics DAO</TabsTrigger>
            <TabsTrigger value="labo">ELSOUL</TabsTrigger>
          </TabsList>
          <TabsContent value="epics">
            <BlinksComponent
              actionUrl={`${VALIDATORS_BLINKS_BASE_URL}/v1/stake/delegate?validator=epics`}
            />
          </TabsContent>
          <TabsContent value="labo">
            <BlinksComponent
              actionUrl={`${VALIDATORS_BLINKS_BASE_URL}/v1/stake/delegate?validator=labo`}
            />
          </TabsContent>
        </Tabs>
        <BlinksWalletIndicator />
      </div>
    </>
  )
}
