import { PersonDisplay } from "@/common/types";
import { useGetFetch } from "../hooks/useGetFetch";

export const usePeople = () => useGetFetch<PersonDisplay[]>("/people");
