import * as React from 'react'
import { ITextFieldStyles } from 'office-ui-fabric-react/lib/TextField'

export interface TextAreaProps {
  label: string;
  path: string;
  placeholder?: string;
  name?: string;
  styles?: Partial<ITextFieldStyles>
  className?: string
}

export const TextArea: React.FC<TextAreaProps>
