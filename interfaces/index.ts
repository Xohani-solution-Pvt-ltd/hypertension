import { ReactNode } from "react";

export interface User {
  _id?: string;
  fullName: string;
  email: string;
  mobile: string;
  age?: string;
  address?: string;
  gender?: string;
}

export type LayoutProps = {
  children?: ReactNode;
  title?: string;
};

export interface Pagination {
  currentPage?: number;
  currentDocs?: number;
}

export interface Response {
  success?: boolean;
  pagination?: Pagination;
  message?: string;
  data?: any;
}




