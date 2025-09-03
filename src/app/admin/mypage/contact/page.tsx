'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Button, Input, Txt } from '@/components/atoms';
import { Header } from '@/components/common';
import NoticeModal from '@/components/domain/admin/mypage/NoticeModal';
import '@/utils/common/phoneHyphen';
import { formatPhone } from '@/utils/common/phoneHyphen';
import { getAdminInfoClient, updateAdminPhone } from '@/app/apis/mypage';

export default function AdminContactPage() {
  const [phone, setPhone] = useState('010-1234-1234');
  const [newPhone, setNewPhone] = useState('');
  const [openNotice, setOpenNotice] = useState(false);

  useEffect(() => {
    const fetchAdminInfo = async () => {
      try {
        const data = await getAdminInfoClient();
        setPhone(formatPhone(data.phone));
      } catch (error) {
        console.error('관리자 정보 조회 실패:', error);
        alert('관리자 정보를 불러오는 데 실패했습니다.');
      } finally {
      }
    };

    fetchAdminInfo();
  }, []);

  // 전화번호 변경 API 호출 함수
  const handleUpdatePhone = async () => {
    if (!newPhone.trim()) return;

    try {
      await updateAdminPhone(newPhone);
      // API 호출 성공 후, 상태 업데이트
      setPhone(formatPhone(newPhone));
      setNewPhone('');
      setOpenNotice(true);
    } catch (error) {
      console.error('전화번호 변경 실패:', error);
      alert('전화번호 변경에 실패했습니다. 다시 시도해주세요.');
    } finally {
    }
  };

  // 버튼 비활성화 조건
  const isDisabled = !newPhone.trim();

  return (
    <>
      <Header title='전화번호 변경' />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleUpdatePhone();
        }}
        className='flex flex-col gap-4 p-8'
      >
        <Txt size={24} className='text-gray-070'>
          기존 전화번호
        </Txt>
        <div className='flex items-center gap-3'>
          <Image src='/icons/Ic_Phone_green.svg' alt='수화기' width={22} height={22} />
          <Txt weight='bold'>{phone}</Txt>
        </div>

        <div className='mt-13 mb-3 flex flex-col gap-4'>
          <Txt size={24} className='text-gray-070'>
            변경할 전화번호
          </Txt>
          <Input
            value={formatPhone(newPhone)}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPhone(e.target.value)}
            placeholder='변경할 전화번호를 입력해 주세요'
            type='tel'
            maxLength={13}
          />
        </div>

        <Button type='submit' title={'변경하기'} color='pink' disabled={isDisabled} />
      </form>

      <NoticeModal open={openNotice} text='전화번호' />
    </>
  );
}
