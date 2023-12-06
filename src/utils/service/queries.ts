import { SITE_URL } from "./constant";
import ApiCall from "./httpClient";
import { LOCAL_STORAGE } from "./storage";

const apiCall = new ApiCall();

export const signUp = (newUser: {
  name: string;
  email: string;
  image: string;
}) => {
  return apiCall.POST(SITE_URL + "users", newUser);
};

// GET ALL USERS
export const getAllUsers = async () => {
  const res = await fetch(SITE_URL + "/users", { next: { revalidate: 3600 } });
  return await res.json();
};

// GET CURRENT USER
export const getCurrentUser = async () => {
  const res = await fetch(
    SITE_URL + `/users/${localStorage.getItem("userId")}`
  );
  return await res.json();
};
