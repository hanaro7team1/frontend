import { RoomItem } from '.';
import { dummyRooms } from '../../../../public/dummy';

export default function RoomList() {
  return (
    <div className='m-4 space-y-4'>
      {dummyRooms.map((room) => (
        <RoomItem key={room.id} item={room} />
      ))}
    </div>
  );
}
