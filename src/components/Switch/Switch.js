import React, { useReducer, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { Theme } from '../Theme'
import PropTypes from 'prop-types'

const slideRight = (thumb, track) => keyframes`
  0% {
    transform: translateX(0);
  }

  60% {
    /* Translate X by 25% of thumb diameter to simulate stretching */
    transform: translateX(${0.25 * thumb}px) scaleX(1.5) scaleY(0.8);
  }

  100% {
    /* Translate by the track length - thumb diameter  */
    transform: translateX(${track - thumb}px) scaleX(1.0) scaleY(1.0);
  }
`
const slideLeft = (thumb, track) => keyframes`
  0% {
    transform: translateX(${track - thumb}px);
  }

  60% {
    transform: translateX(${track - 1.25 * thumb}px) scaleX(1.5) scaleY(0.8);
  }

  100% {
    transform: translateX(0) scaleX(1.0) scaleY(1.0);
  }
`

const Thumb = styled.div.attrs(({ size }) => ({
  thumb: SIZES[size].thumbWidth || 25,
  track: SIZES[size].trackWidth || 65
}))`
  width: ${({ thumb }) => thumb}px;
  height: ${({ thumb }) => thumb}px;
  border-radius: ${({ thumb }) => thumb / 2}px;
  background-color: ${({ on }) => (on ? Theme.maroon : Theme.charcoal)};
  transition: background-color 300ms ease-in-out;

  &.disabled {
    background-color: ${Theme.lightGray};
  }

  &.slide-right {
    animation: ${({ thumb, track }) => slideRight(thumb, track)} 300ms ease-in-out;
    animation-fill-mode: forwards;
  }

  &.slide-left {
    animation: ${({ thumb, track }) => slideLeft(thumb, track)} 300ms ease-in-out;
    animation-fill-mode: reverse;
  }
`

const Track = styled.div`
  padding: 2px;
  border-radius: ${({ size }) => (SIZES[size].thumbWidth + 8) / 2 || 15}px;
  border: solid 2px ${({ on }) => (on ? Theme.maroon : Theme.charcoal)};
  box-shadow: ${({ on }) =>
    on ? `0px 0px 5px 2px ${Theme.maroon}80` : 'none'};
  width: ${({ size }) => SIZES[size].trackWidth || 65}px;
  background-color: ${Theme.white};

  &.disabled {
    border-color: ${Theme.lightGray};
  }

  transition: border 300ms ease-in-out, box-shadow 300ms ease-in-out;
`

const SIZES = {
  large: {
    trackWidth: 65,
    thumbWidth: 25
  },
  small: {
    trackWidth: 45,
    thumbWidth: 15
  }
}

const switchReducer = (state, action) => {
  switch (action.type) {
    case 'on':
      if (action.disabled) return state
      return {
        ...state,
        on: true,
        className: 'slide-right'
      }
    case 'off':
      if (action.disabled) return state
      return {
        ...state,
        on: false,
        className: 'slide-left'
      }
    default:
      return state
  }
}

export const Switch = props => {
  const { disabled, label, onValueChange, size, on } = props
  const [state, dispatch] = useReducer(switchReducer, {
    on,
    className: ''
  })

  const _handleClick = () => {
    if (disabled) return
    const nextOn = !state.on
    dispatch({ type: nextOn ? 'on' : 'off', disabled })
  }

  useEffect(() => {
    onValueChange(state.on)
  }, [state.on])

  useEffect(() => {

  }, [size])

  return (
    <div onClick={_handleClick} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {label ? <label style={{ marginRight: 12 }}>{label}</label> : null}
      <Track size={size} className={disabled ? 'disabled' : state.className} on={state.on}>
        <Thumb size={size} className={disabled ? 'disabled' : state.className} on={state.on} />
      </Track>
    </div>
  )
}

Switch.defaultProps = {
  size: 'small',
  on: false,
  onValueChange: () => null
}

Switch.propTypes = {
  size: PropTypes.oneOf(['small', 'large']),
  on: PropTypes.bool,
  onValueChange: PropTypes.func
}
