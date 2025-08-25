type Props = {
  params: Promise<{ id: string }>;
};

export default async function AdminStayEditPage({ params }: Props) {
  const { id } = await params;

  return <div>{id}번 사랑방 정보 수정</div>;
}
