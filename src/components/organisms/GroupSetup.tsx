"use client";
import React, { useState, useRef } from "react";
import Dp from "../molecules/Dp";

// Icons Import
import { MdEmojiEmotions } from "react-icons/md";
import { BsCheck2 } from "react-icons/bs";
import { RiPencilFill } from "react-icons/ri";
import { VscPassFilled } from "react-icons/vsc";
import { createGroup, uplaodImage } from "@/utils/service/queries";
import { LOCAL_STORAGE } from "@/utils/service/storage";

function GroupSetup() {
  const [onEditName, setOnEditName] = useState(false);
  const [onEditAbout, setOnEditAbout] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupIcon, setGroupIcon] = useState("");
  //   const [file, setFile] = useState<FileList | null>();

  const handleImageUpload = async (e: any) => {
    // setFile(e.target.files[0]);
    const file = e.target.files[0];
    const groupAvatar = await uplaodImage(file);
    if (groupAvatar) {
      setGroupIcon(groupAvatar);
      //   console.log("Group icon", groupAvatar);
    }
    // console.log(e.target.files[0]);
  };

  //   console.log(file);

  const inputRef: any = useRef();

  const handleCreateGroup = async () => {
    const members = JSON.parse(localStorage.getItem("group_members") || "");
    const membersIDs = members.map((member: User) => member.id);
    const groupData = {
      name: groupName,
      image: groupIcon,
      my_id: "6572c2e0e1ddfe57a4cf3f57",
      isGroup: true,
    };
    await createGroup(groupData).then((res) => {
      if (res.error) {
        console.log(res.message);
        return;
      } else {
        console.log("created group", res);
      }
    });

    // console.log("group members", members);
    console.log("groupData ", groupData);
    setGroupIcon("");
    setGroupName("");
  };

  return (
    <div className=" h-full">
      <Dp
        image={groupIcon}
        content={"Change group icon"}
        onClick={() => inputRef.current.click()}
      />
      <div className="px-5 py-2 flex flex-col gap-5">
        <div className="flex justify-between items-center text-primaryText border-b-2 border-b-themecolor">
          <input
            // defaultValue={useName}
            onChange={(e) => setGroupName(e.target.value)}
            type="text"
            placeholder="Group Subject"
            className="outline-0 text-sm font-normal w-full mb-1"
          />
        </div>
      </div>

      <input
        type="file"
        onChange={(e) => handleImageUpload(e)}
        hidden
        ref={inputRef}
      />

      <div className="bg-bgGray absolute w-full bottom-0 flex items-center py-3 ">
        <button
          onClick={handleCreateGroup}
          className="w-[2.5rem] text-themecolor  m-auto"
        >
          <VscPassFilled size={50} />
        </button>
      </div>
    </div>
  );
}

export default GroupSetup;
