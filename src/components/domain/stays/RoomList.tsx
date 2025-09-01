import { dummyRooms } from '../../../../public/dummy';
import { EstateItem } from '../realEstates';

export default function RoomList() {
  return (
    <div className='m-4 space-y-4'>
      {dummyRooms.map((room) => (
        <EstateItem key={room.id} data={{ ...room, price: '전세 8000만원' }} />
      ))}
    </div>
  );
}
