import type { Size, Variant } from "libs/types";
import React, { forwardRef } from "react";
import styled, { css, keyframes } from "styled-components";
import { Link, To } from "react-router-dom";

const spin1 = keyframes`
     0%    {clip-path: polygon(50% 50%,0       0,  50%   0%,  50%    0%, 50%    0%, 50%    0%, 50%    0% )}
   12.5% {clip-path: polygon(50% 50%,0       0,  50%   0%,  100%   0%, 100%   0%, 100%   0%, 100%   0% )}
   25%   {clip-path: polygon(50% 50%,0       0,  50%   0%,  100%   0%, 100% 100%, 100% 100%, 100% 100% )}
   50%   {clip-path: polygon(50% 50%,0       0,  50%   0%,  100%   0%, 100% 100%, 50%  100%, 0%   100% )}
   62.5% {clip-path: polygon(50% 50%,100%    0, 100%   0%,  100%   0%, 100% 100%, 50%  100%, 0%   100% )}
   75%   {clip-path: polygon(50% 50%,100% 100%, 100% 100%,  100% 100%, 100% 100%, 50%  100%, 0%   100% )}
   100%  {clip-path: polygon(50% 50%,50%  100%,  50% 100%,   50% 100%,  50% 100%, 50%  100%, 0%   100% )}
`;

const spin2 = keyframes`
    0%    {transform:scaleY(1)  rotate(0deg)}
  49.99%{transform:scaleY(1)  rotate(135deg)}
  50%   {transform:scaleY(-1) rotate(0deg)}
  100%  {transform:scaleY(-1) rotate(-135deg)}
`;

const ButtonLoader = styled.div<{ size: Size }>`
  width: ${(p) => p.size === "lg" && "1.4rem"};
  width: ${(p) => p.size === "md" && "1.2rem"};
  width: ${(p) => p.size === "sm" && "1rem"};
  aspect-ratio: 1;
  border-radius: 50%;
  border: 2px solid #eceff4;
  animation: ${spin1} 0.8s infinite linear alternate, ${spin2} 1.6s infinite linear;
`;

const sm = css`
  height: 2.2rem;
  max-width: 6rem;
  font-size: 0.9rem;
`;

const md = css`
  height: 2.5rem;
  max-width: 10rem;
  font-size: 0.92rem;
`;

const lg = css`
  height: 3rem;
  max-width: 11rem;
`;

const primary = css`
  background-color: ${(p) => p.theme.colorAccent};
  color: ${(p) => p.theme.colorAccentText};
`;

const neutral = css`
  background-color: transparent;
  color: ${(p) => (p.theme.state === "light" ? p.theme.colorAccent : p.theme.colorAccentText)};
  &:hover {
    border-color: ${(p) => p.theme.colorBorder};
  }
`;
const danger = css`
  background-color: #bf616a;
  color: #eceff4;
`;

const disabled = css`
  box-shadow: 0 1px 0 rgb(0 0 0 / 45%);
  opacity: 0.5;
  cursor: default;
  span {
    display: none;
  }
  &:hover {
    border-color: transparent;
  }
`;

const baseBtn = css<StyledButtonProps>`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid transparent;
  border-radius: ${(p) => p.theme.borderRadius};
  width: 100%;
  font-size: 1rem;
  font-weight: 400;
  transition: all 250ms ease;
  &:hover {
    border-color: ${(p) => (p.theme.state === "light" ? "#ECEFF4" : "#4c566a")};
  }
  &:disabled {
    ${disabled}
  }
  ${(p) => p.size === "sm" && sm}
  ${(p) => p.size === "md" && md}
  ${(p) => p.size === "lg" && lg}
  ${(p) => p.variant === "primary" && primary}
  ${(p) => p.variant === "neutral" && neutral}
  ${(p) => p.variant === "danger" && danger}
    ${(p) =>
    p.withIcon &&
    css`
      gap: 0.5rem;
    `}
`;

const Container = styled.button<StyledButtonProps>`
  ${baseBtn}
`;

const ContainerLink = styled(Link)<StyledButtonProps>`
  ${baseBtn}
`;

type StyledButtonProps = {
  variant: Variant | "danger";
  size: Size;
  loading?: boolean;
  withIcon?: boolean;
};

interface Props extends React.ComponentPropsWithoutRef<"button">, StyledButtonProps {}

interface PropsLink extends React.ComponentPropsWithoutRef<"a">, StyledButtonProps {
  asLink: boolean;
  to: To;
}

const Button = forwardRef<unknown, Props | PropsLink>(
  ({ children, loading, size, ...props }, ref) => {
    return "asLink" in props ? (
      <ContainerLink {...props} ref={ref as React.ForwardedRef<HTMLAnchorElement>} size={size}>
        {loading ? <ButtonLoader size={size} /> : children}
      </ContainerLink>
    ) : (
      <Container {...props} ref={ref as React.ForwardedRef<HTMLButtonElement>} size={size}>
        {loading ? <ButtonLoader size={size} /> : children}
      </Container>
    );
  }
);

export default Button;
