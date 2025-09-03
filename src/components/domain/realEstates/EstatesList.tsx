import { EstateItem } from '.';
import { dummyRooms } from '../../../../public/dummy';

type Props = {
  searchParams: RealEstatesSearchParams;
};

export default function EstatesList({ searchParams }: Props) {
  //TODO: 실제 API 연동

  return (
    <div className='m-4 space-y-4'>
      {dummyRooms.map((room) => (
        <EstateItem key={room.id} data={{ ...room, price: '전세 8000만원' }} />
      ))}
    </div>
  );
}
