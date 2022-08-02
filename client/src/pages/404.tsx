import { IconAlertTriangle } from "@tabler/icons";
import Button from "components/UI/atoms/Button";
import { useMeQuery } from "generated/graphql";
import { css } from "styled-components";

const notFoundLayout = css`
  display: grid;
  place-items: center;
  min-height: 100vh;
  text-align: center;
  width: 90%;
  margin-inline: auto;
  & > div {
    max-width: 25rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    & img {
      width: 100%;
    }
  }
`;

const error = css`
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: #fef2f2;
  color: #991b1b;
  border-radius: 0.4rem;
  padding-inline: 1rem;
  font-size: 0.95rem;
  margin-block: 0.5rem;
  & span {
    position: relative;
    top: 3px;
  }
`;

const FourOhFour = () => {
  const [{ data }] = useMeQuery();

  if (typeof data === "undefined") return null;

  return (
    <div css={notFoundLayout}>
      <div>
        <img src="/assets/404.svg" alt="404 illustration" />
        <div css={error}>
          <IconAlertTriangle />
          <span>404</span>
        </div>
        <h3>Page not Found</h3>
        <p>
          Sorry, the page you are looking for doesn&apos;t exist or has been removed. Keep exploring
          out site:
        </p>
        {data?.me || data ? (
          <Button variant="primary" size="lg" asLink to="/notes">
            Back to notes
          </Button>
        ) : (
          <Button variant="primary" size="lg" asLink to="/signin">
            Signin
          </Button>
        )}
      </div>
    </div>
  );
};

export default FourOhFour;
