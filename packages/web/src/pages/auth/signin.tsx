import { IconEye, IconEyeOff } from "@tabler/icons";
import { Button, Input, InputError, InputLabel } from "components/UI/atoms";
import { useSigninFromGoogleMutation, useSigninMutation } from "generated/graphql";
import { EMAIL_REGEX } from "libs/constants/regexEmail";
import { useTheme } from "libs/contexts/ThemeContext";
import { useChangePasswordType } from "libs/hooks/useChangePasswordType";
import { useGoogleSignIn } from "libs/hooks/useGoogleSignIn";
import type { IUser } from "libs/types";
import {
  Container,
  ForgotPassword,
  Form,
  Group,
  Illustration,
  Or,
  Redirect,
  Title,
} from "pages/auth/style";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm<Omit<IUser, "name">>();
  const [passwordType, onTogglePassword] = useChangePasswordType();
  const [{ fetching }, signin] = useSigninMutation();
  const [, signinFromGoogle] = useSigninFromGoogleMutation();
  const theme = useTheme();
  const navigate = useNavigate();

  useGoogleSignIn({
    cb: async (cred) => {
      await signinFromGoogle({ tokenId: cred.credential });
      navigate("/notes");
    },
    buttonOptions: {
      theme: theme.state === "light" ? "filled_blue" : "filled_black",
    },
  });

  const onSubmit: SubmitHandler<Omit<IUser, "name">> = async (data) => {
    const response = await signin({
      email: data.email,
      password: data.password,
    });

    if (response.data?.signin.error) {
      const { field, message } = response.data.signin.error;
      setError(field as "email" | "password", { type: "validate", message });
    } else {
      navigate("/notes");
    }
  };

  return (
    <Container>
      <Illustration>
        <h1>
          <span>Keeply</span>Manage your note with ease
        </h1>
        <img src="/assets/undraw_add_tasks_re_s5yj.svg" />
      </Illustration>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Title>Sign In to keeply</Title>

        <div id="signInDiv"></div>
        <Or>
          <span className="line"></span>
          Or
          <span className="line"></span>
        </Or>

        <Group>
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input
            id="email"
            elementSize="lg"
            variant="neutral"
            autoFocus
            aria-invalid={
              errors.email?.type === "required" ? true : errors.email?.type === "pattern"
            }
            aria-errormessage="email-error"
            {...register("email", { required: true, pattern: EMAIL_REGEX })}
          />
          {errors.email?.type === "required" && (
            <InputError id="email-error">email is required</InputError>
          )}
          {errors.email?.type === "pattern" && (
            <InputError id="email-error">email is invalid</InputError>
          )}
          {errors.email?.type === "validate" && (
            <InputError id="email-error">{errors.email.message}</InputError>
          )}
        </Group>

        <Group>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            id="password"
            elementSize="lg"
            variant="neutral"
            type={passwordType}
            aria-invalid={errors.password?.type === "required"}
            aria-errormessage="password-error"
            withIcon={{ position: "right" }}
            {...register("password", { required: true, minLength: 3 })}
          >
            {passwordType === "password" ? (
              <IconEye color="#4C566A" style={{ cursor: "pointer" }} onClick={onTogglePassword} />
            ) : (
              <IconEyeOff
                color="#4C566A"
                style={{ cursor: "pointer" }}
                onClick={onTogglePassword}
              />
            )}
          </Input>
          {errors.password?.type === "required" && (
            <InputError id="password-error">password is required</InputError>
          )}
          {errors.password?.type === "minLength" && (
            <InputError id="password-error">password length should be 3+</InputError>
          )}
          {errors.password?.type === "validate" && (
            <InputError id="password-error">{errors.password.message}</InputError>
          )}
        </Group>

        <ForgotPassword to="/forgot-password">forgot password?</ForgotPassword>

        <Button type="submit" size="lg" variant="primary" loading={fetching}>
          Sign In
        </Button>
        <Redirect>
          Don&apos;t have an account?
          <Link to="/signup" className="link">
            Sign Up
          </Link>
        </Redirect>
      </Form>
    </Container>
  );
};

export default SignIn;
