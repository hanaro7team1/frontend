type Props = {
  params: Promise<{ id: string }>;
};

export default async function StayDetailPage({ params }: Props) {
  const { id } = await params;

  return <div>{id}번 사랑방 상세 정보</div>;
}
