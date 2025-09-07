import { Header } from '@/components/common';
import { AddStayBtn } from '@/components/domain/admin';
import { AdminRoomList, FilterRoomStatus } from '@/components/domain/stays';
import { AdminStaysSearchParams } from '@/types/stays';

type Props = {
  searchParams: Promise<AdminStaysSearchParams>;
};

export default async function AdminStaysPage({ searchParams }: Props) {
  const searchParam = await searchParams;

  return (
    <>
      <Header title='우리 마을 사랑방' withoutBorder />
      <FilterRoomStatus searchParams={searchParam} />
      <AddStayBtn />
      <AdminRoomList searchParams={searchParam} />
    </>
  );
}
