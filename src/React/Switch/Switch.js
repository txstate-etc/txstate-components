import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { Theme } from '../Theme'

const slideRight = keyframes`
  0% {
    transform: translateX(0);
  }

  60% {
    transform: translateX(25px) scaleX(2.0) scaleY(0.8);
  }

  100% {
    transform: translateX(100px) scaleX(1.0) scaleY(1.0);
  }
`
const slideLeft = keyframes`
  0% {
    transform: translateX(100px);
  }

  60% {
    transform: translateX(75px) scaleX(2.0) scaleY(0.8);
  }

  100% {
    transform: translateX(0) scaleX(1.0) scaleY(1.0);
  }
`

const Thumb = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: ${({ on }) => (on ? Theme.maroon : Theme.charcoal)};
  transition: background-color 300ms ease-in-out;

  &.disabled {
    background-color: ${Theme.lightGray};
  }

  &.slide-right {
    animation: ${slideRight} 300ms ease-in-out;
    animation-fill-mode: forwards;
  }

  &.slide-left {
    animation: ${slideLeft} 300ms ease-in-out;
    animation-fill-mode: reverse;
  }
`

const Track = styled.div`
  padding: 4px;
  border-radius: 50px;
  border: solid 2px ${({ on }) => (on ? Theme.maroon : Theme.charcoal)};
  box-shadow: ${({ on }) =>
    on ? `0px 0px 5px 2px ${Theme.maroon}80` : 'none'};
  width: 150px;
  background-color: ${Theme.white};

  &.disabled {
    border-color: ${Theme.lightGray};
  }

  transition: border 300ms ease-in-out, box-shadow 300ms ease-in-out;
`

export const Switch = props => {
  const { disabled, onValueChange } = props
  const [on, setOn] = useState(null)
  const [className, setClassName] = useState('')

  const _handleClick = () => {
    if (disabled) return
    const nextOn = !on
    setOn(nextOn)
  }

  useEffect(() => {
    if (on === null) return
    setClassName(on ? 'slide-right' : 'slide-left')
    onValueChange(on)
  }, [on])

  return (
    <div onClick={_handleClick}>
      <Track className={disabled && 'disabled'} on={on}>
        <Thumb className={disabled ? 'disabled' : className} on={on} />
      </Track>
    </div>
  )
}

Switch.defaultProps = {
  onClick: () => null
}
