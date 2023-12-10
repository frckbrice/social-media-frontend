import Image from "next/image";
import React from "react";

type Props = {
  message: Message;
};

export default function ReceiverMessages({ message }: Props) {
  // console.log("receved message", content);

  return (
    <div className="box arrow-left">
      <div className=" py-3 text-[#111b21]">
        <div className=" inline-flex max-w-full text-[12.8px] font-[500] text-[#b4876e] item-center">
          <span className=" pr-1 block min-w-[8ch] flex-1 overflow-ellipsis whitespace-nowrap overflow-hidden before:~ ">
            {message.sender_name}
          </span>{" "}
          <span className="text-[11px] block whitespace-nowrap fle  font-[400] text-[#667781]">
            {message.sender_phone}
          </span>{" "}
        </div>

        <div className=" flex flex-col gap-1">
          <p> {message.content}</p>
          <span className="flex justify-end">
            {message?.timestamp?.split("T")[1].split(".")[0].slice(0, 5)}{" "}
          </span>
        </div>
      </div>
    </div>
  );
}
