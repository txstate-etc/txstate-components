import React from 'react'
import styled from 'styled-components'

interface LayoutProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
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
}

const Wrapper = styled.div<{ sidebarSize: number }>`
  display: grid;
  background-color: #ffffff;

  &.txst-wrapper-no-sidebar > .txst-sidebar-container {
    display: none;
  }

  &.txst-wrapper-no-footer > .txst-footer-container {
    display: none;
  }

  &.txst-wrapper {
    grid-template-columns: ${({ sidebarSize }) => sidebarSize}px 1fr;
    grid-template-rows: 64px 1fr 44px;
    grid-template-areas: 'header header' 'sidebar content' 'footer footer';
  }

  &.txst-wrapper-no-sidebar {
    grid-template-columns: 1fr;
    grid-template-rows: 64px 1fr 44px;
    grid-template-areas: 'header' 'content' 'footer';
  }

  &.txst-wrapper-no-footer {
    grid-template-columns: ${({ sidebarSize }) => sidebarSize}px 1fr;
    grid-template-rows: 64px 1fr;
    grid-template-areas: 'header header' 'sidebar content';
  }

  &.txst-wrapper-no-footer-no-sidebar {
    grid-template-columns: 1fr;
    grid-template-rows: 64px 1fr;
    grid-template-areas: 'header' 'content';
  }
`

const HeaderContainer = styled.header`
  &.txst-header-container {
    grid-area: header;
  }
`

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {}

const Header = ({ children, className, ...props }: HeaderProps) => {
  return (
    <HeaderContainer className={`txst-header-container ${className}`} {...props}>{children}</HeaderContainer>
  )
}

const SidebarContainer = styled.div`
  &.txst-sidebar-container {
    grid-area: sidebar;
  }
`

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {}

const Sidebar = ({ className, children, ...props }: SidebarProps) => {
  return <SidebarContainer className={`txst-sidebar-container ${className}`} {...props}>{children}</SidebarContainer>
}

const ContentContainer = styled.main`
  &.txst-content-container {
    grid-area: content;
    overflow: auto;
  }
`

interface ContentProps extends React.HTMLAttributes<HTMLElement> {}

const Content = ({ children, className, ...props }: ContentProps) => {
  return (
    <ContentContainer className={`txst-content-container ${className}`} {...props}>{children}</ContentContainer>
  )
}

const FooterContainer = styled.footer`
  &.txst-footer-container {
    grid-area: footer;
  }
`
interface FooterProps extends React.HTMLAttributes<HTMLElement> {}

const Footer = ({ children, className, ...props }: FooterProps) => {
  return (
    <FooterContainer className={`txst-footer-container ${className}`} {...props}>{children}</FooterContainer>
  )
}

export const Layout = ({
  children,
  hasFooter = true,
  sidebarSize = 200,
  hasSidebar = true,
  className,
  ...props
}: LayoutProps) => {
  let wrapperClassNames = ['txst-wrapper-no-sidebar']
  if (hasSidebar && (sidebarSize ?? 0) > 0) {
    wrapperClassNames = ['txst-wrapper']
  }

  if (!hasFooter) {
    if (!hasSidebar) {
      wrapperClassNames.push('txst-wrapper-no-footer-no-sidebar')
    } else {
      wrapperClassNames.push('txst-wrapper-no-footer')
    }
  }

  return (
    <Wrapper
      className={`${className} ${wrapperClassNames.join(' ')}`}
      sidebarSize={sidebarSize ?? 0}
      {...props}
    >
      {children}
    </Wrapper>
  )
}

Layout.Header = Header
Layout.Sidebar = Sidebar
Layout.Content = Content
Layout.Footer = Footer
