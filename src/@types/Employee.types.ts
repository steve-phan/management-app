export const ROLE = {
  CHEF: "CHEF",
  MANAGER: "MANAGER",
  EMPLOYEE: "EMPLOYEE",
} as const;

export type TROLE = keyof typeof ROLE;

export interface IEmployee {
  name: string;
  email: string;
  address: string;
  role: TROLE[];
  action?: string;
}

export interface IEmployeeSignInInfo {
  userName: string;
  password: string;
  shopId?: string;
}

export interface IEmployeeInfo extends IEmployeeSignInInfo {
  email: string;
  lastName: string;
  firstName: string;
  address: string;
  role: TROLE[];
}
