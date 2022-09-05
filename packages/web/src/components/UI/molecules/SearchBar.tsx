import { IconSearch } from "@tabler/icons";
import { Input } from "components/UI/atoms";
import React from "react";

interface Props extends React.ComponentPropsWithoutRef<"input"> {}

const SearchBar = (props: Props) => {
  return (
    <Input
      withIcon={{ position: "left" }}
      elementSize="lg"
      placeholder="search here..."
      type="search"
      variant="primary"
      {...props}
    >
      <IconSearch />
    </Input>
  );
};

export default SearchBar;
