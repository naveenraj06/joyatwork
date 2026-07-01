import type { Preview } from '@storybook/react-vite';
import React from 'react';
import '../src/index.css';
import { EmployeeMomentsProvider } from '../src/providers/EmployeeMomentsProvider';
import { themes } from '../src/themes';
import { ThemeName } from '../src/types';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo'
    }
  },
  decorators: [
    (Story, context) => {
      const themeName: ThemeName = context.args.theme || 'corporate';
      const activeTheme = themes[themeName] || themes.corporate;
      const branding = context.args.branding;
      const effects = context.args.effects;
      const allowReactions = context.args.allowReactions !== false;
      const locale = context.args.locale || 'en';

      const bgStyle: React.CSSProperties = {};
      if (activeTheme.background.startsWith('linear-gradient')) {
        bgStyle.background = activeTheme.background;
      } else {
        bgStyle.backgroundColor = activeTheme.background;
      }

      return (
        <EmployeeMomentsProvider
          theme={themeName}
          branding={branding}
          effects={effects}
          allowReactions={allowReactions}
          locale={locale}
        >
          <div 
            className="p-6 md:p-12 min-h-screen flex items-center justify-center transition-all duration-300"
            style={bgStyle}
          >
            <div className="w-full max-w-5xl">
              <Story />
            </div>
          </div>
        </EmployeeMomentsProvider>
      );
    }
  ]
};

export default preview;
