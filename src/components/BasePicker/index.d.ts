import * as React from 'react'
import { IBasePickerStyles } from '@fluentui/react/lib/Pickers'

export interface BasePickerItems {
  key: string;
}

export interface BasePickerValue {
  key: string;
}

export interface BasePickerProps {
  className?: string;
  styles?: Partial<IBasePickerStyles>
  label: string;
  items?: BasePickerItems[];
  ariaLabel: string;
  showSelectedItems?: boolean;
  onResolveItems?: (...args: any[]) => any;
  onItemSelected?: (...args: any[]) => any;
  getTextFromItem?: (...args: any[]) => any;
  itemLimit?: number;
  disabled?: boolean;
  canSelectDuplicates?: boolean;
  value?: BasePickerValue[];
  onChange?: (...args: any[]) => any;
  description?: string;
  onRenderItem?: (...args: any[]) => any;
  componentRef?: any
}

export const BasePicker: React.FC<BasePickerProps>
