import { Button, Toast } from "../components";
import { action } from "@storybook/addon-actions";
import "./Button.css";

export default {
  title: "Components|Button",
  component: Button,
  args: {
    label: 'Button',
    variant: "primary"
  },
}

export const PrimaryButton = {
  args: {
    label: 'Button',
    variant: "primary"
  },
}

// export const PrimaryButton = {
//   render: () => <Button label="Primary" ariaLabel="Primary" />,
//   name: "primary button",
// };

export const OutlineButton = {
  component: Button,
  args: {
    label: 'Outline',
    variant: 'outline'
  },
  name: "Outline button",
};

export const TransparentButton = {
  name: "Transparent button",
  component: Button,
  args: {
    label: "Transparent",
    variant: "transparent",
    ariaLabel: "Transparent",
  },
  render: (args) => (
    <div
      style={{
        backgroundColor: "#bababa",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Button {...args} />
    </div>
  )
};

export const OnClick = {
  component: Button,
  name: "On Click",
  args: {
    label: 'On Click',
    ariaLabel: "primary button",
    onClick: () =>
      Toast.makeText({
        message: "We'll cover this component later",
      })
    }
};

export const Styled = {
  component: Button,
  args: {
    label: "Styled",
    ariaLabel: "styled button",
    className: "white-label tomato-primary"
  },
  name: "Styled",
};
