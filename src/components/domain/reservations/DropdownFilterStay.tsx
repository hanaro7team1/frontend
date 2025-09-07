'use client';

import { ChevronDown } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';
import { useState } from 'react';
import { Txt } from '@/components/atoms';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { usePrivateData } from '@/hooks/api/useApi';
import { AdminStayListResponse } from '@/types/stays';

export default function DropdownFilterStay() {
  const { data } = usePrivateData<AdminStayListResponse>('/api/admin/stays');

  // 사랑방 이름 목록에 "모든 사랑방" 옵션 추가
  const entireOption = { title: '모든 사랑방', id: 0 };
  const stayList = data && [entireOption, ...data?.dtoList];

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 사랑방 필터 변경 핸들러
  const handleFilterStay = (stayId: number) => {
    const params = new URLSearchParams(searchParams);

    if (stayId === 0) {
      params.delete('stayId');
    } else {
      params.set('stayId', stayId.toString());
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  // 선택된 사랑방 상태 관리
  const stayId = searchParams.get('stayId') ?? '0';
  const stayName = stayList?.find(({ id }) => id.toString() === stayId)?.title ?? '모든 사랑방';
  const [selectedStay, setSelectedStay] = useState(stayName);

  return (
    <div className='flex justify-end'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='outline'
            className='flex justify-between rounded-[10px] p-5 [&[data-state=open]>svg]:rotate-180'
          >
            <Txt size={18}>{stayName}</Txt>
            <ChevronDown className='size-6 transition-transform duration-200' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup value={selectedStay} onValueChange={setSelectedStay}>
            {stayList?.map(({ id, title }) => (
              <DropdownMenuRadioItem
                key={id}
                value={id.toString()}
                onSelect={() => handleFilterStay(id)}
              >
                <Txt>{title}</Txt>
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
