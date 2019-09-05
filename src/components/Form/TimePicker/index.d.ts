import * as React from 'react';

import dayjs from 'dayjs';

export interface TimePickerProps {
  initialValue?: dayjs;
  emptyLabel?: string;
  displayFormat?: string;
  format?: string;
  mask?: string;
  disabled?: boolean;
  placeholder?: string;
}

export const TimePicker: React.FC<TimePickerProps>;

