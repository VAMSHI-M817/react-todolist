import React from "react";
import TaskCard from "./TaskCard";

const TaskColumns = (columns) => {
  const { ColumnName } = columns;
  return (
    <section>
      <div>
        <h1 className="font-bold text-xl">{ColumnName}</h1>
        <br />
        <TaskCard />
      </div>
    </section>
  );
};

export default TaskColumns;
