import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { BaseThemeToggle } from './BaseThemeToggle';

const meta: Meta<typeof BaseThemeToggle> = {
  component: BaseThemeToggle,
  parameters: {
    backgrounds: { default: 'dark' }
  },
  argTypes: {
    isDark: {
      control: { type: 'boolean' }
    },
    onClick: { action: 'clicked' }
  },
  decorators: [
    (Story, { args }) => {
      // アイコンは <html data-theme> を参照するCSSで切り替わるため、isDark に合わせて付与する
      document.documentElement.dataset.theme = args.isDark ? 'dark' : 'light';
      return (
        <div style={{ color: '#fff' }}>
          <Story />
        </div>
      );
    }
  ]
};

export default meta;

type Story = StoryObj<typeof BaseThemeToggle>;

export const Light: Story = {
  args: {
    isDark: false
  }
};

export const Dark: Story = {
  args: {
    isDark: true
  }
};
