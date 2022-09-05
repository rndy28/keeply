import React, { forwardRef } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  max-width: 60rem;
  border-radius: 0.5rem;
  padding: 0.7rem 0.8rem;
  display: flex;
  overflow: hidden;
  position: relative;
  font-family: "Poppins";
`;

const Placeholder = styled.span<{ fontSize?: number }>`
  visibility: ${(p) => (p["aria-hidden"] ? "hidden" : "visible")};
  position: absolute;
  top: 15px;
  color: ${(p) => (p.theme.state === "light" ? "#828997" : "#979ba3")};
  font-size: ${(p) => (p.fontSize ? `${p.fontSize}rem` : "1rem")};
`;

const Input = styled.div<{ fontSize?: number }>`
  min-height: 20px;
  max-height: 100px;
  width: 100%;
  max-width: inherit;
  color: ${(p) => (p.theme.state === "light" ? p.theme.colorAccent : p.theme.colorAccentText)};
  font-family: inherit;
  word-wrap: break-word;
  white-space: pre-wrap;
  overflow-y: visible;
  overflow-x: hidden;
  position: relative;
  z-index: 1;
  padding-right: 0.3rem;
  line-height: 1.6;
  outline: none;
  user-select: text;
  bottom: 1.5px;
  font-size: ${(p) => (p.fontSize ? `${p.fontSize}rem` : "1rem")};
  &::-webkit-scrollbar-thumb {
    background-color: #828997;
  }
`;

interface Props extends React.ComponentPropsWithoutRef<"div"> {
  value: string;
  fontSize?: number;
}

const TextBox = forwardRef<HTMLDivElement, Props>(
  ({ value, placeholder, onChange, fontSize, ...props }, ref) => {
    return (
      <Container>
        <Placeholder aria-hidden={value.length > 0} fontSize={fontSize}>
          {placeholder}
        </Placeholder>
        <Input
          ref={ref}
          role="textbox"
          spellCheck={false}
          contentEditable
          onInput={onChange}
          fontSize={fontSize}
          {...props}
        ></Input>
      </Container>
    );
  },
);

TextBox.displayName = "TextBox";

export default TextBox;
