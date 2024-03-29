import { supabase } from "../supabase/client";
import { SITE_URL } from "./constant";
import ApiCall from "./httpClient";
import { LOCAL_STORAGE } from "./storage";
import { socket } from "../services";
import { toast } from "react-toastify";

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
export const getAllRooms = async (id: string) => {
  const res = await fetch(SITE_URL + `/rooms_users/my_dm/${id}`, {
    cache: "no-store",
  });

  return await res.json();
};

// GET ALL unreadmessages
export const getUnreadMessages = async () => {
  const res = await fetch(SITE_URL + "/unread-messages", {
    cache: "no-store",
  });

  return await res.json();
};

// GET ALL GROUPS OF SINGLE USER
export const getAllGroups = async () => {
  const sender = JSON.parse(localStorage.getItem("sender") || "{}");
  const res = await fetch(
    SITE_URL + `/rooms_users/all_groups/${sender?.user_id}`,
    {
      next: { revalidate: 30 },
    }
  );
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

    return imageUrl.data.publicUrl;
  }
};

//upload all file types to supabase
export const uploadFileToSupabase = async (file: File) => {
  const fileName = `file_${Date.now()}.${file.name.split(".").pop()}`;

  const { data, error } = await supabase.storage
    .from("whatsapp_avatars/images")
    .upload(fileName, file);

  if (error) {
    console.error("Error uploading file to Supabase:", error);
  } else {
    const fileUrl = supabase.storage
      .from("whatsapp_avatars/images")
      .getPublicUrl(data.path);

    return fileUrl;
  }
};

// Add Group Members
export const addGroupMembers = async (members: string[], room_id: string) => {
  const sender = JSON.parse(localStorage.getItem("sender") || "{}");
  try {
    return Promise.all(
      members.map((memberId) => {
        apiCall.POST(SITE_URL + "/rooms_users", {
          user_id: memberId,
          room_id,
          role: `${memberId === sender.user_id ? "admin" : "member"}`,
        });
      })
    );
  } catch (error) {
    console.error("Error adding group members in room-users:", error);
  }
};

// GET GROUP MEMBERS BY GROUP ID
export const getGroupMembers = async (id: string) => {
  try {
    return apiCall.GET(SITE_URL + `/rooms_users/all_participants/${id}`);
  } catch (error) {
    console.error("Error getting room-users:", error);
  }
};

// Update profile name
export const updateProfileName = async (
  id: string,
  update: {
    name?: string;
    image?: string;
  }
) => {
  try {
    return apiCall.PUT(SITE_URL + `/rooms/${id}`, update);
  } catch (error) {
    console.error("Error updating file from rooms:", error);
  }
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
// DELETE A CHAT
export const handleDelete = async () => {
  const sender = JSON.parse(localStorage.getItem("sender") || "{}");
  const receiver = JSON.parse(localStorage.getItem("receiver") || "{}");
  try {
    const response = await fetch(
      SITE_URL + `/rooms/${receiver.id}/${sender.user_id}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to delete chat");
    }
    const data = response.json();
    console.log("deleted contact", data);
    localStorage.removeItem("receiver");
    toast.success("Chat deleted successfully", {
      position: "top-right",
      hideProgressBar: true,
      autoClose: 2000,
    });
  } catch (error) {
    console.error("Error deleting file from room:", error);
  }
  // setOnDelete((prev) => !prev);
};

export const getDocsUrlAndSendToDB = (data: Partial<Message>) => {
  //get the docs from pc
  // send to supabase and get the url
  //send to server as message

  const input = document.createElement("input") as HTMLInputElement;
  input.type = "file";
  let dataUrl: any;
  input.addEventListener("change", async (e: any) => {
    const newFile = e.target.files[0];
    dataUrl = await uploadFileToSupabase(newFile);
    console.log("dataRUrl: " + dataUrl.data.publicUrl);

    try {
      socket.emit("sendMessage", {
        ...data,
        content: dataUrl.data.publicUrl,
      });
    } catch (error) {
      console.log("error emitting message file", error);
    }
  });

  input.click();
};

export const registerUserToDB = async (data: {
  name: string;
  email: string;
  image: string;
}) => {
  try {
    const resp = await fetch(SITE_URL + "/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
    });
    if (resp.ok) return resp.json();
  } catch (error) {
    console.log("error registering user");
  }
};
