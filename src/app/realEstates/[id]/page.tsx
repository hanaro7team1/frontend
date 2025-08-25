type Props = {
  params: Promise<{ id: string }>;
};

export default async function RealEstateDetailPage({ params }: Props) {
  const { id } = await params;

  return <div>{id}번 매물 상세</div>;
}
