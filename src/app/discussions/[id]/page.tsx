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
  FaFile,
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

  const handleFileDrop = (acceptedFiles: File[]) => {
    // Handle file upload logic here
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

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    // accept: ["application/pdf", "image/*", "video/*"],
    multiple: true,
    onDrop: handleFileDrop,
  });

  const handleDocumentClick = () => {
    const input = document.getElementById("fileInput");
    if (input) {
      input.click();
    }
  };

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      handleFileDrop(Array.from(files));
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
        <DropdownModal onClose={() => setShowDropdown(false)}>
          <div className="p-5 pr-10 rounded-xl bg-white absolute bottom-16 left-[41%] transform -translate-x-1/2 shadow-lg">
            <div
              {...getRootProps()}
              className="dropzone flex items-center space-x-3 text-lg cursor-pointer"
              onClick={handleDocumentClick}
            >
              <FaFileInvoice className="text-purple-500 text-2xl" />
              <span className="text-gray-600">Document</span>
            </div>

            <div
              className="flex items-center py-5 space-x-3 text-lg cursor-pointer"
              onClick={() => {
                // Handle photos/videos upload logic here
              }}
            >
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

      <div
        className="dropzone w-full bg-red-600 top-0 z-30 h-[calc(100vh-117px)] bigScreen:h-[calc(100vh-117px-39px)] p-4 space-y-10"
      >
        <div className="h-14 bg-gray-600 flex items-center p-4">
          <FaTimes
            className="text-gray-800 text-2xl cursor-pointer"
            // onClick={handlePlusIconClick}
          />{" "}
          {/* <p>{{file.name}}</p> */}
        </div>
        <div>
          <p>No preview available</p>
        </div>

        <div className="flex bg-white rounded-md py-2 pl-4 w-[75%] m-auto">
          <input
            type="text"
            placeholder="Type a message"
            value={message}
            onChange={handleChange}
            className="w-full bg-transparent text-sm border-0 focus:outline-none"
          />
          <AiOutlineSmile className="mr-5 text-myG text-4xl" />
        </div>

        <div className="flex space-x-4 justify-center">
          {uploadedFiles.map((file, index) => (
            <div
              key={index}
              className="border flex-col p-4 w-16 h-16 hover:bg-gray-500"
            >
              <button
                onClick={() => handleRemoveFile(index)}
                className="text-sm"
              >
                <FaTimes />
              </button>

              <FaFile className="text-5xl" />
            </div>
          ))}

          <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here...</p>
            ) : (
              <p className="border p-4 w-16 h-16 hover:bg-gray-500">
                <FaPlus className="cursor-pointer " />
              </p>
            )}
          </div>
        </div>

      </div>
    </>
  );
};

export default Chats;
