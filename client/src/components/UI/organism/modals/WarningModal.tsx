import Modal from "components/templates/Modal";
import styled from "styled-components";
import { Button } from "components/UI/atoms";
import { Flex } from "components/UI/atoms/shared";
import { motion, HTMLMotionProps } from "framer-motion";
import { shortVariant } from "libs/animation";

const Container = styled(motion.div)`
  padding: 1.5rem;
  max-width: 20rem;
`;

const Title = styled.h1`
  font-size: 1.8rem;
`;

const Message = styled.p`
  margin-top: 0.5rem;
`;

interface Props extends HTMLMotionProps<"div"> {
  title: string;
  message: string;
  onDelete: () => void;
  onCancel: () => void;
  loading?: boolean;
}

const WarningModal = ({ title, message, onCancel, onDelete, loading, ...props }: Props) => {
  return (
    <Modal>
      <Container variants={shortVariant} initial="hidden" animate="visible" exit="exit" {...props}>
        <Title>{title}</Title>
        <Message>{message}</Message>
        <Flex
          gap={1}
          justifyContent="space-between"
          css={`
            margin-top: 1rem;
          `}
        >
          <Button
            size="md"
            variant="primary"
            onClick={onCancel}
            css={`
              max-width: 100%;
            `}
          >
            cancel
          </Button>
          <Button
            size="md"
            variant="danger"
            onClick={onDelete}
            loading={loading}
            css={`
              max-width: 100%;
            `}
          >
            remove
          </Button>
        </Flex>
      </Container>
    </Modal>
  );
};

export default WarningModal;
