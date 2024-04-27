import { loginUser } from "./services/swagger/user";

/**
 * @see https://umijs.org/docs/max/access#access
 * */
export default function access(initialState: InitialState) {
  const { loginUser } = initialState;
  return {
    canAdmin: loginUser?.userRole === 'admin',
    canUser: loginUser,
  };
}