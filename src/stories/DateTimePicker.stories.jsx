import {
  Form,
  BaseDatePicker,
  BaseTimePicker,
  BaseDateTimePicker,
} from "../components";

export default {
  title: "Components|DateTimePicker",
  component: BaseDatePicker
};

export const Date = {
  component: BaseDatePicker,
  name: "date",
};

export const DateTime = {
  component: BaseDateTimePicker,
  name: "date time",
};

export const Time = {
  component: BaseTimePicker,
  name: "time",
};

export const DateFilled = {
  name: "date filled",
  component: BaseDatePicker,
  args: {
    variant: 'filled'
  }
};

export const DateTimeFilled = {
  name: "date time filled",
  component: BaseDateTimePicker,
  args: {
    variant: 'filled'
  }
};

export const TimeFilled = {
  name: "time filled",
  component: BaseTimePicker,
  args: {
    variant: 'filled'
  }
};

export const DateInline = {
  name: "date inline",
  component: BaseDatePicker,
  args: {
    variant: 'inline'
  }
};

export const DateTimeInline = {
  name: "date time inline",
  component: BaseDateTimePicker,
  args: {
    variant: 'inline'
  }
};

export const TimeInline = {
  name: "time inline",
  component: BaseTimePicker,
  args: {
    variant: 'inline'
  }
};

export const DateDisabled = {
  name: "date disabled",
  component: BaseDatePicker,
  args: {
    variant: 'inline',
    disabled: true
  }
};

export const DateTimeDisabled = {
  name: "date time disabled",
  component: BaseDateTimePicker,
  args: {
    variant: 'inline',
    disabled: true
  }
};

export const TimeDisabled = {
  name: "time disabled",
  component: BaseTimePicker,
  args: {
    variant: 'inline',
    disabled: true
  }
};
