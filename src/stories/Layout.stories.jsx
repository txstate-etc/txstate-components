import React from 'react'
import { storiesOf } from '@storybook/react'
import { Layout } from '../components'
import styled, { css } from 'styled-components'

const { Header, Content, Footer, Sidebar } = Layout

const GrayLayout = styled(Layout)`
  background-color: #303030;
  height: 600px;
  width: 900px;
`
const Base = css`
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
`

const GrayContent = styled(Content)`
  background-color: #404040;
`

const GrayHeader = styled(Header)`
  ${Base};
  background-color: #606060;
`

const GraySidebar = styled(Sidebar)`
  background-color: #505050;
  ${Base};
`

const GrayFooter = styled(Footer)`
  background-color: #606060;
  ${Base};
`

const OverflowingContent = styled.div`
  background-color: #808080;
`

storiesOf('Layout', module).add('basic', () => {
  const words = []
  for (let i = 0; i < 1000; i++) {
    words.push(
      <span>
        Really long content
        <br />
      </span>
    )
  }
  return (
    <GrayLayout>
      <GrayHeader>
        <span>Header</span>
      </GrayHeader>
      <GraySidebar>
        <span>Sidebar</span>
      </GraySidebar>
      <GrayContent>
        <OverflowingContent>{words}</OverflowingContent>
      </GrayContent>
      <GrayFooter>
        <span>Footer</span>
      </GrayFooter>
    </GrayLayout>
  )
})
