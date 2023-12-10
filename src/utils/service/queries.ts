import { supabase } from "../supabase/client";
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
  const id = LOCAL_STORAGE.get("userId");
  if (id) {
    const res = await fetch(SITE_URL + `/users/${id}`);
    return await res.json();
  }
};

// CREATE CHAT ROOM
export const createRoom = async (user: {
  name: string;
  email: string;
  image?: string;
  isGroup: boolean;
  user_id: string;
  my_id: string | undefined;
}) => {
  return apiCall.POST(SITE_URL + "/rooms", user);
};

// GET ALL ROOMS

export const getAllRooms = async () => {
  const id = LOCAL_STORAGE.get("userId");
  const sender = JSON.parse(localStorage.getItem("sender") || "{}");
  const res = await fetch(SITE_URL + `/rooms/my_dm/${sender.user_id}`, {
    next: { revalidate: 3000 },
  });

  return await res.json();
};

// UPLOAD IMAGE TO SUPABSE
export const uplaodImage = async (file: any) => {
  const fileValue = `groupIcon${Date.now()}.png`;

  const { data, error } = await supabase.storage
    .from("whatsapp_avatars/images")
    .upload(fileValue, file);

  if (error) {
    console.error("error creatin group icon", error);
  } else {
    console.log("group icon data", data);
    const imageUrl = supabase.storage
      .from("whatsapp_avatars/images")
      .getPublicUrl(data.path);
    console.log("group icon download url", imageUrl.data.publicUrl);
    return imageUrl.data.publicUrl;
  }
};

// CREAT GROUP

export const createGroup = async (groupData: {
  name: string;
  image: string;
  my_id: string;
  user_id: string;
  isGroup: boolean;
}) => {
  return apiCall.POST(SITE_URL + "/rooms", groupData);
};

// Add Group Members
export const addGroupMembers = async (members: string[], room_id: string) => {
  const sender = JSON.parse(localStorage.getItem("sender") || "{}");

  return members.map((member) => {
    apiCall.POST(SITE_URL + "/rooms_users", {
      user_id: member,
      room_id,
      role: `${member === sender.user_id ? "admin" : "member"}`,
    });
  });
};

// Update profile name
export const updateProfileName = async (name: string, id: string) => {
  console.log('id', id)
  return apiCall.PUT(SITE_URL + `/rooms/${id}`, name)
}

