'use client';

import { useState } from 'react';
import { Button, Input, Txt } from '@/components/atoms';
import { Header, Modal } from '@/components/common';
import { PasswordField } from '@/components/domain/admin/auth/PasswordField';
import NoticeModal from '@/components/domain/admin/mypage/NoticeModal';
import useValidation from '@/hooks/auth/useValidation';

export default function AdminPwdPage() {
  const txtPosition = 'flex flex-col gap-2 ';

  const [password, setPassword] = useState('');

  const { form, errors, handleChange } = useValidation();

  const [openNotice, setOpenNotice] = useState(false);
  const editPwd = () => {
    setOpenNotice(true);
  };

  return (
    <form>
      <Header className='mb-13' title='비밀번호 변경' />

      <div className='flex flex-col gap-9 p-8'>
        <div className={`${txtPosition}`}>
          <Txt size={24}>기존 비밀번호</Txt>
          <PasswordField
            value={password}
            placeholder={'기존 비밀번호를 입력해 주세요'}
            onChange={setPassword}
          />
        </div>

        <div className={`${txtPosition}`}>
          <Txt size={24}>변경할 비밀번호</Txt>
          <PasswordField
            value={form.password}
            placeholder={'영문자,숫자,특수문자를 포함한 8~20자'}
            onChange={(v) => handleChange('password', v)}
          />
          {errors.password && (
            <Txt size={18} className='text-pink-a76 ml-4' weight='regular'>
              {errors.password}
            </Txt>
          )}
        </div>
        <div className={`${txtPosition}`}>
          <Txt size={24}>변경할 비밀번호 확인</Txt>
          <PasswordField
            value={form.confirmPassword}
            placeholder={'변경할 비밀번호를 한번 더 입력하세요'}
            onChange={(v) => handleChange('confirmPassword', v)}
          />
          {errors.confirmPassword && (
            <Txt size={18} className='text-pink-a76 ml-4' weight='regular'>
              {errors.confirmPassword}
            </Txt>
          )}
        </div>

        <Button title='변경하기' color='pink' onClick={editPwd} />
      </div>

      <NoticeModal open={openNotice} text='비밀번호' />
    </form>
  );
}
