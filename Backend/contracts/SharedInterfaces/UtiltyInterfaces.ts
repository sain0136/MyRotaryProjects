import User from "./UserInterface";

export interface UserVerify {
  hash: string;
  plainText: string;
  user: User;
  verified: boolean;
}
