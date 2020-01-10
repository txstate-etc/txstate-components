import * as React from 'react';

type Maybe<T> = T | null

export type DatePickerVariant = "dialog" | "inline" | "static";

export interface DatePickerProps {
  path: string;
  variant?: DatePickerVariant;
  minDate?: Date;
  maxDate?: Date;
  emptyLabel?: string;
  displayFormat?: string;
  format?: string;
  mask?: string;
  disabled?: boolean;
  placeholder?: string;
  initialValue?: Maybe<Date>
  label?: string
}

export const DatePicker: React.FC<DatePickerProps>;

