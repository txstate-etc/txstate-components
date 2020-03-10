import React from 'react'
import { IconComponent } from './Icon.types'

export const PasswordShow: IconComponent = ({ width, height, stroke, fill }) => {
  return (
    <svg width={width ?? 24} height={height ?? 24} viewBox="0 0 21.052 14">
      <g fill="#fff">
        <path
          d="M10.498 13c-2.955 0-5.47-1.572-6.706-2.51C1.87 9.034 1.024 7.636.96 7.237c.21-.568 1.223-2.093 2.92-3.532C5.338 2.471 7.668 1 10.499 1c2.97 0 5.454 1.651 6.67 2.635 1.862 1.506 2.754 2.975 2.839 3.38-.08.402-.967 1.864-2.838 3.366C15.95 11.36 13.464 13 10.498 13z"
          transform="translate(-238.957 -1399) translate(238.957 1399) translate(.043)"
        ></path>
        <path
          fill={fill}
          d="M10.498 2C8.009 2 5.923 3.304 4.61 4.399 3.259 5.525 2.408 6.68 2.06 7.272c.3.514 1.125 1.563 2.632 2.64C5.783 10.692 7.988 12 10.498 12c2.412 0 4.49-1.204 5.809-2.213 1.454-1.114 2.3-2.235 2.608-2.77-.31-.54-1.157-1.667-2.604-2.785C14.994 3.214 12.916 2 10.498 2m0-2c5.805 0 10.484 5.555 10.512 7 .028 1.445-4.707 7-10.512 7C4.692 14-.47 8.49-.015 7c.456-1.49 4.707-7 10.513-7z"
          transform="translate(-238.957 -1399) translate(238.957 1399) translate(.043)"
        ></path>
      </g>
      <g
        fill={fill}
        stroke={stroke}
        transform="translate(-238.957 -1399) translate(238.957 1399) translate(6.043 3)"
      >
        <ellipse cx="4.5" cy="4" rx="4.5" ry="4"></ellipse>
        <ellipse cx="4.5" cy="4" rx="4" ry="3.5"></ellipse>
      </g>
    </svg>
  )
}
