import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div.attrs(props => ({
  sideSize: props.sidebarSize || 200
}))`
  display: grid;
  grid-template-columns: ${({ sideSize }) => sideSize}px 1fr;
  grid-template-rows: 64px 1fr 44px;
  grid-template-areas:
    'header header'
    'sidebar content'
    'footer footer';
  background-color: #ffffff;
`

const HeaderContainer = styled.header`
  grid-area: header;
  background-color: blue;
`

const Header = props => {
  const { children, className } = props
  return <HeaderContainer className={className}>{children}</HeaderContainer>
}

const SidebarContainer = styled.section`
  grid-area: sidebar;
`

const Sidebar = props => {
  const { children, className } = props
  return <SidebarContainer className={className}>{children}</SidebarContainer>
}

const ContentContainer = styled.section`
  grid-area: content;
  overflow: auto;
`

const Content = props => {
  const { children, className } = props
  return <ContentContainer className={className}>{children}</ContentContainer>
}

const FooterContainer = styled.footer`
  grid-area: footer;
`

const Footer = props => {
  const { children, className } = props
  return <FooterContainer className={className}>{children}</FooterContainer>
}

export const Layout = props => {
  const { children, sidebarSize, className } = props
  return (
    <Wrapper sidebarSize={sidebarSize} className={className}>
      {children}
    </Wrapper>
  )
}

Layout.Header = Header
Layout.Sidebar = Sidebar
Layout.Content = Content
Layout.Footer = Footer
