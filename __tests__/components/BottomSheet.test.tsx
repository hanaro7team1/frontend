import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { BottomSheet } from '@/components/common';

vi.mock('next/navigation', () => ({
  usePathname: () => '/stays',
}));

describe('BottomSheet', () => {
  it('바텀시트 트리거 텍스트가 보인다', () => {
    render(
      <BottomSheet>
        <div>바텀시트 테스트 내용1</div>
      </BottomSheet>,
    );
    // "변경하기" 기본 텍스트 확인
    expect(screen.getByText(/변경하기/)).toBeInTheDocument();
  });

  it('트리거 클릭 시 children 내용이 보인다', async () => {
    render(
      <BottomSheet>
        <div>바텀시트 테스트 내용2</div>
      </BottomSheet>,
    );

    await userEvent.click(screen.getByText(/변경하기/));
    expect(screen.getByText('바텀시트 테스트 내용2')).toBeInTheDocument();
  });
});
