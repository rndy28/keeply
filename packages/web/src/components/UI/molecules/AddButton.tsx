import { IconPlus } from "@tabler/icons";
import { Button } from "components/UI/atoms";
import type { Size } from "libs/types";
import React from "react";

interface Props extends React.ComponentPropsWithoutRef<"button"> {
  placeholder: string;
  size: Size;
}

const AddButton = ({ placeholder, ...props }: Props) => {
  return (
    <Button variant="primary" withIcon {...props}>
      <IconPlus size={22} />
      New {placeholder}
    </Button>
  );
};

export default AddButton;
