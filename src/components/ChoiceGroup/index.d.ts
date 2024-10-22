import * as React from 'react'
import { IChoiceGroupStyles, IChoiceGroupOption } from '@fluentui/react/lib/ChoiceGroup'
import { IStyle } from '@fluentui/react'

interface IExtendedStyle {
  errorMessage: IStyle
}

export type ChoiceGroupStyle = Partial<IExtendedStyle & IChoiceGroupStyles>

export interface ChoiceGroupProps {
  ariaLabel: string;
  className?: string;
  label?: string;
  options?: IChoiceGroupOption[];
  required?: boolean;
  onChange?: (...args: any[]) => any;
  selectedKey?: string;
  styles?: ChoiceGroupStyle;
  initialSelectedKey?: string;
  error?: string;
  id?: string;
}

export const ChoiceGroup: React.FC<ChoiceGroupProps>
