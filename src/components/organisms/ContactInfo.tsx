"use client";
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import Avatar from "../atoms/Avatar";

// icons
import { MdDelete } from "react-icons/md";
import Overlay from "../atoms/Overlay";
import Popups from "../atoms/Popups";
import { IoMdPersonAdd } from "react-icons/io";
import { VscPassFilled } from "react-icons/vsc";

import { useRouter } from "next/navigation";
import { SITE_URL } from "@/utils/service/constant";
import { toast } from "react-toastify";
import { IoCloseSharp } from "react-icons/io5";
import SearchInput from "../atoms/SearchInput";
import { useAppContext } from "@/app/Context/AppContext";
import ContactCard from "./ContactCard";
import AddGroupMembers from "./AddGroupMembers";
import { LOCAL_STORAGE } from "@/utils/service/storage";
import AddedMember from "../molecules/AddedMember";
import {
  addGroupMembers,
  getGroupMembers,
  handleDelete,
} from "@/utils/service/queries";
import RoundedLoader from "../atoms/RoundedLoader";

type ContactCardProps = {
  id: string;
  title: string;
  onClose: () => void;
  picture: string;
  name?: string;
  about: string;
  email?: string;
  isGroup?: boolean;
};

const ContactInfo = ({
  id,
  name,
  title,
  onClose,
  picture,
  about,
  email,
  isGroup,
}: ContactCardProps) => {
  const [onDelete, setOnDelete] = useState(false);
  const [showAddMembers, setShowAddMembers] = useState(false);
  const router = useRouter();
  const [receiver, setReceiver] = useState<Room>(
    JSON.parse(localStorage.getItem("receiver") || "[]")
  );
  const sender = JSON.parse(localStorage.getItem("sender") || "{}");

  const [members, setMembers] = useState<User[]>([]);
  const { allUsers } = useAppContext();
  const handleDelete = async () => {
    try {
      const response = await fetch(
        SITE_URL + `/rooms/${receiver.id}/${sender.user_id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        toast.error("Failed to delete chat", {
          position: "top-right",
          hideProgressBar: true,
          autoClose: 2000,
        });
        throw new Error("Failed to delete chat");
      }
      const data = response.json();
      // console.log("deleted contact", data);
      localStorage.removeItem("receiver");
      toast.success("Chat deleted successfully", {
        position: "top-right",
        hideProgressBar: true,
        autoClose: 2000,
      });
      router.push("/discussions");
    } catch (error) {
      console.error(error);
    }
    setOnDelete((prev) => !prev);
  };
  const [participants, setParticipants] = useState<Participants[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteChat = async () => {
    await handleDelete()
      .then((res) => {
        router.push("/discussions");
      })
      .catch((err) => {
        toast.error("Unable to delete discussion", {
          position: "top-right",
          hideProgressBar: true,
          autoClose: 2000,
        });
      });
    setOnDelete((prev) => !prev);
  };

  useEffect(() => {
    if (receiver.isGroup) {
      getGroupMembers(receiver.id)
        .then((res) => {
          setParticipants(res);
          setFilteredUsers(allUsers);
          console.log("allParticipants", res);
        })
        .catch((err) => {
          if (err instanceof Error) console.log(err);
        });
    }
  }, [allUsers, receiver.id, receiver.isGroup]);

  // Handle earch filter
  const handleSearch = (e: any) => {
    const searchName = e.target.value;
    const filteredResults = allUsers.filter((user) => {
      return user.name.toLowerCase().includes(searchName.toLowerCase());
    });
    if (!filteredResults.length || !searchName.length) {
      setFilteredUsers(allUsers);
      return;
    }
    setFilteredUsers(filteredResults);
  };

  // handle Add memeber
  const handelAddMember = (user: User) => {
    if (
      participants.length &&
      participants.find((member) => member.user_id === user.id)
    ) {
      toast.warning("already a Member...!", {
        position: "top-right",
        hideProgressBar: true,
        autoClose: 3000,
      });
      return;
    }
    if (members.find((member) => member.id === user.id)) {
      toast.warning("already added...!", {
        position: "top-right",
        hideProgressBar: true,
        autoClose: 3000,
      });
      return;
    }
    let selectedMember: User[] = [];
    selectedMember.push(user);
    setMembers((prev) => [...prev, ...selectedMember]);
  };

  // Add Members To Group
  const handleAddToGroup = async () => {
    let membersIDs = members.map((member: User) => member.id);
    console.log("membersIDs", membersIDs);
    const membersAdded = await addGroupMembers(membersIDs, receiver.id).then(
      (res) => {
        console.log("response", res);
      }
    );
    console.log("membersAdded", membersAdded);
  };

  // handle remove member
  const HandleRemoveMember = (id: string) => {
    const filteredMembers = members.filter((member) => member.id !== id);
    setMembers(filteredMembers);
  };

  // handleClickContact
  const handleClickContact = (_user: User) => {};

  return (
    <div className="w-[45vw] z-20 mobile:max-sm:w-full bg-bgGray transition duration-20000 ease-in-out">
      <div className="flex items-center gap-5 p-4 border-l border-l-slate-300">
        <button onClick={onClose}>
          <IoClose size={25} />
        </button>
        <span className="text-md">{title}</span>
      </div>

      <div className=" relative bigScreen:h-[calc(97.8vh-58px-22px)] h-[calc(97.8vh-58px)] overflow-y-scroll overflow-x-hidden">
        <div className="flex flex-col gap-2">
          <div className="bg-white flex flex-col justify-center items-center p-6 gap-3">
            <Avatar profilePicture={picture} size={20} />
            <div className="flex flex-col text-center">
              <h3 className="text-lg">{name}</h3>
              <span className="text-primaryText">{email}</span>
            </div>
          </div>

          {!receiver.isGroup ? (
            <>
              <div className="p-5 bg-white h-[87px]">
                <span className="text-sm text-primaryText">About</span>
                <p className="text-slate-800">{about}</p>
              </div>
              <button
                onClick={() => setOnDelete((prev) => !prev)}
                className="text-red-600 flex items-center justify-start bg-white p-4 gap-6"
              >
                <span>
                  <MdDelete size={20} />
                </span>
                <span>Delete chat</span>
              </button>
            </>
          ) : (
            <div>
              <div className="flex flex-col bg-white">
                <p className="m-4">
                  {`${participants.length ? participants.length : 0}`} Members
                </p>
                <button
                  onClick={() => setShowAddMembers((prev) => !prev)}
                  className="hover:bg-bgGray flex items-center p-4 gap-4"
                >
                  <span className="bg-themecolor text-white p-2 rounded-[50%]">
                    <IoMdPersonAdd size={25} />
                  </span>
                  Add member
                </button>
                {participants.length ? (
                  <div className="px-2">
                    {participants?.map((user) => (
                      <div
                        key={user.id}
                        className="flex w-full items-center hover:bg-bgGray hover:cursor-pointer justify-between p-2"
                      >
                        <div className="flex gap-2 items-center">
                          <Avatar profilePicture={user.image || ""} size={5} />
                          <p className="text-sm">{user.name}</p>
                        </div>

                        <span className="text-darkgreen text-xs px-2 ">
                          {`${user.role === "admin" ? "Group Admin" : ""}`}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  ""
                )}
              </div>
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

        {showAddMembers && (
          <>
            <Overlay onClick={() => setShowAddMembers((prev) => !prev)} />
            <div className=" mobile:max-sm:w-full mobile:max-sm:top-0 mobile:max-sm:right-0 mobile:max-sm:h-screen mobile:max-sm:mt-0   z-40 fixed bg-white top-0 shadow-md right-[33vw] h-[90vh] mt-[5vh] w-[437px] bigScreen:w-[500px] bigScreen:right-[35%]">
              <div className="flex gap-5 items-center relative bg-darkgreen p-4 text-white">
                <button onClick={() => setShowAddMembers((prev) => !prev)}>
                  <IoCloseSharp size={20} />
                </button>

                <span>Add member</span>
              </div>
              <div className="">
                <div className="p-4">
                  <SearchInput handleFilter={handleSearch} />
                </div>

                <div
                  className={`${
                    !members.length ? "hidden" : "visble p-4 "
                  }p-4 flex flex-wrap gap-2 overflow-y-auto  max-h-[80px]`}
                >
                  {members.map((member: User) => (
                    <AddedMember
                      key={member.id}
                      name={member.name}
                      image={member.image || ""}
                      onClick={() => HandleRemoveMember(member.id)}
                    />
                  ))}
                </div>

                <div
                  className={`w-full ${
                    members.length ? "h-[calc(90vh-115px-80px)]" : ""
                  } h-[calc(90vh-115px)] mobile:max-sm:h-[calc(100vh-115px)]  overflow-x-auto `}
                >
                  {filteredUsers.map((user) => (
                    <ContactCard
                      user={user}
                      key={user.id}
                      onClick={() => handelAddMember(user)}
                      active={false}
                      className={""}
                    />
                  ))}
                </div>
              </div>
              <div className="absolute right-10 bottom-10">
                {!isLoading ? (
                  <button
                    onClick={handleAddToGroup}
                    className=" bg-white rounded-[50%] text-themecolor "
                  >
                    <VscPassFilled size={60} />
                  </button>
                ) : (
                  <RoundedLoader />
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ContactInfo;
