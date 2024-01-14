import React from "react";

import { FaArrowLeft } from "react-icons/fa6";

type Props = {
  title: string;
  clickToClose: () => void;
  children: React.ReactNode;
};

const ProfileCard = ({ title, clickToClose, children }: Props) => {
  return (
    <div className="w-[30vw] mobile:max-sm:w-screen bg-white bigScreen:w-[30vw] h-[100%] absolute z-30 left-0  transition duration-1000 ease-in-out ">
      <div className="bg-darkgreen flex items-center gap-10 px-5 pb-5 pt-14  text-white">
        <button onClick={clickToClose}>
          <FaArrowLeft />
        </button>
        <p>{title}</p>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default ProfileCard;
