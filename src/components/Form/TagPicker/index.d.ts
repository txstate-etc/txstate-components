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
}

export const TagPicker: React.FC<TagPickerProps>
