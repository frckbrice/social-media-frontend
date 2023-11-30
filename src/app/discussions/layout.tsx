"use client";
import Avatar from "@/component/atoms/Avatar";

// icons import
import { IoEllipsisVertical } from "react-icons/io5";
import { BiSolidMessageAdd } from "react-icons/bi";

const handleImageclick = () => {
  console.log("clicked on the image");
};

function Discussion({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full">
      <div className="bg-white w-[40vw] h-full">
        <div className="flex items-center justify-between bg-bgGray p-2 text-primaryText">
          <Avatar
            onClick={handleImageclick}
            size={4}
            profilePicture="https://i.pinimg.com/564x/a7/da/a4/a7daa4792ad9e6dc5174069137f210df.jpg"
          />

          <div className="flex items-center gap-2 ">
            <button className="text-primaryText">
              <BiSolidMessageAdd size={25} />
            </button>

            <button>
              <IoEllipsisVertical size={25} />
            </button>
          </div>
        </div>
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
}

export default Discussion;
