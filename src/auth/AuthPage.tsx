import { Divider, Typography, Button, Form, Input, message } from "antd";
import { LoginSection } from "./LoginSection";
import { SignupSection } from "./SignupSection";

export const AuthPage = () => {
  return (
    <div data-test={"auth-page"}>
      <Typography.Title level={2}>로그인</Typography.Title>
      <LoginSection />
      <Divider />
      <Typography.Title level={4}>회원가입</Typography.Title>
      <SignupSection />
    </div>
  );
};
