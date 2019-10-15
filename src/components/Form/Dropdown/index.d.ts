import * as React from 'react';
import { IComboBoxStyles } from 'office-ui-fabric-react/lib/ComboBox'

export interface DropdownOptions {
  key: string;
  text?: string;
}

export interface DropdownProps {
  label: string;
  path: string;
  options?: DropdownOptions[];
  disabled?: boolean;
  styles?: IComboBoxStyles;
}

export const Dropdown: React.FC<DropdownProps>;

