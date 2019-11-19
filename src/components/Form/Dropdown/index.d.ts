import * as React from 'react'
import { IComboBoxStyles } from 'office-ui-fabric-react/lib/ComboBox'

export interface DropdownOptions {
  key: string;
  text?: string;
}

export interface DropdownProps {
  ref?: React.MutableRefObject<HTMLInputElement | undefined>
  label: string;
  path: string;
  options?: DropdownOptions[];
  disabled?: boolean;
  styles?: Partial<IComboBoxStyles>;
  className?: string;
  initialSelectedKey?: string;
}

export const Dropdown: React.FC<DropdownProps>
