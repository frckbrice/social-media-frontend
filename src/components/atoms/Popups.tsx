import React from "react";

type PopupType = {
  title: string;
  content: string;
  actionText: string;
  onCancel: () => void;
  onAction: () => void;
};

const Popups = ({
  title,
  content,
  onCancel,
  actionText,
  onAction,
}: PopupType) => {
  return (
    <div className="fixed z-[80] bg-white  flex gap-5 flex-col top-[35%] left-[33%] shadow-md p-4 w-[503px] m-auto mobile:max-sm:w-[90vw] mobile:max-sm:left-2 mobile:max-sm:right-2">
      <div className="flex flex-col gap-5">
        <h3 className="text-[20px] text-primaryText">{title}</h3>
        <p className="text-xs text-primaryText min-h-10">{content}</p>
      </div>

      <div className="flex self-end gap-5">
        <button
          onClick={onCancel}
          className="text-darkgreen border  px-6 py-1 rounded-[20px]"
        >
          Cancel
        </button>
        <button
          onClick={onAction}
          className="bg-darkgreen px-5 py-1 rounded-[20px] text-white"
        >
          {actionText}
        </button>
      </div>
    </div>
  );
};

export default Popups;
