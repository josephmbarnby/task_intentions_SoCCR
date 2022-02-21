// React imports
import React, {FC, ReactElement} from 'react';

// Grommet UI components
import {Grommet, ThemeContext} from 'grommet';

// Custom theming
import {Theme} from '@lib/theme';

// Testing utilities
import {render, RenderOptions, RenderResult} from '@testing-library/react';

// Define the 'Wrapper' UI component
const Wrapper: FC = ({children}) => {
  return (
    <Grommet>
      <ThemeContext.Extend value={Theme}>
        {children}
      </ThemeContext.Extend>
    </Grommet>
  );
};

const customRender = (
    ui: ReactElement,
    options?: Omit<RenderOptions, 'wrapper'>,
): RenderResult => render(ui, {wrapper: Wrapper, ...options});

export * from '@testing-library/react';
export {customRender as render};
