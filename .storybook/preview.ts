import type { Preview } from '@storybook/nextjs-vite';
import { getRouter } from '@storybook/nextjs-vite/navigation.mock';
import { action } from 'storybook/actions';
import { AnchorStub } from './AnchorStub';
import 'normalize.css/normalize.css';

const preview: Preview = {
  parameters: {
    nextjs: {
      appDirectory: true
    },
    interactions: {
      disable: true
    },
    docs: {
      story: {
        autoplay: false
      }
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    async beforeEach() {
      getRouter().push.mockImplementation((args) => {
        action('link target')(args);
      });
    },
    decorators: [(Story: any) => AnchorStub(Story)]
  },

  tags: ['autodocs']
};

export default preview;
