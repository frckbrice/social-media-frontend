// "use client";

type OPTIONS = {
  type: "STRING" | "OBJECT";
};

export class LOCAL_STORAGE {
  static save(key: string, value: any) {
    return localStorage.setItem(key, JSON.stringify(value));
  }

  static get(key: string, options: OPTIONS = { type: "OBJECT" }) {
    let data: any;

    if (typeof window !== "undefined") {
      data = localStorage.getItem(key);
    }

    if (data) {
      if (options.type === "STRING") return data;
      // return JSON.parse(data);
      return null;
    }
  }
}
