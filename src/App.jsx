import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import PokeCard from "./components/PokeCard";
import { useDebounce } from "./hooks/useDebounce";

function App() {
  // 모든 포켓몬 데이터
  const [allPokemons, setAllPokemons] = useState([]);

  // 실제로 리스트로 보여주는 포켓몬 데이터
  const [displayedPokemons, setDisplayedPokemons] = useState([]);

  const limitNum = 20;
  const URL = `https://pokeapi.co/api/v2/pokemon/?limit=1008&offset=0`;

  const filterDisplayedPokemons = (allPokemonsData, displayedPokemons = []) => {
    const limit = displayedPokemons.length + limitNum;
    return allPokemonsData.filter((_, idx) => idx + 1 <= limit);
  };

  useEffect(() => {
    fetchPokeData();
  }, []);

  const fetchPokeData = async () => {
    try {
      const response = await axios
        .get(URL)
        .then((response) => response.data.results);

      setAllPokemons(response);
      setDisplayedPokemons(filterDisplayedPokemons(response));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <article className="pt-6">
      <header className="flex flex-col gap-2 w-full px-4 z-50">
        <div className="relative z-50">
          <form className="relative flex justify-center items-center w-[20.5rem] h-6 rounded-lg m-auto">
            <input
              type="text"
              className="text-xs w-[20.5rem] h-6 rounded-lg px-2 p y-1 text-gray-300 text-center bg-[#687687]"
              placeholder="포켓몬을 검색해주세요."
              // value={searchTerm}
              // onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type="submit"
              className="fa fa-2x text-xs bg-slate-900 text-slate-300 w-[2.5rem] h-6 px-2 py-1 rounded-r-lg text-center absolute right-0 hover:bg-slate-700 z-0"
            >
              검색
            </button>
          </form>
        </div>
      </header>
      <section className="pt-6 flex flex-col justify-center items-center overflow-auto z-0">
        <div className="flex flex-row flex-wrap gap-[16px] items-center justify-center px-2 max-w-4xl">
          {displayedPokemons.length > 0 ? (
            displayedPokemons.map(({ url, name }) => (
              <PokeCard key={url} name={name} url={url} />
            ))
          ) : (
            <h2 className="font-medium text-lg text-slate-900 mb-1">
              포켓몬이 없습니다.
            </h2>
          )}
        </div>
      </section>
      <div className="text-center">
        {allPokemons.length > displayedPokemons.length &&
          displayedPokemons.length !== 1 && (
            <button
              onClick={() =>
                setDisplayedPokemons(
                  filterDisplayedPokemons(allPokemons, displayedPokemons),
                )
              }
              className="bg-slate-800 px-6 py-2 my-4 text-base rounded-lg font-bold text-white"
            >
              더보기
            </button>
          )}
      </div>
    </article>
  );
}

export default App;
