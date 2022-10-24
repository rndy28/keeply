import { IconAlertTriangle } from "@tabler/icons";
import { Helmet } from "react-helmet-async";
import { error, notFoundLayout } from "styles/errorPage";

const FiveOhThree = () => {
  return (
    <>
      <Helmet>
        <meta property="og:title" content="Under maintenance" />
        <meta property="og:description" content="Sorry this site is under maintenance" />
        <title>503 | keeply</title>
      </Helmet>
      <div css={notFoundLayout}>
        <div>
          <img src="/assets/503.svg" alt="503 illustration" />
          <div css={error}>
            <IconAlertTriangle />
            <span>503</span>
          </div>
          <h3>This site is on maintenance</h3>
          <p>Sorry, the site you are looking for is under maintenance.</p>
        </div>
      </div>
    </>
  );
};

export default FiveOhThree;
