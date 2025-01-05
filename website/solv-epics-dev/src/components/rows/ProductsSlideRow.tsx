'use client'

import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import ProductsElsolRow from './products/ProductsElsolRow'
import ProductsErpcRow from './products/ProductsErpcRow'
import ProductsValidatorsSolutionsRow from './products/ProductsValidatorsSolutionsRow'
import { cn } from '@/lib/utils'
import ProductsSkeetRow from './products/ProductsSkeetRow'
import ProductsBuidlersCollectiveRow from './products/ProductsBuidlersCollectiveRow'
import DAOsValidatorsRow from './daos/DAOsValidatorsRow'
import DAOsEpicsRow from './daos/DAOsEpicsRow'
import ProductsSLVRow from './products/ProductsSLVRow'

export default function ProductsSlideRow() {
  return (
    <>
      {/*@ts-ignore*/}
      <Carousel
        plugins={[
          Autoplay({
            delay: 6400,
          }),
        ]}
        className={cn(
          'h-[896px] w-full hover:cursor-grab active:cursor-grabbing sm:h-[1152px]',
          'bg-gradient-to-b from-white via-zinc-100 to-white',
          'dark:from-zinc-950 dark:via-indigo-950 dark:to-zinc-950',
        )}
      >
        {/*@ts-ignore*/}
        <CarouselContent>
          {/*@ts-ignore*/}
          <CarouselItem>
            <ProductsErpcRow />
          </CarouselItem>
          {/*@ts-ignore*/}
          <CarouselItem>
            <ProductsValidatorsSolutionsRow />
          </CarouselItem>
          {/*@ts-ignore*/}
          <CarouselItem>
            <ProductsElsolRow />
          </CarouselItem>
          {/*@ts-ignore*/}
          <CarouselItem>
            <ProductsSLVRow />
          </CarouselItem>
          {/*@ts-ignore*/}
          <CarouselItem>
            <ProductsSkeetRow />
          </CarouselItem>
          {/*@ts-ignore*/}
          <CarouselItem>
            <ProductsBuidlersCollectiveRow />
          </CarouselItem>
          {/*@ts-ignore*/}
          <CarouselItem>
            <DAOsValidatorsRow />
          </CarouselItem>
          {/*@ts-ignore*/}
          <CarouselItem>
            <DAOsEpicsRow />
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </>
  )
}
