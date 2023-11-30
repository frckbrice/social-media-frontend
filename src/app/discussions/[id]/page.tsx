import React from "react";
import Avatar from "@/component/atoms/Avatar";
import { FaSearch, FaEllipsisV, FaPlus, FaMicrophone } from "react-icons/fa";
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
        className="w-full h-full bg-cover bg-no-repeat bg-center "
        style={{
          backgroundImage: "url('https://i.pinimg.com/564x/e0/0b/9a/e00b9a6bce8958583185fd2b49dd6c74.jpg')",
          backgroundSize: "",
        }}
      ></div>

      <div className="flex items-center justify-between p-4 text-2xl text-gray-500 bg-bgGray">
        {/* <div className="flex items-center"> */}
        <AiOutlineSmile className="mr-5 text-gray-500 text-4xl" />
        <FaPlus className="mr-2 text-gray-500" />
        <input
          type="text"
          placeholder="Type a message"
          className="w-full p-3 bg-white border-0 rounded-md focus:outline-none mx-6 text-lg"
        />
        {/* </div> */}
        {/* <div className="flex items-center"> */}
        <FaMicrophone className="text-gray-600" />
        {/* </div> */}
      </div>
    </div>
  );
};

export default Chats;
