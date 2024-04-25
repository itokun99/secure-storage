import { Method, Option, ParamType, RequestApiOptions } from "./types";

export const getContentType = (t?: string) => {
  switch (t) {
    case "form-data":
      return "multipart/form-data";
    case "url-enconded":
      return "application/x-www-form-urlencoded";
    default:
      return "application/json";
  }
};

export const getBody = (
  m: Method,
  t: RequestApiOptions["contentType"],
  b: unknown,
) => {
  if (m !== "GET") {
    return t === "form-data" ? b : JSON.stringify(b);
  }
  return;
};

export function searchParamsToObject(
  searchParams: string,
): Record<string, string> {
  const params = new URLSearchParams(searchParams);
  const obj: Record<string, string> = {};
  for (const [key, value] of params) {
    obj[key] = value;
  }
  return obj;
}

export function objectToSearchParams(obj?: ParamType): string {
  // Periksa apakah objek adalah null, undefined, atau bukan objek
  if (!obj || typeof obj !== "object" || Array.isArray(obj)) {
    return "";
  }

  // Pastikan semua kunci dan nilai dalam objek adalah string atau number dan bukan null/undefined
  const params = new URLSearchParams();
  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    if (typeof value === "string" || typeof value === "number") {
      params.append(key, value.toString());
    }
  });

  return params.toString();
}

export function createEndpoint(
  endpoint: string,
  path?: string,
  params?: ParamType,
) {
  if (!endpoint) return "";
  let result = path ? `${endpoint}/${path}` : endpoint;

  if (params) {
    const qs = objectToSearchParams(params);
    result = `${result}${qs ? `?${qs}` : ""}`;
  }

  return result;
}

export async function resolveRequestOptions(options?: Option) {
  const resolve = typeof options === "function" ? await options() : options;

  return resolve;
}
