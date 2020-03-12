import React from 'react'
import { IconComponent } from './Icon.types'

export const Checkmark: IconComponent = ({ height, width, stroke, fill }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 365 365"
    >
      <path
        fill="none"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="40"
        d="M24.49 183.08L131.79 286.65 340.08 78.35"
      ></path>
    </svg>
  )
}
