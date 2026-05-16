import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import useLogin from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";
import { useNavigate } from "react-router";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLogging } = useLogin();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;

    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
          navigate("/dashboard", { replace: true });
        },
      },
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address" orientation="vertical">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLogging}
        />
      </FormRow>

      <FormRow label="Password" orientation="vertical">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLogging}
        />
      </FormRow>

      <FormRow orientation="vertical">
        <Button variation="primary" size="large" disabled={isLogging}>
          {!isLogging ? "Login" : <SpinnerMini />}
        </Button>
      </FormRow>
    </Form>
  );
}

export default LoginForm;
