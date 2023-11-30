import React from 'react';
import Avatar from '@/component/atoms/Avatar';
import { FaSearch, FaEllipsisV, FaPlus, FaMicrophone } from 'react-icons/fa';
import { AiOutlineSmile } from 'react-icons/ai';

const Chats = () => {
  return (
    <div className="relative flex flex-col h-screen bg-gray-100">

      <div className="flex items-center justify-between p-4  text-gray-500">
        <div className="flex items-center">
          <Avatar
            size={4}
            profilePicture="https://i.pinimg.com/564x/17/f7/ba/17f7baaff77ee55d8807fcd7b2d2f47a.jpg"
          />
          <h1 className="ml-2 text-lg font-bold">John Doe</h1>
        </div>
        <div className="flex items-center">
          <FaSearch className="mr-2 text-gray-500" />
          <FaEllipsisV className="text-gray-500" />
        </div>
      </div>

      <div className="bg-yellow-200 p-2">
        <p className="text-xs text-gray-800">Welcome to the chat!</p>
      </div>

      <div className="flex flex-1 justify-center items-center">
        <h2 className="text-2xl font-bold bg-purple-400 text-gray-500">Chats Page</h2>
      </div>

      <div className="flex items-center justify-between p-4  text-gray-500">
        {/* <div className="flex items-center"> */}
          <AiOutlineSmile className="mr-2 text-gray-500 text-2xl" />
          <FaPlus className="mr-2 text-gray-500 text-xl" />
          <input
            type="text"
            placeholder="Type a message..."
            className="w-full p-2 bg-white border-0 rounded-md focus:outline-none"
          />
        {/* </div> */}
        {/* <div className="flex items-center"> */}
          <FaMicrophone className="text-gray-500 text-2xl" />
        {/* </div> */}
      </div>

    </div>
  );
};

export default Chats;