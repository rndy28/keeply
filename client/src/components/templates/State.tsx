import styled from "styled-components";

const Container = styled.div`
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 30rem;
`;

const Title = styled.h1`
  color: ${(p) => p.theme.colorText};
  @media (min-width: 950px) {
    font-size: 4rem;
  }
`;

const Description = styled.p`
  color: ${(p) => (p.theme.state === "light" ? p.theme.colorAccent : p.theme.colorAccentText)};
  @media (min-width: 950px) {
    font-size: 1.15rem;
  }
`;

type Props = {
  title: string;
  description: string;
};

const State = ({ title, description }: Props) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </Container>
  );
};

export default State;
