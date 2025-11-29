import { requester } from "../axios";

interface Props {
  email: string;
  password: string;
}

export const auth = (data: Props) => {
  return requester.post("/auth/login", {
    username: data.email,
    password: data.password,
  });
};
