'use client';

import * as SliderPrimitive from '@radix-ui/react-slider';
import * as React from 'react';
import { cn } from '@/lib/utils';
import { Txt } from '../atoms';

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  const _values = React.useMemo(
    () => (Array.isArray(value) ? value : Array.isArray(defaultValue) ? defaultValue : [min, max]),
    [value, defaultValue, min, max],
  );
  return (
    <SliderPrimitive.Root
      data-slot='slider'
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        'relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col',
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot='slider-track'
        className={cn(
          'bg-gray-6d6 relative grow rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5',
        )}
      >
        <SliderPrimitive.Range
          data-slot='slider-range'
          className={cn(
            'bg-green-49d absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full',
          )}
        >
          {/* 툴팁 */}
          <div className='absolute -top-16 left-1/2 z-50 -translate-x-1/2 rounded-md border border-gray-300 bg-white px-2 py-1 whitespace-nowrap shadow-md'>
            <Txt size={18}>
              {_values[0] !== 0 && '최소 ' + _values[0] + '만원' + ' - '}
              {_values[1] === 10000 ? '최대 1억' : '최대 ' + _values[1] + '만원'}
            </Txt>
            <div className='absolute -bottom-2 left-1/2 h-0 w-0 -translate-x-1/2 border-x-6 border-t-6 border-x-transparent border-t-white drop-shadow-sm'></div>
          </div>
        </SliderPrimitive.Range>
      </SliderPrimitive.Track>
      <div className='absolute -bottom-13 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1'>
        <div className='bg-black-626/30 h-4 w-0.5' />
        <Txt size={16} className='text-black-626/30'>
          {max / 2 + '만원'}
        </Txt>
      </div>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot='slider-thumb'
          key={index}
          className='bg-background ring-ring/50 relative block size-8 shrink-0 rounded-full border shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50'
        />
      ))}
    </SliderPrimitive.Root>
  );
}

export { Slider };
