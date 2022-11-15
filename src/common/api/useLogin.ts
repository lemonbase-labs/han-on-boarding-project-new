import { Login, PersonDisplay } from "@/common/types";
import { useMutationFetch } from "../hooks/useMutationFetch";

export const useLogin = () => (data: Login) =>
  useMutationFetch<PersonDisplay>({
    url: "/auth",
    method: "post",
    data,
  });
