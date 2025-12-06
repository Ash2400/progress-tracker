import React, { useState } from "react";

function ProgressItem({ task, deleteTask, colorOptions, updateTaskStatus, setOpenTask }) {
  const [isEditingColor, setIsEditingColor] = useState(false);

  return (
    <div
      className="progress"
      style={{ backgroundColor: task.color }}
      onClick={() => setOpenTask(task)}
    >
      <h3>{task.title || "Untitled Task"}</h3>
      <p>{task.text.length > 80 ? task.text.substring(0, 80) + "..." : task.text}</p>

      <div className="progress-actions">
        <button
          className="edit-color-btn"
          onClick={(e) => {
            e.stopPropagation();
            setIsEditingColor(!isEditingColor);
          }}
        >
          {isEditingColor ? "Close" : "Change Status"}
        </button>
      </div>

      {isEditingColor && (
        <div className="color-options">
          {colorOptions.map((c) => (
            <div
              key={c.color}
              className={`color-circle ${task.color === c.color ? "selected" : ""}`}
              style={{ backgroundColor: c.color }}
              title={c.label}
              onClick={(e) => {
                e.stopPropagation();
                updateTaskStatus(task.id, c.color);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProgressItem;
