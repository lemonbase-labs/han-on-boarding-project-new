import { useLogin } from "@/common/api/useLogin";
import { AuthForm } from "./AuthForm";

export const LoginSection = () => {
  const requestLogin = useLogin();

  return <AuthForm formName={"login"} authRequest={requestLogin} />;
};
