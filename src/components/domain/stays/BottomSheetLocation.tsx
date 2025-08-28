'use client';

import { ChevronRight } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Txt } from '@/components/atoms';
import { BottomSheet } from '@/components/common';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { SheetClose } from '@/components/ui/sheet';
import { dummyRegions } from '../../../../public/dummy';

export default function BottomSheetLocation() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const prevSearchParam = searchParams.get('location');

  const handleDone = (selectedRegion: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('location', selectedRegion);
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <BottomSheet>
      <div className='flex flex-col gap-4 p-4'>
        <Txt size={24} align='center'>
          숙박할 지역을 선택하세요
        </Txt>

        <Accordion
          type='single'
          collapsible
          defaultValue={prevSearchParam ? prevSearchParam.split(' ')[0] : undefined}
        >
          {Object.entries(dummyRegions).map(([region, detailRegions]) => (
            <AccordionItem key={region} value={region}>
              <AccordionTrigger className='px-2'>
                <Txt>{region}</Txt>
              </AccordionTrigger>
              <AccordionContent className='bg-black-626/5 -p-1 grid w-full grid-cols-2 text-balance'>
                {detailRegions.map((detailRegion) => (
                  <SheetClose
                    key={detailRegion}
                    onClick={() => handleDone(region + ' ' + detailRegion)}
                    className='flex h-[50px] items-center justify-between p-4'
                  >
                    <Txt>{detailRegion}</Txt>
                    <ChevronRight size={20} color='gray' />
                  </SheetClose>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </BottomSheet>
  );
}
