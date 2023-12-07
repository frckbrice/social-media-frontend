import React from "react";

type DropdownModalProps = {
  onClose: () => void;
  children: React.ReactNode;
  };
  
  const DropdownModal: React.FC<DropdownModalProps> = ({ onClose, children }) => {
  return (
    <div className="bg-white w-[202px] min-h-20 shadow justify-start z-25 flex flex-col">
      {children}
    </div>
  );
};

export default DropdownModal;
