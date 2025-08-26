import { RoomItem } from '.';
import { dummyRooms } from '../../../../public/dummy';

type Props = {
  isAdmin?: boolean;
};

export default function RoomList({ isAdmin = false }: Props) {
  return (
    <div className='m-4 space-y-4'>
      {dummyRooms.map((room) => (
        <RoomItem key={room.id} data={room} isAdmin={isAdmin} />
      ))}
    </div>
  );
}
