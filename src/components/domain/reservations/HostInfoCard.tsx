import { Phone, User } from 'lucide-react';
import { ShadowBox, Txt } from '@/components/atoms';
import { InfoRow } from '.';

type Props = {
  data: {
    hostName: string;
    hostTel: string;
  };
};

export default function HostInfoCard({ data }: Props) {
  const { hostName, hostTel } = data;

  const hostInfo = [
    { label: '이름', icon: User, value: hostName },
    { label: '연락처', icon: Phone, value: hostTel },
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
