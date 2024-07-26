import React from "react";

const Tags = ({ Tagname, selectTag, checkTag }) => {


  return (

    <button
      type="button"
      onClick={() => {
        selectTag(Tagname);
      }}
      className="bg-gray-200 active:bg-gray-300 text-gray-800 px-2 rounded inline-flex items-center transition-all ease-in active:ease-out"
    >
      {Tagname}
    </button>
  );
};

export default Tags;
