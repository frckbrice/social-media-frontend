"use client";
import React, { useState, useRef } from "react";
import Dp from "../molecules/Dp";
import { toast } from "react-toastify";

// Icons Import
import { VscPassFilled } from "react-icons/vsc";
import {
  addGroupMembers,
  createGroup,
  uplaodImage,
} from "@/utils/service/queries";
import { useAppContext } from "@/app/Context/AppContext";

type setupProps = {
  closeModal: () => void;
};

function GroupSetup({ closeModal }: setupProps) {
  const [groupName, setGroupName] = useState("");
  const [groupIcon, setGroupIcon] = useState("");
  //   const [file, setFile] = useState<FileList | null>();

  const { currentUser, chatRooms, setChatRooms } = useAppContext();

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
    if (!groupName) {
      toast.warning("upload group icon first...!", {
        position: "top-right",
        hideProgressBar: true,
        autoClose: 3000,
      });
      return;
    }

    if (!groupIcon) {
      toast.warning("add a group subject...!", {
        position: "top-right",
        hideProgressBar: true,
        autoClose: 3000,
      });
      return;
    }

    const members = JSON.parse(localStorage.getItem("group_members") || "");
    let membersIDs = members.map((member: User) => member.id);
    if (!members.find((member: string) => member === currentUser.user_id)) {
      membersIDs = [...membersIDs, currentUser.user_id];
    }
    console.log("membersId,", membersIDs);

    const groupData = {
      name: groupName,
      image: groupIcon,
      user_id: Math.floor(Math.random() * 256).toString(),
      my_id: currentUser.user_id,
      isGroup: true,
    };
    await createGroup(groupData).then(async (res) => {
      if (res.error) {
        toast.error("Failed to create Group...!", {
          position: "top-right",
          hideProgressBar: true,
          autoClose: 3000,
        });
        console.log(res.message);
        return;
      } else {
        await addGroupMembers(membersIDs, res.id).then((response) => {
          console.log("groupMembers: ", response);
        });
        console.log("created group", res);
        setChatRooms((prev) => [res, ...prev]);
        return res;
      }
    });

    // console.log("group members", members);
    console.log("groupData ", groupData);
    // setGroupIcon("");
    toast.success("Group Created successfuly", {
      position: "top-right",
      hideProgressBar: true,
      autoClose: 3000,
    });
    setGroupName("");
    localStorage.removeItem("group_members");
    closeModal();
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
