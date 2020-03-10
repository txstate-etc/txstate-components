import React from 'react'
import { IconComponent } from './Icon.types'

export const PasswordHide: IconComponent = ({ stroke, width, height, fill }) => {
  return (
    <svg width={width ?? 24} height={height ?? 24} viewBox="0 0 20.391 15.718">
      <g fill="none" transform="translate(-331.957 -1446.641)">
        <path
          d="M10.166 13c-2.852 0-5.282-1.573-6.477-2.51C1.82 9.021 1.011 7.623.96 7.232c.2-.564 1.182-2.096 2.832-3.539C5.195 2.465 7.44 1 10.166 1c2.865 0 5.264 1.65 6.44 2.633 1.81 1.515 2.666 2.985 2.74 3.382-.07.394-.92 1.857-2.74 3.368-1.177.977-3.579 2.617-6.44 2.617z"
          transform="translate(331.957 1447) translate(.043)"
        ></path>
        <path
          fill={fill}
          d="M10.166 2C7.787 2 5.784 3.296 4.522 4.383 3.201 5.522 2.377 6.688 2.048 7.271c.279.507 1.074 1.562 2.545 2.65 1.05.777 3.17 2.079 5.573 2.079 2.431 0 4.535-1.38 5.573-2.201 1.421-1.126 2.238-2.255 2.525-2.782-.29-.531-1.107-1.667-2.522-2.798C14.476 3.207 12.481 2 10.166 2m0-2c5.624 0 10.155 5.555 10.182 7 .027 1.445-4.558 7-10.182 7C4.543 14-.457 8.49-.016 7c.442-1.49 4.559-7 10.182-7z"
          transform="translate(331.957 1447) translate(.043)"
        ></path>
        <g
          stroke={fill}
          transform="translate(331.957 1447) translate(5.854 3)"
        >
          <ellipse cx="4.5" cy="4" stroke="none" rx="4.5" ry="4"></ellipse>
          <ellipse cx="4.5" cy="4" rx="4" ry="3.5"></ellipse>
        </g>
        <path
          stroke={fill}
          strokeWidth="2"
          d="M0 15L15.469 0"
          transform="translate(334.4 1447)"
        ></path>
      </g>
    </svg>
  )
}
