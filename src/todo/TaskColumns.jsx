import React from "react";
import TaskCard from "./TaskCard";

const TaskColumns = ({ ColumnName, status, tasks }) => {
  return (
    <section>
      <ul>
        <h1 className="font-bold text-xl">{ColumnName}</h1>
        <br />
        {
          tasks.map((task, index) => task.taskStatus === status &&
            <li key={index}>
              <TaskCard title={task.text} tags={task.tags} />
            </li>
          )
        }
      </ul>
    </section>
  );
};

export default TaskColumns;
