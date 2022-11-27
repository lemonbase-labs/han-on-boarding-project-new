import { ReactNode } from "react";
import { Layout } from "antd";

export const Screen = ({ children }: { children: ReactNode }) => (
  <Layout
    style={{
      width: "400px",
      minHeight: "100vh",
      margin: "auto",
      backgroundColor: "white",
      padding: "40px",
    }}
  >
    {children}
  </Layout>
);
