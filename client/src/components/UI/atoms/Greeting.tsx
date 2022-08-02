import styled from "styled-components";
import { determineTime } from "libs/utils/determineTime";

const Container = styled.h1`
  font-size: 1.2rem;
  position: relative;
  top: 4px;
  @media (min-width: 768px) {
    font-size: 1.5rem;
    top: 5px;
  }
`;

type Props = {
  name: string;
};

const Greeting = ({ name }: Props) => {
  return (
    <Container>
      {determineTime()} {name} !
    </Container>
  );
};

export default Greeting;
