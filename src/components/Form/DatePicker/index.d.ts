import * as React from 'react';

export type DatePickerVariant = "dialog" | "inline" | "static";

export interface DatePickerProps {
  variant?: DatePickerVariant;
  minDate?: Date;
  maxDate?: Date;
  emptyLabel?: string;
  displayFormat?: string;
  format?: string;
  mask?: string;
  disabled?: boolean;
  placeholder?: string;
}

export const DatePicker: React.FC<DatePickerProps>;

