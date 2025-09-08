import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Header } from '@/components/common';

const back = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({ back }),
}));

describe('Header', () => {
  it('헤더 텍스트', () => {
    render(<Header title='사랑방 찾기' />);
    expect(screen.getByText('사랑방 찾기')).toBeInTheDocument();
  });

  it('헤더 뒤로가기', async () => {
    render(<Header title='우리 마을 사랑방' />);
    await userEvent.click(screen.getByRole('button'));
    expect(back).toHaveBeenCalled();
  });

  it('핑크색 헤더', () => {
    render(<Header title='Pink Header' bgColor='pink' />);
    const header = screen.getByRole('banner');
    expect(header.className).toContain('bg-pink-09f');
  });
});
