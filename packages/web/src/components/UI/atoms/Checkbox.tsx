import React from "react";
import styled from "styled-components";

const Checkmark = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: inherit;
  width: inherit;
  background-color: ${(p) => p.theme.colorBackground};
  border: 1px solid ${(p) => (p.theme.state === "light" ? "#adb2ba" : "#707888")};
  border-radius: 0.3rem;
  &::after {
    content: "";
    position: absolute;
    display: none;
  }
`;

const Input = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
  &:checked ~ ${Checkmark} {
    background-color: #4c566a;
  }
  &:checked ~ ${Checkmark}::after {
    display: block;
  }
`;

const Container = styled.label`
  position: relative;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  height: 20px;
  width: 20px;
  & ${Checkmark}::after {
    left: 7px;
    top: 2px;
    width: 5px;
    height: 10px;
    border: solid #eceff4;
    border-width: 0 2px 2px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`;

interface Props extends React.ComponentPropsWithoutRef<"input"> {}

const Checkbox = (props: Props) => {
  return (
    <Container>
      <Input type="checkbox" {...props} />
      <Checkmark></Checkmark>
    </Container>
  );
};

export default Checkbox;
