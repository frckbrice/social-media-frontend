"use client";
import Image from "next/image";
import React from "react";

const GoogleButton = () => {
  return (
    <div>
      <button className="flex border border-themecolor text-xl items-center rounded p-4 gap-3 px-8   font-bold m-auto">
        <Image
          height={40}
          width={40}
          alt="google logo"
          src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
        />
      </button>
    </div>
  );
};

export default GoogleButton;
