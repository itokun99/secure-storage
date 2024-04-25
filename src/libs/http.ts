import { createRequest } from "./request";
import { Option } from "./types";

const get =
  <Res = unknown, Req = unknown>(endpoint: string, initialOptions?: Option) =>
  (options?: Option) =>
    createRequest<Res, Req>(
      endpoint,
      "GET",
      undefined,
      options,
      initialOptions,
    );

const post =
  <Res = unknown, Req = unknown>(endpoint: string, initialOptions?: Option) =>
  (requestBody?: Req, options?: Option) =>
    createRequest<Res, Req>(
      endpoint,
      "POST",
      requestBody,
      options,
      initialOptions,
    );

const put =
  <Res = unknown, Req = unknown>(endpoint: string, initialOptions?: Option) =>
  (requestBody?: Req, options?: Option) =>
    createRequest<Res, Req>(
      endpoint,
      "PUT",
      requestBody,
      options,
      initialOptions,
    );

const patch =
  <Res = unknown, Req = unknown>(endpoint: string, initialOptions?: Option) =>
  (requestBody?: Req, options?: Option) =>
    createRequest<Res, Req>(
      endpoint,
      "PATCH",
      requestBody,
      options,
      initialOptions,
    );

const _delete =
  <Res = unknown, Req = unknown>(endpoint: string, initialOptions?: Option) =>
  (options?: Option) =>
    createRequest<Res, Req>(
      endpoint,
      "DELETE",
      undefined,
      options,
      initialOptions,
    );

export const http = {
  get,
  post,
  put,
  patch,
  delete: _delete,
};
