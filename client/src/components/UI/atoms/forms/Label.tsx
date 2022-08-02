import React from "react";
import styled from "styled-components";

const Container = styled.label`
  font-weight: 500;
`;

interface Props extends React.ComponentPropsWithoutRef<"label"> {}

const Label = ({ children, ...props }: Props) => {
  return <Container {...props}>{children}</Container>;
};

export default Label;
