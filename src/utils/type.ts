import { AdminRoleEnum } from "@/context/auth-provider";

export type GetResponseType<T> = {
  status: "success" | "error";
  data: T[];
  message: string;
};

export type GetByIdResponseType<T> = {
  status: "success" | "error";
  data: T;
  message: string;
};

export type PostOrPatchResponseType = {
  status: "success" | "error";
  message: string | string[];
};

export type AccessTokenType = {
  id: string;
  type: "access" | "refresh";
  role: AdminRoleEnum;
  exp: number;
};
