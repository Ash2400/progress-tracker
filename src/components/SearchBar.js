function SearchBar({ setSearchQuery }) {
    return (
      <input
        className="search-bar"
        type="text"
        placeholder="Search Progress (title, text, or color)..."
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    );
  }
  
  export default SearchBar;
  