"use client";
import React, { useState, useRef } from "react";
import Dp from "../molecules/ProfilePicture";

// context import
import { useAppContext } from "@/app/Context/AppContext";

import { BsCheck2 } from "react-icons/bs";
import { RiPencilFill } from "react-icons/ri";
import { updateProfileName, uplaodImage } from "@/utils/service/queries";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";

const EditProfile = () => {
  const [onEditName, setOnEditName] = useState(false);
  const [onEditAbout, setOnEditAbout] = useState(false);
  const { currentUser, setCurrentUser } = useAppContext();
  const [userName, setUserName] = useState(currentUser?.name);

  const [isLoading, setIsLoading] = useState(false);

  const [about, setAbout] = useState("");

  const [profilePhoto, setProfilePhoto] = useState(currentUser?.image);

  const inputRef: any = useRef();

  const email = JSON.parse(localStorage.getItem("email") || "{}");

  const handleUpdateName = async () => {
    setIsLoading(true);
    const update = { name: userName };
    if (!update.name) {
      toast.error("UserName can not be empty!", {
        position: "top-right",
        hideProgressBar: true,
        autoClose: 2000,
      });
      setIsLoading(false);

      return;
    }

    await updateProfileName(currentUser.id, update)
      .then((res) => {
        localStorage.setItem("sender", JSON.stringify(res));
        setOnEditName((prev) => !prev);
        toast.success("UserName updated", {
          position: "top-right",
          hideProgressBar: true,
          autoClose: 2000,
        });
        console.log(res);
        setCurrentUser(res);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const handleUpdateAbout = () => {
    setOnEditAbout((prev) => !prev);
  };

  // Upload image
  const handleImageUpload = async (e: any) => {
    // console.log(e.target.files);
    setIsLoading(true);

    const file = e.target.files[0];
    const photoUrl = await uplaodImage(file);
    if (photoUrl) {
      setProfilePhoto(photoUrl);

      await updateProfileName(currentUser.id, { image: photoUrl })
        .then((res) => {
          localStorage.setItem("sender", JSON.stringify(res));
          setCurrentUser(res);
          toast.success("image updated", {
            position: "top-right",
            hideProgressBar: true,
            autoClose: 2000,
          });
          console.log(res);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  };

  return (
    <div className="relative">
      <Dp
        image={profilePhoto || ""}
        content={"CHANGE PROFILE PHOTO"}
        onClick={() => inputRef.current.click()}
      />
      {isLoading && (
        <div className="loader m-auto absolute right-[45%] border-t-2 rounded-full border-themecolor bg-gray-300 animate-spin aspect-square w-8 flex justify-center items-center text-yellow-700"></div>
      )}
      <div className="px-5 py-2 flex flex-col gap-5">
        <span className="text-sm text-darkgreen">your name</span>

        {onEditName ? (
          <div className="flex justify-between items-center text-primaryText border-b border-b-slate-900 w-full">
            <input
              defaultValue={userName}
              onChange={(e) => setUserName(e.target.value)}
              type="text"
              className="outline-0 text-sm font-normal mb-1"
            />
            <div className="flex gap-2 mb-1">
              {/* <button>
                <MdEmojiEmotions size={20} />
              </button> */}
              <button
                className=" mr-0 cursor-pointer hover:bg-gray-300 rounded-full w-fit self-center"
                onClick={handleUpdateName}
              >
                <BsCheck2 size={20} />
              </button>
              <span
                className=" mr-0 cursor-pointer hover:bg-gray-300 rounded-full w-fit self-center"
                onClick={() => setOnEditName((prev) => !prev)}
              >
                <IoMdClose size={23} />
              </span>
            </div>
          </div>
        ) : (
          <div className="flex justify-between items-center text-primaryTetext-sm font-normalxt text-primaryText">
            <span className="text-sm font-normal">{userName}</span>
            <button onClick={() => setOnEditName((prev) => !prev)}>
              <RiPencilFill size={20} />
            </button>
          </div>
        )}
      </div>

      <input
        type="file"
        onChange={(e) => handleImageUpload(e)}
        hidden
        ref={inputRef}
      />
      <div className="bg-bgGray p-5">
        <p className="text-xs text-primaryText">
          This is not your username or pin, this name will be vidible to you
          WhatsApp contacts.
        </p>
      </div>
      <div className="p-5 flex flex-col gap-5 text-primaryText">
        <span className="text-sm text-darkgreen">Email</span>
      </div>
      <span className="text-sm font-normal p-5 text-primaryText">{email}</span>

      {/* {!onEditAbout ? (
        <div className="px-5">
          <button onClick={() => setOnEditAbout((prev) => !prev)}>
            <RiPencilFill size={20} />
          </button>
        </div>
      ) : (
        <div className="px-5 ">
          <div className="flex justify-between  items-center text-primaryText border-b border-b-slate-900 w-full">
            <input
              // defaultValue={}
              type="text"
              className="outline-0 text-sm font-normal mb-1 "
              onChange={(e) => setAbout(e.target.value)}
              value={about}
            />
            <div className="flex gap-2 mb-1">
              <button>
                <MdEmojiEmotions size={20} />
              </button>
              <button onClick={handleUpdateAbout}>
                <BsCheck2 size={20} />
              </button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default EditProfile;
