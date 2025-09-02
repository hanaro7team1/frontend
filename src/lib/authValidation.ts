import { z } from 'zod';

// 이름 검증 스키마
const nameSchema = z
  .string()
  .trim()
  .min(2, '한글 2글자 이상 8자 이하로 입력해주세요.')
  .max(8, '한글 2글자 이상 8자 이하로 입력해주세요.')
  .regex(/^[가-힣]+$/, '영어, 숫자, 특수문자, 독립된 자음/모음 사용 불가합니다');

// 비밀번호 검증
const passwordSchema = z
  .string()
  .min(8, '비밀번호의 길이가 8자 이상이어야 합니다.')
  .max(20, '비밀번호의 길이가 20자 이하여야 합니다.')
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
    '영문 대소문자, 숫자, 특수문자를 모두 포함해야 합니다.',
  );

//id 검증
const idSchema = z
  .string()
  .min(5, '아이디는 최소 5자 이상이어야 합니다.')
  .max(20, '아이디는 최대 20자 이하여야 합니다')
  .regex(/^[a-z0-9_]+$/, '아이디는 영문 소문자, 숫자, 밑줄(_)만 사용할 수 있습니다');

export const credentialValidator = z.object({
  password: passwordSchema,
});

// 회원가입용
export const signUpValidator = z
  .object({
    name: nameSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: '입력하신 비밀번호와 다릅니다.',
    path: ['confirmPassword'],
  });

// 비밀번호 변경용
export const changePasswordValidator = z
  .object({
    currentPassword: z.string().min(1, '현재 비밀번호를 입력해주세요.'),
    newPassword: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine(({ newPassword, confirmPassword }) => newPassword === confirmPassword, {
    message: '새 비밀번호와 새 비밀번호 확인이 일치하지 않습니다.',
    path: ['confirmPassword'],
  });

export const checkIdValidation = (id: string) => {
  const result = idSchema.safeParse(id);
  return {
    valid: result.success,
    message: result.success ? '' : result.error.issues[0]?.message || '',
  };
};

export const checkPasswordValidation = (password: string) => {
  const result = passwordSchema.safeParse(password);
  return {
    valid: result.success,
    message: result.success ? '' : result.error.issues[0]?.message || '',
  };
};
