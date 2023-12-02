"use client";
import Avatar from "@/components/atoms/Avatar";

// icons import
import { IoEllipsisVertical } from "react-icons/io5";
import { BiSolidMessageAdd } from "react-icons/bi";
import { MdMessage } from "react-icons/md";

import SearchInput from "@/components/atoms/SearchInput";
import { BiMenuAltRight } from "react-icons/bi";
import ContactCard from "@/components/organisms/ContactCard";
import { UserData } from "../../../mock-data";

import { useRouter, usePathname } from "next/navigation";

const handleImageclick = () => {
  console.log("clicked on the image");
};

function Discussion({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const pathname = usePathname();
  const paramName = pathname.split("/").slice(-1)[0];

  console.log("paramName", paramName);

  return (
    <div className="flex w-full">
      <div
        className={`bg-white w-[30vw] ${
          paramName !== "discussions" ? "mobile:max-sm:hidden" : "visible"
        } mobile:max-sm:w-screen h-full bigScreen:h-[95vh]`}
      >
        <div className="flex items-center justify-between mobile:max-sm:bg-themecolor mobile:max-sm:text-white bg-bgGray p-2 text-primaryText">
          <Avatar
            onClick={handleImageclick}
            size={4}
            profilePicture="https://i.pinimg.com/564x/a7/da/a4/a7daa4792ad9e6dc5174069137f210df.jpg"
          />

          <div className="flex items-center gap-5 ">
            <button className="">
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
              notification={""}
              active={false}
            />
          ))}
        </div>
        <button className="fixed z-40 bottom-0 right-0 bg-themecolor p-4 mx-4 my-5 text-white sm:hidden mobile:max-sm:visible rounded-[10px]">
          <MdMessage size={20} />
        </button>
      </div>
      <div
        className={`w-full ${
          paramName !== "discussions"
            ? "mobile:max-sm:visible"
            : "mobile:max-sm:hidden"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export default Discussion;
