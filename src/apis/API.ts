import axios from "axios";

import { TROLE } from "src/@types";

export interface IEmployeeSignInInfo {
  userName: string;
  password: string;
}

export interface IEmployeeInfo extends IEmployeeSignInInfo {
  email: string;
  lastName: string;
  firstName: string;
  address: string;
  role: TROLE;
  _id: string;
  shopId?: string;
}
export interface IFetchData {
  employeeSignUpInfo: IEmployeeInfo;
}

export interface IComment {
  authorId: string;
  author: string;
  commentAt?: Date;
  content: string;
}

export interface IAddCommentProps {
  employeeId: string;
  comment: IComment;
}

const baseURL = `/.netlify/functions`;

export class EmployeeAPI {
  static async getAllEmployees(shopId: string) {
    const response = await axios.get(`${baseURL}/get-all-employees`, {
      headers: {
        shopId: shopId,
      },
    });
    return response.data;
  }

  static async signIn({
    employeeSignInInfo,
  }: {
    employeeSignInInfo: IEmployeeSignInInfo;
  }) {
    const response = await axios.post(`${baseURL}/signin-employee`, {
      employeeSignInInfo,
    });
    return response.data;
  }

  static async signUp({ employeeSignUpInfo }: IFetchData) {
    const response = await axios.post(`${baseURL}/add-new-employee`, {
      employeeSignUpInfo,
    });
    return response.data;
  }

  static async deleteEmployee({ email }: { email: string }) {
    const response = await axios.post(`${baseURL}/account/delete-employee`, {
      email,
    });
    return response.data;
  }

  static async editEmployee({ employeeSignUpInfo }: IFetchData) {
    const response = await axios.post(`${baseURL}/account/edit-employee`, {
      employeeSignUpInfo,
    });
    return response.data;
  }

  static async uploadCSVEmployeeFile({ formData }: { formData: FormData }) {
    const response = await axios.post(
      `${baseURL}/upload/employeefile`,
      formData
    );
    return response.data;
  }
  //***COMMENTS SECTION***

  static async addComment({ employeeId, comment }: IAddCommentProps) {
    const response = await axios.post(`${baseURL}/comment/add-comment`, {
      employeeId,
      comment,
    });
    return response.data;
  }

  static async getAllComments({ employeeId }: { employeeId: string }) {
    const response = await axios.post(`${baseURL}/comment/get-all-comments`, {
      employeeId,
    });
    return response.data;
  }
}
