import React from "react";
import { fireEvent, screen, userEvent } from "@storybook/testing-library";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Button } from "components/UI/atoms";

export default {
  title: "Button",
  component: Button,
  argTypes: {
    onClick: { name: "handleClick" },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "3rem",
        }}
      >
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
export const Secondary = Template.bind({});

Primary.args = {
  size: "lg",
  variant: "primary",
  children: "Button",
};

Secondary.args = {
  size: "lg",
  variant: "secondary",
  children: "Button",
};
