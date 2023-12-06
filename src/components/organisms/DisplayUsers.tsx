import React from "react";
import { FaUserGroup } from "react-icons/fa6";
import ContactCard from "./ContactCard";

type Props = {
  users: any;
  contactClick: (userId: string) => void;
  goToCreateGrt: () => void;
};

const DisplayUsers = ({ users, contactClick, goToCreateGrt }: Props) => {
  return (
    <div className=" h-[calc(100vh-161px)] overflow-x-hidden overflow-y-scroll">
      <button
        onClick={goToCreateGrt}
        className="flex items-center gap-4 w-full px-3 py-2 hover:bg-bgGray border-b border-b-slate-200"
      >
        <span className="bg-themecolor p-3 text-white rounded-full">
          <FaUserGroup size={20} />
        </span>
        <span className="text-sm text-slate-700">New group</span>
      </button>

      <p className="px-3 py-5 border-b text-darkgreen border-b-slate-200 font-normal text-sm">
        CONTACTS ON WAXCHAT
      </p>

      {users.map((user: User) => (
        <ContactCard
          key={user.id}
          id={user.id}
          name={user.name}
          email={user.email}
          updatedAt={""}
          onClick={function (): void {
            throw new Error("Function not implemented.");
          }}
          notification={""}
          active={false}
        />
      ))}
    </div>
  );
};

export default DisplayUsers;
