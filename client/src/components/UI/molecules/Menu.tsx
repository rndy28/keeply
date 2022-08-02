import styled from "styled-components";
import { motion, HTMLMotionProps } from "framer-motion";
import { menuVariant } from "libs/animation";
import React from "react";

const Container = styled(motion.div)`
  background-color: ${(p) => p.theme.colorBackground};
  border-radius: ${(p) => p.theme.borderRadius};
  color: ${(p) => p.theme.colorText};
  position: absolute;
  display: flex;
  flex-direction: column;
  padding-block: 0.5rem;
  box-shadow: ${(p) => p.theme.boxShadow};
  width: fit-content;
  min-width: 8rem;
  z-index: 3;
`;

const Option = styled.span`
  padding: 0.5rem 1rem;
  cursor: pointer;
  &:hover {
    background-color: ${(p) => (p.theme.state === "light" ? "#eceff4" : "#434C5E")};
  }
`;

interface Props<P, O extends React.ReactNode> extends HTMLMotionProps<"div"> {
  items: P;
  noteId: string;
  onAction: (id: string, type: O) => void;
  menuRef?: React.RefObject<HTMLDivElement>;
}

function Menu<P, O extends React.ReactNode>({
  items,
  onAction,
  noteId,
  menuRef,
  ...props
}: Props<P, O>) {
  return (
    <Container
      ref={menuRef}
      role="menu"
      variants={menuVariant}
      initial="hidden"
      animate="visible"
      exit="hidden"
      {...props}
    >
      {items instanceof Array &&
        items.map((item: O, index: number) => (
          <Option key={index} role="menuitem" onClick={() => onAction(noteId, item)}>
            {item}
          </Option>
        ))}
    </Container>
  );
}

export default Menu;
