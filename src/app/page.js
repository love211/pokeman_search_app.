'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Home = () => {
  const [types, setTypes] = useState([]);
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchTypes = async () => {
      const response = await axios.get('https://pokeapi.co/api/v2/type');
      setTypes(response.data.results);
    };
    fetchTypes();
  }, []);

  useEffect(() => {
    const fetchPokemons = async () => {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100');
      const pokemonDetails = await Promise.all(
        response.data.results.map(async (pokemon) => {
          const pokemonResponse = await axios.get(pokemon.url);
          return {
            name: pokemon.name,
            image: pokemonResponse.data.sprites.front_default,
            types: pokemonResponse.data.types.map(typeInfo => typeInfo.type.name),
          };
        })
      );
      setPokemons(pokemonDetails);
    };
    fetchPokemons();
  }, []);

  const filteredPokemons = pokemons.filter(pokemon =>
    pokemon.name.toLowerCase().includes(search.toLowerCase()) &&
    (selectedType ? pokemon.types.includes(selectedType) : true)
  );

  const handlePokemonClick = (name) => {
    router.push(`/pokemon/${name}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Example Home screen Ui</h1>
      <div className="mb-4">
        <select
          className="border p-2 mr-2 w-1/3"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="">select</option>
          {types.map(type => (
            <option key={type.name} value={type.name}>{type.name}</option>
          ))}
        </select>
        </div>
        <div className="mb-4">
        <input
          className="border p-2 w-1/2"
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
<span className="-ml-16 bg-blue-500 text-white p-2">search</span>
</div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredPokemons.map(pokemon => (
          <div
            key={pokemon.name}
            className="border p-4 flex flex-col  justify-between hover:bg-gray-100 cursor-pointer"
            onClick={() => handlePokemonClick(pokemon.name)}
          >
         <div className="bg-white p-2 rounded w-full h-[150px]">
              <img src={pokemon.image} alt={pokemon.name} className="w-60 h-40" />
            </div>
          <div className='pl-7 pt-10'>

            <span>{pokemon.name}</span>
          </div>
          <div className='pl-7 pt-10'>
          <button
                  className="text-blue-500 underline mt-2"
                  onClick={() => handlePokemonClick(pokemon.name)}
                >
                  Details →
                </button>
                </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
