/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import { Exclamation } from '../Icons/Exclamation'
import { Theme } from '../../utils/Theme'
import { errorBoxStyle } from './common.styles'

export const ErrorBox: React.FunctionComponent<{msg?: string}> = ({ msg }) => {
  if (!msg) return null
  return (
    <div
      css={errorBoxStyle}
    >
      <Exclamation
        fill={Theme.white.hex()}
        stroke={Theme.white.hex()}
        height={16}
        width={16}
      />
    </div>
  )
}
