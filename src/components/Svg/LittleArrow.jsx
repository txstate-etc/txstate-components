import * as React from 'react'
export const SvgLittleArrow = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    style={{
      strokeWidth: 1.3,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeMiterlimit: 10,
    }}
    viewBox="0 0 8.6 12.9"
    width={24}
    height={24}
    stroke="white"
    fill="white"
    {...props}
  >
    <path
      d="m8 8.8-3.6 3.4L.7 8.8M4.3.7v11.4"
      style={{
        fill: 'none',
      }}
    />
  </svg>
)
