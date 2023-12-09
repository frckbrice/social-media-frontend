import { LOCAL_STORAGE } from "./storage";

const Headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${LOCAL_STORAGE.get("token")}`,
};

export default class ApiCall {
  
  async PUT(url: string, body: any, _headers: HeadersInit = {}) {
    return fetch(url, {
      method: "PUT",
      headers: { ...Headers, ..._headers },
      body: JSON.stringify(body)
    }).then((res) => res.json())
  }

  async GET(url: string, _headers: HeadersInit = {}) {
    return fetch(url, {
      method: "GET",
      headers: { ...Headers, ..._headers },
    }).then((res) => res.json());
  }

  async POST(url: string, body: any, _headers: HeadersInit = {}) {
    return fetch(url, {
      method: "POST",
      headers: { ...Headers, ..._headers },
      body: JSON.stringify(body),
    }).then((res) => res.json());
  }
}
