// 로그인한 사용자의 memberId를 localStorage에서 가져오는 함수.
export function getMemberId(): number | null {
  if (typeof window === 'undefined') return null;
  const user = localStorage.getItem('user');
  if (!user) return null;

  try {
    const parsed = JSON.parse(user);
    return parsed.memberId ?? null;
  } catch {
    return null;
  }
}
