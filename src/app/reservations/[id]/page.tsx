type Props = {
  params: Promise<{ id: string }>;
};

export default async function ReservationDetailPage({ params }: Props) {
  const { id } = await params;

  return (
    <div>
      {id}번 예약건 상세.
      <br /> 도시-예약 취소 버튼 있음, 시골-없음 차이에 주의
    </div>
  );
}
