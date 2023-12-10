import Image from "next/image";
import React from "react";

type SimpleProps = {
  // content: string;
  styleStyle: string;
  time?: string;
  // senderName?: string;
  // phoneNumber?: string;
  message: Message;
};

const SimpleMessage = (props: SimpleProps) => {
  return (
    <div className={`box ${props.styleStyle}`}>
      <div className=" inline-flex max-w-full text-[12.8px] font-[500] text-[#b4876e] item-center ">
        <span className=" pr-1 min-w-[8ch] flex-1 overflow-ellipsis whitespace-nowrap overflow-hidden before:~ ">
          {props.message.sender_name}
        </span>{" "}
        <span className="text-[11px] whitespace-nowrap  font-[400] text-[#667781]">
          {props.message.sender_phone}
        </span>{" "}
      </div>
      <div className=" flex flex-col gap-[2px]">
        <span className=" "> {props.message.content}</span>
        <span className=" flex justify-end text-[#667781]">
          {props.message?.timestamp?.split("T")[1].split(".")[0].slice(0, 5)}
        </span>
      </div>
    </div>
  );
};

export default React.memo(SimpleMessage);
