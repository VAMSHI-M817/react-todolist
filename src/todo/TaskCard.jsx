import React from "react";
import Tags from "./Tags";

const TaskCard = ({ title, tags }) => {
  return (
    <article className="flex flex-col items-start border w-full px-2 py-4 rounded-xl mx-auto shadow-md border-gray-300 ">
      <div className=" rounded-md">
        <p className="font-semibold ml-4">{title}</p>
        <div className="relative flex flex-nowrap items-center justify-between gap-4 px-4 py-4  ">
          <div className="flex flex-wrap gap-2">
            <div><Tags Tagname={tags} /></div>
          </div>
          <hr className=" bg-gray-700" />
        </div>
      </div>
      <div className="ml-4">
        <button className=" hover:text-red-400 hover:border-red-500 hover:bg-white bg-red-500 border active:bg-red-100 rounded px-3 py-1 text-sm font-semibold text-white transition-all ease-in active:ease-out">
          Delete
        </button>
        <button className=" hover:text-blue-400 hover:border-blue-500 hover:bg-white bg-blue-500 border active:bg-blue-100 rounded px-3 py-1 text-sm font-semibold text-white transition-all ease-in active:ease-out">
          Edit
        </button>
      </div>
    </article>
  );
};

export default TaskCard;
