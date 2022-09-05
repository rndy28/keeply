import { Button, Input, InputError, InputLabel } from "components/UI/atoms";
import { EMAIL_REGEX } from "libs/constants/regexEmail";
import type { IUser } from "libs/types";
import { SubmitHandler, useForm } from "react-hook-form";
import { useForgotPasswordMutation } from "generated/graphql";
import { Form, Group } from "./style";
import { useState } from "react";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<Pick<IUser, "email">>();
  const [{ fetching }, forgotPassword] = useForgotPasswordMutation();
  const [link, setLink] = useState("");

  const onSubmit: SubmitHandler<Pick<IUser, "email">> = async (data) => {
    const { data: respData } = await forgotPassword({ email: data.email });

    if (respData?.forgotPassword) {
      setLink(respData.forgotPassword);
    } else {
      setError("email", {
        message: "Cannot find that email",
        type: "validate",
      });
    }
  };

  return (
    <div
      css={`
        min-height: 100vh;
        display: grid;
        place-items: center;
      `}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Group>
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input
            elementSize="lg"
            variant="neutral"
            autoFocus
            aria-invalid={errors.email?.type === "required" ? true : errors.email?.type === "pattern"}
            aria-errormessage="email-error"
            {...register("email", { required: true, pattern: EMAIL_REGEX })}
          />
          {errors.email?.type === "required" && <InputError id="email-error">email is required</InputError>}
          {errors.email?.type === "pattern" && <InputError id="email-error">email is invalid</InputError>}
          {errors.email?.type === "validate" && <InputError id="email-error">{errors.email.message}</InputError>}
        </Group>
        <Button size="lg" variant="primary" type="submit" loading={fetching}>
          Forgot password
        </Button>
        {link !== "" && (
          <a
            href={link}
            css={`
              font-size: 0.9rem;
              display: block;
              margin-top: 1rem;
              text-decoration: underline;
              width: 100%;
              text-align: end;
            `}
          >
            Click here to change password
          </a>
        )}
      </Form>
    </div>
  );
};

export default ForgotPassword;
