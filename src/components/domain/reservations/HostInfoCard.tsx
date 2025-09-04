import { Phone, User } from 'lucide-react';
import { ShadowBox, Txt } from '@/components/atoms';
import { InfoRow } from '.';

type Props = {
  data: {
    ownerName: string;
    ownerPhone: string;
  };
};

export default function HostInfoCard({ data }: Props) {
  const { ownerName, ownerPhone } = data;

  const hostInfo = [
    { label: '이름', icon: User, value: ownerName },
    { label: '연락처', icon: Phone, value: ownerPhone },
  ];

  return (
    <div className='flex flex-col gap-2.5'>
      <Txt>사랑방 주인 정보</Txt>
      <ShadowBox className='gap-3.5 px-3.5 py-3'>
        {hostInfo.map(({ label, icon, value }) => (
          <InfoRow key={label} icon={icon} label={label} value={value} />
        ))}
      </ShadowBox>
    </div>
  );
}
