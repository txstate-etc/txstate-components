import * as React from 'react';

export type ToggleSize = "small" | "large";

export interface ToggleProps {
  path: string;
  size?: ToggleSize;
  defaultOn?: boolean;
  label?: string;
}

export const Toggle: React.FC<ToggleProps>;

