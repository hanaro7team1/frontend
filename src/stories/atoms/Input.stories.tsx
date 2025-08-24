import type { Meta, StoryObj } from '@storybook/nextjs';
import Input from '@/components/atoms/Input';

const meta: Meta<typeof Input> = {
  title: 'Atoms/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'placeholder 안내 문구',
    },
    tag: {
      control: { type: 'select' },
      options: ['input', 'textarea'],
      description: '렌더링할 태그 종류',
    },
    className: {
      control: 'text',
      description: '추가 TailwindCSS 클래스',
    },
    onChange: { action: 'changed' },
    onKeyDown: { action: 'key pressed' },
  },
  args: {
    placeholder: '입력해주세요',
    tag: 'input',
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {};

export const WithText: Story = {
  args: {
    placeholder: '이름을 입력하세요',
  },
};

export const TextArea: Story = {
  args: {
    tag: 'textarea',
    placeholder: '여러 줄을 입력하세요',
  },
};
