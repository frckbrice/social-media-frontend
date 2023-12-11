import { supabase } from "../supabase/client";
import { SITE_URL } from "./constant";
import ApiCall from "./httpClient";
import { LOCAL_STORAGE } from "./storage";
import { socket } from "../services";

const apiCall = new ApiCall();

export const signUp = (newUser: {
  name: string;
  email: string;
  image: string;
}) => {
  return apiCall.POST(SITE_URL + "users", newUser);
};

// GET ALL USERS  from room table
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
export const createRoom = async (user: Partial<Room>) => {
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

// Add Group Members
export const addGroupMembers = async (members: string[], room_id: string) => {
  const sender = JSON.parse(localStorage.getItem("sender") || "{}");

  return members.map((memberId) => {
    apiCall.POST(SITE_URL + "/rooms_users", {
      user_id: memberId,
      room_id,
      role: `${memberId === sender.user_id ? "admin" : "member"}`,
    });

    // socket.emit("connected", { room: room_id, owner: memberId });
  });
};

// Update profile name
export const updateProfileName = async (
  id: string,
  update: {
    name?: string;
    image?: string;
  }
) => {
  console.log("id", id);
  return apiCall.PUT(SITE_URL + `/rooms/${id}`, update);
};
