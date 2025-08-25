type Props = {
  params: Promise<{ id: string }>;
};

export default async function StayBookingPage({ params }: Props) {
  const { id } = await params;

  return <div>{id}번 사랑방의 예약 스텝</div>;
}
