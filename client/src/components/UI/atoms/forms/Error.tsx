import React from "react";
import styled from "styled-components";

const Container = styled.span`
  font-size: 0.813rem;
  font-weight: 500;
  color: #f26565;
  display: inline-block;
  margin-top: 0.4rem;
`;

interface Props extends React.ComponentPropsWithoutRef<"span"> {}

const Error = ({ children, ...props }: Props) => {
  return <Container {...props}>{children}</Container>;
};

export default Error;
