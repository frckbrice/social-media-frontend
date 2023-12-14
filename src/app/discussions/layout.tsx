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
import GroupSetup from "@/components/organisms/GroupSetup";
import LogOutPopUp from "@/components/molecules/logOutPopup";
import { socket } from "@/utils/services";

function Discussion({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const paramName = pathname.split("/").slice(-1)[0];
  const [openProfile, setOpenProfile] = useState(false);
  const [showAllContacts, setShowAllContacts] = useState(false);
  const [showDropDown, setShowDropdown] = useState(false);
  const [showCreateGrp, setShowCreateGrp] = useState(false);
  const [openGroupSetup, setOpenGroupSetup] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [currentUsers, setCurrentUsers] = useState<Room | null>(
    (): Room | null => {
      if (typeof localStorage !== "undefined") {
        const fromLocalStorage =
          JSON.parse(localStorage.getItem("sender") as string) || {};
        if (fromLocalStorage) return fromLocalStorage;
      }
      return null;
    }
  );

  const { currentUser, allUsers, chatRooms, setChatRooms } = useAppContext();
  // const [chatRooms, setChatRooms] = useState<Room[]>([]);
  const [filterChats, setFilterChats] = useState<Room[]>(chatRooms);
  const [usersDisplay, setUsersDisplay] = useState<Room[]>(allUsers);

  let olduser: string = chatRooms[0]?.original_dm_roomID as string;
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
      function: () => {
        setShowPopup((prev) => !prev);

        setShowDropdown((prev) => !prev);
      },
    },
  ];

  // console.log("paramName", paramName);

  // HANDLE ALL USERS FILTER
  const filterAllUsers = (e: { target: { value: any } }) => {
    const searchName = e.target.value;
    const filteredResults = usersDisplay.filter((user) => {
      return user.name.toLowerCase().includes(searchName.toLowerCase());
    });
    if (!filteredResults.length || !searchName.length) {
      setUsersDisplay(allUsers);
      return;
    }
    setUsersDisplay(filteredResults);
    // console.log("filterAllUsers", filteredResults);
    // console.log("keyword", e.target.value);
  };

  // HANDLE FILTER CHAT ROOMS
  const filterChatRoom = (e: any) => {
    const searchName = e.target.value;
    console.log(searchName);

    const filteredResults = chatRooms.filter((user) => {
      return user.name.toLowerCase().includes(searchName.toLowerCase());
    });
    if (!filteredResults.length || !searchName.length) {
      setFilterChats(chatRooms);
      return;
    }
    setFilterChats(filteredResults);
    // console.log("FilterChats", filteredResults);
    // console.log("keyword", e.target.value);
  };
  // FETCH CHAT ROOMS
  useEffect(() => {
    setFilterChats(chatRooms);
    setUsersDisplay(allUsers);
  }, [allUsers, chatRooms]);

  // HANDLE START CHAT
  const handleStartChat = async (user: Room) => {
    if (currentUser?.id) {
      createRoom({
        name: user.name,
        image: user.image,
        isGroup: false,
        user_id: user.id as string,
        my_id: currentUser?.user_id.toString(),
      }).then((res: any) => {
        if (res) {
          res.isGroup
            ? router.push(`/discussions/${res.id}`)
            : router.push(`/discussions/${res.original_dm_roomID}`);
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
    // LOCAL_STORAGE.save("chat-rooms", chatRooms);
  };

  const handleClose = () => {
    setShowPopup((prev) => !prev);
  };

  const handleClick = (user: Room) => {
    const data = {
      sender_id: currentUser?.id,
      receiver_room_id: user.isGroup ? user.id : user.original_dm_roomID,
    };
    console.log(data);
    socket.emit("roomMessages", data);

    user.isGroup
      ? router.push(`/discussions/${user.id}`)
      : router.push(`/discussions/${user.original_dm_roomID}`);
    localStorage.setItem("receiver", JSON.stringify(user));

    if (olduser !== user.original_dm_roomID) {
      socket.emit("disconnected", olduser);
      console.log(olduser);
      olduser = user.original_dm_roomID as string;
      console.log(olduser);
    }

    //  socket.emit("updateMessage", {});
  };

  return (
    <>
      <LogOutPopUp visible={showPopup} onClose={() => handleClose()} />
      {showDropDown && (
        <Overlay onClick={() => setShowDropdown(false)} transparent />
      )}

      <div className="flex w-full">
        <div
          className={`bg-white w-[30vw] ${
            paramName !== "discussions" ? "mobile:max-sm:hidden" : "visible"
          } mobile:max-sm:w-screen h-full bigScreen:h-[95vh]`}
        >
          <div className="flex relative  w-[30vw] items-center justify-between mobile:max-sm:w-full mobile:max-sm:bg-themecolor mobile:max-sm:text-white bg-bgGray p-2 text-primaryText">
            <Avatar
              onClick={() => setOpenProfile((prev) => !prev)}
              size={4}
              profilePicture={
                currentUser?.image ||
                "https://example.com/default-profile-image.jpg"
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
            <SearchInput handleFilter={filterChatRoom} />
            <button className="text-slate-400">
              <BiMenuAltRight size={20} />
            </button>
          </div>
          {chatRooms?.length ? (
            <div
              style={{
                scrollbarColor: "red",
                scrollbarWidth: "thin",
              }}
              className="displayChats h-[calc(99.8vh-100px)] bigScreen:h-[calc(95vh-100px)] overflow-x-hidden overflow-auto"
            >
              {filterChats?.map((user: Room) => (
                <ContactCard
                  user={user}
                  key={user.id}
                  onClick={() => handleClick(user)}
                  notification={""}
                  active={user.unread_count ? true : false}
                  className={`${paramName === user.id ? "bg-bgGray" : ""}`}
                />
              ))}
            </div>
          ) : (
            <div className="flex h-[calc(99.8vh-100px)] bigScreen:h-[calc(95vh-100px)] overflow-x-hidden overflow-auto text-center relative">
              <span className="w-full absulote mobile:max-sm:mt-[50%] mt-[60%]">
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
              users={!usersDisplay.length ? allUsers : usersDisplay}
              contactClick={handleStartChat}
              goToCreateGrt={() => {
                setShowAllContacts((prev) => !prev);
                setShowCreateGrp((prev) => !prev);
              }}
              // users={usersDisplay}
            />
          </ProfileCard>
        )}
        {showCreateGrp && (
          <ProfileCard
            title="Add group members"
            clickToClose={() => setShowCreateGrp((prev) => !prev)}
          >
            <AddGroupMembers
              users={allUsers}
              onClickNext={() => {
                setShowCreateGrp((prev) => !prev);
                setOpenGroupSetup((prev) => !prev);
              }}
            />
          </ProfileCard>
        )}

        {openGroupSetup && (
          <ProfileCard
            title="New group"
            clickToClose={() => setOpenGroupSetup((prev) => !prev)}
          >
            <GroupSetup closeModal={() => setOpenGroupSetup((prev) => !prev)} />
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