import * as React from 'react';

export interface LayoutProps {
  /**
   * Setting to false will disable the footer
   */
  hasFooter?: boolean;
  /**
   * Controls the size of the sidebar.
   */
  sidebarSize?: number;
  /**
   * Disables the presence of the side bar
   */
  hasSidebar?: boolean;
  className?: string;
}

export const Layout: React.FC<LayoutProps>;

