import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Stack, Button, SidePanel, Form, DatePicker } from '../components'

const Title = styled.h1``

export const PanelExamples = props => {
  const [isNearOpen, setIsNearOpen] = useState(false)
  const [isFarOpen, setIsFarOpen] = useState(false)

  const handleNearDismiss = useCallback(() => {
    setIsNearOpen(false)
  }, [setIsNearOpen])

  const handleFarDismiss = useCallback(() => {
    setIsFarOpen(false)
  }, [setIsNearOpen])

  const toggleNearPanel = useCallback(() => {
    setIsNearOpen(open => !open)
  }, [setIsNearOpen])

  const toggleFarPanel = useCallback(() => {
    setIsFarOpen(open => !open)
  }, [setIsFarOpen])

  return (
    <>
      <Stack horizontal horizontalAlign='space-between'>
        <Button label='Open Near Panel' ariaLabel='open near panel' onClick={toggleNearPanel} />
        <Button label='Open Far Panel' ariaLabel='open near panel' onClick={toggleFarPanel} />
      </Stack>
      <SidePanel onDismiss={handleNearDismiss} side='near' isOpen={isNearOpen}>
          <Title>I am a near panel</Title>
          <Form>
            <DatePicker path='date' label='Date' variant='inline' />
          </Form>
      </SidePanel>
      <SidePanel onDismiss={handleFarDismiss} side='far' isOpen={isFarOpen}><Title>I am a far panel</Title></SidePanel>
    </>
  )
}

export default {
  title: 'Components | Panel',
  component: PanelExamples
}

export const Panel = {
  title: 'Panel',
  component: PanelExamples
}
