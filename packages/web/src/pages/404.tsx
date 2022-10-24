import { IconAlertTriangle } from "@tabler/icons";
import { Button } from "components/UI/atoms";
import { Helmet } from "react-helmet-async";
import { notFoundLayout, error } from "styles/errorPage";

const FourOhFour = () => {
  return (
    <>
      <Helmet>
        <meta property="og:title" content="Not found" />
        <meta property="og:description" content="Sorry the page you are looking for doesn't exist" />
        <title>404 | keeply</title>
      </Helmet>
      <div css={notFoundLayout}>
        <div>
          <img src="/assets/404.svg" alt="404 illustration" />
          <div css={error}>
            <IconAlertTriangle />
            <span>404</span>
          </div>
          <h1>Page not Found</h1>
          <p>Sorry, the page you are looking for doesn&apos;t exist or has been removed. Keep exploring out site:</p>
          <Button variant="primary" size="md" asLink to="">
            Go back home
          </Button>
        </div>
      </div>
    </>
  );
};

export default FourOhFour;
