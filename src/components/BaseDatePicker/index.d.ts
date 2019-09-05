import * as React from 'react';

import { Dayjs } from 'dayjs';

export type BaseDatePickerVariant = "dialog" | "inline" | "static";

export interface BaseDatePickerProps {
  variant?: BaseDatePickerVariant;
  minDate?: Date;
  maxDate?: Date;
  emptyLabel?: string;
  format?: string;
  value?: Dayjs;
  onChange?: (...args: any[]) => any;
  mask?: string;
}

export const BaseDatePicker: React.FC<BaseDatePickerProps>;

