"use client";

import React from "react";
import Avatar from "../atoms/Avatar";

interface User {
  id: number | string;
  name: string;
  email: string;
}

const ContactCard = ({ id, name, email }: User) => {
  return (
    <div className="flex p-2 justify-between items-center hover:cursor-pointer w-full gap-5">
      <div className="flex items-center gap-10">
        <Avatar
          profilePicture={
            "https://i.pinimg.com/564x/a7/da/a4/a7daa4792ad9e6dc5174069137f210df.jpg"
          }
          size={4}
        />

        <div className="px-4 w-full">
          <div className="flex justify-between w-full">
            <span className="">{name}</span>
            <p>11/30/2023</p>
          </div>
          <div className="flex justify-between w-full">
            <p className=" text-xl">{email}</p>
            <span className="flex self-end justify-end relative right-0 text-xs">
              10
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
