import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Wrapper = styled.div`
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

const Header = props => {
  const { children, className, style } = props
  return (
    <HeaderContainer className={`txst-header-container ${className}`} style={style}>{children}</HeaderContainer>
  )
}

Header.propTypes = {
  className: PropTypes.string
}

const SidebarContainer = styled.div`
  &.txst-sidebar-container {
    grid-area: sidebar;
  }
`

const Sidebar = props => {
  const { children, className, style } = props
  return <SidebarContainer className={`txst-sidebar-container ${className}`} style={style}>{children}</SidebarContainer>
}

Sidebar.propTypes = {
  className: PropTypes.string
}

const ContentContainer = styled.main`
  &.txst-content-container {
    grid-area: content;
    overflow: auto;
  }
`

const Content = props => {
  const { children, className, style } = props
  return (
    <ContentContainer className={`txst-content-container ${className}`} style={style}>{children}</ContentContainer>
  )
}

Content.propTypes = {
  className: PropTypes.string
}

const FooterContainer = styled.footer`
  &.txst-footer-container {
    grid-area: footer;
  }
`

const Footer = props => {
  const { children, className, style } = props
  return (
    <FooterContainer className={`txst-footer-container ${className}`} style={style}>{children}</FooterContainer>
  )
}

Footer.propTypes = {
  className: PropTypes.string
}

export const Layout = props => {
  const { children, hasFooter, sidebarSize, hasSidebar, className, style } = props
  let wrapperClassNames = ['txst-wrapper-no-sidebar']
  if (hasSidebar && sidebarSize > 0) {
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
      sidebarSize={sidebarSize}
      style={style}
    >
      {children}
    </Wrapper>
  )
}

Layout.defaultProps = {
  hasFooter: true,
  hasSidebar: true,
  sidebarSize: 200
}

Layout.propTypes = {
  /** Setting to false will disable the footer */
  hasFooter: PropTypes.bool,
  /** Controls the size of the sidebar. */
  sidebarSize: PropTypes.number,
  /** Disables the presence of the side bar */
  hasSidebar: PropTypes.bool,
  className: PropTypes.string
}

Layout.Header = Header
Layout.Sidebar = Sidebar
Layout.Content = Content
Layout.Footer = Footer
