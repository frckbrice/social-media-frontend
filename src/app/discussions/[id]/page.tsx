"use client";

import React, { useState, ChangeEvent, useEffect, useRef } from "react";
import { useDropzone } from "react-dropzone";

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
import { socket } from "@/utils/services";

// const socket = io();

import ContactInfo from "@/components/organisms/ContactInfo";
import DropdownModal from "@/components/atoms/DropdownModal";

const Chats = () => {
  const param = useParams();
  const router = useRouter();
  const [showInfoCard, setShowInfoCard] = useState(false);

  const [message, setMessage] = useState<string>("");
  const [receivedMessages, setReceivedMessages] = useState<string[]>([]);
  const [typingStatus, setTypingStatus] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      handleFileDrop(Array.from(files));
    }
  };

  const handleFileDrop = (acceptedFiles: File[]) => {
    setUploadedFiles((prevUploadedFiles) => [
      ...prevUploadedFiles,
      ...acceptedFiles,
    ]);
  };

  const handleRemoveFile = (fileIndex: number) => {
    setUploadedFiles((prevUploadedFiles) =>
      prevUploadedFiles.filter((_, index) => index !== fileIndex)
    );
  };

  const handleDocumentClick = () => {
    const input = document.getElementById("fileInput");
    if (input) {
      input.click();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  // if (oldReceiver !== receiver?.original_dm_roomID) {
  //   socket.volatile.emit("disconnected", oldReceiver);
  //   oldReceiver = receiver?.original_dm_roomID as string;
  // }

  // socket.volatile.emit("disconnected", currentUser?.id);

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
    if (e.key === "Enter") {
      setTypingStatus("");
      handleSendMessage();
    }
    console.log(typingStatus);
    socket.emit("typing", {
      receiver: receiver,
      currentUser: currentUser,
    });
  };
  socket.on("typingResponse", (data) => setTypingStatus(data));
  const handlePlusIconClick = () => {
    setShowDropdown((prevState) => !prevState);
  };

  function handleBlur(e: any) {
    if (!e.target.value) setTypingStatus("");
  }

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

  console.log("this received msg", receivedMessages);

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
                    receiver?.image ||
                    "https://i.pinimg.com/564x/a7/da/a4/a7daa4792ad9e6dc5174069137f210df.jpg"
                  }
                />
                </>

              <div className="ml-4 ">
                  <p className="text-md">{receiver?.name}</p>
                  <span className="text-gray-500 text-xs">
                  {/* {typingStatus ? <Pulsation /> : ""} */}
                  {typingStatus ? typingStatus : ""}
                </span>
                </div>
              </div>
              <div className="flex items-center text-gray-500 text-xl">
                <FaSearch className="mr-8" />
                <FaEllipsisV className="mr-2" />
              </div>
            </div>
  
            <div
              style={{
                backgroundImage:
                  "url('https://i.pinimg.com/600x315/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg')",
              }}
              className="w-full h-[calc(100vh-117px)] bigScreen:h-[calc(100vh-117px-39px)] overflow-y-auto p-4"
            >
            {/* {receivedMessages?.map((message, i) => (
              <div key={i}>{message} </div>
            ))} */}

            <Messages
              messageList={receivedMessages}
              currentUser={currentUser as Room}
              receiver={receiver as Room}
            />
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
              onBlur={handleBlur}
              ref={(node) => {
                if (node) {
                  if (!node.value) {
                    setTypingStatus("");
                  }
                }
              }}
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
      </div>

      {showDropdown && (
            <DropdownModal>
              <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6 p-4">
                <div className="flex flex-col items-center justify-center">
                  <label htmlFor="fileInput">
                    <FaFileInvoice className="text-blue-500 text-4xl cursor-pointer" />
                    <span className="text-sm">Document</span>
                  </label>
                  <input
                    id="fileInput"
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFileInputChange}
                  />
                </div>
                <div className="flex flex-col items-center justify-center">
                  <label htmlFor="imageInput">
                    <FaPhotoVideo className="text-green-500 text-4xl cursor-pointer" />
                    <span className="text-sm">Photo/Video</span>
                  </label>
                  <input
                    id="imageInput"
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFileInputChange}
                  />
                </div>
                <div className="flex flex-col items-center justify-center">
                  <FaUser className="text-yellow-500 text-4xl cursor-pointer" />
                  <span className="text-sm">Contact</span>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <FaCamera className="text-red-500 text-4xl cursor-pointer" />
                  <span className="text-sm">Camera</span>
                </div>
              </div>
            </DropdownModal>
          )}
    </>
  );
};

export default Chats;
