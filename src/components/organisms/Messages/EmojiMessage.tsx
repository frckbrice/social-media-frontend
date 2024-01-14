import React, { forwardRef, useState } from "react";

type Props = {
  setEmojie: (emoji: string) => Promise<void>;
  classname: string;
};

const Emojis = ["🙏", "❤️", "😂", "😮", "😥", "👍"];

// eslint-disable-next-line react/display-name
const EmojiMessage = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const [target, setTarget] = useState("");
  const handleEmojie = async (emoji: string) => {
    console.log("emojie from emojie message: ", emoji);
    await props.setEmojie(emoji);
    setTarget(emoji);
  };

  return (
    <div className={props.classname} ref={ref}>
      <div className="modalEmojie p-2  bg-white z-100 border border-[#e7e6e641] rounded-[12px] text-[30px] w-fit place-content-center -top-[100px] cursor-pointer absolute">
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

// EmojiMessage.displayName = EmojiMessage;

export default React.memo(EmojiMessage);
