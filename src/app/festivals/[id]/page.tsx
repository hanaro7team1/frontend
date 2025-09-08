import { CalendarCheck, HandCoinsIcon, Link, MapPinned } from 'lucide-react';
import Image from 'next/image';
import NextLink from 'next/link';
import { publicApi } from '@/lib/axios';
import { Txt } from '@/components/atoms';
import { Header } from '@/components/common';
import { dDayCal } from '@/utils/festivals/dateCal';
import { FestivalDetailResponse } from '@/types/festivals';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function FestivalDetailPage({ params }: Props) {
  const { id } = await params;
  const commonPosision = 'flex items-center gap-2';
  const fixIconSize = 'flex-none shrink-0';

  const { data } = await publicApi.get<FestivalDetailResponse>(`/api/festivals/${id}`);
  const { title, startDate, endDate, description, location, price, url, imageUrl } = data;

  const dateFormat = (s: string) => `${s.slice(0, 4)}.${s.slice(5, 7)}.${s.slice(8, 10)}`;

  const dDay = (startDate: string, endDate: string) => {
    const n = dDayCal(startDate);
    const e = dDayCal(endDate);
    if (!Number.isFinite(n)) return '';

    return n > 0 ? `D-${n}` : e > 0 ? 'D-Day' : '종료';
  };

  return (
    <div>
      <Header title='축제 자세히 보기' bgColor='white' />
      <div className='relative h-[320px] w-full shrink-0 overflow-hidden'>
        {/* <Image src='/images/dummy_image.png' alt={title} fill className="object-cover"/> */}
        <Image src={imageUrl} alt={title} fill className='object-cover' />
      </div>
      <div className='flex flex-col gap-4 p-5'>
        <div className='flex items-center justify-between'>
          <Txt size={24} weight='bold'>
            {title}
          </Txt>
          <div className='bg-gray-6d6/50 inline-flex w-fit items-center rounded-lg px-3'>
            <Txt size={22} className='text-green-49d'>
              {dDay(startDate, endDate)}
            </Txt>
          </div>
        </div>

        <div className={`${commonPosision}`}>
          <CalendarCheck color='var(--code-theme1)' className={`${fixIconSize}`} size={25} />
          <Txt size={24}>
            {dateFormat(startDate)} ~ {dateFormat(endDate)}
          </Txt>
        </div>

        <div>
          <Txt className='text-gray-070'>{description}</Txt>
        </div>

        <div className={`${commonPosision}`}>
          <MapPinned color='var(--code-theme1)' className={`${fixIconSize}`} size={25} />
          <Txt>{location}</Txt>
        </div>

        <div className={`${commonPosision}`}>
          <HandCoinsIcon color='var(--code-theme1)' className={`${fixIconSize}`} size={25} />
          <Txt>{price === 0 ? '무료' : `${price} 원`}</Txt>
        </div>

        <div className={`${commonPosision}`}>
          <Link color='var(--code-theme1)' className={`${fixIconSize}`} size={25} />
          <NextLink href={url} target='_blank' rel='noopener noreferrer'>
            <Txt className='underline underline-offset-4'>축제 링크</Txt>
          </NextLink>
        </div>
      </div>
    </div>
  );
}
