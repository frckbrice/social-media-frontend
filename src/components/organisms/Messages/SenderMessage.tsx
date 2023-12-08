import Image from "next/image";
import React from "react";

type Props = {
  content: string;
  senderName?: string;
  phoneNumber?: string;
  time?: string;
};

export default function SenderMessages({
  content,
  senderName,
  phoneNumber,
  time,
}: Props) {
  return (
    <div className="box arrow-right">
      <div className=" py-3 text-[#111b21]">
        <div className=" inline-flex max-w-full text-[12.8px] font-[500] text-[#b4876e] item-center ">
          <span className=" pr-1 min-w-[8ch] flex-1 overflow-ellipsis whitespace-nowrap overflow-hidden before:~ ">
            {senderName}
          </span>{" "}
          <span className="text-[11px] whitespace-nowrap  font-[400] text-[#667781]">
            {phoneNumber}
          </span>{" "}
        </div>

        <div className=" flex flex-col gap-1">
          <p> {content}</p>
          <span className="flex justify-end">{time} </span>
        </div>
      </div>
    </div>
  );
}
