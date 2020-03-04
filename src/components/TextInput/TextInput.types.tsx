import React from 'react'
export interface TextInputProps {
  label: string
  id?: string
}

export type TextInputComponent = React.FunctionComponent<TextInputProps>
