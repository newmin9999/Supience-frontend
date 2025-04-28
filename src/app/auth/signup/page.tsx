'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { PageLayout } from '@/components/layouts/PageLayout';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import Alert from '@/components/common/Alert';
import { authApi } from '@/api/auth';
import { SignupRequest, SignupResponse } from '@/types/auth';

// 유효성 검사 함수들
const validateLoginId = (value: string): string | null => {
  if (!value) return '아이디는 필수입니다.';
  if (!/^[a-zA-Z0-9]{4,20}$/.test(value)) return '아이디는 영문과 숫자로 4~20자리여야 합니다.';
  return null;
};

const validatePassword = (value: string): string | null => {
  if (!value) return '비밀번호는 필수입니다.';
  if (value.length < 8 || value.length > 20) return '비밀번호는 8~20자리여야 합니다.';
  if (!/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/.test(value)) {
    return '비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.';
  }
  return null;
};

const validateName = (value: string): string | null => {
  if (!value) return '이름은 필수입니다.';
  if (!/^[가-힣]{2,10}$/.test(value)) return '이름은 한글로 2~10자리여야 합니다.';
  return null;
};

const validateEmail = (value: string): string | null => {
  if (!value) return null; // 이메일은 선택사항
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return '올바른 이메일 형식이어야 합니다.';
  return null;
};

const SIGNUP_FIELDS = [
  {
    id: 'loginId' as const,
    type: 'text',
    autoComplete: 'username',
    placeholder: '아이디 (영문과 숫자로 4~20자리)',
    validate: validateLoginId
  },
  {
    id: 'name' as const,
    type: 'text',
    autoComplete: 'name',
    placeholder: '이름 (한글로 2~10자리)',
    validate: validateName
  },
  {
    id: 'email' as const,
    type: 'email',
    autoComplete: 'email',
    placeholder: '이메일 (선택사항)',
    validate: validateEmail
  },
  {
    id: 'password' as const,
    type: 'password',
    autoComplete: 'new-password',
    placeholder: '비밀번호 (영문, 숫자, 특수문자 포함 8~20자리)',
    validate: validatePassword
  }
] as const;

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<SignupRequest>({
    loginId: '',
    name: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<Partial<Record<keyof SignupRequest, string>>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // 필드별 유효성 검사
    const field = SIGNUP_FIELDS.find(f => f.id === name);
    if (field && field.validate) {
      const error = field.validate(value);
      setErrors(prev => ({
        ...prev,
        [name]: error || ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof SignupRequest, string>> = {};
    let isValid = true;

    SIGNUP_FIELDS.forEach(field => {
      if (field.validate) {
        const error = field.validate(formData[field.id]);
        if (error) {
          newErrors[field.id] = error;
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);

    try {
      const response = await authApi.signup(formData) as SignupResponse;
      if (response.success) {
        router.push('/auth/login');
      } else {
        setErrors({ loginId: response.message || '회원가입에 실패했습니다.' });
      }
    } catch (err) {
      setErrors({ loginId: '회원가입 중 오류가 발생했습니다.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout>
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              회원가입
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              {SIGNUP_FIELDS.map(field => (
                <div key={field.id}>
                  <Input
                    id={field.id}
                    name={field.id}
                    type={field.type}
                    autoComplete={field.autoComplete}
                    required={field.id !== 'email'} // 이메일은 선택사항
                    placeholder={field.placeholder}
                    value={formData[field.id]}
                    onChange={handleChange}
                    error={errors[field.id]}
                  />
                </div>
              ))}
            </div>
            <div>
              <Button
                type="submit"
                fullWidth
                disabled={loading}
              >
                {loading ? '처리중...' : '회원가입'}
              </Button>
            </div>
            <div className="text-sm text-center">
              <Link href="/auth/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                이미 계정이 있으신가요? 로그인
              </Link>
            </div>
          </form>
        </div>
      </div>
    </PageLayout>
  );
} 