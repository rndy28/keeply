import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

const baseSmallText = css`
  font-size: 0.913rem;
  font-weight: 400;
  line-height: 1.5;
`;

export const Container = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 41rem;
  @media (min-width: 800px) {
    justify-content: space-between;
    flex-direction: row-reverse;
    height: 100vh;
  }
`;

export const Form = styled.form`
  max-width: 23rem;
  width: 90%;
  margin-inline: auto;
  button {
    margin-top: 1rem;
    max-width: 100%;
  }
  @media (min-width: 800px) {
    max-width: 20rem;
  }
  @media (min-width: 1024px) {
    max-width: 22rem;
  }
`;

export const Group = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  label {
    margin-bottom: 0.5rem;
  }
  & + & {
    margin-top: 1rem;
  }
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 1.2;
  margin-bottom: 2rem;
  @media (min-width: 1024px) {
    font-size: 1.8rem;
  }
`;

export const Redirect = styled.p`
  margin-top: 1rem;
  .link {
    text-decoration: underline;
    margin-left: 5px;
    font-weight: 700;
  }
  text-align: center;
  ${baseSmallText}
`;

export const Illustration = styled.div`
  display: none;
  @media (min-width: 900px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-left: 2px solid ${(p) => p.theme.colorBorder};
    height: 100%;
    width: 55%;

    & img {
      width: 90%;
      max-width: 60rem;
      height: fit-content;
    }
    & h1 {
      width: fit-content;
      margin-bottom: 1rem;
    }
    & span {
      color: #5e81ac;
      font-size: 3rem;
      display: block;
      margin-bottom: 1rem;
    }
  }
  @media (min-width: 1024px) {
    width: 60%;
  }
  @media (min-width: 1200px) {
    & img {
      width: 80%;
      height: 80%;
    }
    & h1 {
      font-size: 2.5rem;
      position: relative;
      top: 11%;
      margin-bottom: 0;
    }
  }
`;

export const ForgotPassword = styled(Link)`
  font-size: 0.9rem;
  text-decoration: underline;
  width: 100%;
  display: block;
  text-align: right;
  margin-top: 1rem;
`;

export const Or = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  margin-block: 1.5rem 1rem;
  .line {
    width: 100%;
    height: 1px;
    background-color: ${(p) => p.theme.colorBorder};
  }
`;
