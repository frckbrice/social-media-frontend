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
import { useEffect, useState } from "react";
import ProfileCard from "@/components/organisms/ProfileCard";
import EditProfile from "@/components/organisms/EditProfile";
import Overlay from "@/components/atoms/Overlay";
import DropdownModal from "@/components/atoms/DropdownModal";
import DisplayUsers from "@/components/organisms/DisplayUsers";
import AddGroupMembers from "@/components/organisms/AddGroupMembers";
import { useAppContext } from "../Context/AppContext";
import { createRoom, getAllRooms } from "@/utils/service/queries";
import { json } from "node:stream/consumers";
import { LOCAL_STORAGE } from "@/utils/service/storage";
import { SITE_URL } from "@/utils/service/constant";

function Discussion({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const paramName = pathname.split("/").slice(-1)[0];
  const [openProfile, setOpenProfile] = useState(false);
  const [showAllContacts, setShowAllContacts] = useState(false);
  const [showDropDown, setShowDropdown] = useState(false);
  const [showCreateGrp, setShowCreateGrp] = useState(false);
  // const [currentUserId, setCurrentUserId] = useState(
  //   localStorage.getItem("userId")
  // );

  const { currentUser, allUsers } = useAppContext();
  const [chatRooms, setChatRooms] = useState<Room[]>([]);
  const handleCloseModal = () => {
    // Implement your logic to handle modal close here
  };

  const dropDownLIst = [
    {
      label: "New group",
      function: () => {
        setShowCreateGrp((prev) => !prev);
        setShowDropdown((prev) => !prev);
      },
    },
    {
      label: "Logout",
      function: () => {},
    },
  ];

  // filter all users
  const filterAllUsers = (e: { target: { value: any } }) => {
    const mainUserData = allUsers;

    console.log("keyword", e.target.value);
  };

  // FETCH CHAT ROOMS
  useEffect(() => {
    getAllRooms().then((res) => {
      if (res.length) {
        LOCAL_STORAGE.save("chat-rooms", res);
        // console.log(res);
        setChatRooms(res);
      }
    });
  }, []);

  // HANDLE START CHAT
  const handleStartChat = async (user: Room) => {
    const currentUser = JSON.parse(localStorage.getItem("sender") || "{}");
    // console.log(currentUser);

    // console.log("start group with", user);
    if (currentUser.id) {
      createRoom({
        name: user.name,
        email: user.email as string,
        image: user.image,
        isGroup: false,
        user_id: user.id as string,
        my_id: currentUser?.user_id.toString(),
      }).then((res: any) => {
        if (res) {
          router.push(`/discussions/${res.id}`);
          localStorage.setItem("receiver", JSON.stringify(res));
          setChatRooms(() =>
            chatRooms?.find((room: Room) => room.id === res.id)
              ? [...chatRooms]
              : [res, ...chatRooms]
          );
          setShowAllContacts((prev) => !prev);
          console.log("room created", res);
        }
      });
    }
    LOCAL_STORAGE.save("chat-rooms", chatRooms);
  };

  return (
    <>
      {showDropDown && (
        <Overlay onClick={() => setShowDropdown(false)} transparent />
      )}

      <div className="flex w-full">
        <div
          className={`bg-white w-[30vw] ${
            paramName !== "discussions" ? "mobile:max-sm:hidden" : "visible"
          } mobile:max-sm:w-screen h-full bigScreen:h-[95vh]`}
        >
          <div className="flex relative items-center justify-between mobile:max-sm:bg-themecolor mobile:max-sm:text-white bg-bgGray p-2 text-primaryText">
            <Avatar
              onClick={() => setOpenProfile(true)}
              size={4}
              profilePicture={
                currentUser.image ||
                "https://i.pinimg.com/564x/a7/da/a4/a7daa4792ad9e6dc5174069137f210df.jpg"
              }
            />

            <div className="flex  items-center gap-5 ">
              <button
                onClick={() => setShowAllContacts((prev) => !prev)}
                className=""
              >
                <BiSolidMessageAdd size={23} />
              </button>

              <button onClick={() => setShowDropdown((prev) => !prev)}>
                <IoEllipsisVertical size={23} />
              </button>
            </div>
            {showDropDown && (
              <div className="absolute z-40 top-10 right-4">
                <DropdownModal onClose={handleCloseModal}>
                  <ul className="py-2 w-full flex. flex-col gap-4">
                    {dropDownLIst.map((item, index) => (
                      <li
                        className="px-5 py-2 hover:bg-bgGray hover:cursor-pointer text-sm text-primaryText"
                        key={index}
                        onClick={item.function}
                      >
                        {item.label}
                      </li>
                    ))}
                  </ul>
                </DropdownModal>
              </div>
            )}
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
          {chatRooms?.length ? (
            <div className="h-[calc(99.8vh-100px)] bigScreen:h-[calc(95vh-100px)] overflow-x-hidden overflow-auto">
              {chatRooms?.map((user: Room) => (
                <ContactCard
                  user={user}
                  key={user.id}
                  onClick={() => {
                    router.push(`/discussions/${user.id}`);
                    localStorage.setItem("receiver", JSON.stringify(user));
                  }}
                  notification={""}
                  active={false}
                  className={`${paramName === user.id ? "bg-bgGray" : ""}`}
                />
              ))}
            </div>
          ) : (
            <div className="flex h-[calc(99.8vh-100px)] bigScreen:h-[calc(95vh-100px)] overflow-x-hidden overflow-auto text-center relative">
              <span className="w-full absulote mobile:max-sm:mt-[50%] mt-[70%]">
                no chats
              </span>
            </div>
          )}
          <button
            onClick={() => setShowAllContacts((prev) => !prev)}
            className="fixed z-20 bottom-0 right-0 bg-themecolor p-4 mx-4 my-5 text-white sm:hidden mobile:max-sm:visible rounded-[10px]"
          >
            <MdMessage size={20} />
          </button>
        </div>
        {openProfile && (
          <ProfileCard
            title={"Profile"}
            clickToClose={() => setOpenProfile((prev) => !prev)}
          >
            <EditProfile />
          </ProfileCard>
        )}
        {showAllContacts && (
          <ProfileCard
            title="New chat"
            clickToClose={() => setShowAllContacts((prev) => !prev)}
          >
            <div className="p-3">
              <SearchInput handleFilter={filterAllUsers} />
            </div>
            <DisplayUsers
              contactClick={handleStartChat}
              goToCreateGrt={() => {
                setShowAllContacts((prev) => !prev);
                setShowCreateGrp((prev) => !prev);
              }}
            />
          </ProfileCard>
        )}

        {showCreateGrp && (
          <ProfileCard
            title="Add group members"
            clickToClose={() => setShowCreateGrp((prev) => !prev)}
          >
            <AddGroupMembers users={allUsers} />
          </ProfileCard>
        )}
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
    </>
  );
}

export default Discussion;
