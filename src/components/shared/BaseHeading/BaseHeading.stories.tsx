import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { BaseHeading } from './BaseHeading';

const meta: Meta<typeof BaseHeading> = {
  component: BaseHeading,
  argTypes: {
    hLv: {
      control: { type: 'select' },
      options: ['1', '2', '3', '4', '5', '6']
    },
    children: {
      control: 'text'
    }
  }
};

export default meta;

type Story = StoryObj<typeof BaseHeading>;

export const Basic: Story = {
  args: {
    hLv: '1',
    children: 'Heading Text'
  }
};
