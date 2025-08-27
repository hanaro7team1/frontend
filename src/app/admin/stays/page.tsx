import { Header } from '@/components/common';
import { RoomList, RoomStatusFilter } from '@/components/domain/stays';
import { RoomStatus } from '@/types/stays';

type Props = {
  searchParams: Promise<{ roomStatus: RoomStatus }>;
};

export default async function AdminStaysPage({ searchParams }: Props) {
  const { roomStatus } = await searchParams;

  return (
    <>
      <Header title='우리 마을 사랑방' withoutBorder />
      <RoomStatusFilter roomStatus={roomStatus} />
      <RoomList isAdmin />
    </>
  );
}
