"use client";

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
        backgroundSize: "cover",
        backgroundPosition: "center",
        objectFit: "fill",
        borderRadius: "50%",
      }}
      onClick={onClick}
    ></button>
  );
};

export default Avatar;
