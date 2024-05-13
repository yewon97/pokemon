import axios from "axios";
import { useEffect } from "react";

import { useState } from "react";

export default function PokeCard({ url, name }) {
  const [pokemon, setPokemon] = useState();

  useEffect(() => {
    fetchPokemonDetailData();
  }, []);

  async function fetchPokemonDetailData() {
    try {
      const response = await axios.get(url);
      console.log("response: ", response.data);
      const pokemonData = formatPokemonData(response.data);
      setPokemon(pokemonData);
    } catch (error) {
      console.log(error);
    }
  }

  function formatPokemonData(params) {
    const { id, types, name } = params;
    const PokeData = {
      id,
      name,
      type: types[0].type.name,
    };
    return PokeData;
  }

  return <div>PokeCard</div>;
}
