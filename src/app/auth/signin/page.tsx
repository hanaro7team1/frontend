'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button, Input, Txt } from '@/components/atoms';
import { useAuth } from '@/hooks/auth/useAuth';

export default function LoginForm() {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const userData = await login(loginId, password);
      if (userData.role === 'ROLE_ADMIN') router.push('/admin');
      else router.push('/main');
    } catch (error: any) {
      setError(error.response?.data?.message || '로그인 실패');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='bg-gray-7f9 flex h-screen flex-col justify-center gap-10 p-6'
    >
      <div className='flex flex-col items-center'>
        <Image src='/images/Img_SIDO_LOGO_2.png' alt='시도 로고' width={100} height={100} />
        <Txt className='text-gray-070'>시골과 도시의 연결</Txt>
      </div>

      <div className='flex flex-col gap-3'>
        <Txt size={24}>아이디</Txt>
        <Input
          type='text'
          placeholder='아이디를 입력해 주세요'
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
          required
        />
      </div>
      <div className='flex flex-col gap-3'>
        <Txt size={24}>비밀번호</Txt>
        <Input
          type='password'
          placeholder='비밀번호를 입력해 주세요'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <Button
        title={isLoading ? '로그인 중...' : '로그인'}
        color='pink'
        type='submit'
        disabled={isLoading}
      />

      {error && <Txt className='text-red-500'>{error}</Txt>}
    </form>
  );
}
