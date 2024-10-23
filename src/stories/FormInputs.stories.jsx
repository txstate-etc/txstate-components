import { Form, Button, Label, Stack } from "../components";
import {
  TextInput,
  Checkbox,
  RadioGroup,
  RichText,
  DatePicker,
  DateTimePicker,
  TimePicker,
  TagPicker,
  TextArea,
  Dropdown,
  Toggle,
} from "../components/Form/Inputs";

export default {
  title: "Form|Inputs",
  component: Form,
};

export const TextInputStory = {
  name: "Text Input",
  component: TextInput,
  render: (thing) => (
    <Form>
      <TextInput
        label="Airspeed velocity of an unladen swallow"
        path="swallowSpeed"
        placeholder="african or european?"
      />
    </Form>
  )
}

export const TextAreaStory = {
  name: "Text Area",
  component: TextArea,
  render: () => (
    <Form>
      <TextArea
        label="Swallow Description"
        path="swallowDescription"
        placeholder="please describe the unladen swallow"
      />
    </Form>
  )
}

export const DropdownStory = {
  render: () => (
    <Form>
      <Dropdown
        label="Swallow Type"
        options={[
          {
            key: "african",
            text: "African",
          },
          {
            key: "european",
            text: "European",
          },
        ]}
        path="swallowType"
      />
    </Form>
  ),

  name: "Dropdown",
};

export const PickerStory = {
  render: () => (
    <Form>
      <TagPicker
        path="swallowColors"
        label="What colors is your swallow?"
        items={[
          {
            name: "red",
            key: "red",
          },
          {
            name: "blue",
            key: "blue",
          },
          {
            name: "green",
            key: "green",
          },
          {
            name: "yellow",
            key: "yellow",
          },
          {
            name: "orange",
            key: "orange",
          },
          {
            name: "purple",
            key: "purple",
          },
        ]}
        itemLimit={2}
        ariaLabel="swallow color choices"
      />
    </Form>
  ),

  name: "Picker",
};

export const ToggleStory = {
  render: () => (
    <Form>
      <Toggle defaultOn path="swallowLadenStatus" label="Swallow is Laden" />
    </Form>
  ),

  name: "Toggle",
};

export const CheckboxStory = {
  render: () => (
    <Form>
      <Stack spacing={12}>
        <Label>Select Laden Swallow Testing Loads</Label>
        <Stack horizontal spacing={12}>
          <Stack spacing={12}>
            <Checkbox label="Coconut" path="coconut" />
            <Checkbox label="Grapefruit" path="grapefruit" />
            <Checkbox label="Watermelon" path="watermelon" />
          </Stack>
          <Stack spacing={12}>
            <Checkbox label="Orange" path="orange" />
            <Checkbox label="Very Small Rocks" path="smallrocks" />
            <Checkbox label="A Duck" path="duck" />
          </Stack>
        </Stack>
      </Stack>
    </Form>
  ),

  name: "Checkbox",
};

export const RadiogroupStory = {
  render: () => (
    <Form>
      <RadioGroup
        path="swallowType"
        label="Swallow Type"
        ariaLabel="choose the type of swallow to test"
        initialSelectedKey="african"
        options={[
          {
            key: "african",
            text: "African",
          },
          {
            key: "european",
            text: "European",
          },
        ]}
      />
    </Form>
  ),

  name: "Radiogroup",
};

export const DatePickerStory = {
  render: () => (
    <Form>
      <DatePicker
        variant="inline"
        label="Swallow Departure"
        path="swallowDepart"
        displayFormat="DD/MM/YYYY"
        mask="__-__-____"
        format="DD/MM/YYYY"
        placeholder="31/10/2019"
        initialValue={null}
      />
    </Form>
  ),

  name: "Date Picker",
};

export const DateTimePickerStory = {
  render: () => (
    <Form>
      <DateTimePicker
        variant="inline"
        label="Swallow Departure"
        path="swallowDepart"
      />
    </Form>
  ),

  name: "Date Time Picker",
};

export const TimePickerStory = {
  render: () => (
    <Form>
      <TimePicker
        variant="inline"
        label="Swallow Departure Time"
        path="swallowDepartTime"
      />
    </Form>
  ),

  name: "Time Picker",
};

export const RichTextStory = {
  render: () => (
    <Form>
      <Label>Describe Swallow's Travel Itinerary</Label>
      <RichText path="path" />
    </Form>
  ),

  name: "Rich Text",
};
