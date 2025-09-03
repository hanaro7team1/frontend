import { CalendarCheck, Leaf, Phone, User, Users } from 'lucide-react';
import { ShadowBox, Txt } from '@/components/atoms';
import { InfoRow } from '.';

type Props = {
  data: {
    memberName: string;
    startDate: string;
    endDate: string;
    personCnt: number;
    isFarm: boolean;
    memberPhone: string;
  };
};

export default function GuestInfoCard({ data }: Props) {
  const { memberName, startDate, endDate, personCnt, isFarm, memberPhone } = data;

  const guestInfo = [
    { label: '이름', icon: User, value: memberName },
    {
      label: '일정',
      icon: CalendarCheck,
      value: `${startDate.replaceAll('-', '.')} - ${endDate.replaceAll('-', '.')}`,
    },
    { label: '인원', icon: Users, value: personCnt + '' },
    { label: '농장체험', icon: Leaf, value: isFarm ? '희망' : '희망 안 함' },
    { label: '연락처', icon: Phone, value: memberPhone },
  ];

  return (
    <div className='flex flex-col gap-2.5'>
      <Txt>손님 정보</Txt>
      <ShadowBox className='gap-3.5 px-3.5 py-3'>
        {guestInfo.map(({ label, icon, value }) => (
          <InfoRow key={label} icon={icon} label={label} value={value} />
        ))}
      </ShadowBox>
    </div>
  );
}
