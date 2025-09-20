import {UserType} from './support.types.js';

export type User = {
  firstname: string;
  email: string;
  avatarPath: string;
  password: string;
  type: UserType;
};
