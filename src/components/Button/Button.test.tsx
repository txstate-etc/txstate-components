import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Button } from './Button'

test('loads button with aria label', async () => {
  const { getByLabelText } = render(<Button label='My Button' ariaLabel='Activate My Button' className='purple-outline' />)

  getByLabelText('Activate My Button')
})

test('loads button and responds to click event', () => {
  const onClick = jest.fn()

  const { getByRole } = render(<Button label='Test Button' onClick={onClick} />)
  fireEvent.click(getByRole('button'))

  expect(onClick).toHaveBeenCalledTimes(1)
})

test('loads outline variant with white backgorund', () => {
  const { getByRole } = render(<Button label='My Button' variant='outline' />)

  const domNode = getByRole('button')
  expect(domNode).toHaveStyle('background-color: #ffffff; border-radius: 3px')
})

test('allows overriding styles with inline styles object', () => {
  const { getByRole } = render(<Button label='My Button' variant='outline' style={{ backgroundColor: 'tomato' }} />)

  const domNode = getByRole('button')
  expect(domNode).toHaveStyle('background-color: tomato;')
})

test('font size is correct for a given size', () => {
  const { getByRole } = render(<Button label='My Button' size='xs' />)

  expect(getByRole('button')).toHaveStyle('font-size: 0.7rem')
})
