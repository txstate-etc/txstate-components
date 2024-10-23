import { BasePicker } from "../components";

export default {
  title: 'Components | Picker',
  component: BasePicker
}

export const Picker = {
  title: 'BasePicker',
  component: BasePicker,
  args: {
    items: [
      { key: "red", name: "red" },
      { key: "orange", name: "orange" },
      { key: "yellow", name: "yellow" },
      { key: "green", name: "green" },
      { key: "blue", name: "blue" },
      { key: "indigo", name: "indigo" },
      { key: "violet", name: "violet" }
    ],
    itemLimit: 3
  }
}
