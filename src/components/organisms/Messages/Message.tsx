import Image from "next/image";
import React from "react";
import { saveAs } from "file-saver";

type Props = {
  message: Message;
  classname: string;
};

export default function Message({ message, classname }: Props) {
  let content;
  let text;
  if (!message.content) content = <></>;
  else {
    if (message.content.startsWith("https")) {
      let url: string = "";
      const lastIndex = message.content.lastIndexOf(".");
      const fileType = message.content.slice(lastIndex);
      if (fileType.includes("txt" || "ts" || "js")) url = "/txtfile.png";
      else if (fileType.includes("doc" || "docx")) url = "/doc.png";
      else if (fileType.includes("pdf")) url = "/pdfdownload.png";
      content = (
        <p>
          <Image src={url} alt="" width={300} height={300} />
          <a
            download
            href={message.content}
            target="_blank"
            rel="noopener noreferrer"
          >
            download
          </a>
        </p>
      );
    } else {
      const mimeType = message.content.split(",")[0].split(":")[1];
      text = message.content.split("/textcontent/")[1];
      if (mimeType) {
        const imageData = message.content.split(",")[1];
        const buffer = Buffer.from(imageData, "base64");
        const blob = new Blob([buffer], { type: mimeType });
        content = (
          <>
            <Image
              src={URL.createObjectURL(blob)}
              alt=""
              width={300}
              height={300}
            />
          </>
        );
      } else content = message?.content;
    }
  }

  return (
    <div className={classname}>
      <div className=" py-[3px] px-[5px] w-fit text-[#111b21]">
        <div className=" inline-flex max-w-full text-[12.8px] font-[500] text-[#b4876e] item-center ">
          <span className=" pr-1 min-w-[8ch] flex-1 overflow-ellipsis whitespace-nowrap overflow-hidden before:~ ">
            {message?.sender_name}
          </span>{" "}
          <span className="text-[11px] whitespace-nowrap  font-[400] text-[#667781]">
            {message?.sender_phone}
          </span>{" "}
        </div>

        <div className=" flex flex-col gap-1">
          <p> {message?.content ? content : ""}</p>
          <span>{text} </span>
          <span className="flex justify-end">
            {new Date(message?.createdAt).toLocaleTimeString("en-GB")}{" "}
          </span>
        </div>
      </div>
    </div>
  );
}
