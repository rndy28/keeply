import { useEffect } from "react";

export const useGoogleSignIn = ({
  cb,
  buttonOptions = { size: "large", theme: "filled_blue" },
}: {
  cb: (credentials: google.CredentialResponse) => void;
  buttonOptions?: google.GsiButtonConfiguration;
}) => {
  useEffect(() => {
    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: cb,
      auto_select: true,
    });
    google.accounts.id.prompt();
    google.accounts.id.renderButton(document.getElementById("signInDiv")!, {
      ...buttonOptions,
      locale: "en-US",
    });
  }, []);
};
