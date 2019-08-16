import React from 'react'
import styled from 'styled-components'
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
`

const Header = props => {
  const { children, className } = props
  return (
    <header className={`txst-header-container ${className}`}>{children}</header>
  )
}

const Sidebar = props => {
  const { children, className } = props
  return <div className={`txst-sidebar-container ${className}`}>{children}</div>
}

const Content = props => {
  const { children, className } = props
  return (
    <main className={`txst-content-container ${className}`}>{children}</main>
  )
}

const Footer = props => {
  const { children, className } = props
  return (
    <footer className={`txst-footer-container ${className}`}>{children}</footer>
  )
}

export const Layout = props => {
  const { children, hasFooter, sidebarSize, className } = props
  let wrapperClassNames = ['txst-wrapper-no-sidebar']
  if (sidebarSize > 0) {
    wrapperClassNames = ['txst-wrapper']
  }

  if (!hasFooter) {
    wrapperClassNames.push('txst-wrapper-no-footer')
  }

  return (
    <Wrapper
      className={`${className} ${wrapperClassNames.join(' ')}`}
      sidebarSize={sidebarSize}
    >
      {children}
    </Wrapper>
  )
}

Layout.defaultProps = {
  hasFooter: true
}

Layout.Header = Header
Layout.Sidebar = Sidebar
Layout.Content = Content
Layout.Footer = Footer
