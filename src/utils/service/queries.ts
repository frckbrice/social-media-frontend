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
  const res = await fetch(SITE_URL + `/rooms_users/my_dm/${sender?.user_id}`, {
    next: { revalidate: 30 },
  });

  return await res.json();
};

// GET ALL GROUPS OF SINGLE USER
export const getAllGroups = async () => {
  const sender = JSON.parse(localStorage.getItem('sender') || '{}')
  const res = await fetch(SITE_URL + `/rooms_users/all_groups/${sender?.user_id}`, {
    next: {revalidate: 30}
  })
  return await res.json()
}
3
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

// UPLOAD pdf TO SUPABSE
export const uplaodPDF = async (file: any) => {
  const fileValue = `groupIcon${Date.now()}.pdf`;

  const { data, error } = await supabase.storage
    .from("whatsapp_avatars/images")
    .upload(fileValue, file);

  if (error) {
    console.error("error uploading PDF", error);
  } else {
    console.log("PDF data", data);
    const fileUrl = supabase.storage
      .from("whatsapp_avatars/images")
      .getPublicUrl(data.path);
    console.log("File download url", fileUrl.data.publicUrl);
    return fileUrl.data.publicUrl;
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

// GET GROUP MEMBERS BY GROUP ID
export const getGroupMembers = async (id: string) => {
  return apiCall.GET(SITE_URL + `/rooms_users/all_participants/${id}`);
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

// function that mixed up two arrays
export const shuffleArr = (arr: any[]) => {
  if (arr.length <= 1) return arr;
  for (let i = arr.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};