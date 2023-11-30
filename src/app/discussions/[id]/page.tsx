import React from "react";
import Avatar from "@/component/atoms/Avatar";
import { FaSearch, FaEllipsisV, FaPlus, FaMicrophone, FaLock } from "react-icons/fa";
import { AiOutlineSmile } from "react-icons/ai";

const Chats = () => {
  return (
    <div className="relative flex flex-col h-screen bg-gray-600">
      <div className="flex items-center justify-between p-4 bg-bgGray border-l-2">
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
          backgroundImage: "url('https://i.pinimg.com/564x/e0/0b/9a/e00b9a6bce8958583185fd2b49dd6c74.jpg')",
          backgroundSize: "cover",
        }}
      >
        <p className="border rounded-md shadow-md text-gray-500 w-20 px-1 py-2 bg-white text-center text-lg ml-[45%]">Today</p>
        <p className="border text-myG w-[48vw] ml-[15%] font-semibold p-2 rounded-md mt-5 flex text-sm text-center bg-yellow justify-center"><FaLock className="mr-3"/> Messages are end-to-end encryted. No one outside of this chat, not even WaxChat, can read or listen to them. Click to learn more</p>
      </div>

      <div className="flex items-center justify-between p-4 text-2xl text-gray-500 bg-bgGray">
        <AiOutlineSmile className="mr-5 text-gray-500 text-4xl" />
        <FaPlus className="mr-2 text-gray-500" />
        <input
          type="text"
          placeholder="Type a message"
          className="w-full p-3 bg-white border-0 rounded-md focus:outline-none mx-6 text-lg"
        />
        <FaMicrophone className="text-gray-600" />
      </div>
    </div>
  );
};

export default Chats;