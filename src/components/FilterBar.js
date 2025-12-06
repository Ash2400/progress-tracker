function FilterBar({ colorOptions, filterColor, setFilterColor }) {
    return (
      <div className="filter-bar">
        <button
          className={filterColor === "All" ? "active" : ""}
          onClick={() => setFilterColor("All")}
        >
          All
        </button>
        {colorOptions.map((c) => (
          <button
            key={c.color}
            className={filterColor === c.color ? "active" : ""}
            style={{ backgroundColor: c.color }}
            title={c.label}
            onClick={() => setFilterColor(c.color)}
          >
            {c.label}
          </button>
        ))}
      </div>
    );
  }
  
  export default FilterBar;
  