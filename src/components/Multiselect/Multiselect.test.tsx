import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render, RenderResult, fireEvent } from '@testing-library/react'
import { Form } from '../Form/Form'
import { Multiselect } from './Multiselect'

let renderRes:RenderResult
let input:HTMLElement
let selection:HTMLElement

beforeEach(() => {
  renderRes = render(<Form>
    <Multiselect path='cars' label='Cars' initialItems={[
      { key: 'ford', text: 'Ford' },
      { key: 'saab', text: 'Saab' },
      { key: 'subaru', text: 'Subaru' },
      { key: 'volvo', text: 'Volvo' }
    ]}
    initialValue={[
      { key: 'ford', text: 'Ford' }
    ]}/>
  </Form>)
  const { getAllByLabelText } = renderRes;
  [input, selection] = getAllByLabelText('Cars')
})

test('loads multiselect with one selected car', async () => {
  expect(input).toBeDefined()
  expect(selection).toBeDefined()
  expect(selection).toHaveClass('multiselect-pill')
  expect(selection).toHaveTextContent('Ford')
})

test('shows menu when input is clicked', async () => {
  fireEvent.click(input)
  const { findByText } = renderRes
  const volvo = await findByText('Volvo', {}, { container: document.body })
  expect(volvo).toBeDefined()
})

test('adds Volvo to the selections', async () => {
  fireEvent.click(input)
  const { findByText, getByText } = renderRes
  const volvo = await findByText('Volvo', {}, { container: document.body })
  fireEvent.click(volvo)
  fireEvent.keyDown(volvo, { key: 'Escape', code: 'Escape' })
  const selectedVolvo = await findByText('Volvo')
  const menuSubaru = getByText('Subaru')
  expect(selectedVolvo).toHaveClass('multiselect-pill')
  expect(menuSubaru).not.toHaveClass('multiselect-pill')
})
