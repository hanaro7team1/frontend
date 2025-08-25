type Props = {
  params: Promise<{ id: string }>;
};

export default async function FestivalDetailPage({ params }: Props) {
  const { id } = await params;

  return <div>{id}번 축제 상세</div>;
}
