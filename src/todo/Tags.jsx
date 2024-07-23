import React from "react";

const Tags = ({ Tagname, selectTag }) => {
  return (
    <button
      type="button"
      onClick={() => {
        selectTag(Tagname);
      }}
      className=" active:bg-green-400 bg-green-100 rounded-md px-3 py-1 text-sm font-semibold text-gray-600"
    >
      {Tagname}
    </button>
  );
};

export default Tags;
