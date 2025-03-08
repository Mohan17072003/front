// src/components/SearchBar.js
import React, { useState } from "react";
import lodash from "lodash";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = lodash.debounce(e => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  }, 500);

  return (
    <input
      type="text"
      placeholder="Search posts..."
      value={searchTerm}
      onChange={handleSearch}
    />
  );
};

export default SearchBar;
