"use client";

import { handleDelete, uploadFileToSupabase } from "@/utils/service/queries";
import { useDropzone } from "react-dropzone";
import Webcam from "react-webcam";
import ContactInfo from "@/components/organisms/ContactInfo";
import DropdownModal from "@/components/atoms/DropdownModal";
import SelectFile from "@/components/organisms/SelectFile";

import React, { useState, ChangeEvent, useEffect, useRef } from "react";
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
  FaVideo,
  FaCameraRetro,
  FaCamera,
  FaPaperPlane,
  FaBullseye,
} from "react-icons/fa";
import { useParams } from "next/navigation";
import { AiOutlineSmile } from "react-icons/ai";
import { socket } from "@/utils/services";

// const socket = io();
import Messages from "@/components/organisms/Messages/Messages";
import { IoMdArrowBack } from "react-icons/io";
import Pulsation from "@/components/molecules/Pulsation";
import { useAppContext } from "@/app/Context/AppContext";
import Popups from "@/components/atoms/Popups";
import Overlay from "@/components/atoms/Overlay";
import { toast } from "react-toastify";
import { SITE_URL } from "@/utils/service/constant";
import { revalidateData } from "@/utils/revalidate_data";
import EmojiePicker from "@/components/molecules/emogiPicker";

// export const revalidate = 0;
const Chats = () => {
  const [selectedFile, setSelectedFile] = useState<File | string | null>(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);
  const [captureMode, setCaptureMode] = useState<"photo" | "video">("photo");
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [shosenEmojiesup, setShosenEmojiesup] = useState<string[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [rightDropDown, setRightDropDown] = useState(false);
  const [onDelete, setOnDelete] = useState(false);
  const webcamRef = useRef<Webcam | null>(null);

  const param = useParams();
  const router = useRouter();
  const [showInfoCard, setShowInfoCard] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [receivedMessages, setReceivedMessages] = useState<Message[]>([]);
  const [typingStatus, setTypingStatus] = useState("");
  const [connected, setConnected] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const { currentUser } = useAppContext();
  const [disconnectedUser, setDisconnectedUser] = useState<string>("");

  const [receiver, setReceiver] = useState<Room | null>((): Room | null => {
    if (typeof localStorage !== "undefined") {
      const fromLocalStorage =
        JSON.parse(localStorage.getItem("receiver") as string) || {};
      if (fromLocalStorage) return fromLocalStorage;
    }
    return null;
  });

  const divMessageRef = useRef<HTMLDivElement | null>(null);

  let oldReceiver: string = "";

  socket.on("message", (data) => {
    if (data) setReceivedMessages([...receivedMessages, data]);
  });

  socket.on("connect_error", (err) => {
    console.log(`connection error due to ${err}`);
    setConnected("");
    setTimeout(() => socket.connect(), 100);
  });

  socket.on("disconnect", () => {
    setTimeout(() => socket.connect(), 100);
  });

  socket.on("disconnected", (data) => {
    console.log(data);
    socket.disconnect();
    setConnected("");
    setTypingStatus("");
    setDisconnectedUser(data);
  });

  const dropDownLIst = [
    {
      label: "Contact info",
      function: () => {
        // setShowCreateGrp((prev) => !prev);
        // setShowDropdown((prev) => !prev);
        setShowInfoCard((prev) => !prev);
        setRightDropDown((prev) => !prev);
      },
    },
    {
      label: "Close discussion",
      function: () => {
        router.push("/discussions");
        setRightDropDown((prev) => !prev);
      },
    },
    {
      label: "Delete discussion",
      function: () => {
        // setShowPopup((prev) => !prev);
        setOnDelete((prev) => !prev);
        setRightDropDown((prev) => !prev);
      },
    },
  ];

  useEffect(() => {
    socket.emit("connected", {
      room: param.id,
      owner: currentUser?.id,
    });
    setReceivedMessages([]);

    setReceiver(() => JSON.parse(localStorage.getItem("receiver") || "{}"));
    const data = {
      sender_id: currentUser?.id,
      receiver_room_id: param.id,
    };

    socket.emit("roomMessages", data);
  }, [param.id, currentUser?.name, currentUser?.id]);

  useEffect(() => {
    if (divMessageRef && divMessageRef.current) {
      divMessageRef.current.scrollTo(0, divMessageRef.current.scrollHeight);
    }
    socket.on("updateMessage", (data) => {
      const index = receivedMessages?.findIndex(
        (msg: Message) => msg && msg?.id === data?.id
      );
      if (index !== -1) {
        receivedMessages[index].reaction = data.reaction;
        setReceivedMessages(receivedMessages);
      }
    });
  }, [receivedMessages]);

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
    if (e.key === "Enter") {
      setTypingStatus("");
      handleSendMessage();
    }
    socket.emit("typing", {
      room: param.id,
      owner: currentUser?.id,
    });
  };

  socket.on("typingResponse", (data) => {
    console.log(data);
    setTypingStatus(data);
  });

  function handleBlur(e: any) {
    if (!e.target.value) setTypingStatus("");
  }

  const handlePlusIconClick = () => {
    setShowDropdown((prevState) => !prevState);
    setCaptureMode("photo");
    setIsCameraOpen(false);
  };

  const handleCaptureImage = () => {
    const imageSrc = webcamRef.current?.getScreenshot() || null;
    setSelectedFile(imageSrc);
    setIsCameraOpen(false);
  };

  const handleCaptureVideo = () => {
    if (isRecording) {
      setIsRecording(false);
      // Logic to stop video recording
    } else {
      setIsRecording(true);
      // Logic to start video recording
    }
  };

  const handleFileSelect = async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];

      try {
        const filePreviewUrl = URL.createObjectURL(file);
        setSelectedFile(file);
        setFilePreviewUrl(filePreviewUrl);

        const fileUrl = await uploadFileToSupabase(file);
        if (fileUrl) {
          console.log("File uploaded successfully:", fileUrl.data.publicUrl);
          setSelectedFile(null);
          setFilePreviewUrl(null);
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleFileSelect,
    multiple: false,
    // accept: "application/pdf",
  });

  const handleCloseSelectFile = () => {
    setSelectedFile(null);
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

  // console.log(receivedMessages);
  socket.on("notify", (data) => {
    console.log(data);
    setConnected(data);
  });

  function handleCloseModal(): void {
    throw new Error("Function not implemented.");
  }

  function handleOpenDropdown() {
    setRightDropDown((prev) => !prev);
  }

  // FXN TO DELETE CHAT
  const handleDeleteChat = async () => {
    await handleDelete()
      .then(() => {
        router.push("/discussion");
      })
      .catch(() => {
        toast.error("Unable to delete discussion", {
          position: "top-right",
          hideProgressBar: true,
          autoClose: 2000,
        });
      });
    setOnDelete((prev) => !prev);
  };

  // CHOOSE EMOJI
  const getShosenEmojieup = (emojie: any) => {
    if (emojie?.explicitOriginalTarget?.src)
      setShosenEmojiesup((shosenEmojies) => [
        ...shosenEmojies,
        emojie?.explicitOriginalTarget?.src,
      ]);
  };

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
                  <IoMdArrowBack size={200} />
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

              <div className="ml-4 flex flex-col justify-center items-start ">
                <p className="text-md">{receiver?.name}</p>
                <span className="text-gray-500 text-xs">
                  {connected
                    ? connected
                    : disconnectedUser
                    ? disconnectedUser
                    : ""}
                </span>
                <span className="text-xs">
                  {typingStatus ? typingStatus : ""}
                </span>
              </div>
            </div>

            <div className="flex items-center text-gray-500 text-xl">
              <FaSearch className="mr-8" />
              <FaEllipsisV
                onClick={handleAvatarClick}
                className="mr-2 hover:cursor-pointer"
              />
              <button>
                <FaEllipsisV
                  onClick={() => handleOpenDropdown()}
                  className="mr-2 hover:cursor-pointer  hover:bg-gray-300 rounded-full w-fit self-center"
                />
              </button>
            </div>
            {rightDropDown && (
              <div className="absolute z-40 top-10 right-4">
                <DropdownModal onClose={handleCloseModal}>
                  <ul className="py-2 w-full flex. flex-col gap-4">
                    {dropDownLIst.map((item, index) => (
                      <li
                        className="px-5 py-2 hover:bg-bgGray hover:cursor-pointer text-sm text-primaryText"
                        key={index}
                        onClick={item.function}
                      >
                        {item.label}
                      </li>
                    ))}
                  </ul>
                </DropdownModal>
              </div>
            )}
          </div>
          {onDelete && (
            <>
              <Overlay
                transparent={false}
                onClick={() => setOnDelete((prev) => !prev)}
              />
              <Popups
                title={"Delete this chat?"}
                content={""}
                actionText={"Delete chat"}
                onCancel={() => setOnDelete((prev) => !prev)}
                onAction={() => handleDeleteChat()}
              />
            </>
          )}

          <div
            style={{
              backgroundImage:
                "url('https://i.pinimg.com/600x315/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg')",
            }}
            className="w-full h-[calc(100vh-117px)] bigScreen:h-[calc(100vh-117px-39px)] overflow-y-auto p-4 overflow-x-clip "
            ref={divMessageRef}
          >
            <Messages
              messageList={receivedMessages}
              currentUser={currentUser as Room}
              receiver={receiver as Room}
            />
          </div>

          {selectedFile && (
            <SelectFile
              file={selectedFile}
              onCaptureImage={handleCaptureImage}
              onClose={handleCloseSelectFile}
            />
          )}

          <div
            onSubmit={handleSendMessage}
            className="flex items-center justify-between p-3 text-2xl text-gray-500  bg-chatGray"
            style={{ transition: "none" }}
          >
            {/* <AiOutlineSmile className="mr-5 text-myG text-4xl" /> */}
            <span className=" my-auto cursor-pointer">
              <EmojiePicker
                getShosenEmojie={getShosenEmojieup}
                placement="topStart"
              />
            </span>
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
            title={`${receiver?.isGroup ? "Group info" : "Contact info"}  `}
            onClose={() => setShowInfoCard((prev) => !prev)}
            picture={
              receiver?.image ||
              "https://i.pinimg.com/564x/fe/85/c3/fe85c35b97c3f14082ac2edfb25eba44.jpg"
            }
            name={receiver?.name as string}
            about={"made of gold"}
            email={receiver?.email as string}
          />
        )}
      </div>

      {showDropdown && (
        <DropdownModal onClose={() => setShowDropdown(false)}>
          <div className="p-5 pr-10 rounded-xl bg-white absolute bottom-16 left-[41%] transform -translate-x-1/2 shadow-lg">
            <div
              {...getRootProps()}
              className="dropzone flex items-center space-x-3 text-lg cursor-pointer"
            >
              <input {...getInputProps()} />
              <FaFileInvoice className="text-purple-500 text-2xl" />
              <span className="text-gray-600">Document</span>
            </div>

            <div
              {...getRootProps()}
              className="flex items-center py-5 space-x-3 text-lg cursor-pointer"
            >
              <input {...getInputProps()} />
              <FaPhotoVideo className="text-blue-600 text-2xl" />
              <span className="text-gray-600">Photos & Videos</span>
            </div>

            <div
              {...getRootProps()}
              className="flex items-center space-x-3 text-lg cursor-pointer"
              onClick={() => setIsCameraOpen(true)}
            >
              <FaCamera className="text-pink-600 text-2xl" />
              <span className="text-gray-600">Camera</span>
            </div>

            <div className="flex items-center pt-5 space-x-3 text-lg cursor-pointer">
              <FaUser className="text-blue-400 text-2xl" />
              <span className="text-gray-600">Contact</span>
            </div>
          </div>
        </DropdownModal>
      )}

      {isCameraOpen && (
        <div className="">
          <FaTimes
            onClick={() => setIsCameraOpen(false)}
            className="absolute bottom-[79%] bg-themecolor left-1/3 text-2xl z-40 text-white cursor-pointer"
          />

          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
            <Webcam
              audio={captureMode === "video"}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="rounded-lg"
            />
            <button
              onClick={
                captureMode === "photo"
                  ? handleCaptureImage
                  : handleCaptureVideo
              }
              className="absolute bottom-36 left-1/2 transform -translate-x-1/2 mb-8 p-5 bg-themecolor text-gray-800 rounded-full shadow-md"
            >
              {captureMode === "photo" ? (
                <FaCameraRetro className="text-2xl font-extrabold text-white" />
              ) : (
                <FaVideo className="text-2xl font-extrabold text-white" />
              )}
            </button>
            {isCameraOpen && (
              <div className="absolute bottom-28 font-bold left-1/2 transform space-x-10 -translate-x-1/2">
                <button
                  className={`${
                    captureMode === "photo" ? "text-yellow" : "text-gray-500"
                  }`}
                  onClick={() => setCaptureMode("photo")}
                >
                  Photo
                </button>
                <button
                  className={`${
                    captureMode === "video" ? "text-white" : "text-gray-500"
                  }`}
                  onClick={() => setCaptureMode("video")}
                >
                  Video
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Chats;
