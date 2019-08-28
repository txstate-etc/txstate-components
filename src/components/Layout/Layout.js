import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import './Layout.css'

const Wrapper = styled.div`
  display: grid;
  background-color: #ffffff;

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

const Header = props => {
  const { children, className, style } = props
  return (
    <header className={`txst-header-container ${className}`} style={style}>{children}</header>
  )
}

Header.propTypes = {
  className: PropTypes.string
}

const Sidebar = props => {
  const { children, className, style } = props
  return <div className={`txst-sidebar-container ${className}`} style={style}>{children}</div>
}

Sidebar.propTypes = {
  className: PropTypes.string
}

const Content = props => {
  const { children, className, style } = props
  return (
    <main className={`txst-content-container ${className}`} style={style}>{children}</main>
  )
}

Content.propTypes = {
  className: PropTypes.string
}

const Footer = props => {
  const { children, className, style } = props
  return (
    <footer className={`txst-footer-container ${className}`} style={style}>{children}</footer>
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
