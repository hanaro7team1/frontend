
//추후 실제 DTO로 교체 예정
export type ReservationInfo = {
  id: number;
  name: string;
  location: string;
  status: '방문 중' | '방문 전' | '방문 완료' | '예약 취소';
  imgUrl: string;
};

//추후 실제 DTO로 교체 예정
export type RoomInfo = {
  id: number;
  name: string;
  location: string;
  hostName?: string;
  status: '예약 가능' | '예약 마감' | '예약 닫힘';
  imgUrl: string;
};

export const dummyRooms: RoomInfo[] = [
  {
    id: 1,
    name: '가람마을 사랑방 1호',
    location: '전남 해남 화산면',
    hostName: '김갑순',
    status: '예약 가능',
    imgUrl: '/images/dummy_image.png',
  },
  {
    id: 2,
    name: '가람마을 사랑방 2호',
    location: '전남 해남 화산면',
    hostName: '김을순',
    status: '예약 마감',
    imgUrl: '/images/dummy_image.png',
  },
  {
    id: 3,
    name: '가람마을 사랑방 3호',
    location: '전남 해남 화산면',
    hostName: '김병순',
    status: '예약 닫힘',
    imgUrl: '/images/dummy_image.png',
  },
  {
    id: 4,
    name: '가람마을 사랑방 4호',
    location: '전남 해남 화산면',
    hostName: '김정순',
    status: '예약 가능',
    imgUrl: '/images/dummy_image.png',
  },
  {
    id: 5,
    name: '가람마을 사랑방 5호',
    location: '전남 해남 화산면',
    hostName: '김무순',
    status: '예약 마감',
    imgUrl: '/images/dummy_image.png',
  },
  {
    id: 6,
    name: '가람마을 사랑방 6호',
    location: '전남 해남 화산면',
    hostName: '김기순',
    status: '예약 닫힘',
    imgUrl: '/images/dummy_image.png',
  },
];

export const dummyReservationDetail = {
  stayPicURL: '/images/sample1.png',
  stayId: 2,
  stayName: '가람마을 사랑방 3호',
  stayAddress: '경상북도 안동시 임하면 천등산길 124-16',
  guestName: '윤서연',
  schedule: '25.09.09 (화) - 25.09.13 (토)',
  peopleCount: '2명',
  doWork: '희망 안 함',
  guestTel: '010-1234-5678',
  hostName: '김갑순',
  hostTel: '010-8765-4321',
};
