"use client";
import React, { useEffect, useState } from "react";
import SearchInput from "../atoms/SearchInput";
import ContactCard from "./ContactCard";
import AddedMember from "../molecules/AddedMember";
import { LOCAL_STORAGE } from "@/utils/service/storage";
import { FaCircleArrowRight } from "react-icons/fa6";
import { toast } from "react-toastify";

type Props = {
  users: any;
  onClickNext: () => void;
};

const AddGroupMembers = ({ users, onClickNext }: Props) => {
  const [userList, setUserList] = useState<Array<User>>(users);
  const [members, setMembers] = useState<Array<User>>([]);

  console.log("members", members);

  useEffect(() => {
    setMembers(LOCAL_STORAGE.get("group_members") || []);
  }, []);

  // filter Group all contacts
  const handlefilter = (e: { target: { value: any } }) => {
    console.log(e.target.value);
    const searchName = e.target.value;

    const filteredResults = userList.filter((user) => {
      return user.name.toLowerCase().includes(searchName.toLowerCase());
    });

    if (!filteredResults.length || !searchName.length) {
      setUserList(users);
      return;
    }
    setUserList(filteredResults);
  };

  // HANDLE ADD GROUP MAMBERS
  const handelAddMembers = (user: User) => {
    if (members.find((member) => member.id === user.id)) {
      toast.error("already added...!", {
        position: "top-right",
        hideProgressBar: true,
        autoClose: 3000,
      });
      return;
    }

    let selectedMember: User[] = [];
    selectedMember.push(user);
    setMembers((prev) => [...prev, ...selectedMember]);

    LOCAL_STORAGE.save("group_members", [...members, ...selectedMember]);
  };

  // REMOVE A GROUP MEMBER
  const removeMember = (id?: string) => {
    const filteredMembers = members.filter((member) => member.id !== id);
    setMembers(filteredMembers);
    LOCAL_STORAGE.save("group_members", filteredMembers);
    // if (members.length === 0) setShowNextBtn(false);
  };

  return (
    <div className="relative h-[85vh] bigScreen:h-[80vh] ">
      <div className="p-4">
        <div className="flex overflow-y-auto  max-h-[80px] w-full flex-wrap gap-2">
          {members?.map((member) => (
            <AddedMember
              key={member.id}
              name={member.name}
              image={member.image || ""}
              onClick={() => removeMember(member.id)}
            />
          ))}
        </div>

        <input
          onChange={handlefilter}
          placeholder="Search name or number"
          type="search"
          className=" w-full outline-none p-2 text-sm border-b border-b-slate-300"
        />
      </div>
      <div
        className={`${
          members.length ? " h-[339px] bigScreen:h-[460px]" : ""
        }  h-[390px] bigScreen:h-[calc(100vh-167px-74px-4.5vh)] overflow-y-scroll overflow-x-hidden`}
      >
        {userList.map((user: any) => (
          <ContactCard
            user={user}
            key={user.id}
            onClick={() => handelAddMembers(user)}
            notification={""}
            active={false}
            className={""}
          />
        ))}
      </div>
      <div className="bg-bgGray absolute w-full bottom-0 flex items-center py-3 ">
        {members.length ? (
          <button
            onClick={onClickNext}
            className={`w-[2.5rem] text-themecolor   m-auto`}
          >
            <FaCircleArrowRight size={50} />
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default AddGroupMembers;
