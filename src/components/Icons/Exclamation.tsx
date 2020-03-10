import React from 'react'
import { IconComponent } from './Icon.types'

export const Exclamation: IconComponent = props => {
  const {
    height = 24,
    width = 24,
    stroke = '#000000',
    fill = '#000000'
  } = props

  return (
    <svg viewBox="0 0 3.943 17.969" stroke={stroke} fill={fill} width={width} height={height}>
      <path d="M3.43 12.316H.5L.086 0h3.76zm-1.465 1.929a1.977 1.977 0 011.435.528 1.786 1.786 0 01.543 1.34 1.771 1.771 0 01-.543 1.33 1.977 1.977 0 01-1.435.53 1.96 1.96 0 01-1.422-.53A1.771 1.771 0 010 16.113a1.791 1.791 0 01.543-1.34 1.948 1.948 0 011.422-.528z"></path>
    </svg>
  )
}
