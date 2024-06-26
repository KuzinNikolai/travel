export interface IUserData {
  name: string;
  surname: string;

  avatar: string;
}

export interface IUserValues {
  isVerify: boolean;
  user: IUserData | null;
}
