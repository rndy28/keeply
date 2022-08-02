import styled from "styled-components";
import React from "react";

const Container = styled.div`
  background-color: ${(p) => p.theme.colorLabelBackground};
  color: ${(p) => p.theme.colorLabel};
  font-weight: 700;
  border-radius: 2px;
  user-select: none;
  width: fit-content;
  height: 20px;
  padding-inline: 4px;
  padding-top: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.813rem;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: nowrap;
  cursor: default;
  &[role="button"] {
    cursor: pointer;
    user-select: text;
  }
`;

interface Props extends React.ComponentPropsWithoutRef<"div"> {}

const Label = ({ children, ...props }: Props) => {
  return <Container {...props}>{children}</Container>;
};

export default Label;
