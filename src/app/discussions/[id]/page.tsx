"use client";

import React, { useState, ChangeEvent, useEffect } from "react";
import { useRouter } from "next/navigation";

import Avatar from "@/components/atoms/Avatar";
import {
  FaSearch,
  FaEllipsisV,
  FaPlus,
  FaMicrophone,
  FaTimes,
  FaFileInvoice,
  FaPhotoVideo,
  FaUser,
  FaCamera,
  FaPaperPlane,
} from "react-icons/fa";
import { useParams } from "next/navigation";
import { AiOutlineSmile } from "react-icons/ai";
import io from "socket.io-client";

const socket = io("http://localhost:3001", {
  transports: ["websocket"],
});

import ContactInfo from "@/components/organisms/ContactInfo";
import DropdownModal from "@/components/atoms/DropdownModal";
import { sendError } from "next/dist/server/api-utils";
import { IoMdArrowBack } from "react-icons/io";

const Chats = () => {
  const param = useParams();
  const router = useRouter();
  const [showInfoCard, setShowInfoCard] = useState(false);

  const [message, setMessage] = useState<string>("");
  const [receivedMessages, setReceivedMessages] = useState<string[]>([]);
  const [currentUser, setCurrentUser] = useState<Room | null>(
    (): Room | null => {
      if (typeof localStorage !== "undefined") {
        const fromLocalStorage =
          JSON.parse(localStorage.getItem("sender") as string) || {};
        if (fromLocalStorage) return fromLocalStorage;
      }
      return null;
    }
  );

  const activeChat =
    JSON.parse(localStorage.getItem("activeChat") as string) || {};

  // useEffect(() => {
  socket.on("message", (data) => {
    console.log("received: ", data);
    setReceivedMessages([...receivedMessages, data]);
  });

  useEffect(() => {
    socket.emit("joinRoom", { name: currentUser?.name, room: param.id });
  }, [param.id, currentUser?.name]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = (e?: any) => {
    e.preventDefault();
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

  const handlePlusIconClick = () => {
    setShowDropdown((prevState) => !prevState);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showDropdown &&
        !(event.target as HTMLElement)?.closest(".dropdown-content")
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <>
      <div className="w-full flex justify-between">
        <div
          className={`relative flex flex-col h-full w-full mobile:max-sm:${
            showInfoCard ? "hidden" : "visible"
          }`}
        >
          <div className="flex items-center justify-between p-2  bg-chatGray border-l-2 w-full">
            <div className="flex items-center hover:cursor-ponter">
              <>
                <button
                  onClick={() => router.push("/discussions")}
                  className="sm:hidden mr-3 relative "
                >
                  <IoMdArrowBack size={20} />
                </button>
                <Avatar
                  size={4}
                  onClick={handleAvatarClick}
                  profilePicture={
                    activeChat?.image ||
                    "https://i.pinimg.com/564x/a7/da/a4/a7daa4792ad9e6dc5174069137f210df.jpg"
                  }
                />
              </>

              <div className="ml-4 ">
                <p className="text-md hover:cursor-pointer ">
                  {activeChat.name}
                </p>
                {/* <span className="text-gray-500 text-xs">online/offline</span> */}
              </div>
            </div>
            <div className="flex items-center text-gray-500 text-xl">
              <FaSearch className="mr-8" />
              <FaEllipsisV
                onClick={handleAvatarClick}
                className="mr-2 hover:cursor-pointer  hover:bg-gray-300 rounded-full w-fit self-center"
              />
            </div>
          </div>

          <div
            style={{
              backgroundImage:
                "url('https://i.pinimg.com/600x315/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg')",
            }}
            className="w-full h-[calc(100vh-117px)] bigScreen:h-[calc(100vh-117px-39px)] overflow-x-scroll p-4"
          >
            {receivedMessages?.map((message, i) => (
              <div key={i}>{message} </div>
            ))}
          </div>
          {/* ######## ALL MESSAGES SHOULD BE DISPLAYED IN THIS DIV ABOVE ########## */}

          <div
            onSubmit={handleSendMessage}
            className="flex items-center justify-between p-3 text-2xl text-gray-500  bg-chatGray"
            style={{ transition: "none" }}
          >
            <AiOutlineSmile className="mr-5 text-myG text-4xl" />
            {showDropdown ? (
              <FaTimes
                className="text-gray-500 cursor-pointer bg-gray-200 p-2 text-4xl rounded-full "
                onClick={handlePlusIconClick}
              />
            ) : (
              <FaPlus
                className="text-gray-500 cursor-pointer"
                onClick={handlePlusIconClick}
              />
            )}
            <input
              type="text"
              placeholder="Type a message"
              value={message}
              onChange={handleChange}
              className="w-full p-2 bg-white text-sm border-0 rounded-md focus:outline-none mx-6 "
              onKeyDown={handleKeyDown}
            />
            {message.length === 0 ? (
              <button>
                <FaMicrophone className="text-gray-600 mr-4" />
              </button>
            ) : (
              <button>
                <FaPaperPlane
                  className="mr-4 text-gray-500 cursor-pointer"
                  onClick={handleSendMessage}
                />
              </button>
            )}
          </div>
        </div>

        {showInfoCard && (
          <ContactInfo
            id={""}
            title={` ${activeChat.isGroup ? "Group info" : "Contact info"}`}
            onClose={() => setShowInfoCard((prev) => !prev)}
            picture={
              activeChat?.image ||
              "https://i.pinimg.com/564x/a7/da/a4/a7daa4792ad9e6dc5174069137f210df.jpg"
            }
            name={activeChat?.name}
            about={"made of gold"}
            email={activeChat?.email}
            isGroup={activeChat.isGroup}
          />
        )}
      </div>

      {showDropdown && (
        <DropdownModal onClose={() => setShowDropdown(false)}>
          <div className="p-5 pr-10 rounded-xl bg-white absolute bottom-16 left-[34%] transform -translate-x-1/2 shadow-lg">
            <div className="flex items-center space-x-3 text-lg cursor-pointer">
              <FaFileInvoice className="text-purple-500 text-2xl" />
              <span className="text-gray-600">Document</span>
            </div>
            <div className="flex items-center py-5 space-x-3 text-lg cursor-pointer">
              <FaPhotoVideo className="text-blue-600 text-2xl" />
              <span className="text-gray-600">Photos & Videos</span>
            </div>
            <div className="flex items-center space-x-3 text-lg cursor-pointer">
              <FaCamera className="text-pink-600  text-2xl" />
              <span className="text-gray-600">Camera</span>
            </div>
            <div className="flex items-center pt-5 space-x-3 text-lg cursor-pointer">
              <FaUser className="text-blue-400 text-2xl" />
              <span className="text-gray-600">Contact</span>
            </div>
          </div>
        </DropdownModal>
      )}
    </>
  );
};

export default Chats;
