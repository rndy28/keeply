import { css } from "styled-components";

export const notFoundLayout = css`
  display: grid;
  place-items: center;
  min-height: 100vh;
  text-align: center;
  & > div {
    max-width: 25rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    & p {
      margin-bottom: 0.5rem;
    }
    & h3 {
      font-size: 2.5rem;
    }
    & img {
      width: 100%;
    }
  }
`;

export const error = css`
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  background-color: #fef2f2;
  color: #991b1b;
  border-radius: 0.4rem;
  padding-inline: 1rem;
  font-size: 0.95rem;
  margin-block: 1rem;
  & span {
    position: relative;
    top: 4px;
    font-weight: 700;
  }
`;
