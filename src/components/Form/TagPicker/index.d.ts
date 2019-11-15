import * as React from 'react'

export interface TagPickerItems {
  key?: string;
  name?: string;
}

export interface TagPickerProps {
  className?: string;
  ariaLabel: string;
  label: string;
  path: string;
  itemLimit?: number;
  items?: TagPickerItems[];
  onRenderItem?: (...args: any[]) => any;
}

export const TagPicker: React.FC<TagPickerProps>
