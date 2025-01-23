import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [term, setTerm] = useState('');

  const handleChange = (event) => {
    setTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(term);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={term} onChange={handleChange} />
      <button type="submit">検索</button>
    </form>
  );
}

export default SearchBar;