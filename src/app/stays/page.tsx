import { BottomTabNav, Header } from '@/components/common';
import { RoomList, RoomTypeFilter, StayOptionFilters } from '@/components/domain/stays';
import { RoomType } from '@/types/stays';

type Props = {
  searchParams: Promise<{
    roomType?: RoomType;
    location?: string;
    schedule?: string;
    peopleCount?: string;
  }>;
};

export default async function StaysPage({ searchParams }: Props) {
  const { roomType, location, schedule, peopleCount } = await searchParams;

  const isAdmin = false; // TODO: 추후에 세션에서 관리자 여부 읽어오기

  return (
    <div>
      <Header title='사랑방 찾기' bgColor='green' />
      <main className='relative'>
        <RoomTypeFilter roomType={roomType} />
        <StayOptionFilters stayOption={{ location, schedule, peopleCount }} />
        <RoomList />
      </main>
      {!isAdmin && <BottomTabNav />}
    </div>
  );
}
