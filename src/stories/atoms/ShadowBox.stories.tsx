import type { Meta, StoryObj } from '@storybook/nextjs';
import ShadowBox from '@/components/atoms/ShadowBox';
import Txt from '@/components/atoms/Text';

const meta: Meta<typeof ShadowBox> = {
  title: 'Atoms/ShadowBox',
  component: ShadowBox,
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
    className: {
      control: 'text',
      description: '추가 TailwindCSS 클래스',
    },
    children: {
      control: 'text',
      description: '박스 내부에 렌더링할 내용',
    },
  },
  args: {
    children: <Txt>ShadowBox 콘텐츠</Txt>,
  },
};

export default meta;
type Story = StoryObj<typeof ShadowBox>;

export const Default: Story = {};

export const Clickable: Story = {
  args: {
    children: <Txt>클릭 가능한 ShadowBox</Txt>,
    onClick: () => alert('ShadowBox 클릭!'),
  },
};

export const CustomPadding: Story = {
  args: {
    children: <Txt>패딩이 추가된 ShadowBox</Txt>,
    className: 'p-6',
  },
};

export const WithElements: Story = {
  args: {
    children: (
      <div className='flex flex-col space-y-4 p-6'>
        <div className='flex items-center space-x-3'>
          <div className='flex h-10 w-10 items-center justify-center rounded-full bg-gray-200'>
            <span role='icon' aria-label='lock'>
              🔒
            </span>
          </div>
          <Txt size={22} weight='bold'>
            ********
          </Txt>
        </div>

        <button className='w-full rounded-[8px] bg-gray-400 py-2 text-center'>
          <Txt className='text-white'>
            비밀 번호 변경
          </Txt>
        </button>
      </div>
    ),
  },
};
