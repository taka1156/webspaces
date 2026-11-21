import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { BaseIcon } from './BaseIcon';

const meta: Meta<typeof BaseIcon> = {
  component: BaseIcon,
  argTypes: {
    src: { control: { type: 'text' } },
    alt: { control: { type: 'text' } }
  }
};

export default meta;

type Story = StoryObj<typeof BaseIcon>;

export const Basic: Story = {
  args: {
    src: '/img/icon/utils/date.svg',
    alt: '日付'
  }
};

export const InheritColor: Story = {
  args: {
    src: '/img/icon/services/github-logo.png',
    alt: 'GitHub'
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: 16, color: '#3a6fd8' }}>
      <BaseIcon {...args} />
      <span>親要素の文字色で描画される</span>
    </div>
  )
};
