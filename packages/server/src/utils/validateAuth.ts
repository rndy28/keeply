type Return = { error: { field: string; message: string } } | undefined;

export const validateAuth = (email: string, password: string): Return => {
  if (email === "")
    return {
      error: {
        field: "email",
        message: "email is required",
      },
    };

  if (
    !email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    )
  )
    return {
      error: {
        field: "email",
        message: "email is invalid",
      },
    };

  if (password === "")
    return {
      error: {
        field: "password",
        message: "password is required",
      },
    };

  if (password.length < 3)
    return {
      error: {
        field: "password",
        message: "password length must be 3+",
      },
    };
};
