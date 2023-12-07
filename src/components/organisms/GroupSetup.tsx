"use client";
import React, { useState } from "react";
import Dp from "../molecules/Dp";

// Icons Import
import { MdEmojiEmotions } from "react-icons/md";
import { BsCheck2 } from "react-icons/bs";
import { RiPencilFill } from "react-icons/ri";
import { VscPassFilled } from "react-icons/vsc";

function GroupSetup() {
  const [onEditName, setOnEditName] = useState(false);
  const [onEditAbout, setOnEditAbout] = useState(false);
  const [useName, setUserName] = useState("userName");

  const handleUpdateName = () => {
    setOnEditName(false);
  };

  const handleUpdateAbout = () => {
    setOnEditAbout((prev) => !prev);
  };
  const onClickNext = () => {};

  return (
    <div className=" h-full">
      <Dp
        image={""}
        content={"Change group icon"}
        onClick={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
      <div className="px-5 py-2 flex flex-col gap-5">
        <div className="flex justify-between items-center text-primaryText border-b-2 border-b-themecolor">
          <input
            // defaultValue={useName}
            type="text"
            placeholder="Group Subject"
            className="outline-0 text-sm font-normal w-full mb-1"
          />
        </div>
      </div>
      <div className="bg-bgGray absolute w-full bottom-0 flex items-center py-3 ">
        <button
          onClick={onClickNext}
          className="w-[2.5rem] text-themecolor  m-auto"
        >
          <VscPassFilled size={50} />
        </button>
      </div>
    </div>
  );
}

export default GroupSetup;
