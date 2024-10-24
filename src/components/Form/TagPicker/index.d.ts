import * as React from 'react'
import { IBasePickerStyles } from '@fluentui/react/lib/Pickers'

export interface TagPickerItems {
  key?: string;
  name?: string;
}

export interface TagPickerProps {
  className?: string;
  description?: string;
  ariaLabel: string;
  label: string;
  path: string;
  itemLimit?: number;
  items?: TagPickerItems[];
  styles?: Partial<IBasePickerStyles>
  onRenderItem?: (...args: any[]) => any;
}

export const TagPicker: React.FC<TagPickerProps>
