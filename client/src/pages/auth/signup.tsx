import { IconEye, IconEyeOff } from "@tabler/icons";
import { Button, InputError, Input, InputLabel } from "components/UI/atoms";
import { EMAIL_REGEX } from "libs/constants/regexEmail";
import { useChangePasswordType } from "libs/hooks/useChangePasswordType";
import { useGoogleSignIn } from "libs/hooks/useGoogleSignIn";
import { Container, Form, Group, Illustration, Or, Redirect, Title } from "pages/auth/style";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import type { IUser } from "libs/types";
import { useSignupMutation, useSigninFromGoogleMutation } from "generated/graphql";
import { useTheme } from "libs/contexts/ThemeContext";

const SignUp = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm<IUser>();
  const [passwordType, onTogglePassword] = useChangePasswordType();
  const [, signup] = useSignupMutation();
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

  const onSubmit: SubmitHandler<IUser> = async (data) => {
    const response = await signup({
      name: data.name,
      email: data.email,
      password: data.password,
    });
    if (response.data?.signup.error) {
      const { field, message } = response.data.signup.error;
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
        <img src="/assets/undraw_to_do_list_re_9nt7.svg" />
      </Illustration>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Title>Sign Up to keeply</Title>
        <div id="signInDiv"></div>
        <Or>
          <span className="line"></span>
          Or
          <span className="line"></span>
        </Or>

        <Group>
          <InputLabel htmlFor="name">Name</InputLabel>
          <Input
            id="name"
            elementSize="lg"
            variant="neutral"
            autoFocus
            aria-errormessage="name-error"
            {...register("name", { required: true })}
          />
          {errors.name?.type === "required" && (
            <InputError id="name-error">name is required</InputError>
          )}
        </Group>

        <Group>
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input
            id="email"
            elementSize="lg"
            variant="neutral"
            aria-invalid={
              errors.email?.type === "required"
                ? true
                : errors.email?.type === "pattern"
                ? true
                : false
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
            aria-invalid={
              errors.password?.type === "required"
                ? true
                : errors.password?.type === "minLength"
                ? true
                : false
            }
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

        <Button type="submit" size="lg" variant="primary">
          Sign Up
        </Button>
        <Redirect>
          Already have an account?
          <Link to="/signin" className="link">
            Sign In
          </Link>
        </Redirect>
      </Form>
    </Container>
  );
};

export default SignUp;
