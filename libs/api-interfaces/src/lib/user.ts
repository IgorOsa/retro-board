export interface IUser {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface IUserResponse extends Omit<IUser, 'password'> {
  _id: string;
}

export interface IAuthResponse {
  access_token: string;
}

export interface IJWTPayload {
  username: string;
  sub: string;
}
