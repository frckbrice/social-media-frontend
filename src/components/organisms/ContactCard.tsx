"use client";

import React from "react";

import Avatar from "../atoms/Avatar";

interface CardProps {
  id: number | string;
  name: string;
  email: string;
  image: string | "";
  onClick: () => void;
  notification: string | "";
  active: boolean;
  updatedAt: string;
  className: string | "";
}

const ContactCard = ({
  id,
  name,
  email,
  notification,
  active,
  image,
  onClick,
  updatedAt,
  className,
}: CardProps) => {
  // const pathname = usePathname();
  // const paramName = pathname.split("/").slice(-1)[0];
  return (
    <div
      onClick={onClick}
      className={`flex  p-2 justify-between w-[28vw] mobile:max-sm:w-full ${className} bigScreen:w-[23vw] border-b hover:bg-bgGray items-center hover:cursor-pointer gap-5`}
    >
      <div className="flex items-center gap-5">
        <Avatar
          profilePicture={
            image ||
            "https://i.pinimg.com/564x/a7/da/a4/a7daa4792ad9e6dc5174069137f210df.jpg"
          }
          size={5}
        />
        <div className="pb-2 flex flex-col gap-2">
          <div className="flex justify-between w-[21vw] mobile:max-sm:w-[77vw] bigScreen:w-[18vw] gap-10">
            <p className="">{name}</p>
            <span className="text-primaryText text-xs">{updatedAt}</span>
          </div>
          <div className="flex justify-between w-full">
            <span className=" text-xs text-primaryText">{email}</span>
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
