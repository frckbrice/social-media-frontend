"use client";
import React, { useState } from "react";
import SearchInput from "../atoms/SearchInput";
import ContactCard from "./ContactCard";
import AddedMember from "../molecules/AddedMember";
import { LOCAL_STORAGE } from "@/utils/service/storage";

const AddGroupMembers = ({ users }: any) => {
  const [userList, setUserList] = useState<Array<User>>(users);
  const [members, setMembers] = useState<Array<User>>(
    LOCAL_STORAGE.get("group_members") || []
  );

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
      alert("already added");
      return;
    }

    let selectedMember = members;
    selectedMember.push(user);
    LOCAL_STORAGE.save("group_members", selectedMember);
    setMembers(LOCAL_STORAGE.get("group_members"));
    selectedMember = [];
  };

  // REMOVE A GROUP MEMBER
  const removeMember = (id: string) => {
    const filteredMembers = members.filter((member) => member.id !== id);
    setMembers(filteredMembers);
    LOCAL_STORAGE.save("group_members", filteredMembers);
    // if (members.length === 0) setShowNextBtn(false);
  };

  return (
    <div className="relative ">
      <div className="p-4">
        <div className="flex overflow-y-auto max-h-[80px] w-full flex-wrap gap-2">
          {members.map((member) => (
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
      <div className="h-[calc(100vh-253px-54px-20px)] overflow-y-scroll overflow-x-hidden">
        {userList.map((user: User) => (
          <ContactCard
            key={user.id}
            id={user.id}
            name={user.name}
            email={user.email}
            onClick={() => handelAddMembers(user)}
            notification={""}
            active={false}
            updatedAt={""}
            image={user.image || ""}
            className={""}
          />
        ))}
      </div>
      <div className="bg-bgGray flex items-center min-h-[54px] ">
        <button className="w-[20rem] bg-red-600 m-auto">create</button>
      </div>
    </div>
  );
};

export default AddGroupMembers;
