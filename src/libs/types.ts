export type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
export type ParamType = Record<string, string | number | undefined | null>;
export interface MetaParams {
  page?: number;
  perPage?: number;
  status?: "active" | "inactive";
  search?: string;
}

export interface RequestApiOptions {
  bearerToken?: string;
  contentType?: "json" | "form-data" | "url-enconded";
  headers?: HeadersInit;
  signal?: RequestInit["signal"];
  path?: string;
  params?: ParamType;
  metaParams?: MetaParams;
  withAppAuth?: boolean;
  responseContentType?:
    | "json"
    | "text"
    | "blob"
    | "form-data"
    | "array-buffer"
    | "clone";
}

export interface MetaResponse {
  currentPage: number;
  perPage: number;
  totalCurrentPage: number;
  totalPage: number;
  totalData: number;
}

export interface ApiResponse<ResponseData = unknown> {
  status?: string;
  message?: string;
  data?: ResponseData;
  meta?: MetaResponse;
  error?: {
    code: string;
    message: string;
  };
}

export type Option =
  | RequestApiOptions
  | (() => RequestApiOptions | Promise<RequestApiOptions>);
