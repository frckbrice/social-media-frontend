"use client";
import Avatar from "@/components/atoms/Avatar";

// icons import
import { IoEllipsisVertical } from "react-icons/io5";
import { BiSolidMessageAdd } from "react-icons/bi";
import SearchInput from "@/components/atoms/SearchInput";
import { BiMenuAltRight } from "react-icons/bi";
import ContactCard from "@/components/organisms/ContactCard";
import { UserData } from "../../../mock-data";

import { useRouter } from "next/navigation";

const handleImageclick = () => {
  console.log("clicked on the image");
};

function Discussion({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <div className="flex w-full">
      <div className=" bg-white w-[30vw] h-full bigScreen:h-[95vh]">
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
            handleFilter={(e: { target: { value: any } }) =>
              console.log(e.target.value)
            }
          />
          <button className="text-slate-400">
            <BiMenuAltRight size={20} />
          </button>
        </div>
        <div className="h-[calc(99.8vh-100px)] bigScreen:h-[calc(95vh-100px)] overflow-x-hidden overflow-auto">
          {UserData.map((user) => (
            <ContactCard
              id={user.id}
              name={user.name}
              email={user.email}
              key={user.id}
              onClick={() => router.push(`/discussions/${user.id}`)}
            />
          ))}
        </div>
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
}

export default Discussion;
