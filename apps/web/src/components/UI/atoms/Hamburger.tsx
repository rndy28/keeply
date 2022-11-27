import { IconMenu2 } from "@tabler/icons";
import { BaseSmallContainer } from "components/UI/atoms/shared";
import React from "react";
import styled from "styled-components";

const Container = styled(BaseSmallContainer)``;

interface Props extends React.ComponentPropsWithoutRef<"div"> {}

const Hamburger = (props: Props) => {
  return (
    <Container role="button" className="hamburger" {...props}>
      <IconMenu2 className="hamburger-icon" />
    </Container>
  );
};

export default Hamburger;
