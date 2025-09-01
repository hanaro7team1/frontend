import { CalendarCheck, Leaf, Phone, User, Users } from 'lucide-react';
import { ShadowBox, Txt } from '@/components/atoms';
import { InfoRow } from '.';

type Props = {
  data: {
    guestName: string;
    schedule: string;
    peopleCount: string;
    doWork: string;
    guestTel: string;
  };
};

export default function GuestInfoCard({ data }: Props) {
  const { guestName, schedule, peopleCount, doWork, guestTel } = data;

  const guestInfo = [
    { label: '이름', icon: User, value: guestName },
    { label: '일정', icon: CalendarCheck, value: schedule },
    { label: '인원', icon: Users, value: peopleCount },
    { label: '농장체험', icon: Leaf, value: doWork },
    { label: '연락처', icon: Phone, value: guestTel },
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
