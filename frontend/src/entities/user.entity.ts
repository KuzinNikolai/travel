export interface IUserData {
  name: string;
  surname: string;
  patronymic: string;

  avatar: string;
}

export interface IUserValues {
  isVerify: boolean;
  user: IUserData | null;
}
