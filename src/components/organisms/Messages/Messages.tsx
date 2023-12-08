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
import { Message, User } from "@/type";
import { FaFaceGrinWide } from "react-icons/fa6";
import EmojiMessage from "./EmojiMessage";
import { supabase } from "@/utils/supabase/client";

type Props = {
  messageList: any[];
  currentUser: User;
  receiver: User;
  showMessageEmoji: any;
  setMessageEmoji: React.Dispatch<React.SetStateAction<boolean>>;
  currentUserRoomId: string;
  // recipient: User;
  isGroupdiscussion: boolean;
};
const Messages = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const [target, setTarget] = useState<string>(props.messageList[0].id);
  const [emojie, setEmojie] = useState<string>();
  const [messageId, setMessageId] = useState<string>("");

  const classForMessageReceiver = "align-left max-w-4/5 min-w-fit";
  const classForMessageSender = "box-row align-right  max-w-4/5 min-w-fit";

  const handleTargetEmoji = async (id: string) => {
    if (id === target) {
      props.setMessageEmoji((prev) => !prev);
    }
    setTarget(id);
    setMessageId(id);
  };

  // console.log("messages list", props.messageList);

  const getEmoji = async (emoji: string) => {
    setEmojie(emoji);
    const { data, error } = await supabase
      .from("messages")
      .update({
        sender_id: props.currentUser.id,
        receiver_room_id: props.receiver?.id,
        emoji: emoji,
      })
      .eq("id", messageId)
      .single();

    if (data) console.log("message containing emoji: ", data);
    if (error) console.log("Error inserting emoji: ", error);
    props.setMessageEmoji(false);
  };

  let content;
  let sortMessageList = props.messageList.sort((a, b) =>
    a.created_at > b.created_at ? 1 : -1
  );

  console.log("sorted list", sortMessageList);
  console.log("current User room id", props.currentUserRoomId);

  if (
    sortMessageList[0].receiver_room_id === props.currentUserRoomId &&
    sortMessageList[0].sender_id !== props.currentUser.id
  )
    content = (
      <>
        <div className="flex justify-start items-center">
          {props.isGroupdiscussion ? (
            <ReceiverMessages
              content={sortMessageList[0].content}
              time={sortMessageList[0]?.created_at
                .split("T")[1]
                .split(".")[0]
                .slice(0, 5)}
              senderName={sortMessageList[0].sender_name}
              phoneNumber={sortMessageList[0].phone_number}
            />
          ) : (
            <ReceiverMessages
              content={sortMessageList[0].content}
              time={sortMessageList[0]?.created_at
                .split("T")[1]
                .split(".")[0]
                .slice(0, 5)}
            />
          )}
          <span
            className=" opacity-0 hover:opacity-100 mx-1  hover:block p-[5px] rounded-full bg-[#a3adb3a7] "
            onClick={() => handleTargetEmoji(sortMessageList[0].id)}
          >
            <FaFaceGrinWide className=" text-white" size={20} />
          </span>
        </div>
        {props.showMessageEmoji && sortMessageList[0].id === target && (
          <EmojiMessage
            setEmojie={getEmoji}
            classname=" translate-x-[10%]"
            ref={ref}
          />
        )}
        {sortMessageList[0].emoji ? (
          <span className=" w-10 h-10 rounded-full  border border-slate-200  text-[22px] bg-white shadow-sm  flex justify-center items-center p-[5px] transition-transform duration-1000 ease-in-out translate-y-[-20%] translate-x-[30%]">
            {sortMessageList[0].emoji}
          </span>
        ) : (
          ""
        )}
      </>
    );
  // messages sent
  if (
    (sortMessageList[0].receiver_room_id !== props.currentUserRoomId &&
      sortMessageList[0].sender_id === props.currentUser.id) ||
    (sortMessageList[0].receiver_room_id === props.currentUserRoomId &&
      sortMessageList[0].sender_id === props.currentUser.id)
  ) {
    content = (
      <>
        {props.showMessageEmoji && sortMessageList[0].id === target && (
          <EmojiMessage
            setEmojie={getEmoji}
            classname="absolute top-[250px] right-[300px]"
            ref={ref}
          />
        )}
        <div className="flex justify-end">
          <span
            className="w-10 h-10 flex justify-center items-center opacity-0 hover:opacity-100 mx-1  hover:block p-[5px] rounded-full bg-[#a3adb3a7] cursor-pointer"
            onClick={() => handleTargetEmoji(sortMessageList[0].id)}
          >
            <FaFaceGrinWide
              className=" text-white  mr-[5px] mb-[5px] ml-[5px] "
              size={25}
            />
          </span>
          {props.isGroupdiscussion ? (
            <SenderMessages
              content={sortMessageList[0].content}
              time={sortMessageList[0].created_at
                .split("T")[1]
                .split(".")[0]
                .slice(0, 5)}
              senderName={props.currentUser.name}
              phoneNumber={props.currentUser.phone}
            />
          ) : (
            <SenderMessages
              content={sortMessageList[0].content}
              time={sortMessageList[0].created_at
                .split("T")[1]
                .split(".")[0]
                .slice(0, 5)}
            />
          )}
        </div>
        <div className=" w-full flex justify-end items-center">
          {sortMessageList[0].emoji ? (
            <span
              className=" w-10 h-10 rounded-full  border border-slate-200  text-[22px] bg-white shadow-sm  flex justify-center items-center p-[5px] transition-transform duration-1000 ease-in-out  translate-y-[-10px] translate-x-[-20px]
          "
            >
              {sortMessageList[0].emoji}
            </span>
          ) : (
            ""
          )}
        </div>
      </>
    );
  }

  const listOfMessages = sortMessageList?.slice(1).map((messages, i) => {
    if (
      messages.receiver_room_id === props.currentUserRoomId &&
      messages.sender_id !== props.currentUser.id
    ) {
      // console.log("messages received: ", messages.content);

      return (
        <>
          <div className="flex justify-start" key={i}>
            {props.isGroupdiscussion ? (
              <SimpleMessage
                content={messages.content}
                styleStyle={classForMessageReceiver}
                time={messages.created_at
                  .split("T")[1]
                  .split(".")[0]
                  .slice(0, 5)}
                senderName={messages.sender_name}
                phoneNumber={messages.phone_number}
              />
            ) : (
              <SimpleMessage
                content={messages.content}
                styleStyle={classForMessageReceiver}
                time={messages.created_at
                  .split("T")[1]
                  .split(".")[0]
                  .slice(0, 5)}
              />
            )}
            <div className=" opacity-0 hover:opacity-100 flex justify-start items-center w-full">
              <span
                className=" mx-1  hover:block  rounded-full bg-[#a3adb3a7] w-8 h-8 flex justify-center items-center place-content-center pl-[6px] pt-[5px] cursor-pointer"
                onClick={() => handleTargetEmoji(messages.id)}
              >
                <FaFaceGrinWide className=" text-white" size={20} />
              </span>
            </div>
          </div>

          {props.showMessageEmoji && messages.id === target && (
            <EmojiMessage
              setEmojie={getEmoji}
              classname=" translate-x-[10%]"
              ref={ref}
            />
          )}
          {messages.emoji ? (
            <span className=" w-10 h-10 rounded-full  border border-slate-200  text-[22px] bg-white shadow-sm  flex justify-center items-center p-[5px] transition-transform duration-1000 ease-in-out translate-y-[-20%] translate-x-[30%]">
              {messages.emoji}
            </span>
          ) : (
            ""
          )}
        </>
      );
    }

    if (
      (messages.receiver_room_id !== props.currentUserRoomId &&
        messages.sender_id === props.currentUser.id) ||
      (messages.receiver_room_id === props.currentUserRoomId &&
        messages.sender_id === props.currentUser.id)
    ) {
      return (
        <>
          {props.showMessageEmoji && messages.id === target && (
            <EmojiMessage
              setEmojie={getEmoji}
              classname="relative -right-72 top-5"
              ref={ref}
            />
          )}
          <div className="flex justify-end items-center" key={i}>
            <div className=" opacity-0 hover:opacity-100 flex justify-end items-center w-full">
              <span
                className="  mx-1  hover:block  rounded-full bg-[#a3adb3a7] w-8 h-8 flex justify-center items-center place-content-center pl-[6px] pt-[5px] cursor-pointer"
                onClick={() => handleTargetEmoji(messages.id)}
              >
                <FaFaceGrinWide className=" text-white" size={20} />
              </span>
            </div>

            {props.isGroupdiscussion ? (
              <SimpleMessage
                content={messages.content}
                styleStyle={classForMessageSender}
                time={sortMessageList[0].created_at
                  .split("T")[1]
                  .split(".")[0]
                  .slice(0, 5)}
                senderName={props.currentUser.name}
                phoneNumber={props.currentUser.phone}
              />
            ) : (
              <SimpleMessage
                content={messages.content}
                styleStyle={classForMessageSender}
                time={sortMessageList[0].created_at
                  .split("T")[1]
                  .split(".")[0]
                  .slice(0, 5)}
              />
            )}
          </div>

          <div className=" w-full flex justify-end items-center">
            {messages.emoji ? (
              <span className=" w-10 h-10 rounded-full  border border-slate-200  text-[22px] bg-white shadow-sm  flex justify-center items-center p-[5px] transition-transform duration-1000 ease-in-out translate-y-[-10px] translate-x-[-20px]">
                {messages.emoji}
              </span>
            ) : (
              ""
            )}
          </div>
        </>
      );
    }
  });

  return (
    <div className=" max-w-full flex flex-col ">
      <div className=" flex justify-center flex-col items-center pt-10 text-[#54656f] mb-3">
        <span className=" w-fit pt-1 pb-[8px] px-3 bg-white shadow-sm rounded-[8px] mb-4 ">
          {" "}
          {props.messageList[0].created_at.split("T")[0]}
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
});

export default React.memo(Messages);
