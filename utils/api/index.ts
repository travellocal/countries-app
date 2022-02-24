
interface FetchGetParams {
  method: "GET";
  query?: Record<string, string>;
}

interface FetchPostParams {
  method: "POST" | "PUT";
  query?: Record<string, string>;
  body: any;
  contentType?: "application/json" | "multipart/form-data";
}

export class FetchError extends Error {
  constructor(public statusCode: number, message: string) {
    super(`${statusCode}: ${message}`);
  }
}

export async function fetchApi<T>(path: string, params: FetchGetParams | FetchPostParams = { method: "GET" }) {
  let init: RequestInit | undefined;
  switch (params.method) {
    case "GET":
      init = {
        method: params.method,
        headers: {
          "Content-Type": "application/json",
        },
      }
      break;
    case "POST":
    case "PUT":
      const contentType = params.contentType ?? "application/json";
      if (contentType === "application/json") {
        init = {
          method: params.method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(params.body),
        };
      }
      else if (contentType === "multipart/form-data") {
        init = {
          method: params.method,
          body: params.body,
        };
      }
      else {
        init = {
          method: params.method,
          headers: {
            "Content-Type": contentType,
          },
          body: params.body,
        };
      }
      break;
    default:
      throw new Error("Tried to fetch with unknown method");
  }

  const query = new URLSearchParams(params.query);
  const queryString = query.toString();
  const res = await fetch(`${path}${queryString ? `?${queryString}` : ""}`, init);

  const json = await res.json().catch(() => { });
  if (json?.error) {
    throw new FetchError(res.status, json.message);
  }
  else if (json?.errors && json.errors.length > 0) {
    throw new FetchError(500, json.errors?.join(", "));
  }
  else if (!json && (res.status >= 400 && res.status < 600)) {
    throw new FetchError(res.status, res.statusText);
  }
  


  return json as T;
}

export async function fetchGraphql<T>(query: string, { variables }: any = {}) {
  const json = await fetchApi<{ data: T }>("/graphql", {
    method: "POST",
    body: {
      query,
      variables,
    }
  });

  return json.data;
}
