import Image from "next/image";
import React, {
  MouseEventHandler,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";
import Message from "./Message";
import ReceiverMessages from "./ReceiverMessage";
import SimpleMessage from "./SimpleMessage";
import { FaFaceGrinWide } from "react-icons/fa6";
import EmojiMessage from "./EmojiMessage";
import { socket } from "@/utils/services";
import { formatLastMessageTime } from "@/utils/service/format_time";
// export const revalidate = 10;

type Props = {
  messageList: any[];
  currentUser: Room;
  receiver: Room;
};
//exlint:disable-next-line
const Messages = (props: Props) => {
  const [target, setTarget] = useState<string>(props.messageList[0]?.id);
  const [MessageEmoji, setMessageEmoji] = useState<boolean>(false);
  const [messageId, setMessageId] = useState<string>("");
  const [emojie, setEmojie] = useState<string>("🔥");
  const divMessageRef = useRef<HTMLDivElement | null>(null);
  const divEmojiMess = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (divMessageRef.current)
      divMessageRef.current.addEventListener("click", (e: any) => {
        console.log("check the contain of event fired");
        if (divEmojiMess.current && !divEmojiMess.current.contains(e.target)) {
          setMessageEmoji(false);
        }
      });
  }, []);

  let content;
  const handleTargetEmoji = (id: string) => {
    if (id === target) {
      setMessageEmoji((prev) => !prev);
      console.log(id);
    }
    setTarget(id);
    setMessageId(id);
  };

  const getEmoji = async (emoji: string) => {
    setEmojie(emoji);

    socket.emit("updateMessage", {
      messageId,
      updateValue: emoji,
      room: props.receiver?.isGroup
        ? props.receiver.id
        : props.receiver.original_dm_roomID,
    });
    const values = {
      sender_id: props.currentUser?.id,
      receiver_room_id: props.receiver.id,
    };

    socket.emit("roomMessages", values);
    // setMessageEmoji(false);
  };

  console.log("List of messages", props.messageList);

  const listOfMessages = props.messageList?.map((messages, i) => {
    if (
      (messages?.receiver_room_id === props.currentUser.id &&
        messages?.sender_id !== props.currentUser.id) ||
      (messages?.receiver_room_id !== props.currentUser.id &&
        messages?.sender_id !== props.currentUser.id)
    ) {
      // console.log("messages received: ", messages.content);

      return (
        <>
          <div className="flex justify-start items-center" key={messages?.id}>
            <Message message={messages} classname="box arrow-left" />
            <div className="opacity-0 hover:opacity-100 flex justify-start items-end w-full ">
              <span
                className=" w-12 h-12  mx-1 p-1 pt-[8px] rounded-full bg-[#a3adb3a7] "
                onClick={() => handleTargetEmoji(messages?.id)}
              >
                <FaFaceGrinWide
                  className=" text-white  mr-[5px] mb-[5px] ml-[5px] "
                  size={30}
                />
              </span>
            </div>
          </div>
          {MessageEmoji && messages?.id === target && (
            <EmojiMessage
              setEmojie={getEmoji}
              classname="relative transition transform duration-5000 ease-in-out translate-x-[10%] -top-[60px]"
              ref={divEmojiMess}
            />
          )}
          {messages?.reaction ? (
            <span className=" w-10 h-10 rounded-full  border border-slate-200  text-[22px] bg-white shadow-sm  flex justify-center items-center p-[5px] transition-transform duration-1000 ease-in-out translate-y-[-20%] translate-x-[30%]">
              {messages?.reaction}
            </span>
          ) : (
            ""
          )}
        </>
      );
    }

    if (
      (messages?.receiver_room_id !== props.currentUser.id &&
        messages?.sender_id === props.currentUser.id) ||
      (messages?.receiver_room_id === props.currentUser.id &&
        messages?.sender_id === props.currentUser.id)
    ) {
      return (
        <>
          {MessageEmoji && messages?.id === target && (
            <EmojiMessage
              setEmojie={getEmoji}
              classname=" relative -right-[60%] top-[50px]"
              ref={divEmojiMess}
            />
          )}

          <div className="flex justify-end items-center" key={messages?.id}>
            {/* <div className="opacity-0 hover:opacity-100 flex justify-end items-start w-full "> */}
            <div className="opacity-100 flex justify-end items-start w-full ">
              <span
                className="w-12 h-12 p-[5px] flex justify-center items-center  mx-1  rounded-full bg-[#a3adb3a7] cursor-pointer bg-green-800"
                onClick={() => handleTargetEmoji(messages?.id)}
              >
                <FaFaceGrinWide
                  className=" text-white  mr-[5px] mb-[5px] ml-[5px] "
                  size={30}
                />
              </span>
            </div>

            <Message message={messages} classname="box arrow-right" />
          </div>
          <div className=" w-full flex justify-end items-center">
            {messages?.reaction ? (
              <span
                className=" w-10 h-10 rounded-full  border border-slate-200  text-[22px] bg-white shadow-sm  flex justify-center items-center p-[5px] transition-transform duration-1000 ease-in-out  translate-y-[-10px] translate-x-[-20px]
          "
              >
                {messages?.reaction}
              </span>
            ) : (
              ""
            )}
          </div>
        </>
      );
    }
  });
  console.log(props.messageList[0]?.createdAt);
  return (
    <div className=" max-w-full flex flex-col bg-green" ref={divMessageRef}>
      <div className=" flex justify-center flex-col items-center pt-10 text-[#54656f] mb-3">
        <span className=" w-fit pt-1 pb-[8px] px-3 bg-white shadow-sm rounded-[8px] mb-4 ">
          {props.messageList.length
            ? new Date(props.messageList[0]?.createdAt).toLocaleDateString(
                "en-US",
                { weekday: "long" }
              )
            : new Date().toLocaleDateString("en-US", { weekday: "long" })}
        </span>
        <p className=" bg-[#ffeecd] flex justify-center items-center w-fit text-[12px] text-center p-2 px-4 rounded-[8px] shadow-brie">
          messages are end-to-end encrypted. no one outside of this discussion,
          not even whatsapp can read, nor even listen to them
        </p>
      </div>
      {listOfMessages}
    </div>
  );
};

Messages.displayName = Messages;

export default Messages;
