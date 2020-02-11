import * as React from 'react'
import { ChoiceGroupStyle } from '../../ChoiceGroup'

export interface RadioGroupOptions {
  key?: string;
  text?: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  path: string;
  label?: string;
  ariaLabel?: string;
  initialSelectedKey?: string;
  required?: boolean;
  options?: RadioGroupOptions[];
  styles?: ChoiceGroupStyle
  id?: string;
  className?: string;
}

export const RadioGroup: React.FC<RadioGroupProps>
