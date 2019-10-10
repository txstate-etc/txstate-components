import * as React from 'react';

export interface ChoiceGroupProps {
  ariaLabel: string;
  label?: string;
  options?: any;
  required?: boolean;
  onChange?: (...args: any[]) => any;
  selectedKey?: string;
  styles?: any;
  id?: string;
}

export const ChoiceGroup: React.FC<ChoiceGroupProps>;

