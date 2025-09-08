import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/atoms';

type Props = {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  autoComplete?: string;
};

export function PasswordField({ value, onChange, placeholder = '비밀번호', autoComplete }: Props) {
  const [show, setShow] = useState(false);
  return (
    <div className='relative'>
      <Input
        type={show ? 'text' : 'password'}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        aria-label='비밀번호'
      />
      <button
        type='button'
        onClick={() => setShow((s) => !s)}
        className='absolute top-1/2 right-3 -translate-y-1/2'
        aria-label={show ? '비밀번호 가리기' : '비밀번호 보기'}
      >
        {show ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
}
