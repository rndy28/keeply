import { IconEye, IconEyeOff } from "@tabler/icons";
import { Button, Input, InputError, InputLabel } from "components/UI/atoms";
import { useChangePasswordMutation } from "generated/graphql";
import { useChangePasswordType } from "libs/hooks/useChangePasswordType";
import type { IUser } from "libs/types";
import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Group } from "./style";

type Password = Pick<IUser, "password"> & { confirmPassword: string };

const ChangePassword = () => {
  const param = useParams();
  const [passwordType, onTogglePassword] = useChangePasswordType();
  const [confirmPasswordType, onToggleConfirmPassword] = useChangePasswordType();
  const [, changePassword] = useChangePasswordMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Password>();
  const navigate = useNavigate();
  const password = useRef({});
  password.current = watch("password", "");
  const [tokenError, setTokenError] = useState("");

  const onSubmit: SubmitHandler<Password> = async (data) => {
    const { data: changePasswordData } = await changePassword({
      token: param.token as string,
      newPassword: data.password,
    });

    if (changePasswordData?.changePassword) {
      navigate("/signin");
    } else if (changePasswordData?.changePassword.error && "token" in changePasswordData?.changePassword) {
      setTokenError(changePasswordData.changePassword.error.message);
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
          <InputLabel>Password</InputLabel>
          <Input
            type={passwordType}
            variant="neutral"
            elementSize="lg"
            aria-invalid={errors.password?.type === "required"}
            aria-errormessage="password-error"
            withIcon={{ position: "right" }}
            {...register("password", { required: true, minLength: 3 })}
          >
            {passwordType === "password" ? (
              <IconEye color="#4C566A" style={{ cursor: "pointer" }} onClick={onTogglePassword} />
            ) : (
              <IconEyeOff color="#4C566A" style={{ cursor: "pointer" }} onClick={onTogglePassword} />
            )}
          </Input>
          {errors.password?.type === "required" && <InputError id="password-error">password is required</InputError>}
          {errors.password?.type === "minLength" && (
            <InputError id="password-error">password length should be 3+</InputError>
          )}
        </Group>
        <Group>
          <InputLabel>Confirm Password</InputLabel>
          <Input
            type={confirmPasswordType}
            variant="neutral"
            elementSize="lg"
            aria-invalid={errors.password?.type === "required"}
            aria-errormessage="password-confirm-error"
            withIcon={{ position: "right" }}
            {...register("confirmPassword", {
              required: true,
              minLength: 3,
              validate: (value) => value === password.current || "The passwords do not match",
            })}
          >
            {confirmPasswordType === "password" ? (
              <IconEye color="#4C566A" style={{ cursor: "pointer" }} onClick={onToggleConfirmPassword} />
            ) : (
              <IconEyeOff color="#4C566A" style={{ cursor: "pointer" }} onClick={onToggleConfirmPassword} />
            )}
          </Input>
          {errors.confirmPassword && (
            <InputError id="confirm-password-error">{errors.confirmPassword.message}</InputError>
          )}
        </Group>
        <Button size="lg" variant="primary" type="submit">
          Change password
        </Button>
        {tokenError !== "" && (
          <a
            href={tokenError}
            css={`
              font-size: 0.9rem;
              display: block;
              margin-top: 1rem;
              text-decoration: underline;
              width: 100%;
              text-align: end;
            `}
          >
            Click here to get new token
          </a>
        )}
      </Form>
    </div>
  );
};

export default ChangePassword;
