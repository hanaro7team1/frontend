import type { Meta, StoryObj } from '@storybook/nextjs';
import Txt from '@/components/atoms/Text';

const meta: Meta<typeof Txt> = {
  title: 'Atoms/Text',
  component: Txt,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'number' },
      description: '폰트 크기 (px)',
    },
    weight: {
      control: { type: 'select' },
      options: ['bold', 'cm', 'medium', 'regular'],
      description: '폰트 굵기',
    },
    align: {
      control: { type: 'select' },
      options: ['left', 'center', 'right'],
      description: '텍스트 정렬',
    },
    className: {
      control: { type: 'text' },
      description: '추가 Tailwind 클래스',
    },
    children: {
      control: { type: 'text' },
      description: '표시할 텍스트',
    },
  },
  args: {
    children: '샘플 텍스트',
    size: 20,
    weight: 'cm',
    align: 'center',
  },
};

export default meta;
type Story = StoryObj<typeof Txt>;

export const Default: Story = {};

export const Bold: Story = {
  args: {
    children: '볼드 텍스트',
    weight: 'bold',
  },
};

export const CustomSize: Story = {
  args: {
    children: '28px 크기 텍스트',
    size: 28,
  },
};
