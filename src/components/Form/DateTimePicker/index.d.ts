import * as React from 'react';

import { Dayjs } from 'dayjs';

export type DateTimePickerVariant = "dialog" | "inline" | "static";

export interface DateTimePickerProps {
  variant?: DateTimePickerVariant;
  minDate?: Date;
  maxDate?: Date;
  initialValue?: Dayjs;
  emptyLabel?: string;
  displayFormat?: string;
  format?: string;
  mask?: string;
  disabled?: boolean;
  placeholder?: string;
}

export const DateTimePicker: React.FC<DateTimePickerProps>;

