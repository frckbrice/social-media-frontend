"use client";
import { useAppContext } from "@/app/Context/AppContext";
import React, { useState } from "react";
import { FaCamera } from "react-icons/fa";
import DropdownModal from "../atoms/DropdownModal";
import Overlay from "../atoms/Overlay";

type Props = {
  image: string;
  content: string;
  onClick: () => void;
};

const Dp = ({ image, onClick, content }: Props) => {
  const { currentUser, allUsers } = useAppContext();

  const [openModal, setOpenModal] = useState(false);
  return (
    <div>
      <div className="flex items-center bg-bgGray justify-center relative p-5">
        <div
          style={{
            backgroundImage: `url(${
              image ||
              "https://i.pinimg.com/564x/a7/da/a4/a7daa4792ad9e6dc5174069137f210df.jpg"
            })`,
            width: `200px`,
            height: `200px`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            objectFit: "fill",
            borderRadius: "50%",
          }}
          className="self-center"
        >
          <button
            onClick={() => setOpenModal((prev) => !prev)}
            style={{
              width: `200px`,
              height: `200px`,
            }}
            className=" opacity-50 rounded-[50%] text-sm items-center hover:bg-[#131a23] h-full p-10 w-full flex flex-col justify-center text-center hover:text-white font-bold text-tranparent "
          >
            <FaCamera size={20} />
            {content}
          </button>
        </div>

        {openModal && (
          <>
            <Overlay
              onClick={() => setOpenModal((prev) => !prev)}
              transparent
            />
            <div className="absolute top-[55%] right-0 z-40">
              <DropdownModal onClose={() => setOpenModal((prev) => !prev)}>
                <button
                  onClick={onClick}
                  className="my-2 hover:bg-bgGray text-start text-slate-600 text-sm"
                >
                  <span
                    className="m-4 "
                    onClick={() => setOpenModal((prev) => !prev)}
                  >
                    Upload Photo
                  </span>
                </button>
              </DropdownModal>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dp;
