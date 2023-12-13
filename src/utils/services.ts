import io from "socket.io-client";
import { SITE_URL } from "./service/constant";

export const socket = io(SITE_URL || "", {
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
