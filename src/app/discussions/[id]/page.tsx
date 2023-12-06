"use client";

import React, { useState, ChangeEvent, useEffect } from "react";
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
import { AiOutlineSmile } from "react-icons/ai";

import ContactInfo from "@/components/organisms/ContactInfo";
import DropdownModal from "@/components/atoms/DropdownModal";

const Chats = () => {
  const [message, setMessage] = useState("");
  const [showInfoCard, setShowInfoCard] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Handle sending message logic here
    alert(`sending ${message}`);
  };

  const handleAvatarClick = () => {
    setShowInfoCard(!showInfoCard);
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
    <div className="w-full flex justify-between">
      <div
        className={`relative flex flex-col h-full w-full mobile:max-sm:${
          showInfoCard ? "hidden" : "visible"
        }`}
      >
        <div className="flex items-center justify-between p-2  bg-chatGray border-l-2 w-full">
          <div className="flex items-center">
            <Avatar
              size={4}
              profilePicture="https://i.pinimg.com/564x/17/f7/ba/17f7baaff77ee55d8807fcd7b2d2f47a.jpg"
              onClick={handleAvatarClick}
            />
            <div className="ml-4 ">
              <p className="text-md">John Doe</p>
              {/* <span className="text-gray-500 text-xs">online/offline</span> */}
            </div>
          </div>
          <div className="flex items-center text-gray-500 text-xl">
            <FaSearch className="mr-8" />
            <FaEllipsisV className="mr-2" />
          </div>
        </div>
        {/* ######## ALL MESSAGES SHOULD BE DISPLAYED IN THIS DIV BELLOW ########## */}
        <div
          style={{
            backgroundImage:
              "url('https://i.pinimg.com/600x315/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg')",
          }}
          className="w-full h-[calc(100vh-117px)] bigScreen:h-[calc(100vh-117px-39px)] overflow-x-scroll p-4"
        ></div>
        {/* ######## ALL MESSAGES SHOULD BE DISPLAYED IN THIS DIV ABOVE ########## */}

        <form
          onSubmit={handleSendMessage}
          className="flex items-center justify-between p-3 text-2xl text-gray-500  bg-chatGray"
        >
          <AiOutlineSmile className="mr-5 text-myG text-4xl" />
          {showDropdown ? (
            <FaTimes
              className="mr-2 text-gray-500 cursor-pointer"
              onClick={handlePlusIconClick}
            />
          ) : (
            <FaPlus
              className="mr-2 text-gray-500 cursor-pointer"
              onClick={handlePlusIconClick}
            />
          )}
          <input
            type="text"
            placeholder="Type a message"
            value={message}
            onChange={handleChange}
            className="w-full p-2 bg-white text-sm border-0 rounded-md focus:outline-none mx-6 "
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
        </form>
      </div>

      {showInfoCard && (
        <ContactInfo
          id={""}
          title={"Contact info"}
          onClose={() => setShowInfoCard((prev) => !prev)}
          picture={
            "https://i.pinimg.com/564x/fe/85/c3/fe85c35b97c3f14082ac2edfb25eba44.jpg"
          }
          name={"Caleb matins"}
          about={"made of gold"}
          email={"calebmatins@gmail.com"}
        />
      )}

      {showDropdown && (
        <DropdownModal onClose={() => setShowDropdown(false)}>
          <div className="p-3 rounded-md bg-white absolute bottom-6 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center space-x-2">
              <FaFileInvoice className="text-purple-500" />
              <span className="text-gray-600">Document</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaPhotoVideo className="text-blue-600" />
              <span className="text-gray-600">Photos & Videos</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaCamera className="text-pink-600" />
              <span className="text-gray-600">Camera</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaUser className="text-blue-400" />
              <span className="text-gray-600">Contact</span>
            </div>
          </div>
        </DropdownModal>
      )}
    </div>
  );
};

export default Chats;
