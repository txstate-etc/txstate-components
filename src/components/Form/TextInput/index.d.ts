import * as React from 'react';
import { IIconProps } from 'office-ui-fabric-react'
import { ITextFieldStyleProps } from 'office-ui-fabric-react/lib/TextField'

export interface TextInputProps {
  label: string;
  path: string;
  className?: string;
  multiline?: boolean;
  type?: string;
  placeholder?: string;
  required?: boolean;
  iconProps?: IIconProps;
  disabled?: boolean;
  SuccessComponent?: React.ElementType
  styles?: Partial<ITextFieldStyleProps>
}

export const TextInput: React.FC<TextInputProps>;
