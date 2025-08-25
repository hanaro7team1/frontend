'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Txt } from '../atoms';
import CarouselArrow from '../atoms/CarouselArrow';

type Props = {
  images: string[];
  className?: string;
};

export default function Carousel({ images, className }: Props) {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    if (current > 0) setCurrent((prev) => prev - 1);
  };

  const nextSlide = () => {
    if (current < images.length - 1) setCurrent((prev) => prev + 1);
  };

  return (
    <div className={cn('relative flex w-full justify-center mt-5', className)}>
      <img
        src={images[current]}
        alt={`carousel-${current}`}
        className='h-[202px] w-[342px] object-cover'
      />

      <CarouselArrow direction='left' onClick={prevSlide} disabled={current === 0} />
      <CarouselArrow
        direction='right'
        onClick={nextSlide}
        disabled={current === images.length - 1}
      />

      <div className='bg-black-626/45 absolute -bottom-10 left-1/2 -translate-x-1/2 rounded px-2.5 py-0.5'>
        <Txt className={'text-white'} size={16} weight='cm'>
          {current + 1}/{images.length}
        </Txt>
      </div>
    </div>
  );
}
