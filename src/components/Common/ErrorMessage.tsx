/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React from 'react'
import { Theme } from '../../utils/Theme'

interface ErrorProps {
  text?: string
  className?: string
}

export const ErrorMessage: React.FunctionComponent<ErrorProps> = ({ text, className }) => {
  if (!text) return null
  return (
    <span
      className={className}
      css={css`
        font-size: 0.8rem;
        color: ${Theme.input.error.hex()};
      `}
    >
      {text}
    </span>
  )
}
