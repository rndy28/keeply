import styled from "styled-components";

const Container = styled.h1`
  font-size: 2rem;
`;

interface Props extends React.ComponentPropsWithoutRef<"div"> {
  type: "initial" | "full";
}

const Logo = ({ type, ...props }: Props) => {
  return (
    <Container className="logo" {...props}>
      {type === "initial" ? "k" : "keeply"}
    </Container>
  );
};

export default Logo;
