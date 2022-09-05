import styled, { css } from "styled-components";

const Container = styled.div`
  width: 100%;
  margin: 2rem auto;
  padding-inline: 1rem;
`;

const Title = styled.h1`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  @media (min-width: 800px) {
    font-size: 1.4rem;
  }
`;

const containerAdditionalCss = css`
  position: relative;
  min-height: 50vh;
`;

export { Container, Title, containerAdditionalCss };
