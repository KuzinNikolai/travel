export interface IUserData {
  name: string;
  surname: string;
  patronymic: string;
}

export interface IUserValues {
  isVerify: boolean;
  user: IUserData | null;
}
