'use client';

import { ChevronRight, ChevronRightIcon } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Txt } from '@/components/atoms';
import { BottomSheet } from '@/components/common';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { SheetClose } from '@/components/ui/sheet';
import { usePublicData } from '@/hooks/api/useApi';
import { Regions } from '@/types/stays';

export default function BottomSheetLocation() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const prevSearchParam = searchParams.get('location');

  const { data } = usePublicData<Regions>(`/api/regions${pathname}`);
  const [regions, setRegions] = useState<Regions>([]);

  useEffect(() => {
    if (data) {
      setRegions([{ region: '전체', detailRegions: [] }, ...data]);
    }
  }, [data]);

  const handleSelectRegion = (selectedRegion: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('location', selectedRegion);
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleSelectEntire = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('location');
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <BottomSheet>
      <div className='flex flex-col gap-4 p-4'>
        <Txt size={24} align='center'>
          지역을 선택하세요
        </Txt>

        <Accordion
          type='single'
          collapsible
          defaultValue={prevSearchParam ? prevSearchParam.split(' ')[0] : undefined}
        >
          {regions.map(({ region, detailRegions }) => (
            <AccordionItem key={region} value={region}>
              {region === '전체' ? (
                <SheetClose
                  onClick={handleSelectEntire}
                  className='focus-visible:border-ring focus-visible:ring-ring/50 flex w-full flex-1 items-start justify-between gap-4 rounded-md px-2 py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180'
                >
                  <Txt>{region}</Txt>
                  <ChevronRightIcon className='text-muted-foreground pointer-events-none size-8 shrink-0 translate-y-0.5 transition-transform duration-200' />
                </SheetClose>
              ) : (
                <>
                  <AccordionTrigger className='px-2'>
                    <Txt>{region}</Txt>
                  </AccordionTrigger>
                  <AccordionContent className='bg-black-626/5 -p-1 grid w-full grid-cols-2 text-balance'>
                    {detailRegions.map((detailRegion) => (
                      <SheetClose
                        key={detailRegion}
                        onClick={() => handleSelectRegion(region + ' ' + detailRegion)}
                        className='flex h-[50px] items-center justify-between p-4'
                      >
                        <Txt>{detailRegion}</Txt>
                        <ChevronRight size={20} color='gray' />
                      </SheetClose>
                    ))}
                  </AccordionContent>
                </>
              )}
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </BottomSheet>
  );
}
