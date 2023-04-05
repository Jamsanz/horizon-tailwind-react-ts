export interface IUser extends IAuth {
  name?: string;
  address?: string;
  phone?: string;
  profileImg?: string;
  dob?: string | Date;
  _id?: string;
}

export interface IAuth {
  email?: string;
  password?: string;
}