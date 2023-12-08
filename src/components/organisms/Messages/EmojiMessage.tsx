import React, { forwardRef, useState } from "react";

type Props = {
  setEmojie: (emoji: string) => Promise<void>;
  classname: string;
};

const Emojis = ["🙏", "❤️", "😂", "😮", "😥", "👍"];

const EmojiMessage = forwardRef<HTMLDivElement, Props>((props: Props, ref) => {
  // const EmojiMessage = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const [target, setTarget] = useState("");
  const handleEmojie = async (emoji: string) => {
    await props.setEmojie(emoji);
    setTarget(emoji);
  };

  return (
    <div className={props.classname} ref={ref}>
      <div className="modalEmojie p-2  bg-white w-75 z-100 overflow-auto border border-[#e7e6e641] rounded-[12px] text-[30px] absolute place-content-center -top-[100px] cursor-pointer">
        <div className=" flex justify-center items-center gap-2 relative">
          {Emojis.map((emoji) => (
            <span
              key={emoji}
              onClick={() => handleEmojie(emoji)}
              className={
                target === emoji
                  ? "bg-slate-300 rounded-full w-10 h-10 flex justify-center items-center"
                  : "hover:bg-slate-300 rounded-full w-10 h-10 flex justify-center items-center"
              }
            >
              {emoji}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
});

export default React.memo(EmojiMessage);
