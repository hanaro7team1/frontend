import { Meta, StoryObj } from '@storybook/nextjs';
import { useToast } from '@/components/common/ToastContext';
import { ToastProvider } from '@/components/common/ToastProvider';
import { ToastPosition, ToastType } from '@/types/toast';

type Args = {
  message: string;
  position: ToastPosition; // Tailwind 위치 클래스 문자열
  type: ToastType;
};

const meta: Meta<Args> = {
  title: 'Feedback/Toast',
  decorators: [
    (Story) => (
      <ToastProvider>
        <div style={{ height: 320, display: 'grid', placeItems: 'center' }}>
          <Story />
        </div>
      </ToastProvider>
    ),
  ],
  argTypes: {
    message: { control: 'text', description: '토스트 안에 들어갈 메시지 ' },
    type: {
      control: { type: 'radio' },
      options: ['success', 'error', 'warning'],
      description: '토스트의 종류 성공/실패/오류',
    },
    position: {
      control: 'select',
      options: ['top', 'middle'],
      description: '토스트 위치, defaul는 바텀',
    },
  },
  parameters: { layout: 'centered' },
};
export default meta;

type Story = StoryObj<Args>;

export const ButtonControlled: Story = {
  args: {
    message: '등록이 완료되었습니다',
    type: 'success',
    position: 'middle',
  },
  render: (args) => {
    const { showToast } = useToast();
    return (
      <button
        style={{ padding: '8px 12px', borderRadius: 8, boxShadow: '0 1px 4px rgba(0,0,0,0.15)' }}
        onClick={() => showToast(args.message, args.type, args.position)}
      >
        토스트 띄우기
      </button>
    );
  },
};
