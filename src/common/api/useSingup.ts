import { PersonDisplay, Signup } from "@/common/types";
import { useMutationFetch } from "../hooks/useMutationFetch";

export const useSignup = () => (data: Signup) =>
  useMutationFetch<PersonDisplay>({ url: "/auth/new", method: "post", data });
