import { IAddress } from "./address.interface.js";

export interface ITeacher extends ITeacherBasic {
  password?: string;
  registerdate?: string;
  role?: string;
  active?: boolean;
}

export interface ITeacherBasic {
  id?: string;
  name?: string;
  lastname?: string;
  email: string;
  phone?: string;
  stripeCustomer?: string;
  addresses?: IAddress[];
  policy?: boolean;
}
