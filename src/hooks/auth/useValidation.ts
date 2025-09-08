import { useEffect, useState } from 'react';
import { checkIdValidation, checkPasswordValidation } from '@/lib/authValidation';
import { useDebounce } from './useDebounce';

export default function useValidation() {
  const [form, setForm] = useState({
    loginId: '',
    password: '',
    confirmPassword: '',
    villageName: '',
    region: '',
    phone: '',
  });

  const [errors, setErrors] = useState({
    id: '',
    password: '',
    confirmPassword: '',
  });

  //디바운싱 처리
  const debounceId = useDebounce(form.loginId, 300);
  const debouncePassword = useDebounce(form.password, 300);
  const debounceConfirm = useDebounce(form.confirmPassword, 300);

  const handleChange = (field: keyof typeof form, value: string, duplicated: boolean = false) => {
    // form을 업데이트 (순수 함수)
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // 아이디 검증
  useEffect(() => {
    const { valid, message } = checkIdValidation(debounceId);
    setErrors((e) => ({ ...e, id: valid ? '' : message }));
  }, [debounceId]);

  // 비밀번호 규칙 검증
  useEffect(() => {
    const { valid, message } = checkPasswordValidation(debouncePassword);
    setErrors((e) => ({ ...e, password: valid ? '' : message }));
  }, [debouncePassword]);

  // 비밀번호 일치 검증
  useEffect(() => {
    const matchMsg =
      debounceConfirm && debounceConfirm !== debouncePassword
        ? '입력하신 비밀번호와 일치하지 않습니다.'
        : '';
    setErrors((e) => ({ ...e, confirmPassword: matchMsg }));
  }, [debouncePassword, debounceConfirm]);

  return { form, setForm, errors, handleChange };
}
