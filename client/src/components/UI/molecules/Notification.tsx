import styled, { css } from "styled-components";
import { IconX } from "@tabler/icons";
import { createPortal } from "react-dom";

const bottomLeft = css`
  bottom: 1rem;
  left: 1rem;
`;
const bottomRight = css`
  bottom: 1rem;
  right: 1rem;
`;

const topLeft = css`
  top: 1rem;
  left: 1rem;
`;

const topRight = css`
  top: 1rem;
  right: 1rem;
`;

const Container = styled.div<{ position: Position }>`
  background-color: ${(p) => (p.theme.state === "light" ? "#D8DEE9" : "#3B4252")};
  border-radius: ${(p) => p.theme.borderRadius};
  /* min-height: 10rem; */
  width: fit-content;
  padding: 1rem;
  position: fixed;
  z-index: 999;
  ${(p) => p.position === "top left" && topLeft}
  ${(p) => p.position === "top right" && topRight}
  ${(p) => p.position === "bottom left" && bottomLeft}
  ${(p) => p.position === "bottom right" && bottomRight}
`;

const Title = styled.h1``;

const Message = styled.p``;

type Props = {
  type: "normal" | "dialog";
  position: Position;
  title?: string;
  message: string;
};

type Position = "bottom left" | "bottom right" | "top left" | "top right";

const Notification = ({ title, message, type, position }: Props) => {
  return createPortal(
    <Container
      role={type === "normal" ? "alert" : "alertdialog"}
      aria-labelledby="notification-title"
      aria-describedby="notification-message"
      position={position}
    >
      {title && <Title id="notification-title">{title}</Title>}
      <Message id="notification-message">{message}</Message>
    </Container>,
    document.getElementById("root")!
  );
};

export default Notification;
