"use client";

import React from "react";

import Avatar from "../atoms/Avatar";

interface CardProps {
  // id: number | string;
  // name: string;
  // email: string;
  // image: string | "";
  onClick: () => void;
  notification: string | "";
  active: boolean;
  updatedAt: string;
  className: string | "";
  user: Room;
}

const ContactCard = ({
  // id,
  // name,
  // email,
  notification,
  active,
  // image,
  onClick,
  updatedAt,
  className,
  user,
}: CardProps) => {
  // const pathname = usePathname();
  // const paramName = pathname.split("/").slice(-1)[0];
  return (
    <div
      onClick={onClick}
      className={`flex  p-2 justify-between w-[100%] mobile:max-sm:w-full ${className} bigScreen:w-[100%] border-b hover:bg-bgGray items-center hover:cursor-pointer gap-5`}
    >
      <div className="flex items-center w-full gap-5">
        <Avatar
          profilePicture={
            user.image ||
            "https://i.pinimg.com/564x/a7/da/a4/a7daa4792ad9e6dc5174069137f210df.jpg"
          }
          size={5}
        />
        <div className="pb-2 flex flex-col gap-2">
          <div className="flex justify-between w-[22.5vw] bigScreen:w-[24vw] mobile:max-sm:w-[70vw]  gap-10">
            <p className="">{user.name}</p>
            <span className="text-primaryText text-xs">{updatedAt || ""}</span>
          </div>
          <div className="flex justify-between w-full">
            <span className=" text-xs text-primaryText">{user.email}</span>
            <span
              className={`text-white self-center bg-themecolor p-1 rounded-[50%] text-xs ${
                !active ? "hidden" : "visible"
              }`}
            >
              {notification}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
