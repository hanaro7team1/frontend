import { act, renderHook } from '@testing-library/react';
import { vi } from 'vitest';
import { useAuth } from '@/hooks/auth/useAuth';

// authApi 모듈 mocking
vi.mock('@/lib/axios-client', () => ({
  authApi: {
    login: vi.fn(),
    logout: vi.fn(),
  },
}));

const { authApi } = await import('@/lib/axios-client');

describe('useAuth 훅 테스트', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('마운트 시 localStorage에 저장된 유저를 불러온다', () => {
    const mockUser = { loginId: 'test', role: 'ROLE_USER', name: '홍길동', memberId: 1 };
    localStorage.setItem('user', JSON.stringify(mockUser));

    const { result } = renderHook(() => useAuth());

    // useEffect 실행 이후 isLoading false
    expect(result.current.user).toEqual(mockUser);
    expect(result.current.isLoading).toBe(false);
  });

  it('login 함수 호출 시 유저 정보를 설정하고 authApi.login을 실행한다', async () => {
    const mockUser = { loginId: 'admin', role: 'ROLE_ADMIN', name: '관리자', memberId: 99 };
    vi.mocked(authApi.login).mockResolvedValueOnce(mockUser);

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      const user = await result.current.login('admin', '1234');
      expect(user).toEqual(mockUser);
    });

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.isAdmin).toBe(true);
  });

  it('logout 함수 호출 시 유저 정보를 초기화하고 authApi.logout을 실행한다', () => {
    const { result } = renderHook(() => useAuth());

    act(() => {
      result.current.logout();
    });

    expect(authApi.logout).toHaveBeenCalled();
    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
  });
});
