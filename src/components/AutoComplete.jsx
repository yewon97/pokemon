import React, { useState } from "react";

export default function AutoComplete({ allPokemons, setDisplayedPokemons }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filterNames = (input) => {
    const value = input.toLowerCase();
    return value
      ? allPokemons.filter((pokemon) => pokemon.name.includes(value))
      : [];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    let text = searchTerm.trim();

    setDisplayedPokemons(filterNames(text));
    setSearchTerm("");
  };
  return (
    <div className="relative z-50">
      <form
        onSubmit={handleSubmit}
        className="relative flex justify-center items-center w-[20.5rem] h-6 rounded-lg m-auto"
      >
        <input
          type="text"
          className="text-xs w-[20.5rem] h-6 rounded-lg px-2 p y-1 text-gray-300 text-center bg-[#687687]"
          placeholder="포켓몬을 검색해주세요."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          type="submit"
          className="fa fa-2x text-xs bg-slate-900 text-slate-300 w-[2.5rem] h-6 px-2 py-1 rounded-r-lg text-center absolute right-0 hover:bg-slate-700 z-0"
        >
          검색
        </button>
      </form>
    </div>
  );
}
