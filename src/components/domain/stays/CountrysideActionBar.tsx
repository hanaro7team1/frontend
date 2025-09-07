'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { privateApi } from '@/lib/axios-client';
import { FixedBottomButton, Modal } from '@/components/common';
import { useToast } from '@/components/common/ToastContext';
import { StayDeleteResponse } from '@/types/stays';

type Props = {
  id: number;
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function CountrysideActionBar({ id, onEdit }: Props) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpcomingModalOpen, setIsUpcomingModalOpen] = useState(false);

  const { showToast } = useToast();

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleOpenUpcomingModal = () => setIsUpcomingModalOpen(true);
  const handleCloseUpcomingModal = () => setIsUpcomingModalOpen(false);

  const handleDelete = async () => {
    try {
      const { data } = await privateApi.delete<StayDeleteResponse>(`/api/admin/stays/${id}`);

      if (data.deleted && !data.hasUpcomingReservations) {
        showToast('삭제가 완료되었어요', 'success', 'middle');
        router.refresh();
        router.replace('/admin/stays');
      } else if (!data.deleted && !data.hasUpcomingReservations) {
        showToast('이미 삭제된 사랑방이에요', 'success', 'middle');
        router.refresh();
        router.replace('/admin/stays');
      } else if (!data.deleted && data.hasUpcomingReservations) {
        handleOpenUpcomingModal();
      } else {
        showToast('삭제 요청 중 오류가 발생했습니다.', 'error', 'middle');
      }
    } catch {
      showToast('삭제 요청 중 오류가 발생했습니다.', 'error', 'middle');
    } finally {
      handleCloseModal();
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

      {/* 방문 예정 예약 있을 때 모달 */}
      {isUpcomingModalOpen && (
        <Modal
          leftBtnText='닫기'
          rightBtnText='예약 목록 보기'
          onClickLeftBtn={handleCloseUpcomingModal}
          onClickRightBtn={() => {
            handleCloseUpcomingModal();
            router.push('/reservations');
          }}
          isPink
        >
          이 사랑방에 예정된 예약이 남아있어 <br /> 삭제할 수 없어요
        </Modal>
      )}
    </>
  );
}
