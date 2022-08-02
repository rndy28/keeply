import { IconX } from "@tabler/icons";
import { BaseSmallContainer } from "components/UI/atoms/shared";
import styled from "styled-components";

const Container = styled(BaseSmallContainer)`
  position: relative;
  bottom: 5px;
`;

type Props = {
  handleClose: () => void;
};

const Close = ({ handleClose }: Props) => {
  return (
    <Container onClick={handleClose} className="close">
      <IconX />
    </Container>
  );
};

export default Close;
