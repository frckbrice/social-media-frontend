import React from "react";
import { IoIosSearch } from "react-icons/io";

type InputType = {
  handleFilter: () => void;
};

const SearchInput = ({ handleFilter }: InputType) => {
  return (
    <div className="flex items-center bg-bgGray rounded-[10px] text-primaryText gap-10 px-2 w-full">
      <IoIosSearch size={20} />
      <input
        style={{
          outline: "none",
          marginLeft: "5px",
          backgroundColor: "transparent",
        }}
        className="w-full outline-none px-10 text-sm text-primaryText"
        type="search"
        placeholder="search name or number"
        onChange={handleFilter}
      />
    </div>
  );
};

export default SearchInput;
