import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import Avatar from "../atoms/Avatar";

// icons
import { MdDelete } from "react-icons/md";
import Overlay from "../atoms/Overlay";
import Popups from "../atoms/Popups";
import { IoMdPersonAdd } from "react-icons/io";

type ContactCardProps = {
  id: string;
  title: string;
  onClose: () => void;
  picture: string;
  name: string;
  about: string;
  email: string;
  isGroup: boolean;
};

const ContactInfo = ({
  id,
  name,
  title,
  onClose,
  picture,
  about,
  email,
  isGroup,
}: ContactCardProps) => {
  const [onDelete, setOnDelete] = useState(false);
  const [groupMembers, setGroupMembers] = useState<Array<User>>([]);
  const [openCard, setOpenCard] = useState(false);
  return (
    <div className="w-[45vw] mobile:max-sm:w-full bg-bgGray overflow-y-scroll z-40">
      <div className="flex items-center gap-5 p-4 border-l border-l-slate-300">
        <button onClick={onClose}>
          <IoClose size={25} />
        </button>
        <span className="text-md">{title}</span>
      </div>
      <div className="flex flex-col gap-2">
        <div className="bg-white flex flex-col justify-center items-center p-6 gap-3">
          <Avatar profilePicture={picture} size={20} />
          <div className="flex flex-col text-center">
            <h3 className="text-lg">{name}</h3>
            <span className="text-primaryText">{email}</span>
          </div>
        </div>

        {!isGroup ? (
          <>
            <div className="p-5 bg-white h-[87px]">
              <span className="text-sm text-primaryText">About</span>
              <p className="text-slate-800">{about}</p>
            </div>
            <button
              onClick={() => setOnDelete((prev) => !prev)}
              className="text-red-600 flex items-center justify-start bg-white p-4 gap-6"
            >
              <span>
                <MdDelete size={20} />
              </span>
              <span>Delete chat</span>
            </button>
          </>
        ) : (
          <div>
            <div className="flex flex-col bg-white">
              <p className="m-4">{groupMembers.length} Members</p>
              <button
                onClick={() => setOpenCard((prev) => !prev)}
                className="hover:bg-slate-200 flex items-center p-4 gap-2"
              >
                <span className="bg-themecolor text-white p-2 rounded-[50%]">
                  <IoMdPersonAdd size={25} />
                </span>
                Add member
              </button>

              {groupMembers?.map((user, index) => (
                <div key={index} className="flex justify-between p-4">
                  <div className="flex gap-3">
                    <Avatar
                      profilePicture={user.image}
                      onClick={function (): void {
                        throw new Error("Function not implemented.");
                      }}
                      size={8}
                    />
                    <p>{user?.name}</p>
                  </div>
                  <div>
                    {/* <p
                      className={`${
                        user.id === user.created_by ? "visible" : "hidden"
                      } bg-[#e7fce3] h-5 px-2 text-xs rounded items-center text-[#2f652b]`}
                    >
                      Group Admin
                    </p> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {onDelete && (
        <>
          <Overlay
            transparent={false}
            onClick={() => setOnDelete((prev) => !prev)}
          />
          <Popups
            title={"Delete this chat?"}
            content={""}
            actionText={"Delete chat"}
            onCancel={() => setOnDelete((prev) => !prev)}
            onAction={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        </>
      )}
    </div>
  );
};

export default ContactInfo;
