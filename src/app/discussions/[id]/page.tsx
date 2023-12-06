"use client";

import React, { useState, ChangeEvent, useEffect } from "react";
import Avatar from "@/components/atoms/Avatar";
import {
  FaSearch,
  FaEllipsisV,
  FaPlus,
  FaMicrophone,
  FaLock,
  FaPaperPlane,
} from "react-icons/fa";
import { useParams } from "next/navigation";
import { AiOutlineSmile } from "react-icons/ai";
import io from "socket.io-client";

const socket = io("http://localhost:3000", {
  transports: ["websocket"],
});

import InfoCard from "@/components/organisms/InfoCard";

const Chats = () => {
  const param = useParams();
  const [showInfoCard, setShowInfoCard] = useState(false);
  const [message, setMessage] = useState<string>("");
  // const [currentUser, setCurrentUser] = useState<User | null>(
  //   (): User | null => {
  //     if (typeof localStorage !== "undefined") {
  //       const fromLocalStorage =
  //         JSON.parse(localStorage.getItem("sender")) || {};
  //       if (fromLocalStorage) return fromLocalStorage;
  //     }
  //     return null;
  //   }
  // );
  const [currentUser, setCurrentUser] = useState<User | null>((): User => {
    return { name: "avom", image: "", id: "10", phone: "142 125 365" };
  });
  const [receivedMessages, setReceivedMessages] = useState<string[]>([]);

  // useEffect(() => {
  socket.on("message", (data) => {
    console.log("received: ", data);
    setReceivedMessages([...receivedMessages, data]);
  });

  useEffect(() => {
    socket.emit("joinRoom", { name: currentUser?.name, room: param.id });
  }, [param.id, currentUser?.name]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    // Handle sending message logic here

    const messageObject: Partial<Message> = {
      content: message,
      sender_id: currentUser?.id as string,
      receiver_room_id: param.id as string,
      sender_name: currentUser?.name,
      sender_phone: currentUser?.phone,
      reaction: "",
      is_read: false,
    };

    socket.emit("sendMessage", messageObject);
    setMessage("");
  };

  const handleAvatarClick = () => {
    setShowInfoCard(!showInfoCard);
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") handleSendMessage();
  };

  return (
    <div className="w-full flex justify-between">
      <div className="relative flex flex-col h-full w-full">
        <div className="flex items-center justify-between p-2 h-16 bg-chatGray border-l-2 w-full">
          <div className="flex items-center">
            <Avatar
              size={4}
              profilePicture="https://i.pinimg.com/564x/17/f7/ba/17f7baaff77ee55d8807fcd7b2d2f47a.jpg"
              onClick={handleAvatarClick}
            />
            <div className="ml-4 ">
              <h1 className="text-lg">John Doe</h1>
              <span className="text-gray-500">online/offline</span>
            </div>
          </div>
          <div className="flex items-center text-gray-500 text-xl">
            <FaSearch className="mr-8" />
            <FaEllipsisV className="mr-2" />
          </div>
        </div>

        <div className="relative flex-grow overflow-auto h-[80vh]">
          <div
            className="w-[71.2%] h-[80%] fixed z-0"
            style={{
              backgroundImage:
                "url('https://i.pinimg.com/600x315/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg')",
            }}
          >
            <div className="absolute bottom-5 left-0 right-0 overflow-auto h-[calc(80% - 4rem)]">
              <p className="rounded-md shadow-md text-gray-500 w-20 px-1 py-2 bg-white text-center text-lg ml-[45%]">
                Today
              </p>
              <p className="text-myG w-[48vw] ml-[15%] font-semibold p-2 rounded-md mt-5 flex text-sm text-center bg-yellow justify-center">
                <FaLock className="mr-2" /> Messages are end-to-end encrypted.
                No one outside of this chat, not even WaxChat, can read or
                listen to them.
              </p>
              <div className="flex flex-col mt-5 mx-[5%]">
                <div className="flex items-start justify-start mb-2">
                  <div className="bg-white rounded-lg p-3 max-w-[60%]">
                    <p>Receiver&aposs message</p>
                  </div>
                </div>
                <div className="flex items-start justify-end mb-2">
                  <div className="bg-greenMgs rounded-lg p-3 max-w-[60%]">
                    <p>
                      Sender&aposs message should not exceed some width and it
                      should wrap when it get too long please do you understand
                      susan that is what am talking about. Thanks bruh you
                      should now get break
                    </p>
                  </div>
                </div>
                {
                  <div>
                    <span> message here</span>
                    {receivedMessages?.map((message, i) => (
                      <div key={i}>{message} </div>
                    ))}
                  </div>
                }
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 h-16 text-2xl text-gray-500  bg-chatGray">
          <AiOutlineSmile className="mr-5 text-myG text-4xl" />
          <FaPlus className="mr-2 text-gray-500" />
          <input
            type="text"
            placeholder="Type a message"
            value={message}
            onChange={handleChange}
            className="w-full p-2 bg-white border-0 rounded-md focus:outline-none mx-6 text-lg"
          />
          {message.length === 0 ? (
            <FaMicrophone className="text-gray-600" />
          ) : (
            <FaPaperPlane
              className="mr-2 text-gray-500 cursor-pointer"
              onClick={handleSendMessage}
            />
          )}
        </div>
      </div>
      {showInfoCard && (
        <div className=" bg-white z-40 w-[30vw]">
          <InfoCard />
        </div>
      )}
    </div>
  );
};

export default Chats;
