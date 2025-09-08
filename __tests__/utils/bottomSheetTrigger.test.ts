import { getStyleAndtextSize } from '@/utils/common/bottomSheetTrigger';

vi.mock('@/constants/common/bottomSheetTrigger', () => ({
  lgBtn_PATHS: [/^\/stays/, /^\/reservations/],
  smBtn_PATHS: [/^\/profile/],
  pinkBtn_PATHS: ['/booking/change'],
}));

describe('getStyleAndtextSize 함수 테스트', () => {
  it('lgBtn_PATHS 경로일 경우 큰 버튼 스타일을 반환한다', () => {
    const result = getStyleAndtextSize('/stays/123');
    expect(result).toEqual({ btnStyle: 'rounded-[10px] py-2.5', textSize: 20 });
  });

  it('smBtn_PATHS 경로일 경우 작은 버튼 스타일을 반환한다', () => {
    const result = getStyleAndtextSize('/profile/edit');
    expect(result).toEqual({ btnStyle: 'px-3.5 py-1.5', textSize: 16 });
  });

  it('pinkBtn_PATHS에 포함된 경로일 경우 분홍색 버튼 스타일과 텍스트를 반환한다', () => {
    const result = getStyleAndtextSize('/booking/change');
    expect(result).toHaveProperty('btnStyle');
    expect(result).toHaveProperty('textSize', 16);
    expect(result).toHaveProperty('text', '예약 가능 날짜\n 변경하기');
  });

  it('어느 경로에도 해당하지 않을 경우 기본 스타일을 반환한다', () => {
    const result = getStyleAndtextSize('/unknown');
    expect(result).toEqual({ btnStyle: '', textSize: 18 });
  });
});
