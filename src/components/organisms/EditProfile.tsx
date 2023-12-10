"use client";
import React, { useState, useRef } from "react";
import Dp from "../molecules/Dp";

// context import
import { AppContext } from "next/app";
import { useAppContext } from "@/app/Context/AppContext";

// Icons Import
import { MdEmojiEmotions } from "react-icons/md";
import { BsCheck2 } from "react-icons/bs";
import { RiPencilFill } from "react-icons/ri";
import { updateProfileName, uplaodImage } from "@/utils/service/queries";
import { IoMdClose } from "react-icons/io";
import { SITE_URL } from "@/utils/service/constant";

const EditProfile = () => {
  const [onEditName, setOnEditName] = useState(false);
  const [onEditAbout, setOnEditAbout] = useState(false);
  const { currentUser } = useAppContext();
  const [userName, setUserName] = useState(currentUser?.name);
  const [about, setAbout] = useState("")

  const [profilePhoto, setProfilePhoto] = useState(currentUser?.image);

  const inputRef: any = useRef();

  const email = JSON.parse(localStorage.getItem('email') || '')
  const handleUpdateName = async () => {
    try {
      const payload = {name: userName}
      const response = await fetch(SITE_URL + `/rooms/${currentUser.id}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
      })
      if (!response.ok) {
        throw new Error('unable to update profile name')
      }
      const data = response.json()
      console.log('this is new user OBJECT', data)

    } catch (error) {
      console.error(error)
    }
    setOnEditName((prev) => !prev);
  };

  const handleUpdateAbout = () => {
    setOnEditAbout((prev) => !prev);
  };

  // Upload image
  const handleImageUpload = async (e: any) => {
    // console.log(e.target.files);

    const file = e.target.files[0];
    const photoUrl = await uplaodImage(file);
    if (photoUrl) {
      setProfilePhoto(photoUrl);
      // console.log(photoUrl);
    }
  };

  return (
    <div>
      <Dp
        image={profilePhoto || ""}
        content={"CHANGE PROFILE PHOTO"}
        onClick={() => inputRef.current.click()}
      />
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
                onClick={handleUpdateName}>
                <BsCheck2 size={20} />
              </button>
              <span
                className=" mr-0 cursor-pointer hover:bg-gray-300 rounded-full w-fit self-center"
                onClick={() => setOnEditName(prev => !prev)}
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
