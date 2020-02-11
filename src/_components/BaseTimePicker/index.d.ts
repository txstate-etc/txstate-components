import * as React from 'react';

import { Dayjs } from 'dayjs';

export type BaseTimePickerVariant = "dialog" | "inline" | "static";

export interface BaseTimePickerProps {
  variant?: BaseTimePickerVariant;
  emptyLabel?: string;
  format?: string;
  value?: Dayjs;
  onChange?: (...args: any[]) => any;
  mask?: string;
  placeholder?: string;
}

export const BaseTimePicker: React.FC<BaseTimePickerProps>;

