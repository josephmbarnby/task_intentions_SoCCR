// React
import {ReactElement, JSXElementConstructor} from 'react';
import ReactDOMServer from 'react-dom/server';

/**
 * Utility function to turn React elements into HTML markup,
 * useful when HTML is required
 * @param {ReactElement} element React element to render
 * @return {string}
 */
export function markup(
    element: ReactElement<any, string | JSXElementConstructor<any>>
): string {
  const generated = ReactDOMServer.renderToStaticMarkup(element);
  return generated;
}
