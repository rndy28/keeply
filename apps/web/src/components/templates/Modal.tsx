import styled from "styled-components";
import { createPortal } from "react-dom";
import { motion, HTMLMotionProps } from "framer-motion";
import { modalVariant } from "libs/animation";

const Container = styled(motion.div)`
  position: fixed;
  z-index: 999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  & > *:first-child {
    background-color: ${(p) => p.theme.colorBackground};
    border-radius: ${(p) => p.theme.borderRadius};
  }
`;

const Title = styled.h1`
  color: ${(p) => p.theme.colorText};
  font-size: 1.5rem;
`;

interface Props extends HTMLMotionProps<"div"> {}

const Wrapper = ({ children, ...rest }: Props) => {
  return createPortal(
    <Container variants={modalVariant} initial="hidden" animate="visible" exit="exit" role="dialog" {...rest}>
      {children}
    </Container>,
    document.getElementById("root")!,
  );
};

const Modal = Object.assign(Wrapper, { Title });

export default Modal;
