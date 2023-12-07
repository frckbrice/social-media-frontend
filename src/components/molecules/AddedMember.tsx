import React from "react";
import Avatar from "../atoms/Avatar";

// icons
import { IoIosClose } from "react-icons/io";

type Props = {
  name: string;
  image: string;
  onClick: () => void;
};

const AddedMember = ({ name, image, onClick }: Props) => {
  return (
    <div className="flex h-7 justify-center bg-gray-200 gap-2 w-fit pr-1 items-center rounded-full text-slate-500">
      <Avatar
        onClick={() => {}}
        profilePicture={
          image ||
          "https://i.pinimg.com/564x/a7/da/a4/a7daa4792ad9e6dc5174069137f210df.jpg"
        }
        size={2.5}
      />

      <p className="py-1 text-slate-500 text-xs">{name}</p>

      <button onClick={onClick}>
        <IoIosClose size={18} />
      </button>
    </div>
  );
};

export default AddedMember;
