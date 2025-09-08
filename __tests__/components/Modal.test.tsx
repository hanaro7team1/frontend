import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal } from '@/components/common';

describe('Modal', () => {
  const onClickRightBtn = vi.fn();
  const onClickLeftBtn = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('텍스트 모달', () => {
    render(
      <Modal
        rightBtnText='확인'
        leftBtnText='취소'
        onClickRightBtn={onClickRightBtn}
        onClickLeftBtn={onClickLeftBtn}
      >
        내용입니다
      </Modal>,
    );
    expect(screen.getByText('내용입니다')).toBeInTheDocument();
  });

  it('모달 취소 버튼', async () => {
    render(
      <Modal
        rightBtnText='확인'
        leftBtnText='취소'
        onClickRightBtn={onClickRightBtn}
        onClickLeftBtn={onClickLeftBtn}
      >
        취소 테스트
      </Modal>,
    );
    await userEvent.keyboard('{Escape}');
    expect(onClickLeftBtn).toHaveBeenCalled();
  });

  it('모달 버튼 클릭', async () => {
    render(
      <Modal
        rightBtnText='확인'
        leftBtnText='취소'
        onClickRightBtn={onClickRightBtn}
        onClickLeftBtn={onClickLeftBtn}
      >
        버튼 테스트
      </Modal>,
    );

    await userEvent.click(screen.getByText('취소'));
    await userEvent.click(screen.getByText('확인'));

    expect(onClickLeftBtn).toHaveBeenCalled();
    expect(onClickRightBtn).toHaveBeenCalled();
  });
});
