"use client";

import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { AiFillStar } from "react-icons/ai";
import { FaDigitalOcean } from "react-icons/fa";
import { BsFillBookmarkFill, BsX } from "react-icons/bs";
import { TbBellFilled } from "react-icons/tb";
import Dp from "../molecules/ProfilePicture";
import ContactAction from "../molecules/ContactAction";

import { MdLock } from "react-icons/md";

type Props = {};

const Profile = (props: Props) => {
  const [isContactInfoOpen, setIsContactInfoOpen] = useState(true);

  const handleCloseContactInfo = () => {
    setIsContactInfoOpen(false);
  };

  const changeProfilePhoto = () => {};

  return (
    <>
      {isContactInfoOpen && (
        <div
          className="flex flex-col space-y-2 overflow-auto w-[25vw] h-[100%] z-40 pb-24"
          style={{ maxHeight: "100vh" }}
        >
          <div className="fixed flex items-center p-2 h-16 bg-bgGray border-l-2 w-[25vw]">
            <BsX
              className="text-myG text-4xl font-extrabold mr-6 cursor-pointer"
              onClick={handleCloseContactInfo}
            />
            <p>Contact Info</p>
          </div>

          <div className="pt-28">
            <Dp
              image={""}
              content={"CHANGE PROFILE PHOTO"}
              onClick={changeProfilePhoto}
            />
          </div>
          <div className=" w-full px-7 pr-6 py-4 text-[#667781] border-y border-y-gray-200 flex flex-col">
            <span className=" text-[#667781] border-y-gray-200 mb-3">
              About
            </span>
            <span className=" text-[#111b21] text-xl">
              Hey there! I am using whatsapp{" "}
            </span>
          </div>
          <div className=" w-full px-7 pr-6 py-4 text-[#667781] border-y border-y-gray-200 text-[14px] flex justify-between cursor-pointer">
            <span> Media, links and docs</span>
            <span>
              <IoIosArrowForward />
            </span>
          </div>
          <div className=" w-full py-5 bg-white border-y border-y-gray-200 text-[15px]">
            <div className=" flex space-x-4  px-7 py-3 cursor-pointer justify-between items-center">
              <div className=" flex space-x-4 justify-between items-center">
                <span>
                  <AiFillStar size={23} className=" text-[#667781]" />
                </span>{" "}
                <span className="text-[#111b21]"> Starred messages</span>
              </div>

              <span>
                <IoIosArrowForward />
              </span>
            </div>
            <hr className="border-[#d7cfcf]" />
            <div className=" flex space-x-4  px-7 py-3 cursor-pointer justify-between items-center">
              <div className=" flex space-x-4 justify-between">
                <span>
                  <BsFillBookmarkFill size={20} className="text-[#667781]" />{" "}
                </span>{" "}
                <span className="text-[#111b21]"> Bookmark</span>
              </div>

              <span>
                <IoIosArrowForward />
              </span>
            </div>
          </div>
          <div className=" w-full py-5 bg-white border-y border-y-gray-200  px-7 items-start justify-start ">
            <div className="flex  py-3 cursor-pointer justify-between ">
              <div className="flex gap-3 text-[15px] ">
                <span>
                  {" "}
                  <TbBellFilled size={25} className="text-[#667781]" />{" "}
                </span>{" "}
                <span className="text-[#111b21]"> Mute Notifications</span>
              </div>

              <span>
                {" "}
                <div className="switch-button">
                  <label>
                    <input
                      type="checkbox"
                      // checked={isOn}
                      // onChange={handleToggle}
                    />
                    <span className="slider"></span>
                  </label>
                  {/* {showPopup && (
        <DisconnectPopup onClose={handleOnclose} visible={showPopup} />
      )} */}
                </div>
              </span>
            </div>

            <div className="flex flex-col item-start text-[15px] py-3 cursor-pointer">
              <div className=" flex items-center justify-between">
                <div className=" flex justify-center items-center gap-2">
                  <FaDigitalOcean className="font-extralight mr-2 text-lg text-gray-500" />
                  <span className="text-[#111b21]">Disappearing messages</span>
                </div>
                <span>
                  <IoIosArrowForward />
                </span>
              </div>
              <span className="text-[#667781] text-[14px] ml-9 ">Off</span>
            </div>

            <div className="flex flex-col item-start text-[15px] py-3 cursor-pointer">
              <div className=" flex justify-start items-center gap-2">
                <span>
                  <MdLock size={25} className="text-[#667781]" />
                </span>
                <span className="text-[#111b21]">Cyphering</span>
              </div>

              <span className="text-[#667781] text-[14px] ml-9 ">
                The messages are end-to-end encrypted. Click to confirm.{" "}
              </span>
            </div>
          </div>
          <div className=" w-full px-7 py-5 bg-white border-y border-y-gray-200">
            <ContactAction />
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
