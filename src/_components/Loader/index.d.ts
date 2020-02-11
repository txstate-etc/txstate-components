import * as React from 'react';

export interface LoaderProps {
  /**
   * A React component to render after loading is successfully complete
   */
  View?: any;
  /**
   * A React component to render when there is an error
   */
  ErrorView?: any;
  /**
   * Should return the data you are interested in rendering
   */
  fetch?: (...args: any[]) => any;
}

export const Loader: React.FC<LoaderProps>;

