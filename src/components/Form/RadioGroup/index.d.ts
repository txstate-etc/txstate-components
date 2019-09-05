import * as React from 'react';

export interface RadioGroupOptions {
  key?: string;
  text?: string;
}

export interface RadioGroupProps {
  path: string;
  options?: RadioGroupOptions[];
}

export const RadioGroup: React.FC<RadioGroupProps>;

