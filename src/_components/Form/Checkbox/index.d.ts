import * as React from 'react'
import { ICheckboxStyles } from 'office-ui-fabric-react/lib/Checkbox'

export interface CheckboxProps {
  path: string;
  label: string;
  ariaLabel?: string;
  name?: string;
  className?: string;
  styles?: Partial<ICheckboxStyles>
}

export const Checkbox: React.FC<CheckboxProps>
