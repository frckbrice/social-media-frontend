import React from "react";
import SearchInput from "../atoms/SearchInput";
import ContactCard from "./ContactCard";

const handlefilter = (e: { target: { value: any } }) => {
  console.log(e.target.value);
};

const AddGroupMembers = ({ users }: any) => {
  return (
    <div className="relative">
      <div className="p-4">
        <input
          onChange={handlefilter}
          placeholder="Search name or number"
          type="search"
          className=" w-full outline-none p-2 text-sm border-b border-b-slate-300"
        />
      </div>
      <div className="h-[calc(100vh-171px-54px)] overflow-y-scroll overflow-x-hidden">
        {users.map((user: User) => (
          <ContactCard
            key={user.id}
            id={user.id}
            name={user.name}
            email={user.email}
            onClick={() => user.id}
            notification={""}
            active={false}
            updatedAt={""}
          />
        ))}
      </div>
      <div className="bg-bgGray min-h-[54px] "></div>
    </div>
  );
};

export default AddGroupMembers;
