import { useSignup } from "@/common/api/useSingup";
import { AuthForm } from "./AuthForm";

export const SignupSection = () => {
  const requestSignup = useSignup();

  return <AuthForm formName={"signup"} authRequest={requestSignup} />;
};
