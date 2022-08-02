import React, { forwardRef } from "react";
import styled, { css } from "styled-components";
import type { Position, Size, Variant } from "libs/types";

const sm = css`
  height: 2.2rem;
  max-width: 20rem;
`;

const md = css`
  height: 2.5rem;
  max-width: 25rem;
`;

const lg = css`
  height: 3rem;
  max-width: 30rem;
`;

const primary = css`
  background-color: ${(p) => (p.theme.state === "light" ? "#f7f8fb" : "#3B4252")};
  color: ${(p) => p.theme.colorText};
  border: 2px solid transparent;
  & > svg {
    color: ${(p) => (p.theme.state === "light" ? "#828997" : "#979ba3")};
  }
  &:focus-within:not([aria-invalid="true"]) {
    border-color: ${(p) => (p.theme.state === "light" ? "#D8DEE9" : "#4c566a")};
  }
`;

const secondary = css`
  background-color: transparent;
  color: ${(p) => p.theme.colorText};
  border-bottom: 1px solid ${(p) => (p.theme.state === "light" ? "#D8DEE9" : "#4c566a")};
  border-radius: 0;
`;

const neutral = css`
  background-color: transparent;
  color: ${(p) => p.theme.colorText};
  border: 1px solid ${(p) => (p.theme.state === "light" ? "#D8DEE9" : "#4c566a")};
`;

const baseInput = css<{ elementSize: Size; variant: Variant }>`
  width: 100%;
  padding-inline: 1rem;
  border-radius: ${(p) => p.theme.borderRadius};
  font-size: 0.9rem;
  outline: none;
  transition: all 150ms ease-in;
  ${(p) => p.elementSize === "sm" && sm}
  ${(p) => p.elementSize === "md" && md}
  ${(p) => p.elementSize === "lg" && lg}
  ${(p) => p.variant === "primary" && primary}
  ${(p) => p.variant === "secondary" && secondary}
  ${(p) => p.variant === "neutral" && neutral}
  &::placeholder {
    color: ${(p) => (p.theme.state === "light" ? "#828997" : "#979ba3")};
  }
`;

const StyledInput = styled.input<{ elementSize: Size; variant: Variant }>`
  ${baseInput}
  ${(p) =>
    p["aria-invalid"] &&
    css`
      border-color: #bf616a;
    `}
`;

const Wrapper = styled.div<{
  position: Position;
  invalid: boolean;
  elementSize: Size;
  variant: Variant;
}>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  ${baseInput}
  ${StyledInput} {
    background-color: transparent;
    border: none;
    border-radius: 0;
    padding-inline: 0;
  }
  ${(p) =>
    p.invalid &&
    css`
      border-color: #bf616a !important;
    `}
  ${(p) =>
    p.position === "right" &&
    css`
      flex-direction: row-reverse;
    `}
`;

interface Props extends React.ComponentPropsWithoutRef<"input"> {
  elementSize: Size;
  variant: Variant;
  withIcon?: {
    position: Position;
  };
}

const Input = forwardRef<HTMLInputElement, Props>(
  ({ children, withIcon, elementSize, variant, ...props }, ref) => {
    if (withIcon) {
      return (
        <Wrapper
          position={withIcon.position}
          invalid={props["aria-invalid"] as boolean}
          elementSize={elementSize}
          variant={variant}
        >
          {children}
          <StyledInput ref={ref} elementSize={elementSize} variant={variant} {...props} />
        </Wrapper>
      );
    } else {
      return <StyledInput ref={ref} elementSize={elementSize} variant={variant} {...props} />;
    }
  }
);

export default Input;
