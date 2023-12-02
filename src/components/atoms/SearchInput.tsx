import React from "react";
import { IoIosSearch } from "react-icons/io";

type InputType = {
  handleFilter: (event: { target: { value: any } }) => void;
};

const SearchInput = ({ handleFilter }: InputType) => {
  return (
    <div className="flex items-center bg-bgGray rounded text-primaryText gap-10 px-1 w-full">
      <IoIosSearch size={20} />
      <input
        style={{
          backgroundColor: "transparent",
        }}
        className="w-full outline-none py-1 text-sm text-primaryText"
        type="search"
        placeholder="search name or number"
        onChange={handleFilter}
      />
    </div>
  );
};

export default SearchInput;
