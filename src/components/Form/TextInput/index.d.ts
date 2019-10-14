import * as React from 'react';

export interface TextInputProps {
  label: string;
  path: string;
  className?: string;
  multiline?: boolean;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}

export const TextInput: React.FC<TextInputProps>;

