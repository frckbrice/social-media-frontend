"use client";
import React, { useState, useRef } from "react";
import ProfilPicture from "../molecules/ProfilePicture";
import { toast } from "react-toastify";

// Icons Import
import { VscPassFilled } from "react-icons/vsc";
import {
  addGroupMembers,
  createRoom,
  uplaodImage,
  // uploadFileToSupabase,
} from "@/utils/service/queries";
import { useAppContext } from "@/app/Context/AppContext";

type setupProps = {
  closeModal: () => void;
};

function GroupSetup({ closeModal }: setupProps) {
  const [groupName, setGroupName] = useState("");
  const [groupIcon, setGroupIcon] = useState("");
  const [isLoading, setIsloading] = useState(false);
  //   const [file, setFile] = useState<FileList | null>();

  const { currentUser, setChatRooms } = useAppContext();

  const handleImageUpload = async (e: any) => {
    const file = e.target.files[0];
    const groupAvatar = await uplaodImage(file);
    if (groupAvatar) {
      setGroupIcon(groupAvatar);
    }
    console.log(e.target.files[0]);
  };

  //   console.log(file);

  const inputRef: any = useRef();

  const handleCreateGroup = async () => {
    setIsloading(true);
    if (!groupName) {
      toast.warning("upload group icon first...!", {
        position: "top-right",
        hideProgressBar: true,
        autoClose: 3000,
      });
      setIsloading(false);

      return;
    }

    if (groupIcon === "") {
      toast.warning("add a group subject...!", {
        position: "top-right",
        hideProgressBar: true,
        autoClose: 3000,
      });
      setIsloading(false);

      return;
    }

    const members = JSON.parse(localStorage.getItem("group_members") || "[]");
    let membersIDs = members.map((member: User) => member.id);
    if (!members.find((member: string) => member === currentUser.user_id)) {
      membersIDs = [...membersIDs, currentUser.user_id];
    }
    // console.log("membersId,", membersIDs);

    const groupData = {
      name: groupName,
      image: groupIcon,
      user_id: Math.floor(Math.random() * 256).toString(),
      my_id: currentUser.user_id,
      isGroup: true,
    };
    await createRoom(groupData).then(async (res) => {
      if (res.error) {
        toast.error("Failed to create Group...!", {
          position: "top-right",
          hideProgressBar: true,
          autoClose: 3000,
        });
        console.log("error creating groups", res);
        console.log(res.message);
        setIsloading(false);

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
    setIsloading(false);
    localStorage.removeItem("group_members");
    closeModal();
  };

  return (
    <div className=" h-full">
      <ProfilPicture
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
        {isLoading ? (
          <div className="loader m-auto border-t-2 rounded-full border-themecolor bg-gray-300 animate-spin aspect-square w-8 flex justify-center items-center text-yellow-700"></div>
        ) : (
          <button
            onClick={handleCreateGroup}
            className="w-[2.5rem] text-themecolor  m-auto"
          >
            <VscPassFilled size={50} />
          </button>
        )}
      </div>
    </div>
  );
}

export default GroupSetup;
