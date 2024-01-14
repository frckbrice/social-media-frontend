import React, { useState } from "react";
import Picker from "emoji-picker-react";
import "rsuite/dist/rsuite.min.css";
import { FaRegLaugh } from "react-icons/fa";
import { Button, Popover, Whisper } from "rsuite";

type Props = {
  getShosenEmojie: (shosenEmojie: any) => void;
  placement: Placement; // placement position came fron the caller component.
};

const EmojiePicker = ({ getShosenEmojie, placement }: Props) => {
  const onEmojiClick = (event: any, emojiObject: any) => {
    getShosenEmojie(emojiObject);
    console.log("this is emoji", emojiObject);
  };

  return (
    <>
      <div className="px-5 w-full cursor-pointer">
        <Whisper
          trigger="hover"
          speaker={
            <Popover arrow={true}>
              <Picker onEmojiClick={onEmojiClick} />
            </Popover>
          }
          placement={placement}
          enterable
          controlId="control-id-hover-enterable"
        >
          <button>
            <FaRegLaugh size={23} />
          </button>
        </Whisper>
      </div>
    </>
  );
};

export default EmojiePicker;
