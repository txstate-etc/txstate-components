import * as React from 'react';

import { Dayjs } from 'dayjs';

export type BaseDateTimePickerVariant = "dialog" | "inline" | "static";

export interface BaseDateTimePickerProps {
  variant?: BaseDateTimePickerVariant;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  format?: string;
  value?: Dayjs;
  onChange?: (...args: any[]) => any;
  placeholder?: string;
  mask?: string;
}

export const BaseDateTimePicker: React.FC<BaseDateTimePickerProps>;

