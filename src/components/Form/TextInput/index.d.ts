import * as React from 'react';
import { IIconProps } from 'office-ui-fabric-react'

export interface TextInputProps {
  label: string;
  path: string;
  className?: string;
  multiline?: boolean;
  type?: string;
  placeholder?: string;
  required?: boolean;
  iconProps?: IIconProps
}

export const TextInput: React.FC<TextInputProps>;

