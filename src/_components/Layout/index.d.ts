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

export interface LayoutComponent<T> extends React.FC<T> {
  Header: React.FC
  Content: React.FC
  Sidebar: React.FC
  Footer: React.FC
}

export const Layout: LayoutComponent<LayoutProps>;

