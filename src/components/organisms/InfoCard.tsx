import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { AiFillStar } from "react-icons/ai";
import { BsFillBookmarkFill } from "react-icons/bs";
import { TbBellFilled } from "react-icons/tb";
import Card from "../molecules/Card"
import ContactAction from "../molecules/ContactAction"

// import { RxSwitch } from "react-icons/rx";
// import SwitchButton from "./SwitchButton";
// import Image from "next/image";
import { MdLock } from "react-icons/md";

type Props = {}


const Profile = (props: Props) => {
  

  
  return (
    <div className={` flex flex-col space-y-2  h-[80%] overflow-auto w-40`}>
      {/* <Card /> */}
     
        <>
          <div className=" flex flex-col gap-2 w-full px-7 py-5 border-y border-y-gray-200 shadow-zinc-200 bg-white">
            <span className=" text-[#667781]">Infos</span>
            <span className=" text-[#111b21]">
              enlightened mind{" "}
              <span className=" italic text-[10px] font-thin text-black">
                (user description){" "}
              </span>
            </span>
          </div>
          <div className=" w-full px-7 pr-6 py-4 text-[#667781] bg-white border-y border-y-gray-200 text-[14px] flex justify-between cursor-pointer">
            <span> media, links, and documents</span>
            <span>
              {" "}
              <IoIosArrowForward />
            </span>
          </div>
          <div className=" w-full py-5 bg-white border-y border-y-gray-200 text-[15px]">
            <div className=" flex space-x-4  px-7 py-3 cursor-pointer justify-between items-center">
              <div className=" flex space-x-4 justify-between items-center">
                <span>
                  <AiFillStar size={23} className=" text-[#667781]" />
                </span>{" "}
                <span className="text-[#111b21]"> Important messages</span>
              </div>

              <span>
                <IoIosArrowForward />
              </span>
            </div>
            <hr className="border-[#d7cfcf]" />
            <div className=" flex space-x-4  px-7 py-3 cursor-pointer justify-between items-center">
              <div className=" flex space-x-4 justify-between">
                <span>
                  <BsFillBookmarkFill size={23} className="text-[#667781]" />{" "}
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
                {/* <SwitchButton /> */}
              </span>
            </div>
            <div className="flex flex-col item-start text-[15px] py-3 cursor-pointer">
              <div className=" flex items-center justify-between">
                <div className=" flex justify-center items-center gap-2">
                  {/* <Image
                    alt=""
                    src={"/timer.png"}
                    width={25}
                    height={25}
                    className=" rounded-full"
                  /> */}
                  <span className="text-[#111b21]">Ephemeral Messages</span>
                </div>
                <span>
                  <IoIosArrowForward />
                </span>
              </div>

              <span className="text-[#667781] text-[14px] ml-9 "> 90 days</span>
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
        </>
      
    </div>
  );
};

export default Profile;
