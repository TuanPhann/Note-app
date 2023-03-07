import { URL } from "./Constant";

export const RequestLoader = async (payload) => {
  if (localStorage.getItem("accessToken")) {
    const res = await fetch(`${URL}/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authornization: `Bear ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      if (res.status === 403) {
        return null;
      }
    }
    return res;
  }
  return null;
};
