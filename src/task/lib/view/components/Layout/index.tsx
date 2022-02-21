// React import
import React, {ReactElement} from 'react';

// Grommet component
import {Grommet, ThemeContext} from 'grommet';

// Import styling
import '@task/css/styles.css';

// Apply custom theme globally
import {Theme} from '@lib/theme';

// Factory class to generate screens
import ScreenFactory from '@classes/factories/ScreenFactory';

/**
 * Generic container for all Grommet components
 * @param {Props.Components.Layout} props collection of props for the primary
 * child component
 * @return {ReactElement}
 */
export const Layout = (props: Props.Components.Layout): ReactElement => {
  // Create a new 'ScreenFactory' instance
  const screenFactory = new ScreenFactory();

  // Return a styled Grommet instance with the global theme extension
  return (
    <Grommet
      full='min'
      style={{
        // Dimensions
        minHeight: '70vh',
        minWidth: '70vw',
        // Flex properties
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        // Overflow
        overflow: 'hidden',
      }}>
      <ThemeContext.Extend value={Theme}>
        {screenFactory.generate(props)}
      </ThemeContext.Extend>
    </Grommet>
  );
};

export default Layout;
