import { forwardRef, ComponentPropsWithoutRef } from "react";
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

const baseInput = css<StyledInputProps>`
  width: 100%;
  padding-inline: 1rem;
  border-radius: 0.4rem;
  outline: none;
  font-size: 0.95rem;
  transition: all 150ms ease-in;
  ${(p) => p.elementSize === "sm" && sm}
  ${(p) => p.elementSize === "md" && md}
  ${(p) => p.elementSize === "lg" && lg}
  ${(p) => p.variant === "primary" && primary}
  ${(p) => p.variant === "secondary" && secondary}
  ${(p) => p.variant === "neutral" && neutral}
  &::placeholder {
    color: #828997;
    font-weight: 500;
    font-size: inherit;
  }
`;

const StyledInput = styled.input<StyledInputProps>`
  border-color: ${(p) => p["aria-invalid"] && "#bf616a !important"};
  ${baseInput}
`;

const Wrapper = styled.div<StyledWrapperProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.4rem;
  flex-direction: ${(p) => p.position === "right" && "row-reverse"};
  border-color: ${(p) => p.invalid && "#bf616a !important"};
  position: relative;
  input {
    background-color: transparent;
    border: none;
    border-radius: 0;
    padding-inline: 0;
  }
  ${baseInput}
`;

interface Props extends ComponentPropsWithoutRef<"input"> {
  elementSize: Size;
  variant: Variant;
  withIcon?: {
    position: Position;
  };
}

type StyledInputProps = Pick<Props, "elementSize" | "variant">;

type StyledWrapperProps = StyledInputProps & {
  position: Position;
  invalid?: boolean;
};

const Input = forwardRef<HTMLInputElement, Props>(
  ({ children, withIcon, elementSize, variant, "aria-invalid": invalid, ...props }, ref) => {
    if (withIcon) {
      return (
        <Wrapper invalid={invalid as boolean} position={withIcon.position} elementSize={elementSize} variant={variant}>
          {children}
          <StyledInput aria-invalid={invalid} ref={ref} elementSize={elementSize} variant={variant} {...props} />
        </Wrapper>
      );
    }
    return <StyledInput aria-invalid={invalid} ref={ref} elementSize={elementSize} variant={variant} {...props} />;
  },
);

Input.displayName = "Input";

export default Input;
