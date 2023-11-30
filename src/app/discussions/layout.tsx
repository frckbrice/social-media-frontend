"use client";
import Avatar from "@/component/atoms/Avatar";

import { useRouter } from "next/navigation";

// icons import
import { IoEllipsisVertical } from "react-icons/io5";
import { BiSolidMessageAdd } from "react-icons/bi";
import SearchInput from "@/component/atoms/SearchInput";
import { BiMenuAltRight } from "react-icons/bi";
import ContactCard from "@/component/organisms/ContactCard";
import { UserData } from "../../../mock-data";

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

          <div className="flex items-center gap-5 ">
            <button className="text-primaryText">
              <BiSolidMessageAdd size={23} />
            </button>

            <button>
              <IoEllipsisVertical size={23} />
            </button>
          </div>
        </div>
        <div className="flex items-center px-4 py-2 gap-5 border-b border-b-bgGray">
          <SearchInput
            handleFilter={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
          <button className="text-slate-400">
            <BiMenuAltRight size={20} />
          </button>
        </div>
        <div className="h-[80vh] overflow-auto">
          {UserData.map((user) => (
            <ContactCard
              id={user.id}
              name={user.name}
              email={user.email}
              key={user.id}
            />
          ))}
        </div>
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
}

export default Discussion;
