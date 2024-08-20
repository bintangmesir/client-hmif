import { AdminRoleEnum } from "@/hooks/useCheckRole";

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
  message: string;
};

export type AccessTokenType = {
  id: string;
  type: "access" | "refresh";
  role: AdminRoleEnum;
  exp: number;
};
