import { useRef, useState } from 'react';
import { checkIdValidation, checkPasswordValidation } from '@/lib/authValidation';

export default function useValidation() {
  const [form, setForm] = useState({
    id: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    id: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (field: keyof typeof form, value: string, duplicated: boolean = false) => {
    // form을 업데이트 (순수 함수)
    setForm((prev) => ({ ...prev, [field]: value }));
    // 아이디
    if (field === 'id') {
      const { valid, message } = checkIdValidation(value);

      if (!valid) {
        setErrors((prev) => ({
          ...prev,
          name: valid ? '' : message,
        }));
      } else setErrors((prev) => ({ ...prev, name: '' }));
    }
    // 패스워드
    else if (field === 'password') {
      const { valid, message } = checkPasswordValidation(value);
      if (!valid) {
        setErrors((prev) => ({
          ...prev,
          password: valid ? '' : message,
        }));
      } else setErrors((prev) => ({ ...prev, password: '' }));

      // 비밀번호 확인
    } else if (field === 'confirmPassword') {
      if (value !== form.password) {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: '입력하신 비밀번호와 다릅니다.',
        }));
      } else setErrors((prev) => ({ ...prev, confirmPassword: '' }));
    }
  };

  return { form, errors, handleChange };
}
