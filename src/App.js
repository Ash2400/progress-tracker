import React, { useState, useEffect } from "react";
import ProgressForm from "./components/ProgressForm";
import ProgressItem from "./components/ProgressItem";
import SearchBar from "./components/SearchBar";
import FilterBar from "./components/FilterBar";
import Modal from "./components/Modal";

const statusOptions = [
  { color: "#FF8A8A", label: "Blocked/On Hold" },
  { color: "#FFF8A6", label: "In Progress" },
  { color: "#AFCBFF", label: "Upcoming" },
  { color: "#C7FFDA", label: "Completed" },
  { color: "#FFD1DC", label: "Optional" },
];

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [openTask, setOpenTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editText, setEditText] = useState("");
  const [editColor, setEditColor] = useState(statusOptions[0].color);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => setTasks([task, ...tasks]);

  const deleteTask = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks(tasks.filter((task) => task.id !== id));
      setOpenTask(null);
      setIsEditing(false);
    }
  };

  const updateTaskStatus = (id, color) =>
    setTasks(tasks.map((task) => (task.id === id ? { ...task, color } : task)));

  const startEditTask = (task) => {
    setEditTitle(task.title);
    setEditText(task.text);
    setEditColor(task.color);
    setIsEditing(true);
    setOpenTask(task);
  };

  const saveEditTask = () => {
    if (!window.confirm("Apply changes to this task?")) return;
    setTasks(
      tasks.map((task) =>
        task.id === openTask.id
          ? { ...task, title: editTitle, text: editText, color: editColor }
          : task
      )
    );
    setIsEditing(false);
    setOpenTask(null);
  };

  // Filter tasks based on search and filter
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      statusOptions.find(
        (c) =>
          c.color === task.color &&
          c.label.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesFilter = filterStatus === "All" || task.color === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Task summary counts
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.color === "#C7FFDA").length;
  const blockedTasks = tasks.filter((t) => t.color === "#FF8A8A").length;
  const inProgressTasks = tasks.filter((t) => t.color === "#FFF8A6").length;
  const upcomingTasks = tasks.filter((t) => t.color === "#AFCBFF").length;
  const optionalTasks = tasks.filter((t) => t.color === "#FFD1DC").length;
  const overallProgress = totalTasks
    ? Math.round((completedTasks / totalTasks) * 100)
    : 0;

  return (
    <div className="container">
      <h1>Progress Tracker</h1>

      <SearchBar setSearchQuery={setSearchQuery} />
      <FilterBar
        colorOptions={statusOptions}
        filterColor={filterStatus}
        setFilterColor={setFilterStatus}
      />
      <ProgressForm addTask={addTask} colorOptions={statusOptions} />

      {/* Task Progress Summary */}
      <div className="task-summary">
        <p>Total Tasks: {totalTasks}</p>
        <p>Completed: {completedTasks}</p>
        <p>In Progress: {inProgressTasks}</p>
        <p>Upcoming: {upcomingTasks}</p>
        <p>Optional: {optionalTasks}</p>
        <p>Blocked: {blockedTasks}</p>
        <p>Overall Progress: {overallProgress}%</p>
      </div>

      <div className="progress-grid">
        {filteredTasks.length === 0 ? (
          <p>No tasks found.</p>
        ) : (
          filteredTasks.map((task) => (
            <ProgressItem
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              colorOptions={statusOptions}
              updateTaskStatus={updateTaskStatus}
              setOpenTask={setOpenTask}
            />
          ))
        )}
      </div>

      <Modal
        isOpen={!!openTask}
        onClose={() => {
          setOpenTask(null);
          setIsEditing(false);
        }}
      >
        {openTask && (
          <div className="scrollable-modal modal-body">
            {!isEditing ? (
              <>
                <div
                  className="color-circle"
                  style={{ backgroundColor: openTask.color, marginBottom: "10px" }}
                  title={statusOptions.find((c) => c.color === openTask.color)?.label}
                />
                <h2>{openTask.title || "Untitled Task"}</h2>
                <p>{openTask.text}</p>
                <div className="modal-actions">
                  <button onClick={() => startEditTask(openTask)}>Edit Task</button>
                  <button className="delete-btn" onClick={() => deleteTask(openTask.id)}>
                    Delete Task
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2>Edit Task</h2>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="Task / Activity Name"
                />
                <textarea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  placeholder="Details or progress update..."
                />
                <div className="color-options">
                  {statusOptions.map((c) => (
                    <div
                      key={c.color}
                      className={`color-circle ${editColor === c.color ? "selected" : ""}`}
                      style={{ backgroundColor: c.color }}
                      title={c.label}
                      onClick={() => setEditColor(c.color)}
                    />
                  ))}
                </div>
                <div className="modal-actions">
                  <button onClick={saveEditTask}>Save</button>
                  <button
                    className="delete-btn"
                    onClick={() => {
                      deleteTask(openTask.id);
                      setOpenTask(null);
                      setIsEditing(false);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}

export default App;
