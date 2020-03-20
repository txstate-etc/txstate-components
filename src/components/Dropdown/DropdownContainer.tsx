/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React from 'react'

const containerStyle = css`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  display: block;
  position: relative;
`

interface DropdownContainerProps {
  className?: string
}

type DropdownContainer = React.RefForwardingComponent<HTMLDivElement, DropdownContainerProps & { children?: React.ReactNode }>

const _DropdownContainer: DropdownContainer = (props, ref) => {
  const { className, children } = props
  return (
    <div
      ref={ref}
      className={className}
      css={containerStyle}
    >
      {children}
    </div>
  )
}

export const DropdownContainer = React.forwardRef(_DropdownContainer)
