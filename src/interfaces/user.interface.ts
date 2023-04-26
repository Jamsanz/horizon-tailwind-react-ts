export interface IUser extends IAuth {
  name?: string;
  address?: string;
  phone?: string;
  profileImg?: string;
  dob?: string | Date;
  _id?: string;
  role?: Array<"ADMIN" | "SUPER_ADMIN" | "USER">;
}

export interface IAuth {
  email?: string;
  password?: string;
}