import React from 'react'
import { storiesOf } from '@storybook/react'
import { Button, Stack, Form, Text, TextInput, SidePanel, usePanel } from '../components'

const EmptyPanels = props => {
  const {
    isOpen: nearIsOpen,
    open: openNear,
    close: closeNear
  } = usePanel(false)

  const {
    isOpen: farIsOpen,
    open: openFar,
    close: closeFar
  } = usePanel(false)

  return (
    <>
      <Stack horizontal spacing={12}>
        <Button label='Open Left' ariaLabel='Open Left Side Panel' onClick={openNear} />
        <Button label='Open Right' ariaLabel='Open Right Side Panel' onClick={openFar} />
      </Stack>
      <SidePanel
        size='small'
        side='near'
        onDismiss={closeNear}
        isOpen={nearIsOpen}
      />
      <SidePanel
        size='small'
        side='far'
        onDismiss={closeFar}
        isOpen={farIsOpen}
      />
    </>
  )
}

const PanelForm = props => {
  const {
    open,
    isOpen,
    close
  } = usePanel(false)

  return (
    <>
      <SidePanel
        isOpen={isOpen}
        onDismiss={close}
        onRenderHeader={() => <Text renderAs='h1' style={{ marginLeft: 12 }}>My Custom Form</Text>}
      >
        <Form>
          <TextInput
            label='Favorite Pokémon'
            path='pokémon'
            onGetErrorMessage={(e, value) => {
              if (value.toLowerCase() !== 'squirtle') return 'Your favorite pokémon must be Squirtle.'
            }}
          />
        </Form>
      </SidePanel>
      <Button
        label='Open Form'
        ariaLabel='Open Form'
        onClick={open}
      />
    </>
  )
}

const CustomWidth = props => {
  const {
    open,
    isOpen,
    close
  } = usePanel(false)

  return (
    <>
      <SidePanel
        isOpen={isOpen}
        onDismiss={close}
        size='custom'
        customWidth={600}
        onRenderHeader={() => <Text renderAs='h1' style={{ marginLeft: 12 }}>Custom Width Panel</Text>}
      />
      <Button
        label='Open Form'
        ariaLabel='Open Form'
        onClick={open}
      />
    </>
  )
}

storiesOf('SidePanel', module)
  .add('empty', () => <EmptyPanels />)
  .add('with form', () => <PanelForm />)
  .add('custom width', () => <CustomWidth />)
