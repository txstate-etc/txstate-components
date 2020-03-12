import React from 'react'
import { ComponentSize } from '../../utils/helper.types'

export interface ButtonProps {
  label: string
  onClick?: (event?: React.MouseEvent<any>) => void
  variant?: 'primary' | 'outline' | 'transparent'
  size?: ComponentSize
  ariaLabel?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  className?: string
  id?: string
  style?: React.CSSProperties
}

export type ButtonComponent = React.FunctionComponent<ButtonProps>
