import { PersonDisplay } from "../types";
import {
  loginAction,
  logoutAction,
  selectPerson,
  useDispatch,
  useSelector,
} from "../utils/redux";

export const useAuth = () => {
  const person = useSelector(selectPerson);
  const dispatch = useDispatch();
  const isLoggedIn = !!person;

  const login = (person: PersonDisplay) => dispatch(loginAction(person));
  const logout = () => dispatch(logoutAction());

  return { login, logout, isLoggedIn, person };
};
