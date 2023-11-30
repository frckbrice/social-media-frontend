"use client";

import Image from "next/image";
import React from "react";
type AvatarProps = {
  profilePicture: string;
  size: number;
  onClick?: () => void;
};

const Avatar = ({ profilePicture, size, onClick }: AvatarProps) => {
  return (
    <button
      style={{
        backgroundImage: `url(${profilePicture})`,
        width: `${size * 10}px`,
        height: `${size * 10}px`,
      }}
      className={`bg-cover bg-center object-fill rounded-[50%] h-${size} w-${size}`}
      onClick={onClick}
    ></button>
  );
};

export default Avatar;
