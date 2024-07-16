import React from "react";

const Tags = (buttons) => {
  const { Tagname } = buttons;
  return (
    <button className="bg-green-100 rounded-md px-3 py-1 text-sm font-semibold text-gray-600">
      {Tagname}
    </button>
  );
};

export default Tags;
