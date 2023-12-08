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
  const sender = LOCAL_STORAGE.get("sender");
  const res = await fetch(SITE_URL + `/users/${sender.user_id}`);
  return await res.json();
};

// CREATE CHAT ROOM
export const createRoom = async (user: {
  name: string;
  email: string;
  image?: string;
  isGroup: boolean;
  user_id: string;
  my_id: string;
}) => {
  return apiCall.POST(SITE_URL + "/rooms", user);
};

// GET ALL ROOMS

export const getAllRooms = async () => {
  console.log("getallrooms fired");
  const sender = JSON.parse(localStorage.getItem("sender") || "{}");
  const res = await fetch(SITE_URL + `/rooms/my_dm/${sender?.user_id}`, {
    next: { revalidate: 30 },
  });

  return await res.json();
};
