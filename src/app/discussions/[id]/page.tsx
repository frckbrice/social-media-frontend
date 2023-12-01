"use client"

import React, { useState, ChangeEvent } from "react";
import Avatar from "@/component/atoms/Avatar";
import { FaSearch, FaEllipsisV, FaPlus, FaMicrophone, FaLock, FaPaperPlane } from "react-icons/fa";
import { AiOutlineSmile } from "react-icons/ai";

const Chats = () => {
  const [message, setMessage] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    // Handle sending message logic here
    console.log("Sending message:", message);
    setMessage("");
  };

  return (
    <div className="relative flex flex-col h-screen bg-gray-600">
      <div className="flex items-center justify-between p-2 bg-bgGray border-l-2">
        <div className="flex items-center">
          <Avatar
            size={4}
            profilePicture="https://i.pinimg.com/564x/17/f7/ba/17f7baaff77ee55d8807fcd7b2d2f47a.jpg"
          />
          <h1 className="ml-4 text-lg">John Doe</h1>
        </div>
        <div className="flex items-center text-gray-500 text-xl">
          <FaSearch className="mr-8" />
          <FaEllipsisV className="mr-2" />
        </div>
      </div>

      <div
        className="w-full h-full bg-cover bg-no-repeat bg-center flex flex-col"
        style={{
          backgroundImage: "url('https://i.pinimg.com/600x315/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg')",
          backgroundSize: "cover",
        }}
      >
        <p className="rounded-md shadow-md text-gray-500 w-20 px-1 py-2 bg-white text-center text-lg ml-[45%]">Today</p>
        <p className="text-myG w-[48vw] ml-[15%] font-semibold p-2 rounded-md mt-5 flex text-sm text-center bg-yellow justify-center"><FaLock className="mr-2"/> Messages are end-to-end encryted. No one outside of this chat, not even WaxChat, can read or listen to them. Click to learn more</p>

        {/* Render chat messages here */}

      </div>

      <div className="flex items-center justify-between p-4 text-2xl text-gray-500 bg-bgGray">
        <AiOutlineSmile className="mr-5 text-myG text-4xl" />
        <FaPlus className="mr-2 text-gray-500" />
        <input
          type="text"
          placeholder="Type a message"
          value={message}
          onChange={handleChange}
          className="w-full p-3 bg-white border-0 rounded-md focus:outline-none mx-6 text-lg"
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
  );
};

export default Chats;