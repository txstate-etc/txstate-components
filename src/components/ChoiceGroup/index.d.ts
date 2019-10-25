import * as React from 'react';
import { IChoiceGroupStyles } from 'office-ui-fabric-react/lib/ChoiceGroup'
import { IStyle } from 'office-ui-fabric-react'

interface IExtendedStyle {
  errorMessage: IStyle
}

export type ChoiceGroupStyle = IExtendedStyle & IChoiceGroupStyles

export interface IChoiceGroupOption {
  text: string
  key: string
  disabled: boolean
}

export interface ChoiceGroupProps {
  ariaLabel: string;
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

export const ChoiceGroup: React.FC<ChoiceGroupProps>;

