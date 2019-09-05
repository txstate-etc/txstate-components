import * as React from 'react';

export type SwitchSize = "small" | "large";

export interface SwitchProps {
  size?: SwitchSize;
  on?: boolean;
  onValueChange?: (...args: any[]) => any;
}

export const Switch: React.FC<SwitchProps>;

