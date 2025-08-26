import type { Meta, StoryObj } from '@storybook/nextjs';
import Button from '@/components/atoms/Button';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: '버튼 텍스트',
    },
    color: {
      control: { type: 'select' },
      options: ['green', 'gray', 'pink70', 'gray40'],
      description: '버튼 색상',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
    },
    onClick: { action: 'clicked' },
    icon: {
      control: false,
      description: '텍스트 옆에 표시할 아이콘',
    },
  },
  args: {
    title: '기본 버튼',
    color: 'green',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {};

export const Green: Story = {
  args: {
    title: '도시 시니어',
    color: 'green',
  },
};

export const Pink: Story = {
  args: {
    title: '시골 관리자',
    color: 'pink',
  },
};

export const Gray: Story = {
  args: {
    title: '취소',
    color: 'gray',
  },
};

export const Disabled: Story = {
  args: {
    title: '비활성화',
    disabled: true,
  },
};

export const WithIcon: Story = {
  args: {
    title: '로그인 하러 가기',
    color: 'pink',
    icon: <span>🔓</span>,
  },
};
