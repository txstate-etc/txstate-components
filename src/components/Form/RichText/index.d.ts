import * as React from 'react';

export interface RichTextProps {
  path: string;
  customOptions?: React.ElementType[]
}

export const RichText: React.FC<RichTextProps>;

