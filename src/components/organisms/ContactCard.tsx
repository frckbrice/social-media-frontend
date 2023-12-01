"use client";

import React from "react";
// import { usePathname } from "next/navigation";

import Avatar from "../atoms/Avatar";

interface User {
  id: number | string;
  name: string;
  email: string;
  onClick: () => void;
}

const ContactCard = ({ id, name, email, onClick }: User) => {
  // const pathname = usePathname();
  // const paramName = pathname.split("/").slice(-1)[0];
  return (
    <div
      onClick={onClick}
      className={`flex  p-2 justify-between w-[28vw] border-b hover:bg-bgGray items-center hover:cursor-pointer gap-5`}
    >
      <div className="flex items-center gap-5">
        <Avatar
          profilePicture={
            "https://i.pinimg.com/564x/a7/da/a4/a7daa4792ad9e6dc5174069137f210df.jpg"
          }
          size={4}
        />
        <div className="pb-2">
          <div className="flex justify-between w-[22vw] gap-10">
            <p className="">{name}</p>
            <span className="text-primaryText text-xs">11/30/2023</span>
          </div>
          <div className="flex justify-between w-full">
            <span className=" text-xs text-primaryText">{email}</span>
            <span className="text-primaryText  text-xs">10</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
