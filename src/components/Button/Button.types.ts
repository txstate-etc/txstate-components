import React from 'react'

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface ButtonProps {
  label: string
  onClick?: (event?: React.MouseEvent<any>) => void
  variant?: 'primary' | 'outline' | 'transparent'
  size?: ButtonSize
  ariaLabel?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  className?: string
  id?: string
  style?: React.CSSProperties
}

export type ButtonComponent = React.FunctionComponent<ButtonProps>
