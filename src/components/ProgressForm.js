import React, { useState } from "react";

function ProgressForm({ addTask, colorOptions }) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [selectedColor, setSelectedColor] = useState(colorOptions[0].color);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newTask = {
      id: Date.now(),
      title,
      text,
      color: selectedColor,
    };

    addTask(newTask);
    setTitle("");
    setText("");
    setSelectedColor(colorOptions[0].color);
  };

  return (
    <form className="progress-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task / Activity Name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Details or progress update..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <label>Choose Status / Priority:</label>
      <div className="color-options">
        {colorOptions.map((c) => (
          <div
            key={c.color}
            className={`color-circle ${selectedColor === c.color ? "selected" : ""}`}
            style={{ backgroundColor: c.color }}
            title={c.label}
            onClick={() => setSelectedColor(c.color)}
          />
        ))}
      </div>

      <button>Add Task</button>
    </form>
  );
}

export default ProgressForm;
