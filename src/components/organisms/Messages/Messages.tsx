import Image from "next/image";
import React, {
  MouseEventHandler,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";
import SenderMessages from "./SenderMessage";
import ReceiverMessages from "./ReceiverMessage";
import SimpleMessage from "./SimpleMessage";
import { FaFaceGrinWide } from "react-icons/fa6";
import EmojiMessage from "./EmojiMessage";

type Props = {
  messageList: any[];
  currentUser: Room;
  receiver: Room;
};
//exlint:disable-next-line
const Messages = (props: Props) => {
  const divMessageRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    // console.log("useeffect fired");
    if (divMessageRef && divMessageRef.current) {
      // const scrollPosition =
      //   divMessageRef.current.scrollHeight -
      //   divMessageRef.current.getBoundingClientRect().height;

      // // console.log(scrollPosition);
      // divMessageRef.current.scrollTo({
      //   top: scrollPosition,
      //   left: 0,
      //   behavior: "smooth", // Enable smooth scrolling
      // });
      divMessageRef.current.scrollTop = divMessageRef.current.scrollHeight;
    }
    // divMessageRef.current.scrollTop = divMessageRef.current.scrollHeight;{}
  }, [props.messageList]);

  const classForMessageReceiver = "align-left max-w-4/5 min-w-fit";
  const classForMessageSender = "box-row align-right  max-w-4/5 min-w-fit";

  let content;

  console.log("this is the list", props.messageList);

  const listOfMessages = props.messageList?.map((messages, i) => {
    if (
      (messages.receiver_room_id === props.currentUser.id &&
        messages.sender_id !== props.currentUser.id) ||
      (messages.receiver_room_id !== props.currentUser.id &&
        messages.sender_id !== props.currentUser.id)
    ) {
      // console.log("messages received: ", messages.content);

      return (
        <>
          <div className="flex justify-start" key={i}>
            {/* <SimpleMessage
              message={messages}
              styleStyle={classForMessageReceiver}
              time={messages.timestamp.split("T")[1].split(".")[0].slice(0, 5)}
            /> */}
            <ReceiverMessages message={messages} />
          </div>
        </>
      );
    }

    if (
      (messages.receiver_room_id !== props.currentUser.id &&
        messages.sender_id === props.currentUser.id) ||
      (messages.receiver_room_id === props.currentUser.id &&
        messages.sender_id === props.currentUser.id)
    ) {
      return (
        <>
          <div className="flex justify-end items-center" key={i}>
            {/* <SimpleMessage
              message={messages}
              styleStyle={classForMessageSender}
              time={messages?.timestamp
                ?.split("T")[1]
                .split(".")[0]
                .slice(0, 5)}
            /> */}
            <SenderMessages message={messages} />
          </div>
        </>
      );
    }
  });

  return (
    <div className=" max-w-full flex flex-col " ref={divMessageRef}>
      <div className=" flex justify-center flex-col items-center pt-10 text-[#54656f] mb-3">
        <span className=" w-fit pt-1 pb-[8px] px-3 bg-white shadow-sm rounded-[8px] mb-4 ">
          {" "}
          {props.messageList[0]?.createdAt?.split("T")[0]}
        </span>
        <p className=" bg-[#ffeecd] flex justify-center items-center w-fit text-[12px] text-center p-2 px-4 rounded-[8px] shadow-brie">
          messages are end-to-end encrypted. no one outside of this discussion,
          not even whatsapp can read, nor even listen to them
        </p>
      </div>
      {content}
      {listOfMessages}
    </div>
  );
};

Messages.displayName = Messages;

export default Messages;
