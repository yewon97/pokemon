import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [pokemons, setPokemons] = useState([]);
  useEffect(() => {
    fetchPokeData();
  }, []);

  // 0 ~ 1008
  const URL = "https://pokeapi.co/api/v2/pokemon/?limit=1008&offset=0";

  const fetchPokeData = async () => {
    try {
      const response = await axios
        .get(URL)
        .then((response) => response.data.results);

      setPokemons(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <article className="pt-6">
      <header className="flex flex-col gap-2 w-full px-4 z-50">
        Input form
      </header>
      <section className="pt-6 flex flex-col justify-center items-center overflow-auto z-0"></section>
      <div className="flex flex-row flex-wrap gap-[16px] items-center justify-center px-2 max-w-4xl">
        {pokemons.length > 0 ? (
          pokemons.map(({ url, name }, index) => <div key={index}>{name}</div>)
        ) : (
          <h2 className="font-medium text-lg text-slate-900 mb-1">
            포켓몬이 없습니다.
          </h2>
        )}
      </div>
    </article>
  );
}

export default App;
