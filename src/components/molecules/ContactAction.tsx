import React, { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { IoBan } from "react-icons/io5";
import { BiSolidDislike } from "react-icons/bi";
// import { Room, User } from "@/type";


type Props = {
  // roomObject?: Room
};

const ContactAction = (props: Props) => {
  // const reciever: User = JSON.parse(localStorage.getItem("reciever") || '{}')
  const [popupMod, setPopupMod] = useState<boolean>(false);
  const [reportPopup, setReportPopup] = useState<boolean>(false);
  const [delPopup, setDelPopup] = useState<boolean>(false);

  const handleOnclose = () => setPopupMod(false);

  return (
    <div className=" flex flex-col gap-6 mt-6 text-[#ff2e74]">
      <div
        onClick={() => setPopupMod(true)}
        className=" text-md flex gap-5 items-center justify-start cursor-pointer hover:bg-slate-100"
      >
        <span>
          <IoBan size={25} className=" rotate-90 " />
        </span>{" "}
        <span> To Bloc </span>
      </div>
      <div
        onClick={() => setReportPopup(true)}
        className=" text-lg flex items-center  justify-start gap-5 cursor-pointer hover:bg-slate-100"
      >
        <span>
          <BiSolidDislike size={25} />{" "}
        </span>{" "}
        <span>Signal </span>{" "}
      </div>
      <div
        onClick={() => setDelPopup(true)}
        className=" text-lg flex gap-5  justify-start items-center cursor-pointer hover:bg-slate-100"
      >
        <span>
          <HiOutlineTrash size={25} />{" "}
        </span>{" "}
        <span>delete </span>
      </div>
      {/* {<Deletepopup onClose={handleOnclose} visible={delPopup} />} */}
    </div>
  );
};

export default ContactAction;
