import React from "react";

type Props = {
  children: React.ReactNode;
};

const DropdownModal = ({ children }: Props) => {
  return (
    <div className="bg-white w-[202px] min-h-20 shadow justify-start z-25 flex flex-col">
      {children}
    </div>
  );
};

export default DropdownModal;
