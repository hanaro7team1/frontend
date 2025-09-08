'use client';

import { createContext, useContext } from 'react';
import useValidation from '@/hooks/auth/useValidation';

//회원가입 Contexts

const SignUpFormContext = createContext<ReturnType<typeof useValidation> | null>(null);

export function SignUpFormProvider({ children }: { children: React.ReactNode }) {
  const v = useValidation();
  return <SignUpFormContext.Provider value={v}>{children}</SignUpFormContext.Provider>;
}

export function useSignUpForm() {
  const ctx = useContext(SignUpFormContext);
  if (!ctx) throw new Error('useSignUpForm hook은 <SignUpFormProvider> 안에서 사용되어야 합니다');
  return ctx;
}
