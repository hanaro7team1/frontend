'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button, Txt } from '@/components/atoms';
import { Header } from '@/components/common';
import { useToast } from '@/components/common/ToastContext';
import { PasswordField } from '@/components/domain/admin/auth/PasswordField';
import useValidation from '@/hooks/auth/useValidation';
import { updateAdminPassword } from '@/app/api/mypage';

export default function AdminPwdPage() {
  const txtPosition = 'flex flex-col gap-2 ';

  const [currentPassword, setCurrentPassword] = useState('');
  const { form, errors, handleChange } = useValidation();

  const [touched, setTouched] = useState({
    password: false,
    confirmPassword: false,
  });

  // const [openNotice, setOpenNotice] = useState(false);

  const router = useRouter();
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isDisabled) return;

    try {
      // 비밀번호 변경 API 호출
      await updateAdminPassword(currentPassword, form.password);
      showToast('비밀번호가 변경되었습니다', 'success');
      router.back();
    } catch {
      showToast('비밀번호 변경에 실패했습니다 \n 다시 시도해 주세요', 'error');
    } finally {
    }
  };

  // 버튼 비활성화 조건: 3개 입력란 모두 조건에 맞게 입력해야 활성화
  const isDisabled =
    !currentPassword.trim() ||
    !form.password.trim() ||
    !form.confirmPassword.trim() ||
    !!errors.password ||
    !!errors.confirmPassword;

  return (
    <>
      <Header className='mb-13' title='비밀번호 변경' />

      <form onSubmit={handleSubmit}>
        <div className='flex flex-col gap-9 p-8'>
          <div className={txtPosition}>
            <Txt size={24}>기존 비밀번호</Txt>
            <PasswordField
              value={currentPassword}
              placeholder='기존 비밀번호를 입력해 주세요'
              onChange={setCurrentPassword}
              autoComplete='current-password'
            />
          </div>

          <div className={txtPosition}>
            <Txt size={24}>변경할 비밀번호</Txt>
            <PasswordField
              value={form.password}
              placeholder='영문자,숫자,특수문자를 포함한 8~20자'
              onChange={(v) => {
                handleChange('password', v);
                if (!touched.password) setTouched((prev) => ({ ...prev, password: true }));
              }}
              autoComplete='new-password'
            />
            {touched.password && errors.password && (
              <Txt size={18} className='text-pink-a76' weight='regular'>
                {errors.password}
              </Txt>
            )}
          </div>

          <div className={txtPosition}>
            <Txt size={24}>변경할 비밀번호 확인</Txt>
            <PasswordField
              value={form.confirmPassword}
              placeholder='변경할 비밀번호를 한번 더 입력하세요'
              onChange={(v) => {
                handleChange('confirmPassword', v);
                if (!touched.confirmPassword)
                  setTouched((prev) => ({ ...prev, confirmPassword: true }));
              }}
              autoComplete='new-password'
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <Txt size={18} className='text-pink-a76 ml-4' weight='regular'>
                {errors.confirmPassword}
              </Txt>
            )}
          </div>

          <Button type='submit' title='변경하기' color='pink' disabled={isDisabled} />
        </div>
      </form>
    </>
  );
}
