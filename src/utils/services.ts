import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

export function updatedMessage(messageId: string, action: any) {
  socket.emit("updateMessage", { messageId, action });
}

export function getMessages(sender_room_id: string, receiver_room_id: string) {
  socket.emit("roomMessages", {
    sender_room_id,
    receiver_room_id,
  });
}
