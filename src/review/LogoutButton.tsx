import { useAuth } from "@/common/hooks/useAuth";
import { Button } from "antd";

export const LogoutButton = () => {
  const { logout } = useAuth();
  return (
    <Button block data-test={"logout"} onClick={logout}>
      logout
    </Button>
  );
};
