import io from "socket.io-client";

export const socket = io("http://localhost:3001", {
  // [1] Important as fuck
  path: "/socket.io/",
  reconnectionDelay: 1000,
  reconnection: true,
  reconnectionAttempts: 10,
  transports: ["websocket"],
  agent: false, // [2] Please don't set this to true
  upgrade: false,
  rejectUnauthorized: false,
});
