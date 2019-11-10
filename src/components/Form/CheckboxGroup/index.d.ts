import * as React from 'react';

export interface CheckboxProps {
  path: string;
  label: string;
  ariaLabel?: string;
  name?: string;
}

export const Checkbox: React.FC<CheckboxProps>;

