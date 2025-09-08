import { formatDate } from '@/utils/main/formatDate';

describe('formatDate 함수 테스트', () => {
  it('요일을 포함한 날짜 포맷을 반환한다', () => {
    const result = formatDate('2025-09-01'); // 월요일
    expect(result).toBe('25.09.01 (월)');
  });

  it('월과 일이 한 자리 수일 경우 앞에 0을 붙여 반환한다', () => {
    const result = formatDate('2025-01-05'); // 일요일
    expect(result).toBe('25.01.05 (일)');
  });

  it('연말 날짜를 올바르게 처리하여 반환한다', () => {
    const result = formatDate('2024-12-31'); // 화요일
    expect(result).toBe('24.12.31 (화)');
  });
});
