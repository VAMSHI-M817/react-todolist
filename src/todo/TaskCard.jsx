import React from "react";
import Tags from "./Tags";

const TaskCard = () => {
  return (
    <article className="flex flex-col items-start border w-full px-2 py-4 rounded-xl">
      <p className="font-semibold ml-4">Eat fruit and do bath</p>
      <div className="relative flex flex-nowrap items-center justify-between gap-4 px-4 py-4 max-sm:flex-wrap md:flex-nowrap">
        <div className="flex flex-nowrap gap-2 max-sm:flex-wrap ">
          <Tags Tagname={"Morning"} />
          <Tags Tagname={"AfterNoon"} />
          <Tags Tagname={"Night"} />
        </div>
        <div>
          <button className="bg-red-500 px-2 rounded-md text-white">
            Delete
          </button>
        </div>
      </div>
    </article>
  );
};

export default TaskCard;
