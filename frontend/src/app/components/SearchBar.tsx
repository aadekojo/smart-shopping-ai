// src/components/SearchBar.tsx
import React, { useState } from 'react';

type SearchBarProps = {
  onSearch: (query: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() === '') return;
    onSearch(query.trim());
  };


  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 w-full max-w-xl bg-zinc-800 border border-zinc-700 rounded-lg p-2"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for products..."
        className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none"
      />
      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-md"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;