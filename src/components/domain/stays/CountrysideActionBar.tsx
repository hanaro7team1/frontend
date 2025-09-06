'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { privateApi } from '@/lib/axios-client';
import { FixedBottomButton, Modal } from '@/components/common';
import { StayDeleteResponse } from '@/types/stays';

type Props = {
  id: number;
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function CountrysideActionBar({ id, onEdit, onDelete }: Props) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);

  const [deleted, setDeleted] = useState<boolean | null>(null);
  const [hasUpcomingReservations, setHasUpcomingReservations] = useState<boolean | null>(null);
  const [deleteMsg, setDeleteMsg] = useState<string | null>(null);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleOpenResultModal = () => setIsResultModalOpen(true);
  const handleCloseResultModal = () => setIsResultModalOpen(false);

  const handleDelete = async () => {
    try {
      const { data } = await privateApi.delete<StayDeleteResponse>(`/api/admin/stays/${id}`);

      let msg: string;
      if (data.deleted === false) {
        msg = '이미 삭제된 사랑방입니다.';
      } else if (data.deleted === true && data.hasUpcomingReservations === true) {
        msg = '방문 전 예약이 있습니다.\n[예약 관리하기]를 통해\n예약자에게 연락 바랍니다.';
      } else {
        msg = '삭제가 완료되었습니다.';
      }

      setDeleted(data.deleted);
      setHasUpcomingReservations(data.hasUpcomingReservations);
      setDeleteMsg(msg);
    } catch {
      setDeleted(null);
      setHasUpcomingReservations(null);
      setDeleteMsg('삭제 요청 중 오류가 발생했습니다.');
    } finally {
      handleCloseModal();
      handleOpenResultModal();
    }
  };

  const goList = () => {
    handleCloseResultModal();

    if (deleted === null) return;

    if (deleted === true && hasUpcomingReservations === true) {
      router.push('/reservations');
    } else {
      router.push('/admin/stays');
    }
  };

  return (
    <>
      <FixedBottomButton
        leftBtnText='사랑방 삭제하기'
        rightBtnText='내용 수정하기'
        isPink
        onClickLeftBtn={handleOpenModal}
        onClickRightBtn={
          onEdit ??
          (() => {
            router.push(`/admin/stays/${id}`);
          })
        }
      />

      {/* 삭제 확인 모달 */}
      {isModalOpen && (
        <Modal
          leftBtnText='취소'
          rightBtnText='삭제하기'
          onClickLeftBtn={handleCloseModal}
          onClickRightBtn={handleDelete}
          isPink
        >
          사랑방을 삭제하시겠습니까?
        </Modal>
      )}

      {/* 삭제 결과 모달 */}
      {isResultModalOpen && (
        <Modal
          leftBtnText='닫기'
          rightBtnText='확인'
          onClickLeftBtn={handleCloseResultModal}
          onClickRightBtn={goList}
          isPink
        >
          <span className='whitespace-pre-line'>{deleteMsg}</span>
        </Modal>
      )}
    </>
  );
}
