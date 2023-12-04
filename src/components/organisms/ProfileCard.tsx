import React from "react";

import { FaArrowLeft } from "react-icons/fa6";

type Props = {
  title: string;
  clickToClose: () => void;
  children: React.ReactNode;
};

const ProfileCard = ({ title, clickToClose, children }: Props) => {
  return (
    <div className="w-[29vw] mobile:max-sm:w-screen bg-white bigScreen:w-[24vw] h-[100%] absolute z-30 left-0">
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
