import * as React from 'react';

export interface DropdownOptions {
  key: string;
  text?: string;
}

export interface DropdownProps {
  label: string;
  path: string;
  options?: DropdownOptions[];
}

export const Dropdown: React.FC<DropdownProps>;

